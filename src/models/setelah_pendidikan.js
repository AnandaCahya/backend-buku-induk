/**
 * @module ModelSetelahPendidikan
 * @deskripsi Model Sequelize untuk tabel 'setelah_pendidikan'.
 * @param {Sequelize} sequelize - Instance Sequelize yang digunakan.
 * @param {DataTypes} DataTypes - DataTypes dari Sequelize untuk mendefinisikan tipe data.
 * @returns {Sequelize.Model} - Mengembalikan model Sequelize untuk tabel 'setelah_pendidikan'.
 */

/**
 * Definisi model SetelahPendidikan.
 * @typedef {object} SetelahPendidikan
 * @property {number} id - Identifikasi unik untuk data setelah pendidikan. Di-auto-increment.
 * @property {string} melanjutkan_ke - Institusi atau tempat yang dilanjutkan setelah pendidikan (jika ada).
 * @property {string} bekerja_nama_perusahaan - Nama perusahaan tempat bekerja setelah pendidikan (jika ada).
 * @property {string} bekerja_tanggal_mulai - Tanggal mulai bekerja setelah pendidikan (jika ada).
 * @property {string} bekerja_penghasilan - Penghasilan yang diterima saat bekerja setelah pendidikan (jika ada).
 * @property {number} user_id - ID pengguna yang terkait dengan data setelah pendidikan ini.
 */

/**
 * Definisi model Sequelize untuk tabel 'setelah_pendidikan'.
 * @type {Sequelize.Model<SetelahPendidikan>}
 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'setelah_pendidikan',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      melanjutkan_ke: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      bekerja_nama_perusahaan: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      bekerja_tanggal_mulai: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      bekerja_penghasilan: {
        type: DataTypes.INTEGER,
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
      tableName: 'setelah_pendidikan',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'user_fk_keterangan_setelah_pendidikan',
          using: 'BTREE',
          fields: [{ name: 'user_id' }],
        },
      ],
    }
  )
}
