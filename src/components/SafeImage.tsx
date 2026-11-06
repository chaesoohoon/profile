import { useState } from 'react';
import { Image as ImageIcon, Sparkles } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export default function SafeImage({
  src,
  fallbackSrc,
  alt,
  className = '',
  fallbackLabel,
  ...props
}: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [attemptedFallback, setAttemptedFallback] = useState(false);

  const handleError = () => {
    if (fallbackSrc && !attemptedFallback && currentSrc !== fallbackSrc) {
      setAttemptedFallback(true);
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div 
        className={`w-full h-full flex flex-col items-center justify-center p-6 bg-[#EBE9E1] text-[#74787C] border border-[#17191C]/10 select-none ${className}`}
        aria-label={alt}
      >
        <div className="w-12 h-12 rounded-full bg-white/70 border border-[#17191C]/10 flex items-center justify-center mb-3 text-[#345BEB]">
          <ImageIcon className="w-6 h-6" />
        </div>
        <p className="font-display text-xs font-bold text-[#17191C] text-center max-w-[200px] line-clamp-1">
          {fallbackLabel || alt}
        </p>
        <span className="text-[10px] font-mono text-[#74787C] mt-1">
          CHAE SOOHOON Studio Archive
        </span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      onError={handleError}
      referrerPolicy="no-referrer"
      className={className}
      {...props}
    />
  );
}
