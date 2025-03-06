/**
 * @module ModelPendidikan
 * @deskripsi Model Sequelize untuk tabel 'pendidikan'.
 * @param {Sequelize} sequelize - Instance Sequelize yang digunakan.
 * @param {DataTypes} DataTypes - DataTypes dari Sequelize untuk mendefinisikan tipe data.
 * @returns {Sequelize.Model} - Mengembalikan model Sequelize untuk tabel 'pendidikan'.
 */

/**
 * Definisi model Pendidikan.
 * @typedef {object} Pendidikan
 * @property {number} id - Identifikasi unik untuk pendidikan. Di-auto-increment.
 * @property {string} sebelumnya_tamatan_dari - Asal sekolah atau institusi sebelumnya.
 * @property {string} sebelumnya_tanggal_dan_ijazah - Tanggal dan nomor ijazah sebelumnya.
 * @property {string} sebelumnya_tanggal_skhun_dan_ - Tanggal dan nomor SKHUN sebelumnya.
 * @property {string} sebelumnya_lama_belajar - Lama belajar di sekolah atau institusi sebelumnya.
 * @property {string} pindahan_dari_sekolah - Nama sekolah asal (jika pindahan).
 * @property {string} pindahan_alasan - Alasan pindahan sekolah.
 * @property {number} diterima_di_kelas - Kelas di mana siswa diterima.
 * @property {string} diterima_di_bidang_keahlian - Bidang keahlian yang diterima.
 * @property {string} diterima_di_program_keahlian - Program keahlian yang diterima.
 * @property {string} diterima_di_paket_keahlian - Paket keahlian yang diterima.
 * @property {string} diterima_tanggal - Tanggal diterima di sekolah.
 * @property {number} user_id - ID pengguna yang terkait dengan pendidikan ini.
 */

/**
 * Definisi model Sequelize untuk tabel 'pendidikan'.
 * @type {Sequelize.Model<Pendidikan>}
 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'pendidikan',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      sebelumnya_tamatan_dari: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      sebelumnya_tanggal_ijazah: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      sebelumnya_no_ijazah: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      sebelumnya_tanggal_skhun: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      sebelumnya_no_skhun: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      sebelumnya_lama_belajar: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      pindahan_dari_sekolah: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      pindahan_alasan: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      diterima_di_kelas: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      diterima_di_bidang_keahlian: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      diterima_di_program_keahlian: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      diterima_di_paket_keahlian: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      diterima_tanggal: {
        type: DataTypes.DATEONLY,
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
      tableName: 'pendidikan',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'user_fk_keterangan_pendidikan',
          using: 'BTREE',
          fields: [{ name: 'user_id' }],
        },
      ],
    }
  )
}
