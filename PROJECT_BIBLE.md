# PROJECT BIBLE
## Duality — A Canvas in Motion

---

### 1. Visi Proyek

* **Konsep Inti:** **DUALITY — A CANVAS IN MOTION**  
  Portofolio ini dirancang agar terasa seperti perpaduan antara **pameran seni kontemporer**, **publikasi editorial**, dan **kanvas interaktif**, yang dibangun oleh seorang engineer dengan sensibilitas artistik yang kuat.
* **Dualitas Fundamental (Bahasa Visual & Konseptual):**
  * Light ↔ Dark
  * Order ↔ Expression
  * Digital ↔ Physical
  * Engineering ↔ Art
  * Whitespace ↔ Density
  * Typography ↔ Image
  * Structure ↔ Gesture
* **Prinsip Inti Kanvas:**  
  Terang dan gelap **bukan "mode"**, melainkan **dua kanvas**. Tidak ada toggle light/dark mode manual dan tidak ada theme switching yang dikontrol oleh pengguna. Ini adalah urutan editorial dari kanvas artistik yang berganti-ganti (**Ivory ↔ Ink**), disusun menjadi satu karya yang mengalir berkelanjutan.
* **Progresi Emosional:**  
  Curiosity → Discovery → Immersion → Appreciation → Experimentation → Intimacy → Connection.
* **Yang Harus Dihindari:**  
  Terasa seperti portofolio developer generik, landing page SaaS, dashboard, template desain, showcase animasi tanpa narasi, atau estetika cyberpunk.

---

### 2. Prinsip Desain Inti — Rasio 90/10

* **90%:** Tenang, spasial, terkontrol, elegan, mudah dibaca, dan disengaja.
* **10%:** Tak terduga — dihadirkan lewat koreografi scroll, transformasi visual, interaksi yang halus, tipografi berkarakter, dan distorsi yang terkontrol.
* **Catatan:** Jangan membuat setiap section terasa ramai. Kontras antara ketenangan dan elemen kejutan adalah inti dari identitas proyek ini.

---

### 3. Personality

* **Karakter Utama:** Calm, precise, creative, curious, experimental.
* **Karakter Sekunder:** Analytical, sophisticated, technical, thoughtful, quietly ambitious, exploratory.
* **Kesan yang Dihindari:** Kekanakan, terlalu playful, korporat, arogan, terlalu futuristik, terlalu teknis, atau bising secara visual (*visually noisy*).

---

### 4. Positioning

Seorang frontend engineer yang memiliki kepedulian mendalam terhadap cara sistem digital bekerja, bagaimana interface terasa saat digunakan, dan bagaimana teknologi diterapkan secara kreatif.  
Tujuan komunikasi: menyampaikan kombinasi *engineering ability* + *design sensitivity* + *experimentation* tanpa menyatakannya secara eksplisit — kualitas karyanya sendiri yang menjadi bukti.

---

### 5. Filosofi Pengalaman

Situs ini bukan sekadar kumpulan halaman terpisah, melainkan **satu pengalaman berkelanjutan**. Pengunjung bergerak melalui rangkaian bab secara runtut, bukan menavigasi situs web konvensional.  
Mekanisme interaksi dan navigasi utama adalah **scroll** — scroll berfungsi sebagai media *storytelling*, mengendalikan progresi, pacing, transformasi visual, transisi antar-lingkungan, penekanan, dan ritme narasi.

---

### 6. Struktur Cerita (8 Bab)

Urutan bab disusun secara disengaja agar pengunjung memahami narasi manusianya terlebih dahulu sebelum mengevaluasi karyanya:

```text
01 — OPENING: Siapa saya?
02 — INTRODUCTION: Builder seperti apa saya?
03 — PHILOSOPHY: Bagaimana saya berpikir dan bekerja?
04 — SELECTED WORK: Apa yang sudah saya bangun?
05 — STUDIO/STUDIES: Apa yang saya eksplorasi?
06 — ABOUT: Siapa saya di luar pekerjaan?
07 — FINAL STROKE: Penutup visual
08 — CONTACT: Bisakah kita membangun sesuatu bersama?
```

> **Catatan Alur:** Jangan menempatkan *Selected Work* langsung setelah *Hero/Opening*. Pengunjung perlu mengenal figur pembuatnya terlebih dahulu.

---

### 7. Navigasi

