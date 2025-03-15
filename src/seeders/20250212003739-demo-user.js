'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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
      {
        nisn: '00979356789',
        angkatan_id: 2,
        jurusan_id: 3,
      },
      {
        nisn: '00979367890',
        angkatan_id: 3,
        jurusan_id: 1,
      },
      {
        nisn: '00979378901',
        angkatan_id: 3,
        jurusan_id: 8,
      },
      {
        nisn: '00979389012',
        angkatan_id: 2,
        jurusan_id: 5, 
      },
      {
        nisn: '00979390123',
        angkatan_id: 3,
        jurusan_id: 1, 
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('user', null, {});
  },
}
