# Dashboard Kinerja Pegawai

## Current State
Halaman LoginPage.tsx memiliki satu tombol login dengan Internet Identity untuk semua pengguna (admin dan pegawai). Setelah login, App.tsx menentukan role (admin/employee) berdasarkan respons backend `queryStatus()`.

## Requested Changes (Diff)

### Add
- Tab/toggle di halaman LoginPage: "Login Pegawai" dan "Login Admin"
- Tab "Login Admin" memiliki tampilan dan pesan yang berbeda (lebih formal, warna berbeda, ikon berbeda)
- Pesan/instruksi khusus di tab admin: hanya untuk akun yang sudah terdaftar sebagai admin
- Kedua tab menggunakan fungsi `login` yang sama dari `useInternetIdentity` (Internet Identity)

### Modify
- `LoginPage.tsx`: Tambahkan dua tab dengan `Tabs` shadcn/ui, tab pertama "Login Pegawai" (konten existing), tab kedua "Login Admin" (konten baru dengan styling berbeda)

### Remove
- Tidak ada yang dihapus

## Implementation Plan
1. Update `LoginPage.tsx` dengan dua tab: `pegawai` dan `admin`
2. Tab pegawai: konten seperti sekarang
3. Tab admin: tampilan berbeda — judul "Portal Admin BKKBN", ikon `ShieldCheck`, warna yang lebih tegas (biru gelap/navy), pesan peringatan bahwa hanya akun admin yang bisa masuk, tombol "Masuk sebagai Admin"
4. Gunakan shadcn `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`
5. Kedua tab memanggil `login()` yang sama dari `useInternetIdentity`
