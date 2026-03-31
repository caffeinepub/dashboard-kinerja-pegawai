# Dashboard Kinerja Pegawai BKKBN

## Current State
New project. No existing application code.

## Requested Changes (Diff)

### Add
- Employee registration form with profile fields: Nama, NIP, Jabatan, Lokasi Kerja (Desa Binaan), Kecamatan, Kabupaten
- Admin approval system for new employee registrations
- Performance entry system based on Perjanjian Kinerja form:
  - Sasaran Kinerja (performance objective)
  - Indikator Kinerja: NO, Uraian (description)
  - Target: Jumlah (amount), Satuan (unit)
  - Capaian: Jumlah (actual amount), Persentase (auto-calculated: Capaian Jumlah / Target Jumlah x 100)
  - Sumber Data Evaluasi (evaluation data source)
  - Bukti Dukung (supporting evidence URL, e.g. Google Drive link)
- Admin panel to view all employees' performance data
- Admin feedback and overall rating (1-5 stars) per employee per period
- Employee dashboard showing their own performance summary and admin feedback
- Role-based access: Admin vs Employee

### Modify
- Nothing (new project)

### Remove
- Nothing (new project)

## Implementation Plan
1. Backend: Employee profile management (create, read, update)
2. Backend: Performance entry CRUD (sasaran kinerja + indikator kinerja with auto-calculated percentage)
3. Backend: Admin approval for user registrations
4. Backend: Admin feedback and rating per employee
5. Backend: Admin can view all employees and their performance
6. Frontend: Auth-gated app with role-based routing (Admin vs Employee)
7. Frontend: Employee registration/profile setup page
8. Frontend: Employee performance entry table (matching Perjanjian Kinerja format)
9. Frontend: Admin dashboard with employee list, approval queue, performance viewer
10. Frontend: Admin feedback form with star rating
11. Frontend: Employee dashboard showing performance summary and received feedback
