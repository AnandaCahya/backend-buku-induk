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
    return queryInterface.bulkInsert('perkembangan', [
      {
        menerima_bea_siswa_tahun_kelas_dari: null,
        meninggalkan_sekolah_ini_tanggal: '2025-06-15',
        meninggalkan_sekolah_ini_alasan: 'Lulus',
        akhir_pendidikan_tamat_belajar_lulus_tahun: '2025',
        akhir_pendidikan_tanggal_ijazah: '2025-06-15',
        akhir_pendidikan_no_ijazah: 'IJZ-2025/001',
        akhir_pendidikan_tanggal_skhun: '2025-06-15',
        akhir_pendidikan_no_skhun: 'SKHUN-2025/001',
        user_id: 1,
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
