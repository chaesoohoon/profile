import { X, FileText, Mail, ShieldAlert } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  const email = 'tmxbvlem@gmail.com';
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent('[이력서 요청] 채수훈 디자이너님 상세 이력서 및 포트폴리오 PDF 요청')}&body=${encodeURIComponent('안녕하세요, [소속/기관명]의 [담당자 이름]입니다.\n\n채수훈 디자이너님의 상세 이력서(PDF) 및 고화질 포트폴리오 자료를 열람하고자 요청드립니다.\n\n- 소속 및 부서:\n- 담당자 성함/연락처:\n- 열람 목적 (채용 검토 / 프로젝트 외주 / 강의 제안):')}`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-lg bg-[#F6F5F1] border border-[#17191C]/20 shadow-2xl p-6 sm:p-8 space-y-6 z-10">
        <div className="flex items-center justify-between border-b border-[#17191C]/10 pb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#345BEB]" />
            <h3 className="font-display text-lg font-bold text-[#17191C]">
              상세 이력서 (PDF) 열람 안내
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

        <div className="space-y-4 text-xs sm:text-sm text-[#17191C]/80 leading-relaxed">
          <div className="p-3.5 bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>사전 공개 확인 절차:</strong> 개인정보 보호 및 이전 재직 기관·클라이언트 보안 협의를 위해, 상세 주민번호·연락처·내부 산출물이 포함된 PDF 이력서는 요청 시 직접 발송해 드리고 있습니다.
            </div>
          </div>

          <p>
            공식 채용 검토, 프로젝트 외주 제안, 교육 기관 출강 의뢰 목적의 요청 시 
            <strong> 24시간 이내</strong>에 최신 PDF 이력서와 고해상도 인쇄 포트폴리오를 메일로 전달드립니다.
          </p>

          <div className="p-4 bg-white border border-[#17191C]/15 space-y-2 text-xs">
            <div className="font-bold text-[#17191C]">포함된 상세 항목:</div>
            <ul className="space-y-1 text-[#74787C]">
              <li>· 10년 시각디자인 경력 증명 및 주요 프로젝트 포트폴리오</li>
              <li>· 직업훈련교사 자격 및 강의 이력서</li>
              <li>· 생성형 AI 영상 제작 파이프라인 기술 명세서</li>
              <li>· 학력, 자격 사항, 추천서</li>
            </ul>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <a
            href={mailtoUrl}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 bg-[#17191C] hover:bg-[#345BEB] text-white text-xs font-semibold transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>이메일로 이력서 요청하기</span>
          </a>
          <button
            onClick={onClose}
            className="px-4 py-3 border border-[#17191C]/20 text-[#17191C] hover:bg-neutral-200 text-xs font-semibold"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
