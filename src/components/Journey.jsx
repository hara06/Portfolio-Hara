/* Section Journey: pengalaman per kategori + sertifikat
File: src/components/Journey.jsx */

import { Link } from "react-router-dom";
import { experiences, categories } from "../data/experiences";
import CertificateList from "./CertificateList";

// Gaya per kategori: ikon dan warna titik pada timeline
const categoryStyle = {
  kerja: {
    dot: "bg-brand-navy",
    icon: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18" />
      </>
    ),
  },
  organisasi: {
    dot: "bg-brand-teal",
    icon: (
      <>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6M16 4.8a3.5 3.5 0 010 6.4M18 14.4c2 .8 3.5 2.6 3.5 5.6" />
      </>
    ),
  },
  kepanitiaan: {
    dot: "bg-brand-teal-dark",
    icon: (
      <>
        <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
        <path d="M3.5 10h17M8 3v4M16 3v4" />
      </>
    ),
  },
};

const fallbackStyle = categoryStyle.kerja;

// Ambil satu kategori beserta isinya
function getGroup(id) {
  const cat = categories.find((c) => c.id === id);
  return { ...cat, items: experiences.filter((e) => e.category === id) };
}

const kerja = getGroup("kerja");
const organisasi = getGroup("organisasi");
const kepanitiaan = getGroup("kepanitiaan");

function Timeline({ items }) {
  return (
    <ol className="mt-4 space-y-3">
      {items.map((exp, i) => {
        const style = categoryStyle[exp.category] ?? fallbackStyle;
        const isFirst = i === 0;
        const isLast = i === items.length - 1;

        return (
          <li key={exp.slug} className="relative pl-9">
            {/* Garis penghubung antar node; tidak muncul kalau hanya satu item */}
            {items.length > 1 && (
              <span
                aria-hidden="true"
                className={`absolute left-[11px] w-0.5 bg-brand-navy/15 ${
                  isFirst ? "top-1/2" : "-top-3"
                } ${isLast ? "bottom-1/2" : "bottom-0"}`}
              />
            )}

            {/* Node timeline */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-1/2 z-10 grid size-6 -translate-y-1/2 place-items-center rounded-full border-2 border-brand-navy/30 bg-white"
            >
              <span className={`size-2.5 rounded-full ${style.dot}`} />
            </span>

            <Link
              to={`/experience/${exp.slug}`}
              className="group flex items-center gap-3 rounded-2xl bg-brand-teal-soft/50 p-3 transition hover:bg-brand-teal-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal sm:gap-4 sm:p-3.5"
            >
              <span
                aria-hidden="true"
                className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-brand-teal-dark shadow-sm shadow-brand-navy/5 sm:size-12"
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
                  {style.icon}
                </svg>
              </span>

              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold leading-snug text-brand-navy">
                  {exp.role}
                </h4>
                <p className="mt-0.5 text-xs text-ink/70">{exp.place}</p>
                <p className="mt-1 text-xs font-semibold text-brand-teal-dark">
                  {exp.period}
                </p>
              </div>

              <span
                aria-hidden="true"
                className="grid size-7 shrink-0 place-items-center rounded-full bg-white text-xs text-brand-teal-dark transition group-hover:bg-brand-navy group-hover:text-white"
              >
                →
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

// Kartu per kategori; h-full supaya tingginya mengikuti kartu di sebelahnya
function ExperienceCard({ group, titleId }) {
  if (group.items.length === 0) return null;

  return (
    <section
      aria-labelledby={titleId}
      className="flex h-full flex-col rounded-3xl border border-ink/10 bg-white p-5 shadow-sm shadow-brand-navy/5 lg:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <h3
          id={titleId}
          className="text-base font-extrabold text-brand-navy sm:text-lg"
        >
          {group.title}
        </h3>
        <span className="rounded-full bg-brand-teal-soft px-2.5 py-0.5 text-xs font-semibold text-brand-teal-dark">
          {group.items.length}
        </span>
      </div>
      <div className="flex flex-1 flex-col">
        <Timeline items={group.items} />
      </div>
    </section>
  );
}

export default function Journey() {
  return (
    <section
      id="journey"
      aria-labelledby="journey-title"
      className="scroll-mt-16 bg-white px-5 py-12 lg:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-teal-dark">
              My journey
            </p>
            <h2
              id="journey-title"
              className="mt-1.5 text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl"
            >
              Perjalanan <span className="text-brand-teal">Saya</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ink/75 lg:text-right">
            Pengalaman kerja, organisasi, dan sertifikasi yang menjadi bukti di
            balik keahlian saya.
          </p>
        </div>

              {/* Dua kolom; kartu terakhir di tiap kolom meregang supaya tepi bawah sejajar */}
        <div className="mt-6 grid gap-5 lg:grid-cols-[1.25fr_1fr]">
          <div className="flex flex-col gap-5">
            <ExperienceCard group={kerja} titleId="journey-kerja" />
            <div className="flex-1">
              <ExperienceCard
                group={kepanitiaan}
                titleId="journey-kepanitiaan"
              />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <ExperienceCard group={organisasi} titleId="journey-organisasi" />

            <div className="flex flex-1 flex-col rounded-3xl bg-brand-navy p-5 text-white shadow-md shadow-brand-navy/20 lg:p-6">
              <h3 className="text-lg font-extrabold sm:text-xl">
                Kompetensi &amp; Pelatihan
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-white/65">
                Web, jaringan, dan administrasi sistem. Klik untuk melihat
                sertifikatnya.
              </p>
              <div className="mt-3">
                <CertificateList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}