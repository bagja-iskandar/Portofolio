# Motion Engine Layer (`src/motion/`)

> **Architectural Boundary:** Sole owner of GSAP 3, ScrollTrigger, and Lenis Smooth Scrolling.  
> **Mandate Compliance:** §38 (Absolute Architectural Separation), §40–§45 (Performance Budget & Lifecycle), and §46 (Banned Patterns) of [`PROJECT_BIBLE.md`](file:///d:/Project/Portofolio_Threshold/PROJECT_BIBLE.md).

---

## 1. Isolasi Arsitektur Mutlak (§38)

Sesuai mandat Clean Architecture pada §38:
- **`src/components/ui/` & `src/views/recruiter/` Bebas Polusi:** Komponen UI dan view presentasi murni hanya menerima data terstruktur via props dan merender markup semantik Tailwind. Dilarang keras mengimpor `gsap`, `ScrollTrigger`, atau `lenis` di dalamnya.
- **Isolasi Penuh di `src/motion/`:** Seluruh interaksi scroll, pemicu viewport, interpolasi frame, dan timeline orkestrasi diisolasi di folder ini via context providers, custom hooks, dan container wrappers.

---

## 2. Struktur Internal Terencana

```
src/motion/
├── providers/
│   └── SmoothScrollProvider.tsx    # Single Master RAF loop (Lenis + GSAP Ticker)
├── hooks/
│   ├── useSmoothScroll.ts          # Akses instance Lenis decoupled
│   ├── useGsapContext.ts           # Wrapper gsap.context() lifecycle & cleanup
│   └── useScrollTier.ts            # Perekatan 3-Tier scroll (Natural, Guided, Cinematic)
├── wrappers/
│   ├── MotionReveal.tsx            # Wrapper deklaratif untuk subtle reveal
│   └── PinnedViewport.tsx          # Wrapper viewport pinning untuk Cinematic Scroll
├── config/
│   └── scrollTiers.config.ts       # Parameter scrub, lerp, dan duration terstandarisasi
└── README.md
```

---

## 3. Aturan & Standar Teknis Motion Engineer

1. **Single Master RAF:**
   Lenis tidak menjalankan loop RAF sendiri. `gsap.ticker` menjadi single source of truth yang menggerakkan `lenis.raf()` dan `ScrollTrigger.update()`. `lagSmoothing(0)` wajib disetel untuk mencegah animasi melompat pasca tab idle.
2. **Lifecycle & Cleanup (§45):**
   Seluruh timeline dan tween GSAP wajib dibungkus dalam `gsap.context()` (atau `useGSAP`) dengan scope elemen tertentu dan di-`revert()` secara tuntas saat unmount.
3. **Budget Aksesibilitas (`prefers-reduced-motion`) (§43):**
   Smooth scroll dinonaktifkan secara anggun (*graceful fallback* ke native scroll) dan seluruh animasi transform dinetralisir jika pengguna mengaktifkan preferensi reduced motion.
4. **GPU Acceleration Only (§44):**
   Animasi hanya diizinkan memodifikasi properti compositing (`transform: translate3d/scale/rotate`, `opacity`) dengan `force3D: true`. Dilarang mentransformasikan properti reflow (`width`, `height`, `top`, `left`, `margin`).
5. **Rasio 90/10 & 3-Tier Scroll (§5 TECH_STACK.md):**
   - **Level 1 (Natural - 90%):** Unpinned, pembaca mengontrol kecepatan scroll sepenuhnya (`scrub: false`).
   - **Level 2 (Guided):** Soft sticky untuk penanda editorial (`scrub: 0.8`).
   - **Level 3 (Cinematic - 10%):** Pinned viewport untuk transisi klimaks seperti Threshold split dan Hero canvas (`pin: true`, `scrub: 1.2`).
