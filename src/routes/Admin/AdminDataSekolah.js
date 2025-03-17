/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                    D A T A  S E K O L A H
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

? Bagian ini isinya api untuk memanipulasi data atau informasi sekolah
! Dimohon memberikan note atau komentar pada bagian bagian route agar mempermudah development

*/

const { Router } = require('express')
const { Models } = require('../../models')
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() })

const router = Router()
const data_sekolah = Models.data_sekolah

router.get('/data-sekolah', async (req, res) => {
    try {
        const sekolah = await data_sekolah.findOne();
        if (!sekolah) {
            return res.status(404).json({ message: 'Data sekolah tidak ditemukan' });
        }

        res.json({
            nama: sekolah.nama,
            logo: sekolah.logo ? sekolah.logo.toString('base64') : null,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/data-sekolah/nama', async (req, res) => {
    try {
        const { nama } = req.body;
        if (!nama) {
            return res.status(400).json({ message: 'Nama harus diisi' });
        }

        let sekolah = await data_sekolah.findOne();
        if (!sekolah) {
            sekolah = await data_sekolah.create({ nama });
        } else {
            sekolah.nama = nama;
            await sekolah.save();
        }

        res.json(sekolah);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/data-sekolah/logo', upload.single('logo'), async (req, res) => {
    console.log(req.file); // Cek apakah file sudah diterima dengan benar
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'File logo harus diunggah' });
        }

        let sekolah = await data_sekolah.findOne();
        if (!sekolah) {
            return res.status(404).json({ message: 'Data sekolah tidak ditemukan' });
        }

        sekolah.logo = req.file.buffer; // Simpan file dalam bentuk Blob
        await sekolah.save();

        res.json({ message: 'Logo diperbarui' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});


router.delete('/data-sekolah/logo', async (req, res) => {
    try {
        let sekolah = await data_sekolah.findOne();
        if (!sekolah) {
            return res.status(404).json({ message: 'Data sekolah tidak ditemukan' });
        }

        sekolah.logo = null;
        await sekolah.save();

        res.json({ message: 'Logo dihapus' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;