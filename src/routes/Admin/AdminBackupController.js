const express = require("express");
const fs = require("node:fs");
const path = require("node:path");
const multer = require("multer");
const clc = require("cli-color");
const crypto = require("node:crypto");
const { exec } = require("node:child_process");
const { runBackup } = require("../../utils/backupScript");
const { Sequelize } = require("sequelize");

const router = express.Router();
const upload = multer({ dest: path.join(__dirname, "..", "uploads") });

const backupDir = path.join(__dirname, "..", "..", "backups");
if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir);

const dbConfig = require(path.join(__dirname, "..", "..", "config", "config.json")).development;

router.get("/database/export", async (req, res) => {
    try {
        const type = "manual";
        const result = await runBackup(type);

        if (!result.success) {
            console.error("Backup gagal.");
            return res.status(500).send("Terjadi kesalahan saat backup.");
        }

        const folderPath = path.resolve(__dirname, '..', '..', '..', 'backup', type);
        const files = fs.readdirSync(folderPath);

        console.log(files)
        if (files.length === 0) {
            console.error("Tidak ada file backup di folder:", folderPath);
            return res.status(404).send("Tidak ada file backup ditemukan.");
        }

        const latestFile = files.sort().reverse()[0];
        const filePath = path.join(folderPath, latestFile);

        if (!fs.existsSync(filePath)) {
            console.error("File tidak ditemukan:", filePath);
            return res.status(404).send("File tidak ditemukan.");
        }

        console.log("Mengirim file:", filePath);
        console.time("send-file");

        const file = await fs.promises.readFile(filePath)

        res.setHeader('Content-Disposition', 'attachment; filename="backup.sql"');
        res.setHeader('Content-Type', 'application/sql'); // atau 'application/octet-stream'

        res.send(file)
    } catch (err) {
        res.status(500).send("Terjadi kesalahan.");
    }
});

router.post("/database/import", upload.single("sqlfile"), async (req, res) => {
    if (!req.file) return res.status(400).send("File tidak ditemukan.");

    const filePath = req.file.path;
    const sqlContent = fs.readFileSync(filePath, "utf8");

    const hash = crypto.createHash("md5").update(sqlContent).digest("hex");
    const importedHashesPath = path.join(backupDir, ".imported_sql_hashes.json");

    let importedHashes = [];
    if (fs.existsSync(importedHashesPath)) {
        importedHashes = JSON.parse(fs.readFileSync(importedHashesPath));
    }

    if (importedHashes.includes(hash)) {
        return res.status(409).send("File SQL ini sudah pernah di-import.");
    }

    const passwordPart = dbConfig.password ? `-p${dbConfig.password}` : "";
    const dbName = dbConfig.database;
    const mysqlBaseCommand = `mysql -h ${dbConfig.host} -u ${dbConfig.username} ${passwordPart}`;

    // Langkah: drop + create + import
    const dropAndCreateCommands = `
        DROP DATABASE IF EXISTS \`${dbName}\`;
        CREATE DATABASE \`${dbName}\`;
    `;

    const tempSqlFile = path.join(__dirname, "temp_drop_create.sql");
    fs.writeFileSync(tempSqlFile, dropAndCreateCommands);

    const fullCommand = `
        ${mysqlBaseCommand} < "${tempSqlFile}" &&
        ${mysqlBaseCommand} ${dbName} < "${filePath}"
    `;

    exec(fullCommand, { shell: true }, (err) => {
        fs.unlinkSync(tempSqlFile); // Hapus temp file

        if (err) {
            console.error("SQL Error:", err);
            return res.status(500).send("Gagal melakukan import database.");
        }

        importedHashes.push(hash);
        fs.writeFileSync(importedHashesPath, JSON.stringify(importedHashes, null, 2));

        res.send("Database berhasil diimport ulang.");
    });
});

module.exports = router;