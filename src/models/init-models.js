var DataTypes = require('sequelize').DataTypes
var _admin = require('./admin')
var _angkatan = require('./angkatan')
var _ayah_kandung = require('./ayah_kandung')
var _data_diri = require('./data_diri')
var _hobi_siswa = require('./hobi_siswa')
var _ibu_kandung = require('./ibu_kandung')
var _jurusan = require('./jurusan')
var _kesehatan = require('./kesehatan')
var _pendidikan = require('./pendidikan')
var _sia = require('./sia')
var _perkembangan = require('./perkembangan')
var _setelah_pendidikan = require('./setelah_pendidikan')
var _tempat_tinggal = require('./tempat_tinggal')
var _user = require('./user')
var _wali = require('./wali')
var _mapel = require('./mapel')
var _nilai_merdeka = require('./nilai_merdeka')
var _tahun_pelajaran = require('./tahun_pelajaran')
var _data_sekolah = require("./data_sekolah")

function initModels(sequelize) {
  var admin = _admin(sequelize, DataTypes)
  var angkatan = _angkatan(sequelize, DataTypes)
  var ayah_kandung = _ayah_kandung(sequelize, DataTypes)
  var data_diri = _data_diri(sequelize, DataTypes)
  var hobi_siswa = _hobi_siswa(sequelize, DataTypes)
  var ibu_kandung = _ibu_kandung(sequelize, DataTypes)
  var jurusan = _jurusan(sequelize, DataTypes)
  var kesehatan = _kesehatan(sequelize, DataTypes)
  var pendidikan = _pendidikan(sequelize, DataTypes)
  var sia = _sia(sequelize, DataTypes)
  var perkembangan = _perkembangan(sequelize, DataTypes)
  var setelah_pendidikan = _setelah_pendidikan(sequelize, DataTypes)
  var tempat_tinggal = _tempat_tinggal(sequelize, DataTypes)
  var user = _user(sequelize, DataTypes)
  var wali = _wali(sequelize, DataTypes)
  var mapel = _mapel(sequelize, DataTypes)
  var tahun_pelajaran = _tahun_pelajaran(sequelize, DataTypes)
  var nilai = _nilai_merdeka(sequelize, DataTypes)
  var data_sekolah = _data_sekolah(sequelize, DataTypes)

  user.belongsTo(angkatan, { as: 'angkatan', foreignKey: 'angkatan_id' })
  angkatan.hasMany(user, { as: 'users', foreignKey: 'angkatan_id' })
  user.belongsTo(jurusan, { as: 'jurusan', foreignKey: 'jurusan_id' })
  jurusan.hasMany(user, { as: 'users', foreignKey: 'jurusan_id' })

  ayah_kandung.belongsTo(user, { as: 'user', foreignKey: 'user_id' })
  user.hasOne(ayah_kandung, { as: 'ayah_kandung', foreignKey: 'user_id' })

  data_diri.belongsTo(user, { as: 'user', foreignKey: 'user_id' })
  user.hasOne(data_diri, { as: 'data_diri', foreignKey: 'user_id' })
  user.hasOne(data_diri, { as: 'data_diri_approved', foreignKey: 'user_id' })


  hobi_siswa.belongsTo(user, { as: 'user', foreignKey: 'user_id' })
  user.hasOne(hobi_siswa, { as: 'hobi_siswa', foreignKey: 'user_id' })

  ibu_kandung.belongsTo(user, { as: 'user', foreignKey: 'user_id' })
  user.hasOne(ibu_kandung, { as: 'ibu_kandung', foreignKey: 'user_id' })

  kesehatan.belongsTo(user, { as: 'user', foreignKey: 'user_id' })
  user.hasOne(kesehatan, { as: 'kesehatan', foreignKey: 'user_id' })

  pendidikan.belongsTo(user, { as: 'user', foreignKey: 'user_id' })
  user.hasOne(pendidikan, { as: 'pendidikan', foreignKey: 'user_id' })

  perkembangan.belongsTo(user, { as: 'user', foreignKey: 'user_id' })
  user.hasOne(perkembangan, { as: 'perkembangan', foreignKey: 'user_id' })

  setelah_pendidikan.belongsTo(user, { as: 'user', foreignKey: 'user_id' })
  user.hasOne(setelah_pendidikan, {
    as: 'setelah_pendidikan',
    foreignKey: 'user_id',
  })

  tempat_tinggal.belongsTo(user, { as: 'user', foreignKey: 'user_id' })
  user.hasOne(tempat_tinggal, { as: 'tempat_tinggal', foreignKey: 'user_id' })

  wali.belongsTo(user, { as: 'user', foreignKey: 'user_id' })
  user.hasOne(wali, { as: 'wali', foreignKey: 'user_id' })

  nilai.hasOne(tahun_pelajaran, {
    as: 'tahun_pelajaran',
    foreignKey: 'tahun_pelajaran_id',
  })

  nilai.belongsTo(mapel, { as: 'mapel', foreignKey: 'mapel_id' })
  mapel.hasMany(nilai, { as: 'nilai_merdeka', foreignKey: 'mapel_id' })

  nilai.belongsTo(sia, { as: 'SIA', foreignKey: 'user_id', targetKey: 'user_id' })
  sia.hasMany(nilai, { as: 'nilai_merdeka', foreignKey: 'user_id', sourceKey: 'user_id' })

  user.hasMany(sia, { as: 'sia', foreignKey: 'user_id' })
  sia.belongsTo(user, { as: 'user', foreignKey: 'user_id' })
  return {
    admin,
    angkatan,
    ayah_kandung,
    data_diri,
    hobi_siswa,
    ibu_kandung,
    jurusan,
    kesehatan,
    pendidikan,
    perkembangan,
    setelah_pendidikan,
    tempat_tinggal,
    user,
    wali,
    sia,
    nilai,
    mapel,
    tahun_pelajaran,
    data_sekolah
  }
}
module.exports = initModels
module.exports.initModels = initModels
module.exports.default = initModels
