/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                E X P O R T  D A T A
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

? Bagian ini isinya api untuk melakukan export data
! Dimohon memberikan note atau komentar pada bagian bagian route agar mempermudah development

*/

const { Router } = require('express')
const { Models } = require('../../models') 
const ExcelJS = require('exceljs')
const puppeteer = require('puppeteer')

const router = Router()

/**
 * GET /admin/export-excel
 * @summary Mengubah data diri siswa berdasarkan ID siswa
 * @tags admin
 * @param {string} jurusan.query - Nama jurusan untuk filter data siswa
 * @param {string} angkatan.query - Tahun angkatan untuk filter data siswa
 * @param {string} search.query - Pencarian nama siswa
 * @return {object} 200 - Data berhasil dibuat - application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
 * @return {object} 500 - Terjadi kesalahan saat memperbarui data - application/json
 * @example response - 500 - Terjadi kesalahan pada server
 * {
 *   "error": "An error occurred while updating the data"
 * }
 */
router.get('/export-excel', async (req, res) => {
  const { jurusan, angkatan, search } = req.query

  let data = await Models.user.findAll({
    include: [
      {
        model: Models.jurusan,
        as: 'jurusan',
        attributes: ['nama'],
      },
      {
        model: Models.angkatan,
        as: 'angkatan',
        attributes: ['tahun'],
      },
      {
        model: Models.data_diri,
        as: 'data_diri',
      },
      {
        model: Models.perkembangan,
        as: 'perkembangan',
      },
      {
        model: Models.ayah_kandung,
        as: 'ayah_kandung',
      },
      {
        model: Models.ibu_kandung,
        as: 'ibu_kandung',
      },
      {
        model: Models.kesehatan,
        as: 'kesehatan',
      },
      {
        model: Models.pendidikan,
        as: 'pendidikan',
      },
      {
        model: Models.setelah_pendidikan,
        as: 'setelah_pendidikan',
      },
      {
        model: Models.tempat_tinggal,
        as: 'tempat_tinggal',
      },
      {
        model: Models.wali,
        as: 'wali',
      },
      {
        model: Models.hobi_siswa,
        as: 'hobi_siswa',
      },
    ],
  })

  if (jurusan) data = data.filter((e) => e.jurusan == jurusan)
  if (angkatan) data = data.filter((e) => e.angkatan == angkatan)
  if (search)
    data = data.filter((e) =>
      e.data_diri.nama_lengkap.toLowerCase().includes(search.toLowerCase())
    )

  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Data Siswa')
  const headers = [
    'ID',
    'NISN',
    'Angkatan Tahun',
    'Jurusan',
    'Nama Lengkap',
    'Nama Panggilan',
    'Jenis Kelamin',
    'Tempat Lahir',
    'Tanggal Lahir',
    'Agama',
    'Kewarganegaraan',
    'Anak Ke',
    'Jumlah Saudara Kandung',
    'Jumlah Saudara Tiri',
    'Jumlah Saudara Angkat',
    'Kelengkapan Ortu',
    'Bahasa Sehari-hari',
    'Menerima Bea Siswa Tahun Kelas Dari',
    'Meninggalkan Sekolah Ini Tanggal',
    'Meninggalkan Sekolah Ini Alasan',
    'Akhir Pendidikan Tamat Belajar Lulus Tahun',
    'Akhir Pendidikan No/Tanggal Ijazah',
    'Akhir Pendidikan No/Tanggal SKHUN',
    'Nama Ayah',
    'Tempat Lahir Ayah',
    'Tanggal Lahir Ayah',
    'Agama Ayah',
    'Kewarganegaraan Ayah',
    'Pendidikan Ayah',
    'Pekerjaan Ayah',
    'Pengeluaran per Bulan Ayah',
    'Alamat dan No. Telepon Ayah',
    'Status Ayah',
    'Nama Ibu',
    'Tempat Lahir Ibu',
    'Tanggal Lahir Ibu',
    'Agama Ibu',
    'Kewarganegaraan Ibu',
    'Pendidikan Ibu',
    'Pekerjaan Ibu',
    'Pengeluaran per Bulan Ibu',
    'Alamat dan No. Telepon Ibu',
    'Status Ibu',
    'Golongan Darah',
    'Penyakit Pernah Diderita',
    'Kelainan Jasmani',
    'Tinggi',
    'Berat Badan',
    'Sebelumnya Tamatan Dari',
    'Sebelumnya Tanggal dan Ijazah',
    'Sebelumnya Tanggal SKHUN',
    'Sebelumnya Lama Belajar',
    'Pindahan Dari Sekolah',
    'Pindahan Alasan',
    'Diterima di Kelas',
    'Diterima di Bidang Keahlian',
    'Diterima di Program Keahlian',
    'Diterima di Paket Keahlian',
    'Diterima Tanggal',
    'Melanjutkan Ke',
    'Bekerja Nama Perusahaan',
    'Bekerja Tanggal Mulai',
    'Bekerja Penghasilan',
    'Alamat Tempat Tinggal',
    'No. Telepon Tempat Tinggal',
    'Tinggal Dengan',
    'Jarak ke Sekolah',
    'Nama Wali',
    'Tempat Lahir Wali',
    'Tanggal Lahir Wali',
    'Agama Wali',
    'Kewarganegaraan Wali',
    'Pendidikan Wali',
    'Pekerjaan Wali',
    'Pengeluaran per Bulan Wali',
    'Alamat dan No. Telepon Wali',
    'Kesenian',
    'Olahraga',
    'Organisasi',
    'Lain-lain',
  ]

  worksheet.addRow(headers)
  data.forEach((item) => {
    console.log(item)
    const row = [
      item.id,
      item.nisn,
      item.angkatan.tahun,
      item.jurusan.nama,
      item.data_diri.nama_lengkap,
      item.data_diri.nama_panggilan,
      item.data_diri.jenis_kelamin,
      item.data_diri.tempat_lahir,
      item.data_diri.tanggal_lahir,
      item.data_diri.agama,
      item.data_diri.kewarganegaraan,
      item.data_diri.anak_ke,
      item.data_diri.jml_saudara_kandung,
      item.data_diri.jml_saudara_tiri,
      item.data_diri.jml_saudara_angkat,
      item.data_diri.kelengkapan_ortu,
      item.data_diri.bahasa_sehari_hari,
      item.perkembangan?.menerima_bea_siswa_tahun_kelas_dari,
      item.perkembangan?.meninggalkan_sekolah_ini_tanggal,
      item.perkembangan?.meninggalkan_sekolah_ini_alasan,
      item.perkembangan?.akhir_pendidikan_tamat_belajar_lulus_tahun,
      item.perkembangan?.akhir_pendidikan_no_tanggal_ijazah,
      item.perkembangan?.akhir_pendidikan_no_tanggal_skhun,
      item.ayah_kandung.nama,
      item.ayah_kandung.tempat_lahir,
      item.ayah_kandung.tanggal_lahir,
      item.ayah_kandung.agama,
      item.ayah_kandung.kewarganegaraan,
      item.ayah_kandung.pendidikan,
      item.ayah_kandung.pekerjaan,
      item.ayah_kandung.pengeluaran_per_bulan,
      item.ayah_kandung.alamat_dan_no_telepon,
      item.ayah_kandung.status,
      item.ibu_kandung.nama,
      item.ibu_kandung.tempat_lahir,
      item.ibu_kandung.tanggal_lahir,
      item.ibu_kandung.agama,
      item.ibu_kandung.kewarganegaraan,
      item.ibu_kandung.pendidikan,
      item.ibu_kandung.pekerjaan,
      item.ibu_kandung.pengeluaran_per_bulan,
      item.ibu_kandung.alamat_dan_no_telepon,
      item.ibu_kandung.status,
      item.kesehatan.gol_darah,
      item.kesehatan.penyakit_pernah_diderita,
      item.kesehatan.kelainan_jasmani,
      item.kesehatan.tinggi,
      item.kesehatan.berat_badan,
      item.pendidikan.sebelumnya_tamatan_dari,
      item.pendidikan.sebelumnya_tanggal_dan_ijazah,
      item.pendidikan.sebelumnya_tanggal_skhun_dan_,
      item.pendidikan.sebelumnya_lama_belajar,
      item.pendidikan.pindahan_dari_sekolah,
      item.pendidikan.pindahan_alasan,
      item.pendidikan.diterima_di_kelas,
      item.pendidikan.diterima_di_bidang_keahlian,
      item.pendidikan.diterima_di_program_keahlian,
      item.pendidikan.diterima_di_paket_keahlian,
      item.pendidikan.diterima_tanggal,
      item.setelah_pendidikan.melanjutkan_ke,
      item.setelah_pendidikan.bekerja_nama_perusahaan,
      item.setelah_pendidikan.bekerja_tanggal_mulai,
      item.setelah_pendidikan.bekerja_penghasilan,
      item.tempat_tinggal.alamat,
      item.tempat_tinggal.no_telepon,
      item.tempat_tinggal.tinggal_dengan,
      item.tempat_tinggal.jarak_ke_sekolah,
      item.wali.nama,
      item.wali.tempat_lahir,
      item.wali.tanggal_lahir,
      item.wali.agama,
      item.wali.kewarganegaraan,
      item.wali.pendidikan,
      item.wali.pekerjaan,
      item.wali.pengeluaran_per_bulan,
      item.wali.alamat_dan_no_telepon,
      item.hobi_siswa.kesenian,
      item.hobi_siswa.olahraga,
      item.hobi_siswa.organisasi,
      item.hobi_siswa.lain_lain,
    ]
    worksheet.addRow(row)
  })
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  )
  res.setHeader('Content-Disposition', 'attachment; filename=data-siswa.xlsx')

  
  await workbook.xlsx.write(res)
  res.end()
})

