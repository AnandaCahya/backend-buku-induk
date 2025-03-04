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
    return queryInterface.bulkInsert('mapel', [
      { nama: 'Pendidikan Agama dan Budi Pekerti' },
      { nama: 'Pendidikan Pancasila' },
      { nama: 'Bahasa Indonesia' },
      { nama: 'Pendidikan Jasmani, Olahraga, dan Kesehatan' },
      { nama: 'Sejarah' },
      { nama: 'Seni Budaya' },
      { nama: 'Bahasa Jawa' },
      { nama: 'Matematika' },
      { nama: 'Bahasa Inggris' },
      { nama: 'Informatika' },
      { nama: 'Projek IPAS' },
      { nama: 'Dasar Program Keahlian' },
      { nama: 'Mata Pelajaran Konsentrasi Keahlian' },
      { nama: 'Projek Kreatif dan Kewirausahaan' },
      { nama: 'Mata Pelajaran Pilihan' },
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
