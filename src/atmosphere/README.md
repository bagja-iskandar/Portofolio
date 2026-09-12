# Atmosphere 3D Layer (`src/atmosphere/`)

> **Responsible Subagent:** `atmosphere-3d`  
> **Source of Truth:** [`PROJECT_BIBLE.md`](file:///d:/Project/Portofolio_Threshold/PROJECT_BIBLE.md) (§38, §40–§45) & [`TECH_STACK.md`](file:///d:/Project/Portofolio_Threshold/TECH_STACK.md) (§6, §9)  
> **Status:** ARCHITECTURALLY ISOLATED & READY FOR SCAFFOLDING

---

## 1. Pemisahan Arsitektur Mutlak (§38)
Lapisan `src/atmosphere/` memegang kendali eksklusif atas seluruh efek visual prosedural kanvas, WebGL rendering, grain/noise shader, partikel debu, dan ornamen 3D (*The Artifact*, *leaf-cluster*, *crystal-wireframe*).

- **Zero Leakage:** Komponen UI presentasi (`src/components/presentation/`) dan layout (`src/components/layout/`) dilarang memuat kode Three.js atau WebGL langsung.
- **Pure Canvas Mounting:** Komponen eksternal hanya mengonsumsi layer atmosfer sebagai canvas mount / background overlay tanpa mengotori logika presentasi.

---

## 2. Kepatuhan Budget Performa (§40–§45)

| Mandat | Aturan Teknis | Implementasi / Enforce |
| :--- | :--- | :--- |
| **§40 Dust Particles Count** | Dibatasi ketat **25–40 partikel** (bukan ratusan/ribuan). | `PARTICLE_COUNT = 32` (rentang 25–40), buffer geometry instancing. |
| **§41 DPR Capping** | Device Pixel Ratio dibatasi maksimal **2**. | `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))`. |
| **§42 Viewport Culling** | Animasi dan render loop dijeda saat elemen di luar viewport. | `IntersectionObserver` memantau container kanvas (`paused = !entry.isIntersecting`). |
| **§43 Prefers Reduced Motion** | Dinonaktifkan penuh saat mode reduced motion aktif. | Media query `(prefers-reduced-motion: reduce)` menghentikan rendering partikel & transformasi 3D. |
| **§44 GPU Acceleration** | Hanya transform GPU (`translate3d`, `opacity`, WebGL vertex). | Tidak ada modifikasi continuous layout reflow (`top`, `left`, `margin`). |
| **§45 Cleanup Lifecycle** | Pembersihan alokasi memori WebGL secara tuntas saat unmount. | `geometry.dispose()`, `material.dispose()`, `renderer.dispose()`, `cancelAnimationFrame()`. |

---

## 3. Blueprint Komponen Terencana

- **`DustParticles.tsx`:** Floating atmospheric dust (25–40 particles) dengan Brownian motion halus dan dynamic opacity sesuai tema Ivory ↔ Ink.
- **`GrainNoise.tsx`:** Procedural tactile grain / noise shader untuk nuansa kertas editorial fisik tanpa beban CPU tinggi.
- **`ArtifactCanvas.tsx`:** Procedural 3D wireframe / artifact geometry responsif terhadap rotasi scroll chapter.
- **`useAtmosphereViewport.ts`:** Custom hook untuk lifecycle `IntersectionObserver`, `prefers-reduced-motion`, dan resize handling dengan DPR cap 2.

