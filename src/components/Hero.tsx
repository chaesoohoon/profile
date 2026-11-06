import { ArrowRight, Sparkles, Layers, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onExploreWorks: () => void;
  onContactClick: () => void;
}

export default function Hero({ onExploreWorks, onContactClick }: HeroProps) {
  return (
    <section className="relative pt-12 md:pt-20 pb-16 md:pb-24 border-b border-[#17191C]/10 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        
        {/* Verification Alert Banner (Clean, editorial styling) */}
        <div className="mb-8 p-3.5 bg-amber-50/80 border border-amber-200/80 text-amber-950 text-xs md:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
            <span>[1차 기획안 상태] 공개 전 사실·작품·대외 공개 범위 확인 단계입니다.</span>
          </div>
          <span className="text-amber-700/80 text-xs font-mono">
            Draft v1.0 · Updated 2026.11
          </span>
        </div>

        {/* 2-Column Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Kicker (Clean unboxed text, zero pill) */}
            <div className="flex items-center gap-2 text-xs md:text-sm font-semibold tracking-widest text-[#345BEB] uppercase mb-4">
              <span>DESIGN</span>
              <span aria-hidden="true" className="text-[#17191C]/30">×</span>
              <span>AI CONTENT</span>
              <span aria-hidden="true" className="text-[#17191C]/30">×</span>
              <span>EDUCATION</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#17191C] leading-[1.12] tracking-tight mb-4 text-balance">
              디자인의 경험에<br />
              <span className="text-[#345BEB]">AI의 가능성</span>을 더하다.
            </h1>

            {/* English Subtitle */}
            <p className="font-display text-lg sm:text-xl font-medium text-[#74787C] mb-6">
              Creative Designer &amp; AI Content Educator — 채수훈
            </p>

            {/* Lead Prose */}
            <p className="text-base sm:text-lg text-[#17191C]/80 leading-relaxed max-w-2xl mb-8 font-normal">
              10년 이상의 시각디자인 실무 조형 감각을 바탕으로 브랜딩, 그래픽, 홍보 콘텐츠, 
              행사 디자인부터 생성형 AI 기반 영상·숏폼 제작과 교육을 연결합니다. 
              기술에 매몰되지 않고 사람의 감각으로 완성도를 결정짓는 크리에이티브 파트너입니다.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onExploreWorks}
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-[#17191C] hover:bg-[#345BEB] text-white font-semibold text-sm transition-all duration-200 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#345BEB]"
              >
                <span>대표 프로젝트 보기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={onContactClick}
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent border border-[#17191C]/30 hover:border-[#17191C] text-[#17191C] font-semibold text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#345BEB]"
              >
                <span>협업 및 강의 문의</span>
              </button>
            </div>

            {/* Quick target roles note */}
            <div className="mt-8 pt-6 border-t border-[#17191C]/10 w-full flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#74787C]">
              <span className="font-semibold text-[#17191C]">주요 협업 분야:</span>
              <span>문화예술·공공기관 채용</span>
              <span aria-hidden="true">·</span>
              <span>브랜딩 &amp; 행사 외주 제작</span>
              <span aria-hidden="true">·</span>
              <span>기업·기관 AI 숏폼 특강</span>
            </div>
          </div>

          {/* Right Column: Visual Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full overflow-hidden bg-neutral-200 border border-[#17191C]/15 shadow-sm group">
              <img
                src="/src/assets/images/hero_editorial_workspace_1793930283847.jpg"
                alt="채수훈 디자이너의 에디토리얼 워크스페이스 및 타이포그래피 스펙"
                referrerPolicy="no-referrer"
                loading="eager"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Subtle caption overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                <p className="text-xs font-mono font-medium tracking-wide">
                  Physical Craft &amp; Generative AI Workflow
                </p>
                <p className="text-[11px] text-white/80 mt-0.5">
                  감각적인 조형 기본기 위에 기술을 얹는 제작 철학
                </p>
              </div>
            </div>

            {/* Decorative subtle accent badge */}
            <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-[#F6F5F1] border border-[#17191C]/15 p-3 shadow-md items-center gap-3">
              <div className="w-8 h-8 bg-[#345BEB] text-white flex items-center justify-center font-bold text-xs">
                AI
              </div>
              <div className="text-left text-xs pr-2">
                <span className="block font-bold text-[#17191C]">Midjourney → Premiere</span>
                <span className="text-[#74787C] text-[11px]">End-to-End Pipeline</span>
              </div>
            </div>
          </div>

        </div>

        {/* Full-Width Key Metrics Strip */}
        <div className="mt-16 md:mt-20 pt-10 border-t border-[#17191C]/15 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="font-display text-3xl md:text-4xl font-extrabold text-[#17191C] tabular-nums tracking-tight">
              10<span className="text-[#345BEB]">+</span>년
            </div>
            <div className="text-xs md:text-sm font-semibold text-[#17191C] mt-1">시각디자인 실무</div>
            <p className="text-xs text-[#74787C] mt-0.5">브랜딩, 인쇄, 그래픽, 홍보물</p>
          </div>

          <div>
            <div className="font-display text-3xl md:text-4xl font-extrabold text-[#17191C] tabular-nums tracking-tight">
              4<span className="text-[#345BEB]">개</span>
            </div>
            <div className="text-xs md:text-sm font-semibold text-[#17191C] mt-1">핵심 전문 영역</div>
            <p className="text-xs text-[#74787C] mt-0.5">브랜딩 · 그래픽 · AI · 교육</p>
          </div>

          <div>
            <div className="font-display text-3xl md:text-4xl font-extrabold text-[#17191C] tracking-tight">
              One-Stop
            </div>
            <div className="text-xs md:text-sm font-semibold text-[#17191C] mt-1">AI 숏폼 파이프라인</div>
            <p className="text-xs text-[#74787C] mt-0.5">기획부터 프리미어 마스터링</p>
          </div>

          <div>
            <div className="font-display text-3xl md:text-4xl font-extrabold text-[#17191C] tabular-nums tracking-tight">
              500<span className="text-[#345BEB]">+</span>명
            </div>
            <div className="text-xs md:text-sm font-semibold text-[#17191C] mt-1">교육생 멘토링</div>
            <p className="text-xs text-[#74787C] mt-0.5">직업훈련 및 실무 워크숍</p>
          </div>
        </div>

      </div>
    </section>
  );
}
