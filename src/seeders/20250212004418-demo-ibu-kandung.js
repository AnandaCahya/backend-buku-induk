'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ibu_kandung', [
      {
        nama: 'Suliastri',
        tempat_lahir: 'Surabaya',
        tanggal_lahir: '1982-09-23',
        agama: 'Islam',
        kewarganegaraan: 'Indonesia',
        pendidikan: 'S1',
        pekerjaan: 'Pedagang',
        pengeluaran_per_bulan: '800000',
        alamat_dan_no_telepon: 'Jl. Raya Tunjungtirto, 08123456789',
        status: 'masih hidup',
        user_id: 1,
      },
      {
        nama: 'Suliastri',
        tempat_lahir: 'Surabaya',
        tanggal_lahir: '1982-09-23',
        agama: 'Islam',
        kewarganegaraan: 'Indonesia',
        pendidikan: 'S1',
        pekerjaan: 'Pedagang',
        pengeluaran_per_bulan: '800000',
        alamat_dan_no_telepon: 'Jl. Raya Tunjungtirto, 08123456789',
        status: 'masih hidup',
        user_id: 2,
      },
      {
        nama: 'Suliastri',
        tempat_lahir: 'Surabaya',
        tanggal_lahir: '1982-09-23',
        agama: 'Islam',
        kewarganegaraan: 'Indonesia',
        pendidikan: 'S1',
        pekerjaan: 'Pedagang',
        pengeluaran_per_bulan: '800000',
        alamat_dan_no_telepon: 'Jl. Raya Tunjungtirto, 08123456789',
        status: 'masih hidup',
        user_id: 3,
      },
      {
        nama: 'Rini Sulastri',
        tempat_lahir: 'Jakarta',
        tanggal_lahir: '1980-06-15',
        agama: 'Kristen',
        kewarganegaraan: 'Indonesia',
        pendidikan: 'SMA',
        pekerjaan: 'Ibu Rumah Tangga',
        pengeluaran_per_bulan: '500000',
        alamat_dan_no_telepon: 'Jl. Merdeka No. 45, 08123456790',
        status: 'masih hidup',
        user_id: 4,
      },
      {
        nama: 'Dewi Astuti',
        tempat_lahir: 'Bandung',
        tanggal_lahir: '1975-12-30',
        agama: 'Islam',
        kewarganegaraan: 'Indonesia',
        pendidikan: 'D3',
        pekerjaan: 'Karyawan Swasta',
        pengeluaran_per_bulan: '1500000',
        alamat_dan_no_telepon: 'Jl. Cihampelas No. 12, 08123456791',
        status: 'meninggal',
        user_id: 5,
      },
      {
        nama: 'Siti Aminah',
        tempat_lahir: 'Semarang',
        tanggal_lahir: '1983-03-10',
        agama: 'Islam',
        kewarganegaraan: 'Indonesia',
        pendidikan: 'S1',
        pekerjaan: 'Dosen',
        pengeluaran_per_bulan: '2500000',
        alamat_dan_no_telepon: 'Jl. Diponegoro No. 20, 08123456792',
        status: 'masih hidup',
        user_id: 6,
      },
      {
        nama: 'Tuti Handayani',
        tempat_lahir: 'Yogyakarta',
        tanggal_lahir: '1979-08-05',
        agama: 'Hindu',
        kewarganegaraan: 'Indonesia',
        pendidikan: 'SMA',
        pekerjaan: 'Wiraswasta',
        pengeluaran_per_bulan: '1200000',
        alamat_dan_no_telepon: 'Jl. Malioboro No. 55, 08123456793',
        status: 'masih hidup',
        user_id: 7,
      },
      {
        nama: 'Sri Hartini',
        tempat_lahir: 'Medan',
        tanggal_lahir: '1981-07-20',
        agama: 'Islam',
        kewarganegaraan: 'Indonesia',
        pendidikan: 'S2',
        pekerjaan: 'PNS',
        pengeluaran_per_bulan: '3000000',
        alamat_dan_no_telepon: 'Jl. Sisingamangaraja No. 88, 08123456794',
        status: 'meninggal',
        user_id: 8,
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ibu_kandung', null, {})
  },
}
