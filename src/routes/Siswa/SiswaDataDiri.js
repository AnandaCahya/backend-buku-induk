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
 * GET /siswa/data-diri
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
            status_data: {
              [Op.not]: 'pending',  
            },
          },
        },
        {
          model: Models.perkembangan,
          as: 'perkembangan',
          where: {
            status_data: {
              [Op.not]: 'pending',  
            },
          },
        },
        {
          model: Models.ayah_kandung,
          as: 'ayah_kandung',
          where: {
            status_data: {
              [Op.not]: 'pending',  
            },
          },
        },
        {
          model: Models.ibu_kandung,
          as: 'ibu_kandung',
          where: {
            status_data: {
              [Op.not]: 'pending',  
            },
          },
        },
        {
          model: Models.kesehatan,
          as: 'kesehatan',
          where: {
            status_data: {
              [Op.not]: 'pending',  
            },
          },
        },
        {
          model: Models.pendidikan,
          as: 'pendidikan',
          where: {
            status_data: {
              [Op.not]: 'pending',  
            },
          },
        },
        {
          model: Models.setelah_pendidikan,
          as: 'setelah_pendidikan',
          where: {
            status_data: {
              [Op.not]: 'pending',  
            },
          },
        },
        {
          model: Models.tempat_tinggal,
          as: 'tempat_tinggal',
          where: {
            status_data: {
              [Op.not]: 'pending',  
            },
          },
        },
        {
          model: Models.wali,
          as: 'wali',
          where: {
            status_data: {
              [Op.not]: 'pending',  
            },
          },
        },
        {
          model: Models.hobi_siswa,
          as: 'hobi_siswa',
          where: {
            status_data: {
              [Op.not]: 'pending',  
            },
          },
        },
      ],
      where: {
        id: req.user_id,
      },
    });


    const pendingData = await Models.user.findOne({
      where: {
        id: req.user_id,
        [Op.or]: [
          { '$data_diri.status_data$': 'pending' },
          { '$perkembangan.status_data$': 'pending' },
          { '$ayah_kandung.status_data$': 'pending' },
          { '$ibu_kandung.status_data$': 'pending' },
          { '$kesehatan.status_data$': 'pending' },
          { '$pendidikan.status_data$': 'pending' },
          { '$setelah_pendidikan.status_data$': 'pending' },
          { '$tempat_tinggal.status_data$': 'pending' },
          { '$wali.status_data$': 'pending' },
          { '$hobi_siswa.status_data$': 'pending' },
        ]
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
          where: { status_data: 'pending' },
          required: false,  // Allow data_diri to be null if no matching data found
        },
        {
          model: Models.perkembangan,
          as: 'perkembangan',
          where: { status_data: 'pending' },
          required: false,  // Allow perkembangan to be null if no matching data found
        },
        {
          model: Models.ayah_kandung,
          as: 'ayah_kandung',
          where: { status_data: 'pending' },
          required: false,  // Allow ayah_kandung to be null if no matching data found
        },
        {
          model: Models.ibu_kandung,
          as: 'ibu_kandung',
          where: { status_data: 'pending' },
          required: false,  // Allow ibu_kandung to be null if no matching data found
        },
        {
          model: Models.kesehatan,
          as: 'kesehatan',
          where: { status_data: 'pending' },
          required: false,  // Allow kesehatan to be null if no matching data found
        },
        {
          model: Models.pendidikan,
          as: 'pendidikan',
          where: { status_data: 'pending' },
          required: false,  // Allow pendidikan to be null if no matching data found
        },
        {
          model: Models.setelah_pendidikan,
          as: 'setelah_pendidikan',
          where: { status_data: 'pending' },
          required: false,  // Allow setelah_pendidikan to be null if no matching data found
        },
        {
          model: Models.tempat_tinggal,
          as: 'tempat_tinggal',
          where: { status_data: 'pending' },
          required: false,  // Allow tempat_tinggal to be null if no matching data found
        },
        {
          model: Models.wali,
          as: 'wali',
          where: { status_data: 'pending' },
          required: false,  // Allow wali to be null if no matching data found
        },
        {
          model: Models.hobi_siswa,
          as: 'hobi_siswa',
          where: { status_data: 'pending' },
          required: false,  // Allow hobi_siswa to be null if no matching data found
        },
      ],
    });

    const unverifiedData = await Models.user.findOne({
      where: {
        id: req.user_id,
        [Op.or]: [
          { '$data_diri.status_data$': 'unverified' },
          { '$perkembangan.status_data$': 'unverified' },
          { '$ayah_kandung.status_data$': 'unverified' },
          { '$ibu_kandung.status_data$': 'unverified' },
          { '$kesehatan.status_data$': 'unverified' },
          { '$pendidikan.status_data$': 'unverified' },
          { '$setelah_pendidikan.status_data$': 'unverified' },
          { '$tempat_tinggal.status_data$': 'unverified' },
          { '$wali.status_data$': 'unverified' },
          { '$hobi_siswa.status_data$': 'unverified' },
        ]
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
          where: { status_data: 'unverified' },
          required: false,
        },
        {
          model: Models.perkembangan,
          as: 'perkembangan',
          where: { status_data: 'unverified' },
          required: false,
        },
        {
          model: Models.ayah_kandung,
          as: 'ayah_kandung',
          where: { status_data: 'unverified' },
          required: false,
        },
        {
          model: Models.ibu_kandung,
          as: 'ibu_kandung',
          where: { status_data: 'unverified' },
          required: false,
        },
        {
          model: Models.kesehatan,
          as: 'kesehatan',
          where: { status_data: 'unverified' },
          required: false,
        },
        {
          model: Models.pendidikan,
          as: 'pendidikan',
          where: { status_data: 'unverified' },
          required: false,
        },
        {
          model: Models.setelah_pendidikan,
          as: 'setelah_pendidikan',
          where: { status_data: 'unverified' },
          required: false,
        },
        {
          model: Models.tempat_tinggal,
          as: 'tempat_tinggal',
          where: { status_data: 'unverified' },
          required: false,
        },
        {
          model: Models.wali,
          as: 'wali',
          where: { status_data: 'unverified' },
          required: false,
        },
        {
          model: Models.hobi_siswa,
          as: 'hobi_siswa',
          where: { status_data: 'unverified' },
          required: false,
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: 'Data tidak ditemukan' });
    }

    res.status(200).json({
      ...user.dataValues,
      pending_changes: pendingData ? true : false,
      need_verification: unverifiedData ? true : false,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /siswa/data-diri/pending
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
        [Op.or]: [
          { '$data_diri.status_data$': 'pending' },
          { '$perkembangan.status_data$': 'pending' },
          { '$ayah_kandung.status_data$': 'pending' },
          { '$ibu_kandung.status_data$': 'pending' },
          { '$kesehatan.status_data$': 'pending' },
          { '$pendidikan.status_data$': 'pending' },
          { '$setelah_pendidikan.status_data$': 'pending' },
          { '$tempat_tinggal.status_data$': 'pending' },
          { '$wali.status_data$': 'pending' },
          { '$hobi_siswa.status_data$': 'pending' },
        ]
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
          where: { status_data: 'pending' },
          required: false,  // Allow data_diri to be null if no matching data found
        },
        {
          model: Models.perkembangan,
          as: 'perkembangan',
          where: { status_data: 'pending' },
          required: false,  // Allow perkembangan to be null if no matching data found
        },
        {
          model: Models.ayah_kandung,
          as: 'ayah_kandung',
          where: { status_data: 'pending' },
          required: false,  // Allow ayah_kandung to be null if no matching data found
        },
        {
          model: Models.ibu_kandung,
          as: 'ibu_kandung',
          where: { status_data: 'pending' },
          required: false,  // Allow ibu_kandung to be null if no matching data found
        },
        {
          model: Models.kesehatan,
          as: 'kesehatan',
          where: { status_data: 'pending' },
          required: false,  // Allow kesehatan to be null if no matching data found
        },
        {
          model: Models.pendidikan,
          as: 'pendidikan',
          where: { status_data: 'pending' },
          required: false,  // Allow pendidikan to be null if no matching data found
        },
        {
          model: Models.setelah_pendidikan,
          as: 'setelah_pendidikan',
          where: { status_data: 'pending' },
          required: false,  // Allow setelah_pendidikan to be null if no matching data found
        },
        {
          model: Models.tempat_tinggal,
          as: 'tempat_tinggal',
          where: { status_data: 'pending' },
          required: false,  // Allow tempat_tinggal to be null if no matching data found
        },
        {
          model: Models.wali,
          as: 'wali',
          where: { status_data: 'pending' },
          required: false,  // Allow wali to be null if no matching data found
        },
        {
          model: Models.hobi_siswa,
          as: 'hobi_siswa',
          where: { status_data: 'pending' },
          required: false,  // Allow hobi_siswa to be null if no matching data found
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
async function updateOrCreate(model, data, user_id) {
  const existingData = await model.findOne({ where: { user_id, status_data: 'pending' } });
  if (existingData) {
    await model.update({ ...data, user_id }, { where: { user_id, status_data: 'pending' } });
  } else {
    await model.create({ ...data, user_id, status_data: 'pending' });
  }
}

router.put('/data-diri', async (req, res) => {
  const user_id = req.user_id
  const {
    ayah_kandung,
    ibu_kandung,
    data_diri,
    hobi_siswa,
    kesehatan,
    pendidikan,
    perkembangan,
    setelah_pendidikan,
    tempat_tinggal,
    wali,
  } = req.body

  try {


    if (data_diri) {
      await updateOrCreate(Models.data_diri, data_diri, user_id);
    }

    if (wali) {
      await updateOrCreate(Models.wali, wali, user_id);
    }

    if (ayah_kandung) {
      await updateOrCreate(Models.ayah_kandung, ayah_kandung, user_id);
    }

    if (ibu_kandung) {
      await updateOrCreate(Models.ibu_kandung, ibu_kandung, user_id);
    }

    if (hobi_siswa) {
      await updateOrCreate(Models.hobi_siswa, hobi_siswa, user_id);
    }

    if (kesehatan) {
      await updateOrCreate(Models.kesehatan, kesehatan, user_id);
    }

    if (pendidikan) {
      await updateOrCreate(Models.pendidikan, pendidikan, user_id);
    }

    if (perkembangan) {
      await updateOrCreate(Models.perkembangan, perkembangan, user_id);
    }

    if (setelah_pendidikan) {
      await updateOrCreate(Models.setelah_pendidikan, setelah_pendidikan, user_id);
    }

    if (tempat_tinggal) {
      await updateOrCreate(Models.tempat_tinggal, tempat_tinggal, user_id);
    }

    return res.json({ message: 'Data updated successfully' })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ error: 'An error occurred while updating the data' })
  }
})

