/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                    D A T A  S E K O L A H
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

? Bagian ini isinya api untuk memanipulasi data atau informasi sekolah
! Dimohon memberikan note atau komentar pada bagian bagian route agar mempermudah development

*/

const { Router } = require('express')
const { Models } = require('../models')

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

module.exports = router;