/* Data Experience
File: src/data/experiences.js
Field yang kosong ("" atau []) otomatis disembunyikan di halaman.

Foto: taruh di public/experience/<slug>/ (format .webp atau .jpg, lebar ~1200px,
di bawah 200 KB). Contoh isi photos:
  photos: [
    { src: "/experience/asisten-skki-djpb/rapat.webp", caption: "Rapat koordinasi" },
  ],
Dokumen (SK, surat tugas): samarkan nama, tanda tangan, dan data pribadi dulu
sebelum dipasang. Isi number dan/atau image di field `document`. */

export const categories = [
  { id: "kerja", title: "Pengalaman kerja", note: "Magang dan asisten laboratorium.", dot: "bg-brand-navy" },
  { id: "organisasi", title: "Pengalaman organisasi", note: "Peran saya di organisasi kemahasiswaan.", dot: "bg-brand-teal" },
  { id: "kepanitiaan", title: "Pengalaman kepanitiaan", note: "Peran saya di kepanitiaan kegiatan kampus.", dot: "bg-brand-teal-dark" },
];

export const experiences = [
  /* ---------- Pengalaman kerja ---------- */
  {
    slug: "asisten-staf-skki-djpb",
    category: "kerja",
    role: "Asisten Staf SKKI (Magang)",
    place: "Kanwil DJPb Sumatera Utara",
    period: "Nov 2025 - Mei 2026",
    summary:
      "Mendukung pengelolaan data, pelaporan, dan pengembangan dashboard monitoring risiko.",
    jobdesk: [
      "Membangun dashboard monitoring risiko berbasis web yang menyajikan data secara real-time agar keputusan manajemen lebih cepat.",
      "Melakukan data entry dan verifikasi data administrasi agar informasi untuk monitoring dan laporan tetap akurat.",
      "Menyeragamkan struktur dan format laporan pembinaan dan supervisi Semester II 2025 agar pelaporan lebih konsisten.",
      "Membuat konten grafis edukasi untuk mendukung kebijakan dan kepatuhan internal.",
    ],
    document: null,
    cover: "",
    photos: [],
    tone: "from-brand-teal/20 to-brand-navy/10",
  },
  {
    slug: "asisten-laboratorium-jaringan",
    category: "kerja",
    role: "Asisten Laboratorium Jaringan",
    place: "Information Technology Laboratory Group",
    period: "Sep 2023 - Des 2024",
    summary:
      "Membimbing praktikum jaringan dan mengelola administrasi laboratorium.",
    jobdesk: [
      "Membimbing 50+ mahasiswa di 3 mata kuliah jaringan dan mengajar lebih dari 6 jam setiap minggu.",
      "Menulis 7+ modul praktikum yang sesuai dengan kurikulum.",
      "Mengelola administrasi laboratorium: kehadiran, pengarsipan laporan, dan rekap nilai akhir.",
    ],
    document: { label: "SK Asisten Laboratorium", number: "", image: "" },
    cover: "",
    photos: [],
    tone: "from-brand-teal/20 to-brand-navy/10",
  },

  /* ---------- Pengalaman organisasi ---------- */
  {
    slug: "pema-fasilkom-ti-usu",
    category: "organisasi",
    role: "Anggota Bidang Agama (Sekretaris Divisi Agama Kristen)",
    place: "PEMA Fasilkom-TI USU",
    period: "Agu 2021 - Jun 2022",
    summary:
      "Menyusun proposal dan laporan pertanggungjawaban serta memimpin koordinasi program kerja divisi.",
    jobdesk: [
      "Menyusun proposal dan Laporan Pertanggungjawaban (LPJ) untuk 2 program kerja utama.",
      "Memimpin koordinasi pelaksanaan program kerja \"Ibadah Valentine\".",
    ],
    document: { label: "SK Kepengurusan", number: "", image: "" },
    cover: "",
    photos: [],
    tone: "from-brand-teal/20 to-brand-navy/10",
  },

  /* ---------- Pengalaman kepanitiaan ---------- */
  {
    slug: "steering-committee-pmb-2024",
    category: "kepanitiaan",
    role: "Steering Committee",
    place: "Panitia Penerimaan Mahasiswa Baru Teknologi Informasi 2024",
    period: "Apr - Sep 2024",
    summary:
      "Memantau progres kerja panitia terhadap jadwal dan standar kualitas.",
    jobdesk: [
      "Memantau progres kerja panitia terhadap jadwal dan standar kualitas, lalu memberi masukan untuk perbaikan.",
    ],
    document: { label: "SK Kepanitiaan", number: "", image: "" },
    cover: "",
    photos: [],
    tone: "from-brand-teal/20 to-brand-navy/10",
  },
  {
    slug: "bendahara-natal-2022",
    category: "kepanitiaan",
    role: "Bendahara",
    place: "Panitia Natal Teknologi Informasi 2022",
    period: "Okt - Des 2022",
    summary:
      "Mengelola anggaran lebih dari Rp30 juta dan mencatat seluruh transaksi kegiatan.",
    jobdesk: [
      "Menyusun dan mengelola anggaran lebih dari Rp30 juta untuk seluruh divisi.",
      "Merekonsiliasi 50+ catatan pemasukan dan pengeluaran, serta memeriksa bukti transaksi.",
    ],
    document: { label: "SK Kepanitiaan", number: "", image: "" },
    cover: "",
    photos: [],
    tone: "from-brand-teal/20 to-brand-navy/10",
  },
  {
    slug: "bendahara-pmb-2022",
    category: "kepanitiaan",
    role: "Bendahara",
    place: "Panitia Penerimaan Mahasiswa Baru Teknologi Informasi 2022",
    period: "Apr - Sep 2022",
    summary:
      "Mengelola arus kas dan dana kegiatan lebih dari Rp8 juta.",
    jobdesk: [
      "Mengelola arus kas dan dana lebih dari Rp8 juta, lengkap dengan laporan keuangan berkala.",
    ],
    document: { label: "SK Kepanitiaan", number: "", image: "" },
    cover: "",
    photos: [],
    tone: "from-brand-teal/20 to-brand-navy/10",
  },
];