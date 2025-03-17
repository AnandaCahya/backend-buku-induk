'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Menambahkan satu data sekolah ke dalam tabel data_sekolah
     */
    return queryInterface.bulkInsert('data_sekolah', [
      {
        nama: 'SMKN 2 Singosari',
        logo: null
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Menghapus data sekolah yang sudah dimasukkan
     */
    return queryInterface.bulkDelete('data_sekolah', null, {});
  },
};
