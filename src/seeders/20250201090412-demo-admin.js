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
    return queryInterface.bulkInsert('admin', [
      {
        email: 'triogamerz46@gmail.com',
        password: 'sendaljepit',
        username: 'AnandaEka',
      },
      {
        email: 'aden286chara@gmail.com',
        password: 'aden',
        username: 'Aden',
      },
      {
        email: 'jokoaiko8b@gmail.com',
        password: 'aiko',
        username: 'JokoAiko',
      },
      {
        email: 'drscity20@gmail.comm',
        password: 'pass',
        username: 'DarisNur',
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
