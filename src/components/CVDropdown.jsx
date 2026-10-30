/* Dropdown unduh CV (dipakai di Hero dan Contact)
File: src/components/CVDropdown.jsx
variant: "light" untuk latar terang, "dark" untuk latar navy
direction: "down" atau "up" (arah menu terbuka) */

import { useEffect, useId, useRef, useState } from "react";
import { cvOptions } from "../data/contact";

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

const buttonStyle = {
  light:
    "border-brand-navy/20 bg-white text-brand-navy hover:border-brand-teal hover:bg-brand-teal-soft focus-visible:outline-brand-teal",
  dark: "border-white/30 text-white hover:bg-white/10 focus-visible:outline-white",
};

export default function CVDropdown({ variant = "light", direction = "down" }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const menuId = useId();

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
        aria-controls={menuId}
        className={`inline-flex w-full items-center justify-center gap-2 rounded-lg border px-6 py-3.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto ${buttonStyle[variant]}`}
      >
        Unduh CV
        <ChevronIcon open={open} />
      </button>

      {open && (
        <ul
          id={menuId}
          className={`absolute left-0 z-20 w-full min-w-60 overflow-hidden rounded-xl border border-ink/10 bg-white p-1.5 text-ink shadow-xl shadow-brand-navy/10 ${
            direction === "up" ? "bottom-full mb-2" : "top-full mt-2"
          }`}
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