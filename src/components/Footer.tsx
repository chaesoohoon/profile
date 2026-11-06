import { ArrowUp, FileText } from 'lucide-react';

interface FooterProps {
  onGuideClick: () => void;
  onResumeClick: () => void;
}

export default function Footer({ onGuideClick, onResumeClick }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#17191C] text-neutral-300 py-16 border-t border-neutral-800">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-800">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); scrollToTop(); }}
              className="inline-block"
            >
              <span className="font-display text-2xl font-bold tracking-tight text-white hover:text-[#345BEB] transition-colors">
                CHAE SOOHOON
              </span>
            </a>
            <p className="text-xs text-neutral-400 font-mono">
              Creative Designer &amp; AI Content Educator
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              디자인의 경험에 AI의 가능성을 더해, 배우고 만들고 연결합니다. 
              시각디자인 10년의 조형 감각과 생성형 비디오 파이프라인의 만남.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase text-white font-semibold tracking-wider">
              Navigation
            </div>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <a href="#about" className="hover:text-white transition-colors">소개 (About)</a>
              </li>
              <li>
                <a href="#works" className="hover:text-white transition-colors">작업 아카이브 (Works)</a>
              </li>
              <li>
                <a href="#ai-lab" className="hover:text-white transition-colors">AI 워크플로 (AI Lab)</a>
              </li>
              <li>
                <a href="#education" className="hover:text-white transition-colors">교육 및 철학 (Education)</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">협업 문의 (Contact)</a>
              </li>
            </ul>
          </div>

          {/* Contact & Guides */}
          <div className="md:col-span-4 space-y-4">
            <div className="text-xs font-mono uppercase text-white font-semibold tracking-wider">
              Official Contact
            </div>
            <div className="text-xs text-neutral-400 space-y-1">
              <div>Email: <a href="mailto:tmxbvlem@gmail.com" className="text-white hover:text-[#345BEB] transition-colors underline font-mono">tmxbvlem@gmail.com</a></div>
              <div>Location: Seoul, Republic of Korea</div>
              <div>Available for: Full-time / Freelance / Lectures</div>
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={onGuideClick}
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 transition-colors"
              >
                <span>기획·수정 가이드</span>
              </button>
              <button
                onClick={onResumeClick}
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>이력서 열람 안내</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © 2026 CHAE SOOHOON. All rights reserved. 
            <span className="ml-2 text-neutral-600">| 1차 기획안 상태 (공개 전 확인 중)</span>
          </div>

          <button
            onClick={scrollToTop}
            type="button"
            className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
            aria-label="페이지 상단으로 이동"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
