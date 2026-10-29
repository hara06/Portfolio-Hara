/* Footer
File: src/components/Footer.jsx */

import { Link } from "react-router-dom";
import { channels, profile } from "../data/contact";

const navLinks = [
  { label: "Beranda", to: "/#home" },
  { label: "Tentang", to: "/#about" },
  { label: "Proyek", to: "/#projects" },
  { label: "Sertifikat", to: "/#certificates" },
  { label: "Pengalaman", to: "/#experience" },
  { label: "Kontak", to: "/#contact" },
];

// WhatsApp tidak ditampilkan di footer
const socials = channels.filter((c) => c.label !== "WhatsApp");

const linkClass =
  "text-sm text-ink/70 transition hover:text-brand-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-deep";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-10 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-xl font-extrabold tracking-tight">
            {profile.name}
            <span className="text-brand-pink">.</span>
          </p>
          <p className="mt-1 text-sm text-ink/70">{profile.role}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/70">
            Membangun aplikasi web dan dashboard yang membuat data lebih mudah
            dipahami.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="font-display text-sm font-bold">Halaman</p>
          <ul className="mt-3 space-y-2">
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
          <p className="font-display text-sm font-bold">Temukan saya di</p>
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
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-5 text-sm text-ink/65">
          <p>
            © {new Date().getFullYear()} {profile.name}. Dibuat dengan React
            dan Tailwind CSS.
          </p>
          <Link
            to="/#home"
            className="font-medium text-brand-deep hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-deep"
          >
            Kembali ke atas <span aria-hidden="true">↑</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}