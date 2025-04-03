/**
 * @module ModelAdmin
 * @deskripsi Model Sequelize untuk tabel 'admin'.
 * @param {Sequelize} sequelize - Instance Sequelize yang digunakan.
 * @param {DataTypes} DataTypes - DataTypes dari Sequelize untuk mendefinisikan tipe data.
 * @returns {Sequelize.Model} - Mengembalikan model Sequelize untuk tabel 'admin'.
 */

/**
 * Definisi model Admin.
 * @typedef {object} Admin
 * @property {number} id - Identifikasi unik untuk admin. Di-auto-increment.
 * @property {string} email - Email admin. Harus unik.
 * @property {string} password - Kata sandi admin.
 * @property {string} token - Token autentikasi opsional untuk admin.
 * @property {string} username - Nama pengguna admin. Harus unik.
 * @property {string} code - Kode opsional yang terkait dengan admin (misalnya, untuk verifikasi).
 */

/**
 * Definisi model Sequelize untuk tabel 'admin'.
 * @type {Sequelize.Model<Admin>}
 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'admin',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: 'username',
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING(5),
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'admin',
      },
      status: {
        type: DataTypes.ENUM('belum aktif', 'aktif'),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'admin',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'username',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'email' }],
        },
      ],
    }
  )
}
