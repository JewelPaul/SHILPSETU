import { useState, useRef, useEffect, useCallback, type ElementType } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Upload,
  Mic,
  MicOff,
  Tag,
  FileText,
  Layers,
  TrendingUp,
  ChevronRight,
  ChevronsLeftRight,
  CheckCircle,
  RotateCcw,
  Wand2,
} from 'lucide-react';
import { SellerLayout } from '@/components/layout/SellerLayout';
import { GlassSurface, GlassButton } from '@/components/ui';
import { resolveAssetUrl } from '@/utils/assets';

// ─── AI Image Cleanup ─────────────────────────────────────────────────────────

function ImageCleanupTool() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [cleaning, setCleaning] = useState(false);
  const [cleaned, setCleaned] = useState(false);

  // Smooth pointer drag calculation: converts cursor/touch X coordinate to 0–100% position
  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width <= 0) return;
    const offsetX = clientX - rect.left;
    const percentage = Math.min(100, Math.max(0, (offsetX / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return; // primary mouse button or touch
    isDraggingRef.current = true;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + 5));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPosition(100);
    }
  };

  // Simulated AI Image Cleanup (750ms local demo)
  function handleClean() {
    setCleaning(true);
    setTimeout(() => {
      setCleaning(false);
      setCleaned(true);
      setSliderPosition(50);
    }, 750);
  }

  function handleReset() {
    setCleaning(false);
    setCleaned(false);
    setSliderPosition(50);
  }

  return (
    <GlassSurface className="p-5 sm:p-6 h-full flex flex-col">
      <ToolHeader
        icon={Wand2}
        title="AI Image Cleanup"
        description="Remove backgrounds, enhance lighting, and create studio-quality product photos."
      />

      {/* Real Before / After image comparison slider */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative rounded-xl overflow-hidden select-none touch-none cursor-ew-resize border border-stone-200/90 shadow-xs flex-shrink-0 h-[260px] sm:h-[290px] bg-stone-100"
      >
        {/* AFTER layer (full width base layer: clean bright background & professional studio lighting) */}
        <img
          src={resolveAssetUrl('/images/ai-cleanup/pot-cleanup-after.jpg')}
          alt="AI Cleaned Studio Product"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          draggable={false}
        />

        {/* BEFORE layer (clipped according to slider position: raw workshop photograph) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none select-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={resolveAssetUrl('/images/ai-cleanup/pot-cleanup-before.jpg')}
            alt="Raw Artisan Workshop Photo"
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            draggable={false}
          />
        </div>

        {/* Vertical divider line */}
        <div
          className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.45)] pointer-events-none z-10"
          style={{ left: `${sliderPosition}%` }}
        />

        {/* Draggable circular handle with chevron indicator */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-stone-700 shadow-md border border-stone-200 flex items-center justify-center cursor-ew-resize z-20 active:scale-110 transition-transform"
          style={{ left: `${sliderPosition}%` }}
          role="slider"
          tabIndex={0}
          aria-label="Image comparison slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(sliderPosition)}
          onKeyDown={handleKeyDown}
        >
          <ChevronsLeftRight size={14} className="text-stone-700" strokeWidth={2.5} />
        </div>

        {/* Subtle BEFORE label (Left) */}
        <div className="absolute top-2.5 left-2.5 pointer-events-none z-10 transition-opacity duration-200">
          <div className="px-2.5 py-1 rounded-md bg-stone-900/80 backdrop-blur-md text-white shadow-xs border border-white/10">
            <span className="block text-[10px] font-semibold tracking-wider uppercase text-[#E8A87C]">Before</span>
            <span className="block text-[10px] text-stone-300 font-sans leading-tight">Raw artisan photo</span>
          </div>
        </div>

        {/* Subtle AFTER label (Right) */}
        <div className="absolute top-2.5 right-2.5 pointer-events-none z-10 transition-opacity duration-200">
          <div className="px-2.5 py-1 rounded-md bg-stone-900/80 backdrop-blur-md text-white shadow-xs text-right border border-white/10">
            <span className="block text-[10px] font-semibold tracking-wider uppercase text-emerald-400">After</span>
            <span className="block text-[10px] text-stone-300 font-sans leading-tight">AI cleaned</span>
          </div>
        </div>
      </div>

      {/* Synchronized range slider & guide */}
      <div className="mt-3 space-y-1">
        <div className="flex items-center justify-between text-[11px] text-stone-500 font-sans px-0.5">
          <span>← Raw artisan photo</span>
          <span className="font-mono text-[10px] text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded">
            {Math.round(sliderPosition)}%
          </span>
          <span>AI cleaned →</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(sliderPosition)}
          onChange={(e) => setSliderPosition(Number(e.target.value))}
          className="w-full accent-[#8C3B1E] h-1.5 bg-stone-200 rounded-lg cursor-pointer"
          aria-label="Image comparison range slider"
        />
      </div>

      {/* Action controls: Clean Image demo & Reset */}
      <div className="mt-4 flex gap-2">
        <GlassButton
          variant="primary"
          size="sm"
          onClick={handleClean}
          disabled={cleaning}
          className="flex-1"
        >
          {cleaning ? (
            <>
              <span className="inline-block w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Cleaning image…
            </>
          ) : cleaned ? (
            <>
              <CheckCircle size={14} />
              Image cleaned ✓
            </>
          ) : (
            <>
              <Wand2 size={14} />
              Clean Image
            </>
          )}
        </GlassButton>
        {cleaned && (
          <GlassButton
            variant="glass"
            size="sm"
            onClick={handleReset}
            title="Reset to 50% comparison"
            className="flex items-center gap-1 text-xs"
          >
            <RotateCcw size={13} />
            <span className="hidden sm:inline">Reset</span>
          </GlassButton>
        )}
      </div>
    </GlassSurface>
  );
}

