import { X, CheckSquare, FolderTree, Image, FileCode, CheckCircle2 } from 'lucide-react';

interface SiteGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SiteGuideModal({ isOpen, onClose }: SiteGuideModalProps) {
  if (!isOpen) return null;

  const checklistItems = [
    { title: '대표 직함 확정', desc: '크리에이티브 디자이너 & AI 콘텐츠 교육자 명칭 및 메인 카피 확정' },
    { title: '프로필 사진 및 표기', desc: '채수훈 본인 실물 프로필 사진 또는 스튜디오 룩북 이미지 삽입' },
    { title: '경력 소속 & 대외 공개 범위', desc: '10년 경력의 실제 소속 회사명, 직책, 재직 기간의 대외 공개 가능 여부' },
    { title: '프로젝트 저작권 및 상태 표시', desc: '괴물편의점, 시간을 파는 가게, 피곤한 판다 등 개인작/교육작/상업작 권리 검증' },
    { title: '실제 이메일 & SNS 링크', desc: 'tmxbvlem@gmail.com 및 향후 개설될 유튜브/인스타그램/비핸스 계정 연결' },
    { title: '상세 이력서 PDF 연동', desc: '최신 이력서 PDF 파일 생성 후 public/ 또는 구글 드라이브 다운로드 링크 연동' },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#F6F5F1] border border-[#17191C]/20 shadow-2xl flex flex-col overflow-hidden z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#17191C]/10 bg-white">
          <div className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-[#345BEB]" />
            <h3 className="font-display text-lg font-bold text-[#17191C]">
              채수훈 포트폴리오 관리 &amp; 배포 가이드
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#17191C] hover:bg-neutral-200"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 text-xs sm:text-sm text-[#17191C]/85">
          
          {/* Section 1: Folder Structure */}
          <div>
            <div className="flex items-center gap-2 font-bold text-[#17191C] mb-3">
              <FolderTree className="w-4 h-4 text-[#345BEB]" />
              <span>1. 포트폴리오 프로젝트 폴더 구조</span>
            </div>
            <pre className="p-4 bg-neutral-900 text-neutral-200 font-mono text-xs overflow-x-auto leading-relaxed">
{`/src
  ├── assets/images/       # 고해상도 프로젝트 목업 & 스튜디오 이미지
  ├── components/
  │   ├── Header.tsx       # 3구역 상단 내비게이션 바
  │   ├── Hero.tsx         # 메인 히어로 & 핵심 지표 스트립
  │   ├── WhatIDo.tsx      # 4대 핵심 역량 (브랜딩, AI, 교육, 기획)
  │   ├── WorksSection.tsx # 필터 탭 & 프로젝트 카드 그리드
  │   ├── ProjectDetailModal.tsx # 프로젝트 상세 모달 (문제-해결-결과)
  │   ├── AILabSection.tsx # 6단계 AI 숏폼 영상 파이프라인
  │   ├── AboutSection.tsx # 10년 경력 타임라인 & 역량
  │   ├── EducationSection.tsx # 수업 철학 & 커리큘럼
  │   ├── ContactSection.tsx   # 메일토 생성기 & 협업 문의
  │   └── Footer.tsx       # 푸터 및 사이트맵
  ├── data/
  │   └── portfolioData.ts # ✨ 모든 텍스트 & 프로젝트 JSON 데이터
  └── App.tsx              # 메인 엔트리`}
            </pre>
          </div>

          {/* Section 2: How to Replace Images and Data */}
          <div>
            <div className="flex items-center gap-2 font-bold text-[#17191C] mb-3">
              <Image className="w-4 h-4 text-[#345BEB]" />
              <span>2. 실제 이미지와 문구 교체 방법</span>
            </div>
            <div className="space-y-2.5 p-4 bg-white border border-[#17191C]/15 text-xs">
              <p>
                <strong>텍스트 및 프로젝트 수정:</strong> <code className="bg-neutral-100 px-1 font-mono text-[#345BEB]">/src/data/portfolioData.ts</code> 파일의 <code className="font-mono">PROJECTS</code> 배열을 수정하면 메인 카드 및 상세 모달에 즉시 반영됩니다.
              </p>
              <p>
                <strong>실제 사진 및 영상 교체:</strong> 새로운 이미지 파일을 <code className="bg-neutral-100 px-1 font-mono">/src/assets/images/</code>에 저장한 뒤, <code className="font-mono">portfolioData.ts</code>의 <code className="font-mono">heroImage</code> 경로를 변경하세요.
              </p>
              <p>
                <strong>미확정 작업물 규칙:</strong> 고객 실적이 아닌 컨셉트 작업은 반드시 <code className="font-mono text-amber-800">clientType: "Concept / Personal Project"</code> 및 <code className="font-mono text-amber-800">status: "draft"</code>를 유지합니다.
              </p>
            </div>
          </div>

          {/* Section 3: Pre-Launch Checklist */}
          <div>
            <div className="flex items-center gap-2 font-bold text-[#17191C] mb-3">
              <CheckSquare className="w-4 h-4 text-[#345BEB]" />
              <span>3. 공개 전 필수 체크리스트 (기획서 10번 항목)</span>
            </div>
            <div className="space-y-2">
              {checklistItems.map((item, idx) => (
                <div key={idx} className="p-3 bg-white border border-[#17191C]/10 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#345BEB] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#17191C] text-xs">{item.title}</div>
                    <div className="text-xs text-[#74787C]">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white border-t border-[#17191C]/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#17191C] hover:bg-[#345BEB] text-white text-xs font-semibold transition-colors"
          >
            확인 및 닫기
          </button>
        </div>

      </div>
    </div>
  );
}
