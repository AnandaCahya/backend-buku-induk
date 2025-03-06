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
    return queryInterface.bulkInsert('data_diri', [
      {
        nama_lengkap: 'Andi Djarod',
        nama_panggilan: 'Andi',
        jenis_kelamin: 'laki-laki',
        tempat_lahir: 'Malang',
        agama: 'Islam',
        kewarganegaraan: 'Indonesia',
        anak_ke: 2,
        jml_saudara_kandung: 3,
        jml_saudara_tiri: 0,
        jml_saudara_angkat: 0,
        kelengkapan_ortu: 'lengkap',
        bahasa_sehari_hari: 'Indonesia',
        user_id: 1,
        tanggal_lahir: '2007-02-02',
      },
      {
        nama_lengkap: 'Andi Djarod',
        nama_panggilan: 'Andi',
        jenis_kelamin: 'laki-laki',
        tempat_lahir: 'Malang',
        agama: 'Islam',
        kewarganegaraan: 'Indonesia',
        anak_ke: 2,
        jml_saudara_kandung: 3,
        jml_saudara_tiri: 0,
        jml_saudara_angkat: 0,
        kelengkapan_ortu: 'lengkap',
        bahasa_sehari_hari: 'Indonesia',
        user_id: 2,
        tanggal_lahir: '2007-02-02',
      },
      {
        nama_lengkap: 'Andi Djarod',
        nama_panggilan: 'Andi',
        jenis_kelamin: 'laki-laki',
        tempat_lahir: 'Malang',
        agama: 'Islam',
        kewarganegaraan: 'Indonesia',
        anak_ke: 2,
        jml_saudara_kandung: 3,
        jml_saudara_tiri: 0,
        jml_saudara_angkat: 0,
        kelengkapan_ortu: 'lengkap',
        bahasa_sehari_hari: 'Indonesia',
        user_id: 3,
        tanggal_lahir: '2007-02-02',
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
