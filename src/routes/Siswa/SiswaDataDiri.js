/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                        U B A H  D A T A  S I S W A
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

? Bagian ini isinya api untuk memanipulasi data siswa
! Dimohon memberikan note atau komentar pada bagian bagian route agar mempermudah development

*/

const { Router } = require('express')
const { Models } = require('../../models');
const { Op } = require('sequelize');

const router = Router()

/**
 * GET data-diri
 * @summary Mengambil data diri siswa beserta informasi terkait lainnya dan status perubahan "pending" jika ada
 * @tags siswa
 * @param {string} user_id.query.required - ID pengguna yang data dirinya ingin diambil
 * @return {object} 200 - Data diri siswa beserta status perubahan jika ada - application/json
 * @return {object} 500 - Terjadi kesalahan pada server - application/json
 * @example response - 200 - Data diri siswa ditemukan dengan status perubahan yang sedang pending
 * {
 *   "id": 1,
 *   "nama": "John Doe",
 *   "jurusan": {
 *     "nama": "Teknik Informatika"
 *   },
 *   "angkatan": {
 *     "tahun": "2024"
 *   },
 *   "data_diri": { ... },
 *   "perkembangan": { ... },
 *   "ayah_kandung": { ... },
 *   "ibu_kandung": { ... },
 *   "kesehatan": { ... },
 *   "pendidikan": { ... },
 *   "setelah_pendidikan": { ... },
 *   "tempat_tinggal": { ... },
 *   "wali": { ... },
 *   "hobi_siswa": { ... },
 *   "pending_changes": true
 * }
 * @example response - 200 - Data diri siswa ditemukan tanpa perubahan status pending
 * {
 *   "id": 1,
 *   "nama": "John Doe",
 *   "jurusan": {
 *     "nama": "Teknik Informatika"
 *   },
 *   "angkatan": {
 *     "tahun": "2024"
 *   },
 *   "data_diri": { ... },
 *   "perkembangan": { ... },
 *   "ayah_kandung": { ... },
 *   "ibu_kandung": { ... },
 *   "kesehatan": { ... },
 *   "pendidikan": { ... },
 *   "setelah_pendidikan": { ... },
 *   "tempat_tinggal": { ... },
 *   "wali": { ... },
 *   "hobi_siswa": { ... },
 *   "pending_changes": false
 * }
 * @example response - 500 - Kesalahan pada server
 * {
 *   "error": "Internal server error"
 * }
 */
