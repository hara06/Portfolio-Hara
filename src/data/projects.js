/* Data Projects
File: src/data/projects.js
Field yang kosong ([] atau "") otomatis disembunyikan di halaman.
Isi bagian TODO dengan fakta dan angka asli, jangan ditebak. */

export const projects = [
  {
    slug: "ikpad-dashboard",
    title: "Dashboard Pemantauan IKPAD",
    role: "Web Developer",
    period: "Jun – Agu 2026",
    org: "Kanwil DJPb Sumatera Utara",
    summary:
      "Dashboard web untuk memantau IKPAD (Indeks Kinerja Pelaksanaan Daerah), mulai dari pengumpulan data, penilaian, sampai tindak lanjut.",

    // TODO: sesuaikan dengan kondisi sebenarnya sebelum sistem ini dibangun
    problem:
      "Pengumpulan data, penilaian, dan tindak lanjut IKPAD berjalan dalam beberapa tahap yang terpisah, sehingga perkembangan prosesnya sulit dipantau.",

    solution:
      "Satu alur kerja berbasis web yang menangani pengumpulan data, validasi, perhitungan otomatis, dan publikasi. Google Sheets dan Drive dipakai sebagai basis data terpusat.",

    contributions: [
      "Memetakan proses bisnis sebelum membangun sistem, lalu merancang arsitektur dan alur kerja dashboard",
      "Membangun pengelolaan dan validasi data",
      "Membuat perhitungan otomatis untuk penilaian",
      "Mengembangkan visualisasi interaktif untuk memantau pengumpulan data, penilaian, dan tindak lanjut",
      "Merancang antarmuka terpisah untuk pengguna dan admin",
    ],

    // TODO: tulis keputusan teknis aslimu (kenapa pilih X, bukan Y)
    decisions: [
      "Memakai Google Sheets dan Drive sebagai basis data agar staf non-teknis dapat mengelola data dan sistem tidak memerlukan server.",
    ],

    tech: [
      "Google Apps Script",
      "JavaScript",
      "Google Sheets",
      "Google Drive",
      "Bootstrap",
    ],

    // TODO: isi angka dampak, misalnya waktu rekap sebelum dan sesudah
    impact: [],

    links: {}, // contoh: { demo: "https://...", repo: "https://github.com/..." }
    image: "", // contoh: "/projects/ikpad.png" (taruh di public/projects/, gunakan data dummy)
    tags: ["Web Development", "Data"],
    tone: "from-brand-blue/20 to-brand-purple/20",
  },

  {
    slug: "risk-monitoring-dashboard",
    title: "Dashboard Pemantauan Risiko",
    role: "Asisten Staf SKKI (Magang)",
    period: "Jan – Mar 2026",
    org: "Kanwil DJPb Sumatera Utara",
    summary:
      "Dashboard web untuk memantau risiko internal secara real-time, sehingga pengawasan lebih cepat dan berbasis data.",

    problem:
      "Pengawasan risiko internal membutuhkan otomatisasi dan satu sumber data bersama sebagai pengganti pencatatan yang tersebar.",

    solution:
      "Dashboard monitoring full-stack dengan basis data terintegrasi di Google Workspace, sehingga data risiko selalu sinkron dan bisa dipantau secara real-time.",

    contributions: [
      "Merancang dan membangun dashboard monitoring full-stack",
      "Membangun basis data terintegrasi dengan Google Workspace API untuk sinkronisasi data secara terpusat",
      "Mengembangkan modul visualisasi interaktif untuk mengidentifikasi, menganalisis, dan memantau profil risiko",
    ],

    decisions: [],

    tech: ["JavaScript", "Google Apps Script", "Google Workspace API"],

    impact: [],

    links: {},
    image: "",
    tags: ["Web Development", "Data"],
    tone: "from-brand-purple/20 to-brand-pink/15",
  },

  {
    slug: "sistem-pencarian-peternakan",
    title: "Sistem Pencarian & Detail Peternakan",
    role: "Full-Stack Developer",
    period: "Apr – Jun 2023",
    org: "Universitas Sumatera Utara",
    summary:
      "Aplikasi web untuk mencari dan melihat detail data peternakan, dibuat sebagai proyek mata kuliah Pemrograman Integratif.",

    problem: "",
    solution: "",

    contributions: [
      "Mengembangkan API untuk pencarian dan detail data peternakan",
      "Membangun frontend dengan React dan backend dengan Laravel",
      "Mengimplementasikan dan mengelola basis data MySQL",
    ],

    decisions: [],

    tech: ["React", "Laravel", "MySQL", "API"],

    impact: [],

    links: {},
    image: "",
    tags: ["Web Development"],
    tone: "from-brand-blue/20 to-brand-orange/15",
  },

  {
    slug: "toba-game",
    title: "TOBA: Awal Sebuah Legenda",
    role: "Developer (Tugas Akhir)",
    period: "Jun 2024 – Jan 2025",
    org: "Universitas Sumatera Utara",
    summary:
      "Game Android 2D bertema edukasi yang dikembangkan sebagai tugas akhir studi sarjana.",

    problem: "",
    solution: "",

    contributions: [
      "Mengembangkan game 2D dengan Unity dan C#",
      "Memanfaatkan AI untuk membuat aset grafis",
      "Membuat video animasi pendukung dengan Canva untuk menambah nilai edukasi",
    ],

    decisions: [],

    tech: ["Unity 2D", "C#", "Canva"],

    impact: [],

    links: {},
    image: "",
    tags: ["Game Development"],
    tone: "from-brand-orange/20 to-brand-pink/15",
  },
];

export const dotColor = {
  "Web Development": "bg-brand-blue",
  Data: "bg-brand-orange",
  "Game Development": "bg-brand-purple",
};