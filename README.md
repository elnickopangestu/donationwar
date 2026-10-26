# Donation War 2026

Landing page kompetisi donasi antar komunitas — **Siapa Paling Dermawan?**

Stack: Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion

## Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000. Butuh Node.js 18.17+.

## Struktur

- `app/` — layout, halaman utama, styling global
- `components/` — Hero, WarBar, Leaderboard, HowItWorks, Tiers, DonateModal, Footer
- `lib/store.tsx` — state donasi (React Context), data seed, dan simulasi donasi live

## Catatan

Data bersifat demo (in-memory) dengan simulasi donasi masuk tiap ±3,5 detik.
Untuk produksi, ganti `donate()` dan simulasi di `lib/store.tsx` dengan API route + database/WebSocket
serta payment gateway (mis. Midtrans/Xendit).