router.get('/data-diri', async (req, res) => {
  try {
    const user = await Models.user.findOne({
      include: [
        {
          model: Models.jurusan,
          as: 'jurusan',
          attributes: ['nama'],
        },
        {
          model: Models.angkatan,
          as: 'angkatan',
          attributes: ['tahun'],
        },
        {
          model: Models.data_diri,
          as: 'data_diri',
          where: {
            [Op.not]: {
              status_perubahan: 'pending',  
            },
          },
        },
        {
          model: Models.perkembangan,
          as: 'perkembangan',
          where: {
            [Op.not]: {
              status_perubahan: 'pending',  
            },
          },
        },
        {
          model: Models.ayah_kandung,
          as: 'ayah_kandung',
          where: {
            [Op.not]: {
              status_perubahan: 'pending',  
            },
          },
        },
        {
          model: Models.ibu_kandung,
          as: 'ibu_kandung',
          where: {
            [Op.not]: {
              status_perubahan: 'pending',  
            },
          },
        },
        {
          model: Models.kesehatan,
          as: 'kesehatan',
          where: {
            [Op.not]: {
              status_perubahan: 'pending',  
            },
          },
        },
        {
          model: Models.pendidikan,
          as: 'pendidikan',
          where: {
            [Op.not]: {
              status_perubahan: 'pending',  
            },
          },
        },
        {
          model: Models.setelah_pendidikan,
          as: 'setelah_pendidikan',
          where: {
            [Op.not]: {
              status_perubahan: 'pending',  
            },
          },
        },
        {
          model: Models.tempat_tinggal,
          as: 'tempat_tinggal',
          where: {
            [Op.not]: {
              status_perubahan: 'pending',  
            },
          },
        },
        {
          model: Models.wali,
          as: 'wali',
          where: {
            [Op.not]: {
              status_perubahan: 'pending',  
            },
          },
        },
        {
          model: Models.hobi_siswa,
          as: 'hobi_siswa',
          where: {
            [Op.not]: {
              status_perubahan: 'pending',  
            },
          },
        },
      ],
      where: {
        id: req.user_id,
      },
    });

    
    const pendingChanges = await Models.data_diri.findOne({
      where: {
        user_id: req.user_id,
        status_perubahan: 'pending',
      },
    }) || await Models.perkembangan.findOne({
      where: {
        user_id: req.user_id,
        status_perubahan: 'pending',
      },
    }) || await Models.ayah_kandung.findOne({
      where: {
        user_id: req.user_id,
        status_perubahan: 'pending',
      },
    }) || await Models.ibu_kandung.findOne({
      where: {
        user_id: req.user_id,
        status_perubahan: 'pending',
      },
    }) || await Models.kesehatan.findOne({
      where: {
        user_id: req.user_id,
        status_perubahan: 'pending',
      },
    }) || await Models.pendidikan.findOne({
      where: {
        user_id: req.user_id,
        status_perubahan: 'pending',
      },
    }) || await Models.setelah_pendidikan.findOne({
      where: {
        user_id: req.user_id,
        status_perubahan: 'pending',
      },
    }) || await Models.tempat_tinggal.findOne({
      where: {
        user_id: req.user_id,
        status_perubahan: 'pending',
      },
    }) || await Models.wali.findOne({
      where: {
        user_id: req.user_id,
        status_perubahan: 'pending',
      },
    }) || await Models.hobi_siswa.findOne({
      where: {
        user_id: req.user_id,
        status_perubahan: 'pending',
      },
    });

    
    if (!user) {
      return res.status(404).json({ error: 'Data tidak ditemukan' });
    }

    res.status(200).json({
      ...user.dataValues,
      pending_changes: pendingChanges ? true : false, 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET data-diri/pending
 * @summary Mengambil data siswa yang status perubahannya "pending"
 * @tags siswa
 * @param {string} user_id.query.required - ID pengguna yang data dirinya ingin diperiksa
 * @return {object} 200 - Data siswa yang status perubahan-nya "pending" - application/json
 * @return {object} 500 - Terjadi kesalahan pada server - application/json
 * @example response - 200 - Data siswa dengan status perubahan yang sedang pending
 * {
 *   "id": 1,
 *   "nama": "John Doe",
 *   "jurusan": {
 *     "nama": "Teknik Informatika"
 *   },
 *   "angkatan": {
 *     "tahun": "2024"
 *   },
 *   "data_diri": { ... },
 *   "perkembangan": { ... },
 *   "ayah_kandung": { ... },
 *   "ibu_kandung": { ... },
 *   "kesehatan": { ... },
 *   "pendidikan": { ... },
 *   "setelah_pendidikan": { ... },
 *   "tempat_tinggal": { ... },
 *   "wali": { ... },
 *   "hobi_siswa": { ... }
 * }
 * @example response - 500 - Kesalahan pada server
 * {
 *   "error": "Internal server error"
 * }
 */
router.get('/data-diri/pending', async (req, res) => {
  try {
    
    const userId = req.user_id;

    const pendingData = await Models.user.findOne({
      where: {
        id: userId,
      },
      include: [
        {
          model: Models.jurusan,
          as: 'jurusan',
          attributes: ['nama'],
        },
        {
          model: Models.angkatan,
          as: 'angkatan',
          attributes: ['tahun'],
        },
        {
          model: Models.data_diri,
          as: 'data_diri',
          where: { status_perubahan: 'pending' },
        },
        {
          model: Models.perkembangan,
          as: 'perkembangan',
          where: { status_perubahan: 'pending' },
        },
        {
          model: Models.ayah_kandung,
          as: 'ayah_kandung',
          where: { status_perubahan: 'pending' },
        },
        {
          model: Models.ibu_kandung,
          as: 'ibu_kandung',
          where: { status_perubahan: 'pending' },
        },
        {
          model: Models.kesehatan,
          as: 'kesehatan',
          where: { status_perubahan: 'pending' },
        },
        {
          model: Models.pendidikan,
          as: 'pendidikan',
          where: { status_perubahan: 'pending' },
        },
        {
          model: Models.setelah_pendidikan,
          as: 'setelah_pendidikan',
          where: { status_perubahan: 'pending' },
        },
        {
          model: Models.tempat_tinggal,
          as: 'tempat_tinggal',
          where: { status_perubahan: 'pending' },
        },
        {
          model: Models.wali,
          as: 'wali',
          where: { status_perubahan: 'pending' },
        },
        {
          model: Models.hobi_siswa,
          as: 'hobi_siswa',
          where: { status_perubahan: 'pending' },
        },
      ],
    });

    if (!pendingData) {
      return res.status(404).json({ error: 'Tidak ada data siswa dengan status pending' });
    }

    
    return res.status(200).json(pendingData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Terjadi kesalahan saat mendapatkan data siswa dengan status pending' });
  }
});

/**
 * PUT data-diri
 * @summary Memperbarui data diri siswa
 * @tags siswa
 * @param {object} request.body.request.required - Data yang akan diperbarui
 * @param {AyahKandung} request.body.ayah_kandung - Informasi ayah kandung siswa
 * @param {IBuKandung} request.body.ibu_kandung - Informasi ibu kandung siswa
 * @param {DataDiri} request.body.data_diri - Informasi umum data diri siswa
 * @param {HobiSiswa} request.body.hobi - Informasi hobi siswa
 * @param {Kesehatan} request.body.kesehatan - Informasi kesehatan siswa
 * @param {Pendidikan} request.body.pendidikan - Informasi pendidikan siswa
 * @param {Perkembangan} request.body.perkembangan - Informasi perkembangan siswa
 * @param {SetelahPendidikan} request.body.setelah_pendidikan - Informasi setelah pendidikan siswa
 * @param {TempatTinggal} request.body.tempat_tinggal - Informasi tempat tinggal siswa
 * @param {Wali} request.body.wali - Informasi wali siswa
 * @return {object} 200 - Data berhasil diperbarui - application/json
 * @return {object} 500 - Terjadi kesalahan saat memperbarui data - application/json
 * @example response - 200 - Data berhasil diperbarui
 * {
 *   "message": "Data updated successfully"
 * }
 * @example response - 500 - Kesalahan saat memperbarui data
 * {
 *   "error": "An error occurred while updating the data"
 * }
 */
router.put('/data-diri', async (req, res) => {
  const user_id = req.user_id
  const {
    ayah_kandung,
    ibu_kandung,
    data_diri,
    hobi,
    kesehatan,
    pendidikan,
    perkembangan,
    setelah_pendidikan,
    tempat_tinggal,
    wali,
  } = req.body

  try {
    

    const existingDataDiri = await Models.data_diri.findOne({ where: { user_id, status_perubahan: 'pending' } });
    if (existingDataDiri) {
      await Models.data_diri.update({ ...data_diri, status_perubahan: 'pending' }, { where: { user_id, status_perubahan: 'pending' } });
    } else {
      await Models.data_diri.create({ ...data_diri, user_id, status_perubahan: 'pending' });
    }

    
    const existingAyahKandung = await Models.ayah_kandung.findOne({ where: { user_id, status_perubahan: 'pending' } });
    if (existingAyahKandung) {
      await Models.ayah_kandung.update({ ...ayah_kandung, status_perubahan: 'pending' }, { where: { user_id, status_perubahan: 'pending' } });
    } else {
      await Models.ayah_kandung.create({ ...ayah_kandung, user_id, status_perubahan: 'pending' });
    }

    
    const existingIbuKandung = await Models.ibu_kandung.findOne({ where: { user_id, status_perubahan: 'pending' } });
    if (existingIbuKandung) {
      await Models.ibu_kandung.update({ ...ibu_kandung, status_perubahan: 'pending' }, { where: { user_id, status_perubahan: 'pending' } });
    } else {
      await Models.ibu_kandung.create({ ...ibu_kandung, user_id, status_perubahan: 'pending' });
    }

    
    const existingHobiSiswa = await Models.hobi_siswa.findOne({ where: { user_id, status_perubahan: 'pending' } });
    if (existingHobiSiswa) {
      await Models.hobi_siswa.update({ ...hobi, status_perubahan: 'pending' }, { where: { user_id, status_perubahan: 'pending' } });
    } else {
      await Models.hobi_siswa.create({ ...hobi, user_id, status_perubahan: 'pending' });
    }

    
    const existingKesehatan = await Models.kesehatan.findOne({ where: { user_id, status_perubahan: 'pending' } });
    if (existingKesehatan) {
      await Models.kesehatan.update({ ...kesehatan, status_perubahan: 'pending' }, { where: { user_id, status_perubahan: 'pending' } });
    } else {
      await Models.kesehatan.create({ ...kesehatan, user_id, status_perubahan: 'pending' });
    }

    
    const existingPendidikan = await Models.pendidikan.findOne({ where: { user_id, status_perubahan: 'pending' } });
    if (existingPendidikan) {
      await Models.pendidikan.update({ ...pendidikan, status_perubahan: 'pending' }, { where: { user_id, status_perubahan: 'pending' } });
    } else {
      await Models.pendidikan.create({ ...pendidikan, user_id, status_perubahan: 'pending' });
    }

    
    const existingPerkembangan = await Models.perkembangan.findOne({ where: { user_id, status_perubahan: 'pending' } });
    if (existingPerkembangan) {
      await Models.perkembangan.update({ ...perkembangan, status_perubahan: 'pending' }, { where: { user_id, status_perubahan: 'pending' } });
    } else {
      await Models.perkembangan.create({ ...perkembangan, user_id, status_perubahan: 'pending' });
    }

    
    const existingSetelahPendidikan = await Models.setelah_pendidikan.findOne({ where: { user_id, status_perubahan: 'pending' } });
    if (existingSetelahPendidikan) {
      await Models.setelah_pendidikan.update({ ...setelah_pendidikan, status_perubahan: 'pending' }, { where: { user_id, status_perubahan: 'pending' } });
    } else {
      await Models.setelah_pendidikan.create({ ...setelah_pendidikan, user_id, status_perubahan: 'pending' });
    }

    
    const existingTempatTinggal = await Models.tempat_tinggal.findOne({ where: { user_id, status_perubahan: 'pending' } });
    if (existingTempatTinggal) {
      await Models.tempat_tinggal.update({ ...tempat_tinggal, status_perubahan: 'pending' }, { where: { user_id, status_perubahan: 'pending' } });
    } else {
      await Models.tempat_tinggal.create({ ...tempat_tinggal, user_id, status_perubahan: 'pending' });
    }

    
    const existingWali = await Models.wali.findOne({ where: { user_id, status_perubahan: 'pending' } });
    if (existingWali) {
      await Models.wali.update({ ...wali, status_perubahan: 'pending' }, { where: { user_id, status_perubahan: 'pending' } });
    } else {
      await Models.wali.create({ ...wali, user_id, status_perubahan: 'pending' });
    }


    return res.json({ message: 'Data updated successfully' })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ error: 'An error occurred while updating the data' })
  }
})

module.exports = router