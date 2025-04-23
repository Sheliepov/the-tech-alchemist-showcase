
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGsapAnimations = () => {
  useEffect(() => {
    // Hero section animations
    gsap.from('.hero-content', {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: 'power3.out',
    });

    gsap.from('.hero-image', {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out',
    });

    // Section animations on scroll
    const sections = [
      '.about-section',
      '.education-section',
      '.projects-section',
      '.skills-section',
      '.experience-section',
      '.certification-section',
      '.contact-section',
    ];

    sections.forEach((section) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      });
    });

    // Card stagger animations
    sections.forEach((section) => {
      gsap.from(`${section} .animate-card`, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
};
