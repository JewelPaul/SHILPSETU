import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ChevronDown, X, Check, Box, Mic, Briefcase, Star } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { ProductCard } from '@/components/ui/ProductCard';
import { regions } from '@/data';
import { useProducts } from '@/context/ProductContext';

type SortOption = 'recommended' | 'newest' | 'price-asc' | 'price-desc';

const INITIAL_DISPLAY_COUNT = 30;
const LOAD_MORE_STEP = 30;

// High-level 9 canonical Indian craft categories
const PRIMARY_CATEGORIES = [
  { label: 'All Crafts', id: 'all' },
  { label: 'Terracotta', id: 'terracotta' },
  { label: 'Pottery & Ceramics', id: 'pottery' },
  { label: 'Handloom', id: 'handloom' },
  { label: 'Jute & Natural Fibre', id: 'jute' },
  { label: 'Woodcraft', id: 'woodcraft' },
  { label: 'Metalcraft', id: 'metalcraft' },
  { label: 'Block Print & Textiles', id: 'block-print' },
  { label: 'Folk Art', id: 'folk-art' },
  { label: 'Bamboo Craft', id: 'bamboo' },
];

const priceRanges = [
  { label: 'Under ₹1,000', min: 0, max: 1000 },
  { label: '₹1,000 – ₹3,000', min: 1000, max: 3000 },
  { label: '₹3,000 – ₹6,000', min: 3000, max: 6000 },
  { label: 'Above ₹6,000', min: 6000, max: Infinity },
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

export default function Marketplace() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialRegion = searchParams.get('region');
  const initialQuery = searchParams.get('q') || '';

  const [search, setSearch] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sort, setSort] = useState<SortOption>('recommended');
  const [visibleCount, setVisibleCount] = useState(INITIAL_DISPLAY_COUNT);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Compact filters state
  const [selectedRegions, setSelectedRegions] = useState<string[]>(initialRegion ? [initialRegion] : []);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [selectedAvailability, setSelectedAvailability] = useState<string | null>(null);
  const [has3DOnly, setHas3DOnly] = useState(false);
  const [b2bOnly, setB2bOnly] = useState(false);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [isListening, setIsListening] = useState(false);

  // Sync with URL query parameter
  useEffect(() => {
    const cat = searchParams.get('category');
    setActiveCategory(cat || 'all');
    const reg = searchParams.get('region');
    if (reg) {
      setSelectedRegions([reg]);
    }
    const q = searchParams.get('q');
    if (q) {
      setSearch(q);
    }
  }, [searchParams]);

  // Derive unique materials
  const availableMaterials = useMemo(() => {
    return Array.from(new Set(products.map(p => p.material.split(' ')[0]))).sort();
  }, []);

  // Filter & sort logic across all products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category mapping for the 9 canonical categories
    if (activeCategory !== 'all') {
      if (activeCategory === 'terracotta') {
        result = result.filter(p => p.categoryId === 'terracotta' || p.category.toLowerCase().includes('terracotta'));
      } else if (activeCategory === 'pottery') {
        result = result.filter(p => ['pottery', 'blue-pottery', 'pottery-ceramics'].includes(p.categoryId) || p.category.toLowerCase().includes('pottery') || p.category.toLowerCase().includes('ceramic'));
      } else if (activeCategory === 'handloom') {
        result = result.filter(p => ['handloom', 'silk-textiles', 'ikat'].includes(p.categoryId) || p.category.toLowerCase().includes('handloom'));
      } else if (activeCategory === 'jute') {
        result = result.filter(p => ['jute', 'jute-natural-fibre'].includes(p.categoryId) || p.category.toLowerCase().includes('jute'));
      } else if (activeCategory === 'woodcraft') {
        result = result.filter(p => ['woodcraft', 'channapatna', 'toys', 'kitchen'].includes(p.categoryId) || p.category.toLowerCase().includes('wood'));
      } else if (activeCategory === 'metalcraft') {
        result = result.filter(p => ['metalcraft', 'dhokra', 'brass', 'bangles', 'earrings', 'necklaces', 'sculptures'].includes(p.categoryId) || p.category.toLowerCase().includes('metal') || p.category.toLowerCase().includes('dhokra') || p.category.toLowerCase().includes('brass'));
      } else if (activeCategory === 'block-print') {
        result = result.filter(p => ['block-print', 'block-print-textiles', 'cotton-textiles'].includes(p.categoryId) || p.category.toLowerCase().includes('block print'));
      } else if (activeCategory === 'folk-art') {
        result = result.filter(p => ['folk-art', 'wall-decor', 'kalamkari'].includes(p.categoryId) || p.category.toLowerCase().includes('folk') || p.category.toLowerCase().includes('art'));
      } else if (activeCategory === 'bamboo') {
        result = result.filter(p => ['bamboo', 'bamboo-craft'].includes(p.categoryId) || p.category.toLowerCase().includes('bamboo'));
      } else {
        result = result.filter(p => p.categoryId === activeCategory);
      }
    }

    // Search query
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.shortName.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.craftTechnique.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.state.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Region filter
    if (selectedRegions.length > 0) {
      result = result.filter(p => selectedRegions.includes(p.regionId));
    }

    // Price filter
    if (selectedPriceRange !== null) {
      const range = priceRanges[selectedPriceRange];
      result = result.filter(p => p.price >= range.min && p.price < range.max);
    }

    // Material filter
    if (selectedMaterial) {
      result = result.filter(p => p.material.toLowerCase().includes(selectedMaterial.toLowerCase()));
    }

    // Availability filter
    if (selectedAvailability) {
      result = result.filter(p => p.availability === selectedAvailability);
    }

    // 3D available filter
    if (has3DOnly) {
      result = result.filter(p => p.has3D);
    }

    // B2B Wholesale available filter
    if (b2bOnly) {
      result = result.filter(p => p.b2bAvailable);
    }

    // Rating filter
    if (minRating !== null) {
      result = result.filter(p => p.rating >= minRating);
    }

    // Sorting
    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'recommended':
      default:
        result.sort((a, b) => {
          const a3D = a.isFeatured3D ? 1 : 0;
          const b3D = b.isFeatured3D ? 1 : 0;
          if (a3D !== b3D) return b3D - a3D;
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating;
        });
        break;
    }

    return result;
  }, [
    products,
    activeCategory,
    search,
    selectedRegions,
    selectedPriceRange,
    selectedMaterial,
    selectedAvailability,
    has3DOnly,
    b2bOnly,
    minRating,
    sort,
  ]);

  // Check if marketplace is in default state (all categories, no search, no filter chips active)
  const isDefaultState =
    activeCategory === 'all' &&
    !search.trim() &&
    selectedRegions.length === 0 &&
    selectedPriceRange === null &&
    selectedMaterial === null &&
    selectedAvailability === null &&
    !has3DOnly &&
    !b2bOnly &&
    minRating === null &&
    sort === 'recommended';

  // The 4 Primary Featured 3D Showcase Products
  const featured3DProducts = useMemo(() => {
    return products.filter(p => p.isFeatured3D);
  }, []);

  // When in default state, the regular products grid shows all crafts EXCLUDING the 4 featured 3D products to avoid duplication
  const regularProducts = useMemo(() => {
    if (isDefaultState) {
      return filteredProducts.filter(p => !p.isFeatured3D);
    }
    return filteredProducts;
  }, [filteredProducts, isDefaultState]);

  // Initially only 32 products visible, more revealed via Load More
  const displayedProducts = useMemo(() => {
    return regularProducts.slice(0, visibleCount);
  }, [regularProducts, visibleCount]);

  const hasMore = visibleCount < regularProducts.length;

  const hasActiveFilters =
    selectedRegions.length > 0 ||
    selectedPriceRange !== null ||
    selectedMaterial !== null ||
    selectedAvailability !== null ||
    has3DOnly ||
    b2bOnly ||
    minRating !== null;

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setVisibleCount(INITIAL_DISPLAY_COUNT);
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  const handleClearFilters = () => {
    setSelectedRegions([]);
    setSelectedPriceRange(null);
    setSelectedMaterial(null);
    setSelectedAvailability(null);
    setHas3DOnly(false);
    setB2bOnly(false);
    setMinRating(null);
    setVisibleCount(INITIAL_DISPLAY_COUNT);
  };

  const handleVoiceSearch = () => {
    setIsListening(true);
    const sampleQueries = [
      'terracotta water carafe',
      'bamboo pendant lamp',
      'dhokra bell metal nandi',
      'handloom pure cotton stole',
      'glazed ceramic dinner plates',
    ];
    setTimeout(() => {
      const q = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
      setSearch(q);
      setIsListening(false);
    }, 1100);
  };

  return (
    <PageLayout>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-24">
        {/* ─── Header & Search ─── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200/60">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight">
              Marketplace
            </h1>
            <p className="text-xs text-stone-500 font-sans mt-1">
              Authentic handcrafted objects directly from India&apos;s master makers.
            </p>
          </div>

          {/* Minimal Search Bar with Voice Simulation */}
          <div className="flex items-center gap-2 w-full md:w-96">
            <div className="relative flex-1">
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
              />
              <input
                type="text"
                value={search}
                onChange={e => {
                  setSearch(e.target.value);
                  setVisibleCount(INITIAL_DISPLAY_COUNT);
                }}
                placeholder={isListening ? "Listening to craft search..." : "Search crafts, makers, materials…"}
                className={`w-full bg-[#FAF7F2] border ${isListening ? 'border-[#8C3B1E] ring-2 ring-[#8C3B1E]/20' : 'border-stone-300/80'} rounded-full py-2 pl-9 pr-8 text-xs font-sans text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-800 transition-colors`}
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5"
                  aria-label="Clear search"
                >
                  <X size={13} />
                </button>
              )}
            </div>
            <button
              onClick={handleVoiceSearch}
              title="Search by voice (simulated)"
              className={`p-2 rounded-full border transition-all shrink-0 ${
                isListening
                  ? 'bg-[#8C3B1E] text-white border-[#8C3B1E] animate-pulse'
                  : 'bg-[#FAF7F2] border-stone-300/80 text-stone-600 hover:text-stone-900 hover:border-stone-500'
              }`}
            >
              <Mic size={15} />
            </button>
          </div>
        </div>

        {/* ─── Simple Category Row ─── */}
        <div className="py-4 overflow-x-auto scrollbar-hide flex items-center gap-1.5 border-b border-stone-200/50">
          {PRIMARY_CATEGORIES.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`flex-shrink-0 text-xs font-medium px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-stone-900 text-white font-semibold shadow-xs'
                    : 'text-stone-600 hover:text-stone-950 hover:bg-stone-200/40'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* ─── Controls: Filter Toggle, Count, Sorting ─── */}
        <div className="flex items-center justify-between py-4 text-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors ${
                hasActiveFilters
                  ? 'border-[#8C3B1E] text-[#8C3B1E] bg-[#8C3B1E]/5 font-medium'
                  : 'border-stone-300 text-stone-700 hover:border-stone-500'
              }`}
            >
              <SlidersHorizontal size={13} />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#8C3B1E]" />
              )}
            </button>

            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="text-stone-500 hover:text-stone-800 underline underline-offset-2 transition-colors"
              >
                Reset
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-stone-500 hidden sm:inline">
              Showing {displayedProducts.length} of {filteredProducts.length}
            </span>

            {/* Sorting */}
            <div className="relative">
              <select
                value={sort}
                onChange={e => setSort(e.target.value as SortOption)}
                aria-label="Sort products"
                className="appearance-none bg-transparent border border-stone-300 rounded-full pl-3 pr-7 py-1.5 text-xs text-stone-700 cursor-pointer focus:outline-none focus:border-stone-700 font-medium"
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={12}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* ─── Compact Filter Drawer / Sheet ─── */}
        {filterDrawerOpen && (
          <div className="mb-8 p-6 bg-[#FAF7F2] border border-stone-200/80 rounded-xl space-y-6 animate-fade-in">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="font-serif text-sm font-semibold text-stone-900 tracking-wide">
                Refine Selection
              </h3>
              <button
                onClick={() => setFilterDrawerOpen(false)}
                className="text-stone-400 hover:text-stone-700 p-1"
                aria-label="Close filters"
              >
                <X size={15} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
              {/* Price Filter */}
              <div>
                <h4 className="font-medium text-stone-800 uppercase tracking-wider text-[11px] mb-2.5">
                  Price
                </h4>
                <div className="space-y-1.5">
                  {priceRanges.map((range, idx) => (
                    <button
                      key={range.label}
                      onClick={() =>
                        setSelectedPriceRange(selectedPriceRange === idx ? null : idx)
                      }
                      className={`block w-full text-left px-2.5 py-1.5 rounded transition-colors ${
                        selectedPriceRange === idx
                          ? 'bg-[#8C3B1E]/10 text-[#8C3B1E] font-medium'
                          : 'text-stone-600 hover:bg-stone-200/40'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Region Filter */}
              <div>
                <h4 className="font-medium text-stone-800 uppercase tracking-wider text-[11px] mb-2.5">
                  Region
                </h4>
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {regions.map(r => {
                    const isChecked = selectedRegions.includes(r.id);
                    return (
                      <label
                        key={r.id}
                        className="flex items-center gap-2 cursor-pointer text-stone-600 hover:text-stone-900"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {
                            setSelectedRegions(prev =>
                              prev.includes(r.id)
                                ? prev.filter(x => x !== r.id)
                                : [...prev, r.id]
                            );
                          }}
                          className="w-3.5 h-3.5 rounded border-stone-300 text-[#8C3B1E] focus:ring-0"
                        />
                        <span>{r.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Material Filter */}
              <div>
                <h4 className="font-medium text-stone-800 uppercase tracking-wider text-[11px] mb-2.5">
                  Material
                </h4>
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {availableMaterials.map(mat => (
                    <button
                      key={mat}
                      onClick={() =>
                        setSelectedMaterial(selectedMaterial === mat ? null : mat)
                      }
                      className={`block w-full text-left px-2.5 py-1.5 rounded truncate transition-colors ${
                        selectedMaterial === mat
                          ? 'bg-[#8C3B1E]/10 text-[#8C3B1E] font-medium'
                          : 'text-stone-600 hover:bg-stone-200/40'
                      }`}
                    >
                      {mat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability & Features */}
              <div>
                <h4 className="font-medium text-stone-800 uppercase tracking-wider text-[11px] mb-2.5">
                  Availability & Procurement
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="space-y-1">
                    {(['in-stock', 'made-to-order'] as const).map(avail => (
                      <button
                        key={avail}
                        onClick={() =>
                          setSelectedAvailability(
                            selectedAvailability === avail ? null : avail
                          )
                        }
                        className={`block w-full text-left px-2.5 py-1.5 rounded capitalize transition-colors ${
                          selectedAvailability === avail
                            ? 'bg-[#8C3B1E]/10 text-[#8C3B1E] font-medium'
                            : 'text-stone-600 hover:bg-stone-200/40'
                        }`}
                      >
                        {avail.replace(/-/g, ' ')}
                      </button>
                    ))}
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer pt-2 border-t border-stone-200 text-stone-700">
                    <input
                      type="checkbox"
                      checked={b2bOnly}
                      onChange={e => setB2bOnly(e.target.checked)}
                      className="w-3.5 h-3.5 rounded border-stone-300 text-[#8C3B1E] focus:ring-0"
                    />
                    <span className="flex items-center gap-1 font-medium text-stone-800">
                      <Briefcase size={13} className="text-[#8C3B1E]" /> B2B Wholesale Available
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-stone-700">
                    <input
                      type="checkbox"
                      checked={has3DOnly}
                      onChange={e => setHas3DOnly(e.target.checked)}
                      className="w-3.5 h-3.5 rounded border-stone-300 text-[#8C3B1E] focus:ring-0"
                    />
                    <span className="flex items-center gap-1 font-medium">
                      <Box size={13} /> 3D View Available
                    </span>
                  </label>

                  <div className="pt-2 border-t border-stone-200 space-y-1">
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Artisan Rating</span>
                    <div className="flex items-center gap-1.5">
                      {[4.5, 4.0].map((rate) => (
                        <button
                          key={rate}
                          onClick={() => setMinRating(minRating === rate ? null : rate)}
                          className={`px-2 py-1 rounded text-[11px] font-medium flex items-center gap-1 transition-colors ${
                            minRating === rate
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                          }`}
                        >
                          <Star size={11} className="fill-amber-400 text-amber-500" />
                          <span>{rate}+</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── When in Default State: Top FEATURED IN 3D Showcase Section ─── */}
        {isDefaultState && (
          <div className="mb-14 pb-12 border-b border-stone-200/80">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 text-white text-[10px] font-medium tracking-wide uppercase mb-2 shadow-xs">
                  <Box size={12} className="text-[#E8A87C]" />
                  <span>3D Interactive Showcase</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 tracking-tight">
                  Featured in 3D
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  Explore selected SHILPSETU crafts in interactive 3D.
                </p>
              </div>
              <span className="text-xs text-stone-500 font-sans hidden sm:inline">
                4 Showcase Crafts
              </span>
            </div>

            {/* 4 Featured 3D Product Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-8 sm:gap-x-6">
              {featured3DProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* ─── All Crafts / Filtered Results Header ─── */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-xl sm:text-2xl text-stone-900 tracking-tight">
            {isDefaultState ? 'All Crafts' : 'Craft Results'}
          </h3>
          <span className="text-xs text-stone-500 font-sans">
            {regularProducts.length} {regularProducts.length === 1 ? 'craft' : 'crafts'} available
          </span>
        </div>

        {/* ─── Clean Product Grid (3-4 desktop columns, 2 mobile columns) ─── */}
        {displayedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10 sm:gap-x-6 sm:gap-y-12">
              {displayedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* ─── Controlled Load More (Showing X of Y) ─── */}
            {hasMore && (
              <div className="mt-16 text-center space-y-3">
                <p className="text-xs text-stone-400 font-sans">
                  Showing {displayedProducts.length} of {regularProducts.length} crafts
                </p>
                <button
                  onClick={() => setVisibleCount(c => c + LOAD_MORE_STEP)}
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase px-8 py-3 rounded-full border border-stone-300 hover:border-stone-900 text-stone-900 bg-white hover:bg-stone-50 transition-colors shadow-xs"
                >
                  Load more →
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="py-24 text-center">
            <p className="font-serif text-xl text-stone-500">No craft objects match your search</p>
            <p className="text-xs text-stone-400 mt-2">
              Try adjusting your category or filters to discover more works.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearch('');
                handleClearFilters();
              }}
              className="mt-5 text-xs font-semibold text-[#8C3B1E] hover:underline"
            >
              View all 100 crafts
            </button>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
