const { Models } = require('../models')

const AuthMiddlewareAdmin = async (req, res, next) => {
  try {
    const authorization = req.headers['authorization']
    if (authorization == null || authorization == undefined) {
      res.status(401).json({ message: 'your token is missing' })
      return
    }

    const token = authorization.split(' ')[1]
    const data = await Models.admin.findOne({
      where: {
        token,
      },
    })

    if (data == undefined || data == null) {
      res.status(401).json({ message: 'Erorr role' })
      return
    }

    req.user_id = data.id
    next()
  } catch (ex) {
    res.status(401).json({ message: ex })
  }
}

const AuthMiddlewareSiswa = async (req, res, next) => {
  try {
    const authorization = req.headers['authorization']
    if (authorization == null || authorization == undefined) {
      return res.status(401).json({ message: 'give me your token' })
    }

    const token = authorization.split(' ')[1]
    console.log(token)
    const data = await Models.user.findOne({
      where: {
        token,
      },
    })
    console.log(token, data)
    if (data == undefined || data == null) {
      return res.status(401).json({ message: 'Erorr role' })
    }

    req.user_id = data.id
    next()
  } catch (ex) {
    res.status(401).json({ message: 'Unauthorised' })
  }
}

module.exports = { AuthMiddlewareAdmin, AuthMiddlewareSiswa }
