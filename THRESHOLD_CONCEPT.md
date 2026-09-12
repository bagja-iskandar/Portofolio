# THRESHOLD CONCEPT

> **Status:** PLANNING — konsepnya sudah disetujui, implementasi menunggu Hero dan section inti selesai lebih dulu.

---

### 1. Konsep Dasar

Layar pembuka sebelum Section 01, berbentuk *split-screen* **diagonal** (garis ditarik dari sudut kanan-atas ke kiri-bawah). Ini **bukan** pilihan berdasarkan segmentasi audiens ("recruiter vs pengunjung biasa"), melainkan representasi **dua lensa dari satu identitas yang sama**:

* **STRUCTURE (Segitiga Kiri-Atas, Ink Canvas):**  
  Gelap, presisi, berbasis grid.  
  *Tagline:* *"the short read."*
* **EXPRESSION (Segitiga Kanan-Bawah, Ivory Canvas):**  
  Terang, ekspresif, tekstur kertas editorial.  
  *Tagline:* *"the full story."*

#### Sifat Pengalaman
Memilih salah satu **tidak membuka portofolio yang berbeda**. Keduanya tetap bermuara pada entitas dan pengalaman Section 01 yang sama, hanya berbeda dalam modalitas membaca konten:
* **EXPRESSION:** Pengalaman *immersive* penuh yang dirancang secara lengkap (seluruh 8 bab naratif, alur *scrollytelling* utuh).
* **STRUCTURE:** Versi ringkas dan terstruktur dari materi yang sama (indeks proyek, intisari filosofi, akses kontak langsung) — cepat, padat informasi, efisien, namun tetap autentik merefleksikan "sisi presisi teknis", bukan versi yang direduksi kualitasnya.

---

### 2. Alasan Reframing (Mengapa Bukan "Recruiter vs Pengunjung Biasa")

Membingkai pilihan berdasarkan kategori audiens akan mereduksi pengunjung ke dalam kotak klasifikasi sempit. Pendekatan tersebut bertentangan dengan prinsip utama proyek:
1. *"Satu pengalaman yang berkelanjutan"*
2. *"Identitas personal harus dipahami sebelum karya dievaluasi"*

Membingkainya sebagai dua sisi dari satu **Duality** yang utuh menjaga konsistensi nilai seni dan narasi proyek, sembari tetap memecahkan kebutuhan fungsional praktis:
* Pengunjung yang memiliki keterbatasan waktu segera mendapatkan data esensial yang dicari.
* Pengunjung yang ingin menikmati perjalanan visual dapat menikmati pengalaman penuh secara menyeluruh.

---

### 3. Elemen Kunci Konsep

* **Garis Pemisah Organik:**  
  Pemisah diagonal berupa goresan tinta yang memiliki gelombang halus alami (*subtle wave*) — bukan garis lurus vektor digital yang kaku, dan bukan pula efek robekan kertas fisik yang artifisial.
* **Elemen Visual Penghubung (Crossover Element):**  
  Terdapat satu elemen visual (misalnya sebuah kata kunci atau tipografi) yang sengaja melintasi garis batas diagonal. Separuh bagian kata ditampilkan dengan gaya sisi *Structure*, dan separuh lainnya mengikuti gaya sisi *Expression*. Hal ini menegaskan bahwa kedua sisi saling bersinggungan dan berdialog, bukan dua panel independen yang sekadar ditempel berdampingan.
* **Adaptasi Responsif:**  
  Pada tampilan layar sempit (mobile / portrait), potongan diagonal bertransformasi menjadi susunan horizontal (atas-bawah) agar kenyamanan membaca teks dan proporsi tetap terjaga.

---

### 4. Keputusan Arsitektur & Transisi (Resolved Architecture)

* **Penyimpanan State Pengunjung (State Persistence):**  
  Menggunakan pendekatan **URL Query State + Session Storage**:
  * Tautan mendukung query parameter eksplisit: `?lens=structure` atau `?lens=expression`.
  * Saat pengunjung memilih di layar Threshold, parameter URL disematkan dan disimpan di `sessionStorage`.
  * **Keuntungan:** Tautan yang dibagikan kepada rekruter akan langsung membuka mode *Structure* secara instan dan deterministik, sementara sesi lokal pengguna tetap konsisten saat melakukan navigasi internal.
* **Mekanisme Transisi Antar-Sisi Tanpa Navbar:**  
  * **Tanpa Navbar Persisten:** Tetap mematuhi larangan §46 (tanpa bilah menu mengambang).
  * **Unobtrusive Lens Switcher:** Sebuah penanda tipografis monospaced minimal diletakkan di area sudut sekunder (misalnya pojok kanan bawah dengan z-index terisolasi atau di bagian akhir bab):  
    `[ lens: structure ↔ expression ]`  
  * Teks ini berukuran kecil (`text-xs font-mono`), tenang, dan hanya merespons hover dengan goresan aksen pigment (Terracotta/Ochre) tanpa efek glow atau popup berlebih.
* **Transisi Layar:**  
  * Memilih *Structure* menjalankan transisi cepat yang langsung memusatkan viewport ke ringkasan indeks teknis dan proyek terpilih.
  * Memilih *Expression* memicu animasi pembukaan kanvas diagonal organik yang mulus mengalir ke Section 01 Opening.

