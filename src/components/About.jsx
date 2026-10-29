/* Section About
File: src/components/About.jsx */

const pillars = [
  {
    title: "Pengembangan Web",
    text: "Membangun aplikasi dan dashboard web, dari antarmuka sampai basis data.",
    tile: "bg-brand-blue/10 text-brand-blue",
    icon: <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />,
  },
  {
    title: "Data",
    text: "Mengolah, memvalidasi, dan memvisualisasikan data agar mudah dipahami.",
    tile: "bg-brand-orange/15 text-brand-orange",
    icon: <path d="M3 20h18M6 20v-6M12 20V6M18 20v-9" />,
  },
  {
    title: "Administrasi",
    text: "Menjaga laporan, dokumentasi, dan pencatatan tetap akurat dan rapi.",
    tile: "bg-brand-pink/10 text-brand-pink",
    icon: (
      <>
        <rect x="5" y="3.5" width="14" height="17" rx="2" />
        <path d="M9 9h6M9 13h6M9 17h3" />
      </>
    ),
  },
];

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative z-10 -mt-16 bg-[linear-gradient(to_bottom,#ece7ff,white_45%)] px-5 pb-12 lg:-mt-24 lg:pb-14"
    >
      <div className="mx-auto max-w-6xl rounded-3xl border border-brand-purple/10 bg-white p-6 shadow-xl shadow-brand-purple/10 sm:p-10 lg:p-14">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* Kiri: cerita singkat */}
          <div>
            <h2
              id="about-title"
              className="font-display text-3xl font-bold sm:text-4xl"
            >
              Tentang saya
            </h2>

            <p className="mt-5 max-w-md font-display text-xl font-medium leading-snug text-ink">
              Mengubah data menjadi informasi yang bisa langsung dipakai.
            </p>

            <p className="mt-5 max-w-md leading-relaxed text-ink/75">
              Saya lulusan Teknologi Informasi Universitas Sumatera Utara yang
              senang membangun aplikasi dan dashboard web. Di Kanwil DJPb
              Sumatera Utara, saya membuat dua dashboard monitoring dan
              merapikan format laporan pengawasan.
            </p>

            <p className="mt-3 max-w-md leading-relaxed text-ink/75">
              Saya selalu memahami alur kerja terlebih dahulu sebelum mulai
              menulis kode.
            </p>

            <a
              href="#experience"
              className="mt-6 inline-block text-sm font-semibold text-brand-deep hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-deep"
            >
              Lihat pengalaman saya <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Kanan: tiga bidang */}
          <ul className="space-y-4">
            {pillars.map((p) => (
              <li
                key={p.title}
                className="flex items-start gap-4 rounded-2xl bg-brand-purple/5 p-5"
              >
                <span
                  aria-hidden="true"
                  className={`grid size-12 shrink-0 place-items-center rounded-xl ${p.tile}`}
                >
                  <svg
                    className="size-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    {p.icon}
                  </svg>
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink/70">
                    {p.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}