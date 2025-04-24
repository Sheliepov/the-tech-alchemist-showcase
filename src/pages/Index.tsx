
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import EducationSection from "@/components/sections/EducationSection";
import ContactSection from "@/components/sections/ContactSection";
import CertificationSection from "@/components/sections/CertificationSection";
import { useGsapAnimations } from "@/hooks/useGsapAnimations";

const Index = () => {
  // Initialize GSAP animations
  useGsapAnimations();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div id="home"><HeroSection /></div>
        <div className="about-section"><AboutSection /></div>
        <div id="education" className="education-section"><EducationSection /></div>
        <div id="projects" className="projects-section"><ProjectsSection /></div>
        <div id="skills" className="skills-section"><SkillsSection /></div>
        <div id="experience" className="experience-section"><ExperienceSection /></div>
        <div id="certifications" className="certification-section"><CertificationSection /></div>
        <div id="contact" className="contact-section"><ContactSection /></div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
