/* Kartu project (dipakai di Featured Projects dan halaman /projects)
File: src/components/ProjectCard.jsx */

import { Link } from "react-router-dom";

// index (opsional): kalau diisi, badge nomor ditampilkan di pojok gambar
export default function ProjectCard({ project, index }) {
  const badge =
    index != null ? (
      <span
        aria-hidden="true"
        className="absolute left-3 top-3 grid size-8 place-items-center rounded-full bg-brand-navy text-xs font-bold text-white shadow-md shadow-brand-navy/20"
      >
        {String(index).padStart(2, "0")}
      </span>
    ) : null;

  return (
    <li className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm shadow-brand-navy/5 transition hover:-translate-y-0.5 hover:border-brand-teal hover:shadow-md hover:shadow-brand-navy/10">
      <div className="relative">
        {project.image ? (
          <img
            src={project.image}
            alt=""
            className={`aspect-[20/9] w-full object-cover ${
              project.imagePosition ?? "object-top"
            }`}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div
            className={`h-36 bg-gradient-to-br sm:h-40 ${project.tone}`}
            aria-hidden="true"
          />
        )}
        {badge}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold leading-snug text-brand-navy">
            {/* Link meregang ke seluruh kartu */}
            <Link
              to={`/projects/${project.slug}`}
              className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
            >
              {project.title}
            </Link>
          </h3>
          {project.tags[0] && (
            <span className="shrink-0 rounded-full bg-brand-teal-soft px-2.5 py-1 text-[11px] font-semibold text-brand-teal-dark">
              {project.tags[0]}
            </span>
          )}
        </div>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/75">
          {project.summary}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <p className="text-xs text-ink/65">{project.period}</p>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-teal-dark">
            Lihat detail
            <span
              aria-hidden="true"
              className="grid size-8 place-items-center rounded-full border border-brand-teal/40 text-brand-teal-dark transition group-hover:border-brand-navy group-hover:bg-brand-navy group-hover:text-white"
            >
              →
            </span>
          </span>
        </div>
      </div>
    </li>
  );
}