/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                J U R U S A N
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

? Bagian ini isinya api untuk memanipulasi jurusan
! Dimohon memberikan note atau komentar pada bagian bagian route agar mempermudah development

*/

const { Router } = require('express')
const { Models } = require('../../models') 

const router = Router()
const jurusan = Models.jurusan

/**
 * POST /admin/jurusan
 * @summary Membuat data jurusan baru
 * @tags admin
 * @param {object} request.body.request.required - Data jurusan yang akan dibuat
 * @param {string} request.body.nama.required - Nama jurusan yang akan dibuat
 * @return {object} 201 - Berhasil membuat jurusan baru - application/json
 * @return {object} 400 - Terjadi kesalahan saat membuat jurusan - application/json
 * @example response - 201 - Berhasil membuat jurusan baru
 * {
 *   "id": 1,
 *   "nama": "Teknik Informatika"
 * }
 * @example response - 400 - Terjadi kesalahan saat membuat jurusan
 * {
 *   "error": "Nama jurusan tidak boleh kosong"
 * }
 */
router.post('/jurusan', async (req, res) => {
  try {
    const newJurusan = await jurusan.create(req.body)
    res.status(201).json(newJurusan)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

/**
 * GET /admin/jurusan
 * @summary Mengambil semua data jurusan
 * @tags admin
 * @return {array<object>} 200 - Daftar semua jurusan - application/json
 * @return {object} 500 - Terjadi kesalahan saat mengambil data jurusan - application/json
 * @example response - 200 - Daftar semua jurusan
 * [
 *   {
 *     "id": 1,
 *     "nama": "Teknik Informatika"
 *   },
 *   {
 *     "id": 2,
 *     "nama": "Sistem Informasi"
 *   }
 * ]
 * @example response - 500 - Terjadi kesalahan saat mengambil data jurusan
 * {
 *   "error": "Terjadi kesalahan pada server"
 * }
 */
router.get('/jurusan', async (req, res) => {
  try {
    const allJurusan = await jurusan.findAll()
    res.status(200).json(allJurusan)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

/**
 * GET /admin/jurusan/{id}
 * @summary Mengambil data jurusan berdasarkan ID
 * @tags admin
 * @param {integer} id.path.required - ID jurusan yang akan diambil
 * @return {object} 200 - Data jurusan ditemukan - application/json
 * @return {object} 404 - Jurusan tidak ditemukan - application/json
 * @return {object} 500 - Terjadi kesalahan saat mengambil data jurusan - application/json
 * @example response - 200 - Data jurusan ditemukan
 * {
 *   "id": 1,
 *   "nama": "Teknik Informatika"
 * }
 * @example response - 404 - Jurusan tidak ditemukan
 * {
 *   "error": "Jurusan not found"
 * }
 * @example response - 500 - Terjadi kesalahan saat mengambil data jurusan
 * {
 *   "error": "Terjadi kesalahan pada server"
 * }
 */
router.get('/jurusan/:id', async (req, res) => {
  try {
    const oneJurusan = await jurusan.findByPk(req.params.id)
    if (oneJurusan) {
      res.status(200).json(oneJurusan)
    } else {
      res.status(404).json({ error: 'Jurusan not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

/**
 * PUT /admin/jurusan/{id}
 * @summary Memperbarui data jurusan berdasarkan ID
 * @tags admin
 * @param {integer} id.path.required - ID jurusan yang akan diperbarui
 * @param {object} body.payload.required - Data jurusan yang baru
 * @param {string} body.payload.nama.required - Nama jurusan yang baru
 * @return {object} 200 - Berhasil memperbarui jurusan - application/json
 * @return {object} 404 - Jurusan tidak ditemukan - application/json
 * @return {object} 500 - Terjadi kesalahan saat memperbarui jurusan - application/json
 * @example response - 200 - Jurusan berhasil diperbarui
 * {
 *   "message": "Jurusan updated successfully"
 * }
 * @example response - 404 - Jurusan tidak ditemukan
 * {
 *   "error": "Jurusan not found"
 * }
 * @example response - 500 - Terjadi kesalahan saat memperbarui jurusan
 * {
 *   "error": "Terjadi kesalahan pada server"
 * }
 */
router.put('/jurusan/:id', async (req, res) => {
  try {
    const updatedJurusan = await jurusan.update(req.body, {
      where: { id: req.params.id },
    })
    if (updatedJurusan) {
      res.status(200).json({ message: 'Jurusan updated successfully' })
    } else {
      res.status(404).json({ error: 'Jurusan not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
