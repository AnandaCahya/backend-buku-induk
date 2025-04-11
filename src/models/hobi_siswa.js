/**
 * @module ModelHobiSiswa
 * @deskripsi Model Sequelize untuk tabel 'hobi_siswa'.
 * @param {Sequelize} sequelize - Instance Sequelize yang digunakan.
 * @param {DataTypes} DataTypes - DataTypes dari Sequelize untuk mendefinisikan tipe data.
 * @returns {Sequelize.Model} - Mengembalikan model Sequelize untuk tabel 'hobi_siswa'.
 */

/**
 * Definisi model HobiSiswa.
 * @typedef {object} HobiSiswa
 * @property {number} id - Identifikasi unik untuk hobi siswa. Di-auto-increment.
 * @property {string} kesenian - Hobi siswa dalam bidang kesenian.
 * @property {string} olahraga - Hobi siswa dalam bidang olahraga.
 * @property {string} organisasi - Hobi siswa dalam bidang organisasi.
 * @property {string} lain_lain - Hobi siswa dalam kategori lain-lain.
 * @property {number} user_id - ID pengguna yang terkait dengan hobi siswa.
 */

/**
 * Definisi model Sequelize untuk tabel 'hobi_siswa'.
 * @type {Sequelize.Model<HobiSiswa>}
 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'hobi_siswa',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      kesenian: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      olahraga: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      organisasi: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      lain_lain: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      status_data: {
        type: DataTypes.ENUM('pending', 'approved', 'unverified'),
        allowNull: false,
        defaultValue: "approved"
      }
    },
    {
      sequelize,
      tableName: 'hobi_siswa',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'user_fk_keterangan_hobi_siswa',
          using: 'BTREE',
          fields: [{ name: 'user_id' }],
        },
      ],
    }
  )
}
