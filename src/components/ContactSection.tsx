import { useState } from 'react';
import { Mail, Copy, Check, FileText, ArrowUpRight, Send, ShieldAlert, Sparkles } from 'lucide-react';

interface ContactSectionProps {
  onResumeClick: () => void;
}

export default function ContactSection({ onResumeClick }: ContactSectionProps) {
  const [selectedTopic, setSelectedTopic] = useState<'recruitment' | 'design' | 'ai' | 'lecture'>('recruitment');
  const [copied, setCopied] = useState(false);
  const email = 'tmxbvlem@gmail.com';

  const topics = [
    {
      id: 'recruitment' as const,
      label: '채용 제안',
      enLabel: 'Career & In-house',
      subject: '[채용 제안] 채수훈 디자이너님께 포지션 제안을 드립니다',
      body: '안녕하세요, [회사/기관명]의 [담당자 이름]입니다.\n채수훈 디자이너님의 포트폴리오를 확인하고 [포지션명/직무] 관련하여 대화를 나누고 싶어 연락드립니다.\n\n- 소속/기관:\n- 제안 포지션:\n- 주요 업무:\n- 근무 형태 및 일정:'
    },
    {
      id: 'design' as const,
      label: '브랜드·홍보 디자인 외주',
      enLabel: 'Branding & Graphics',
      subject: '[외주 문의] 브랜드/행사 그래픽 디자인 제작 의뢰 건',
      body: '안녕하세요, 채수훈 디자이너님.\n[프로젝트명/브랜드명]의 디자인 제작 협업을 의뢰하고자 합니다.\n\n- 프로젝트 개요:\n- 필요 산출물 (로고/포스터/패키지 등):\n- 예상 일정 및 납품 희망일:\n- 가용 예산 범위:'
    },
    {
      id: 'ai' as const,
      label: 'AI 영상·콘텐츠 협업',
      enLabel: 'AI Video & Motion',
      subject: '[AI 협업 문의] 생성형 AI 기반 영상/숏폼 제작 의뢰 건',
      body: '안녕하세요, 채수훈 디자이너님.\n생성형 AI를 활용한 [숏폼/캐릭터/영상] 프로젝트 협업을 제안드립니다.\n\n- 콘텐츠 목적:\n- 필요 분량 및 편수:\n- 메인 컨셉 및 레퍼런스:\n- 제작 마감 희망일:'
    },
    {
      id: 'lecture' as const,
      label: '기업·기관 강의 및 특강',
      enLabel: 'Lectures & Workshops',
      subject: '[강의 의뢰] 디자인 및 AI 실무 강의/특강 요청 건',
      body: '안녕하세요, [기관/학교/기업명]의 [담당자 이름]입니다.\n[과정명/행사명] 관련하여 출강을 요청드리고자 합니다.\n\n- 교육 대상 및 인원:\n- 희망 주제 (AI 숏폼/디자인 기초/기타):\n- 희망 일정 및 시간:\n- 강사료 기준:'
    }
  ];

  const currentTopic = topics.find((t) => t.id === selectedTopic) || topics[0];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(currentTopic.subject)}&body=${encodeURIComponent(currentTopic.body)}`;

  return (
    <section id="contact" className="py-20 md:py-28 border-b border-[#17191C]/10 bg-[#F6F5F1]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-semibold tracking-widest text-[#345BEB] uppercase mb-2">
            Initiate Conversation
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#17191C] tracking-tight mb-4">
            새로운 가능성을 함께 시작하세요
          </h2>
          <p className="text-sm md:text-base text-[#74787C] leading-relaxed">
            문화예술·공공기관 채용, 브랜드 디자인 및 숏폼 영상 외주, 직업교육 및 사내 특강 협업을 환영합니다. 
            의뢰 목적에 맞는 템플릿으로 메일을 보내실 수 있습니다.
          </p>
        </div>

        {/* 2-Column Contact Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Contact Information & Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Email Card */}
            <div className="p-8 bg-white border border-[#17191C]/15 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-[#74787C]">Direct Email</span>
                <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                  24시간 내 회신
                </span>
              </div>

              <div>
                <div className="text-xs text-[#74787C] mb-1">공식 연락처</div>
                <div className="font-display text-lg sm:text-xl font-bold text-[#17191C] break-all select-all">
                  {email}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleCopyEmail}
                  type="button"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 border border-[#17191C]/20 hover:border-[#17191C] bg-[#F6F5F1] text-xs font-semibold text-[#17191C] transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">복사 완료!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>이메일 주소 복사</span>
                    </>
                  )}
                </button>

                <a
                  href={mailtoUrl}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#17191C] hover:bg-[#345BEB] text-xs font-semibold text-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>메일 작성하기</span>
                </a>
              </div>
            </div>

            {/* Resume Request Card */}
            <div className="p-6 bg-white border border-[#17191C]/10 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#17191C]">
                  <FileText className="w-4 h-4 text-[#345BEB]" />
                  <span>상세 이력서 (PDF / Portfolio)</span>
                </div>
                <p className="text-xs text-[#74787C]">
                  경력 증명 및 상세 포트폴리오 PDF 열람 신청
                </p>
              </div>

              <button
                onClick={onResumeClick}
                type="button"
                className="px-3.5 py-2 text-xs font-semibold text-[#17191C] border border-[#17191C]/20 hover:border-[#345BEB] hover:text-[#345BEB] transition-colors whitespace-nowrap"
              >
                열람 안내
              </button>
            </div>

            {/* Scope of Availability */}
            <div className="p-5 bg-neutral-100/70 border border-[#17191C]/10 text-xs text-[#74787C] space-y-2">
              <div className="font-semibold text-[#17191C]">협업 가능 분야 안내</div>
              <ul className="space-y-1 text-[#17191C]/80">
                <li>· 기관/기업 풀타임 및 프로젝트 계약직 채용</li>
                <li>· 신규 브랜드 아이덴티티 및 행사 그래픽 외주</li>
                <li>· 생성형 AI 영상 숏폼 파일럿 제작 및 프로토타이핑</li>
                <li>· 직업학교, 공공기관, 기업 직무 특강 출강</li>
              </ul>
            </div>

          </div>

          {/* Right: Interactive Inquiry Subject & Mailto Generator */}
          <div className="lg:col-span-7 bg-white border border-[#17191C]/15 p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#17191C]/10">
                <span className="text-xs font-mono uppercase text-[#345BEB] font-bold">
                  Step 1. 문의 분야 선택
                </span>
                <span className="text-xs text-[#74787C]">
                  선택 시 메일 양식이 자동 준비됩니다
                </span>
              </div>

              {/* Inquiry Type Radio Selector (Functional buttons, not fake form) */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {topics.map((t) => {
                  const isSelected = selectedTopic === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTopic(t.id)}
                      type="button"
                      className={`p-3 text-left border transition-all ${
                        isSelected
                          ? 'border-[#345BEB] bg-[#345BEB]/5 font-semibold text-[#17191C]'
                          : 'border-[#17191C]/15 text-[#74787C] hover:text-[#17191C] hover:border-[#17191C]/40'
                      }`}
                    >
                      <div className="text-xs font-bold text-[#17191C]">{t.label}</div>
                      <div className="text-[10px] font-mono text-[#74787C]">{t.enLabel}</div>
                    </button>
                  );
                })}
              </div>

              {/* Step 2: Subject & Body Preview */}
              <div className="space-y-3 mb-6">
                <div className="text-xs font-mono uppercase text-[#74787C]">
                  Step 2. 메일 제목 &amp; 본문 템플릿 미리보기
                </div>
                
                <div className="p-3 bg-[#F6F5F1] border border-[#17191C]/10 text-xs font-mono text-[#17191C]">
                  <span className="text-[#74787C] mr-2">Subject:</span>
                  {currentTopic.subject}
                </div>

                <div className="p-4 bg-[#F6F5F1] border border-[#17191C]/10 text-xs font-mono text-[#17191C]/90 whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto">
                  {currentTopic.body}
                </div>
              </div>

            </div>

            {/* Direct Open Mail Client */}
            <div className="pt-4 border-t border-[#17191C]/10">
              <a
                href={mailtoUrl}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-[#345BEB] hover:bg-[#2B4CBA] text-white font-semibold text-sm transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>선택한 양식으로 메일 프로그램 열기 (mailto)</span>
              </a>
              <p className="text-[11px] text-center text-[#74787C] mt-2">
                ※ 기본 메일 클라이언트가 열리지 않을 경우 상단의 '이메일 주소 복사'를 이용해 주시기 바랍니다.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
