import { useState, useRef, useCallback, useEffect, type MouseEvent, type TouchEvent } from 'react';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductImage } from './ProductImage';
import { FALLBACK_IMAGE } from '@/data/images';

interface Props {
  images: string[];
  alt: string;
}

export function ImageZoom({ images, alt }: Props) {
  const [selected, setSelected] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<number | null>(null);

  // Keyboard navigation & escape listener
  useEffect(() => {
    if (!fullscreen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setFullscreen(false);
        setZoom(1);
        setPan({ x: 0, y: 0 });
      } else if (e.key === 'ArrowRight' && images.length > 1) {
        setSelected(s => (s + 1) % images.length);
      } else if (e.key === 'ArrowLeft' && images.length > 1) {
        setSelected(s => (s - 1 + images.length) % images.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreen, images.length]);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setHoverPos({ x, y });
  }, []);

  const next = () => setSelected(s => (s + 1) % images.length);
  const prev = () => setSelected(s => (s - 1 + images.length) % images.length);

  // Pan handlers for fullscreen zoomed image
  const handleMouseDown = (e: MouseEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handlePanMove = (e: MouseEvent) => {
    if (!isDragging || zoom <= 1) return;
    setPan({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartRef.current === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    touchStartRef.current = null;
  };

  return (
    <>
      <div className="space-y-4">
        {/* Main image with subtle magnification on hover */}
        <div
          ref={containerRef}
          className="relative overflow-hidden rounded-lg bg-[#FAF7F2] aspect-[4/5] cursor-zoom-in group select-none"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverPos(null)}
          onClick={() => {
            setFullscreen(true);
            setZoom(1);
            setPan({ x: 0, y: 0 });
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <ProductImage
            src={images[selected]}
            alt={`${alt} - view ${selected + 1}`}
            className="w-full h-full object-cover"
          />

          {/* Desktop subtle magnification lens */}
          {hoverPos && (
            <div
              className="absolute inset-0 pointer-events-none hidden md:block transition-opacity duration-150"
              style={{
                backgroundImage: `url(${images[selected]})`,
                backgroundSize: '180%',
                backgroundPosition: `${hoverPos.x}% ${hoverPos.y}%`,
              }}
            />
          )}

          {/* Subtle expand affordance */}
          <div className="absolute bottom-3 right-3 bg-stone-900/70 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 font-sans">
            <ZoomIn size={12} />
            <span>Click to expand</span>
          </div>
        </div>

        {/* Gallery Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2.5 overflow-x-auto scrollbar-hide py-1">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden border transition-all ${
                  i === selected
                    ? 'border-stone-900 opacity-100 ring-1 ring-stone-900'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <ProductImage src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal Viewer */}
      {fullscreen && (
        <div
          className="fixed inset-0 z-[100] bg-stone-950/95 flex items-center justify-center animate-fade-in"
          onClick={() => {
            setFullscreen(false);
            setZoom(1);
            setPan({ x: 0, y: 0 });
          }}
        >
          {/* Controls Header */}
          <div className="absolute top-4 right-5 flex items-center gap-2 z-10">
            <button
              onClick={e => {
                e.stopPropagation();
                setZoom(z => Math.min(z + 0.5, 3));
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Zoom in"
            >
              <ZoomIn size={18} />
            </button>
            <button
              onClick={e => {
                e.stopPropagation();
                setZoom(z => {
                  const newZ = Math.max(z - 0.5, 1);
                  if (newZ === 1) setPan({ x: 0, y: 0 });
                  return newZ;
                });
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Zoom out"
            >
              <ZoomOut size={18} />
            </button>
            <button
              onClick={() => {
                setFullscreen(false);
                setZoom(1);
                setPan({ x: 0, y: 0 });
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* Previous / Next buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={e => {
                  e.stopPropagation();
                  prev();
                  setPan({ x: 0, y: 0 });
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
                aria-label="Previous"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={e => {
                  e.stopPropagation();
                  next();
                  setPan({ x: 0, y: 0 });
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
                aria-label="Next"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          {/* Fullscreen Image Container with Pan support */}
          <div
            className={`max-w-[90vw] max-h-[85vh] flex items-center justify-center overflow-hidden ${
              zoom > 1 ? 'cursor-grab active:cursor-grabbing' : ''
            }`}
            onClick={e => e.stopPropagation()}
            onMouseDown={handleMouseDown}
            onMouseMove={handlePanMove}
            onMouseUp={handleMouseUp}
          >
            <img
              src={images[selected]}
              alt={alt}
              className="max-w-full max-h-[82vh] object-contain transition-transform duration-150 select-none"
              style={{
                transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
              }}
              draggable={false}
              onError={(e) => {
                (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
              }}
            />
          </div>

          {/* Bottom Dots Indicator */}
          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={e => {
                    e.stopPropagation();
                    setSelected(i);
                    setPan({ x: 0, y: 0 });
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    i === selected ? 'bg-white w-5' : 'bg-white/30 w-1.5'
                  }`}
                  aria-label={`View photo ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
