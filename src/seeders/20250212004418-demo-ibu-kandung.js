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
    return queryInterface.bulkInsert('ibu_kandung', [
      {
        nama: 'Suliastri',
        tempat_lahir: 'Surabaya',
        tanggal_lahir: '1982-09-23',
        agama: 'Islam',
        kewarganegaraan: 'Indonesia',
        pendidikan: 'S1',
        pekerjaan: 'Pedagang',
        pengeluaran_per_bulan: '800000',
        alamat_dan_no_telepon: 'Jl. Raya Tunjungtirto, 08123456789',
        status: 'masih hidup',
        user_id: 1,
      },
      {
        nama: 'Suliastri',
        tempat_lahir: 'Surabaya',
        tanggal_lahir: '1982-09-23',
        agama: 'Islam',
        kewarganegaraan: 'Indonesia',
        pendidikan: 'S1',
        pekerjaan: 'Pedagang',
        pengeluaran_per_bulan: '800000',
        alamat_dan_no_telepon: 'Jl. Raya Tunjungtirto, 08123456789',
        status: 'masih hidup',
        user_id: 2,
      },
      {
        nama: 'Suliastri',
        tempat_lahir: 'Surabaya',
        tanggal_lahir: '1982-09-23',
        agama: 'Islam',
        kewarganegaraan: 'Indonesia',
        pendidikan: 'S1',
        pekerjaan: 'Pedagang',
        pengeluaran_per_bulan: '800000',
        alamat_dan_no_telepon: 'Jl. Raya Tunjungtirto, 08123456789',
        status: 'masih hidup',
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
