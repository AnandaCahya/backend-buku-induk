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
const adminPetugasController = require('./routes/Admin/AdminPetugasController')
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
app.use('/admin', AuthMiddlewareAdmin, adminPetugasController)


// ------ Siswa
app.use('/siswa', daftarDataController)
app.use('/siswa', AuthMiddlewareSiswa, ubahDataController)
app.use('/siswa', AuthMiddlewareSiswa, siswaRaportController)



app.get('/view-pdf/:id', async (req, res) => {
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
  const { angkatanId, jurusanId } = req.query;
  
  let data = await Models.user.findAll({
    where: {
      ...(angkatanId && { angkatan_id: angkatanId }),
      ...(jurusanId && { jurusan_id: jurusanId }),
    },
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

app.get('/view-raport', async (req, res) => {
  const { angkatanId, jurusanId } = req.query;

  try {
    const users = await Models.user.findAll({
      where: {
        angkatan_id: angkatanId,
        jurusan_id: jurusanId,
      },
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
          where: { status_perubahan: 'approved' },
        },
        {
          model: Models.pendidikan,
          as: 'pendidikan',
          attributes: ['diterima_di_program_keahlian', 'diterima_di_paket_keahlian'],
          where: { status_perubahan: 'approved' },
        },
      ],
    });

    if (!users.length) {
      return res.status(404).json({ error: 'No users found for the specified angkatan and jurusan' });
    }

    const nilaiData = await Models.nilai.findAll({
      where: {
        user_id: users.map(user => user.id),
      },
      include: [
        {
          model: Models.mapel,
          as: 'mapel',
          attributes: ['nama'],
        },
      ],
    });

    const siaData = await Models.sia.findAll({
      where: {
        user_id: users.map(user => user.id),
      },
    });

    const nilaiPerUser = users.map(user => {
      const nilaiPerSemester = nilaiData.reduce((acc, curr) => {
        if (curr.user_id === user.id) {
          const semesterKey = `Semester ${curr.semester}`;
          if (!acc[semesterKey]) {
            acc[semesterKey] = [];
          }
          acc[semesterKey].push(curr);
        }
        return acc;
      }, {});

      const siaPerUser = siaData.filter(s => s.user_id === user.id);

      return { user, nilaiPerSemester, sia: siaPerUser };
    });

    res.render('export-halaman-belakang-bulk', { elements: nilaiPerUser });
  } catch (err) {
    console.error('Terjadi kesalahan:', err);
    res.status(500).send('Terjadi kesalahan saat menampilkan halaman belakang');
  }
});

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
        akhir_pendidikan_tanggal_ijazah:
          row['Akhir Pendidikan Tanggal Ijazah'],
        akhir_pendidikan_no_ijazah:
          row['Akhir Pendidikan No Ijazah'],
        akhir_pendidikan_tanggal_skhun:
          row['Akhir Pendidikan Tanggal SKHUN'],
        akhir_pendidikan_no_skhun:
          row['Akhir Pendidikan No SKHUN'],
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
        sebelumnya_tanggal_ijazah: row['Sebelumnya Tanggal Ijazah'],
        sebelumnya_no_ijazah: row['Sebelumnya No Ijazah'],
        sebelumnya_tanggal_skhun: row['Sebelumnya Tanggal SKHUN'],
        sebelumnya_no_skhun: row['Sebelumnya No SKHUN'],
        sebelumnya_lama_belajar: row['Sebelumnya Lama Belajar'],
        pindahan_dari_sekolah: row['Pindahan Dari Sekolah'],
        pindahan_alasan: row['Pindahan Alasan'],
        diterima_di_kelas: row['Diterima di Kelas'],
        diterima_di_bidang_keahlian: row['Diterima di Bidang Keahlian'],
        diterima_di_program_keahlian: row['Diterima di Program Keahlian'],
        diterima_di_paket_keahlian: row['Diterima di Paket Keahlian'],
        diterima_tanggal: row['Diterima Tanggal'],
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


app.post('/import-raport', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { semester } = req.query; 
    if (!semester) {
      return res.status(400).json({ message: 'Semester is required' });
    }

    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0]; 
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

    const subjectNames = data[0]; 
    const labels = data[1]; 
    const rows = data.slice(2); 

    const mapelColumns = [];
    for (let i = 0; i < subjectNames.length; i++) {
      if (labels[i] === 'Nilai R') { 
        mapelColumns.push({
          mapelName: subjectNames[i],
          nilaiIndex: i,
          keteranganIndex: i + 1,
        });
      }
    }

    const sakitIndex = labels.indexOf('Sakit');
    const izinIndex = labels.indexOf('Izin');
    const alphaIndex = labels.indexOf('Alpha');

    console.log('Mapel found in Excel:', mapelColumns.map(col => col.mapelName));

    for (const row of rows) {
      const nisn = row[2]; 
      console.log('Processing NISN:', nisn); 

      if (!nisn) {
        console.log('Skipping row with undefined NISN:', row);
        continue;
      }

      const user = await Models.user.findOne({ where: { nisn } });

      if (!user) {
        console.log(`Skipping NISN not found in database: ${nisn}`);
        continue;
      }

      for (const mapelColumn of mapelColumns) {
        const mapel = await Models.mapel.findOne({ where: { nama: mapelColumn.mapelName } });

        if (!mapel) {
          console.log(`Skipping mapel not found: ${mapelColumn.mapelName}`);
          continue;
        }

        await Models.nilai.destroy({
          where: {
            user_id: user.id,
            mapel_id: mapel.id,
            semester: parseInt(semester, 10),
          },
        });

        const nilaiMerdeka = {
          r: row[mapelColumn.nilaiIndex],
          keterangan: row[mapelColumn.keteranganIndex],
          mapel_id: mapel.id,
          semester: parseInt(semester, 10), 
          user_id: user.id,
        };

        try {
          console.log('Inserting nilai_merdeka:', nilaiMerdeka);
          await Models.nilai.create(nilaiMerdeka);
        } catch (err) {
          console.error('Error inserting nilai_merdeka:', err);
        }
      }

      const parseInteger = (value) => {
        const parsed = parseInt(value, 10);
        return isNaN(parsed) ? 0 : parsed;
      };

      console.log(`Sakit: ${row[sakitIndex]}, Izin: ${row[izinIndex]}, Alpha: ${row[alphaIndex]}`);

      await Models.sia.destroy({
        where: {
          user_id: user.id,
          semester: parseInt(semester, 10),
        },
      });

      const siaData = {
        user_id: user.id,
        sakit: parseInteger(row[sakitIndex]),
        izin: parseInteger(row[izinIndex]),
        alpha: parseInteger(row[alphaIndex]),
        semester: parseInt(semester, 10), 
      };

      try {
        await Models.sia.create(siaData);
      } catch (err) {
        console.error('Error inserting SIA data:', err);
      }
    }

    res.status(201).json({ message: 'Raport data imported successfully' });
  } catch (error) {
    console.error('Error during import:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Configure multer for file upload
// const upload = multer({ dest: 'uploads/' });

app.post('/admin/import-individual-raport', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Delete all existing nilai and sia data for the user before importing fresh data
    await Models.nilai.destroy({ where: { user_id: userId } });
    await Models.sia.destroy({ where: { user_id: userId } });

    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0]; 
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

    const headers = data[0]; 
    const labels = data[1]; 
    const rows = data.slice(2); 

    const semesters = [1, 2, 3, 4, 5, 6];

    const mapelColumns = [];
    for (let i = 1; i < headers.length; i++) { // Start from index 1 (skip first column)
      if (labels[i] === 'Nilai R') { 
        mapelColumns.push({
          mapelName: headers[i],
          nilaiIndex: i,
          keteranganIndex: i + 1,
        });
      }
    }

    console.log('Mapel found in Excel:', mapelColumns.map(col => col.mapelName));

    const allMapel = await Models.mapel.findAll({ attributes: ['id', 'nama'] });

    let importedData = [];

    for (const row of rows) {
      const mapelName = row[0]; // Mata Pelajaran
      const mapel = allMapel.find(m => m.nama === mapelName);

      if (!mapel) {
        console.log(`Skipping unknown mapel: ${mapelName}`);
        continue;
      }

      let colIndex = 1; // Start from the second column
      for (let semester of semesters) {
        const nilaiR = row[colIndex] || null;
        const keterangan = row[colIndex + 1] || null;

        if (nilaiR !== null || keterangan !== null) {
          importedData.push({
            user_id: userId,
            mapel_id: mapel.id,
            semester: semester,
            r: nilaiR,
            keterangan: keterangan,
          });
        }
        colIndex += 2;
      }
    }

    // Insert or update records in the database
    for (let data of importedData) {
      await Models.nilai.upsert({
        user_id: data.user_id,
        mapel_id: data.mapel_id,
        semester: data.semester,
        r: data.r,
        keterangan: data.keterangan,
      });
    }

    res.json({ message: 'Import successful', data: importedData });
  } catch (err) {
    console.error('Error importing Excel:', err);
    res.status(500).json({ error: 'Error processing Excel file' });
  }
});


app.listen(8080, async () => {
  console.log('App listen on port 8080')
})
