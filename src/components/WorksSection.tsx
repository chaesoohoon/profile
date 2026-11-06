import { useState } from 'react';
import { ArrowUpRight, Filter, AlertCircle } from 'lucide-react';
import { Project, PROJECTS } from '../data/portfolioData';

interface WorksSectionProps {
  onSelectProject: (project: Project) => void;
}

type FilterCategory = 'all' | 'branding' | 'graphic' | 'ai' | 'editorial' | 'education';

export default function WorksSection({ onSelectProject }: WorksSectionProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const filterTabs: { id: FilterCategory; label: string; count: number }[] = [
    { id: 'all', label: '전체 (All)', count: PROJECTS.length },
    { id: 'branding', label: '브랜딩 (Branding)', count: PROJECTS.filter(p => p.category === 'branding').length },
    { id: 'graphic', label: '그래픽·행사 (Graphic & Event)', count: PROJECTS.filter(p => p.category === 'graphic').length },
    { id: 'ai', label: 'AI·모션 (AI & Motion)', count: PROJECTS.filter(p => p.category === 'ai').length },
    { id: 'editorial', label: '출판·편집 (Editorial)', count: PROJECTS.filter(p => p.category === 'editorial').length },
    { id: 'education', label: '교육 (Education)', count: PROJECTS.filter(p => p.category === 'education').length },
  ];

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="works" className="py-20 md:py-28 border-b border-[#17191C]/10 bg-[#F6F5F1]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold tracking-widest text-[#345BEB] uppercase mb-2">
              Selected Works &amp; Case Studies
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#17191C] tracking-tight">
              실무 성과와 제작 아카이브
            </h2>
          </div>
          
          <p className="text-sm text-[#74787C] max-w-md">
            브랜딩·인쇄물부터 AI 숏폼 파이프라인 및 교육 과정까지, 문제 해결을 위한 제작 기록입니다.
          </p>
        </div>

        {/* Filter Bar (Functional segmented buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar border-b border-[#17191C]/10">
          <div className="flex items-center gap-1.5 p-1 bg-white border border-[#17191C]/15">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  type="button"
                  className={`px-3.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-all duration-150 ${
                    isActive
                      ? 'bg-[#17191C] text-white shadow-xs font-semibold'
                      : 'text-[#17191C]/70 hover:text-[#17191C] hover:bg-neutral-100'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`ml-1.5 text-[10px] font-mono ${isActive ? 'text-white/80' : 'text-[#74787C]'}`}>
                    ({tab.count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Notice on draft status */}
        <div className="mb-8 p-3 bg-white/70 border border-[#17191C]/10 text-xs text-[#74787C] flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-[#345BEB]" />
            <span>임시 카드는 [Concept / Personal Project]로 명시하여 외부 실적을 왜곡하지 않도록 분류했습니다.</span>
          </span>
          <span className="font-mono text-[11px] text-[#17191C]/60">총 {filteredProjects.length}개 프로젝트</span>
        </div>

        {/* Project Cards Grid (Dynamic Bento / 3-Column Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group cursor-pointer flex flex-col justify-between bg-white border border-[#17191C]/10 hover:border-[#345BEB] transition-all duration-300 hover:shadow-xl overflow-hidden"
            >
              <div>
                {/* Visual Frame with Hover Scale */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 border-b border-[#17191C]/10">
                  <img
                    src={project.heroImage}
                    alt={`${project.title} 프로젝트 썸네일`}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 p-1.5 bg-white/90 backdrop-blur-xs text-[#17191C] group-hover:bg-[#345BEB] group-hover:text-white transition-colors shadow-xs">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  
                  {/* Unboxed Metadata (Zero pill discipline) */}
                  <div className="flex items-center gap-2 text-xs text-[#74787C] mb-2 font-mono">
                    <span className="text-[#345BEB] font-semibold">{project.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.year}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#17191C]/70 truncate max-w-[140px]">{project.clientType}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-[#17191C] group-hover:text-[#345BEB] transition-colors mb-2 line-clamp-1">
                    {project.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-xs sm:text-sm text-[#74787C] mb-4 line-clamp-2 leading-relaxed">
                    {project.subtitle}
                  </p>

                  {/* 1-Line Problem - Solution summary */}
                  <div className="p-3 bg-[#F6F5F1] border border-[#17191C]/5 text-xs text-[#17191C]/80 mb-4 space-y-1">
                    <div className="line-clamp-1">
                      <strong className="text-[#17191C]">목표:</strong> {project.problem}
                    </div>
                    <div className="line-clamp-1">
                      <strong className="text-[#345BEB]">해결:</strong> {project.solution}
                    </div>
                  </div>

                </div>
              </div>

              {/* Card Footer: Tools & CTA */}
              <div className="px-6 pb-6 pt-0 flex items-center justify-between gap-2 border-t border-[#17191C]/5 pt-4">
                <div className="flex items-center gap-1.5 overflow-hidden">
                  {project.tools.slice(0, 3).map((tool, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono text-[#74787C] bg-neutral-100 px-1.5 py-0.5 whitespace-nowrap"
                    >
                      {tool}
                    </span>
                  ))}
                  {project.tools.length > 3 && (
                    <span className="text-[10px] text-[#74787C] font-mono">
                      +{project.tools.length - 3}
                    </span>
                  )}
                </div>

                <span className="text-xs font-semibold text-[#17191C] group-hover:text-[#345BEB] transition-colors whitespace-nowrap">
                  상세 보기 →
                </span>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
