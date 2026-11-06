/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WhatIDo from './components/WhatIDo';
import WorksSection from './components/WorksSection';
import ProjectDetailModal from './components/ProjectDetailModal';
import AILabSection from './components/AILabSection';
import AboutSection from './components/AboutSection';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import SiteGuideModal from './components/SiteGuideModal';
import { Project, PROJECTS } from './data/portfolioData';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const handleCloseProject = () => {
    setIsProjectModalOpen(false);
  };

  const scrollToWorks = () => {
    const el = document.getElementById('works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F5F1] text-[#17191C] flex flex-col font-sans selection:bg-[#345BEB] selection:text-white">
      {/* 3-Zone Fixed Header */}
      <Header
        onContactClick={scrollToContact}
        onGuideClick={() => setIsGuideModalOpen(true)}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onExploreWorks={scrollToWorks}
          onContactClick={scrollToContact}
        />

        {/* 2. What I Do (4 Core Disciplines) */}
        <WhatIDo />

        {/* 3. Works Section (Filterable Showcase) */}
        <WorksSection onSelectProject={handleOpenProject} />

        {/* 4. AI Content Lab & Motion Pipeline */}
        <AILabSection />

        {/* 5. About & 10-Year Journey */}
        <AboutSection />

        {/* 6. Education & Teaching Philosophy */}
        <EducationSection onContactClick={scrollToContact} />

        {/* 7. Contact & Collaboration Conversion */}
        <ContactSection onResumeClick={() => setIsResumeModalOpen(true)} />
      </main>

      {/* 8. Editorial Footer */}
      <Footer
        onGuideClick={() => setIsGuideModalOpen(true)}
        onResumeClick={() => setIsResumeModalOpen(true)}
      />

      {/* Interactive Case Study Modal */}
      <ProjectDetailModal
        project={selectedProject}
        allProjects={PROJECTS}
        isOpen={isProjectModalOpen}
        onClose={handleCloseProject}
        onSelectProject={(proj) => setSelectedProject(proj)}
      />

      {/* Resume Access Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      {/* Developer & Owner Planning Guide Modal */}
      <SiteGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
      />
    </div>
  );
}
