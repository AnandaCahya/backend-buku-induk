/**
 * @module ModelIzin
 * @deskripsi Model Sequelize untuk tabel 'mapel'.
 * @param {Sequelize} sequelize - Instance Sequelize yang digunakan.
 * @param {DataTypes} DataTypes - DataTypes dari Sequelize untuk mendefinisikan tipe data.
 * @returns {Sequelize.Model} - Mengembalikan model Sequelize untuk tabel 'mapel'.
 */

/**
 * Definisi model Mapel.
 * @typedef {object} ModelIzin
 * @property {number} id - Identifikasi unik untuk mapel. Di-auto-increment.
 * @property {number} sakit - Jumlah sakit dalam satu semester
 * @property {number} izin - Jumlah izin dalam satu semester
 * @property {number} alpha - Jumlah alpha dalam satu semester
 * @property {number} semester_id - ID mata pelajaran terkait.
 * @property {number} user_id - ID pengguna yang terkait dengan nilai ini.
 */

/**
 * Definisi model Sequelize untuk tabel 'mapel'.
 * @type {Sequelize.Model<Mapel>}
 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'sia',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      sakit: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      izin: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      alpha: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      semester: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'sia',
      timestamps: false,
    }
  )
}