* **Tanpa Navbar Konvensional:** Tidak ada bilah menu persisten (Home/About/Projects/Contact).
* **Indikator Halus:** Orientasi dan progres ditunjukkan secara halus (misalnya penanda nomor bab yang tetap menjadi elemen visual sekunder dan tidak mendistraksi konten).
* **Aksesibilitas & Kejelasan:** Meniadakan navbar tidak boleh mengorbankan navigabilitas — struktur semantik, navigasi keyboard penuh, indikator focus state yang jelas, serta dukungan *reduced-motion* tetap wajib dipenuhi.

---

### 8. Arah Visual & Lingkungan Kanvas

Suasana keseluruhan: pameran seni kontemporer + publikasi editorial + kanvas digital. Pengalaman dibagi menjadi dua lingkungan kanvas di tingkat section:

* **Ivory Canvas (Terang):** Putih hangat bernuansa tekstur kertas, keterbukaan, kejernihan editorial, whitespace lega, kehadiran sisi manusia, tenang.
* **Ink Canvas (Gelap):** Charcoal dalam (mendekati hitam), kedalaman spasial, ketegangan artistik, kontras tinggi, kepadatan sinematik, imersi fokus.

> **Kepemilikan Lingkungan:** Lingkungan kanvas adalah milik section, bukan preferensi toggle pengguna. Pengunjung berpindah antar-lingkungan melalui scroll biasa, sementara transisi ekspresif hanya digunakan untuk momen klimaks naratif tertentu.

---

### 9. Sistem Warna

#### Ivory Canvas (Terang)
* **Background:** `#F5F2EB`
* **Surface:** `#ECE7DE`
* **Teks Utama:** `#141210`
* **Teks Sekunder:** `#57524D`
* **Aksen:** `#B85A3A` (Terracotta / Sienna)

#### Ink Canvas (Gelap)
* **Background:** `#0E0D0C`
* **Surface:** `#181614`
* **Teks Utama:** `#EDE8DF`
* **Teks Sekunder:** `#8A847C`
* **Aksen:** `#C98A4B` (Ochre keemasan)

#### Filosofi Aksen
Warna aksen terinspirasi dari pigmen bumi alami (bukan warna neon sintetis). Digunakan secara terukur untuk indikator bab aktif, focus state, dan anotasi teknis. Aksen harus memberikan impresi goresan pigmen di atas kanvas fisik, bukan pendaran lampu LED digital.  
*Hindari: warna neon, gradien jenuh berlebihan, serta estetika visual cyberpunk/gaming.*

---

### 10. Tipografi — Sistem Tiga Suara

* **Serif Editorial (mis. Cormorant Garamond, Playfair Display):**  
  Digunakan pada headline besar, pembuka bab/section, dan momen-momen ekspresif. Mengomunikasikan *artistry*, ekspresi manusia, dan wibawa editorial.
* **Sans Kontemporer:**  
  Digunakan pada body copy, deskripsi naratif, dan label struktural. Mengomunikasikan kejernihan, modernitas, dan presisi fungsional.
* **Monospace (mis. Geist Mono):**  
  Digunakan pada metadata teknis, penanggalan project, tag teknologi, dan catatan pinggir. Mengomunikasikan struktur, informasi analitis, dan latar belakang engineering.

*Hindari: penggunaan terlalu banyak keluarga font, font dekoratif yang berlebihan, penekanan bold yang berlebihan, atau huruf kapital (uppercase) berlebihan pada body text.*

---

### 11. Grid & Layout

* **Fondasi:** Grid 12 kolom yang presisi sebagai struktur tersembunyi.
* **Presentasi di Atas Grid:** Bersifat ekspresif — asimetri terukur, tipografi berskala besar (*oversized*), tumpang-tindih (*overlap*) yang terkontrol, whitespace luas, dan variasi skala visual.
* **Prinsip Utama:** Setiap penempatan visual harus berakar pada struktur logis, bukan penataan acak tanpa alasan arsitektural.

---

### 12. Spacing & Whitespace

Whitespace diposisikan sebagai **elemen desain primer**, bukan area kosong sisa. Ruang kosong yang luas digunakan secara sadar untuk membangun fokus, pacing, penegasan hierarki, dan nuansa sinematik — harus tampak disengaja dan selesai, bukan seperti layout yang belum tuntas.

---

### 13. Hero / Opening

* **Suasana Awal:** Dimulai di atas **Ivory Canvas**. Membangun identitas personal tanpa menggunakan formula klise portofolio konvensional (*"Hi, I'm [Name], a passionate developer..."*).
* **Progresi Masuk:**  
  Kanvas kosong → Mark/monogram halus → Tipografi identitas personal → Perspektif pendukung → Elemen visual pendukung muncul sebagai jangkar spasial → Kanvas "bernapas" → Indikator scroll aktif.
