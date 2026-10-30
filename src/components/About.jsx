/* Section About
File: src/components/About.jsx */

const infoCards = [
  {
    label: "Pendidikan",
    title: "Sarjana Teknologi Informasi",
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
    title: "3,77/4,00",
    detail: "Lulusan dengan capaian akademik sangat baik",
    icon: (
      <>
        <circle cx="12" cy="9" r="5" />
        <path d="M9 13.5L8 21l4-2 4 2-1-7.5" />
      </>
    ),
  },
  {
    label: "Pengalaman",
    title: "Asisten Staf SKKI (Magang)",
    detail: "Kanwil DJPb Provinsi Sumatera Utara",
    icon: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M9 7V5a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0115 5v2M3 13h18" />
      </>
    ),
  },
];

const interests = ["Administration", "Web", "Data"];

function CardIcon({ children }) {
  return (
    <span
      aria-hidden="true"
      className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand-teal-soft text-brand-teal-dark"
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
        {children}
      </svg>
    </span>
  );
}

const cardClass =
  "flex items-start gap-3 rounded-xl border border-ink/10 bg-white p-4";

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative z-10 -mt-10 scroll-mt-16 rounded-t-[2.5rem] bg-white px-5 pb-12 pt-12 shadow-[0_-24px_40px_-24px_rgba(15,23,42,0.12)] lg:-mt-16 lg:rounded-t-[4rem] lg:pb-16 lg:pt-16"
    >
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)] lg:gap-14">
        {/* Kiri: judul */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-teal-dark">
            <span aria-hidden="true" className="h-px w-5 bg-brand-teal" />
            Get to know me
          </p>

          <h2
            id="about-title"
            className="mt-3 text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl lg:text-4xl"
          >
            Tentang <span className="text-brand-teal">Saya</span>
          </h2>
        </div>

        {/* Kanan: deskripsi + info singkat */}
        <div>
          <div className="max-w-2xl space-y-3 text-sm leading-relaxed text-ink/75 sm:text-base">
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

          {/* Informasi singkat */}
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {infoCards.map((card) => (
              <li key={card.label} className={cardClass}>
                <CardIcon>{card.icon}</CardIcon>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-ink/60">
                    {card.label}
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-brand-navy">
                    {card.title}
                  </p>
                  <p className="mt-0.5 text-xs text-ink/70">{card.detail}</p>
                </div>
              </li>
            ))}

            <li className={cardClass}>
              <CardIcon>
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="4" />
                <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
              </CardIcon>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-ink/60">
                  Bidang minat
                </p>
                <ul className="mt-1.5 flex flex-wrap gap-1.5">
                  {interests.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-brand-teal-soft px-3 py-1 text-xs font-semibold text-brand-teal-dark"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}