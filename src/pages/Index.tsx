
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
import Background3D from "@/components/Background3D";
import { useGsapAnimations } from "@/hooks/useGsapAnimations";

const Index = () => {
  // Initialize GSAP animations
  useGsapAnimations();

  return (
    <div className="min-h-screen flex flex-col">
      <Background3D />
      <Header />
      <main className="flex-grow">
        <div id="home"><HeroSection /></div>
        <div id="about"><AboutSection /></div>
        <div id="education"><EducationSection /></div>
        <div id="projects"><ProjectsSection /></div>
        <div id="skills"><SkillsSection /></div>
        <div id="experience"><ExperienceSection /></div>
        <div id="certifications"><CertificationSection /></div>
        <div id="contact"><ContactSection /></div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