* **Hierarki Visual:**  
  `NAME / IDENTITY` → `ROLE` → `LARGE STATEMENT` (pernyataan singkat yang berbobot) → `SMALL METADATA`.
* **Elemen Visual Sisi Kanan:**  
  **Bukan objek 3D abstrak**. Elemen visual pendukung di sisi kanan Hero adalah **foto personal** — halaman sketsa atau wireframe UI tulisan tangan asli milik pemilik situs, dibingkai menyerupai format polaroid. Ini adalah keputusan sadar untuk menghadirkan keaslian proses kerja nyata dan sentuhan manusia, menghindari dekorasi abstrak generik.

---

### 14. The Artifact (Motif Berulang di Luar Hero)

Pada section di luar Hero, dihadirkan motif visual berulang berupa objek dengan siluet tegas yang mampu berevolusi — berotasi, mendekat ke bidang pandang, terfragmentasi, menjadi elemen transisi, atau merespons kursor secara halus. Bentuk fisiknya (skulptural, geometris, atau mineral) memiliki alasan tematik yang kuat, bukan sekadar ornamen 3D tanpa makna.

---

### 15–21. Komponen Bab: Introduction, Philosophy, Selected Work, & Studies

* **02 — Introduction:** Memperlambat ritme setelah pembukaan Hero. Memperkenalkan persona melalui tipografi berukuran besar dan salinan teks singkat — bukan biografi panjang.
* **03 — Philosophy:** Mengomunikasikan cara berpikir dan prinsip kerja autentik (menghindari jargon umum seperti "Passionate/Hardworking"), disampaikan dengan kekuatan tipografis.
* **04 — Selected Work:** Menampilkan 3–5 proyek pilihan terbaik. Setiap proyek disajikan sebagai sebuah **exhibit** tunggal (dapat mengisi mayoritas viewport) alih-alih deretan card kecil berulang. Transisi antar-proyek terasa berkesinambungan secara visual tanpa patahan kasar.
* **05 — Studio / Studies:** Menunjukkan eksperimen dan rasa ingin tahu teknis, dikemas dalam tata letak berdisiplin editorial — menghindari bento grid generik maupun galeri demo acak.

---

### 22. Teknologi

Menghilangkan section skill konvensional (tanpa rating bintang, tanpa persentase, tanpa progress bar). Penguasaan teknologi dibuktikan secara langsung melalui hasil proyek dan studi eksperimental. Indeks teknis ringkas diperbolehkan hadir murni sebagai informasi metadata, bukan sebagai sistem penilaian diri.

---

### 23. About

Menghadirkan sisi yang lebih hangat dan manusiawi setelah pengunjung memahami karya dan pemikirannya. Memuat latar belakang, ketertarikan personal, dan metode kerja yang disukai, dengan tetap mempertahankan keselarasan estetika editorial portofolio.

---

### 24. Contact / Closing

Bab penutup berfungsi sebagai kesimpulan perjalanan naratif, bukan sekadar form pengisian pesan. Kondisi visual kembali ke titik minimal yang tenang, menjadi gema (*echo*) yang melengkapi bab pembuka.

---

### 25. Bahasa Motion (Konseptual)

* **Karakter Motion:** Lambat, halus, berbobot fisik, disengaja, sinematik, dengan momen kejutan yang terukur.
* **Aturan Fisika:** Ruang memiliki kedalaman, objek memiliki massa, tipografi memiliki kehadiran fisik, dan transisi memiliki kontinuitas yang runtut.
* **Hindari:** Efek bounce berlebihan, spring kaku, parallax yang memusingkan, fade-in berulang di semua elemen, dan animasi yang hadir tanpa tujuan naratif.

---

### 26. Aturan Konten & Penulisan

* **Tone of Voice:** Percaya diri, presisi, manusiawi, ringkas, dan reflektif.
* **Frasa Terlarang:** Hindari klise industri seperti *"passionate developer"*, *"pixel-perfect"*, *"cutting-edge solutions"*, atau *"innovative digital experiences"*.

---

### 27. Hal yang Harus Dihindari

1. Navbar konvensional yang kaku.
2. Hero klise dengan dua tombol ajakan bertindak (CTA).
3. Skill progress bar atau rating bintang.
4. Efek glassmorphism berlebihan atau gradien warna jenuh.
5. Estetika gaya cyberpunk, neon LED digital, dan floating cards template.
6. Bento grid generik yang tidak memiliki hierarki editorial.
7. Partikel acak dan efek glow blob tanpa makna.
8. Efek text-reveal dan gimmick kursor berlebihan.
9. Layar pemuatan (loading screen) dan dashboard yang tidak esensial.
10. Pemutaran audio otomatis (autoplay).

