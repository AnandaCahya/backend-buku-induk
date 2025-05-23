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
        menerima_bea_siswa_tahun: null,
        menerima_bea_siswa_kelas: null,
        menerima_bea_siswa_dari: null,
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
        menerima_bea_siswa_tahun: null,
        menerima_bea_siswa_kelas: null,
        menerima_bea_siswa_dari: null,
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
        menerima_bea_siswa_tahun: null,
        menerima_bea_siswa_kelas: null,
        menerima_bea_siswa_dari: null,
        meninggalkan_sekolah_ini_tanggal: null,
        meninggalkan_sekolah_ini_alasan: null,
        akhir_pendidikan_tamat_belajar_lulus_tahun: null,
        akhir_pendidikan_tanggal_ijazah: null,
        akhir_pendidikan_no_ijazah: null,
        akhir_pendidikan_tanggal_skhun: null,
        akhir_pendidikan_no_skhun: null,
        user_id: 3,
      },
      {
        menerima_bea_siswa_tahun: null,
        menerima_bea_siswa_kelas: null,
        menerima_bea_siswa_dari: null,
        meninggalkan_sekolah_ini_tanggal: null,
        meninggalkan_sekolah_ini_alasan: null,
        akhir_pendidikan_tamat_belajar_lulus_tahun: null,
        akhir_pendidikan_tanggal_ijazah: null,
        akhir_pendidikan_no_ijazah: null,
        akhir_pendidikan_tanggal_skhun: null,
        akhir_pendidikan_no_skhun: null,
        user_id: 4,
      },
      {
        menerima_bea_siswa_tahun: null,
        menerima_bea_siswa_kelas: null,
        menerima_bea_siswa_dari: null,
        meninggalkan_sekolah_ini_tanggal: null,
        meninggalkan_sekolah_ini_alasan: null,
        akhir_pendidikan_tamat_belajar_lulus_tahun: null,
        akhir_pendidikan_tanggal_ijazah: null,
        akhir_pendidikan_no_ijazah: null,
        akhir_pendidikan_tanggal_skhun: null,
        akhir_pendidikan_no_skhun: null,
        user_id: 5,
      },
      {
        menerima_bea_siswa_tahun: null,
        menerima_bea_siswa_kelas: null,
        menerima_bea_siswa_dari: null,
        meninggalkan_sekolah_ini_tanggal: null,
        meninggalkan_sekolah_ini_alasan: null,
        akhir_pendidikan_tamat_belajar_lulus_tahun: null,
        akhir_pendidikan_tanggal_ijazah: null,
        akhir_pendidikan_no_ijazah: null,
        akhir_pendidikan_tanggal_skhun: null,
        akhir_pendidikan_no_skhun: null,
        user_id: 6,
      },
      {
        menerima_bea_siswa_tahun: null,
        menerima_bea_siswa_kelas: null,
        menerima_bea_siswa_dari: null,
        meninggalkan_sekolah_ini_tanggal: null,
        meninggalkan_sekolah_ini_alasan: null,
        akhir_pendidikan_tamat_belajar_lulus_tahun: null,
        akhir_pendidikan_tanggal_ijazah: null,
        akhir_pendidikan_no_ijazah: null,
        akhir_pendidikan_tanggal_skhun: null,
        akhir_pendidikan_no_skhun: null,
        user_id: 7,
      },
      {
        menerima_bea_siswa_tahun: null,
        menerima_bea_siswa_kelas: null,
        menerima_bea_siswa_dari: null,
        meninggalkan_sekolah_ini_tanggal: null,
        meninggalkan_sekolah_ini_alasan: null,
        akhir_pendidikan_tamat_belajar_lulus_tahun: null,
        akhir_pendidikan_tanggal_ijazah: null,
        akhir_pendidikan_no_ijazah: null,
        akhir_pendidikan_tanggal_skhun: null,
        akhir_pendidikan_no_skhun: null,
        user_id: 8,
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
