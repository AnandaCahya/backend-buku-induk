/**
 * @module ModelDataDiri
 * @deskripsi Model Sequelize untuk tabel 'data_diri'.
 * @param {Sequelize} sequelize - Instance Sequelize yang digunakan.
 * @param {DataTypes} DataTypes - DataTypes dari Sequelize untuk mendefinisikan tipe data.
 * @returns {Sequelize.Model} - Mengembalikan model Sequelize untuk tabel 'data_diri'.
 */

/**
 * Definisi model DataDiri.
 * @typedef {object} DataDiri
 * @property {number} id - Identifikasi unik untuk data diri. Di-auto-increment.
 * @property {string} nama_lengkap - Nama lengkap pengguna.
 * @property {string} nama_panggilan - Nama panggilan pengguna.
 * @property {enum<string>} jenis_kelamin - Jenis kelamin pengguna.
 * @property {string} tempat_lahir - Tempat lahir pengguna.
 * @property {string} agama - Agama pengguna.
 * @property {string} kewarganegaraan - Kewarganegaraan pengguna.
 * @property {number} anak_ke - Urutan anak dalam keluarga.
 * @property {number} [jml_saudara_kandung] - Jumlah saudara kandung pengguna.
 * @property {number} [jml_saudara_tiri] - Jumlah saudara tiri pengguna.
 * @property {number} [jml_saudara_angkat] - Jumlah saudara angkat pengguna.
 * @property {enum<string>} kelengkapan_ortu - Status kelengkapan orang tua.
 * @property {string} bahasa_sehari_hari - Bahasa sehari-hari yang digunakan pengguna.
 * @property {number} user_id - ID pengguna yang terkait dengan data diri ini.
 * @property {string} tanggal_lahir - Tanggal lahir pengguna.
 */

/**
 * Definisi model Sequelize untuk tabel 'data_diri'.
 * @type {Sequelize.Model<DataDiri>}
 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'data_diri',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nama_lengkap: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      nama_panggilan: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      jenis_kelamin: {
        type: DataTypes.ENUM('laki-laki', 'perempuan'),
        allowNull: false,
      },
      tempat_lahir: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      agama: {
        type: DataTypes.ENUM(
          'Islam',
          'Kristen',
          'Katolik',
          'Hindu',
          'Buddha',
          'Konghucu',
        ),
        allowNull: false,
      },
      kewarganegaraan: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      anak_ke: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      jml_saudara_kandung: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      jml_saudara_tiri: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      jml_saudara_angkat: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      kelengkapan_ortu: {
        type: DataTypes.ENUM('yatim', 'piatu', 'yatim piatu', 'lengkap'),
        allowNull: false,
      },
      bahasa_sehari_hari: {
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
      tanggal_lahir: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      status_data: {
        type: DataTypes.ENUM('pending', 'approved', 'unverified'),
        allowNull: false,
        defaultValue: "approved"
      }
    },
    {
      sequelize,
      tableName: 'data_diri',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'user_fk_keterangan_data_diri',
          using: 'BTREE',
          fields: [{ name: 'user_id' }],
        },
      ],
    }
  )
}
