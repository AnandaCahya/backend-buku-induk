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
    return queryInterface.bulkInsert('hobi_siswa', [
      {
        kesenian: 'Bermain Gitar',
        olahraga: 'Sepak Bola',
        organisasi: 'Pecinta Alam',
        lain_lain: null,
        user_id: 1,
      },
      {
        kesenian: 'Bermain Gitar',
        olahraga: 'Sepak Bola',
        organisasi: 'Pecinta Alam',
        lain_lain: null,
        user_id: 2,
      },
      {
        kesenian: 'Bermain Gitar',
        olahraga: 'Sepak Bola',
        organisasi: 'Pecinta Alam',
        lain_lain: null,
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
