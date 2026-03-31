# Dashboard Kinerja Pegawai

## Current State
- EmployeeLayout: pegawai langsung masuk dashboard setelah disetujui, tanpa cek kelengkapan profil
- ApprovalManagement: hanya menampilkan Principal ID (shortPrincipal), tidak ada data profil pegawai (Nama, NIP, Jabatan, dll)
- PenilaianKinerja: hanya menampilkan Principal ID, tidak ada nama/NIP pegawai
- SasaranKinerjaAdmin: hanya menampilkan Principal ID di kolom pegawai
- FeedbackReview: hanya menampilkan Principal ID
- AdminDashboard: widget persetujuan & feedback hanya menampilkan Principal ID

## Requested Changes (Diff)

### Add
- Gate profil di EmployeeLayout: jika profil belum lengkap (nama/nip/jabatan kosong), tampilkan halaman paksa isi profil sebelum bisa akses menu lain. Tampilkan banner/alert yang jelas bahwa profil harus diisi terlebih dahulu. Format sesuai gambar: Nama, NIP, Jabatan, Lokasi Kerja (Desa Binaan), Kecamatan, Kabupaten.
- Fungsi helper `buildProfileMap` di semua halaman admin untuk memetakan Principal.toString() → EmployeeProfile

### Modify
- **EmployeeLayout**: saat currentPage !== 'profil' dan profil belum lengkap, paksa tampilkan ProfilSaya dengan banner informasi wajib isi
- **ApprovalManagement**: tambahkan kolom Nama, NIP, Jabatan, Lokasi Kerja, Kecamatan, Kabupaten (dari useGetAllEmployeeProfiles). Jika profil tidak ada, tampilkan "-". Ubah tampilan dari tabel minimalis ke tabel yang informatif.
- **PenilaianKinerja**: tampilkan Nama + NIP + Jabatan untuk setiap pegawai yang disetujui, bukan hanya shortPrincipal
- **SasaranKinerjaAdmin**: tampilkan Nama + NIP pegawai di kolom pegawai, bukan hanya shortPrincipal
- **FeedbackReview**: tampilkan Nama + NIP pegawai di kolom pegawai, bukan hanya shortPrincipal
- **AdminDashboard**: di widget pending approvals, tampilkan nama pegawai jika tersedia

### Remove
- Tidak ada penghapusan

## Implementation Plan
1. Update `EmployeeLayout.tsx`: tambahkan logika gate profil — jika `profile` sudah di-load tapi nama/nip/jabatan kosong, render ProfilSaya dengan alert banner "Lengkapi profil Anda terlebih dahulu" dan sembunyikan menu lain atau disable navigasi ke halaman lain
2. Update `ApprovalManagement.tsx`: panggil `useGetAllEmployeeProfiles()`, buat map Principal→Profile, tampilkan data lengkap pegawai di tabel
3. Update `PenilaianKinerja.tsx`: panggil `useGetAllEmployeeProfiles()`, buat map, tampilkan nama/NIP/jabatan
4. Update `SasaranKinerjaAdmin.tsx`: panggil `useGetAllEmployeeProfiles()`, buat map, tampilkan nama/NIP
5. Update `FeedbackReview.tsx`: panggil `useGetAllEmployeeProfiles()`, buat map, tampilkan nama/NIP
6. Update `AdminDashboard.tsx`: gunakan profiles yang sudah diambil untuk tampilkan nama di widget approvals
