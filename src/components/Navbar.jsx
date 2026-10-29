/* Section Navbar
File: src/components/Navbar.jsx */

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useActiveSection from "../hooks/useActiveSection";

// Urutan menu harus sama dengan urutan section di halaman
const links = [
  { label: "Beranda", id: "home" },
  { label: "Tentang", id: "about" },
  { label: "Proyek", id: "projects" },
  { label: "Sertifikat", id: "certificates" },
  { label: "Pengalaman", id: "experience" },
  { label: "Kontak", id: "contact" },
];

// File CV diletakkan di folder public/, misalnya public/CV-Nama-Kamu.pdf
const CV_URL = "/CV-Nama-Kamu.pdf";

// Dibuat di luar komponen supaya referensinya stabil
const sectionIds = links.map((l) => l.id);

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

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Scroll-spy hanya aktif di halaman utama
  const active = useActiveSection(sectionIds, pathname === "/");

  const linkClass = (id, extra = "") =>
    `${extra} font-medium transition ${
      active === id
        ? "bg-brand-blue/10 text-brand-blue"
        : "text-ink/70 hover:bg-brand-blue/10 hover:text-brand-blue"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/5 bg-white/80 backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5"
        aria-label="Navigasi utama"
      >
        <Link
          to="/#home"
          className="font-display text-xl font-extrabold tracking-tight"
        >
          Portofolio<span className="text-brand-pink">.</span>
        </Link>

        {/* Menu desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.id}>
              <Link
                to={`/#${link.id}`}
                aria-current={active === link.id ? "location" : undefined}
                className={linkClass(
                  link.id,
                  "rounded-full px-4 py-2 text-sm focus-visible:outline-2 focus-visible:outline-brand-blue",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Tombol CV: file, bukan halaman, jadi pakai <a> biasa */}
        <a
          href={CV_URL}
          download
          className="hidden items-center gap-2 rounded-full bg-brand-pink px-5 py-2 text-sm font-bold text-white transition hover:bg-brand-pink/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink md:inline-flex"
        >
          <DownloadIcon />
          Unduh CV
        </a>

        {/* Tombol menu mobile */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          className="grid size-10 place-items-center rounded-full text-ink hover:bg-brand-blue/10 md:hidden"
        >
          <svg
            className="size-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Menu mobile */}
      {open && (
        <div id="menu-mobile" className="border-t border-ink/5 bg-white md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
            {links.map((link) => (
              <li key={link.id}>
                <Link
                  to={`/#${link.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === link.id ? "location" : undefined}
                  className={linkClass(link.id, "block rounded-xl px-4 py-3")}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            <li className="pt-2">
              <a
                href={CV_URL}
                download
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-brand-pink px-5 py-3 font-bold text-white"
              >
                <DownloadIcon />
                Unduh CV
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}