/**
 * GET /siswa/data-diri/approved
 * @summary Mengambil data siswa yang status perubahannya "approved"
 * @tags siswa
 * @param {string} user_id.query.required - ID pengguna yang data dirinya ingin diperiksa
 * @return {object} 200 - Data siswa yang status perubahan-nya "approved" - application/json
 * @return {object} 500 - Terjadi kesalahan pada server - application/json
 * @example response - 200 - Data siswa dengan status perubahan yang sudah approved
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
router.get('/data-diri/approved', async (req, res) => {
  try {
    const userId = req.user_id;

    const approvedData = await Models.user.findOne({
      where: {
        id: userId,
        [Op.or]: [
          { '$data_diri.status_data$': 'approved' },
          { '$perkembangan.status_data$': 'approved' },
          { '$ayah_kandung.status_data$': 'approved' },
          { '$ibu_kandung.status_data$': 'approved' },
          { '$kesehatan.status_data$': 'approved' },
          { '$pendidikan.status_data$': 'approved' },
          { '$setelah_pendidikan.status_data$': 'approved' },
          { '$tempat_tinggal.status_data$': 'approved' },
          { '$wali.status_data$': 'approved' },
          { '$hobi_siswa.status_data$': 'approved' },
        ]
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
          where: { status_data: 'approved' },
          required: false,
        },
        {
          model: Models.perkembangan,
          as: 'perkembangan',
          where: { status_data: 'approved' },
          required: false,
        },
        {
          model: Models.ayah_kandung,
          as: 'ayah_kandung',
          where: { status_data: 'approved' },
          required: false,
        },
        {
          model: Models.ibu_kandung,
          as: 'ibu_kandung',
          where: { status_data: 'approved' },
          required: false,
        },
        {
          model: Models.kesehatan,
          as: 'kesehatan',
          where: { status_data: 'approved' },
          required: false,
        },
        {
          model: Models.pendidikan,
          as: 'pendidikan',
          where: { status_data: 'approved' },
          required: false,
        },
        {
          model: Models.setelah_pendidikan,
          as: 'setelah_pendidikan',
          where: { status_data: 'approved' },
          required: false,
        },
        {
          model: Models.tempat_tinggal,
          as: 'tempat_tinggal',
          where: { status_data: 'approved' },
          required: false,
        },
        {
          model: Models.wali,
          as: 'wali',
          where: { status_data: 'approved' },
          required: false,
        },
        {
          model: Models.hobi_siswa,
          as: 'hobi_siswa',
          where: { status_data: 'approved' },
          required: false,
        },
      ],
    });

    if (!approvedData) {
      return res.status(404).json({
        error: 'Tidak ada data perubahan yang telah disetujui'
      });
    }

    return res.status(200).json({
      message: 'Data perubahan yang telah disetujui',
      data: approvedData
    });

  } catch (error) {
    console.error('Error fetching approved data:', error);
    return res.status(500).json({
      error: 'Terjadi kesalahan server saat mengambil data yang telah disetujui',
      details: error.message
    });
  }
});

module.exports = router