/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                        D A F T A R  D A T A  S I S W A
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

? Bagian ini isinya api untuk memanipulasi data siswa
! Dimohon memberikan note atau komentar pada bagian bagian route agar mempermudah development

*/

const { Router } = require('express')
const { Models } = require('../../models')

const router = Router()

/**
 * POST /siswa/data-diri
 * @summary Menambahkan data diri siswa beserta informasi terkait lainnya
 * @tags siswa
 * @param {object} request.body.request.required - Data yang akan ditambahkan
 * @param {object} request.body.data_diri - Data diri siswa
 * @param {object} request.body.hobi - Data hobi siswa
 * @param {object} request.body.ayah_kandung - Data ayah kandung siswa
 * @param {object} request.body.ibu_kandung - Data ibu kandung siswa
 * @param {object} request.body.kesehatan - Data kesehatan siswa
 * @param {object} request.body.pendidikan - Data pendidikan siswa
 * @param {object} request.body.setelah_pendidikan - Data setelah pendidikan siswa
 * @param {object} request.body.tempat_tinggal - Data tempat tinggal siswa
 * @param {object} request.body.wali - Data wali siswa
 * @param {object} request.body.siswa - Data siswa (termasuk NISN dan informasi lainnya)
 * @return {object} 201 - Data berhasil dibuat - application/json
 * @return {object} 400 - NISN sudah terpakai - application/json
 * @return {object} 500 - Terjadi kesalahan pada server - application/json
 * @example response - 201 - Data berhasil dibuat
 * {
 *   "message": "Data successfully created",
 *   "data": {
 *     "data_diri": { ... },
 *     "hobi": { ... },
 *     "ayah_kandung": { ... },
 *     "ibu_kandung": { ... },
 *     "kesehatan": { ... },
 *     "pendidikan": { ... },
 *     "setelah_pendidikan": { ... },
 *     "tempat_tinggal": { ... },
 *     "wali": { ... },
 *     "siswa": { ... }
 *   }
 * }
 * @example response - 400 - NISN sudah terpakai
 * {
 *   "message": "NISN sudah terpakai"
 * }
 * @example response - 500 - Kesalahan pada server
 * {
 *   "message": "Internal server error"
 * }
 */
router.post('/data-diri', async (req, res) => {
    try {
      const {
        data_diri,
        hobi,
        ayah_kandung,
        ibu_kandung,
        kesehatan,
        pendidikan,
        setelah_pendidikan,
        tempat_tinggal,
        wali,
        perkembangan,
        siswa,
      } = req.body
  
      const caridulu = await Models.user.findOne({ where: {nisn: siswa.nisn}})
      if(caridulu) return res.status(400).json({message: "NISN sudah digunakan"}) 
      const user = await Models.user.create(siswa)
  
      
      await Models.data_diri.create({ ...data_diri, user_id: user.id, status_data: "unverified" })
      await Models.hobi_siswa.create({ ...hobi, user_id: user.id, status_data: "unverified" })
      await Models.ayah_kandung.create({ ...ayah_kandung, user_id: user.id, status_data: "unverified" })
      await Models.ibu_kandung.create({ ...ibu_kandung, user_id: user.id, status_data: "unverified" })
      await Models.kesehatan.create({ ...kesehatan, user_id: user.id, status_data: "unverified" })
      await Models.pendidikan.create({ ...pendidikan, user_id: user.id, status_data: "unverified" })
      await Models.setelah_pendidikan.create({
        ...setelah_pendidikan,
        user_id: user.id,
        status_data: "unverified"
      })
      await Models.tempat_tinggal.create({
        ...tempat_tinggal,
        user_id: user.id,
        status_data: "unverified"
      })
      await Models.perkembangan.create({
        ...perkembangan,
        user_id: user.id,
        status_data: "unverified"
      })
  
      await Models.wali.create({ ...wali, user_id: user.id, status_data: "unverified" })
  
      res.status(201).json({
        message: 'Data successfully created',
        data: req.body,
      })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' })
      await Models.user.destroy({
        where: {
          nisn: req.body.siswa.nisn,
        },
      })
    }
  })

  module.exports = router