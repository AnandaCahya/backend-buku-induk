/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                 D A T A  S I S W A
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

? Bagian ini isinya api untuk memanipulasi Data siswa
! Dimohon memberikan note atau komentar pada bagian bagian route agar mempermudah development

*/

const { Router } = require('express')
const { Models } = require('../../models')
const { Op } = require('sequelize')

const router = Router()

/**
 * PUT /admin/data-diri/{id}
 * @summary Mengubah data diri siswa berdasarkan ID siswa
 * @tags admin
 * @param {integer} id.path.required - ID siswa yang datanya ingin diubah
 * @param {object} request.body.request.required - Data diri yang ingin diperbarui
 * @param {object} request.body.ayah_kandung.required - Data ayah kandung siswa
 * @param {object} request.body.ibu_kandung.required - Data ibu kandung siswa
 * @param {object} request.body.data_diri.required - Data diri siswa (seperti nama, alamat, dll.)
 * @param {object} request.body.hobi.required - Data hobi siswa
 * @param {object} request.body.kesehatan.required - Data kesehatan siswa
 * @param {object} request.body.pendidikan.required - Data pendidikan siswa
 * @param {object} request.body.perkembangan.required - Data perkembangan siswa
 * @param {object} request.body.setelah_pendidikan.required - Data setelah pendidikan siswa
 * @param {object} request.body.tempat_tinggal.required - Data tempat tinggal siswa
 * @param {object} request.body.wali.required - Data wali siswa
 * @return {object} 200 - Data berhasil diperbarui - application/json
 * @return {object} 500 - Terjadi kesalahan saat memperbarui data - application/json
 * @example response - 200 - Data berhasil diperbarui
 * {
 *   "message": "Data updated successfully"
 * }
 * @example response - 500 - Terjadi kesalahan pada server
 * {
 *   "error": "An error occurred while updating the data"
 * }
 */
router.put('/data-diri/:id', async (req, res) => {
  const user_id = req.params.id
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
    await Models.ayah_kandung.update(ayah_kandung, { where: { user_id, status_perubahan: { [Op.ne]: 'pending' } } });
    await Models.ibu_kandung.update(ibu_kandung, { where: { user_id, status_perubahan: { [Op.ne]: 'pending' } } });
    await Models.data_diri.update(data_diri, { where: { user_id, status_perubahan: { [Op.ne]: 'pending' } } });
    await Models.hobi_siswa.update(hobi, { where: { user_id, status_perubahan: { [Op.ne]: 'pending' } } });
    await Models.kesehatan.update(kesehatan, { where: { user_id, status_perubahan: { [Op.ne]: 'pending' } } });
    await Models.pendidikan.update(pendidikan, { where: { user_id, status_perubahan: { [Op.ne]: 'pending' } } });
    await Models.perkembangan.update(perkembangan, { where: { user_id, status_perubahan: { [Op.ne]: 'pending' } } });
    await Models.setelah_pendidikan.update(setelah_pendidikan, { where: { user_id, status_perubahan: { [Op.ne]: 'pending' } } });
    await Models.tempat_tinggal.update(tempat_tinggal, { where: { user_id, status_perubahan: { [Op.ne]: 'pending' } } });
    await Models.wali.update(wali, { where: { user_id, status_perubahan: { [Op.ne]: 'pending' } } });

    return res.json({ message: 'Data updated successfully' })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ error: 'An error occurred while updating the data' })
  }
})

/**
 * GET /data-diri/pending
 * @summary Admin melihat data siswa yang status perubahan-nya "pending"
 * @tags admin
 * @return {object} 200 - Data siswa yang status perubahan-nya "pending" - application/json
 * @return {object} 500 - Terjadi kesalahan saat mendapatkan data - application/json
 */
