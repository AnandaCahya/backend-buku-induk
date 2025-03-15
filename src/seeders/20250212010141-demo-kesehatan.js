'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('kesehatan', [
      {
        gol_darah: 'O',
        penyakit_pernah_diderita: 'Asma',
        kelainan_jasmani: 'Tidak ada',
        tinggi: 175,
        berat_badan: 70,
        user_id: 1,
      },
      {
        gol_darah: 'A',
        penyakit_pernah_diderita: null,
        kelainan_jasmani: 'Tidak ada',
        tinggi: 160,
        berat_badan: 55,
        user_id: 2,
      },
      {
        gol_darah: 'B',
        penyakit_pernah_diderita: 'Tifus',
        kelainan_jasmani: null,
        tinggi: 168,
        berat_badan: 65,
        user_id: 3,
      },
      {
        gol_darah: 'AB',
        penyakit_pernah_diderita: 'Demam Berdarah',
        kelainan_jasmani: 'Skoliosis ringan',
        tinggi: 170,
        berat_badan: 60,
        user_id: 4,
      },
      {
        gol_darah: 'O',
        penyakit_pernah_diderita: null,
        kelainan_jasmani: null,
        tinggi: 178,
        berat_badan: 75,
        user_id: 5,
      },
      {
        gol_darah: 'A',
        penyakit_pernah_diderita: 'Cacar Air',
        kelainan_jasmani: null,
        tinggi: 165,
        berat_badan: 58,
        user_id: 6,
      },
      {
        gol_darah: 'B',
        penyakit_pernah_diderita: null,
        kelainan_jasmani: 'Kaki O',
        tinggi: 172,
        berat_badan: 68,
        user_id: 7,
      },
      {
        gol_darah: 'AB',
        penyakit_pernah_diderita: 'Asma',
        kelainan_jasmani: null,
        tinggi: 169,
        berat_badan: 64,
        user_id: 8,
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('kesehatan', null, {})
  },
}
