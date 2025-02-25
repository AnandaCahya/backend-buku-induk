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
    return queryInterface.bulkInsert('user', [
      {
        nisn: '0097932112',
        angkatan_id: 1,
        jurusan_id: 6,
      },
      {
        nisn: '00979334442',
        angkatan_id: 1,
        jurusan_id: 5,
      },
      {
        nisn: '009793345232',
        angkatan_id: 2,
        jurusan_id: 5,
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
