const { Router } = require('express')
const { Models } = require('../../models')
const {
  dataDiriRequest,
  validatePerkembangan,
} = require('../../DTO/user-request')
const { Sequelize } = require('sequelize')

const routes = Router()

routes.get('/data/:id', async (req, res) => {
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

    return res.json(data)
  } catch (ex) {
    if (ex) console.log(ex)
    return res.status(500).json({ message: 'Internal server error' })
  }
})

routes.get('/ayah-kandung/:id', async (req, res) => {
  const data = await Models.ayah_kandung.findOne({
    where: {
      user_id: req.params.id,
    },
    attributes: {
      exclude: ['user_id'],
    },
  })
  res.json(data)
})

routes.get('/hobi/:id', async (req, res) => {
  const data = await Models.hobi_siswa.findOne({
    where: {
      user_id: req.params.id,
    },
    attributes: {
      exclude: ['user_id'],
    },
  })
  res.json(data)
})

routes.get('/ibu-kandung/:id', async (req, res) => {
  const data = await Models.ibu_kandung.findOne({
    where: {
      user_id: req.params.id,
    },
    attributes: {
      exclude: ['user_id'],
    },
  })
  res.json(data)
})

routes.get('/kesehatan/:id', async (req, res) => {
  const data = await Models.kesehatan.findOne({
    where: {
      user_id: req.params.id,
    },
    attributes: {
      exclude: ['user_id'],
    },
  })
  res.json(data)
})

routes.get('/pendidikan/:id', async (req, res) => {
  const data = await Models.pendidikan.findOne({
    where: {
      user_id: req.params.id,
    },
    attributes: {
      exclude: ['user_id'],
    },
  })
  res.json(data)
})

routes.get('/perkembangan/:id', async (req, res) => {
  const data = await Models.perkembangan.findOne({
    where: {
      user_id: req.params.id,
    },
    attributes: {
      exclude: ['user_id'],
    },
  })
  res.json(data)
})

routes.get('/setelah-pendidikan/:id', async (req, res) => {
  const data = await Models.setelah_pendidikan.findOne({
    where: {
      user_id: req.params.id,
    },
    attributes: {
      exclude: ['user_id'],
    },
  })
  res.json(data)
})

routes.get('/tempat-tinggal/:id', async (req, res) => {
  const data = await Models.tempat_tinggal.findOne({
    where: {
      user_id: req.params.id,
    },
    attributes: {
      exclude: ['user_id'],
    },
  })
  res.json(data)
})

routes.get('/wali/:id', async (req, res) => {
  const data = await Models.wali.findOne({
    where: {
      user_id: req.params.id,
    },
    attributes: {
      exclude: ['user_id'],
    },
  })
  res.json(data)
})

routes.post('/perkembangan/:id', validatePerkembangan, async (req, res) => {
  try {
    const body = req.body
    body.user_id = req.params.id
    const response = await Models.perkembangan.create(body)

    res.status(201).json(response)
  } catch (ex) {
    res.status(500)
  }
})

routes.get('/jurusan', async (req, res) => {
  try {
    const allJurusan = await Models.jurusan.findAll()
    res.status(200).json(allJurusan)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

routes.get('/angkatan', async (req, res) => {
  try {
    const allAngkatan = await Models.angkatan.findAll()
    res.status(200).json(allAngkatan)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = routes
