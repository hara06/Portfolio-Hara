/*Fungsi useActiveSection
File: hooks/useActiveSection.jsx*/

import { useEffect, useState } from "react";

export default function useActiveSection(ids, enabled = true) {
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!enabled) {
      setActive("");
      return;
    }

    // Section dianggap aktif saat melewati garis tengah layar
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids, enabled]);

  return active;
}