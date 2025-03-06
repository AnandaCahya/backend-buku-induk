'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert('wali', [
      {
        nama: null,
        tempat_lahir: null,
        tanggal_lahir: null,
        agama: null,
        kewarganegaraan: null,
        pendidikan: null,
        pekerjaan: null,
        pengeluaran_per_bulan: null,
        alamat_dan_no_telepon: null,
        user_id: 1,
      },
      {
        nama: null,
        tempat_lahir: null,
        tanggal_lahir: null,
        agama: null,
        kewarganegaraan: null,
        pendidikan: null,
        pekerjaan: null,
        pengeluaran_per_bulan: null,
        alamat_dan_no_telepon: null,
        user_id: 2,
      },
      {
        nama: null,
        tempat_lahir: null,
        tanggal_lahir: null,
        agama: null,
        kewarganegaraan: null,
        pendidikan: null,
        pekerjaan: null,
        pengeluaran_per_bulan: null,
        alamat_dan_no_telepon: null,
        user_id: 3,
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
}
