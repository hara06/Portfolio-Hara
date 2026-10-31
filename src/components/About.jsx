/* Section About
File: src/components/About.jsx */

const infoCards = [
  {
    label: "Pendidikan",
    value: "Sarjana Teknologi Informasi",
    detail: "Universitas Sumatera Utara",
    icon: (
      <>
        <path d="M3 9l9-5 9 5-9 5-9-5z" />
        <path d="M7 11.5V16c0 1.2 2.2 2.5 5 2.5s5-1.3 5-2.5v-4.5" />
      </>
    ),
  },
  {
    label: "IPK",
    value: "3,77/4,00",
    detail: "Capaian akademik sangat baik",
    icon: (
      <>
        <circle cx="12" cy="9" r="5" />
        <path d="M9 13.5L8 21l4-2 4 2-1-7.5" />
      </>
    ),
  },
  {
    label: "Pengalaman",
    value: "Asisten Staf SKKI",
    detail: "Kanwil DJPb Sumatera Utara",
    icon: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M9 7V5a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0115 5v2M3 13h18" />
      </>
    ),
  },
  {
    label: "Bidang minat",
    value: "Admin, Web, Data",
    detail: "Administrasi, web, dan analisis data",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      </>
    ),
  },
];

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative z-10 -mt-10 scroll-mt-16 rounded-t-[2.5rem] bg-white px-5 pb-12 pt-12 shadow-[0_-24px_40px_-24px_rgba(15,23,42,0.12)] lg:-mt-16 lg:rounded-t-[4rem] lg:pb-16 lg:pt-16"
    >
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-stretch lg:gap-12">
        {/* Kiri: judul + ringkasan */}
        <div className="flex flex-col justify-center">
          <p className="inline-block self-start rounded-md bg-brand-teal-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-teal-dark">
            Get to know me
          </p>

          <h2
            id="about-title"
            className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-3xl lg:text-4xl"
          >
            Tentang <span className="text-brand-teal">Saya</span>
          </h2>

          <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink/75 sm:text-base">
            <p>
              Saya tertarik pada pemanfaatan teknologi untuk meningkatkan
              efisiensi kerja, baik melalui pengelolaan administrasi yang
              terstruktur, pengembangan aplikasi web, maupun analisis data untuk
              menghasilkan informasi yang bermanfaat.
            </p>
            <p>
              Melalui pengalaman dan project yang saya kembangkan, saya terus
              meningkatkan kemampuan dalam mengelola informasi secara akurat,
              membangun solusi digital, dan menyajikan data secara sistematis.
            </p>
          </div>
        </div>

        {/* Kanan: 4 kartu info, mengisi tinggi kolom */}
        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 sm:grid-rows-2">
          {infoCards.map((card) => (
            <li key={card.label} className="flex flex-col bg-white p-5">
              <span
                aria-hidden="true"
                className="grid size-10 place-items-center rounded-xl bg-brand-teal-soft text-brand-teal-dark"
              >
                <svg
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  {card.icon}
                </svg>
              </span>

              <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-ink/60">
                {card.label}
              </p>
              <p className="mt-1 text-base font-extrabold leading-snug text-brand-navy sm:text-lg">
                {card.value}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-ink/70">
                {card.detail}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}