/* Section Certificates
File: src/components/Certificates.jsx */

import { useRef, useState } from "react";
import { certificates } from "../data/certificates";

// Tampilkan gambar; kalau belum ada atau gagal dimuat, tampilkan placeholder
function Preview({ cert, className, fit }) {
  const [failed, setFailed] = useState(false);

  if (!cert.image || failed) {
    return (
      <div
        className={`grid place-items-center bg-gradient-to-br from-brand-blue/15 to-brand-purple/15 p-4 text-center text-sm font-medium text-ink/70 ${className}`}
      >
        {cert.title}
      </div>
    );
  }

  return (
    <img
      src={cert.image}
      alt={`Sertifikat ${cert.title} dari ${cert.issuer}`}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`${fit} ${className}`}
    />
  );
}

export default function Certificates() {
  const dialogRef = useRef(null);
  const [selected, setSelected] = useState(null);

  function open(cert) {
    setSelected(cert);
    dialogRef.current?.showModal();
  }

  function close() {
    dialogRef.current?.close();
  }

  return (
    <section
      id="certificates"
      aria-labelledby="certificates-title"
      className="bg-white py-12 lg:py-14"
    >
      <div className="mx-auto max-w-6xl px-5">
        <h2
          id="certificates-title"
          className="font-display text-3xl font-bold sm:text-4xl"
        >
          Sertifikat
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/70">
          Sertifikasi, pelatihan, dan kursus di bidang pengembangan web,
          jaringan, dan administrasi sistem. Pilih salah satu untuk melihatnya
          lebih jelas.
        </p>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <li key={cert.title}>
              <button
                type="button"
                onClick={() => open(cert)}
                aria-haspopup="dialog"
                className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-brand-purple/10 bg-white text-left transition hover:border-brand-purple/40 hover:shadow-lg hover:shadow-brand-purple/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-deep"
              >
                <Preview
                  cert={cert}
                  fit="object-contain bg-brand-purple/5"
                  className="aspect-[4/3] w-full"
                />
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-base font-bold leading-snug">
                    {cert.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-brand-blue">
                    {cert.issuer}
                  </p>
                  <p className="mt-auto pt-3 text-xs text-ink/65">
                    {cert.year}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Tampilan penuh. Esc menutup dialog secara bawaan browser */}
      <dialog
        ref={dialogRef}
        onClose={() => setSelected(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        aria-label={selected ? `Sertifikat ${selected.title}` : "Sertifikat"}
        className="m-auto w-[92vw] max-w-4xl rounded-2xl bg-white p-0 backdrop:bg-ink/70"
      >
        {selected && (
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

            <Preview
              cert={selected}
              fit="object-contain"
              className="max-h-[75vh] min-h-48 w-full rounded-xl"
            />

            <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h3 className="font-display text-lg font-bold">
                  {selected.title}
                </h3>
                <p className="text-sm text-ink/70">
                  {selected.issuer} · {selected.year}
                </p>
              </div>
              {selected.credentialUrl && (
                <a
                  href={selected.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-brand-deep hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-deep"
                >
                  Verifikasi kredensial <span aria-hidden="true">→</span>
                </a>
              )}
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}