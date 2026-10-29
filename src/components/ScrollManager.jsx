/* Scroll ke section saat URL punya #hash, dan ke atas saat pindah halaman
File: src/components/ScrollManager.jsx
Pasang sekali di dalam <BrowserRouter>, di atas <Routes>. */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    // Tunggu halaman selesai dirender sebelum mencari elemennya
    const id = hash.slice(1);
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView();
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}