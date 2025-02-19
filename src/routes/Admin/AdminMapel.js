/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                                M A P E L
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

? Bagian ini isinya api untuk memanipulasi nilai siswa
! Dimohon memberikan note atau komentar pada bagian bagian route agar mempermudah development

*/

const { Router } = require('express')
const { Models } = require('../../models')

const router = Router()
const mapel = Models.mapel

/**
 * POST /admin/mapel
 * @summary Menambahkan mata pelajaran baru
 * @tags admin
 * @param {object} body.payload.required - Data mata pelajaran yang akan ditambahkan
 * @param {string} body.payload.nama.required - Nama mata pelajaran
 * @return {Mapel} 201 - Mata pelajaran berhasil ditambahkan - application/json
 * @return {object} 400 - Gagal menambahkan mata pelajaran - application/json
 * @example response - 201 - Mata pelajaran berhasil ditambahkan
 * {
 *   "id": 1,
 *   "nama": "Matematika"
 * }
 * @example response - 400 - Gagal menambahkan mata pelajaran
 * {
 *   "error": "Data tidak valid"
 * }
 */
router.post('/mapel', async (req, res) => {
  try {
    const newMapel = await mapel.create(req.body)
    res.status(201).json(newMapel)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

/**
 * GET /admin/mapel
 * @summary Mengambil semua mata pelajaran
 * @tags admin
 * @return {array<Mapel>} 200 - Daftar mata pelajaran - application/json
 * @return {object} 500 - Terjadi kesalahan saat mengambil data - application/json
 * @example response - 200 - Daftar mata pelajaran
 * [
 *   {
 *     "id": 1,
 *     "nama": "Matematika"
 *   },
 *   {
 *     "id": 2,
 *     "nama": "Fisika"
 *   }
 * ]
 * @example response - 500 - Kesalahan saat mengambil data
 * {
 *   "error": "Internal server error"
 * }
 */
router.get('/mapel', async (req, res) => {
  try {
    const allMapel = await mapel.findAll()
    res.status(200).json(allMapel)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

/**
 * GET /admin/mapel/{id}
 * @summary Mengambil mata pelajaran berdasarkan ID
 * @tags admin
 * @param {integer} id.path.required - ID mata pelajaran
 * @return {object} 200 - Mata pelajaran ditemukan - application/json
 * @return {object} 404 - Mata pelajaran tidak ditemukan - application/json
 * @return {object} 500 - Terjadi kesalahan saat mengambil data - application/json
 * @example response - 200 - Mata pelajaran ditemukan
 * {
 *   "id": 1,
 *   "nama": "Matematika"
 * }
 * @example response - 404 - Mata pelajaran tidak ditemukan
 * {
 *   "error": "Mapel not found"
 * }
 * @example response - 500 - Kesalahan saat mengambil data
 * {
 *   "error": "Internal server error"
 * }
 */
router.get('/mapel/:id', async (req, res) => {
  try {
    const oneMapel = await mapel.findByPk(req.params.id)
    if (oneMapel) {
      res.status(200).json(oneMapel)
    } else {
      res.status(404).json({ error: 'Mapel not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

/**
 * PUT /admin/mapel/{id}
 * @summary Memperbarui data mata pelajaran berdasarkan ID
 * @tags admin
 * @param {integer} id.path.required - ID mata pelajaran
 * @param {object} request.body.request.required - Data yang akan diperbarui
 * @param {string} request.body.nama - Nama mata pelajaran
 * @return {object} 200 - Mata pelajaran berhasil diperbarui - application/json
 * @return {object} 404 - Mata pelajaran tidak ditemukan - application/json
 * @return {object} 500 - Terjadi kesalahan saat memperbarui data - application/json
 * @example response - 200 - Mata pelajaran berhasil diperbarui
 * {
 *   "message": "Mapel updated successfully"
 * }
 * @example response - 404 - Mata pelajaran tidak ditemukan
 * {
 *   "error": "Mapel not found"
 * }
 * @example response - 500 - Kesalahan saat memperbarui data
 * {
 *   "error": "Internal server error"
 * }
 */
router.put('/mapel/:id', async (req, res) => {
  try {
    const updatedMapel = await mapel.update(req.body, {
      where: { id: req.params.id },
    })
    if (updatedMapel) {
      res.status(200).json({ message: 'Mapel updated successfully' })
    } else {
      res.status(404).json({ error: 'Mapel not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
