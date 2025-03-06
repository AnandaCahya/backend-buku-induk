const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const expressJSDocSwagger = require('express-jsdoc-swagger')
const package = require('../package.json')

require('dotenv').config()

const app = express()

//* Route admin
const authControllers = require('./routes/AuthController')
const userControllers = require('./routes/Siswa/SiswaSpesificData')
const akunControllers = require('./routes/Admin/AdminAccountController')
const dataSiswaController = require('./routes/Admin/AdminDataSiswaController')
const jurusanController = require('./routes/Admin/AdminJurusan')
const angkatanController = require('./routes/Admin/AdminAngkatan')
const tahunpelajaranController = require('./routes/Admin/AdminTahunPelajaran')
const getExport = require('./routes/Admin/AdminExport')

const nilaiController = require('./routes/Admin/AdminNilaiSiswa')
const mapelController = require('./routes/Admin/AdminMapel')
const AdminRaportController = require('./routes/Admin/AdminRaport')

//* Route siswa
const daftarDataController = require('./routes/Siswa/SiswaDaftar')
const ubahDataController = require('./routes/Siswa/SiswaDataDiri')
const siswaRaportController = require('./routes/Siswa/SiswaRaport')

//* DEV MODE

if (process.env.NODE_ENV === 'development') {
  console.log('Mode Pengembangan, Anda dapat membuka dokumentasi di /api-docs')

  const options = {
    info: {
      version: package.version,
      title: 'Buku Induk',
      description:
        'Aplikasi Buku Induk untuk melakukan pencatatan data siswa, jurusan, angkatan dan lainnya. API Ini dibangun diatas Nodejs dengan sistem autentikasi bearer. Gunakan API ini sebaik mungkin',
      license: {
        name: 'MIT',
      },
    },
    security: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
    baseDir: __dirname,
    filesPattern: './**/*.js',
  }

  expressJSDocSwagger(app)(options)
} else {
  console.log('Mode Produksi')
}

// middleware
const {
  AuthMiddlewareSiswa,
  AuthMiddlewareAdmin,
} = require('./middleware/AuthMiddleware')
const morgan = require('morgan')
const { Models } = require('./models')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use('/auth', authControllers)

app.use('/siswa', userControllers)

// ----- Admin
app.use('/admin', AuthMiddlewareAdmin, akunControllers)
app.use('/admin', AuthMiddlewareAdmin, dataSiswaController)
app.use('/admin', AuthMiddlewareAdmin, jurusanController)
app.use('/admin', AuthMiddlewareAdmin, angkatanController)
app.use('/admin', AuthMiddlewareAdmin, getExport)
app.use('/admin', AuthMiddlewareAdmin, tahunpelajaranController)

app.use('/admin', AuthMiddlewareAdmin, nilaiController)
app.use('/admin', AuthMiddlewareAdmin, mapelController)
app.use('/admin', AuthMiddlewareAdmin, AdminRaportController)

// ------ Siswa
app.use('/siswa', daftarDataController)
app.use('/siswa', AuthMiddlewareSiswa, ubahDataController)
app.use('/siswa', AuthMiddlewareSiswa, siswaRaportController)



