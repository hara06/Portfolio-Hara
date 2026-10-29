/* Page CaseStudy
File: src/pages/CaseStudy.jsx */

import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { projects, dotColor } from "../data/projects";

function Block({ title, children }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-xl font-bold">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function BulletList({ items }) {
  return (
    <ul className="space-y-2 leading-relaxed text-ink/75">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            aria-hidden="true"
            className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand-purple"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];

  // Halaman selalu dibuka dari atas, termasuk saat pindah ke proyek berikutnya
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (!project) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-32 text-center">
        <h1 className="font-display text-3xl font-bold">
          Proyek tidak ditemukan
        </h1>
        <Link
          to="/#projects"
          className="mt-6 inline-block font-semibold text-brand-deep hover:underline"
        >
          ← Kembali ke proyek
        </Link>
      </section>
    );
  }

  const next = projects[(index + 1) % projects.length];
  const { links = {} } = project;

  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 pt-28">
      <Link
        to="/#projects"
        className="text-sm font-semibold text-brand-deep hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-deep"
      >
        ← Kembali ke proyek
      </Link>

      {project.image ? (
        <img
          src={project.image}
          alt={`Tampilan ${project.title}`}
          className="mt-6 w-full rounded-3xl border border-brand-purple/10"
        />
      ) : (
        <div
          className={`mt-6 h-48 rounded-3xl bg-gradient-to-br ${project.tone}`}
          aria-hidden="true"
        />
      )}

      <h1 className="mt-8 font-display text-3xl font-bold leading-tight sm:text-4xl">
        {project.title}
      </h1>

      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
        {project.tags.map((tag) => (
          <li key={tag} className="flex items-center gap-1.5 text-xs text-ink/70">
            <span
              className={`size-2 rounded-full ${dotColor[tag]}`}
              aria-hidden="true"
            />
            {tag}
          </li>
        ))}
      </ul>

      {/* Ringkasan singkat */}
      <dl className="mt-6 grid gap-4 rounded-2xl bg-brand-purple/5 p-5 sm:grid-cols-3">
        <div>
          <dt className="text-xs font-medium text-ink/65">Peran</dt>
          <dd className="mt-1 text-sm font-semibold">{project.role}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-ink/65">Periode</dt>
          <dd className="mt-1 text-sm font-semibold">{project.period}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-ink/65">Instansi</dt>
          <dd className="mt-1 text-sm font-semibold">{project.org}</dd>
        </div>
      </dl>

      {(links.demo || links.repo) && (
        <div className="mt-6 flex flex-wrap gap-3">
          {links.demo && (
            <a
              href={links.demo}
              target="_blank"
              rel="noreferrer"
              className="rounded-md bg-brand-deep px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-deep/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-deep"
            >
              Lihat demo
            </a>
          )}
          {links.repo && (
            <a
              href={links.repo}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-brand-deep/40 px-5 py-2.5 text-sm font-semibold text-brand-deep transition hover:bg-brand-purple/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-deep"
            >
              Kode sumber
            </a>
          )}
        </div>
      )}

      <Block title="Gambaran Umum">
        <p className="leading-relaxed text-ink/75">{project.summary}</p>
      </Block>

      {project.problem && (
        <Block title="Permasalahan">
          <p className="leading-relaxed text-ink/75">{project.problem}</p>
        </Block>
      )}

      {project.solution && (
        <Block title="Solusi">
          <p className="leading-relaxed text-ink/75">{project.solution}</p>
        </Block>
      )}

      {project.contributions.length > 0 && (
        <Block title="Yang Saya Kerjakan">
          <BulletList items={project.contributions} />
        </Block>
      )}

      {project.decisions.length > 0 && (
        <Block title="Keputusan Utama">
          <BulletList items={project.decisions} />
        </Block>
      )}

      {project.impact.length > 0 && (
        <Block title="Hasil">
          <BulletList items={project.impact} />
        </Block>
      )}

      {project.tech.length > 0 && (
        <Block title="Teknologi yang Digunakan">
          <ul className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <li
                key={t}
                className="rounded-full bg-brand-purple/10 px-3 py-1 text-xs font-medium text-ink/70"
              >
                {t}
              </li>
            ))}
          </ul>
        </Block>
      )}

      {next.slug !== project.slug && (
        <div className="mt-14 border-t border-brand-purple/15 pt-6">
          <p className="text-sm text-ink/65">Proyek berikutnya</p>
          <Link
            to={`/projects/${next.slug}`}
            className="mt-1 inline-block font-display text-lg font-bold text-brand-deep hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-deep"
          >
            {next.title} <span aria-hidden="true">→</span>
          </Link>
        </div>
      )}
    </article>
  );
}