/* Section Contact
File: src/components/Contact.jsx */

import { useEffect, useState } from "react";
import { CV_URL, channels, profile } from "../data/contact";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  // Kembalikan label tombol setelah 2 detik
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      // Clipboard bisa diblokir browser; email tetap bisa diklik langsung
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="bg-white px-5 py-12 lg:py-14"
    >
      <div className="mx-auto grid max-w-6xl gap-12 rounded-3xl bg-ink p-8 text-white sm:p-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        {/* Ajakan */}
        <div>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-white/20 px-4 py-1.5 text-sm text-white/80">
            <span className="relative flex size-2.5">
              <span
                aria-hidden="true"
                className="absolute inline-flex size-full rounded-full bg-emerald-400/70 motion-safe:animate-ping"
              />
              <span
                aria-hidden="true"
                className="relative inline-flex size-2.5 rounded-full bg-emerald-400"
              />
            </span>
            Terbuka untuk lowongan
          </p>

          <h2
            id="contact-title"
            className="mt-6 font-display text-3xl font-bold leading-tight sm:text-5xl"
          >
            Butuh web developer yang juga paham data?
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-white/75">
            Saya sedang mencari posisi web developer dan terbuka untuk
            pekerjaan di bidang data dan administrasi. Hubungi saya, atau baca
            CV saya terlebih dahulu.
          </p>

          {/* Email sebagai fokus utama */}
          <div className="mt-8">
            <a
              href={`mailto:${profile.email}`}
              className="break-all font-display text-xl font-bold underline decoration-brand-purple decoration-2 underline-offset-8 transition hover:text-brand-purple focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-3xl"
            >
              {profile.email}
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex min-w-40 items-center justify-center rounded-md bg-white px-7 py-3.5 text-sm font-semibold text-ink transition hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {copied ? "Email disalin" : "Salin email"}
            </button>
            <a
              href={CV_URL}
              download
              className="inline-flex items-center rounded-md border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Unduh CV
            </a>
          </div>
          <p className="sr-only" role="status">
            {copied ? "Email berhasil disalin" : ""}
          </p>
        </div>

        {/* Daftar kontak */}
        <ul className="divide-y divide-white/15 self-center border-y border-white/15">
          {channels.map((c) => {
            const external = c.href.startsWith("http");
            return (
              <li key={c.label}>
                <a
                  href={c.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className="flex items-center justify-between gap-4 py-4 transition hover:text-brand-purple focus-visible:outline-2 focus-visible:outline-brand-purple"
                >
                  <span className="text-sm text-white/70">{c.label}</span>
                  <span className="break-all text-right text-sm font-medium">
                    {c.value} <span aria-hidden="true">→</span>
                  </span>
                </a>
              </li>
            );
          })}
          <li className="flex items-center justify-between gap-4 py-4">
            <span className="text-sm text-white/70">Domisili</span>
            <span className="text-sm font-medium">{profile.location}</span>
          </li>
        </ul>
      </div>
    </section>
  );
}