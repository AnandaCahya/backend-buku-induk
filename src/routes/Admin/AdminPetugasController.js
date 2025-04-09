const { Router } = require('express')
const { Models } = require('../../models')
const { v4: uuidv4 } = require('uuid')
const nodemailer = require("nodemailer")

const router = Router()

/**
 * POST /admin/petugas
 * @summary Create a new petugas
 * @tags admin
 * @param {string} request.body.email.required - Email of the petugas
 * @param {string} request.body.password.required - Password for the petugas
 * @param {string} request.body.username.required - Username for the petugas
 * @return {object} 201 - Petugas created successfully - application/json
 * @return {object} 500 - Internal server error - application/json
 * @example request - Example input for creating a petugas
 * {
 *   "email": "newpetugas@example.com",
 *   "password": "securepassword",
 *   "username": "newpetugas"
 * }
 * @example response - 201 - Petugas created
 * {
 *   "action": "need_verification",
 *   "message": "Berhasil membuat akun petugas"
 * }
 */
router.post('/petugas', async (req, res) => {
  try {
    const { email, password, username } = req.body

    const newPetugas = await Models.admin.create({
      email,
      password,
      username,
      role: 'petugas',
      status: "belum aktif",
      verification_token: uuidv4()
    })

    if (process.env.USER == undefined) throw new Error()

    const trasnport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    })

    const response = trasnport.sendMail({
      from: process.env.USER,
      to: newPetugas.email,
      subject: 'Buku Induk Code',
      html: `<!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8" />
              <title>Kode Verifikasi Login</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f7f7f7;
                  margin: 0;
                  padding: 0;
                }
                .container {
                  width: 100%;
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  padding: 20px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                  text-align: center;
                  padding: 20px 0;
                }
                .header img {
                  max-width: 100px;
                }
                .content {
                  margin: 20px 0;
                }
                .content h1 {
                  font-size: 24px;
                  color: #333333;
                }
                .content p {
                  font-size: 16px;
                  color: #666666;
                  line-height: 1.5;
                }
                .verification-code {
                  display: block;
                  width: fit-content;
                  margin: 20px auto;
                  padding: 10px 20px;
                  background-color: #4caf50;
                  color: #ffffff;
                  font-size: 18px;
                  border-radius: 5px;
                  text-align: center;
                  text-decoration: none;
                }
                .footer {
                  text-align: center;
                  padding: 20px 0;
                  font-size: 12px;
                  color: #aaaaaa;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <img src="https://smkn2-singosari.sch.id/wp-content/uploads/2021/10/cropped-logo-2.png" alt="Company Logo" />
                </div>
                <div class="content">
                  <h1>Token Verifikasi</h1>
                  <p>Halo ${newPetugas.username},</p>
                  <p>Untuk melanjutkan login, silakan klik verifikasi berikut</p>
                  <a href="http://localhost:3000/verify/${newPetugas.verification_token}">Masuk</a>
                  <p>Atau login dan verifikasi menggunakan token ini</p>
                  <div class="verification-code">${newPetugas.verification_token}</div>
                  <p>Jika Anda tidak meminta kode ini, abaikan email ini.</p>
                  <p>Terima kasih,</p>
                  <p>Tim Rekayasa Perangkat Lunak</p>
                </div>
                <div class="footer">
                  <p>&copy; 2024 Rekayasa Perangkat Lunak. Semua Hak Cipta Dilindungi.</p>
                </div>
              </div>
            </body>
          </html>`,
    })

    res.status(201).json({
      action: "need_verification",
      message: "Berhasil membuat akun petugas"
    })
  } catch (error) {
    console.error('Error creating petugas:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

/**
 * GET /admin/petugas
 * @summary Get all petugas
 * @tags admin
 * @return {array<object>} 200 - List of petugas - application/json
 * @return {object} 500 - Internal server error - application/json
 * @example response - 200 - List of petugas
 * [
 *   {
 *     "id": 1,
 *     "email": "petugas1@example.com",
 *     "username": "petugas1",
 *     "role": "petugas"
 *   },
 *   {
 *     "id": 2,
 *     "email": "petugas2@example.com",
 *     "username": "petugas2",
 *     "role": "petugas"
 *   }
 * ]
 */
router.get('/petugas', async (req, res) => {
  try {
    const petugasList = await Models.admin.findAll({
      where: { role: 'petugas' },
    })

    res.json(petugasList)
  } catch (error) {
    console.error('Error fetching petugas:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

/**
 * PUT /admin/petugas/{id}
 * @summary Update a petugas
 * @tags admin
 * @param {string} id.path.required - ID of the petugas to update
 * @param {string} request.body.email - New email for the petugas
 * @param {string} request.body.password - New password for the petugas
 * @param {string} request.body.username - New username for the petugas
 * @return {object} 200 - Petugas updated successfully - application/json
 * @return {object} 404 - Petugas not found - application/json
 * @return {object} 500 - Internal server error - application/json
 * @example request - Example input for updating a petugas
 * {
 *   "email": "updatedpetugas@example.com",
 *   "password": "newpassword",
 *   "username": "updatedpetugas"
 * }
 * @example response - 200 - Petugas updated
 * {
 *   "id": 1,
 *   "email": "updatedpetugas@example.com",
 *   "username": "updatedpetugas",
 *   "role": "petugas"
 * }
 */
router.put('/petugas/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { email, password, username } = req.body

    const petugas = await Models.admin.findOne({
      where: { id, role: 'petugas' },
    })

    if (!petugas) {
      return res.status(404).json({ message: 'Petugas not found' })
    }

    petugas.email = email || petugas.email
    petugas.password = password || petugas.password
    petugas.username = username || petugas.username

    await petugas.save()

    res.json(petugas)
  } catch (error) {
    console.error('Error updating petugas:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

/**
 * DELETE /admin/petugas/{id}
 * @summary Delete a petugas
 * @tags admin
 * @param {string} id.path.required - ID of the petugas to delete
 * @return {object} 204 - Petugas deleted successfully - application/json
 * @return {object} 404 - Petugas not found - application/json
 * @return {object} 500 - Internal server error - application/json
 */
router.delete('/petugas/:id', async (req, res) => {
  try {
    const { id } = req.params

    const petugas = await Models.admin.findOne({
      where: { id, role: 'petugas' },
    })

    if (!petugas) {
      return res.status(404).json({ message: 'Petugas not found' })
    }

    await petugas.destroy()

    res.status(204).send()
  } catch (error) {
    console.error('Error deleting petugas:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

module.exports = router
