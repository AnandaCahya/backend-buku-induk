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
      {
        menerima_bea_siswa_tahun_kelas_dari: null,
        meninggalkan_sekolah_ini_tanggal: null,
        meninggalkan_sekolah_ini_alasan: null,
        akhir_pendidikan_tamat_belajar_lulus_tahun: null,
        akhir_pendidikan_tanggal_ijazah: null,
        akhir_pendidikan_no_ijazah: null,
        akhir_pendidikan_tanggal_skhun: null,
        akhir_pendidikan_no_skhun: null,
        user_id: 2,
      },
      {
        menerima_bea_siswa_tahun_kelas_dari: null,
        meninggalkan_sekolah_ini_tanggal: null,
        meninggalkan_sekolah_ini_alasan: null,
        akhir_pendidikan_tamat_belajar_lulus_tahun: null,
        akhir_pendidikan_tanggal_ijazah: null,
        akhir_pendidikan_no_ijazah: null,
        akhir_pendidikan_tanggal_skhun: null,
        akhir_pendidikan_no_skhun: null,
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
