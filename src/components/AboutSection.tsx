import { TIMELINE } from '../data/portfolioData';
import { ShieldCheck, Compass, Users, Sparkles, BookOpen } from 'lucide-react';

export default function AboutSection() {
  const skillCategories = [
    {
      title: '시각디자인 & 브랜딩',
      enTitle: 'Visual & Branding',
      items: ['브랜드 아이덴티티 수립', '로고 & 심볼 시스템', '인쇄물 및 옥외 그래픽', '패키지 & 굿즈 디자인', '타이포그래피 레이아웃']
    },
    {
      title: '생성형 AI & 비디오',
      enTitle: 'AI & Motion Content',
      items: ['Midjourney / Flux 프롬프트', 'Runway / Kling 모션 제어', '캐릭터 일관성 시드 설계', 'ElevenLabs 음성 더빙', 'Premiere Pro 컷편집 & 마스터링']
    },
    {
      title: '교육 기획 & 강의',
      enTitle: 'Curriculum & Teaching',
      items: ['단계별 프로젝트형 교안 집필', '비전공자 눈높이 워크플로 지도', '고교위탁 및 청년 구직자 멘토링', '피드백 루브릭 평가 체계', '기업·기관 실무 특강']
    },
    {
      title: '기획 & 커뮤니티 운영',
      enTitle: 'Planning & Community',
      items: ['10년 보드게임 커뮤니티 운영', '경험 설계 (Experience Design)', '온·오프라인 이벤트 진행', '콘텐츠 카피라이팅 & 마케팅', '문제 정의 및 실행 리딩']
    }
  ];

  return (
    <section id="about" className="py-20 md:py-28 border-b border-[#17191C]/10 bg-[#F6F5F1]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-semibold tracking-widest text-[#345BEB] uppercase mb-2">
            Profile &amp; Journey
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#17191C] tracking-tight mb-4">
            디자인의 조형 감각과<br />
            AI의 실행력을 연결하는 사람
          </h2>
          <p className="text-sm md:text-base text-[#74787C] leading-relaxed">
            10년의 시각디자인 경험은 ‘무엇이 완성도 높은 작업인가’를 식별하는 눈이 되었고, 
            AI 도구에 대한 지속적인 연구는 ‘어떻게 상상을 가장 빠르게 현실로 끄집어낼 것인가’의 힘이 되었습니다.
          </p>
        </div>

        {/* Narrative Split: Introduction & Values */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
          
          <div className="lg:col-span-7 space-y-6 text-[#17191C]/85 text-base sm:text-lg leading-relaxed">
            <p>
              안녕하세요, 크리에이티브 디자이너이자 AI 콘텐츠 교육자 <strong>채수훈</strong>입니다.
            </p>
            <p>
              저는 10년 이상 시각디자인 현장에서 브랜드 아이덴티티, 포스터, 인쇄 홍보물, 행사 비주얼 시스템을 다듬어 왔습니다. 
              인쇄 종이의 질감과 활자의 여백을 고민하던 시간은, 화면 속 픽셀과 생성형 AI의 무수한 결과물 중에서도 
              ‘진짜 조형미와 리듬감’을 분별해내는 흔들리지 않는 뼈대가 되었습니다.
            </p>
            <p>
              생성형 AI가 등장했을 때, 기술에 매몰되거나 두려워하기보다는 
              <strong>‘어떻게 하면 디자이너의 안목으로 AI의 무작위성을 길들이고 실무 결과물로 완성할 수 있을까?’</strong>를 고민했습니다. 
              스토리 기획부터 캐릭터 일관성 제어, 모션, 사운드, 그리고 프리미어 프로 정밀 컷편집까지 이어지는 
              엔드투엔드 파이프라인을 구축한 이유입니다.
            </p>
            <p className="text-sm text-[#74787C] pt-2">
              또한 10년가량 300명 규모의 보드게임 커뮤니티를 운영해 온 경험은, 
              복잡한 규칙과 도구를 누구나 이해할 수 있는 언어로 풀어 설명하는 교육자로서의 태도를 만들어 주었습니다.
            </p>
          </div>

          <div className="lg:col-span-5 bg-white border border-[#17191C]/15 p-8 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#345BEB] font-bold mb-4">
                Creative Mindset
              </div>
              <h3 className="font-display text-xl font-bold text-[#17191C] mb-6">
                “도구는 바뀌어도,<br />좋은 것을 알아보는 눈은 남는다.”
              </h3>
              
              <ul className="space-y-4 text-xs sm:text-sm text-[#17191C]/80">
                <li className="flex items-start gap-3">
                  <Compass className="w-5 h-5 text-[#345BEB] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#17191C] block">디자이너의 조형 기본기</strong>
                    그리드, 타이포그래피, 대비와 여백의 감각을 지킵니다.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#345BEB] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#17191C] block">AI를 활용한 빠른 실행</strong>
                    기획 아이디어를 당일 시각화하고 프로토타이핑합니다.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-[#345BEB] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#17191C] block">학습자와 고객을 향한 명료함</strong>
                    현학적인 용어 대신 손에 잡히는 결과물로 증명합니다.
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-[#17191C]/10 text-xs text-[#74787C]">
              ※ 경력 및 대외 공개 소속은 협의 및 검증 절차 후 확정될 예정입니다.
            </div>
          </div>

        </div>

        {/* Experience Timeline */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#17191C]/10">
            <h3 className="font-display text-2xl font-bold text-[#17191C]">
              주요 경력 타임라인
            </h3>
            <span className="text-xs font-mono text-[#74787C]">
              Experience (2014 — Present)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TIMELINE.map((item, idx) => (
              <div 
                key={idx}
                className="p-6 bg-white border border-[#17191C]/10 hover:border-[#17191C]/30 transition-colors"
              >
                <div className="flex items-center justify-between text-xs text-[#74787C] font-mono mb-2">
                  <span className="text-[#345BEB] font-semibold">{item.period}</span>
                  <span>{item.organization}</span>
                </div>
                <h4 className="font-display text-base font-bold text-[#17191C] mb-1">
                  {item.title}
                </h4>
                <div className="text-xs font-medium text-[#74787C] mb-3">
                  {item.role}
                </div>
                <p className="text-xs sm:text-sm text-[#17191C]/80 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Competencies Matrix */}
        <div>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#17191C]/10">
            <h3 className="font-display text-2xl font-bold text-[#17191C]">
              보유 역량 &amp; 스킬셋
            </h3>
            <span className="text-xs font-mono text-[#74787C]">
              Skills &amp; Methodologies
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((cat, idx) => (
              <div key={idx} className="p-6 bg-white border border-[#17191C]/10">
                <div className="text-[11px] font-mono uppercase text-[#345BEB] font-semibold mb-1">
                  {cat.enTitle}
                </div>
                <h4 className="font-bold text-base text-[#17191C] mb-4">
                  {cat.title}
                </h4>
                <ul className="space-y-2 text-xs text-[#17191C]/85">
                  {cat.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2">
                      <span className="text-[#345BEB] font-bold">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