app.get('/view-pdf/:id', async (req, res) => {
  const { jurusan, angkatan, search } = req.query
  const { id } = req.params
  let data = await Models.user.findOne({
    where: { id: id },
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

  res.render('export-pdf', { element: data })
})

app.get('/view-pdf', async (req, res) => {
  const { jurusan, angkatan, search } = req.query
  const { id } = req.params
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

  res.render('export-pdf-bulk', { elements: data })
})

app.get('/view-raport/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Models.user.findOne({
      where: { id: id },
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
          attributes: ['nama_lengkap', 'nama_panggilan'],
        },
        {
          model: Models.pendidikan,
          as: 'pendidikan',
          attributes: ['diterima_di_program_keahlian', 'diterima_di_paket_keahlian'],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const nilai = await Models.nilai.findAll({
      where: { user_id: id },
      include: [
        {
          model: Models.mapel,
          as: 'mapel',
          attributes: ['nama'],
        },
      ],
    });

    const siaData = await Models.sia.findAll({
      where: { user_id: id },
      attributes: ['sakit', 'izin', 'alpha', 'semester'],
    });

    const nilaiPerSemester = nilai.reduce((acc, curr) => {
      const semesterKey = `Semester ${curr.semester}`;
      if (!acc[semesterKey]) {
        acc[semesterKey] = [];
      }
      acc[semesterKey].push(curr);
      return acc;
    }, {});

    res.render('export-halaman-belakang', { element: user, nilaiPerSemester, sia: siaData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/view-image-raport/:id', async (req, res) => {
  const { id } = req.params;
  const { semester = 1 } = req.query;
  try {
    const user = await Models.user.findOne({
      where: { id: id },
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
          attributes: ['nama_lengkap', 'nama_panggilan'],
        },
        {
          model: Models.pendidikan,
          as: 'pendidikan',
          attributes: ['diterima_di_program_keahlian', 'diterima_di_paket_keahlian'],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const nilai = await Models.nilai.findAll({
      where: { user_id: id, semester: parseInt(semester, 10) }, 
      include: [
        {
          model: Models.mapel,
          as: 'mapel',
          attributes: ['id', 'nama'],
        },
      ],
    });

    const siaData = await Models.sia.findAll({
      where: { user_id: id, semester: parseInt(semester, 10) }, 
      attributes: ['sakit', 'izin', 'alpha', 'semester'],
    });

    const nilaiPerSemester = {
      [`Semester ${semester}`]: nilai,
    };

    res.render('image-raport', { element: user, nilaiPerSemester, sia: siaData, semester });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const XLSX = require('xlsx')
const upload = require('./middleware/upload')

app.post('/import-excel', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    // Read the Excel file
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' })
    const sheetName = workbook.SheetNames[0] // Get first sheet
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])

    // Process each row
    for (const row of data) {
      const siswa = {
        nisn: row.NISN,
        angkatan_id: row['Angkatan Tahun'],
        jurusan_id: row.Jurusan,
      }

      const existingUser = await Models.user.findOne({
        where: { nisn: siswa.nisn },
      })
      if (existingUser) {
        console.log(`Skipping duplicate NISN: ${siswa.nisn}`)
        continue
      }

      const newUser = await Models.user.create(siswa)

      await Models.data_diri.create({
        user_id: newUser.id,
        nama_lengkap: row['Nama Lengkap'],
        nama_panggilan: row['Nama Panggilan'],
        jenis_kelamin: row['Jenis Kelamin'],
        tempat_lahir: row['Tempat Lahir'],
        tanggal_lahir: row['Tanggal Lahir'],
        agama: row.Agama,
        kewarganegaraan: row.Kewarganegaraan,
        anak_ke: row['Anak Ke'],
        jml_saudara_kandung: row['Jumlah Saudara Kandung'],
        jml_saudara_tiri: row['Jumlah Saudara Tiri'],
        jml_saudara_angkat: row['Jumlah Saudara Angkat'],
        kelengkapan_ortu: row['Kelengkapan Ortu'],
        bahasa_sehari_hari: row['Bahasa Sehari-hari'],
      })

      await Models.perkembangan.create({
        user_id: newUser.id,
        menerima_bea_siswa_tahun_kelas_dari:
          row['Menerima Bea Siswa Tahun Kelas Dari'],
        meninggalkan_sekolah_ini_tanggal:
          row['Meninggalkan Sekolah Ini Tanggal'],
        meninggalkan_sekolah_ini_alasan: row['Meninggalkan Sekolah Ini Alasan'],
        akhir_pendidikan_tamat_belajar_lulus_tahun:
          row['Akhir Pendidikan Tamat Belajar Lulus Tahun'],
        akhir_pendidikan_no_tanggal_ijazah:
          row['Akhir Pendidikan No/Tanggal Ijazah'],
        akhir_pendidikan_no_tanggal_skhun:
          row['Akhir Pendidikan No/Tanggal SKHUN'],
      })

      await Models.ayah_kandung.create({
        user_id: newUser.id,
        nama: row['Nama Ayah'],
        tempat_lahir: row['Tempat Lahir Ayah'],
        tanggal_lahir: row['Tanggal Lahir Ayah'],
        agama: row['Agama Ayah'],
        kewarganegaraan: row['Kewarganegaraan Ayah'],
        pendidikan: row['Pendidikan Ayah'],
        pekerjaan: row['Pekerjaan Ayah'],
        pengeluaran_per_bulan: row['Pengeluaran per Bulan Ayah'],
        alamat_dan_no_telepon: row['Alamat dan No. Telepon Ayah'],
        status: row['Status Ayah'],
      })

      await Models.ibu_kandung.create({
        user_id: newUser.id,
        nama: row['Nama Ibu'],
        tempat_lahir: row['Tempat Lahir Ibu'],
        tanggal_lahir: row['Tanggal Lahir Ibu'],
        agama: row['Agama Ibu'],
        kewarganegaraan: row['Kewarganegaraan Ibu'],
        pendidikan: row['Pendidikan Ibu'],
        pekerjaan: row['Pekerjaan Ibu'],
        pengeluaran_per_bulan: row['Pengeluaran per Bulan Ibu'],
        alamat_dan_no_telepon: row['Alamat dan No. Telepon Ibu'],
        status: row['Status Ibu'],
      })

      await Models.kesehatan.create({
        user_id: newUser.id,
        gol_darah: row['Golongan Darah'],
        penyakit_pernah_diderita: row['Penyakit Pernah Diderita'],
        kelainan_jasmani: row['Kelainan Jasmani'],
        tinggi: row.Tinggi,
        berat_badan: row['Berat Badan'],
      })

      await Models.wali.create({
        user_id: newUser.id,
        nama: row['Nama Wali'],
        tempat_lahir: row['Tempat Lahir Wali'],
        tanggal_lahir: row['Tanggal Lahir Wali'],
        agama: row['Agama Wali'],
        kewarganegaraan: row['Kewarganegaraan Wali'],
        pendidikan: row['Pendidikan Wali'],
        pekerjaan: row['Pekerjaan Wali'],
        pengeluaran_per_bulan: row['Pengeluaran per Bulan Wali'],
        alamat_dan_no_telepon: row['Alamat dan No. Telepon Wali'],
      })

      await Models.hobi_siswa.create({
        user_id: newUser.id,
        kesenian: row.Kesenian,
        olahraga: row.Olahraga,
        organisasi: row.Organisasi,
        lain_lain: row['Lain-lain'],
      })

      await Models.pendidikan.create({
        user_id: newUser.id,
        sebelumnya_tamatan_dari: row['Sebelumnya Tamatan Dari'],
        sebelumnya_tanggal_dan_ijazah: row['Sebelumnya Tanggal dan Ijazah'],
        sebelumnya_tanggal_skhun_dan_: row['Sebelumnya Tanggal SKHUN'],
        sebelumnya_lama_belajar: row['Sebelumnya Lama Belajar'],
        diterima_di_kelas: row['Diterima di Kelas'],
        diterima_di_bidang_keahlian: row['Diterima di Bidang Keahlian'],
        diterima_di_program_keahlian: row['Diterima di Program Keahlian'],
        diterima_di_paket_keahlian: row['Diterima di Paket Keahlian'],
        diterima_tanggal: row['Diterima Tanggal'],
        user_id: newUser.id,
      })

      await Models.tempat_tinggal.create({
        user_id: newUser.id,
        alamat: row['Alamat Tempat Tinggal'],
        no_telepon: row['No. Telepon Tempat Tinggal'],
        tinggal_dengan: row['Tinggal Dengan'],
        jarak_ke_sekolah: row['Jarak ke Sekolah'],
      })

      await Models.setelah_pendidikan.create({
        user_id: newUser.id,
        melanjutkan_ke: row['Melanjutkan Ke'],
      })

      // Setelah menyimpan data siswa, simpan data ke model sia
      await Models.sia.create({
        user_id: newUser.id,
        sakit: row['Sakit'] || 0, // Ambil data sakit dari Excel, default 0 jika tidak ada
        izin: row['Izin'] || 0, // Ambil data izin dari Excel, default 0 jika tidak ada
        alpha: row['Tanpa Keterangan'] || 0, // Ambil data alpha dari Excel, default 0 jika tidak ada
        semester: row['Semester'] || 1, // Ambil semester dari Excel, default 1 jika tidak ada
      });
    }

    res.status(201).json({ message: 'Excel data imported successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

app.listen(8080, async () => {
  console.log('App listen on port 8080')
})
