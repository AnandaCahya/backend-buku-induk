/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                    N I L A I  S I S W A
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

? Bagian ini isinya api untuk memanipulasi nilai
! Dimohon memberikan note atau komentar pada bagian bagian route agar mempermudah development

*/

const { Router } = require('express')
const { Models } = require('../../models') // Adjust the path as necessary
const { where } = require('sequelize')

const router = Router()
const nilai = Models.nilai

/**
 * POST /admin/nilai
 * @summary Membuat data nilai baru
 * @tags admin
 * @param {number} request.body.r - Nilai yang diberikan (angka).
 * @param {string} request.body.keterangan - Keterangan tambahan mengenai nilai.
 * @param {number} request.body.mapel_id - ID mata pelajaran terkait.
 * @param {number} request.body.tahun_pelajaran_id - ID tahun pelajaran terkait.
 * @param {number} request.body.user_id - ID pengguna yang terkait dengan nilai ini.
 * @return {object} 201 - Nilai berhasil dibuat - application/json
 * @return {object} 400 - Terjadi kesalahan dalam pembuatan data - application/json
 * @example request - Contoh request body
 *{
 *   "semester" : 4,
 *   "user_id" : 1,
 *   "data_sia" : {
 *       "sakit" : 2
 *   },
 *   "data" : [
 *       {
 *        "r" : 98,
 *           "keterangan" : "Bagus Banget",
 *           "mapel_id" : 2
 *       },
 *       {
 *           "r" : 98,
 *           "keterangan" : "Bagus Banget",
 *           "mapel_id" : 1
 *       }
 *   ]
 *}
 * @example response - 201 - Nilai berhasil dibuat
 * {
 *   "id": 1,
 *   "user_id": 1,
 *   "mapel_id": 1,
 *   "tahun_pelajaran_id": 1,
 *   "r": 85,
 *   "keterangan": "Siswa dapat mengikuti pelajaran dengan baik",
 * }
 * @example response - 400 - Kesalahan pembuatan data nilai
 * {
 *   "error": "Error message"
 * }
 */
router.post('/nilai', async (req, res) => {
  try {
    const { semester, user_id, data, sia } = req.body;

    
    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ error: 'Invalid data format' });
    }

    const deleteNilai = await Models.nilai.destroy({
      where : {
        user_id : user_id,
        semester : semester
      }
    })

    const deleteSIA = await Models.sia.destroy({
      where : {
        user_id : user_id,
        semester : semester
      }
    })

    // Map data to include semester and user_id
    const nilaiEntries = data.map(item => ({
      semester,
      user_id,
      r: item.r,
      keterangan: item.keterangan,
      mapel_id: item.mapel_id
    }));

    if(sia) {
      const new_SIA = await Models.sia.create({
        semester : semester,
        user_id,
        sakit : sia.sakit ?? 0,
        izin : sia.izin ?? 0,
        alpha : sia.alpha ?? 0
      })
    }

    // Bulk insert into the database
    const newNilai = await nilai.bulkCreate(nilaiEntries);

    res.status(201).json(newNilai);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


/**
 * GET /admin/nilai
 * @summary Mengambil semua data nilai
 * @tags admin
 * @return {array} 200 - Berhasil mengambil semua data nilai - application/json
 * @return {object} 500 - Terjadi kesalahan saat mengambil data - application/json
 * @example response - 200 - Berhasil mengambil semua data nilai
 * [
 *   {
 *     "id": 1,
 *     "user_id": 123,
 *     "mapel_id": 2,
 *     "r": 85,
 *     "keterangan": "Baik"
 *   },
 *   {
 *     "id": 2,
 *     "user_id": 124,
 *     "mapel_id": 3,
 *     "r": 90,
 *     "keterangan": "Sangat Baik"
 *   }
 * ]
 * @example response - 500 - Kesalahan saat mengambil data nilai
 * {
 *   "error": "Error message"
 * }
 */
