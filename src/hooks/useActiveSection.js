/* Fungsi useActiveSection
File: hooks/useActiveSection.jsx
Urutan ids harus sama dengan urutan section di halaman. */

import { useEffect, useState } from "react";

export default function useActiveSection(ids, enabled = true) {
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!enabled) {
      setActive("");
      return;
    }

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (elements.length === 0) return;

    let frame = 0;

    function update() {
      frame = 0;
      // Garis acuan: 40% dari atas layar
      const line = window.innerHeight * 0.4;
      let current = elements[0].id;

      for (const el of elements) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }

      // Di dasar halaman, section terakhir selalu dianggap aktif
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = elements[elements.length - 1].id;

      setActive(current);
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids, enabled]);

  return active;
}