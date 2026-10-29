/* Section Experience
File: src/components/Experience.jsx */

import { Link } from "react-router-dom";
import { experiences, categories } from "../data/experiences";

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="bg-[#f8f6ff] py-12 lg:py-14"
    >
      <div className="mx-auto max-w-6xl px-5">
        <h2
          id="experience-title"
          className="font-display text-3xl font-bold sm:text-4xl"
        >
          Pengalaman
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/70">
          Pengalaman kerja, organisasi, dan kepanitiaan. Buka salah satu
          kegiatan untuk melihat tugas dan dokumentasinya.
        </p>

        <div className="mt-10 space-y-12">
          {categories.map((cat) => {
            const items = experiences.filter((e) => e.category === cat.id);
            if (items.length === 0) return null;

            return (
              <div key={cat.id}>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="flex items-center gap-2.5 font-display text-xl font-bold">
                    <span
                      aria-hidden="true"
                      className={`size-2.5 rounded-full ${cat.dot}`}
                    />
                    {cat.title}
                  </h3>
                  <p className="text-sm text-ink/65">{cat.note}</p>
                </div>

                <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((exp) => {
                    const cover = exp.cover || exp.photos?.[0]?.src;
                    const count = exp.photos?.length ?? 0;

                    return (
                      <li
                        key={exp.slug}
                        className="group relative flex flex-col overflow-hidden rounded-2xl border border-brand-purple/10 bg-white transition hover:border-brand-purple/40 hover:shadow-lg hover:shadow-brand-purple/10"
                      >
                        <div className="relative">
                          {cover ? (
                            <img
                              src={cover}
                              alt=""
                              className="h-36 w-full object-cover"
                              loading="lazy"
                              decoding="async"
                            />
                          ) : (
                            <div
                              className={`h-36 bg-gradient-to-br ${exp.tone}`}
                              aria-hidden="true"
                            />
                          )}
                          {count > 0 && (
                            <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-ink/80">
                              {count} foto
                            </span>
                          )}
                        </div>

                        <div className="flex flex-1 flex-col p-5">
                          <p className="text-xs font-semibold text-brand-deep">
                            {exp.period}
                          </p>
                          <h4 className="mt-1 font-display text-lg font-bold leading-snug">
                            {/* Link meregang ke seluruh kartu */}
                            <Link
                              to={`/experience/${exp.slug}`}
                              className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-brand-deep"
                            >
                              {exp.role}
                            </Link>
                          </h4>
                          <p className="mt-1 text-sm font-medium text-brand-blue">
                            {exp.place}
                          </p>
                          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink/70">
                            {exp.summary}
                          </p>
                          <span className="mt-auto pt-4 text-sm font-semibold text-brand-deep group-hover:underline">
                            Lihat detail <span aria-hidden="true">→</span>
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}