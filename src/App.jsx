import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import FeaturedProjects from "./components/FeaturedProjects";
import Journey from "./components/Journey";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollManager from "./components/ScrollManager";
import ProjectsPage from "./pages/ProjectsPage";
import CaseStudy from "./pages/CaseStudy";
import ExperienceDetail from "./pages/ExperienceDetail";

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <FeaturedProjects />
      <Journey />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<CaseStudy />} />
          <Route path="/experience/:slug" element={<ExperienceDetail />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}