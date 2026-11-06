import { useState } from 'react';
import { AI_WORKFLOW_STEPS } from '../data/portfolioData';
import { Sparkles, Sliders, Play, Volume2, Film, Check, ArrowRight, Lightbulb } from 'lucide-react';

export default function AILabSection() {
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);
  const currentStep = AI_WORKFLOW_STEPS[selectedStepIndex];

  return (
    <section id="ai-lab" className="py-20 md:py-28 border-b border-[#17191C]/10 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-semibold tracking-widest text-[#345BEB] uppercase mb-2">
            AI Content Pipeline &amp; Methodology
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#17191C] tracking-tight mb-4">
            디자인 감각으로 통제하는<br />
            엔드투엔드 AI 영상 워크플로
          </h2>
          <p className="text-sm md:text-base text-[#74787C] leading-relaxed">
            프롬프트를 무작위로 뽑아내는 것이 아닌, 캐릭터 시드 고정, 카메라 모션 통제, 
            프리미어 프로 타임라인 정밀 편집으로 완성도를 제어하는 6단계 파이프라인입니다.
          </p>
        </div>

        {/* 6 Steps Horizontal Stepper / Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {AI_WORKFLOW_STEPS.map((step, idx) => {
            const isSelected = selectedStepIndex === idx;
            return (
              <button
                key={step.step}
                onClick={() => setSelectedStepIndex(idx)}
                type="button"
                className={`p-4 text-left border transition-all duration-200 relative ${
                  isSelected
                    ? 'border-[#345BEB] bg-[#F6F5F1] shadow-sm'
                    : 'border-[#17191C]/10 bg-white hover:border-[#17191C]/30 hover:bg-[#F6F5F1]/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono text-sm font-bold ${isSelected ? 'text-[#345BEB]' : 'text-[#74787C]'}`}>
                    {step.step}
                  </span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 bg-[#345BEB] rounded-full" />
                  )}
                </div>
                <div className="text-xs font-bold text-[#17191C] line-clamp-1 mb-0.5">
                  {step.name}
                </div>
                <div className="text-[10px] font-mono text-[#74787C] truncate">
                  {step.enName}
                </div>
              </button>
            );
          })}
        </div>

        {/* Deep Dive Interactive Panel */}
        <div className="bg-[#F6F5F1] border border-[#17191C]/15 p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Step details */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 bg-[#17191C] text-white font-mono text-xs font-bold">
                  STEP {currentStep.step}
                </span>
                <span className="text-xs font-mono text-[#74787C] uppercase tracking-wider">
                  {currentStep.enName}
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-[#17191C] mb-3">
                  {currentStep.name}
                </h3>
                <p className="text-sm md:text-base text-[#17191C]/80 leading-relaxed">
                  {currentStep.description}
                </p>
              </div>

              {/* Tools list for this step */}
              <div className="pt-4 border-t border-[#17191C]/10">
                <div className="text-xs font-semibold text-[#17191C] mb-2">
                  이 단계에서 활용하는 도구
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentStep.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white border border-[#17191C]/15 font-mono text-xs text-[#17191C]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Chae Soohoon's Pro Tip */}
              <div className="p-4 bg-white border border-[#345BEB]/30 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-[#345BEB] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#345BEB] uppercase font-mono tracking-wider mb-1">
                    실무자 노하우 (Director's Note)
                  </div>
                  <p className="text-xs sm:text-sm text-[#17191C]/90 leading-relaxed">
                    {currentStep.keyTip}
                  </p>
                </div>
              </div>

            </div>

            {/* Right: Pipeline Visual Context Box */}
            <div className="lg:col-span-5 bg-white border border-[#17191C]/10 p-6 space-y-6">
              <div className="text-xs font-mono uppercase tracking-wider text-[#74787C] border-b border-[#17191C]/10 pb-3 flex items-center justify-between">
                <span>Pipeline Architecture</span>
                <span className="text-[#345BEB] font-bold">Total 6 Stages</span>
              </div>

              {/* Vertical Mini-Flow */}
              <div className="space-y-3">
                {AI_WORKFLOW_STEPS.map((s, idx) => {
                  const isActive = idx === selectedStepIndex;
                  const isPassed = idx < selectedStepIndex;

                  return (
                    <div
                      key={s.step}
                      onClick={() => setSelectedStepIndex(idx)}
                      className={`cursor-pointer p-2.5 flex items-center justify-between text-xs transition-colors ${
                        isActive
                          ? 'bg-[#17191C] text-white font-semibold'
                          : isPassed
                          ? 'bg-[#F6F5F1] text-[#17191C] hover:bg-neutral-200/60'
                          : 'text-[#74787C] hover:text-[#17191C] hover:bg-neutral-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[11px] opacity-70">
                          {s.step}
                        </span>
                        <span>{s.name}</span>
                      </div>
                      <span className="text-[11px] font-mono opacity-80">
                        {s.tools[0]}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Workflow Philosophy Callout */}
              <div className="p-3 bg-neutral-50 text-[11px] text-[#74787C] leading-snug border border-[#17191C]/5">
                💡 <strong>수업 및 외주 적용:</strong> 이 흐름은 수강생들이 4주 만에 한 편의 완성된 숏폼을 제작하거나 외주 영상 프로젝트를 예측 가능하게 통제할 수 있는 검증된 프레임워크입니다.
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
