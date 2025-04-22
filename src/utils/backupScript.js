const fs = require("node:fs");
const path = require("node:path");
const clc = require("cli-color");
const mysqldump = require("mysqldump");

const configPath = path.resolve(__dirname, '..', 'config', 'config.json');
const databaseConfig = require(configPath);
const dbconfig = databaseConfig.development;

const backupTimeFile = path.resolve(__dirname, '..', '..', 'backup-time.json');

const now = Date.now();

var oneMonthAgo = 30 * 24 * 60 * 60 * 1000

const defaultBackupTime = {
    minutelyBackup: now - oneMonthAgo,
    hourlyBackup: now - oneMonthAgo,
    dailyBackup: now - oneMonthAgo,
    weeklyBackup: now - oneMonthAgo,
    monthlyBackup: now - oneMonthAgo
};

const ensureDirectoryExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

const loadBackupTimes = () => {
    if (!fs.existsSync(backupTimeFile)) {
        console.log(clc.red("◇ File backup tidak ditemukan"));
        fs.writeFileSync(backupTimeFile, JSON.stringify(defaultBackupTime, null, 2));
        console.log(clc.blue("◇ File backup dibuat"));
        return { ...defaultBackupTime };
    }

    try {
        const content = fs.readFileSync(backupTimeFile);
        return JSON.parse(content);
    } catch (error) {
        console.error(clc.red("✖ Gagal membaca backup-time.json. Menggunakan default."));
        return { ...defaultBackupTime };
    }
};

const saveBackupTimes = (times) => {
    fs.writeFileSync(backupTimeFile, JSON.stringify(times, null, 2));
};

const runBackup = async (type, intervalMs) => {
    const now = Date.now();
    const backupTimes = loadBackupTimes();

    if (now - backupTimes[`${type}Backup`] >= intervalMs) {
        const timeString = new Date().toISOString().replace(/[:.]/g, '-');
        const folderPath = path.resolve(__dirname, '..', '..', 'backup', type);
        const filePath = path.join(folderPath, `${timeString}.sql`);

        ensureDirectoryExists(folderPath);

        console.log(clc.green(`→ Melakukan backup [${type}] ke ${filePath}`));
        try {
            await mysqldump({
                connection: {
                    host: dbconfig.host,
                    user: dbconfig.username,
                    password: dbconfig.password,
                    database: dbconfig.database,
                },
                dumpToFile: filePath,
            });

            backupTimes[`${type}Backup`] = now;
            saveBackupTimes(backupTimes);
            console.log(clc.green(`✓ Backup [${type}] berhasil disimpan.`));
        } catch (err) {
            console.error(clc.red(`✖ Gagal backup [${type}]:`), err);
        }
    }
};

module.exports = {
    ensureDirectoryExists,
    loadBackupTimes,
    saveBackupTimes,
    runBackup
};