// ─── AI Product Understanding ────────────────────────────────────────────────

const DEMO_ANALYSIS = {
  category: 'Terracotta & Pottery',
  material: 'Red Clay, Natural Pigments',
  tags: ['handmade', 'terracotta', 'home-decor', 'traditional', 'eco-friendly'],
  description:
    'A hand-thrown terracotta vase with traditional motifs, crafted using red clay sourced from the banks of the Chambal river. Each piece is unique, air-dried and kiln-fired using wood fuel for a distinctive rustic finish.',
};

function ProductUnderstandingTool() {
  const [analysing, setAnalysing] = useState(false);
  const [result, setResult] = useState<typeof DEMO_ANALYSIS | null>(null);
  const [hasFile, setHasFile] = useState(false);

  function handleAnalyse() {
    setAnalysing(true);
    setTimeout(() => {
      setAnalysing(false);
      setResult(DEMO_ANALYSIS);
    }, 2000);
  }

  return (
    <GlassSurface className="p-5 sm:p-6 flex flex-col">
      <ToolHeader
        icon={Sparkles}
        title="AI Product Understanding"
        description="Upload a product photo to auto-detect category, material, tags, and generate a description."
      />

      {/* Upload area */}
      <div
        onClick={() => setHasFile(true)}
        className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-colors ${
          hasFile
            ? 'border-terracotta/40 bg-terracotta/5'
            : 'border-charcoal/15 hover:border-terracotta/30 hover:bg-parchment/40'
        }`}
      >
        {hasFile ? (
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-terracotta/10 flex items-center justify-center">
              <span className="text-xl">🏺</span>
            </div>
            <div className="text-left">
              <p className="text-sm font-sans font-medium text-charcoal">product_photo.jpg</p>
              <p className="text-xs font-sans text-charcoal/45">2.4 MB · Ready to analyse</p>
            </div>
          </div>
        ) : (
          <>
            <div className="w-10 h-10 rounded-full bg-parchment flex items-center justify-center mx-auto mb-2">
              <Upload size={18} className="text-charcoal/40" />
            </div>
            <p className="text-sm font-sans text-charcoal/60">
              Click to upload a product photo
            </p>
            <p className="text-xs font-sans text-charcoal/35 mt-1">JPG, PNG up to 10 MB</p>
          </>
        )}
      </div>

      <GlassButton
        variant="primary"
        size="sm"
        onClick={handleAnalyse}
        disabled={!hasFile || analysing}
        className="mt-3"
      >
        {analysing ? (
          <>
            <span className="inline-block w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            Analysing…
          </>
        ) : (
          <>
            <Sparkles size={14} />
            Analyse Product
          </>
        )}
      </GlassButton>

      {/* Results */}
      {result && (
        <div className="mt-4 space-y-3 animate-fade-in">
          <div className="h-px bg-charcoal/8" />
          <ResultRow icon={Layers} label="Category" value={result.category} />
          <ResultRow icon={Tag} label="Material" value={result.material} />
          <div className="flex gap-2 items-start">
            <div className="w-5 flex-shrink-0 mt-0.5">
              <Tag size={13} className="text-terracotta" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-sans uppercase tracking-wide text-charcoal/40 mb-1">Tags</p>
              <div className="flex flex-wrap gap-1">
                {result.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-sans px-2 py-0.5 rounded-full bg-parchment text-charcoal/70 border border-charcoal/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <ResultRow icon={FileText} label="Description" value={result.description} multiline />
        </div>
      )}
    </GlassSurface>
  );
}

function ResultRow({
  icon: Icon,
  label,
  value,
  multiline,
}: {
  icon: ElementType;
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <div className="flex gap-2 items-start">
      <div className="w-5 flex-shrink-0 mt-0.5">
        <Icon size={13} className="text-terracotta" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-sans uppercase tracking-wide text-charcoal/40">{label}</p>
        <p className={`text-sm font-sans text-charcoal mt-0.5 ${multiline ? 'leading-relaxed' : ''}`}>
          {value}
        </p>
      </div>
    </div>
  );
}

// ─── Voice Listing ────────────────────────────────────────────────────────────

const DEMO_TRANSCRIPT =
  'This is a handwoven cotton dhurrie rug made using natural cotton threads and vegetable dyes. It is about four feet by six feet in size and features a traditional geometric pattern. The material is pure cotton and it is made in Rajasthan.';

const EXTRACTED_FIELDS = {
  'Product Name': 'Handwoven Cotton Dhurrie Rug',
  Material: 'Pure Cotton, Vegetable Dyes',
  Description:
    'Handwoven cotton dhurrie rug with traditional geometric pattern (4×6 ft), crafted in Rajasthan using natural cotton threads and eco-friendly vegetable dyes.',
};

type RecordingState = 'idle' | 'recording' | 'done';

function VoiceListingTool() {
  const [recState, setRecState] = useState<RecordingState>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleMicClick() {
    if (recState === 'idle') {
      setRecState('recording');
      timerRef.current = setTimeout(() => setRecState('done'), 3000);
    } else if (recState === 'recording') {
      if (timerRef.current) clearTimeout(timerRef.current);
      setRecState('done');
    } else {
      setRecState('idle');
    }
  }

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <GlassSurface className="p-5 sm:p-6 flex flex-col">
      <ToolHeader
        icon={Mic}
        title="Voice Listing"
        description="Describe your product out loud and let AI fill in all the fields automatically."
      />

      {/* Microphone */}
      <div className="flex flex-col items-center py-4">
        <button
          onClick={handleMicClick}
          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-terracotta/30 ${
            recState === 'recording'
              ? 'bg-red-500 hover:bg-red-600 scale-110'
              : recState === 'done'
              ? 'bg-terracotta hover:bg-terracotta-light'
              : 'bg-parchment hover:bg-linen border-2 border-charcoal/10'
          }`}
          aria-label={
            recState === 'idle'
              ? 'Start recording'
              : recState === 'recording'
              ? 'Stop recording'
              : 'Record again'
          }
        >
          {recState === 'recording' ? (
            <MicOff size={24} className="text-white" />
          ) : recState === 'done' ? (
            <CheckCircle size={24} className="text-white" />
          ) : (
            <Mic size={24} className="text-charcoal/60" />
          )}
        </button>

        <p className="text-xs font-sans text-charcoal/50 mt-3">
          {recState === 'idle'
            ? 'Tap to start recording'
            : recState === 'recording'
            ? 'Recording… tap to stop'
            : 'Recording complete · Tap to redo'}
        </p>

        {/* Waveform animation */}
        {recState === 'recording' && (
          <div className="flex items-end gap-0.5 h-8 mt-3">
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                className="w-1 rounded-full bg-terracotta"
                style={{
                  animation: `waveBar 0.6s ease-in-out infinite alternate`,
                  animationDelay: `${i * 0.06}s`,
                  minHeight: 4,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Transcript */}
      {recState === 'done' && (
        <div className="space-y-3 animate-fade-in">
          <div className="h-px bg-charcoal/8" />
          <div>
            <p className="text-[10px] font-sans uppercase tracking-wide text-charcoal/40 mb-1.5">
              Transcript
            </p>
            <p className="text-sm font-sans text-charcoal/70 leading-relaxed bg-parchment/60 rounded-lg p-3 border border-charcoal/8 italic">
              &ldquo;{DEMO_TRANSCRIPT}&rdquo;
            </p>
          </div>

          <div className="h-px bg-charcoal/8" />
          <p className="text-[10px] font-sans uppercase tracking-wide text-charcoal/40">
            Extracted Fields
          </p>
          {Object.entries(EXTRACTED_FIELDS).map(([key, val]) => (
            <ResultRow
              key={key}
              icon={key === 'Material' ? Tag : FileText}
              label={key}
              value={val}
              multiline={key === 'Description'}
            />
          ))}
        </div>
      )}

      {/* Wave bar keyframes injected inline */}
      <style>{`
        @keyframes waveBar {
          from { height: 4px; }
          to   { height: 28px; }
        }
      `}</style>
    </GlassSurface>
  );
}

// ─── Smart Pricing ───────────────────────────────────────────────────────────

function SmartPricingCard() {
  const navigate = useNavigate();
  return (
    <GlassSurface hover className="p-5 sm:p-6 flex flex-col h-full">
      <ToolHeader
        icon={TrendingUp}
        title="Smart Pricing"
        description="AI-powered pricing suggestions based on material costs, market trends, and competitor analysis."
      />

      <div className="mt-3 space-y-2.5">
        {[
          { label: 'Material Cost Analysis', done: true },
          { label: 'Market Price Benchmarking', done: true },
          { label: 'Demand Forecasting', done: false },
          { label: 'Margin Optimisation', done: true },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2.5">
            <div
              className={`w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center ${
                item.done ? 'bg-forest/15' : 'bg-parchment border border-charcoal/15'
              }`}
            >
              {item.done && (
                <CheckCircle size={12} className="text-forest" />
              )}
            </div>
            <span
              className={`text-sm font-sans ${
                item.done ? 'text-charcoal/70' : 'text-charcoal/35'
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 rounded-xl bg-ochre/8 border border-ochre/20">
        <p className="text-xs font-sans text-ochre font-medium">Pricing insights ready</p>
        <p className="text-xs font-sans text-charcoal/50 mt-0.5">
          Based on 240+ similar products in the marketplace
        </p>
      </div>

      <div className="mt-auto pt-4">
        <GlassButton
          variant="primary"
          size="sm"
          className="w-full justify-center"
          onClick={() => navigate('/seller/pricing')}
        >
          Open Smart Pricing
          <ChevronRight size={14} />
        </GlassButton>
      </div>
    </GlassSurface>
  );
}

// ─── Shared ───────────────────────────────────────────────────────────────────

function ToolHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2.5 mb-1.5">
        <div className="w-7 h-7 rounded-lg bg-terracotta/10 flex items-center justify-center flex-shrink-0">
          <Icon size={15} className="text-terracotta" />
        </div>
        <h3 className="font-serif text-base font-semibold text-charcoal">{title}</h3>
      </div>
      <p className="text-xs font-sans text-charcoal/50 leading-relaxed">{description}</p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AITools() {
  return (
    <SellerLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={20} className="text-terracotta" />
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal">
              AI Seller Tools
            </h1>
          </div>
          <p className="text-sm text-charcoal/50 font-sans">
            Let AI handle the heavy lifting — cleaner photos, smarter listings, better prices.
          </p>
        </div>

        {/* Grid of tool cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-start">
          <ImageCleanupTool />
          <ProductUnderstandingTool />
          <VoiceListingTool />
          <SmartPricingCard />
        </div>

        {/* Footer note */}
        <p className="text-xs font-sans text-charcoal/35 text-center pb-4">
          AI tools are in beta. Results may vary — always review before publishing.
        </p>
      </div>
    </SellerLayout>
  );
}
