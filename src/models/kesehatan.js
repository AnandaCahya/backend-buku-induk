/**
 * @module ModelKesehatan
 * @deskripsi Model Sequelize untuk tabel 'kesehatan'.
 * @param {Sequelize} sequelize - Instance Sequelize yang digunakan.
 * @param {DataTypes} DataTypes - DataTypes dari Sequelize untuk mendefinisikan tipe data.
 * @returns {Sequelize.Model} - Mengembalikan model Sequelize untuk tabel 'kesehatan'.
 */

/**
 * Definisi model Kesehatan.
 * @typedef {object} Kesehatan
 * @property {number} id - Identifikasi unik untuk data kesehatan. Di-auto-increment.
 * @property {enum<string>} gol_darah - Golongan darah.
 * @property {string} [penyakit_pernah_diderita] - Penyakit yang pernah diderita.
 * @property {string} [kelainan_jasmani] - Kelainan jasmani yang dimiliki.
 * @property {string} tinggi - Tinggi badan.
 * @property {string} berat_badan - Berat badan.
 * @property {number} user_id - ID pengguna yang terkait dengan data kesehatan.
 */

/**
 * Definisi model Sequelize untuk tabel 'kesehatan'.
 * @type {Sequelize.Model<Kesehatan>}
 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'kesehatan',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      gol_darah: {
        type: DataTypes.ENUM('A', 'B', 'O', 'AB'),
        allowNull: true,
      },
      penyakit_pernah_diderita: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      kelainan_jasmani: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      tinggi: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      berat_badan: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      status_perubahan: {
        type: DataTypes.ENUM('pending', 'approved'),
        allowNull: false,
        defaultValue: "approved"
      }
    },
    {
      sequelize,
      tableName: 'kesehatan',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'user_fk_keterangan_kesehatan',
          using: 'BTREE',
          fields: [{ name: 'user_id' }],
        },
      ],
    }
  )
}
