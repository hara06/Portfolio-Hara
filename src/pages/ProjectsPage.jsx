/* Page Projects: semua project dengan filter kategori
File: src/pages/ProjectsPage.jsx
Route: /projects */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projects, dotColor } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

// Filter dibuat otomatis dari tag yang benar-benar dipakai project
const tags = Object.keys(dotColor).filter((tag) =>
  projects.some((p) => p.tags.includes(tag)),
);

const countOf = (tag) =>
  tag === "All"
    ? projects.length
    : projects.filter((p) => p.tags.includes(tag)).length;

export default function ProjectsPage() {
  const [active, setActive] = useState("All");

  // Halaman selalu dibuka dari atas
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const visible = projects.filter(
    (p) => active === "All" || p.tags.includes(active),
  );

  return (
    <section
      aria-labelledby="all-projects-title"
      className="mx-auto max-w-6xl px-5 pb-24 pt-28"
    >
      <Link
        to="/#projects"
        className="text-sm font-semibold text-brand-teal-dark hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
      >
        ← Kembali ke beranda
      </Link>

      <h1
        id="all-projects-title"
        className="mt-6 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl"
      >
        Semua Project
      </h1>
      <p className="mt-3 max-w-xl leading-relaxed text-ink/75">
        Sistem yang saya rancang dan bangun, dari memahami masalah sampai
        menjadi produk yang bisa dipakai. Filter berdasarkan bidang, lalu buka
        salah satunya untuk membaca studi kasusnya.
      </p>

      {/* Filter */}
      <div
        className="mt-8 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter project berdasarkan bidang"
      >
        {["All", ...tags].map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActive(tag)}
            aria-pressed={active === tag}
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal ${
              active === tag
                ? "border-brand-navy bg-brand-navy text-white"
                : "border-brand-navy/20 text-brand-navy hover:bg-brand-teal-soft"
            }`}
          >
            {tag === "All" ? "Semua" : tag}
            <span
              className={`ml-1.5 font-medium ${
                active === tag ? "text-white/75" : "text-ink/60"
              }`}
            >
              {countOf(tag)}
            </span>
          </button>
        ))}
      </div>

      <p className="sr-only" role="status">
        Menampilkan {visible.length} project
      </p>

      <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </ul>
    </section>
  );
}