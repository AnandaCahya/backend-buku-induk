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
          model: Models.data_diri,
          as: 'data_diri_approved',
          where: { status_perubahan: 'approved' },
          required: false,
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
    //1. Cek data yang berubah
    let caripending_datadiri = await Models.data_diri.findOne({
      where: {
        user_id: user_id,
        status_perubahan: "pending"
      }
    })
    let caripending_ayahkandung = await Models.ayah_kandung.findOne({
      where: {
        user_id: user_id,
        status_perubahan: "pending"
      }
    })
    let caripending_ibukandung = await Models.ibu_kandung.findOne({
      where: {
        user_id: user_id,
        status_perubahan: "pending"
      }
    })
    let caripending_hobisiswa = await Models.hobi_siswa.findOne({
      where: {
        user_id: user_id,
        status_perubahan: "pending"
      }
    })
    let caripending_kesehatan = await Models.kesehatan.findOne({
      where: {
        user_id: user_id,
        status_perubahan: "pending"
      }
    })
    let caripending_pendidikan = await Models.pendidikan.findOne({
      where: {
        user_id: user_id,
        status_perubahan: "pending"
      }
    })
    let caripending_perkembangan = await Models.perkembangan.findOne({
      where: {
        user_id: user_id,
        status_perubahan: "pending"
      }
    })
    let caripending_setelahpendidikan = await Models.setelah_pendidikan.findOne({
      where: {
        user_id: user_id,
        status_perubahan: "pending"
      }
    })
    let caripending_tempattinggal = await Models.tempat_tinggal.findOne({
      where: {
        user_id: user_id,
        status_perubahan: "pending"
      }
    })
    let caripending_wali = await Models.wali.findOne({
      where: {
        user_id: user_id,
        status_perubahan: "pending"
      }
    })

    //2. Cek dulu sikambing ini. Kalau ada lansgung update
    if (caripending_datadiri) {
      await Object.keys(caripending_datadiri).forEach(async (k) => {
        if (caripending_datadiri[k] == null) await delete caripending_datadiri[k];
        if (typeof caripending_datadiri[k] === "string" && caripending_datadiri[k] === "") caripending_datadiri[k] = null
        await delete caripending_datadiri["id"];
        await delete caripending_datadiri["status_perubahan"];
      })
      console.log(`Updating model: data_diri:`, caripending_datadiri);
      const updateResult = await Models.data_diri.update(caripending_datadiri, {
        where: {
          user_id: user_id,
          status_perubahan: "approved"
        }
      });

      console.log(`Update result for data_diri:`, updateResult);
    }

    if (caripending_ayahkandung) {
      await Object.keys(caripending_ayahkandung).forEach(async (k) => {
        if (caripending_ayahkandung[k] == null) await delete caripending_ayahkandung[k];
        if (typeof caripending_ayahkandung[k] === "string" && caripending_ayahkandung[k] === "") caripending_ayahkandung[k] = null;
        await delete caripending_ayahkandung["id"];
        await delete caripending_ayahkandung["status_perubahan"];
      });
      console.log(`Updating model: ayah_kandung:`, caripending_ayahkandung);
      const updateResult = await Models.ayah_kandung.update(caripending_ayahkandung, {
        where: {
          user_id: user_id,
          status_perubahan: "approved"
        }
      });

      console.log(`Update result for ayah_kandung:`, updateResult);
    }

    if (caripending_ibukandung) {
      await Object.keys(caripending_ibukandung).forEach(async (k) => {
        if (caripending_ibukandung[k] == null) await delete caripending_ibukandung[k];
        if (typeof caripending_ibukandung[k] === "string" && caripending_ibukandung[k] === "") caripending_ibukandung[k] = null;
        await delete caripending_ibukandung["id"];
        await delete caripending_ibukandung["status_perubahan"];
      });
      console.log(`Updating model: ibu_kandung:`, caripending_ibukandung);
      const updateResult = await Models.ibu_kandung.update(caripending_ibukandung, {
        where: {
          user_id: user_id,
          status_perubahan: "approved"
        }
      });

      console.log(`Update result for ibu_kandung:`, updateResult);
    }

    if (caripending_hobisiswa) {
      await Object.keys(caripending_hobisiswa).forEach(async (k) => {
        if (caripending_hobisiswa[k] == null) await delete caripending_hobisiswa[k];
        if (typeof caripending_hobisiswa[k] === "string" && caripending_hobisiswa[k] === "") caripending_hobisiswa[k] = null;
        await delete caripending_hobisiswa["id"];
        await delete caripending_hobisiswa["status_perubahan"];
      });
      console.log(`Updating model: hobi_siswa:`, caripending_hobisiswa);
      const updateResult = await Models.hobi_siswa.update(caripending_hobisiswa, {
        where: {
          user_id: user_id,
          status_perubahan: "approved"
        }
      });

      console.log(`Update result for hobi_siswa:`, updateResult);
    }

    if (caripending_kesehatan) {
      await Object.keys(caripending_kesehatan).forEach(async (k) => {
        if (caripending_kesehatan[k] == null) await delete caripending_kesehatan[k];
        if (typeof caripending_kesehatan[k] === "string" && caripending_kesehatan[k] === "") caripending_kesehatan[k] = null;
        await delete caripending_kesehatan["id"];
        await delete caripending_kesehatan["status_perubahan"];
      });
      console.log(`Updating model: kesehatan:`, caripending_kesehatan);
      const updateResult = await Models.kesehatan.update(caripending_kesehatan, {
        where: {
          user_id: user_id,
          status_perubahan: "approved"
        }
      });

      console.log(`Update result for kesehatan:`, updateResult);
    }

    if (caripending_pendidikan) {
      await Object.keys(caripending_pendidikan).forEach(async (k) => {
        if (caripending_pendidikan[k] == null) await delete caripending_pendidikan[k];
        if (typeof caripending_pendidikan[k] === "string" && caripending_pendidikan[k] === "") caripending_pendidikan[k] = null;
        await delete caripending_pendidikan["id"];
        await delete caripending_pendidikan["status_perubahan"];
      });
      console.log(`Updating model: pendidikan:`, caripending_pendidikan);
      const updateResult = await Models.pendidikan.update(caripending_pendidikan, {
        where: {
          user_id: user_id,
          status_perubahan: "approved"
        }
      });

      console.log(`Update result for pendidikan:`, updateResult);
    }

    if (caripending_perkembangan) {
      await Object.keys(caripending_perkembangan).forEach(async (k) => {
        if (caripending_perkembangan[k] == null) await delete caripending_perkembangan[k];
        if (typeof caripending_perkembangan[k] === "string" && caripending_perkembangan[k] === "") caripending_perkembangan[k] = null;
        await delete caripending_perkembangan["id"];
        await delete caripending_perkembangan["status_perubahan"];
      });
      console.log(`Updating model: perkembangan:`, caripending_perkembangan);
      const updateResult = await Models.perkembangan.update(caripending_perkembangan, {
        where: {
          user_id: user_id,
          status_perubahan: "approved"
        }
      });

      console.log(`Update result for perkembangan:`, updateResult);
    }

    if (caripending_setelahpendidikan) {
      await Object.keys(caripending_setelahpendidikan).forEach(async (k) => {
        if (caripending_setelahpendidikan[k] == null) await delete caripending_setelahpendidikan[k];
        if (typeof caripending_setelahpendidikan[k] === "string" && caripending_setelahpendidikan[k] === "") caripending_setelahpendidikan[k] = null;
        await delete caripending_setelahpendidikan["id"];
        await delete caripending_setelahpendidikan["status_perubahan"];
      });
      console.log(`Updating model: setelah_pendidikan:`, caripending_setelahpendidikan);
      const updateResult = await Models.setelah_pendidikan.update(caripending_setelahpendidikan, {
        where: {
          user_id: user_id,
          status_perubahan: "approved"
        }
      });

      console.log(`Update result for setelah_pendidikan:`, updateResult);
    }

    if (caripending_tempattinggal) {
      await Object.keys(caripending_tempattinggal).forEach(async (k) => {
        if (caripending_tempattinggal[k] == null) await delete caripending_tempattinggal[k];
        if (typeof caripending_tempattinggal[k] === "string" && caripending_tempattinggal[k] === "") caripending_tempattinggal[k] = null;
        await delete caripending_tempattinggal["id"];
        await delete caripending_tempattinggal["status_perubahan"];
      });
      console.log(`Updating model: tempat_tinggal:`, caripending_tempattinggal);
      const updateResult = await Models.tempat_tinggal.update(caripending_tempattinggal, {
        where: {
          user_id: user_id,
          status_perubahan: "approved"
        }
      });

      console.log(`Update result for tempat_tinggal:`, updateResult);
    }

    if (caripending_wali) {
      await Object.keys(caripending_wali).forEach(async (k) => {
        if (caripending_wali[k] == null) await delete caripending_wali[k];
        if (typeof caripending_wali[k] === "string" && caripending_wali[k] === "") caripending_wali[k] = null;
        await delete caripending_wali["id"];
        await delete caripending_wali["status_perubahan"];
      });
      console.log(`Updating model: wali:`, caripending_wali);
      const updateResult = await Models.wali.update(caripending_wali, {
        where: {
          user_id: user_id,
          status_perubahan: "approved"
        }
      });

      console.log(`Update result for wali:`, updateResult);
    }

    //3. Last chance buat di cek lagi kalau masih ada data pending. Terus hapus data pending saja
    if (caripending_datadiri) {
      await Models.data_diri.destroy({
        where: {
          user_id: user_id,
          status_perubahan: "pending"
        }
      });
      console.log(`Deleted pending data data_diri`)
    }
    if (caripending_ayahkandung) {
      await Models.ayah_kandung.destroy({
        where: {
          user_id: user_id,
          status_perubahan: "pending"
        }
      });
      console.log(`Deleted pending data ayah_kandung`);
    }
    
    if (caripending_ibukandung) {
      await Models.ibu_kandung.destroy({
        where: {
          user_id: user_id,
          status_perubahan: "pending"
        }
      });
      console.log(`Deleted pending data ibu_kandung`);
    }
    
    if (caripending_hobisiswa) {
      await Models.hobi_siswa.destroy({
        where: {
          user_id: user_id,
          status_perubahan: "pending"
        }
      });
      console.log(`Deleted pending data hobi_siswa`);
    }
    
    if (caripending_kesehatan) {
      await Models.kesehatan.destroy({
        where: {
          user_id: user_id,
          status_perubahan: "pending"
        }
      });
      console.log(`Deleted pending data kesehatan`);
    }
    
    if (caripending_pendidikan) {
      await Models.pendidikan.destroy({
        where: {
          user_id: user_id,
          status_perubahan: "pending"
        }
      });
      console.log(`Deleted pending data pendidikan`);
    }
    
    if (caripending_perkembangan) {
      await Models.perkembangan.destroy({
        where: {
          user_id: user_id,
          status_perubahan: "pending"
        }
      });
      console.log(`Deleted pending data perkembangan`);
    }
    
    if (caripending_setelahpendidikan) {
      await Models.setelah_pendidikan.destroy({
        where: {
          user_id: user_id,
          status_perubahan: "pending"
        }
      });
      console.log(`Deleted pending data setelah_pendidikan`);
    }
    
    if (caripending_tempattinggal) {
      await Models.tempat_tinggal.destroy({
        where: {
          user_id: user_id,
          status_perubahan: "pending"
        }
      });
      console.log(`Deleted pending data tempat_tinggal`);
    }
    
    if (caripending_wali) {
      await Models.wali.destroy({
        where: {
          user_id: user_id,
          status_perubahan: "pending"
        }
      });
      console.log(`Deleted pending data wali`);
    }    

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
