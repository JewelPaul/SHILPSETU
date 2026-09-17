import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Mic,
  Sparkles,
  TrendingUp,
  Box,
  CheckCircle2,
  Volume2,
  Sliders,
  ShieldCheck,
  Building2,
  Store,
  Compass
} from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { ProductCard } from '@/components/ui/ProductCard';
import { Craft3DViewer } from '@/components/ui/Craft3DViewer';
import { useProducts } from '@/context/ProductContext';
import { primaryCategories } from '@/data/categories';
import { resolveAssetUrl } from '@/utils/assets';

export default function Home() {
  const { products } = useProducts();
  const [selectedCat, setSelectedCat] = useState<string>('all');

  // AI Image Enhancer Demo State
  const [enhanceMode, setEnhanceMode] = useState<'raw' | 'enhanced'>('enhanced');

  // Voice Listing Demo State
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  // Selected category filtering for Craft Discovery
  const filteredProducts = useMemo(() => {
    let pool = products;
    if (selectedCat !== 'all') {
      pool = pool.filter((p) => {
        const cId = p.categoryId?.toLowerCase() || '';
        const cName = p.category?.toLowerCase() || '';
        const target = selectedCat.toLowerCase();
        return cId.includes(target) || cName.includes(target);
      });
    }

    // Default curated list across distinct categories
    const curatedIds = [
      'tc-1', // Terracotta Water Carafe
      'pt-1', // Glazed Ceramic Bowl
      'hs-1', // Banarasi Katan Silk Saree
      'jt-1', // Handwoven Jute Planter Basket
      'wd-1', // Hand-Carved Sheesham Wood Tray
      'dk-1', // Dhokra Lost-Wax Bell Metal Horse
      'ct-1', // Hand Block Print Cotton Dabu Bedcover
      'wa-1', // Madhubani Handpainted Tree of Life
      'bm-1', // Handwoven Bamboo Pendant Lamp
      'tc-2', // Terracotta Handi Cooking Pot
      'pt-2', // Jaipur Blue Pottery Floral Vase
      'wd-2', // Channapatna Lacquered Wooden Stacking Toy
      'dk-2', // Pure Brass Dancing Peacock Urli
      'bm-2', // Ribbed Bamboo Fruit Basket
      'hs-2', // Kanchipuram Pure Zari Silk Saree
      'jt-2', // Hand-Braided Jute & Hemp Floor Rug
    ];

    const curated = curatedIds
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is typeof products[number] => Boolean(p));

    if (selectedCat === 'all') {
      return curated.slice(0, 16);
    }

    return pool.slice(0, 16);
  }, [products, selectedCat]);

  // Rhythmic masonry aspect ratios
  const aspectRatios = [
    'aspect-[3/4]',
    'aspect-[4/5]',
    'aspect-[3/4]',
    'aspect-square',
    'aspect-[4/5]',
    'aspect-[3/4]',
  ];

  return (
    <PageLayout>
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION: "India, made by hand"
      ────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#FAF7F2] border-b border-stone-200/80 pt-16 pb-20 sm:pt-24 sm:pb-28">
        {/* Subtle decorative background texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#8C3B1E_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100/90 border border-stone-200 text-[11px] font-medium text-stone-700 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#8C3B1E] animate-pulse" />
              <span>Authentic Indian Crafts • Direct from Master Makers</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-stone-900 tracking-tight leading-[1.08]">
              India, made by hand.
            </h1>

            <p className="mt-5 text-sm sm:text-base lg:text-lg text-stone-600 font-sans max-w-2xl mx-auto leading-relaxed">
              An AI-powered digital commerce ecosystem connecting verified Indian artisans with conscious patrons, interior architects, and global B2B procurement partners.
            </p>

            {/* CTAs */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3.5">
              <Link
                to="/marketplace"
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase px-7 py-3.5 rounded-full bg-[#8C3B1E] text-white hover:bg-[#732F16] transition-all shadow-sm hover:shadow-md"
              >
                <span>Explore Crafts</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/seller"
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase px-7 py-3.5 rounded-full bg-white text-stone-800 border border-stone-300 hover:border-stone-800 transition-all hover:bg-stone-50 shadow-xs"
              >
                <span>Sell on SHILPSETU</span>
              </Link>
            </div>

            {/* 3 Metric Pills */}
            <div className="mt-12 pt-8 border-t border-stone-200/70 grid grid-cols-3 gap-2 sm:gap-6 max-w-xl mx-auto">
              <div className="text-center">
                <p className="font-serif text-xl sm:text-2xl font-bold text-stone-900">12,000+</p>
                <p className="text-[11px] text-stone-500 uppercase tracking-wider mt-0.5">Master Artisans</p>
              </div>
              <div className="text-center border-x border-stone-200/80">
                <p className="font-serif text-xl sm:text-2xl font-bold text-stone-900">9</p>
                <p className="text-[11px] text-stone-500 uppercase tracking-wider mt-0.5">Craft Traditions</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-xl sm:text-2xl font-bold text-stone-900">100%</p>
                <p className="text-[11px] text-stone-500 uppercase tracking-wider mt-0.5">Direct from Makers</p>
              </div>
            </div>
          </div>

          {/* 4-Tile Visual Craft Vignette Showcase */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5">
            <Link
              to="/marketplace?category=terracotta"
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-stone-200 block shadow-xs hover:shadow-md transition-all"
            >
              <img
                src={resolveAssetUrl('/images/products/terracotta/terracotta-01.jpg')}
                alt="Terracotta Pottery"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                <p className="text-[10px] uppercase tracking-wider text-amber-200/90 font-medium">GI-Certified</p>
                <p className="font-serif text-sm sm:text-base font-medium">Terracotta & Clay</p>
              </div>
            </Link>

            <Link
              to="/marketplace?category=handloom"
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-stone-200 block shadow-xs hover:shadow-md transition-all"
            >
              <img
                src={resolveAssetUrl('/images/products/sarees/sarees-01.jpg')}
                alt="Handloom Weaving"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                <p className="text-[10px] uppercase tracking-wider text-amber-200/90 font-medium">Heritage Weaves</p>
                <p className="font-serif text-sm sm:text-base font-medium">Handloom Sarees</p>
              </div>
            </Link>

            <Link
              to="/marketplace?category=metalcraft"
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-stone-200 block shadow-xs hover:shadow-md transition-all"
            >
              <img
                src={resolveAssetUrl('/images/products/metalcraft/metalcraft-01.jpg')}
                alt="Dhokra Metalcraft"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                <p className="text-[10px] uppercase tracking-wider text-amber-200/90 font-medium">4,000-Yr Legacy</p>
                <p className="font-serif text-sm sm:text-base font-medium">Dhokra Metalcraft</p>
              </div>
            </Link>

            <Link
              to="/marketplace?category=woodcraft"
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-stone-200 block shadow-xs hover:shadow-md transition-all"
            >
              <img
                src={resolveAssetUrl('/images/products/woodcraft/woodcraft-01.jpg')}
                alt="Woodcraft"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                <p className="text-[10px] uppercase tracking-wider text-amber-200/90 font-medium">Hand-Carved</p>
                <p className="font-serif text-sm sm:text-base font-medium">Wood & Bamboo</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. FEATURES SECTION: "Craft meets intelligent commerce"
      ────────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white border-b border-stone-200/80">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8C3B1E]">
              Intelligent Commerce
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight mt-2.5">
              Craft meets intelligent commerce
            </h2>
            <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
              Purpose-built AI tools designed for artisans with varying digital literacy — preserving centuries of heritage while opening access to modern global markets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* CARD 1: Voice-First Listing */}
            <div className="p-7 sm:p-9 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 flex flex-col justify-between hover:border-stone-400/80 transition-all">
              <div>
                <div className="w-11 h-11 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-[#8C3B1E] shadow-xs mb-6">
                  <Mic size={22} />
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">01 • Voice-First Listing</p>
                <h3 className="font-serif text-xl sm:text-2xl text-stone-900 mt-1">
                  Speak your craft in 12 languages
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Artisans simply speak naturally in Hindi, Bengali, Tamil, Telugu, or Marathi. Our voice AI transcribes the regional audio and extracts dimensions, materials, making time, and craft history into a professional catalogue listing.
                </p>
              </div>

              {/* Interactive Audio Visualizer Simulation */}
              <div className="mt-8 p-4 rounded-xl bg-white border border-stone-200/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setIsVoiceActive(!isVoiceActive)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isVoiceActive ? 'bg-red-500 text-white animate-pulse' : 'bg-[#8C3B1E] text-white hover:bg-[#732F16]'
                      }`}
                    >
                      <Mic size={15} />
                    </button>
                    <div>
                      <p className="text-xs font-medium text-stone-900">
                        {isVoiceActive ? 'Listening in Hindi (कलाकार बोल रहे हैं)...' : 'Click to preview voice listing'}
                      </p>
                      <p className="text-[10px] text-stone-500">Auto-detects regional Indian dialects</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                    {isVoiceActive ? 'REC 00:04' : 'Ready'}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-stone-50 border border-stone-200/60 text-xs font-mono text-stone-700">
                  <p className="text-stone-400 text-[10px] uppercase mb-1">Live Extraction Result</p>
                  <p className="font-sans text-xs text-stone-800">
                    &quot;यह 12-इंच की हस्तनिर्मित टेराकोटा सुराही है, प्राकृतिक लाल मिट्टी से बनी।&quot;
                  </p>
                  <div className="mt-2 pt-2 border-t border-stone-200/60 flex flex-wrap gap-2 text-[11px] font-sans">
                    <span className="px-2 py-0.5 rounded bg-white border border-stone-200 text-stone-700">Name: Terracotta Surahi</span>
                    <span className="px-2 py-0.5 rounded bg-white border border-stone-200 text-stone-700">Dims: 12&quot; x 8&quot;</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-700">Material: Natural Clay</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2: AI Image Cleanup Demo */}
            <div className="p-7 sm:p-9 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 flex flex-col justify-between hover:border-stone-400/80 transition-all">
              <div>
                <div className="w-11 h-11 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-[#8C3B1E] shadow-xs mb-6">
                  <Sparkles size={22} />
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">02 • AI Studio Cleanup</p>
                <h3 className="font-serif text-xl sm:text-2xl text-stone-900 mt-1">
                  Instant studio-grade cataloguing
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Village workshops often lack studio lighting and plain backdrops. Our on-device AI cleans messy backgrounds, balances warm tones, and generates realistic drop-shadows with one tap.
                </p>
              </div>

              {/* Interactive Before/After Toggle */}
              <div className="mt-8 p-4 rounded-xl bg-white border border-stone-200/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-stone-800">Interactive Image Cleanup</span>
                  <div className="inline-flex p-0.5 rounded-full bg-stone-100 border border-stone-200">
                    <button
                      type="button"
                      onClick={() => setEnhanceMode('raw')}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                        enhanceMode === 'raw' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      Raw Workshop
                    </button>
                    <button
                      type="button"
                      onClick={() => setEnhanceMode('enhanced')}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                        enhanceMode === 'enhanced' ? 'bg-[#8C3B1E] text-white shadow-xs' : 'text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      AI Enhanced
                    </button>
                  </div>
                </div>

                <div className="relative rounded-lg overflow-hidden h-44 bg-stone-100 border border-stone-200 flex items-center justify-center">
                  <img
                    src={
                      enhanceMode === 'raw'
                        ? resolveAssetUrl('/images/ai-cleanup/pot-cleanup-before.jpg')
                        : resolveAssetUrl('/images/ai-cleanup/pot-cleanup-after.jpg')
                    }
                    alt={
                      enhanceMode === 'raw'
                        ? 'Raw workshop photograph before AI cleanup'
                        : 'Studio-grade cleaned photo after AI cleanup'
                    }
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-stone-900/80 text-white text-[10px] font-mono backdrop-blur-xs">
                    {enhanceMode === 'raw' ? 'Workshop Lighting • Cluttered Backing' : 'Isolated • 45° Studio Softbox Light'}
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 3: Fair Pricing & Smart Business */}
            <div className="p-7 sm:p-9 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 flex flex-col justify-between hover:border-stone-400/80 transition-all">
              <div>
                <div className="w-11 h-11 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-[#8C3B1E] shadow-xs mb-6">
                  <TrendingUp size={22} />
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">03 • Transparent Fair Pricing</p>
                <h3 className="font-serif text-xl sm:text-2xl text-stone-900 mt-1">
                  Protected artisan margins
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Traditional middlemen exploit artisans by undercutting labor value. ShilpSetu calculates an exact cost breakdown—raw clay, natural pigments, firing costs, and artisan living wage—ensuring artisans retain up to 88% of the selling price.
                </p>
              </div>

              {/* Pricing Breakdown Card */}
              <div className="mt-8 p-4 rounded-xl bg-white border border-stone-200/80 shadow-xs space-y-2.5">
                <div className="flex justify-between items-center text-xs pb-2 border-b border-stone-100">
                  <span className="text-stone-600">Raw Clay & Mineral Glaze</span>
                  <span className="font-mono font-medium text-stone-800">₹280</span>
                </div>
                <div className="flex justify-between items-center text-xs pb-2 border-b border-stone-100">
                  <span className="text-stone-600">Handcrafted Labor (3.5 days @ fair wage)</span>
                  <span className="font-mono font-medium text-stone-800">₹650</span>
                </div>
                <div className="flex justify-between items-center text-xs pb-2 border-b border-stone-100">
                  <span className="text-stone-600">Artisan Sustainable Profit (35%)</span>
                  <span className="font-mono font-medium text-stone-800">₹420</span>
                </div>
                <div className="flex justify-between items-center text-xs pt-1 font-semibold text-stone-900">
                  <span className="flex items-center gap-1.5 text-[#8C3B1E]">
                    <ShieldCheck size={14} /> Fair Market Price
                  </span>
                  <span className="font-mono text-sm text-[#8C3B1E]">₹1,350</span>
                </div>
              </div>
            </div>

            {/* CARD 4: Interactive 3D Inspection */}
            <div className="p-7 sm:p-9 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 flex flex-col justify-between hover:border-stone-400/80 transition-all">
              <div>
                <div className="w-11 h-11 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-[#8C3B1E] shadow-xs mb-6">
                  <Box size={22} />
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">04 • 3D Spatial Inspection</p>
                <h3 className="font-serif text-xl sm:text-2xl text-stone-900 mt-1">
                  Rotate & inspect dimensional craft
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Conscious collectors and hospitality buyers need to assess volume, rim thickness, and symmetry. Our interactive canvas viewer renders true rotational craft geometry with lighting and wireframe simulation.
                </p>
              </div>

              {/* 3D Mini Preview */}
              <div className="mt-8 relative rounded-xl overflow-hidden border border-stone-200/80 shadow-xs bg-stone-100">
                <div className="h-48 sm:h-52">
                  <Craft3DViewer
                    modelPath="/models/pot.glb"
                    poster="/images/products/3d/pot-preview.jpg"
                    materialType="terracotta"
                    productName="Handcrafted Terracotta Urn"
                    className="h-full rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. CRAFT DISCOVERY: Category Pills + Curated Grid
      ────────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-[#FAF7F2] border-b border-stone-200/80">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8C3B1E]">
                Living Heritage
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight mt-1.5">
                Curated craft discovery
              </h2>
              <p className="mt-2 text-stone-600 text-xs sm:text-sm max-w-xl">
                Every piece is handmade by master artisans using centuries-old techniques. Direct from craft clusters across 28 Indian states.
              </p>
            </div>

            <Link
              to="/marketplace"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#8C3B1E] hover:text-stone-950 transition-colors"
            >
              <span>View All 200+ Crafts</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Category Filter Pills (9 primary categories) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-10">
            <button
              type="button"
              onClick={() => setSelectedCat('all')}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCat === 'all'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-400'
              }`}
            >
              All Crafts
            </button>
            {primaryCategories.map((cat) => {
              const active = selectedCat === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCat(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    active
                      ? 'bg-[#8C3B1E] text-white shadow-xs'
                      : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Product Grid */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-5 sm:gap-6 [column-fill:_balance]">
            {filteredProducts.map((product, idx) => {
              const ratio = aspectRatios[idx % aspectRatios.length];
              return (
                <div key={product.id} className="break-inside-avoid mb-6 sm:mb-8">
                  <ProductCard product={product} aspectRatio={ratio} />
                </div>
              );
            })}
          </div>

          {/* View full marketplace CTA button */}
          <div className="text-center mt-12 sm:mt-16">
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-stone-900 hover:text-[#8C3B1E] transition-colors py-3.5 px-8 rounded-full border border-stone-300 hover:border-stone-900 bg-white shadow-sm"
            >
              <span>Explore Marketplace Catalog</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. HOW IT WORKS: "From craft to customer"
      ────────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white border-b border-stone-200/80">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8C3B1E]">
              Seamless Workflow
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight mt-2">
              From craft to customer
            </h2>
            <p className="mt-3 text-stone-600 text-xs sm:text-sm leading-relaxed">
              A transparent, friction-free bridge connecting rural craft clusters with conscious urban buyers and global institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="p-8 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 relative">
              <span className="font-serif text-4xl font-bold text-stone-200 absolute top-6 right-6 select-none">
                01
              </span>
              <div className="w-10 h-10 rounded-full bg-[#8C3B1E]/10 text-[#8C3B1E] flex items-center justify-center font-serif font-bold text-sm mb-6">
                1
              </div>
              <h3 className="font-serif text-xl text-stone-900 mb-2">Create & Speak</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Artisans speak in their native tongue and snap photos on any smartphone. Our AI transcribes specifications, cleans images, and sets fair pricing.
              </p>
              <div className="mt-6 pt-4 border-t border-stone-200/60 flex items-center gap-2 text-[11px] text-stone-500">
                <CheckCircle2 size={13} className="text-emerald-600" />
                <span>Zero technical knowledge required</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 relative">
              <span className="font-serif text-4xl font-bold text-stone-200 absolute top-6 right-6 select-none">
                02
              </span>
              <div className="w-10 h-10 rounded-full bg-[#8C3B1E]/10 text-[#8C3B1E] flex items-center justify-center font-serif font-bold text-sm mb-6">
                2
              </div>
              <h3 className="font-serif text-xl text-stone-900 mb-2">Connect & Discover</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Retail patrons and corporate B2B buyers discover verified authentic crafts, explore artisan heritage stories, and review institutional tenders.
              </p>
              <div className="mt-6 pt-4 border-t border-stone-200/60 flex items-center gap-2 text-[11px] text-stone-500">
                <CheckCircle2 size={13} className="text-emerald-600" />
                <span>GI-certified authenticity guarantee</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 relative">
              <span className="font-serif text-4xl font-bold text-stone-200 absolute top-6 right-6 select-none">
                03
              </span>
              <div className="w-10 h-10 rounded-full bg-[#8C3B1E]/10 text-[#8C3B1E] flex items-center justify-center font-serif font-bold text-sm mb-6">
                3
              </div>
              <h3 className="font-serif text-xl text-stone-900 mb-2">Convert & Empower</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Direct UPI payouts arrive immediately to the artisan. Automated logistics dispatch fragile craft packaging with end-to-end doorstep insurance.
              </p>
              <div className="mt-6 pt-4 border-t border-stone-200/60 flex items-center gap-2 text-[11px] text-stone-500">
                <CheckCircle2 size={13} className="text-emerald-600" />
                <span>Instant direct-to-bank settlements</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. SELLER CTA: "Your craft deserves a wider market"
      ────────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-[#FAF7F2] border-b border-stone-200/80">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-stone-900 to-stone-950 text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
            {/* Background texture pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#FAF7F2_1px,transparent_1px)] [background-size:20px_20px]" />

            <div className="relative z-10 max-w-2xl">
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-amber-200 text-xs font-mono uppercase tracking-wider mb-4">
                Artisans & Guilds
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-snug">
                Your craft deserves a wider market.
              </h2>
              <p className="mt-4 text-stone-300 text-sm sm:text-base leading-relaxed">
                Start selling directly on SHILPSETU with zero listing fees. Speak in your own dialect, let AI create your digital catalogue, and connect directly with national buyers and B2B hotel projects.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/seller"
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase px-8 py-3.5 rounded-full bg-[#8C3B1E] text-white hover:bg-[#a34423] transition-all shadow-md"
                >
                  <span>Start Selling on SHILPSETU</span>
                  <ArrowRight size={14} />
                </Link>
                <Link
                  to="/seller/b2b"
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
                >
                  <Building2 size={14} />
                  <span>Browse B2B Tenders</span>
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-stone-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-400" />
                  Voice listing in 12 languages
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-400" />
                  Zero listing fees
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-400" />
                  Direct UPI bank deposits
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