---

### 28. North Star

Saat menghadapi keraguan dalam keputusan desain, gunakan pertanyaan panduan ini:

> *"Apakah keputusan ini membuat pengalaman terasa lebih menyerupai galeri seni digital yang dirancang oleh seorang creative developer dengan fondasi teknis yang matang?"*

Jika suatu elemen hanya bertujuan membuat situs terlihat "ramai" atau "canggih" tanpa memperkuat narasi, kejernihan, maupun karakter personal — **jangan dimasukkan.**

---

### 29. Resolusi Filosofis: Kanvas vs Layar Threshold

* **Bukan Theme Toggle:** Layar gerbang awal (*Threshold*) **bukanlah tombol peralihan tema (light/dark mode toggle)**. Pilihan yang disajikan mewakili dua modalitas membaca atas karya dan identitas yang sama:
  * **Structure (Ink Canvas / the short read):** Ditujukan bagi pengunjung dengan keterbatasan waktu (rekruter, hiring manager) yang membutuhkan data presisi, arsitektur teknis, dan metrik esensial secara instan.
  * **Expression (Ivory Canvas / the full story):** Pengalaman penuh naratif scrollytelling yang menyeluruh (seluruh 8 bab editorial).
* **Kontinuitas Kanvas:** Di kedua modalitas, kanvas tetap berganti secara alami (**Ivory ↔ Ink**) mengikuti konteks section dan tidak dikendalikan oleh preferensi sakelar buatan pengguna.

---

### 30–37. Standar Pengalaman Sensorik & Lingkungan

* **§30 Lighting Model:** Pencahayaan kanvas bersifat difus dan tenang, seperti cahaya alami yang jatuh pada kertas sketsa atau galeri batu alam — bukan pendaran lampu LED digital neon.
* **§31 Audio Ambience (Opsional):** Dilarang keras memutar audio otomatis (*no autoplay*). Audio halus hanya boleh diaktifkan jika pengunjung secara sadar menekan kontrol suara (*user-initiated only*).
* **§32 Kerapatan Spasial:** Section naratif bernapas dengan margin vertikal luas (minimal `12rem` pada desktop), menciptakan ritme pembacaan yang tidak terburu-buru.

---

### 38. Pemisahan Arsitektur Komponen Mutlak

Untuk menjamin pemeliharaan jangka panjang, kode frontend wajib mematuhi pemisahan lapisan arsitektur secara tegas:

```
┌──────────────────────────────────────────────────────────┐
│ 1. Content & Data Layer  (Pure TS, Zero Hardcoding, Ports)│
│ 2. Layout Components     (Grid 12-kolom, Section Wrappers)│
│ 3. Visual Components     (Presentasi Murni, Props-Driven) │
│ 4. Animation Logic       (GSAP, ScrollTrigger via useGSAP)│
│ 5. 3D / Atmosphere Logic (Three.js, WebGL, Noise, Canvas) │
│ 6. Utilities & Helpers   (Math, String, Date formatters)  │
└──────────────────────────────────────────────────────────┘
```

* **Mandat Khusus:** Komponen presentasi visual **dilarang keras** mencampurkan logika animasi kompleks atau rendering 3D di dalamnya. Komponen presentasi murni menerima data terstruktur via props dan merender markup semantik. Logika motion dan 3D diisolasi ke dalam wrapper/hook khusus (`useGSAP`, dedicated canvas containers).

---

### 39. Kontrak Data Terpusat `Project[]` (Single Source of Truth)

Seluruh portofolio karya (`Selected Work` dan `Studies`) wajib didefinisikan ke dalam struktur data terpusat (`Project[]`) yang decoupled dari UI:

* **Struktur Data Dual-Lens:**
  * Setiap entitas `Project` memuat proyeksi `structureRead` (ringkasan eksekutif, masalah teknis, arsitektur solusi, metrik dampak) dan `expressionRead` (headline editorial, narasi dialektika seni & rekayasa, kutipan reflektif).
* **Metadata Rekayasa Autentik:**
  * Stack teknis diklasifikasikan secara jelas (frontend, systems, shaders, architecture).
  * Catatan keputusan arsitektural (*Architectural Decisions*) dengan rasional dan trade-off nyata.
  * Metrik performa terukur (*Engineering Benchmarks*, misal: 60fps render loop, 0ms input jank, <25MB heap memory).
* **Aturan Zero Hardcoding:** Teks deskripsi, URL media, dan tag teknologi dilarang di-hardcode di dalam file `.tsx` komponen presentasi.

