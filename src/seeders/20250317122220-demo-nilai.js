'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const mapel = await queryInterface.sequelize.query(
      'SELECT id, nama FROM mapel;',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const mapelIds = mapel.map(item => item.id);
    const mapelNama = mapel.map(item => item.nama);

    const semesterRules = {
      1: ['Pendidikan Agama dan Budi Pekerti', 'Pendidikan Pancasila', 'Bahasa Indonesia', 'Pendidikan Jasmani, Olahraga, dan Kesehatan', 'Sejarah', 'Seni Budaya', 'Bahasa Jawa', 'Matematika', 'Bahasa Inggris', 'Informatika', 'Projek IPAS'],
      2: ['Pendidikan Agama dan Budi Pekerti', 'Pendidikan Pancasila', 'Bahasa Indonesia', 'Pendidikan Jasmani, Olahraga, dan Kesehatan', 'Sejarah', 'Seni Budaya', 'Bahasa Jawa', 'Matematika', 'Bahasa Inggris', 'Informatika', 'Projek IPAS'],
      3: ['Bahasa Indonesia', 'Pendidikan Jasmani, Olahraga, dan Kesehatan', 'Sejarah', 'Seni Budaya', 'Bahasa Jawa', 'Matematika', 'Bahasa Inggris'],
      4: ['Bahasa Indonesia', 'Pendidikan Jasmani, Olahraga, dan Kesehatan', 'Sejarah', 'Seni Budaya', 'Bahasa Jawa', 'Matematika', 'Bahasa Inggris'],
      5: ['Pendidikan Agama dan Budi Pekerti', 'Pendidikan Pancasila', 'Bahasa Indonesia', 'Matematika', 'Bahasa Inggris', 'Mata Pelajaran Konsentrasi Keahlian', 'Projek Kreatif dan Kewirausahaan'],
      6: ['Pendidikan Agama dan Budi Pekerti', 'Pendidikan Pancasila', 'Bahasa Indonesia', 'Matematika', 'Bahasa Inggris', 'Mata Pelajaran Konsentrasi Keahlian', 'Projek Kreatif dan Kewirausahaan']
    };

    const nilaiData = [];
    const semesters = [1, 2, 3, 4, 5, 6];
    
    // Generate data nilai per semester
    semesters.forEach((semester) => {
      const availableMapel = semesterRules[semester].map(pelajaran => {
        return mapel.find(m => m.nama === pelajaran);
      });

      availableMapel.forEach((mapel) => {
        const nilai = Math.floor(Math.random() * (100 - 75 + 1)) + 75; 

        nilaiData.push({
          user_id: 1,  
          mapel_id: mapel.id,
          semester: semester,
          r: nilai,  
          keterangan: 'Nilai Ujian'
        });
      });
    });

    await queryInterface.bulkInsert('nilai_merdeka', nilaiData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('nilai_merdeka', null, {});
  }
};