router.get('/data-diri/pending', async (req, res) => {
  try {

    const pendingData = await Models.user.findAll({
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
            status_perubahan: 'pending', // Hanya memilih yang statusnya 'pending'
          },
          required: false, // Mengizinkan user tanpa data 'pending' di sini
        },
        {
          model: Models.perkembangan,
          as: 'perkembangan',
          where: {
            status_perubahan: 'pending', // Hanya memilih yang statusnya 'pending'
          },
          required: false, // Mengizinkan user tanpa data 'pending' di sini
        },
        {
          model: Models.ayah_kandung,
          as: 'ayah_kandung',
          where: {
            status_perubahan: 'pending',
          },
          required: false,
        },
        {
          model: Models.ibu_kandung,
          as: 'ibu_kandung',
          where: {
            status_perubahan: 'pending',
          },
          required: false,
        },
        {
          model: Models.kesehatan,
          as: 'kesehatan',
          where: {
            status_perubahan: 'pending',
          },
          required: false,
        },
        {
          model: Models.pendidikan,
          as: 'pendidikan',
          where: {
            status_perubahan: 'pending',
          },
          required: false,
        },
        {
          model: Models.setelah_pendidikan,
          as: 'setelah_pendidikan',
          where: {
            status_perubahan: 'pending',
          },
          required: false,
        },
        {
          model: Models.tempat_tinggal,
          as: 'tempat_tinggal',
          where: {
            status_perubahan: 'pending',
          },
          required: false,
        },
        {
          model: Models.wali,
          as: 'wali',
          where: {
            status_perubahan: 'pending',
          },
          required: false,
        },
        {
          model: Models.hobi_siswa,
          as: 'hobi_siswa',
          where: {
            status_perubahan: 'pending',
          },
          required: false,
        },
      ],
      where: {
        [Op.or]: [
          { '$data_diri.status_perubahan$': 'pending' },
          { '$perkembangan.status_perubahan$': 'pending' },
          { '$ayah_kandung.status_perubahan$': 'pending' },
          { '$ibu_kandung.status_perubahan$': 'pending' },
          { '$kesehatan.status_perubahan$': 'pending' },
          { '$pendidikan.status_perubahan$': 'pending' },
          { '$setelah_pendidikan.status_perubahan$': 'pending' },
          { '$tempat_tinggal.status_perubahan$': 'pending' },
          { '$wali.status_perubahan$': 'pending' },
          { '$hobi_siswa.status_perubahan$': 'pending' },
        ],
      },
      distinct: true,
    });

    if (pendingData.length === 0) {
      return res.status(404).json({ error: 'Tidak ada data siswa dengan status pending' });
    }

    return res.json({ data: pendingData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Terjadi kesalahan saat mendapatkan data siswa' });
  }
});

/**
 * GET /data-diri/pending/{id-siswa}
 * @summary Admin melihat data siswa tertentu yang status perubahan-nya "pending"
 * @tags admin
 * @param {integer} id.path.required - ID siswa yang datanya ingin dilihat
 * @return {object} 200 - Data siswa yang status perubahan-nya "pending" - application/json
 * @return {object} 404 - Data siswa tidak ditemukan atau tidak ada status pending - application/json
 * @return {object} 500 - Terjadi kesalahan saat mendapatkan data - application/json
 */
