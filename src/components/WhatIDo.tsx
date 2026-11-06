import { DISCIPLINES } from '../data/portfolioData';
import { ArrowUpRight } from 'lucide-react';

interface WhatIDoProps {
  onSelectCategory?: (category: string) => void;
}

export default function WhatIDo({ onSelectCategory }: WhatIDoProps) {
  return (
    <section className="py-20 md:py-28 border-b border-[#17191C]/10 bg-[#F6F5F1]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-[#17191C]/10">
          <div>
            <div className="text-xs font-semibold tracking-widest text-[#345BEB] uppercase mb-2">
              Capabilities &amp; Services
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#17191C] tracking-tight">
              무엇을 만들고 연결하는가
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#74787C] max-w-md">
            10년의 시각디자인 조형 감각과 실전 생성형 AI 기술, 그리고 사람을 향한 교육과 기획의 4가지 축입니다.
          </p>
        </div>

        {/* 4 Core Disciplines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {DISCIPLINES.map((discipline) => (
            <div
              key={discipline.number}
              className="group flex flex-col justify-between p-8 bg-white border border-[#17191C]/10 hover:border-[#345BEB]/50 transition-all duration-300 hover:shadow-lg relative"
            >
              <div>
                {/* Editorial Number */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-2xl font-bold text-[#17191C]/30 group-hover:text-[#345BEB] transition-colors">
                    {discipline.number}
                  </span>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[#17191C]/20 group-hover:text-[#345BEB] group-hover:bg-[#345BEB]/10 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Titles */}
                <h3 className="font-display text-xl font-bold text-[#17191C] group-hover:text-[#345BEB] transition-colors mb-1">
                  {discipline.title}
                </h3>
                <div className="text-xs font-semibold text-[#74787C] mb-4">
                  {discipline.titleKo}
                </div>

                {/* Description */}
                <p className="text-sm text-[#17191C]/80 leading-relaxed mb-6">
                  {discipline.description}
                </p>
              </div>

              {/* Items List (No pills, clean unboxed typographic listing) */}
              <div className="pt-6 border-t border-[#17191C]/10">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#74787C] mb-3">
                  Key Scope
                </div>
                <ul className="space-y-2 text-xs text-[#17191C]/90">
                  {discipline.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#345BEB] font-bold select-none">·</span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
