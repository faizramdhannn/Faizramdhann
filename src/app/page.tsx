'use client';

import { useEffect, useState } from 'react';
import { DEFAULT_CONTENT, type Content } from '@/lib/content';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  const [content, setContent] = useState<Content>(DEFAULT_CONTENT);

  useEffect(() => {
    const cached = sessionStorage.getItem('portfolio-content');
    if (cached) {
      try {
        setContent(JSON.parse(cached));
        return;
      } catch {
        // fall through to fetch
      }
    }

    fetch('/api/content')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) return;
        setContent(data);
        sessionStorage.setItem('portfolio-content', JSON.stringify(data));
      })
      .catch((error) => console.error('Error fetching content:', error));
  }, []);

  return (
    <div className="w-full">
      <HeroSection content={content} />
      <AboutSection content={content} />
      <ServicesSection />
      <SkillsSection />
      <ContactSection content={content} />
    </div>
  );
}
