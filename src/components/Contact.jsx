/* Section Contact
File: src/components/Contact.jsx */

import { useEffect, useState } from "react";
import { channels, profile } from "../data/contact";
import CVDropdown from "./CVDropdown";

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
      className="scroll-mt-16 bg-white px-5 pb-12 pt-4 lg:pb-16"
    >
      <div className="mx-auto grid max-w-6xl gap-8 rounded-3xl bg-brand-navy p-6 text-white shadow-md shadow-brand-navy/20 sm:p-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12 lg:p-10">
        {/* Ajakan */}
        <div>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-white/20 px-3.5 py-1 text-xs text-white/80 sm:text-sm">
            <span className="relative flex size-2.5">
              <span
                aria-hidden="true"
                className="absolute inline-flex size-full rounded-full bg-brand-teal/70 motion-safe:animate-ping"
              />
              <span
                aria-hidden="true"
                className="relative inline-flex size-2.5 rounded-full bg-brand-teal"
              />
            </span>
            Terbuka untuk lowongan
          </p>

          <h2
            id="contact-title"
            className="mt-4 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl lg:text-4xl"
          >
            Butuh web developer yang juga{" "}
            <span className="text-brand-teal">paham data?</span>
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75 sm:text-base">
            Saya sedang mencari posisi web developer dan terbuka untuk
            pekerjaan di bidang data dan administrasi. Hubungi saya, atau baca
            CV saya terlebih dahulu.
          </p>

          {/* Email sebagai fokus utama */}
          <a
            href={`mailto:${profile.email}`}
            className="mt-6 inline-block break-all text-lg font-bold underline decoration-brand-teal decoration-2 underline-offset-8 transition hover:text-brand-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-teal sm:text-2xl"
          >
            {profile.email}
          </a>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex min-w-36 items-center justify-center rounded-lg bg-brand-teal px-6 py-3 text-sm font-semibold text-brand-navy transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {copied ? "Email disalin" : "Salin email"}
            </button>
            <CVDropdown variant="dark" direction="up" />
          </div>
          <p className="sr-only" role="status">
            {copied ? "Email berhasil disalin" : ""}
          </p>
        </div>

        {/* Daftar kontak */}
        <ul className="divide-y divide-white/10 self-center rounded-2xl bg-white/5 px-5 py-1">
          {channels.map((c) => {
            const external = c.href.startsWith("http");
            return (
              <li key={c.label}>
                <a
                  href={c.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className="flex items-center justify-between gap-4 py-3.5 transition hover:text-brand-teal focus-visible:outline-2 focus-visible:outline-brand-teal"
                >
                  <span className="text-sm text-white/65">{c.label}</span>
                  <span className="break-all text-right text-sm font-medium">
                    {c.value} <span aria-hidden="true">→</span>
                  </span>
                </a>
              </li>
            );
          })}
          <li className="flex items-center justify-between gap-4 py-3.5">
            <span className="text-sm text-white/65">Domisili</span>
            <span className="text-sm font-medium">{profile.location}</span>
          </li>
        </ul>
      </div>
    </section>
  );
}