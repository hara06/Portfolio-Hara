/* Section Skills
File: src/components/Skills.jsx */

const competencies = [
  {
    title: "Administration & Backoffice",
    items: [
      "Data entry",
      "Verifikasi data",
      "Dokumentasi",
      "Pengarsipan",
      "Rekapitulasi",
      "Laporan operasional",
    ],
    icon: (
      <>
        <rect x="5" y="3.5" width="14" height="17" rx="2" />
        <path d="M9 9h6M9 13h6M9 17h3" />
      </>
    ),
  },
  {
    title: "Web Development",
    items: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Responsive web design",
      "Integrasi API",
    ],
    icon: <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />,
  },
  {
    title: "Data Analytics",
    items: [
      "Data cleaning",
      "Analisis eksploratif",
      "Excel",
      "SQL atau Python",
      "Visualisasi data",
    ],
    icon: <path d="M3 20h18M6 20v-6M12 20V6M18 20v-9" />,
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="scroll-mt-16 bg-brand-teal-soft/40 px-5 pb-6 pt-12 lg:pt-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-sm shadow-brand-navy/5 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.6fr)]">
          {/* Intro */}
          <div className="border-b border-ink/10 p-6 lg:border-b-0 lg:border-r lg:p-8">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-teal-dark">
              <span aria-hidden="true" className="h-px w-5 bg-brand-teal" />
              What I do
            </p>
            <h2
              id="skills-title"
              className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-3xl"
            >
              Core <span className="text-brand-teal">Competencies</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/75">
              Tiga bidang yang saya terapkan dalam pengalaman kerja dan project.
            </p>
          </div>

          {/* Tiga kompetensi, dipisah garis vertikal */}
          <ul className="grid divide-y divide-ink/10 md:grid-cols-3 md:divide-x md:divide-y-0">
            {competencies.map((c) => (
              <li
                key={c.title}
                className="group flex flex-col items-center p-6 text-center transition hover:bg-brand-teal-soft/40"
              >
                <span
                  aria-hidden="true"
                  className="grid size-12 place-items-center rounded-2xl bg-brand-teal-soft text-brand-teal-dark transition group-hover:bg-brand-teal group-hover:text-white"
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
                    {c.icon}
                  </svg>
                </span>

                <h3 className="mt-3 text-sm font-bold leading-snug text-brand-navy">
                  {c.title}
                </h3>

                <ul className="mt-3 flex flex-wrap justify-center gap-1.5">
                  {c.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-brand-teal-soft px-2.5 py-1 text-[11px] font-medium text-brand-teal-dark group-hover:bg-white"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}