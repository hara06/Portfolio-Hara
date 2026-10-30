/* Section Hero
File: src/components/Hero.jsx */

import { useEffect, useRef, useState } from "react";
import CVDropdown from "./CVDropdown";
import heroImg from "../assets/hero.png";

// Posisi bubble ditempatkan di sisi gambar, delay dibuat beda agar tidak serempak
const bubbles = [
  { label: "Admin Backoffice", position: "left-0 top-[16%]", delay: "0s" },
  { label: "Web Developer", position: "right-0 top-[40%]", delay: "1.2s" },
  { label: "Data Analyst", position: "left-0 top-[64%]", delay: "2.4s" },
];

function ChevronIcon({ open }) {
  return (
    <svg
      className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
    </svg>
  );
}

function CVDropdown() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Tutup dropdown saat klik di luar atau menekan Escape
  useEffect(() => {
    if (!open) return;

    const onClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="cv-menu"
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-brand-navy/20 bg-white px-6 py-3.5 text-sm font-semibold text-brand-navy transition hover:border-brand-teal hover:bg-brand-teal-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal sm:w-auto"
      >
        Unduh CV
        <ChevronIcon open={open} />
      </button>

      {open && (
        <ul
          id="cv-menu"
          className="absolute left-0 top-full z-20 mt-2 w-full min-w-60 overflow-hidden rounded-xl border border-ink/10 bg-white p-1.5 shadow-xl shadow-brand-navy/10"
        >
          {cvOptions.map((cv) => (
            <li key={cv.label}>
              <a
                href={cv.file}
                download
                onClick={() => setOpen(false)}
                className="flex items-center justify-between gap-3 rounded-lg px-3.5 py-3 text-sm font-medium text-ink transition hover:bg-brand-teal-soft hover:text-brand-teal-dark focus-visible:outline-2 focus-visible:outline-brand-teal"
              >
                {cv.label}
                <DownloadIcon />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-[linear-gradient(to_bottom,white_0%,#e6f7f5_100%)] pb-16 pt-16 lg:pb-24"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 pt-12 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-8 lg:pt-8">
        {/* Teks */}
        <div className="order-2 pb-4 lg:order-1 lg:pb-8">
          {/* Badge */}
          <p className="inline-flex items-center gap-2.5 rounded-full border border-brand-teal/30 bg-white px-4 py-1.5 text-xs font-semibold text-brand-teal-dark shadow-sm sm:text-sm">
            <span className="relative flex size-2.5" aria-hidden="true">
              <span className="absolute inline-flex size-full rounded-full bg-brand-teal opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2.5 rounded-full bg-brand-teal" />
            </span>
            Terbuka untuk lowongan
          </p>

          {/* Nama: font paling besar */}
          <h1
            id="hero-title"
            className="mt-5 text-5xl font-extrabold leading-[1.05] tracking-tight text-brand-navy sm:text-6xl lg:text-7xl"
          >
            Pretty Ohara Hutasoit
          </h1>

          {/* Headline: lebih kecil dari nama */}
          <h2 className="mt-6 max-w-xl text-lg font-semibold leading-snug text-brand-teal-dark sm:text-xl lg:text-2xl">
            Mengelola Data dengan Teliti, Membangun Solusi Digital, dan
            Menghasilkan Insight.
          </h2>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-start">
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-lg bg-brand-navy px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-navy/20 transition hover:bg-brand-navy-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
            >
              Lihat Project
            </a>

            <CVDropdown />
          </div>
        </div>

        {/* Foto */}
        <div className="relative order-1 mx-auto w-full max-w-md px-4 pt-6 sm:max-w-lg lg:order-2 lg:max-w-xl lg:justify-self-end lg:px-4 lg:pt-0">
          {/* Glow lembut di belakang foto */}          
          <div
            aria-hidden="true"
            className="absolute inset-x-10 bottom-0 top-16 rounded-full bg-brand-teal/10 blur-3xl"
          />

          {/* Gambar memakai rasio aslinya, tidak dipotong */}
          <img
            src={heroImg}
            alt="Foto profil Pretty Ohara Hutasoit"
            className="relative h-auto w-full object-contain [mask-image:linear-gradient(to_bottom,black_0%,black_70%,rgba(0,0,0,0.6)_82%,rgba(0,0,0,0.25)_92%,transparent_100%)]"
            fetchPriority="high"
            decoding="async"
          />

          {/* Bubble mengambang, posisinya di dalam area gambar */}
          <ul className="hidden sm:block">
            {bubbles.map((b) => (
              <li key={b.label} className={`absolute ${b.position}`}>
                <span
                  className="block rounded-full border border-white/70 bg-white/80 px-4 py-2 text-xs font-semibold text-brand-navy shadow-lg shadow-brand-navy/10 backdrop-blur-md motion-safe:animate-[float_5s_ease-in-out_infinite]"
                  style={{ animationDelay: b.delay }}
                >
                  {b.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}