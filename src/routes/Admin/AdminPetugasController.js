const { Router } = require('express')
const { Models } = require('../../models')

const router = Router()

router.post('/petugas', async (req, res) => {
  try {
    const { email, password, username } = req.body

    const newPetugas = await Models.admin.create({
      email,
      password,
      username,
      role: 'petugas', 
    })

    res.status(201).json(newPetugas)
  } catch (error) {
    console.error('Error creating petugas:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

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
