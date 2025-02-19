/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                A K U N  S I S W A
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

? Bagian ini isinya api untuk memanipulasi akun siswa
! Dimohon memberikan note atau komentar pada bagian bagian route agar mempermudah development

*/

const { Router } = require('express')
const { Models } = require('../../models')
const { akunRequest } = require('../../DTO/akun-request')

const routes = Router()

/**
 * GET /admin/akun
 * @summary Mengambil data akun siswa dengan filter berdasarkan jurusan, angkatan, dan pencarian nama
 * @tags admin
 * @param {string} jurusan.query - Nama jurusan untuk filter data siswa
 * @param {string} angkatan.query - Tahun angkatan untuk filter data siswa
 * @param {string} search.query - Pencarian nama siswa
 * @return {array<Admin>} 200 - Daftar akun siswa yang sesuai dengan filter - application/json
 * @example response - 200 - Sukses mendapatkan data akun siswa
 * [
 *   {
 *     "id": 1,
 *     "nisn": "1234567890",
 *     "nama": "John Doe",
 *     "jurusan": "Teknik Informatika",
 *     "angkatan": "2020"
 *   },
 *   {
 *     "id": 2,
 *     "nisn": "0987654321",
 *     "nama": "Jane Smith",
 *     "jurusan": "Rekayasa Perangkat Lunak",
 *     "angkatan": "2021"
 *   }
 * ]
 */
routes.get('/akun', async (req, res) => {
  const { jurusan, angkatan, search } = req.query

  const userData = await Models.user.findAll({
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
          status_perubahan: {
            [Op.not]: 'pending',  
          },
        },    
      },
      {
        model: Models.perkembangan,
        as: 'perkembangan',
        where: {
          status_perubahan: {
            [Op.not]: 'pending',  
          },
        },    
      },
      {
        model: Models.ayah_kandung,
        as: 'ayah_kandung',
        where: {
          status_perubahan: {
            [Op.not]: 'pending',  
          },
        },    
      },
      {
        model: Models.ibu_kandung,
        as: 'ibu_kandung',
        where: {
          status_perubahan: {
            [Op.not]: 'pending',  
          },
        },    
      },
      {
        model: Models.kesehatan,
        as: 'kesehatan',
        where: {
          status_perubahan: {
            [Op.not]: 'pending',  
          },
        },    
      },
      {
        model: Models.pendidikan,
        as: 'pendidikan',
        where: {
          status_perubahan: {
            [Op.not]: 'pending',  
          },
        },    
      },
      {
        model: Models.setelah_pendidikan,
        as: 'setelah_pendidikan',
        where: {
          status_perubahan: {
            [Op.not]: 'pending',  
          },
        },    
      },
      {
        model: Models.tempat_tinggal,
        as: 'tempat_tinggal',
        where: {
          status_perubahan: {
            [Op.not]: 'pending',  
          },
        },    
      },
      {
        model: Models.wali,
        as: 'wali',
        where: {
          status_perubahan: {
            [Op.not]: 'pending',  
          },
        },    
      },
      {
        model: Models.hobi_siswa,
        as: 'hobi_siswa',
        where: {
          status_perubahan: {
            [Op.not]: 'pending',  
          },
        },    
      },
    ],
  })

  let data = userData.map((user) => {
    return {
      id: user.id,
      nisn: user.nisn,
      nama: user.data_diri.nama_lengkap,
      jurusan: user.jurusan.nama,
      angkatan: user.angkatan.tahun,
    }
  })

  if (jurusan) data = data.filter((e) => e.jurusan == jurusan)
  if (angkatan) data = data.filter((e) => e.angkatan == angkatan)
  if (search)
    data = data.filter((e) =>
      e.nama.toLowerCase().includes(search.toLowerCase())
    )

  return res.json(data)
})

/**
 * POST /admin/akun
 * @summary Membuat akun siswa baru
 * @tags admin
 * @param {User} request.body - Data akun siswa yang akan dibuat
 * @return {object} 201 - Sukses membuat akun siswa - application/json
 * @return {object} 400 - Gagal membuat akun siswa, NISN sudah digunakan - application/json
 * @example response - 201 - Akun siswa berhasil dibuat
 * {
 *   "id": 1,
 *   "nisn": "1234567890",
 *   "username": "johndoe",
 *   "email": "johndoe@example.com",
 *   "jurusan_id": 1,
 *   "angkatan_id": 2020
 * }
 * @example response - 400 - NISN sudah digunakan
 * {
 *   "message": "NISN sudah digunakan"
 * }
 */
routes.post('/akun', akunRequest, async (req, res) => {
  try {
    const data = await Models.user.create(req.body)
    return res.status(201).json(data)
  } catch (ex) {
    return res.status(400).json({ message: 'NISN sudah digunakan' })
  }
})

