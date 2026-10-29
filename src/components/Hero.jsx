/* Section Hero
File: src/components/Hero.jsx */

import heroImg from "../assets/hero.png";

// Samakan dengan CV_URL di Navbar.jsx
const CV_URL = "/cv.pdf";

const stats = [
  {
    value: "1+",
    label: "Tahun pengalaman",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  {
    value: "4",
    label: "Proyek dibuat",
    icon: (
      <>
        <rect x="4" y="4" width="7" height="7" rx="1.5" />
        <rect x="13" y="4" width="7" height="7" rx="1.5" />
        <rect x="4" y="13" width="7" height="7" rx="1.5" />
        <rect x="13" y="13" width="7" height="7" rx="1.5" />
      </>
    ),
  },
  {
    value: "3,77",
    label: "IPK",
    icon: (
      <>
        <path d="M3 9l9-5 9 5-9 5-9-5z" />
        <path d="M7 11.5V16c0 1.2 2.2 2.5 5 2.5s5-1.3 5-2.5v-4.5" />
      </>
    ),
  },
];

const floatingCards = [
  {
    title: "Pengembangan Web",
    items: "JavaScript, React, Laravel, Google Apps Script",
    position: "right-0 top-6",
  },
  {
    title: "Administrasi Data",
    items: "Excel, Google Sheets, MySQL, Visualisasi data",
    position: "right-0 bottom-20",
  },
];

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-[linear-gradient(to_bottom,white_0%,#ece7ff_60%)] pb-28 pt-16 lg:pb-36"
    >
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pt-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Teks */}
        <div className="order-2 lg:order-1">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-deep/30 px-4 py-1.5 text-sm font-medium text-brand-deep">
            <span
              aria-hidden="true"
              className="size-2 rounded-full bg-emerald-500"
            />
            Terbuka untuk lowongan
          </p>

          <h1
            id="hero-title"
            className="mt-6 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl"
          >
            Pretty Ohara Hutasoit
          </h1>

          <p className="mt-4 font-display text-2xl font-medium leading-snug text-ink/70 sm:text-3xl">
            Web Developer
            <br />
            <span className="text-brand-deep">&amp; Data Administrator</span>
          </p>

          <p className="mt-6 max-w-md text-base leading-relaxed text-ink/75">
            Membangun aplikasi web dan dashboard yang membuat data lebih mudah
            dipahami.
          </p>

          <p className="mt-3 text-sm font-medium text-ink/65">
            JavaScript, Google Apps Script, React, Laravel, MySQL
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-3 rounded-md bg-brand-deep px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-purple/30 transition hover:bg-brand-deep/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-deep"
            >
              Lihat proyek
              <svg
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>

            <a
              href={CV_URL}
              download
              className="inline-flex items-center gap-3 rounded-md border border-brand-deep/40 px-7 py-3.5 text-sm font-semibold text-brand-deep transition hover:bg-brand-purple/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-deep"
            >
              Unduh CV
              <svg
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
              </svg>
            </a>
          </div>

          {/* Statistik: 3 kolom di HP, sejajar dengan pemisah di layar sm ke atas */}
          <dl className="mt-12 grid grid-cols-3 gap-4 sm:flex sm:items-center sm:gap-0">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3 ${
                  i > 0 ? "sm:ml-6 sm:border-l sm:border-ink/10 sm:pl-6" : ""
                }`}
              >
                <svg
                  className="size-7 shrink-0 text-brand-deep"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {stat.icon}
                </svg>
                {/* dt (label) di markup dulu, tampil di bawah angka lewat flex-col-reverse */}
                <div className="flex flex-col-reverse">
                  <dt className="mt-1 text-xs font-medium text-ink/65">
                    {stat.label}
                  </dt>
                  <dd className="font-display text-lg font-bold leading-none">
                    {stat.value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        {/* Foto + kartu kaca */}
        <div className="relative order-1 mx-auto w-full max-w-sm lg:order-2 lg:max-w-lg lg:justify-self-end">
          <div
            aria-hidden="true"
            className="absolute inset-x-4 bottom-0 top-8 rounded-full bg-brand-purple/15 blur-3xl"
          />
          <img
            src={heroImg}
            alt="Foto profil Pretty Ohara Hutasoit"
            className="relative w-full [-webkit-mask-image:linear-gradient(to_bottom,black_78%,transparent)] [mask-image:linear-gradient(to_bottom,black_78%,transparent)]"
            width="1200"
            height="1200"
            fetchPriority="high"
            decoding="async"
          />
          {floatingCards.map((card) => (
            <div
              key={card.title}
              className={`absolute hidden w-52 rounded-2xl border border-white/70 bg-white/60 p-4 shadow-xl shadow-brand-purple/10 backdrop-blur-md lg:block ${card.position}`}
            >
              <p className="text-xs font-bold text-ink">{card.title}</p>
              <p className="mt-1 text-[0.7rem] leading-relaxed text-ink/70">
                {card.items}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}