---

### 40–45. Budget Teknis & Batasan Performa 3D / Atmosferik

* **§40 Partikel Rendah:** Jumlah partikel atmosferik dibatasi secara ketat antara **25–40 partikel**, bukan ratusan.
* **§41 DPR Cap:** Device Pixel Ratio rendering dibatasi maksimal **2** untuk menghindari penurunan frame rate pada layar Retina/HiDPI.
* **§42 Viewport Culling:** Animasi kanvas dan rendering 3D wajib dijeda (*paused*) secara otomatis saat elemen berada di luar viewport menggunakan `IntersectionObserver`.
* **§43 Aksesibilitas Reduced Motion:** Seluruh efek partikel, noise kontinu, dan transformasi 3D wajib dinonaktifkan jika sistem mendeteksi `prefers-reduced-motion: reduce`.
* **§44 GPU Acceleration:** Animasi hanya memodifikasi properti `transform` (`x`, `y`, `scale`, `rotation`, `opacity`) dengan `force3D: true`. Dilarang melakukan animasi kontinu pada properti layout reflow (`top`, `left`, `margin`, `width`).
* **§45 Cleanup Lifecycle:** Seluruh timeline GSAP wajib dibungkus dalam `gsap.context()` / `useGSAP` dan di-revert saat unmount untuk mencegah memory leak.

---

### 46. Daftar Lengkap Pola Terlarang (Design Guardian Auto-Reject)

Setiap usulan desain atau kode yang memuat elemen berikut **WAJIB DITOLAK** oleh subagent `design-guardian`:

1. **Navbar Konvensional:** Bilah menu melayang persisten dengan tombol klise (*Home / About / Projects / Contact*).
2. **Skill Bars & Persentase:** Progress bar penguasaan teknologi, rating bintang, atau angka persentase skill.
3. **Glassmorphism Berlebihan:** Efek kaca blur yang buram dan mendominasi tanpa alasan tipografis.
4. **Bento Grid Generik:** Kotak-kotak dashboard acak dengan ukuran seragam ala template SaaS.
5. **Warna di Luar Token Canvas:** Warna neon jenuh, gradien pelangi, biru neon, atau aksen sintetis di luar palet Ivory/Ink canvas yang sudah dikunci.
6. **Font di Luar 3 Keluarga:** Menggunakan font dekoratif sembarangan selain Serif Editorial, Sans Kontemporer, dan Monospace yang disetujui.
7. **Hero Klise:** Hero dengan dua tombol CTA (*"Contact Me"* & *"View Resume"*).
8. **Efek Blob & Glow Tanpa Makna:** Cahaya blob gradien kabur di latar belakang.
9. **Text-Reveal Berulang yang Melelahkan:** Setiap baris teks berkedip atau meluncur berlebihan saat di-scroll.
10. **Autoplay Audio:** Audio yang bersuara otomatis tanpa izin pengunjung.

---

### 47. Aturan Penulisan Konten & Bebas Fabrikasi (Zero Fabrication)

Subagent `content-writer` wajib mematuhi aturan ketat berikut:

1. **Bebas Klise Industri:** Dilarang menggunakan frasa klise seperti *"passionate developer"*, *"cutting-edge solutions"*, *"pixel-perfect designs"*, atau *"disruptive tech"*.
2. **Tanpa Fabrikasi Fakta (Zero Fabrication):**
   * Dilarang keras mengarang atau menambahkan riwayat pengalaman, sertifikasi, metrik klien, atau nama perusahaan yang tidak diberikan secara eksplisit oleh pemilik situs.
   * Konten disusun murni dari fakta nyata yang telah dikonfirmasi oleh pemilik portofolio, disampaikan dengan bahasa yang tenang, presisi, dan elegan.

---

### 48. Kriteria Definisi Selesai (Definition of Done)

Sebuah task tidak boleh dianggap selesai hanya karena kompilasi TypeScript sukses atau konsol browser bersih:

1. **Verifikasi Visual Nyata:** Subagent `qa-visual` wajib mengambil tangkapan layar (*screenshot*) pada breakpoint Desktop (`1440px+`) dan Mobile (`390px`) untuk memastikan fidelitas estetika dan keterbacaan.
2. **Verifikasi Aksesibilitas:** Lolos audit kontras warna WCAG AA, navigasi keyboard penuh, dan responsivitas `prefers-reduced-motion`.
3. **Persetujuan Design Guardian:** Memperoleh konfirmasi kepatuhan penuh terhadap token warna, tipografi, dan pemisahan arsitektur dari subagent `design-guardian`.

