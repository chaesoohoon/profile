import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onContactClick: () => void;
  onGuideClick: () => void;
}

export default function Header({ onContactClick, onGuideClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: '소개', enLabel: 'About', href: '#about' },
    { label: '작업', enLabel: 'Works', href: '#works' },
    { label: 'AI 워크플로', enLabel: 'AI Lab', href: '#ai-lab' },
    { label: '교육', enLabel: 'Education', href: '#education' },
    { label: '연락처', enLabel: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F6F5F1]/90 backdrop-blur-md border-b border-[#17191C]/10 transition-colors">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="group flex flex-col justify-center text-left shrink-0 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#345BEB]"
          aria-label="채수훈 포트폴리오 메인으로 이동"
        >
          <span className="font-display text-xl md:text-2xl font-bold tracking-tight text-[#17191C] group-hover:text-[#345BEB] transition-colors">
            CHAE SOOHOON
          </span>
          <span className="text-[11px] font-medium tracking-wider text-[#74787C] uppercase">
            Design × AI × Education
          </span>
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav 
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#17191C]/80"
          aria-label="주요 메뉴"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group py-1 whitespace-nowrap shrink-0 hover:text-[#345BEB] transition-colors relative"
            >
              <span className="text-[#17191C] font-semibold group-hover:text-[#345BEB] transition-colors">
                {link.label}
              </span>
              <span className="text-xs text-[#74787C] ml-1.5 opacity-70 group-hover:opacity-100 font-mono">
                {link.enLabel}
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#345BEB] transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <button
            onClick={onGuideClick}
            type="button"
            className="text-xs font-medium text-[#74787C] hover:text-[#17191C] px-2.5 py-1.5 rounded border border-[#17191C]/15 transition-colors whitespace-nowrap"
            title="포트폴리오 수정 및 배포 가이드 열기"
          >
            기획·수정 가이드
          </button>
          <button
            onClick={onContactClick}
            type="button"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs md:text-sm font-semibold text-white bg-[#17191C] hover:bg-[#345BEB] rounded-none transition-all duration-200 shadow-sm whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#345BEB]"
          >
            <span>협업 문의하기</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            className="p-2 text-[#17191C] hover:text-[#345BEB] focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#17191C]/10 bg-[#F6F5F1] px-6 py-6 shadow-lg">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 text-base font-medium text-[#17191C] border-b border-[#17191C]/5"
              >
                <span>{link.label}</span>
                <span className="text-xs font-mono text-[#74787C]">{link.enLabel}</span>
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onContactClick();
                }}
                type="button"
                className="w-full text-center py-3 bg-[#17191C] text-white font-semibold text-sm hover:bg-[#345BEB] transition-colors"
              >
                협업 문의하기
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onGuideClick();
                }}
                type="button"
                className="w-full text-center py-2 text-xs text-[#74787C] border border-[#17191C]/20"
              >
                기획·수정 가이드 보기
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
