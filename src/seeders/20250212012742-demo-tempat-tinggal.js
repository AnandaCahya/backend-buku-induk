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
    return queryInterface.bulkInsert('tempat_tinggal', [
      {
        alamat: 'JL Raya Tunjungtirto',
        no_telepon: '081234567890',
        tinggal_dengan: 'ortu',
        jarak_ke_sekolah: '5 km',
        user_id: 1,
      },
      {
        alamat: 'JL Raya Tunjungtirto',
        no_telepon: '081234567890',
        tinggal_dengan: 'ortu',
        jarak_ke_sekolah: '5 km',
        user_id: 2,
      },
      {
        alamat: 'JL Raya Tunjungtirto',
        no_telepon: '081234567890',
        tinggal_dengan: 'ortu',
        jarak_ke_sekolah: '5 km',
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
