import { useState, type ImgHTMLAttributes } from 'react';
import { FALLBACK_IMAGE } from '@/data/images';
import { resolveAssetUrl } from '@/utils/assets';

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export function ProductImage({
  src,
  alt,
  className = '',
  fallbackSrc,
  ...props
}: Props) {
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // If src is invalid or empty, use fallback immediately
  const validSrc = (!src || src === 'undefined' || src.trim() === '') ? FALLBACK_IMAGE : resolveAssetUrl(src);
  const displaySrc = hasError ? (fallbackSrc ? resolveAssetUrl(fallbackSrc) : FALLBACK_IMAGE) : validSrc;

  return (
    <div className={`relative overflow-hidden bg-[#F3EFEA] ${className}`}>
      {/* Subtle warm skeleton shimmer while image loads */}
      {!loaded && !hasError && (
        <div className="absolute inset-0 bg-stone-200/40 animate-pulse pointer-events-none" />
      )}

      <img
        ref={(el) => {
          if (el && el.complete && el.naturalWidth > 0 && !loaded) {
            setLoaded(true);
          }
        }}
        src={displaySrc}
        alt={alt || 'Handcrafted Indian object'}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-opacity duration-300"
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (!hasError) {
            setHasError(true);
            setLoaded(true);
          }
        }}
        {...props}
      />
    </div>
  );
}
