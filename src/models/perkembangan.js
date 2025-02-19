/**
 * @module ModelPerkembangan
 * @deskripsi Model Sequelize untuk tabel 'perkembangan'.
 * @param {Sequelize} sequelize - Instance Sequelize yang digunakan.
 * @param {DataTypes} DataTypes - DataTypes dari Sequelize untuk mendefinisikan tipe data.
 * @returns {Sequelize.Model} - Mengembalikan model Sequelize untuk tabel 'perkembangan'.
 */

/**
 * Definisi model Perkembangan.
 * @typedef {object} Perkembangan
 * @property {number} id - Identifikasi unik untuk perkembangan. Di-auto-increment.
 * @property {string} menerima_bea_siswa_tahun_kelas_dari - Tahun dan kelas dari beasiswa yang diterima (jika ada).
 * @property {string} meninggalkan_sekolah_ini_tanggal - Tanggal meninggalkan sekolah ini (jika ada).
 * @property {string} meninggalkan_sekolah_ini_alasan - Alasan meninggalkan sekolah ini (jika ada).
 * @property {string} akhir_pendidikan_tamat_belajar_lulus_tahun - Tahun tamat atau lulus pendidikan akhir.
 * @property {string} akhir_pendidikan_no_tanggal_ijazah - Nomor dan tanggal ijazah pendidikan akhir.
 * @property {string} akhir_pendidikan_no_tanggal_skhun - Nomor dan tanggal SKHUN pendidikan akhir.
 * @property {number} user_id - ID pengguna yang terkait dengan perkembangan ini.
 */

/**
 * Definisi model Sequelize untuk tabel 'perkembangan'.
 * @type {Sequelize.Model<Perkembangan>}
 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'perkembangan',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      menerima_bea_siswa_tahun_kelas_dari: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      meninggalkan_sekolah_ini_tanggal: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      meninggalkan_sekolah_ini_alasan: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      akhir_pendidikan_tamat_belajar_lulus_tahun: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      akhir_pendidikan_no_tanggal_ijazah: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      akhir_pendidikan_no_tanggal_skhun: {
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
      status_perubahan: {
        type: DataTypes.ENUM('pending', 'approved'),
        allowNull: false,
        defaultValue: "approved"
      }
    },
    {
      sequelize,
      tableName: 'perkembangan',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'user_fk_keterangan_perkembangan',
          using: 'BTREE',
          fields: [{ name: 'user_id' }],
        },
      ],
    }
  )
}
