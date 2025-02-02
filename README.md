# Buku Induk

## Bagaimana cara meletakannya di server?

> [!WARNING]\
> Karena ada bug pada fitur migration database. diharap hapus dulu `db_buku_induk` dan buat lagi. Itu kalau memang **Sangat dibutuhkan migration, Kalau tidak ada yang harus diubah nggak usah migration lagi** dan jangan jalankan perintah di warning ini

> [!NOTE]\
> Ikuti step by step cara ini

1. Clone repository ini. Tentukan dimana meletakannya. Bebas

```bash
  git https://github.com/AnandaCahya/backend-buku-induk
```

2. Pergi ke directory

```bash
  cd backend-buku-induk
```

3. Install dependencies

```bash
  npm install
```

> [!WARNING]\
> Kalau tidak ada perubahan pada database yang dilakukan developer backend. Tidak usah melakukan migration

4. Lakukan migration database (Untuk mempersiapkan database)

```bash
npm run db:migrate
```

> [!WARNING]\
> Kalau sebelumnya udah pernah nambahin database pakai migrate. Jalankan ini dulu sebelum no 4

```bash
npm run db:migrate:undo
```

> [!NOTE]\
> Data atau isi database udah pasti keriset. Kalau dirasa penting simpen dulu.

5. Lakukan seed database (Untuk mempersiapkan data pada database)

```bash
npm run db:seed
```

> [!NOTE]\
> Data dari migration akan di isi pakai ini. Termasuk akun admin, jurusan dan angkatan. Kalau akun admin gak ada request ke no `Nanda`

6. Configurasi tambahan

Buat `.env`. Minta ke Ardian, Nanda Atau Daris

```env
EMAIL = ""
PASSWORD = ""
```

7. (Tambahan) Cek `src/config/config.json` sesuaikan username dan password sesuai dengan database kalian

## Bagaimana cara menjalankan server?

```bash
  npm start
```

## Progress

- [x] Membuat sistem migration
- [x] Membuat sistem seed
- [ ] Membuat database nilai
- [ ] Menambahkan route tambah nilai
- [ ] Menambahkan route mendapatkan semua nilai siswa (by id)
- [ ] Export identitas siswa (pdf)
- [ ] Export raport nilai siswa (excel)

## Dibuat oleh

Projet ini di buat oleh :

- [BWX1Y](https://github.com/bwx1y)
- [BigApple35](https://github.com/BigApple35)
- [AnandaCahya](https://github.com/AnandaCahya)