router.get('/data-diri/pending/:id', async (req, res) => {
  const user_id = req.params.id;

  try {

    const pendingData = await Models.user.findOne({
      where: {
        id: user_id,
        [Op.or]: [
          { '$data_diri.status_perubahan$': 'pending' },
          { '$perkembangan.status_perubahan$': 'pending' },
          { '$ayah_kandung.status_perubahan$': 'pending' },
          { '$ibu_kandung.status_perubahan$': 'pending' },
          { '$kesehatan.status_perubahan$': 'pending' },
          { '$pendidikan.status_perubahan$': 'pending' },
          { '$setelah_pendidikan.status_perubahan$': 'pending' },
          { '$tempat_tinggal.status_perubahan$': 'pending' },
          { '$wali.status_perubahan$': 'pending' },
          { '$hobi_siswa.status_perubahan$': 'pending' },
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
          where: { status_perubahan: 'pending' },
          required: false,  // Allow data_diri to be null if no matching data found
        },
        {
          model: Models.perkembangan,
          as: 'perkembangan',
          where: { status_perubahan: 'pending' },
          required: false,  // Allow perkembangan to be null if no matching data found
        },
        {
          model: Models.ayah_kandung,
          as: 'ayah_kandung',
          where: { status_perubahan: 'pending' },
          required: false,  // Allow ayah_kandung to be null if no matching data found
        },
        {
          model: Models.ibu_kandung,
          as: 'ibu_kandung',
          where: { status_perubahan: 'pending' },
          required: false,  // Allow ibu_kandung to be null if no matching data found
        },
        {
          model: Models.kesehatan,
          as: 'kesehatan',
          where: { status_perubahan: 'pending' },
          required: false,  // Allow kesehatan to be null if no matching data found
        },
        {
          model: Models.pendidikan,
          as: 'pendidikan',
          where: { status_perubahan: 'pending' },
          required: false,  // Allow pendidikan to be null if no matching data found
        },
        {
          model: Models.setelah_pendidikan,
          as: 'setelah_pendidikan',
          where: { status_perubahan: 'pending' },
          required: false,  // Allow setelah_pendidikan to be null if no matching data found
        },
        {
          model: Models.tempat_tinggal,
          as: 'tempat_tinggal',
          where: { status_perubahan: 'pending' },
          required: false,  // Allow tempat_tinggal to be null if no matching data found
        },
        {
          model: Models.wali,
          as: 'wali',
          where: { status_perubahan: 'pending' },
          required: false,  // Allow wali to be null if no matching data found
        },
        {
          model: Models.hobi_siswa,
          as: 'hobi_siswa',
          where: { status_perubahan: 'pending' },
          required: false,  // Allow hobi_siswa to be null if no matching data found
        },
      ],
    });

    if (!pendingData) {
      return res.status(404).json({ error: 'Data siswa tidak ditemukan atau tidak ada status pending' });
    }

    return res.json({ data: pendingData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Terjadi kesalahan saat mendapatkan data siswa' });
  }
});

/**
 * POST /data-diri/pending/{id-siswa}
 * @summary Admin menyetujui dan mengubah status data diri siswa yang pending menjadi approved
 * @tags admin
 * @param {integer} id.path.required - ID siswa yang datanya ingin disetujui
 * @return {object} 200 - Data berhasil disetujui - application/json
 * @return {object} 500 - Terjadi kesalahan saat menyetujui data - application/json
 */
router.post('/data-diri/pending/:id', async (req, res) => {
  const user_id = req.params.id;
  const models = [
    'data_diri',
    'ayah_kandung',
    'ibu_kandung',
    'hobi_siswa',
    'kesehatan',
    'pendidikan',
    'perkembangan',
    'setelah_pendidikan',
    'tempat_tinggal',
    'wali'
  ];

  try {
    await Promise.all(models.map(async (model) => {
      let [pendingData] = await Promise.all([
        Models[model].findOne({
          where: {
            user_id: user_id,
            status_perubahan: "pending"
          }
        })
      ]);

      if (!pendingData?.dataValues) return;
      pendingData = pendingData.dataValues;

      await Promise.all(Object.keys(pendingData).map((k) => {
        if (pendingData[k] == null) delete pendingData[k];
        delete pendingData["id"];
        delete pendingData["status_perubahan"];
      }));
      console.log(`Updating model: ${model}, Data:`, pendingData);

      const updateResult = await Models[model].update(pendingData, {
        where: {
          user_id: user_id,
          status_perubahan: "approved"
        }
      });

      console.log(`Update result for ${model}:`, updateResult);
    }));

    await Promise.all(models.map(model => {
      return Models[model].destroy({
        where: {
          user_id: user_id,
          status_perubahan: "pending"
        }
      });
    }));

    return res.json({ message: 'Data successfully approved' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'An error occurred while approving the data' });
  }
});


/**
 * DELETE /data-diri/pending/{id-siswa}
 * @summary Admin menolak permintaan perubahan data dan menghapus data dengan status pending
 * @tags admin
 * @param {integer} id.path.required - ID siswa yang datanya ingin ditolak
 * @return {object} 200 - Data berhasil dihapus - application/json
 * @return {object} 500 - Terjadi kesalahan saat menghapus data - application/json
 * @example response - 200 - Data berhasil diperbarui
 * { message: 'Data berhasil ditolak' }
 * @example response - 500 - Terjadi kesalahan pada server
 * {
 *   "error": "An error occurred while updating the data"
 * }
 */
router.delete('/data-diri/pending/:id', async (req, res) => {
  const user_id = req.params.id;

  try {

    await Models.data_diri.destroy({
      where: {
        user_id,
        status_perubahan: 'pending',
      }
    });

    await Models.ayah_kandung.destroy({
      where: {
        user_id,
        status_perubahan: 'pending',
      }
    });

    await Models.ibu_kandung.destroy({
      where: {
        user_id,
        status_perubahan: 'pending',
      }
    });

    await Models.hobi_siswa.destroy({
      where: {
        user_id,
        status_perubahan: 'pending',
      }
    });

    await Models.kesehatan.destroy({
      where: {
        user_id,
        status_perubahan: 'pending',
      }
    });

    await Models.pendidikan.destroy({
      where: {
        user_id,
        status_perubahan: 'pending',
      }
    });

    await Models.perkembangan.destroy({
      where: {
        user_id,
        status_perubahan: 'pending',
      }
    });

    await Models.setelah_pendidikan.destroy({
      where: {
        user_id,
        status_perubahan: 'pending',
      }
    });

    await Models.tempat_tinggal.destroy({
      where: {
        user_id,
        status_perubahan: 'pending',
      }
    });

    await Models.wali.destroy({
      where: {
        user_id,
        status_perubahan: 'pending',
      }
    });


    return res.json({ message: 'Data berhasil ditolak' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while deleting the pending data' });
  }
});


/**
 * GET /admin/dashboard
 * @summary Mengambil statistik dashboard admin yang mencakup jumlah siswa dan data terkait jenis kelamin serta data terinput
 * @tags admin
 * @return {object} 200 - Berhasil mengambil statistik - application/json
 * @return {object} 500 - Terjadi kesalahan pada server - application/json
 * @example response - 200 - Berhasil mengambil statistik
 * {
 *   "count_datainputed": 500,
 *   "count_laki": 300,
 *   "count_perempuan": 200,
 *   "count_siswa": 500
 * }
 * @example response - 500 - Terjadi kesalahan pada server
 * {
 *   "error": "Internal server error"
 * }
 */
router.get('/dashboard', async (req, res) => {
  const count_siswa = await Models.user.count()
  const count_laki = await Models.data_diri.count({
    where: {
      jenis_kelamin: 'laki-laki',
    },
  })

  const count_perempuan = await Models.data_diri.count({
    where: {
      jenis_kelamin: 'perempuan',
    },
  })

  const count_datainputed = await Models.data_diri.count()

  res.status(200).json({
    count_datainputed,
    count_laki,
    count_perempuan,
    count_siswa,
  })
})

module.exports = router