/**
 * GET /admin/akun/{id}
 * @summary Mendapatkan data akun siswa beserta informasi terkait lainnya
 * @tags admin
 * @param {string} id.path.required - ID siswa yang ingin diambil datanya
 * @return {object} 200 - Data siswa yang berhasil diambil - application/json
 * @return {object} 500 - Internal server error - application/json
 * @example response - 200 - Sukses mendapatkan data siswa
 * {
 *   "id": 1,
 *   "nisn": "1234567890",
 *   "username": "johndoe",
 *   "email": "johndoe@example.com",
 *   "jurusan": {
 *     "nama": "Teknik Informatika"
 *   },
 *   "angkatan": {
 *     "tahun": 2020
 *   },
 *   "data_diri": {
 *     "nama_lengkap": "John Doe",
 *     "tanggal_lahir": "2000-01-01",
 *     "alamat": "Jl. Raya No. 1",
 *     "no_telepon": "08123456789",
 *     "agama": "Islam"
 *   },
 *   "perkembangan": {
 *     "status": "Aktif",
 *     "nilai": 85
 *   },
 *   "ayah_kandung": {
 *     "nama": "Bapak John",
 *     "pekerjaan": "Karyawan"
 *   },
 *   "ibu_kandung": {
 *     "nama": "Ibu Jane",
 *     "pekerjaan": "Ibu Rumah Tangga"
 *   },
 *   "kesehatan": {
 *     "riwayat_penyakit": "Tidak ada"
 *   },
 *   "pendidikan": {
 *     "sekolah_terakhir": "SMA Negeri 1"
 *   },
 *   "setelah_pendidikan": {
 *     "rencana_kerja": "Bekerja di bidang IT"
 *   },
 *   "tempat_tinggal": {
 *     "alamat": "Jl. Raya No. 1"
 *   },
 *   "wali": {
 *     "nama": "Wali John",
 *     "hubungan": "Saudara"
 *   },
 *   "hobi_siswa": {
 *     "hobi": "Bermain game, membaca"
 *   },
 *   "status_perkembangan": true
 * }
 * @example response - 500 - Terjadi kesalahan pada server
 * {
 *   "message": "Internal server error"
 * }
 */
routes.get('/akun/:id', async (req, res) => {
  try {
    const userInstance = await Models.user.findOne({
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
            status_perubahan: {
              [Op.not]: 'pending',  
            },
          },    
        },
        {
          model: Models.perkembangan,
          as: 'perkembangan',
          where: {
            status_perubahan: {
              [Op.not]: 'pending',  
            },
          },    
        },
        {
          model: Models.ayah_kandung,
          as: 'ayah_kandung',
          where: {
            status_perubahan: {
              [Op.not]: 'pending',  
            },
          },    
        },
        {
          model: Models.ibu_kandung,
          as: 'ibu_kandung',
          where: {
            status_perubahan: {
              [Op.not]: 'pending',  
            },
          },    
        },
        {
          model: Models.kesehatan,
          as: 'kesehatan',
          where: {
            status_perubahan: {
              [Op.not]: 'pending',  
            },
          },    
        },
        {
          model: Models.pendidikan,
          as: 'pendidikan',
          where: {
            status_perubahan: {
              [Op.not]: 'pending',  
            },
          },    
        },
        {
          model: Models.setelah_pendidikan,
          as: 'setelah_pendidikan',
          where: {
            status_perubahan: {
              [Op.not]: 'pending',  
            },
          },    
        },
        {
          model: Models.tempat_tinggal,
          as: 'tempat_tinggal',
          where: {
            status_perubahan: {
              [Op.not]: 'pending',  
            },
          },    
        },
        {
          model: Models.wali,
          as: 'wali',
          where: {
            status_perubahan: {
              [Op.not]: 'pending',  
            },
          },    
        },
        {
          model: Models.hobi_siswa,
          as: 'hobi_siswa',
          where: {
            status_perubahan: {
              [Op.not]: 'pending',  
            },
          },    
        },
      ],
      where: {
        id: req.params.id,
      },
    })

    const data = userInstance.get({ plain: true })

    data['status_perkembangan'] = data.perkembangan != null

    return res.json(data)
  } catch (ex) {
    if (ex) console.log(ex)
    return res.status(500).json({ message: 'Internal server error' })
  }
})

/**
 * PUT /admin/akun/{id}
 * @summary Memperbarui data akun siswa berdasarkan ID
 * @tags admin
 * @param {string} id.path.required - ID siswa yang ingin diperbarui
 * @param {object} request.body.request.required - Data yang akan diperbarui pada akun siswa
 * @return {object} 200 - Data akun siswa yang berhasil diperbarui - application/json
 * @return {object} 400 - Bad request error - application/json
 * @return {object} 404 - User not found error - application/json
 * @example response - 200 - Sukses memperbarui data siswa
 * {
 *   "id": 1,
 *   "nisn": "1234567890",
 *   "username": "johndoe",
 *   "email": "johndoe@example.com",
 *   "jurusan": {
 *     "nama": "Teknik Informatika"
 *   },
 *   "angkatan": {
 *     "tahun": 2020
 *   },
 *   "data_diri": {
 *     "nama_lengkap": "John Doe",
 *     "tanggal_lahir": "2000-01-01",
 *     "alamat": "Jl. Raya No. 1",
 *     "no_telepon": "08123456789",
 *     "agama": "Islam"
 *   },
 *   "status_perkembangan": true
 * }
 * @example response - 400 - Kesalahan dalam permintaan
 * {
 *   "message": "Validation error"
 * }
 * @example response - 404 - User tidak ditemukan
 * {
 *   "message": "User not found"
 * }
 */
routes.put('/akun/:id', async (req, res) => {
  try {
    const data = await Models.user.findOne({
      where: {
        id: req.params.id,
      },
    })
    if (!data) {
      return res.status(404).json({ message: 'User not found' })
    }

    const updatedUser = await data.update(req.body)

    return res.json(updatedUser)
  } catch (ex) {
    return res.status(400).json({ message: ex })
  }
})

module.exports = routes