/**
 * GET /admin/export-pdf/{id}
 * @summary Mengekspor halaman web yang terkait dengan ID yang diberikan ke dalam file PDF
 * @tags admin
 * @param {string} id.path.required - ID yang digunakan untuk membangun URL yang akan diekspor ke PDF
 * @return {file} 200 - Berhasil mengekspor file PDF - application/pdf
 * @return {object} 500 - Terjadi kesalahan saat ekspor PDF - application/json
 * @example response - 500 - Terjadi kesalahan saat ekspor PDF
 * {
 *   "error": "Terjadi kesalahan saat ekspor PDF"
 * }
 */
router.get('/export-pdf/:id', async (req, res) => {
  try {
    const url = 'http://localhost:8080/view-pdf/' + req.params.id
    const outputPath = './output/example.pdf'

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    const page = await browser.newPage()

    await page
      .goto(url, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      })
      .catch((e) => console.error('Error during navigation:', e))

    console.log('Setelah menjalankan page.goto')

    const pdf = await page.pdf({
      format: 'A3',
      landscape: true,
    })

    console.log('pdf berhasil dibuat')

    await browser.close()
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', 'attachment; filename=download.pdf')

    res.send(pdf)
  } catch (err) {
    console.error('Terjadi kesalahan:', err)
    res.status(500).send('Terjadi kesalahan saat ekspor PDF')
  }
})

/**
 * GET /admin/export-pdf
 * @summary Mengekspor halaman web yang telah ditentukan menjadi file PDF
 * @tags admin
 * @return {file} 200 - Berhasil mengekspor halaman web ke file PDF - application/pdf
 * @return {object} 500 - Terjadi kesalahan saat ekspor PDF - application/json
 * @example response - 500 - Terjadi kesalahan saat ekspor PDF
 * {
 *   "error": "Terjadi kesalahan saat ekspor PDF"
 * }
 */
router.get('/export-pdf', async (req, res) => {
  try {
    const url = 'http://localhost:8080/view-pdf'
    const outputPath = './output/example.pdf'

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    const page = await browser.newPage()

    await page
      .goto(url, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      })
      .catch((e) => console.error('Error during navigation:', e))

    console.log('Setelah menjalankan page.goto')

    const pdf = await page.pdf({
      format: 'A3',
      landscape: true,
    })

    console.log('pdf berhasil dibuat')

    await browser.close()
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', 'attachment; filename=download.pdf')

    res.send(pdf)
  } catch (err) {
    console.error('Terjadi kesalahan:', err)
    res.status(500).send('Terjadi kesalahan saat ekspor PDF')
  }
})

module.exports = router
