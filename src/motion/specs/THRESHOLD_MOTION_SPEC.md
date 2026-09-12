# THRESHOLD MOTION ARCHITECTURE & SPECIFICATION
## Duality — The Gateway Canvas (Diagonal Split)

> **Document Version:** 1.0.0  
> **Author:** Motion Engineer  
> **Target Subagents:** `parent`, `ui-ux-designer` (Stitch Mockup Alignment), `frontend-developer`  
> **Governing Standards:** §2 (90/10 Ratio), §38 (Architecture Separation), §40–§45 (Performance Budget) of [`PROJECT_BIBLE.md`](file:///d:/Project/Portofolio_Threshold/PROJECT_BIBLE.md) and [`THRESHOLD_CONCEPT.md`](file:///d:/Project/Portofolio_Threshold/THRESHOLD_CONCEPT.md).

---

## 1. Visual & Spatial Topography

```
(0,0) ┌────────────────────────────────────────────────────────────┐ (W, 0)
      │  \ [STRUCTURE // the short read]                         / │
      │    \   - Ink Canvas (#0E0D0C)                          /   │
      │      \ - Monospaced Editorial                      /       │
      │        \ - Fast-Track for Recruiters             /         │
      │          \                                     /           │
      │            \           D U A L I T Y         /             │
      │              \        (Crossover Word)     /               │
      │                \                         /                 │
      │                  \                     /                   │
      │                    \                 /                     │
      │                      \             /   [EXPRESSION]        │
      │                        \         /     - Ivory (#F5F2EB)   │
      │                          \     /       - Editorial Serif   │
      │                            \ /         - Deep Storytelling │
(0,H) └────────────────────────────────────────────────────────────┘ (W, H)
      (Bottom-Left)                                       (Bottom-Right)
```

- **Diagonal Line Orientation:** Ditarik dari sudut kiri-bawah `(0, H)` ke sudut kanan-atas `(W, 0)`.
- **Top-Left Triangle:** **Ink Canvas (`#0E0D0C`)** — mewakili *Structure* (the short read).
- **Bottom-Right Triangle:** **Ivory Canvas (`#F5F2EB`)** — mewakili *Expression* (the full story).
- **Pembagi Antar-Sisi:** Bukan garis poligon kaku, melainkan goresan tinta organik berbobot fisis (*harmonic sinus wave*) yang hidup dan bernapas secara hening.

---

## 2. Rincian 6 Fase Koreografi Gerak

### 2.1 Entrance Sequence (The Ink Emergence)
*Pristine Void → The Stroke → Canvas Division → Narrative Reveal*

| Waktu (s) | Elemen | Aksi & Mekanika GSAP | Easing | Rationale Editorial |
| :--- | :--- | :--- | :--- | :--- |
| **0.00 – 0.70** | **The Hairline Stroke** | Sebuah garis goresan tinta berketebalan 1px ditarik dari `(0, H)` ke `(W, 0)` menggunakan `strokeDashoffset: [length, 0]`. | `power3.out` | Menyerupai goresan kuas sumi pertama di atas kanvas kosong. Tenang, berbobot. |
| **0.60 – 1.30** | **The Ink Fill Expansion** | Segitiga kiri-atas mekar dari garis tersebut, memenuhi ruang dengan Ink Canvas `#0E0D0C` via interpolasi path poligon. | `power2.inOut` | Membagi ruang kanvas menjadi dua alam realitas secara organik tanpa pop-in. |
| **1.00 – 1.80** | **Harmonic Wave Relaxation** | Garis lurus diagonal melepaskan ketegangannya dan mengendur menjadi gelombang sinus organik berfrekuensi rendah. | `elastic.out(1, 0.75)` | Garis berubah dari konstruksi matematis menjadi entitas alamiah yang bernapas. |
| **1.20 – 2.00** | **Crossover Typo ("DUALITY")** | Kata **DUALITY** muncul tepat di tengah persilangan. Huruf muncul serentak dengan micro-stagger `yPercent: [18, 0]`, `opacity: [0, 1]`. | `expo.out` | Titik tumpu yang mengunci kedua belahan kanvas menjadi satu kesatuan utuh. |
| **1.40 – 2.20** | **Dual Lens Metadata** | Label teks "STRUCTURE // the short read" (kiri-atas, mono) & "EXPRESSION // the full story" (kanan-bawah, serif) pudar masuk (`opacity: [0, 0.85]`). | `power2.out` | Memberi kejelasan fungsional setelah emosi seni terbangun. |

---

### 2.2 Idle Organic Wave Dynamics (The Breathing Divider)
*Bukan animasi loop linier, melainkan pernapasan harmonik fisika fluida.*

- **Mekanika Matematika (Parametrik):**
  - Titik awal $P_0 = (0, H)$ dan titik akhir $P_1 = (W, 0)$ **terkunci permanen** pada sudut layar.
  - Setiap titik di sepanjang diagonal mengalami perpindahan ortogonal (tegak lurus terhadap garis kemiringan):
    $$\Delta(t, \tau) = \sin(\pi t) \cdot \left[ A_1 \sin(2\pi f_1 \tau + 2\pi t) + A_2 \cos(2\pi f_2 \tau - 4\pi t) \right]$$
  - Faktor $\sin(\pi t)$ adalah *boundary envelope* yang memaksa amplitudo bernilai tepat $0$ di kedua sudut ($t=0$ dan $t=1$), sehingga sambungan layar tidak pernah lepas dari sudut viewport.
- **Parameter Fisika:**
  - $A_1$ (Amplitudo Utama): $14\text{px}$ desktop ($8\text{px}$ mobile).
  - $A_2$ (Harmonik Kedua): $4\text{px}$ untuk memberi variasi tekstur gelombang mikro.
  - Frekuensi Pernapasan: $T = 4.2\text{s}$ ($f \approx 0.24\text{Hz}$) — ritme bernapas manusia saat rileks.
  - Implementasi: Dihitung di memori pada `gsap.ticker` dan diumpankan ke atribut `d` SVG `<path>` melalui dual-cubic bezier 4 control-points tanpa memicu reflow DOM.

---

### 2.3 Hover Parallax & Interactive Magnetic Bias
*Respon organik terhadap kursor tanpa gaya magnetik murahan.*

- **Deteksi Zona Kursor:**
  Viewport dipetakan secara analitis terhadap garis diagonal:
  $$\text{Determinant}(x, y) = x \cdot H + y \cdot W - W \cdot H$$
  - Jika $\text{Det} < 0$: Kursor berada di Zona **STRUCTURE (Dark)**.
  - Jika $\text{Det} > 0$: Kursor berada di Zona **EXPRESSION (Light)**.
- **Respon Dinamis:**
  - **Saat Kursor Mendekati / Berada di Zona Dark:**
    - Gelombang diagonal secara anggun tertekan (*bowing bias*) ke arah kanan-bawah sebesar $4\text{vw}$, memperluas area kanvas hitam.
    - Kontras elemen Dark meningkat (`opacity: 0.85 → 1.0`), teks mono bergeser halus mengikuti posisi kursor (magnetic drift maksimal $8\text{px}$, lerp $0.08$).
    - Nuansa: Dingin, berbobot, presisi.
  - **Saat Kursor Mendekati / Berada di Zona Light:**
    - Gelombang diagonal melengkung lembut ke arah kiri-atas sebesar $4\text{vw}$, memperluas area kanvas krem.
    - Kontras elemen Light meningkat (`opacity: 0.85 → 1.0`), teks editorial serif mengembang halus (`letter-spacing: +0.02em`).
    - Nuansa: Hangat, lapang, mengalir.
- **Damping & Lerp:**
  Pergerakan bias menggunakan `gsap.quickTo` dengan durasi $0.65\text{s}$ dan ease `power2.out`, menjamin tidak ada getaran (*jitter*) saat kursor bergerak cepat melintasi garis tengah.

---

### 2.4 Crossover Typography Architecture ("DUALITY")
*Karya tipografi dialektika yang terpotong sempurna di atas air.*

- **Konstruksi Dual-Layer (Zero Artifacts):**
  Dua elemen teks dengan konten dan posisi identik ditumpuk pada satu koordinat pusat (`inset: 0; display: flex; align-items: center; justify-content: center`):
  1. **Layer 1 (Top/Ink Segment):**
     - Font: Serif Editorial berbobot kontemporer.
     - Warna: `#EDE8DF` (Krem Tinta Terang).
     - Di-clip menggunakan `clip-path: url(#clip-ink-triangle)`.
  2. **Layer 2 (Bottom/Ivory Segment):**
     - Font: Serif Editorial identik 1:1.
     - Warna: `#141210` (Arang Gelap).
     - Di-clip menggunakan `clip-path: url(#clip-ivory-triangle)`.
- **Interaksi Optik Refraksi:**
  Ketika gelombang sinus bergerak di bawah kata "DUALITY", batas potongan warna huruf ikut bergeser secara mulus di tengah-tengah glif karakter, menciptakan efek ilusi optik pembiasan cahaya alami seperti melihat teks di bawah permukaan air jernih.

---

### 2.5 Exit Transition Sequences (Modalitas Dual-Lens)

Sesuai filosofi §1 & §4 [`THRESHOLD_CONCEPT.md`](file:///d:/Project/Portofolio_Threshold/THRESHOLD_CONCEPT.md), kedua tombol memicu karakter gerak yang sangat berbeda:

#### A. Klik Sisi STRUCTURE (Dark / Recruiter Fast-Track)
- **Karakter:** *Snappy, Precision Aperture, Zero Wait Time.*
- **Target Durasi:** **< 320ms** total.
- **Runtutan Koreografi:**
  1. **T0 (0ms):** Suara klik haptic (visual micro-flash 20ms).
  2. **T0 – 260ms:** Segitiga gelap berakselerasi menutup sisa layar kanan-bawah secara diagonal seperti bilah rana kamera mekanis (*mechanical shutter blade*), kurva ease: `power4.inOut`.
  3. **T120ms:** Kata "DUALITY" bergeser horizontal dan bertransformasi menjadi baris konsol monospaced: `[ LENS: STRUCTURE ENGAGED ]`.
  4. **T280ms:** Route `/recruiter` (atau render state Structure) siap ditampilkan penuh dengan rendering indeks teknis, metrik arsitektur, dan kontak langsung tanpa lag.
  5. **State Persist:** URL parameter disetel ke `?lens=structure`, disimpan ke `sessionStorage`.

#### B. Klik Sisi EXPRESSION (Light / Immersive Deep Story)
- **Karakter:** *Fluid Paper Unfold, Poetic Immersion, Seamless Elevation.*
- **Target Durasi:** **1.1s – 1.2s** total.
- **Runtutan Koreografi:**
  1. **T0 (0ms):** Gelombang diagonal melepaskan tegangan permukaannya; kurva memanjang dan meleleh terbuka (*unfolding like fine washi paper*).
  2. **T0 – 850ms:** Kanvas Ivory `#F5F2EB` mengembang memenuhi seluruh layar dengan kurva `power3.inOut`. Segitiga gelap terdorong naik secara anggun menuju sudut kiri atas dan larut menjadi aksen spasial Section 01.
  3. **T300ms – 1100ms:** Kata "DUALITY" bertransformasi ukuran dan posisi (`y: 0 → -38vh`, `scale: 1.0 → 0.72`, ease: `expo.out`), bertransisi secara mulus menjadi masthead editorial Bab 01 Opening.
  4. **T900ms:** Master RAF Lenis smooth-scroll aktif secara lembut, mengizinkan pengunjung memulai pembacaan scrollytelling Bab 01 tanpa hambatan.
  5. **State Persist:** URL parameter disetel ke `?lens=expression`, disimpan ke `sessionStorage`.

---

## 3. Aturan Standar Rekayasa GSAP & Performa (§40–§45)

1. **Wajib `gsap.context()` & Lifecycle Revert (§45):**
   Seluruh inisialisasi timeline entrance, wave ticker, dan hover listeners wajib dienkapsulasi dalam hook `useGsapContext`:
   ```tsx
   useEffect(() => {
     const ctx = gsap.context(() => {
       // Entrance, Wave Ticker, Hover Observers
     }, containerRef);
     return () => ctx.revert();
   }, []);
   ```
2. **Zero Layout-Thrashing Rule (§44):**
   - Dilarang memanipulasi properti reflow: `width`, `height`, `top`, `left`, `margin`, `padding`.
   - Modifikasi hanya menyasar: Atribut `d` pada elemen SVG `<path>` (atau inline CSS clip-path), `transform: translate3d(...) scale(...)`, dan `opacity`.
   - Menggunakan `will-change: transform, clip-path` secara terisolasi hanya saat transisi berlangsung.
3. **Budget Aksesibilitas (`prefers-reduced-motion`) (§43):**
   Jika terdeteksi `prefers-reduced-motion: reduce`:
   - Gelombang organik dimatikan: garis diagonal berupa garis lurus statis murni.
   - Entrance sequence diganti dengan instant crossfade 150ms.
   - Exit sequence: Dark berupa instant cut (50ms); Light berupa crossfade lembut (200ms).
   - Ticker RAF dinonaktifkan sepenuhnya untuk menghemat 100% daya pemrosesan.
4. **Respon Responsif Layar Mobile / Portrait:**
   Pada layar `< 768px` (aspek rasio vertikal), kemiringan diagonal disesuaikan secara otomatis:
   - Garis pembagi bertransisi dari rasio diagonal ekstrem menjadi sudut kemiringan moderat ($15^\circ$) atau pembagian split horizontal dengan kurva gelombang mikro agar teks "STRUCTURE" dan "EXPRESSION" tetap memiliki ruang baca yang lapang dan tidak terdistorsi.

---

## 4. Panduan Koordinasi Mockup Stitch (`ui-ux-designer`)

Untuk pembuatan screen mockup di Stitch, `ui-ux-designer` disarankan membagi representasi visual ke dalam 4 state kunci:
1. **State 1: Initial Resting Canvas (Idle)**  
   Menampilkan rasio kanvas 50:50 dengan gelombang sinus halus di tengah, kata "DUALITY" terbelah dua warna di persilangan, teks label Structure (Ink) & Expression (Ivory) terlihat jelas.
2. **State 2: Hover Bias Dark (Structure Focus)**  
   Menampilkan gelombang tertekan ke arah kanan-bawah, memperluas area gelap hingga 60%, teks monospaced Structure lebih terang dan kontras tinggi.
3. **State 3: Hover Bias Light (Expression Focus)**  
   Menampilkan gelombang tertekan ke arah kiri-atas, memperluas area terang hingga 60%, tipografi serif Expression bernapas dengan anggun.
4. **State 4: Transition In-Flight (Split Dissolve)**  
   Visualisasi fase pertengahan saat salah satu sisi mekar memenuhi layar.
