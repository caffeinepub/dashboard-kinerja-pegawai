# Dashboard Kinerja Pegawai

## Current State
Aplikasi sudah punya lazy loading dan cache 3 menit. Bottleneck utama:
1. vite.config.js: minify: false — bundle tidak diminifikasi, ukuran besar
2. Tidak ada code splitting manual untuk library @dfinity/@icp-sdk
3. QueryClient tanpa default staleTime
4. useActor.ts refetchQueries setiap actor berubah (double-fetch)

## Requested Changes (Diff)

### Add
- Manual chunk splitting di vite config
- Default staleTime dan gcTime di QueryClient

### Modify
- vite.config.js: minify false -> esbuild, tambah manualChunks
- main.tsx: QueryClient dengan defaults (staleTime 3min, gcTime 10min, retry 1)
- useActor.ts: useRef untuk skip invalidate jika sudah pernah dilakukan

### Remove
- Tidak ada

## Implementation Plan
1. vite.config.js: aktifkan minifikasi esbuild, manualChunks untuk vendor-icp, vendor-motion
2. main.tsx: QueryClient default options
3. useActor.ts: perbaiki double-fetch dengan useRef
