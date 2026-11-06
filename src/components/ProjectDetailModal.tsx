import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, Wrench, Package, Sparkles } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectDetailModalProps {
  project: Project | null;
  allProjects: Project[];
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export default function ProjectDetailModal({
  project,
  allProjects,
  isOpen,
  onClose,
  onSelectProject,
}: ProjectDetailModalProps) {
  // ESC key handler and backdrop lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!project) return;
      
      const currentIndex = allProjects.findIndex((p) => p.id === project.id);
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onSelectProject(allProjects[currentIndex - 1]);
      } else if (e.key === 'ArrowRight' && currentIndex < allProjects.length - 1) {
        onSelectProject(allProjects[currentIndex + 1]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, project, allProjects, onClose, onSelectProject]);

  if (!isOpen || !project) return null;

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Click outside backdrop */}
      <div 
        className="absolute inset-0" 
        onClick={onClose}
        aria-hidden="true" 
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#F6F5F1] border border-[#17191C]/20 shadow-2xl flex flex-col overflow-hidden z-10">
        
        {/* Top Control Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#17191C]/10 bg-white/80">
          <div className="flex items-center gap-3 text-xs text-[#74787C]">
            <span className="font-mono text-[#345BEB] font-semibold">{project.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#17191C] font-medium">{project.clientType}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Prev / Next buttons */}
            <div className="flex items-center border border-[#17191C]/15 mr-2">
              <button
                onClick={() => prevProject && onSelectProject(prevProject)}
                disabled={!prevProject}
                type="button"
                className="p-1.5 hover:bg-neutral-100 disabled:opacity-30 disabled:hover:bg-transparent text-[#17191C] transition-colors"
                title={prevProject ? `이전: ${prevProject.title}` : '첫 번째 프로젝트'}
                aria-label="이전 프로젝트"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="w-[1px] h-4 bg-[#17191C]/15" />
              <button
                onClick={() => nextProject && onSelectProject(nextProject)}
                disabled={!nextProject}
                type="button"
                className="p-1.5 hover:bg-neutral-100 disabled:opacity-30 disabled:hover:bg-transparent text-[#17191C] transition-colors"
                title={nextProject ? `다음: ${nextProject.title}` : '마지막 프로젝트'}
                aria-label="다음 프로젝트"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              type="button"
              className="p-2 text-[#17191C] hover:bg-[#17191C] hover:text-white transition-colors"
              aria-label="상세보기 닫기 (ESC)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto px-6 sm:px-10 py-8 space-y-8">
          
          {/* Status draft disclaimer */}
          {project.status === 'draft' && (
            <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                <strong>검증 전 기획안:</strong> 본 카드는 기획안 및 컨셉/교육 산출물 단계이며, 외부 상업 고객 실적이나 성과 지표를 과장하지 않은 초안입니다.
              </span>
            </div>
          )}

          {/* Title and Role */}
          <div>
            <h2 id="modal-title" className="font-display text-2xl sm:text-3xl font-extrabold text-[#17191C] tracking-tight mb-2">
              {project.title}
            </h2>
            <p className="text-base sm:text-lg text-[#74787C] font-medium mb-4">
              {project.subtitle}
            </p>
            <div className="p-4 bg-white border border-[#17191C]/10 text-xs sm:text-sm text-[#17191C]/90">
              <span className="font-semibold text-[#17191C]">수행 역할:</span> {project.role}
            </div>
          </div>

          {/* Main Hero Visual in modal */}
          <div className="border border-[#17191C]/15 bg-neutral-100 overflow-hidden">
            <div className="relative aspect-[16/9] w-full">
              <img
                src={project.heroImage}
                alt={`${project.title} 대표 비주얼`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Problem - Solution - Result 3-Part Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            
            {/* Problem */}
            <div className="p-5 bg-white border border-[#17191C]/10">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#74787C] mb-2 flex items-center gap-1.5">
                <span>01. Problem</span>
              </div>
              <h3 className="font-bold text-sm text-[#17191C] mb-2">당면 과제와 맥락</h3>
              <p className="text-xs sm:text-sm text-[#17191C]/80 leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* Solution */}
            <div className="p-5 bg-white border border-[#345BEB]/30 bg-[#345BEB]/[0.02]">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#345BEB] mb-2 flex items-center gap-1.5">
                <span>02. Solution</span>
              </div>
              <h3 className="font-bold text-sm text-[#17191C] mb-2">접근법 &amp; 제작 워크플로</h3>
              <p className="text-xs sm:text-sm text-[#17191C]/80 leading-relaxed">
                {project.solution}
              </p>
            </div>

            {/* Result */}
            <div className="p-5 bg-white border border-[#17191C]/10">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 mb-2 flex items-center gap-1.5">
                <span>03. Result</span>
              </div>
              <h3 className="font-bold text-sm text-[#17191C] mb-2">도출 결과 및 확장성</h3>
              <p className="text-xs sm:text-sm text-[#17191C]/80 leading-relaxed">
                {project.result}
              </p>
            </div>

          </div>

          {/* Deliverables & Tools Split */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#17191C]/10">
            {/* Deliverables */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-[#17191C] mb-3">
                <Package className="w-4 h-4 text-[#345BEB]" />
                <span>주요 산출물 (Key Deliverables)</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-[#17191C]/85">
                {project.keyDeliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#345BEB] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools Used (Clean unboxed tags) */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-[#17191C] mb-3">
                <Wrench className="w-4 h-4 text-[#74787C]" />
                <span>활용 소프트웨어 &amp; AI 툴</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {project.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-white border border-[#17191C]/15 font-mono text-[#17191C]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
              <p className="text-xs text-[#74787C] mt-3">
                ※ 상업 납품 전 최종 파일(원천 소스, 패키지 가이드, 영상 타임라인)을 검증하여 안전하게 협업에 대응합니다.
              </p>
            </div>
          </div>

        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-4 bg-neutral-100 border-t border-[#17191C]/10 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="text-[#74787C]">
            프로젝트 {currentIndex + 1} / {allProjects.length}
          </div>
          <div className="flex items-center gap-3">
            {prevProject && (
              <button
                onClick={() => onSelectProject(prevProject)}
                className="text-[#17191C] hover:text-[#345BEB] font-medium"
              >
                ← 이전: {prevProject.title}
              </button>
            )}
            {nextProject && (
              <button
                onClick={() => onSelectProject(nextProject)}
                className="text-[#17191C] hover:text-[#345BEB] font-medium"
              >
                다음: {nextProject.title} →
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