router.get('/nilai', async (req, res) => {
  try {
    const allNilai = await nilai.findAll()
    res.status(200).json(allNilai)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

/**
 * GET /admin/nilai/{id}
 * @summary Mengambil data 'nilai' berdasarkan ID
 * @tags admin
 * @param {string} id.path.required - ID dari 'nilai' yang ingin diambil
 * @return {object} 200 - Objek 'nilai' yang ditemukan - application/json
 * @return {object} 404 - Pesan kesalahan jika 'nilai' tidak ditemukan - application/json
 * @return {object} 500 - Pesan kesalahan jika terjadi masalah pada server - application/json
 * @example response - 200 - 'Nilai' ditemukan
 *   {
 *     "id": 2,
 *     "user_id": 124,
 *     "mapel_id": 3,
 *     "r": 90,
 *     "keterangan": "Sangat Baik"
 *   }
 * @example response - 404 - 'Nilai' tidak ditemukan
 * {
 *   "error": "Nilai not found"
 * }
 * @example response - 500 - Kesalahan pada server
 * {
 *   "error": "Internal server error"
 * }
 */
router.get('/nilai/:id', async (req, res) => {
  try {
    const oneNilai = await nilai.findAll({
      where: {
        user_id: req.params.id
      },
      include: [
        {
          model: Models.mapel,
          as: 'mapel',
          attributes: ['nama'],
        }
      ]
    });

    if (oneNilai.length > 0) {
      const user = await Models.user.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: Models.angkatan,
            as: 'angkatan',
            attributes: ['tahun'],
          }
        ]
      });

      // Initialize all semesters with empty arrays
      let groupedBySemester = {
        "Semester 1": [],
        "Semester 2": [],
        "Semester 3": [],
        "Semester 4": [],
        "Semester 5": [],
        "Semester 6": []
      };

      // Use for...of to properly await each async operation
      for (const item of oneNilai) {
        
        const tahun_pelajaran = user.angkatan
          ? (parseInt(user.angkatan.tahun) + Math.floor(item.semester / 2) + 1) +
            "/" +
            (parseInt(user.angkatan.tahun) + Math.floor(item.semester / 2) + 2)
          : null;

        const semesterKey = `Semester ${item.semester}`;

        // Get SIA data properly with await
        const SIA = await Models.sia.findOne({
          where: {
            user_id: req.params.id,
            semester: item.semester
          }
        });
        console.log(item)

        groupedBySemester[semesterKey].push({
          ...item.toJSON(),
          tahun_pelajaran,
          SIA
        });
      }

      res.status(200).json(groupedBySemester);
    } else {
      // If no data found, return an empty structure for all semesters
      res.status(200).json({
        "Semester 1": [],
        "Semester 2": [],
        "Semester 3": [],
        "Semester 4": [],
        "Semester 5": [],
        "Semester 6": []
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




/**
 * PUT /admin/nilai/{id}
 * @summary Memperbarui data 'nilai' berdasarkan ID
 * @tags admin
 * @param {string} id.path.required - ID dari 'nilai' yang akan diperbarui
 * @param {object} request.body.request.required - Data yang akan diperbarui
 * @param {string} request.body.nama - Nama mata pelajaran
 * @param {number} request.body.nilai - Nilai yang akan diperbarui
 * @return {object} 200 - Nilai berhasil diperbarui - application/json
 * @return {object} 404 - Nilai tidak ditemukan - application/json
 * @return {object} 500 - Terjadi kesalahan saat memperbarui data - application/json
 * @example response - 200 - Nilai berhasil diperbarui
 * {
 *   "message": "Nilai updated successfully"
 * }
 * @example response - 404 - Nilai tidak ditemukan
 * {
 *   "error": "Nilai not found"
 * }
 * @example response - 500 - Kesalahan saat memperbarui data
 * {
 *   "error": "Internal server error"
 * }
 */
router.put('/nilai/:id', async (req, res) => {
  try {
    const updatedNilai = await nilai.update(req.body, {
      where: { id: req.params.id },
    })
    if (updatedNilai) {
      res.status(200).json({ message: 'Nilai updated successfully' })
    } else {
      res.status(404).json({ error: 'Nilai not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
