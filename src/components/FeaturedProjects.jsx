/* Section Featured Projects (landing page)
File: src/components/FeaturedProjects.jsx
Menampilkan maksimal 3 project dengan featured: true di src/data/projects.js */

import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

const featured = projects.filter((p) => p.featured).slice(0, 3);

export default function FeaturedProjects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="scroll-mt-16 bg-brand-teal-soft/40 px-5 pb-12 pt-6 lg:pb-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-4">
          <h2
            id="projects-title"
            className="flex items-center gap-2 text-lg font-extrabold uppercase tracking-wide text-brand-navy sm:text-xl"
          >
            Featured Projects
            <span aria-hidden="true" className="text-brand-teal">+</span>
          </h2>

          <Link
            to="/projects"
            className="group inline-flex items-center gap-2.5 text-sm font-semibold text-brand-teal-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-teal"
          >
            Lihat semua project ({projects.length})
            <span
              aria-hidden="true"
              className="grid size-9 place-items-center rounded-full bg-brand-navy text-white shadow-md shadow-brand-navy/20 transition group-hover:bg-brand-teal"
            >
              →
            </span>
          </Link>
        </div>

        <ul className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i + 1} />
          ))}
        </ul>
      </div>
    </section>
  );
}