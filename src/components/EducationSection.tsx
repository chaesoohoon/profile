import { TEACHING_PILLARS } from '../data/portfolioData';
import { BookOpen, CheckCircle, Video, GraduationCap, Users2, ArrowRight } from 'lucide-react';

interface EducationProps {
  onContactClick: () => void;
}

export default function EducationSection({ onContactClick }: EducationProps) {
  const courses = [
    {
      title: 'AI 숏폼 영상 제작 실무 (4~8주)',
      target: '크리에이터, 예비 마케터, 비전공자',
      format: '주 1~2회 오프라인/실시간 온라인',
      summary: '스토리 기획부터 Midjourney 키프레임, Runway 모션, ElevenLabs 더빙, Premiere Pro 최종 마스터링까지 1인 1완성작 제작.',
      points: [
        '알고리즘을 관통하는 3초 훅 시나리오 작성',
        '캐릭터 시드 번호 고정 및 일관성 있는 컷 생성',
        '오디오 믹싱과 자막 리듬 컷편집 테크닉',
        '유튜브 쇼츠 / 인스타그램 릴스 최종 발행'
      ]
    },
    {
      title: '비전공자를 위한 시각디자인 기초 (6주)',
      target: '창업 준비생, 실무 기획자, 취업 준비생',
      format: '실습 중심 소규모 워크숍',
      summary: '복잡한 툴 테크닉 이전에 그리드, 타이포그래피, 컬러 매칭 원리를 익혀 브랜드 아이덴티티와 포스터를 완성합니다.',
      points: [
        '눈에 띄는 활자 크기 대비와 위계 법칙',
        '인쇄 매체와 디지털 스크린의 해상도 규격',
        '일러스트레이터·포토샵 필수 숏컷과 워크플로',
        '실제 납품 가능한 인쇄 데이터 감리'
      ]
    },
    {
      title: '기관·기업 AI 크리에이티브 원데이 특강 (3~6시간)',
      target: '기업 사내 크리에이터, 공공기관 홍보 담당자',
      format: '집체 교육 / 실습 연계 특강',
      summary: '사내 홍보 콘텐츠 제작 시 AI를 즉각 활용할 수 있도록 실전 프롬프트 템플릿과 카드뉴스·홍보 숏폼 워크플로를 전수합니다.',
      points: [
        '실무에 바로 쓰는 프롬프트 템플릿 30종 제공',
        '저작권 및 상업적 사용 권리 안전 가이드',
        '당일 실습을 통한 15초 홍보 영상 프로토타입 완성'
      ]
    }
  ];

  return (
    <section id="education" className="py-20 md:py-28 border-b border-[#17191C]/10 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-semibold tracking-widest text-[#345BEB] uppercase mb-2">
            Pedagogy &amp; Curriculum
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#17191C] tracking-tight mb-4">
            도구를 넘어 결과물로 이끄는<br />
            실무 중심 교육 철학
          </h2>
          <p className="text-sm md:text-base text-[#74787C] leading-relaxed">
            성인 직무 전환자, 청년 구직자, 고교 위탁생까지 다양한 학습자들의 출발선에 맞추어 
            좌절 없이 완주할 수 있는 구조화된 수업을 설계합니다.
          </p>
        </div>

        {/* 3 Teaching Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {TEACHING_PILLARS.map((pillar) => (
            <div 
              key={pillar.number}
              className="p-8 bg-[#F6F5F1] border border-[#17191C]/10 flex flex-col justify-between"
            >
              <div>
                <div className="font-mono text-2xl font-bold text-[#345BEB] mb-4">
                  {pillar.number}
                </div>
                <h3 className="font-display text-xl font-bold text-[#17191C] mb-1">
                  {pillar.title}
                </h3>
                <div className="text-xs font-mono text-[#74787C] mb-4">
                  {pillar.enTitle}
                </div>
                <p className="text-sm text-[#17191C]/80 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#17191C]/10 flex items-center text-xs text-[#345BEB] font-semibold">
                <span>실습 중심 커리큘럼 반영</span>
              </div>
            </div>
          ))}
        </div>

        {/* Course Modules Showcase */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#17191C]/10">
            <div>
              <h3 className="font-display text-2xl font-bold text-[#17191C]">
                주요 강의 &amp; 워크숍 과정
              </h3>
              <p className="text-xs text-[#74787C] mt-1">
                기관 상황 및 학습자 수준에 따라 커스텀 모듈 편성이 가능합니다.
              </p>
            </div>
            <button
              onClick={onContactClick}
              type="button"
              className="text-xs font-semibold text-[#345BEB] hover:underline flex items-center gap-1 shrink-0"
            >
              <span>강의 제안서 및 출강 문의</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {courses.map((course, idx) => (
              <div 
                key={idx}
                className="p-8 bg-white border border-[#17191C]/15 flex flex-col justify-between hover:border-[#345BEB] transition-colors"
              >
                <div>
                  <div className="text-[11px] font-mono text-[#74787C] mb-2 flex items-center justify-between">
                    <span>Target: {course.target}</span>
                  </div>
                  <h4 className="font-display text-lg font-bold text-[#17191C] mb-3">
                    {course.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#17191C]/80 leading-relaxed mb-6">
                    {course.summary}
                  </p>
                  
                  <div className="space-y-2 border-t border-[#17191C]/10 pt-4 mb-6">
                    <div className="text-xs font-semibold text-[#17191C] mb-2">
                      주요 학습 내용
                    </div>
                    {course.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2 text-xs text-[#17191C]/85">
                        <CheckCircle className="w-3.5 h-3.5 text-[#345BEB] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#17191C]/10 text-xs font-mono text-[#74787C]">
                  형태: {course.format}
                </div>
              </div>
            ))}
          </div>

          {/* Institutional note */}
          <div className="mt-8 p-4 bg-[#F6F5F1] border border-[#17191C]/10 text-xs text-[#74787C] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span>
              ※ 학생 작품, 출강 기관명 및 사진 자료는 초상권 및 기관 공개 협의 후 정식 반영될 예정입니다.
            </span>
            <span className="font-mono text-[#17191C] shrink-0 font-medium">
              직업능력개발훈련교사 자격 및 교안 보유
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
