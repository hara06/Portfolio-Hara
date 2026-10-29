/* Page ExperienceDetail
File: src/pages/ExperienceDetail.jsx
Route: /experience/:slug */

import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { experiences, categories } from "../data/experiences";

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

// Tampilkan gambar; kalau gagal dimuat, tampilkan placeholder
function Photo({ src, alt, className }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`grid place-items-center bg-brand-purple/10 p-4 text-center text-xs font-medium text-ink/65 ${className}`}
      >
        Foto belum tersedia
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

// Galeri: kumpulan thumbnail, klik untuk memperbesar (dialog dengan navigasi)
function Gallery({ photos, label, columns = "grid-cols-2 sm:grid-cols-3" }) {
  const dialogRef = useRef(null);
  const [index, setIndex] = useState(null);

  const photo = index === null ? null : photos[index];

  function open(i) {
    setIndex(i);
    dialogRef.current?.showModal();
  }

  function close() {
    dialogRef.current?.close();
  }

  function go(step) {
    setIndex((i) => (i + step + photos.length) % photos.length);
  }

  return (
    <>
      <ul className={`grid gap-3 ${columns}`}>
        {photos.map((p, i) => (
          <li key={p.src}>
            <button
              type="button"
              onClick={() => open(i)}
              aria-haspopup="dialog"
              className="block w-full overflow-hidden rounded-xl border border-brand-purple/10 transition hover:border-brand-purple/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-deep"
            >
              <Photo
                src={p.src}
                alt={p.caption || `Dokumentasi ${label} ${i + 1}`}
                className="aspect-[4/3] w-full object-cover"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setIndex(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        onKeyDown={(e) => {
          if (photos.length < 2) return;
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
        aria-label={`Foto ${label}`}
        className="m-auto w-[92vw] max-w-4xl rounded-2xl bg-white p-0 backdrop:bg-ink/70"
      >
        {photo && (
          <div className="relative p-4 sm:p-6">
            <button
              type="button"
              onClick={close}
              aria-label="Tutup"
              className="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-full bg-white/90 text-ink shadow hover:bg-brand-purple/10 focus-visible:outline-2 focus-visible:outline-brand-deep"
            >
              <svg
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <Photo
              src={photo.src}
              alt={photo.caption || `Dokumentasi ${label}`}
              className="max-h-[70vh] min-h-48 w-full rounded-xl object-contain"
            />

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-ink/70">
                {photo.caption && <span>{photo.caption} · </span>}
                {index + 1} / {photos.length}
              </p>

              {photos.length > 1 && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    className="rounded-md border border-brand-deep/40 px-3 py-1.5 text-sm font-semibold text-brand-deep hover:bg-brand-purple/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-deep"
                  >
                    <span aria-hidden="true">←</span>
                    <span className="sr-only">Foto sebelumnya</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    className="rounded-md border border-brand-deep/40 px-3 py-1.5 text-sm font-semibold text-brand-deep hover:bg-brand-purple/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-deep"
                  >
                    <span aria-hidden="true">→</span>
                    <span className="sr-only">Foto berikutnya</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}

export default function ExperienceDetail() {
  const { slug } = useParams();
  const index = experiences.findIndex((e) => e.slug === slug);
  const exp = experiences[index];

  // Halaman selalu dibuka dari atas, termasuk saat pindah ke kegiatan berikutnya
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (!exp) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-32 text-center">
        <h1 className="font-display text-3xl font-bold">
          Kegiatan tidak ditemukan
        </h1>
        <Link
          to="/#experience"
          className="mt-6 inline-block font-semibold text-brand-deep hover:underline"
        >
          ← Kembali ke pengalaman
        </Link>
      </section>
    );
  }

  const category = categories.find((c) => c.id === exp.category);
  const next = experiences[(index + 1) % experiences.length];
  const doc = exp.document;
  const cover = exp.cover || exp.photos?.[0]?.src;

  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 pt-28">
      <Link
        to="/#experience"
        className="text-sm font-semibold text-brand-deep hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-deep"
      >
        ← Kembali ke pengalaman
      </Link>

      {cover ? (
        <img
          src={cover}
          alt={`Dokumentasi ${exp.role}, ${exp.place}`}
          className="mt-6 h-56 w-full rounded-3xl border border-brand-purple/10 object-cover sm:h-72"
        />
      ) : (
        <div
          className={`mt-6 h-48 rounded-3xl bg-gradient-to-br ${exp.tone}`}
          aria-hidden="true"
        />
      )}

      {category && (
        <p className="mt-8 flex items-center gap-1.5 text-xs text-ink/70">
          <span
            aria-hidden="true"
            className={`size-2 rounded-full ${category.dot}`}
          />
          {category.title}
        </p>
      )}

      <h1 className="mt-2 font-display text-3xl font-bold leading-tight sm:text-4xl">
        {exp.role}
      </h1>
      <p className="mt-2 font-medium text-brand-blue">{exp.place}</p>

      {/* Ringkasan singkat */}
      <dl className="mt-6 grid gap-4 rounded-2xl bg-brand-purple/5 p-5 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium text-ink/65">Periode</dt>
          <dd className="mt-1 text-sm font-semibold">{exp.period}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-ink/65">Kategori</dt>
          <dd className="mt-1 text-sm font-semibold">{category?.title}</dd>
        </div>
      </dl>

      <Block title="Ringkasan">
        <p className="leading-relaxed text-ink/75">{exp.summary}</p>
      </Block>

      {exp.jobdesk.length > 0 && (
        <Block title="Tugas dan tanggung jawab">
          <BulletList items={exp.jobdesk} />
        </Block>
      )}

      {doc && (doc.number || doc.image) && (
        <Block title={doc.label}>
          {doc.number && (
            <p className="leading-relaxed text-ink/75">Nomor: {doc.number}</p>
          )}
          {doc.image && (
            <div className="mt-3 max-w-xs">
              <Gallery
                photos={[{ src: doc.image, caption: doc.label }]}
                label={doc.label}
                columns="grid-cols-1"
              />
              <p className="mt-2 text-xs text-ink/65">
                Data pribadi pada dokumen telah disamarkan.
              </p>
            </div>
          )}
        </Block>
      )}

      {exp.photos.length > 0 && (
        <Block title="Dokumentasi">
          <Gallery photos={exp.photos} label={exp.role} />
        </Block>
      )}

      {next.slug !== exp.slug && (
        <div className="mt-14 border-t border-brand-purple/15 pt-6">
          <p className="text-sm text-ink/65">Kegiatan berikutnya</p>
          <Link
            to={`/experience/${next.slug}`}
            className="mt-1 inline-block font-display text-lg font-bold text-brand-deep hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-deep"
          >
            {next.role} · {next.place} <span aria-hidden="true">→</span>
          </Link>
        </div>
      )}
    </article>
  );
}