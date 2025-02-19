/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                A N G K A T A N
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

? Bagian ini isinya api untuk memanipulasi angkatan
! Dimohon memberikan note atau komentar pada bagian bagian route agar mempermudah development

*/

const { Router } = require('express')
const { Models } = require('../../models') 

const router = Router()
const angkatan = Models.angkatan

//* Membuat angkatan baru
/**
 * POST /admin/angkatan
 * @summary Membuat data angkatan baru
 * @tags admin
 * @param {object} request.body.request.required - Data angkatan yang akan dibuat
 * @param {string} request.body.tahun.required - Tahun angkatan yang akan dibuat
 * @return {object} 201 - Data angkatan yang berhasil dibuat - application/json
 * @return {object} 400 - Bad request error - application/json
 * @example response - 201 - Sukses membuat angkatan baru
 * {
 *   "id": 1,
 *   "tahun": 2024
 * }
 * @example response - 400 - Kesalahan dalam permintaan
 * {
 *   "error": "Validation error"
 * }
 */
router.post('/angkatan', async (req, res) => {
  try {
    const newAngkatan = await angkatan.create(req.body)
    res.status(201).json(newAngkatan)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

/**
 * GET /admin/angkatan
 * @summary Mengambil semua data angkatan
 * @tags admin
 * @return {array<object>} 200 - Daftar semua angkatan - application/json
 * @return {object} 500 - Internal server error - application/json
 * @example response - 200 - Daftar angkatan yang berhasil diambil
 * [
 *   {
 *     "id": 1,
 *     "tahun": 2024
 *   },
 *   {
 *     "id": 2,
 *     "tahun": 2023
 *   }
 * ]
 * @example response - 500 - Kesalahan pada server
 * {
 *   "error": "Database connection failed"
 * }
 */
router.get('/angkatan', async (req, res) => {
  try {
    const allAngkatan = await angkatan.findAll()
    res.status(200).json(allAngkatan)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

/**
 * GET /admin/angkatan/{id}
 * @summary Mengambil data angkatan berdasarkan ID angkatan
 * @tags admin
 * @param {integer} id.path.required - ID angkatan yang ingin diambil
 * @return {object} 200 - Data angkatan yang ditemukan - application/json
 * @return {object} 404 - Angkatan tidak ditemukan - application/json
 * @return {object} 500 - Internal server error - application/json
 * @example response - 200 - Data angkatan yang berhasil diambil
 * {
 *   "id": 1,
 *   "tahun": 2024
 * }
 * @example response - 404 - Angkatan tidak ditemukan
 * {
 *   "error": "Angkatan not found"
 * }
 * @example response - 500 - Kesalahan pada server
 * {
 *   "error": "Database connection failed"
 * }
 */
router.get('/angkatan/:id', async (req, res) => {
  try {
    const oneAngkatan = await angkatan.findByPk(req.params.id)
    if (oneAngkatan) {
      res.status(200).json(oneAngkatan)
    } else {
      res.status(404).json({ error: 'Angkatan not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

/**
 * PUT /admin/angkatan/{id}
 * @summary Mengubah data angkatan berdasarkan ID angkatan
 * @tags admin
 * @param {integer} id.path.required - ID angkatan yang ingin diubah
 * @param {object} request.body.request.required - Data yang akan diubah
 * @param {integer} request.body.tahun.required - Tahun angkatan yang baru
 * @return {object} 200 - Angkatan berhasil diupdate - application/json
 * @return {object} 404 - Angkatan tidak ditemukan - application/json
 * @return {object} 500 - Internal server error - application/json
 * @example response - 200 - Angkatan berhasil diupdate
 * {
 *   "message": "Angkatan updated successfully"
 * }
 * @example response - 404 - Angkatan tidak ditemukan
 * {
 *   "error": "Angkatan not found"
 * }
 * @example response - 500 - Kesalahan pada server
 * {
 *   "error": "Database update failed"
 * }
 */
router.put('/angkatan/:id', async (req, res) => {
  try {
    console.log(req.body)
    const updatedAngkatan = await angkatan.update(
      { tahun: req.body.tahun },
      {
        where: { id: req.params.id },
      }
    )
    if (updatedAngkatan[0] > 0) {
      res.status(200).json({ message: 'Angkatan updated successfully' })
    } else {
      res.status(404).json({ error: 'Angkatan not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
