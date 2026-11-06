/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import BrunoWorld3D, { DrawerSectionId } from './components/three/BrunoWorld3D';
import WorksSection from './components/WorksSection';
import ProjectDetailModal from './components/ProjectDetailModal';
import AILabSection from './components/AILabSection';
import AboutSection from './components/AboutSection';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';
import ResumeModal from './components/ResumeModal';
import SiteGuideModal from './components/SiteGuideModal';
import { Project, PROJECTS } from './data/portfolioData';
import { X, Gamepad2 } from 'lucide-react';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState<DrawerSectionId>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const handleCloseProject = () => {
    setIsProjectModalOpen(false);
  };

  // Close active drawer on ESC key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeDrawer) {
        setActiveDrawer(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeDrawer]);

  const drawerTitles: Record<Exclude<DrawerSectionId, null>, string> = {
    'works': '전체 프로젝트 아카이브 (Selected Works)',
    'ai-lab': '엔드투엔드 AI 6단계 영상 제작 파이프라인',
    'about': '채수훈 소개 & 10년 시각디자인 경력',
    'education': '실무 중심 디자인·AI 교육 커리큘럼',
    'contact': '채용 · 외주 · 강의 협업 문의',
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#E89565] text-[#17191C] font-sans selection:bg-[#FF4D1C] selection:text-white">
      {/* Full-Screen 3D Game World (Bruno Simon Style) */}
      <BrunoWorld3D
        onSelectProject={handleOpenProject}
        onOpenSectionDrawer={(drawerId) => setActiveDrawer(drawerId)}
        onOpenGuide={() => setIsGuideModalOpen(true)}
        onOpenResume={() => setIsResumeModalOpen(true)}
      />

      {/* In-Game Section Overlay Drawer (Opens when driving into a Portal or clicking HUD buttons) */}
      {activeDrawer && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/70"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0"
            onClick={() => setActiveDrawer(null)}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-6xl max-h-[90vh] bg-[#F6F5F1] border-4 border-[#17191C] shadow-2xl flex flex-col overflow-hidden">
            {/* Arcade Drawer Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#17191C] text-white border-b-2 border-white">
              <div className="flex items-center gap-2.5">
                <Gamepad2 className="w-5 h-5 text-[#FACC15]" />
                <span className="font-display text-base sm:text-lg font-extrabold tracking-tight">
                  {drawerTitles[activeDrawer]}
                </span>
              </div>
              <button
                onClick={() => setActiveDrawer(null)}
                type="button"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FF4D1C] hover:bg-[#345BEB] text-white text-xs font-extrabold transition-colors"
              >
                <span>3D 월드로 돌아가기 (ESC)</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Section Body */}
            <div className="overflow-y-auto flex-1">
              {activeDrawer === 'works' && (
                <WorksSection
                  onSelectProject={(proj) => {
                    handleOpenProject(proj);
                  }}
                />
              )}
              {activeDrawer === 'ai-lab' && <AILabSection />}
              {activeDrawer === 'about' && <AboutSection />}
              {activeDrawer === 'education' && (
                <EducationSection
                  onContactClick={() => setActiveDrawer('contact')}
                />
              )}
              {activeDrawer === 'contact' && (
                <ContactSection
                  onResumeClick={() => setIsResumeModalOpen(true)}
                />
              )}
            </div>
          </div>
        </div>
      )}

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
