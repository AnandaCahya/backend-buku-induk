'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('hobi_siswa', [
      {
        kesenian: 'Bermain Gitar',
        olahraga: 'Sepak Bola',
        organisasi: 'Pecinta Alam',
        lain_lain: null,
        user_id: 1,
      },
      {
        kesenian: 'Melukis',
        olahraga: null,
        organisasi: 'OSIS',
        lain_lain: 'Membaca buku',
        user_id: 2,
      },
      {
        kesenian: null,
        olahraga: 'Renang',
        organisasi: null,
        lain_lain: 'Menulis cerita',
        user_id: 3,
      },
      {
        kesenian: 'Menari',
        olahraga: 'Bulu Tangkis',
        organisasi: null,
        lain_lain: null,
        user_id: 4,
      },
      {
        kesenian: null,
        olahraga: null,
        organisasi: null,
        lain_lain: null,
        user_id: 5,
      },
      {
        kesenian: 'Menyanyi',
        olahraga: null,
        organisasi: 'Pramuka',
        lain_lain: null,
        user_id: 6,
      },
      {
        kesenian: null,
        olahraga: 'Basket',
        organisasi: 'Karang Taruna',
        lain_lain: 'Fotografi',
        user_id: 7,
      },
      {
        kesenian: null,
        olahraga: null,
        organisasi: null,
        lain_lain: null,
        user_id: 8, 
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('hobi_siswa', null, {})
  },
}
