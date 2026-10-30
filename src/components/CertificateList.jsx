/* Daftar sertifikat (checklist di kartu navy) + tampilan penuh (dialog)
File: src/components/CertificateList.jsx
Dipakai di dalam section Journey. */

import { useRef, useState } from "react";
import { certificates } from "../data/certificates";

// Tampilkan gambar; kalau belum ada atau gagal dimuat, tampilkan placeholder
function Preview({ cert, className, fit }) {
  const [failed, setFailed] = useState(false);

  if (!cert.image || failed) {
    return (
      <div
        className={`grid place-items-center bg-brand-teal-soft p-4 text-center text-sm font-medium text-ink/70 ${className}`}
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

export default function CertificateList() {
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
    <>
      <ul className="-mx-2 space-y-0.5">
        {certificates.map((cert) => (
          <li key={cert.title}>
            <button
              type="button"
              onClick={() => open(cert)}
              aria-haspopup="dialog"
              className="group flex w-full items-start gap-3 rounded-xl px-2 py-2.5 text-left transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
            >
              <span
                aria-hidden="true"
                className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-teal text-white"
              >
                <svg
                  className="size-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold leading-snug text-white">
                  {cert.title}
                </span>
                <span className="mt-0.5 block text-xs text-white/60">
                  {cert.issuer} · {cert.year}
                </span>
              </span>

              <span
                aria-hidden="true"
                className="mt-0.5 text-white/40 transition group-hover:text-brand-teal"
              >
                →
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* Esc menutup dialog secara bawaan browser */}
      <dialog
        ref={dialogRef}
        onClose={() => setSelected(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        aria-label={selected ? `Sertifikat ${selected.title}` : "Sertifikat"}
        className="m-auto w-[92vw] max-w-4xl rounded-2xl bg-white p-0 text-ink backdrop:bg-brand-navy/80"
      >
        {selected && (
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

            <Preview
              cert={selected}
              fit="object-contain"
              className="max-h-[75vh] min-h-48 w-full rounded-xl"
            />

            <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-brand-navy">
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
                  className="text-sm font-semibold text-brand-teal-dark hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
                >
                  Verifikasi kredensial <span aria-hidden="true">→</span>
                </a>
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}