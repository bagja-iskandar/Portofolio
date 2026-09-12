# MASTER TECH STACK SPECIFICATION
## Duality — A Canvas in Motion

> **Project:** Portfolio Threshold  
> **Lead Architect / Project Manager:** Pair Programming with Tech Lead  
> **Source of Truth:** [`PROJECT_BIBLE.md`](file:///d:/Project/Portofolio_Threshold/PROJECT_BIBLE.md) & [`THRESHOLD_CONCEPT.md`](file:///d:/Project/Portofolio_Threshold/THRESHOLD_CONCEPT.md)  
> **Compliance Guardrails:** Approved by `design-guardian`, `data-architect`, `motion-engineer`  
> **Status:** APPROVED & BINDING ARCHITECTURE  

---

### 1. Visi Arsitektur & Prinsip Rekayasa

Portofolio **Duality — A Canvas in Motion** dirancang bukan sebagai web developer konvensional ataupun landing page SaaS, melainkan sebagai **pameran seni editorial interaktif dan kanvas berkelanjutan** yang dibangun di atas fondasi rekayasa perangkat lunak modern.

Sesuai mandat **§38 PROJECT_BIBLE.md**, arsitektur sistem memisahkan kode secara absolut ke dalam 6 lapisan terisolasi (*Clean Architecture / Hexagonal Architecture*):

```
┌────────────────────────────────────────────────────────────────────────┐
│ 1. CONTENT & DATA LAYER    (Pure TS, Port & Adapter, Zero Hardcoding)  │
├────────────────────────────────────────────────────────────────────────┤
│ 2. LAYOUT LAYER            (12-Column Grid, Responsive Viewports)      │
├────────────────────────────────────────────────────────────────────────┤
│ 3. PRESENTATION UI LAYER   (Pure Presentational, Props-Driven, No GSAP)│
├────────────────────────────────────────────────────────────────────────┤
│ 4. MOTION ENGINE LAYER     (GSAP 3, ScrollTrigger, Lenis Master RAF)   │
├────────────────────────────────────────────────────────────────────────┤
│ 5. ATMOSPHERE 3D LAYER     (Three.js, Noise Shader, Strict 25-40 Part) │
├────────────────────────────────────────────────────────────────────────┤
│ 6. UTILITIES & CONFIG      (Color Tokens, Typography Scales, Math)     │
└────────────────────────────────────────────────────────────────────────┘
```

---

### 2. Matriks Teknologi & Paket Inti

| Domain | Teknologi / Paket | Versi | Peran & Alasan Pemilihan |
| :--- | :--- | :--- | :--- |
| **Core Framework** | **Next.js (App Router)** | `^15.1.0` | React Server Components (RSC) untuk zero bundle overhead pada konten statis, optimasi font bawaan (`next/font`), optimasi aset gambar WebP/AVIF (`next/image`), dan arsitektur routing modular. |
| **UI Library** | **React** | `^19.0.0` | Standar industri untuk UI deklaratif, integrasi mulus dengan ekosistem Server Components dan concurrent rendering. |
| **Language** | **TypeScript** | `^5.6.0` | Strict type safety (`strict: true`, `noImplicitAny: true`), nominal branded types (`ProjectId`, `ChapterId`), dan jaminan kontrak data absolut. |
| **Styling Engine** | **Tailwind CSS** | `^3.4.1` / `v4` | Atomic CSS performa tinggi. Dikonfigurasi dengan token warna kanvas kustom yang terkunci (**Ivory `#F5F2EB` ↔ Ink `#0E0D0C`**). |
| **Core Motion** | **GSAP** | `^3.12.5` | Mesin animasi matematika presisi bebas garbage collection lag. |
| **React Motion Hook** | **`@gsap/react`** | `^2.1.1` | Wrapper resmi `useGSAP` untuk manajemen lifecycle otomatis (`gsap.context()`) dan pembersihan memori instan saat unmount. |
| **Scroll Controller** | **GSAP ScrollTrigger** | `^3.12.5` | Scroll calculations, pinning kanvas sinematik, scrubbing presisi, dan sinkronisasi transisi bab. |
| **Smooth Scroll** | **Lenis** | `^1.1.18` | Decoupled smooth scrolling dari Darkroom Engineering (<3KB gzipped). Menormalisasi wheel delta antar-OS tanpa merusak scrollbar native. |
| **3D & Atmospheric** | **Three.js** | `^0.170.0` | Rendering WebGL prosedural untuk *The Artifact*, grain/noise shader, dan 25–40 dust particles dengan budget performa ketat. |
| **Iconography** | **Lucide React** | `^0.460.0` | Ikon SVG minimalis, un-opinionated, dan sepenuhnya tree-shakable. |
| **Data Validation** | **Zod** | `^3.23.0` | Skema validasi data run-time untuk menjamin integritas konten `Project[]` pada build-time. |

---

### 3. Konfigurasi Sistem Desain & Token Visual

#### 3.1 Palet Warna Kanvas Terkunci (Strict Pigment Tokens)

Tailwind CSS dikonfigurasi secara ketat hanya menggunakan palet pigmen bumi alami (menolak semua warna sintetis/neon per §46):

```ts
// tailwind.config.ts / theme tokens
export const canvasTokens = {
  ivory: {
    background: '#F5F2EB', // Kertas hangat alami
    surface: '#ECE7DE',    // Kontainer sekunder
    textPrimary: '#141210',// Tinta arang gelap
    textSecondary: '#57524D',// Tinta arang pudar
    accent: '#B85A3A',     // Terracotta / Sienna alami
  },
  ink: {
    background: '#0E0D0C', // Charcoal pekat
    surface: '#181614',    // Surface bertekstur
    textPrimary: '#EDE8DF',// Teks krem terang
    textSecondary: '#8A847C',// Teks abu hangat
    accent: '#C98A4B',     // Ochre keemasan bumi
  },
} as const;
```

#### 3.2 Sistem Tiga Suara Tipografi (Three Voices Typography)

Tipografi diintegrasikan melalui `next/font/google` dengan zero layout shift (font display `swap`):

1. **Voice 1: Editorial Serif (`Cormorant Garamond`)**  
   *Digunakan untuk:* Headline utama, nomor bab besar, kutipan reflektif, dan transisi ekspresif.
2. **Voice 2: Contemporary Sans (`Plus Jakarta Sans` / `Inter`)**  
   *Digunakan untuk:* Body copy, narasi filosofi, dan deskripsi editorial.
3. **Voice 3: Analytical Monospace (`Geist Mono`)**  
   *Digunakan untuk:* Metadata proyek, spesifikasi teknologi, tanggal, dan catatan arsitektural.

---

### 4. Arsitektur Sinkronisasi Motion (Lenis + GSAP Master RAF)

Untuk mencegah **micro-stutter** (jitter visual akibat ketidaksinkronan loop Lenis dan loop GSAP), seluruh siklus frame disatukan ke dalam **Satu Master RAF Loop**:

```
[ Window RAF Event ]
         │
         ▼
[ GSAP Master Ticker ] (Single Source of Truth)
         │
         ├───> lenis.raf(time * 1000)  [Update Scroll Interpolation]
         └───> ScrollTrigger.update()   [Update Pins & Viewport Tweens]
```

#### Blueprint Implementasi Provider (`SmoothScrollProvider.tsx`):

```tsx
'use client';

import React, { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollContextType {
  lenis: Lenis | null;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({ lenis: null });
export const useSmoothScroll = () => useContext(SmoothScrollContext);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Aksesibilitas: Lewati jika prefers-reduced-motion aktif
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0); // Mencegah lompatan animasi setelah tab idle

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.off('scroll', ScrollTrigger.update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
```

---

### 5. Sistem Tiga Tingkat Scroll (3-Tier Scroll System)

Sesuai rasio 90/10 pada `PROJECT_BIBLE.md`:

| Tingkat Scroll | Mekanika & Parameter | Pemetaan Section Naratif |
| :--- | :--- | :--- |
| **Level 1: Natural Scroll** *(90% Pacing)* | **Unpinned, Free Momentum.** Scroll murni dikendalikan pembaca. Animasi hanya berupa *subtle reveal* (`yPercent: 10`, `opacity: 0 → 1`, `scrub: false`). | • 03 — Philosophy<br>• 06 — About<br>• 08 — Contact<br>• Threshold: Structure Mode |
| **Level 2: Guided Scroll** *(Pacing Control)* | **Soft Sticky, Relative Scrub.** Scroll tetap bergerak, namun elemen penanda bab atau indikator samping tertahan sejenak (`scrub: 0.8`). | • 02 — Introduction<br>• 05 — Studio / Studies |
| **Level 3: Cinematic Scroll** *(10% Surprise)* | **Pinned Viewport Scrollytelling.** Viewport terkunci penuh (`pin: true`, `scrub: 1.2`), scroll menggerakkan timeline kanvas dan metamorfosis motif visual. | • Threshold Concept (Diagonal Split)<br>• 01 — Opening (Hero Kanvas)<br>• 04 — Selected Work (Exhibits)<br>• 07 — Final Stroke (Penutup) |

---

### 6. Budget Performa 3D & Efek Atmosferik (§40–45)

Dikelola secara eksklusif oleh subagent `atmosphere-3d`:
1. **Jumlah Partikel Rendah:** Dibatasi ketat **25–40 partikel**.
2. **DPR Capped:** `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))` untuk menghindari GPU bottleneck.
3. **Viewport Culling (IntersectionObserver):** Loop WebGL `requestAnimationFrame` otomatis dijeda ketika canvas container berada di luar viewport.
4. **Reduced Motion Fallback:** Seluruh canvas 3D dimatikan total jika `prefers-reduced-motion` aktif.
5. **Hardware Acceleration:** Hanya mentransformasi `transform: translate3d()` dan `opacity`. Dilarang mentransformasi properti reflow (`width`, `height`, `margin`, `top`).

---

### 7. Arsitektur Data Layer Terpusat (§39 Bible)

Dikelola secara eksklusif oleh subagent `data-architect` ([`DATA_ARCHITECTURE.md`](file:///d:/Project/Portofolio_Threshold/DATA_ARCHITECTURE.md)):
- **Zero Hardcoding Rule:** Seluruh teks narasi, judul, tanggal, dan metadata proyek disimpan di `src/data/content/`. Komponen UI dilarang mendefinisikan teks statis di dalam markup.
- **Dual-Lens Data Structure:** Setiap proyek mendukung dua sudut pandang:
  - `structureRead`: Ringkasan eksekutif, masalah rekayasa, solusi teknis, metrik performa.
  - `expressionRead`: Headline editorial, esai dialektika seni & rekayasa, kutipan puitis.
- **Repository Pattern:** Komponen UI mengakses data murni melalui abstraksi repository (`IProjectRepository`, `IChapterRepository`).

---

### 8. Standar Kualitas, Aksesibilitas & Keamanan

1. **Aksesibilitas (WCAG 2.2 AA):**
   - Rasio kontras teks minimal 4.5:1 untuk teks normal dan 3:1 untuk teks besar pada kedua kanvas.
   - Navigasi keyboard penuh (`tabIndex`, custom visible focus rings menggunakan token Terracotta/Ochre).
   - Dukungan penuh `prefers-reduced-motion` di seluruh layer.
2. **Performa (Core Web Vitals):**
   - LCP < 1.2 detik.
   - FID / INP < 100 milidetik.
   - CLS = 0 (zero layout shift melalui Next.js font optimization & image aspect ratio placeholders).
   - Target Lighthouse: **95–100** di semua kategori (Performance, Accessibility, Best Practices, SEO).
3. **Keamanan Klien:**
   - Content Security Policy (CSP) ketat di `next.config.js`.
   - Sanitasi input form kontak tanpa evaluasi script eksternal berbahaya.

---

### 9. Struktur Direktori Proyek Bersih

```text
Portofolio_Threshold/
├── .agents/                      # Subagent configurations & 307 skills catalog
├── src/
│   ├── app/                      # Next.js 15 App Router pages & layout
│   │   ├── layout.tsx            # Root layout with font definitions & Lenis Provider
│   │   ├── page.tsx              # Main orchestrator (Threshold -> Chapters 01-08)
│   │   └── globals.css           # Tailwind base styles & locked color tokens
│   ├── components/
│   │   ├── layout/               # Grid 12-kolom, SectionWrapper, LensSwitcher
│   │   ├── presentation/         # Pure presentational UI (Cards, Exhibits, Text, Polaroid)
│   │   └── threshold/            # Organic diagonal split-screen component
│   ├── motion/                   # GSAP providers, timeline hooks, useGSAP wrappers
│   │   ├── SmoothScrollProvider.tsx
│   │   ├── useScrollChapter.ts
│   │   └── motionVariants.ts
│   ├── atmosphere/               # Three.js canvases, grain/noise shader, 25-40 particles
│   │   ├── ArtifactCanvas.tsx
│   │   ├── DustParticles.tsx
│   │   └── GrainNoise.tsx
│   ├── data/
│   │   ├── content/              # Pure TypeScript content fixtures (Zero hardcoding)
│   │   │   ├── chapters.data.ts
│   │   │   ├── projects.data.ts
│   │   │   └── threshold.data.ts
│   │   └── repositories/         # Query abstractions (Ports & Adapters)
│   │       └── project.repository.ts
│   ├── types/
│   │   └── duality.ts            # Canonical TypeScript domain types & branded IDs
│   └── lib/                      # Math, formatters, and browser helper utilities
├── PROJECT_BIBLE.md              # Core design & engineering bible (§1 - §48)
├── THRESHOLD_CONCEPT.md          # Threshold diagonal opening specification
├── TECH_STACK.md                 # This master technical specification
└── PROJECT_STATUS_HANDOVER.md    # Active phase progress & handover log
```
