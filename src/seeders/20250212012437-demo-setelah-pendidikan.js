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
    return queryInterface.bulkInsert('setelah_pendidikan', [
      {
        melanjutkan_ke: null,
        bekerja_nama_perusahaan: null,
        bekerja_tanggal_mulai: null,
        bekerja_penghasilan: null,
        user_id: 1,
      },
      {
        melanjutkan_ke: null,
        bekerja_nama_perusahaan: null,
        bekerja_tanggal_mulai: null,
        bekerja_penghasilan: null,
        user_id: 2,
      },
      {
        melanjutkan_ke: null,
        bekerja_nama_perusahaan: null,
        bekerja_tanggal_mulai: null,
        bekerja_penghasilan: null,
        user_id: 3,
      },
      {
        melanjutkan_ke: null,
        bekerja_nama_perusahaan: null,
        bekerja_tanggal_mulai: null,
        bekerja_penghasilan: null,
        user_id: 4,
      },
      {
        melanjutkan_ke: null,
        bekerja_nama_perusahaan: null,
        bekerja_tanggal_mulai: null,
        bekerja_penghasilan: null,
        user_id: 5,
      },
      {
        melanjutkan_ke: null,
        bekerja_nama_perusahaan: null,
        bekerja_tanggal_mulai: null,
        bekerja_penghasilan: null,
        user_id: 6,
      },
      {
        melanjutkan_ke: null,
        bekerja_nama_perusahaan: null,
        bekerja_tanggal_mulai: null,
        bekerja_penghasilan: null,
        user_id: 7,
      },
      {
        melanjutkan_ke: null,
        bekerja_nama_perusahaan: null,
        bekerja_tanggal_mulai: null,
        bekerja_penghasilan: null,
        user_id: 8,
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
