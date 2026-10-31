/* Page ExperienceDetail
File: src/pages/ExperienceDetail.jsx
Route: /experience/:slug */

import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { experiences, categories } from "../data/experiences";

function Block({ title, children }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-brand-navy">{title}</h2>
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
            className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand-teal"
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
        className={`grid place-items-center bg-brand-teal-soft p-4 text-center text-xs font-medium text-ink/65 ${className}`}
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

function Chevron({ dir }) {
  return (
    <svg
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}

// Panah carousel: di dalam area foto, sejajar dengan gambar (bukan caption)
const arrowClass =
  "absolute top-[calc(50%-1rem)] z-10 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-brand-navy shadow-lg shadow-brand-navy/20 transition hover:scale-105 hover:bg-brand-navy hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal";

// Galeri: thumbnail, klik untuk memperbesar (dialog dengan navigasi).
// carousel: thumbnail ditampilkan 3 sekaligus, bisa digeser, dengan panah dan titik penanda
function Gallery({
  photos,
  label,
  columns = "grid-cols-2 sm:grid-cols-3",
  carousel = false,
}) {
  const dialogRef = useRef(null);
  const trackRef = useRef(null);
  const [index, setIndex] = useState(null);
  const [edge, setEdge] = useState({ start: true, end: true });
  const [visible, setVisible] = useState([]);

  const photo = index === null ? null : photos[index];

  // Perbarui status panah dan titik sesuai posisi geser
  useEffect(() => {
    if (!carousel) return;
    const el = trackRef.current;
    if (!el) return;

    const update = () => {
      setEdge({
        start: el.scrollLeft <= 2,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2,
      });

      // Foto dianggap terlihat kalau minimal separuhnya ada di dalam area geser
      const box = el.getBoundingClientRect();
      setVisible(
        Array.from(el.children).map((li) => {
          const r = li.getBoundingClientRect();
          const overlap =
            Math.min(r.right, box.right) - Math.max(r.left, box.left);
          return overlap >= r.width * 0.5;
        }),
      );
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [carousel, photos.length]);

  function slide(dir) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  }

  function scrollToPhoto(i) {
    const el = trackRef.current;
    const li = el?.children[i];
    if (!el || !li) return;
    const left =
      li.getBoundingClientRect().left -
      el.getBoundingClientRect().left +
      el.scrollLeft;
    el.scrollTo({ left, behavior: "smooth" });
  }

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

  const thumbs = photos.map((p, i) => (
    <li
      key={p.src}
      className={
        carousel
          ? "w-[70%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/3)]"
          : undefined
      }
    >
      <button
        type="button"
        onClick={() => open(i)}
        aria-haspopup="dialog"
        className="block w-full overflow-hidden rounded-xl border border-ink/10 text-left transition hover:border-brand-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
      >
        <Photo
          src={p.src}
          alt={p.caption || `Dokumentasi ${label} ${i + 1}`}
          className="aspect-[4/3] w-full bg-brand-teal-soft/60 object-contain"
        />
        {carousel && p.caption && (
          <span className="block truncate px-3 py-2 text-xs font-medium text-ink/70">
            {p.caption}
          </span>
        )}
      </button>
    </li>
  ));

  return (
    <>
      {carousel ? (
        <div>
          <div className="relative">
            <ul
              ref={trackRef}
              className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {thumbs}
            </ul>

            {!edge.start && (
              <button
                type="button"
                onClick={() => slide(-1)}
                className={`${arrowClass} left-2`}
              >
                <Chevron dir="left" />
                <span className="sr-only">Geser ke kiri</span>
              </button>
            )}
            {!edge.end && (
              <button
                type="button"
                onClick={() => slide(1)}
                className={`${arrowClass} right-2`}
              >
                <Chevron dir="right" />
                <span className="sr-only">Geser ke kanan</span>
              </button>
            )}
          </div>

          {/* Titik penanda: satu per foto, hanya muncul kalau ada foto yang tersembunyi */}
          {!(edge.start && edge.end) && (
            <div className="mt-3 flex justify-center gap-1.5">
              {photos.map((p, i) => (
                <button
                  key={p.src}
                  type="button"
                  onClick={() => scrollToPhoto(i)}
                  aria-label={`Lihat foto ${i + 1} dari ${photos.length}`}
                  aria-current={visible[i] ? "true" : undefined}
                  className={`h-2 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal ${
                    visible[i]
                      ? "w-5 bg-brand-teal"
                      : "w-2 bg-brand-navy/20 hover:bg-brand-navy/40"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <ul className={`grid gap-3 ${columns}`}>{thumbs}</ul>
      )}

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
        className="m-auto w-[92vw] max-w-4xl rounded-2xl bg-white p-0 text-ink backdrop:bg-brand-navy/80"
      >
        {photo && (
          <div className="relative p-4 sm:p-6">
            <button
              type="button"
              onClick={close}
              aria-label="Tutup"
              className="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-full bg-white/90 text-ink shadow hover:bg-brand-teal-soft focus-visible:outline-2 focus-visible:outline-brand-teal"
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
                    className="rounded-lg border border-brand-navy/20 px-3 py-1.5 text-sm font-semibold text-brand-navy transition hover:bg-brand-teal-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
                  >
                    <span aria-hidden="true">←</span>
                    <span className="sr-only">Foto sebelumnya</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    className="rounded-lg border border-brand-navy/20 px-3 py-1.5 text-sm font-semibold text-brand-navy transition hover:bg-brand-teal-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
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
        <h1 className="text-3xl font-bold text-brand-navy">
          Kegiatan tidak ditemukan
        </h1>
        <Link
          to="/#journey"
          className="mt-6 inline-block font-semibold text-brand-teal-dark hover:underline"
        >
          ← Kembali ke perjalanan
        </Link>
      </section>
    );
  }

  const category = categories.find((c) => c.id === exp.category);
  const next = experiences[(index + 1) % experiences.length];
  const doc = exp.document;
  const cover = exp.cover || exp.photos?.[0]?.src;

  const techPhotos = exp.photos.filter((p) => p.type !== "softskill");
const softPhotos = exp.photos.filter((p) => p.type === "softskill");

  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 pt-28">
      <Link
        to="/#journey"
        className="text-sm font-semibold text-brand-teal-dark hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
      >
        ← Kembali ke perjalanan
      </Link>

      {cover ? (
        <img
          src={cover}
          alt={`Dokumentasi ${exp.role}, ${exp.place}`}
          className="mt-6 aspect-[20/9] w-full rounded-3xl border border-ink/10 object-cover object-top"
          fetchPriority="high"
          decoding="async"
        />
      ) : (
        <div
          className={`mt-6 aspect-[20/9] w-full rounded-3xl bg-gradient-to-br ${exp.tone}`}
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

      <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-4xl">
        {exp.role}
      </h1>
      <p className="mt-2 font-medium text-brand-teal-dark">{exp.place}</p>

      {/* Ringkasan singkat */}
      <dl className="mt-6 grid gap-4 rounded-2xl bg-brand-teal-soft/60 p-5 sm:grid-cols-2">
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

   {exp.softSkills?.length > 0 && (
  <Block title="Soft skill yang diasah">
    <ul className="flex flex-wrap gap-2">
      {exp.softSkills.map((s) => (
        <li
          key={s}
          className="rounded-full bg-brand-teal-soft px-3 py-1 text-xs font-semibold text-brand-teal-dark"
        >
          {s}
        </li>
      ))}
    </ul>
  </Block>
)}

{techPhotos.length > 0 && (
  <Block title="Dokumentasi pekerjaan">
    <Gallery photos={techPhotos} label={`${exp.role} (pekerjaan)`} carousel />
  </Block>
)}

{softPhotos.length > 0 && (
  <Block title="Soft skill dalam aksi">
    <p className="mb-3 text-sm leading-relaxed text-ink/70">
      Peran di luar tugas teknis yang melatih komunikasi dan kepemimpinan.
    </p>
    <Gallery photos={softPhotos} label={`${exp.role} (soft skill)`} carousel />
  </Block>
)}

      {next.slug !== exp.slug && (
        <div className="mt-14 border-t border-ink/10 pt-6">
          <p className="text-sm text-ink/65">Kegiatan berikutnya</p>
          <Link
            to={`/experience/${next.slug}`}
            className="mt-1 inline-block text-lg font-bold text-brand-teal-dark hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
          >
            {next.role} · {next.place} <span aria-hidden="true">→</span>
          </Link>
        </div>
      )}
    </article>
  );
}