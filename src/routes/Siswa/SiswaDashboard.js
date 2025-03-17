

router.get('/dashboard', async (req, res) => {
    try {  
      const nilaiSiswa = await NilaiMerdeka.findAll({
        where: {
          user_id: req.user_id,
        },
      });
  
      const semesterRataRata = {};
  
      nilaiSiswa.forEach((nilai) => {
        const semester = nilai.semester;
        if (!semesterRataRata[semester]) {
          semesterRataRata[semester] = { total: 0, count: 0 };
        }
        semesterRataRata[semester].total += nilai.r;
        semesterRataRata[semester].count += 1;
      });
  
      const hasilRataRataPerSemester = Object.keys(semesterRataRata).map((semester) => {
        const { total, count } = semesterRataRata[semester];
        return {
          semester,
          rata_rata: total / count,
        };
      });
  
      res.json({
        user_id: userId,
        rata_rata_per_semester: hasilRataRataPerSemester,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data.' });
    }
  });
  
  module.exports = router;