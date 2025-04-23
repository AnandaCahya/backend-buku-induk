'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable('ibu_kandung', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nama: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      tempat_lahir: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      tanggal_lahir: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      agama: {
        type: Sequelize.ENUM('Islam', 'Kristen', 'Katholik', 'Hindu', 'Buddha', 'Konghucu', 'Aliran Kepercayaan'),
        allowNull: false,
      },
      kewarganegaraan: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      pendidikan: {
        type: Sequelize.ENUM('SD', 'SMP', 'SMA/SMK/MA', 'Diploma 1 (D1)', 'Diploma 2 (D2)', 'Diploma 3 (D3)', 'Diploma 4 (D4)/Sarjana (S1)', 'Magister (S2)', 'Doktor (S3)'),
        allowNull: false,
      },
      pekerjaan: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      pengeluaran_per_bulan: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      alamat: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      no_telepon: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('masih hidup', 'meninggal'),
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      status_data: {
        type: Sequelize.ENUM('pending', 'approved', 'unverified'),
        allowNull: false,
        defaultValue: "approved"
      },
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.dropTable('ibu_kandung')
  },
}
