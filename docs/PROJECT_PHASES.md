# DOKUMENTASI FASE PROYEK (PROJECT PHASES)
## Duality — A Canvas in Motion

> **Dokumen:** Rencana Kerja & Eksekusi Bertahap  
> **Fokus Aktif:** **FASE 1 — THE THRESHOLD (HALAMAN PEMBUKA)**  
> **Status:** SPECIFIED & READY FOR MOCKUP (STITCH)  
> **Sumber Kebenaran:** [`PROJECT_BIBLE.md`](file:///d:/Project/Portofolio_Threshold/PROJECT_BIBLE.md), [`THRESHOLD_CONCEPT.md`](file:///d:/Project/Portofolio_Threshold/THRESHOLD_CONCEPT.md), [`TECH_STACK.md`](file:///d:/Project/Portofolio_Threshold/TECH_STACK.md)

---

## 📑 Gambaran Umum Roadmap

Proyek portofolio ini dikerjakan secara bertahap melalui siklus terisolasi per fase. Sesuai instruksi, dokumentasi saat ini **dikhususkan 100% pada Fase 1**. Fase-fase berikutnya akan didokumentasikan dan dibuka secara berurutan setelah Fase 1 mencapai *Definition of Done (DoD)*.

```
┌────────────────────────────────────────────────────────────────────────┐
│ [AKTIF] FASE 1: THE THRESHOLD (Halaman Pembuka & Gateway Dua Lensa)     │
├────────────────────────────────────────────────────────────────────────┤
│ [TERKUNCI] FASE 2: THE RECRUITER VIEW (Dark Canvas / Fast-Track)       │
├────────────────────────────────────────────────────────────────────────┤
│ [TERKUNCI] FASE 3: THE IMMERSIVE VIEW (Light Canvas / 8 Bab Editorial) │
├────────────────────────────────────────────────────────────────────────┤
│ [TERKUNCI] FASE 4: INTEGRASI, POLISH & GLOBAL AUDIT                   │
└────────────────────────────────────────────────────────────────────────┘
```

---

# 🚪 FASE 1: THE THRESHOLD (HALAMAN PEMBUKA)

## 1. Tujuan & Sasaran Fase 1
Membangun pengalaman pembuka pertama saat situs diakses: sebuah gerbang interaktif berbentuk **split-screen diagonal organik** yang memperkenalkan konsep *Duality* dan memandu pengunjung memilih salah satu dari dua jalur portofolio:
1. **Sisi Kiri-Atas (DARK / INK CANVAS):** *"STRUCTURE / the short read"* — Dirancang untuk rekruter dan hiring manager yang memerlukan data teknis padat, cepat, dan to-the-point.
2. **Sisi Kanan-Bawah (LIGHT / IVORY CANVAS):** *"EXPRESSION / the full story"* — Dirancang untuk pengunjung yang ingin menikmati narasi mendalam, filosofi, dan scrollytelling kaya animasi.

---

## 2. Alur Kerja Eksekusi Fase 1 (Step-by-Step)

```
[ Step 1.1: Stitch Mockup ] 
            │
            ▼
[ Step 1.2: Design Guardian Audit ] 
            │
            ▼
[ Step 1.3: Data Contract & State Setup ] 
            │
            ▼
[ Step 1.4: Frontend Implementation ] 
            │
            ▼
[ Step 1.5: Motion Engineering ] 
            │
            ▼
[ Step 1.6: QA Visual (Screenshots) ] 
            │
            ▼
[ Step 1.7: Accessibility & Performance Audit ] 
            │
            ▼
[ Phase 1 Sign-Off & DoD Clearance ]
```

---

### Langkah 1.1: Pembuatan Desain Mockup dengan Stitch (`StitchMCP`)
* **Tanggung Jawab:** Project Manager & UI/UX Specialist via `StitchMCP`.
* **Aktivitas:**
  1. Inisialisasi project desain di StitchMCP dengan nama project `duality-threshold`.
  2. Melakukan *prompt generation* untuk menghasilkan screen mockup layar pembuka:
     - **Breakpoint Desktop (`1440x900`):** Pembagian diagonal dari sudut kanan-atas ke kiri-bawah dengan garis goresan tinta organik (*subtle wave*). Sisi kiri-atas Ink Canvas (`#0E0D0C`), sisi kanan-bawah Ivory Canvas (`#F5F2EB`). Elemen tipografi crossover `"DUALITY"` yang melintasi garis batas.
     - **Breakpoint Mobile (`390x844`):** Transformasi responsif dari diagonal menjadi potongan horizontal/vertikal bertumpuk agar teks dan ruang sentuh tetap proporsional.
  3. Menghasilkan variasi (*variants*) untuk state interaksi:
     - *Default State* (Keseimbangan kanvas yang tenang).
     - *Hover State Kiri (Structure)*: Aksen pigmen Ochre (`#C98A4B`), ekspansi halus area gelap.
     - *Hover State Kanan (Expression)*: Aksen pigmen Terracotta (`#B85A3A`), ekspansi halus area terang.
     - *Selection State*: Animasi transisi menuju view yang dipilih.

---

### Langkah 1.2: Audit & Review Desain (`design-guardian`)
* **Tanggung Jawab:** Subagent `design-guardian`.
* **Kriteria Pemeriksaan:**
  1. **Kepatuhan Palet Warna:** Memastikan hex code yang dihasilkan Stitch terkunci pada:
     - Ink Canvas: Background `#0E0D0C`, Surface `#181614`, Teks Utama `#EDE8DF`, Aksen `#C98A4B`.
     - Ivory Canvas: Background `#F5F2EB`, Surface `#ECE7DE`, Teks Utama `#141210`, Aksen `#B85A3A`.
     - **Penolakan Mutlak:** Menolak warna neon, gradien sintetis, atau warna biru default.
  2. **Kepatuhan Tipografi:**
     - Judul Crossover & Headline: Editorial Serif (*Cormorant Garamond*).
     - Label & Tagline (*"the short read"* / *"the full story"*): Analytical Monospace (*Geist Mono*).
     - Deskripsi Pengantar: Contemporary Sans (*Plus Jakarta Sans*).
  3. **Pemberantasan Pola Terlarang (§46):**
     - Memastikan tidak ada navbar konvensional yang melayang di atas layar Threshold.
     - Memastikan garis pemisah berupa gelombang tinta organik alami, bukan efek robekan kertas digital yang murahan.

---

### Langkah 1.3: Kontrak Data & Penanganan State (`data-architect`)
* **Tanggung Jawab:** Subagent `data-architect`.
* **Aktivitas:**
  1. Mengonsumsi skema kanonikal dari [`src/data/content/threshold.data.ts`](file:///d:/Project/Portofolio_Threshold/src/data/content/threshold.data.ts).
  2. Mengonfigurasi parameter state seleksi:
     - Dukungan URL Query: `?lens=structure` dan `?lens=expression`.
     - Sinkronisasi dengan `sessionStorage` agar pilihan pengguna bertahan saat refresh.
  3. Memastikan teks label, tagline, dan prompt narasi ditarik dari data layer murni (*zero hardcoding*).

---

### Langkah 1.4: Implementasi Komponen & Tailwind CSS (`frontend-builder`)
* **Tanggung Jawab:** Subagent `frontend-builder`.
* **File Target:**
  - `src/views/threshold/ThresholdGateway.tsx` (Komponen orkestrator utama).
  - `src/views/threshold/DiagonalDivider.tsx` (Komponen geometri garis pembagi organik via SVG / CSS `clip-path`).
  - `src/views/threshold/CrossoverWordmark.tsx` (Tipografi terbelah dua gaya).
* **Standar Implementasi (§38):**
  - Komponen murni menangani struktur visual, DOM layout semantik, dan styling Tailwind.
  - Mengisolasi logika animasi keluar ke layer motion.
  - Implementasi adaptif: diagonal pada desktop (`md:block`), stacked horizontal pada mobile (`md:hidden`).

---

### Langkah 1.5: Rekayasa Gerak & Transisi (`motion-engineer`)
* **Tanggung Jawab:** Subagent `motion-engineer`.
* **File Target:**
  - `src/motion/useThresholdMotion.ts` (Hook orkestrasi timeline GSAP).
* **Koreografi Animasi:**
  1. **Entrance Sequence:** Kanvas kosong bernapas sejenak → garis tinta muncul mengalir diagonal → kata crossover mekar halus → label teks memudar masuk (`0.8s`, `power3.out`).
  2. **Interactive Hover (Mikro-Interaksi):** Kursor mendekati salah satu sisi memicu pergeseran subtle kurva gelombang tinta sebesar `2–3%` dan pendaran aksen pigmen.
  3. **Exit Sequence (Peralihan Jalur):**
     - Klik **Structure (Dark):** Transisi instan (<400ms), sisi gelap meluas menutup viewport, langsung mengarahkan rute ke `/recruiter`.
     - Klik **Expression (Light):** Transisi puitis (1.0–1.2s), sisi terang mengembang bagaikan lembaran kertas editorial yang terbuka, mengalir ke Section 01 Opening.
  4. **Reduced Motion Fallback:** Jika `prefers-reduced-motion: reduce` terdeteksi, transisi diubah menjadi crossfade transparansi sederhana (<200ms).

---

### Langkah 1.6: Verifikasi Visual Nyata (`qa-visual`)
* **Tanggung Jawab:** Subagent `qa-visual`.
* **Metode:**
  1. Membuka browser headless/aktif.
  2. Menangkap tangkapan layar (*screenshot*) aktual di dua breakpoint wajib:
     - **Desktop Breakpoint:** `1440 x 900 px`.
     - **Mobile Breakpoint:** `390 x 844 px`.
  3. Memvalidasi fidelitas visual:
     - Memastikan garis diagonal tidak pecah (anti-aliasing halus).
     - Memastikan keterbacaan kata crossover di perbatasan dua kanvas.
     - Memastikan area klik/sentuh memenuhi standar ergonomis (minimal `48x48px` touch target pada mobile).
  4. **Aturan Ketat:** Dilarang menandai selesai sebelum ada bukti visual screenshot yang disetujui.

---

### Langkah 1.7: Audit Aksesibilitas & Performa (`a11y-perf-auditor`)
* **Tanggung Jawab:** Subagent `a11y-perf-auditor`.
* **Matriks Audit:**
  1. **Navigasi Keyboard:** Kedua sisi dapat difokuskan via tombol `Tab` dengan focus ring yang jelas (Ochre pada sisi gelap, Terracotta pada sisi terang), dan dapat dipilih via `Enter` atau `Space`.
  2. **Screen Reader:** Label semantik eksplisit (`aria-label="Pilih mode Recruiter / ringkasan cepat"` dan `aria-label="Pilih mode Narasi Lengkap / pengalaman editorial"`).
  3. **Rasio Kontras WCAG AA:** Rasio kontras teks terhadap latar belakang minimal 4.5:1 di kedua belah sisi kanvas.
  4. **Performa:** Waktu muat layar awal < 0.5 detik, CLS = 0 (zero cumulative layout shift).

---

## 3. Matriks Peran Subagent pada Fase 1

| Subagent | Tugas Utama pada Fase 1 | Output Deliverable |
|---|---|---|
| **`ui-ux-designer`** | Merancang mockup visual, wireframe, dan design system via StitchMCP (desktop 1440px & mobile 390px). | Mockup Stitch (`duality-threshold`), spesifikasi layout & token visual. |
| **`design-guardian`** | Reviewer/gatekeeper kepatuhan token warna Ivory/Ink, tipografi, dan ketiadaan pola terlarang §46. | Laporan Audit Kepatuhan Desain. |
| **`frontend-builder`** | Membangun komponen TSX dan styling Tailwind di `src/views/threshold/`. | File `ThresholdGateway.tsx`, `DiagonalDivider.tsx`. |
| **`motion-engineer`** | Mengorkestrasi timeline GSAP, hover wave dynamics, dan transisi keluar. | Hook `useThresholdMotion.ts` (wrapped `gsap.context()`). |
| **`data-architect`** | Menghubungkan konten teks dan URL query state handling. | Data fixtures & selector helper. |
| **`qa-visual`** | Pengambilan screenshot nyata di desktop & mobile, inspeksi visual. | Bukti screenshot visual & verifikasi DoD. |
| **`a11y-perf-auditor`** | Audit aksesibilitas keyboard, reduced motion, dan kontras WCAG AA. | Checklist kelulusan audit aksesibilitas & Core Web Vitals. |

---

## 4. Kriteria Selesai Fase 1 (Definition of Done)

Fase 1 dinyatakan **SELESAI (DONE)** apabila memenuhi seluruh kriteria berikut tanpa pengecualian:
- [x] Mockup visual telah digenerate via `StitchMCP` dan disetujui pengguna (Screen `ca026f4136334f8dbfdf59f4986a5f37`).
- [x] `design-guardian` meloloskan desain dari pelanggaran warna/font/pola terlarang §46.
- [x] Komponen terpasang di `src/views/threshold/` dengan pemisahan arsitektur §38 murni (`ThresholdGateway.tsx`).
- [x] Production build Next.js 15 terverifikasi lulus 100% tanpa error TypeScript / Tailwind.
- [ ] Integrasi lanjutan transisi motion GSAP (Fase 1 Step 1.5).
- [ ] Pengambilan bukti screenshot dev server desktop & mobile oleh `qa-visual`.
- [ ] Audit aksesibilitas keyboard & WCAG AA oleh `a11y-perf-auditor`.

---

> **Catatan:** Pembahasan dan dokumentasi mengenai **Fase 2 (The Recruiter View)** dan fase selanjutnya baru akan dibuka setelah seluruh checklist di atas tuntas diverifikasi.
