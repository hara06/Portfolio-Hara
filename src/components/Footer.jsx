/* Footer
File: src/components/Footer.jsx */

import { Link } from "react-router-dom";
import { channels, profile } from "../data/contact";

// Urutan dan id sama dengan Navbar
const navLinks = [
  { label: "Home", to: "/#home" },
  { label: "About", to: "/#about" },
  { label: "Skills", to: "/#skills" },
  { label: "Projects", to: "/#projects" },
  { label: "Journey", to: "/#journey" },
  { label: "Contact", to: "/#contact" },
];

// WhatsApp tidak ditampilkan di footer
const socials = channels.filter((c) => c.label !== "WhatsApp");

const linkClass =
  "text-sm text-ink/70 transition hover:text-brand-teal-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-brand-teal-soft/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-xl font-extrabold tracking-tight text-brand-navy">
            {profile.name}
            <span className="text-brand-teal">.</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink/70">
            Membangun aplikasi web dan dashboard yang membuat data lebih mudah
            dipahami.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="text-sm font-bold text-brand-navy">Halaman</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-1">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-sm font-bold text-brand-navy">Temukan saya di</p>
          <ul className="mt-3 space-y-2">
            {socials.map((s) => {
              const external = s.href.startsWith("http");
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    className={linkClass}
                  >
                    {s.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="border-t border-ink/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4 text-sm text-ink/65">
          <p>
            © {new Date().getFullYear()} {profile.name}. Dibuat dengan React
            dan Tailwind CSS.
          </p>
          <Link
            to="/#home"
            className="font-semibold text-brand-teal-dark hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
          >
            Kembali ke atas <span aria-hidden="true">↑</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}