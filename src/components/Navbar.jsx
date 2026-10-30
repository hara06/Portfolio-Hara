/* Section Navbar
File: src/components/Navbar.jsx */

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useActiveSection from "../hooks/useActiveSection";

// Urutan menu harus sama dengan urutan section di halaman
const links = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Journey", id: "journey" },
  { label: "Contact", id: "contact" },
];

// Dibuat di luar komponen supaya referensinya stabil
const sectionIds = links.map((l) => l.id);

// Halaman detail tidak punya scroll-spy, jadi menu induknya yang disorot
function sectionFromPath(pathname) {
  if (pathname.startsWith("/projects")) return "projects";
  if (pathname.startsWith("/experience")) return "journey";
  return null;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  // Scroll-spy hanya aktif di halaman utama
  const spy = useActiveSection(sectionIds, isHome);
  const active = isHome ? spy : sectionFromPath(pathname);

  // Menu mobile bisa ditutup dengan Escape
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const linkClass = (id, extra = "") =>
    `${extra} font-medium transition ${
      active === id
        ? "bg-brand-teal-soft text-brand-teal-dark"
        : "text-ink/70 hover:bg-brand-teal-soft hover:text-brand-teal-dark"
    }`;

  const current = (id) =>
    active === id ? (isHome ? "location" : "page") : undefined;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/5 bg-white/85 backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5"
        aria-label="Navigasi utama"
      >
        <Link
          to="/#home"
          onClick={() => setOpen(false)}
          className="text-xl font-extrabold tracking-tight text-brand-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-teal"
        >
          Portofolio<span className="text-brand-teal">.</span>
        </Link>

        {/* Menu desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.id}>
              <Link
                to={`/#${link.id}`}
                aria-current={current(link.id)}
                className={linkClass(
                  link.id,
                  "rounded-full px-4 py-2 text-sm focus-visible:outline-2 focus-visible:outline-brand-teal",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Tombol menu mobile */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          className="grid size-10 place-items-center rounded-full text-ink hover:bg-brand-teal-soft focus-visible:outline-2 focus-visible:outline-brand-teal md:hidden"
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
                  aria-current={current(link.id)}
                  className={linkClass(link.id, "block rounded-xl px-4 py-3")}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}