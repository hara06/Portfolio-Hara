/* Section Projects
File: src/components/Projects.jsx */

import { useState } from "react";
import { Link } from "react-router-dom";
import { projects, dotColor } from "../data/projects";

// Filter dibuat otomatis dari tag yang benar-benar dipakai proyek
const tags = Object.keys(dotColor).filter((tag) =>
  projects.some((p) => p.tags.includes(tag)),
);

const countOf = (tag) =>
  tag === "All"
    ? projects.length
    : projects.filter((p) => p.tags.includes(tag)).length;

export default function Projects() {
  const [active, setActive] = useState("All");

  const visible = projects.filter(
    (p) => active === "All" || p.tags.includes(active),
  );

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="bg-white py-12 lg:py-14"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2
              id="projects-title"
              className="font-display text-3xl font-bold sm:text-4xl"
            >
              Proyek
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/70">
              Sistem yang saya rancang dan bangun, mulai dari memahami masalah
              sampai menjadi produk yang bisa dipakai. Buka salah satu proyek
              untuk membaca studi kasusnya.
            </p>
          </div>

          {/* Filter */}
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter proyek berdasarkan kategori"
          >
            {["All", ...tags].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActive(tag)}
                aria-pressed={active === tag}
                className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-deep ${
                  active === tag
                    ? "border-brand-deep bg-brand-deep text-white"
                    : "border-brand-deep/30 text-brand-deep hover:bg-brand-purple/10"
                }`}
              >
                {tag === "All" ? "Semua" : tag}
                <span
                  className={`ml-1.5 font-medium ${
                    active === tag ? "text-white/80" : "text-brand-deep/70"
                  }`}
                >
                  {countOf(tag)}
                </span>
              </button>
            ))}
          </div>
        </div>

        <p className="sr-only" role="status">
          Menampilkan {visible.length} proyek
        </p>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <li
              key={project.slug}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-brand-purple/10 bg-white transition hover:border-brand-purple/40 hover:shadow-lg hover:shadow-brand-purple/10"
            >
              {project.image ? (
                <img
                  src={project.image}
                  alt=""
                  className="h-40 w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div
                  className={`h-40 bg-gradient-to-br ${project.tone}`}
                  aria-hidden="true"
                />
              )}

              <div className="flex flex-1 flex-col p-5">
                <ul className="flex flex-wrap gap-x-3 gap-y-1">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="flex items-center gap-1.5 text-xs text-ink/70"
                    >
                      <span
                        className={`size-2 rounded-full ${dotColor[tag]}`}
                        aria-hidden="true"
                      />
                      {tag}
                    </li>
                  ))}
                </ul>

                <h3 className="mt-3 font-display text-lg font-bold leading-snug">
                  {/* Link meregang ke seluruh kartu */}
                  <Link
                    to={`/projects/${project.slug}`}
                    className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-brand-deep"
                  >
                    {project.title}
                  </Link>
                </h3>
                <p className="mt-1 text-xs text-ink/65">
                  {project.period} · {project.org}
                </p>

                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink/70">
                  {project.summary}
                </p>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.tech.slice(0, 4).map((t) => (
                    <li
                      key={t}
                      className="rounded-full bg-brand-purple/10 px-3 py-1 text-xs font-medium text-ink/70"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <span className="mt-auto pt-5 text-sm font-semibold text-brand-deep group-hover:underline">
                  Baca studi kasus <span aria-hidden="true">→</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}