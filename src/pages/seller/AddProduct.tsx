import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Camera,
  Sparkles,
  Mic,
  MicOff,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  IndianRupee,
  Layers,
  ShieldCheck,
  Check,
  RefreshCw,
} from 'lucide-react';
import { SellerLayout } from '@/components/layout/SellerLayout';
import { GlassSurface } from '@/components/ui';
import { useProducts } from '@/context/ProductContext';
import { primaryCategories } from '@/data/categories';
import { IMAGES } from '@/data/images';
import { enhanceArtisanImage, type EnhancedImageResult } from '@/services/imageEnhancementService';
import { simulateVoiceRecording, SAMPLE_ARTISAN_VOICES } from '@/services/speechToTextService';
import { analyzeProductInput } from '@/services/productAnalysisService';
import { calculateFairPrice } from '@/services/pricingService';
import type { Product } from '@/data/types';

const SAMPLE_PHOTO_PRESETS = [
  { label: 'Terracotta Vessel', url: IMAGES.terracotta[0], category: 'terracotta' },
  { label: 'Bamboo Lamp', url: IMAGES.bamboo[1], category: 'bamboo' },
  { label: 'Dhokra Bull', url: IMAGES.dhokra[1], category: 'dhokra' },
  { label: 'Handloom Stole', url: IMAGES.handloom[0], category: 'handloom' },
];

export default function AddProduct() {
  const navigate = useNavigate();
  const { addProduct } = useProducts();

  // Wizard Step: 0 = Photo & Voice, 1 = AI Understanding, 2 = Fair Pricing, 3 = Review & Publish
  const [currentStep, setCurrentStep] = useState(0);

  // Photo & Enhancement
  const [selectedImage, setSelectedImage] = useState(SAMPLE_PHOTO_PRESETS[0].url);
  const [isEnhancingImage, setIsEnhancingImage] = useState(false);
  const [enhancedResult, setEnhancedResult] = useState<EnhancedImageResult | null>(null);

  // Voice Recording
  const [isRecording, setIsRecording] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [voiceLanguage, setVoiceLanguage] = useState('');

  // AI Extraction & Form
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [name, setName] = useState('Hand-Thrown Terracotta Water Urn');
  const [shortName, setShortName] = useState('Terracotta Urn');
  const [category, setCategory] = useState('Terracotta');
  const [categoryId, setCategoryId] = useState('terracotta');
  const [subcategory, setSubcategory] = useState('Kitchenware');
  const [material, setMaterial] = useState('Natural Alluvial Clay');
  const [craftTechnique, setCraftTechnique] = useState('Kick-wheel throwing & low-temp kiln firing');
  const [dimensions, setDimensions] = useState('32 × 18 cm');
  const [weight, setWeight] = useState('1.4kg');
  const [makingTime, setMakingTime] = useState('3-4 days');
  const [craftStory, setCraftStory] = useState('Earthy water cooler shaped on ancestral potter wheels in Madhya Pradesh. Natural clay porosity keeps water pure and refreshingly chilled.');
  const [b2bAvailable, setB2bAvailable] = useState(true);
  const [moq, setMoq] = useState(20);

  // Pricing Engine
  const [rawMaterials, setRawMaterials] = useState(250);
  const [laborHours, setLaborHours] = useState(8);
  const [price, setPrice] = useState(1450);
  const [originalPrice, setOriginalPrice] = useState(1750);
  const [pricingBreakdown, setPricingBreakdown] = useState(() => calculateFairPrice(250, 8, 90));

  // Published confirmation
  const [publishedProduct, setPublishedProduct] = useState<Product | null>(null);

  // Action: Enhance Image
  const handleEnhanceImage = async () => {
    setIsEnhancingImage(true);
    try {
      const res = await enhanceArtisanImage(selectedImage);
      setEnhancedResult(res);
    } finally {
      setIsEnhancingImage(false);
    }
  };

  // Action: Voice Input Simulation
  const handleVoiceRecord = async (index: number) => {
    setIsRecording(true);
    try {
      const res = await simulateVoiceRecording(index);
      setVoiceTranscript(res.transcription);
      setVoiceLanguage(res.languageLabel);
      // Auto analyze after voice
      setIsAnalyzing(true);
      const analysis = await analyzeProductInput(res.englishTranslation, res.detectedCraft);
      setName(analysis.name);
      setShortName(analysis.shortName);
      setCategory(analysis.category);
      setCategoryId(analysis.categoryId);
      setSubcategory(analysis.subcategory);
      setMaterial(analysis.material);
      setCraftTechnique(analysis.craftTechnique);
      setDimensions(analysis.dimensions);
      setWeight(analysis.weight);
      setMakingTime(analysis.makingTime);
      setCraftStory(analysis.craftStory);
      setMoq(analysis.b2bSuitability.recommendedMoq);
    } finally {
      setIsRecording(false);
      setIsAnalyzing(false);
    }
  };

  // Action: Recalculate Pricing
  const handleRecalculatePricing = (materials: number, hours: number) => {
    setRawMaterials(materials);
    setLaborHours(hours);
    const pb = calculateFairPrice(materials, hours, 90);
    setPricingBreakdown(pb);
    setPrice(pb.suggestedRetailPrice);
    setOriginalPrice(Math.round(pb.suggestedRetailPrice * 1.25));
  };

  // Action: Final Publish to Marketplace
  const handlePublish = () => {
    const newId = `artisan-prod-${Date.now()}`;
    const newProduct: Product = {
      id: newId,
      name,
      shortName,
      category,
      categoryId,
      subcategory,
      description: craftStory,
      longDescription: craftStory,
      craftStory,
      price,
      originalPrice,
      discountPercent: Math.round(((originalPrice - price) / originalPrice) * 100),
      artisanId: 'artisan-1',
      artisanName: 'Rameshwar Lal Prajapati',
      region: 'Bhopal, Madhya Pradesh',
      regionId: 'madhya-pradesh',
      state: 'Madhya Pradesh',
      city: 'Bhopal',
      craftTechnique,
      material,
      dimensions,
      weight,
      color: 'Natural Earth',
      stock: 12,
      stockCount: 12,
      availability: 'in-stock',
      makingTime,
      craftingTime: makingTime,
      moq,
      leadTime: '7-10 business days',
      rating: 5.0,
      reviewCount: 1,
      image: selectedImage,
      images: [selectedImage],
      gallery: [selectedImage],
      has3D: false,
      isVerified: true,
      b2bAvailable,
      featured: true,
      bestSeller: false,
      newArrival: true,
      tags: ['handcrafted', category.toLowerCase(), material.toLowerCase(), 'new'],
      careInstructions: 'Wipe with soft cloth. Avoid harsh chemical cleaners.',
      shippingEstimate: '5-7 business days',
      returnEligible: true,
      createdAt: new Date().toISOString().split('T')[0],
    };

    addProduct(newProduct);
    setPublishedProduct(newProduct);
  };

  // Success View
  if (publishedProduct) {
    return (
      <SellerLayout>
        <div className="max-w-2xl mx-auto py-12 px-4 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#2E4033]/15 text-[#2E4033] flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 size={36} />
          </div>
          <div className="space-y-2">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-widest text-[#8C3B1E]">
              Listing Live Worldwide
            </span>
            <h1 className="font-serif text-3xl font-semibold text-stone-900">
              Your Craft is Officially Published!
            </h1>
            <p className="text-sm text-stone-600 font-sans max-w-md mx-auto leading-relaxed">
              "{publishedProduct.name}" has been broadcast to both the Shilpsetu Marketplace and Verified B2B Procurement portal.
            </p>
          </div>

          <div className="p-4 bg-white/80 border border-stone-200 rounded-xl max-w-md mx-auto flex items-center gap-4 text-left">
            <img
              src={publishedProduct.image}
              alt={publishedProduct.name}
              className="w-16 h-16 rounded-lg object-cover bg-stone-100 shrink-0"
            />
            <div className="space-y-0.5">
              <span className="text-[10px] text-[#8C3B1E] font-medium">{publishedProduct.category}</span>
              <h4 className="font-serif text-sm font-semibold text-stone-900 line-clamp-1">{publishedProduct.name}</h4>
              <p className="text-xs font-semibold text-stone-800">₹{publishedProduct.price.toLocaleString('en-IN')}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link
              to={`/marketplace/product/${publishedProduct.id}`}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#8C3B1E] text-white rounded-xl text-xs font-medium hover:bg-[#722F17] transition-all flex items-center justify-center gap-2"
            >
              <span>View in Live Marketplace</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              to="/seller/products"
              className="w-full sm:w-auto px-6 py-2.5 bg-stone-100 text-stone-800 border border-stone-300 rounded-xl text-xs font-medium hover:bg-stone-200 transition-all text-center"
            >
              Manage in Studio
            </Link>
          </div>
        </div>
      </SellerLayout>
    );
  }

  return (
    <SellerLayout>
      <div className="max-w-4xl mx-auto space-y-6 pb-16">
        {/* Step Indicator Header */}
        <div className="flex items-center justify-between border-b border-stone-200/80 pb-4">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C3B1E]">
              AI Artisan Assisted Flow
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900">
              Publish New Craft
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs font-sans font-medium text-stone-500">
            <span>Step {currentStep + 1} of 4</span>
          </div>
        </div>

        {/* Wizard Progress bar */}
        <div className="grid grid-cols-4 gap-2">
          {['1. Photo & Voice', '2. AI Extraction', '3. Fair Pricing', '4. Review & Publish'].map((label, i) => (
            <div
              key={label}
              onClick={() => i <= currentStep && setCurrentStep(i)}
              className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                i === currentStep
                  ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                  : i < currentStep
                  ? 'bg-[#2E4033]/10 text-[#2E4033] border-[#2E4033]/30'
                  : 'bg-stone-100 text-stone-400 border-transparent pointer-events-none'
              }`}
            >
              <div className="line-clamp-1">{label}</div>
            </div>
          ))}
        </div>

        {/* STEP 0: Photo & Voice Recording */}
        {currentStep === 0 && (
          <div className="space-y-6">
            <GlassSurface className="p-6 rounded-2xl border border-stone-200/80 bg-white/70 space-y-5">
              <div className="space-y-1">
                <h2 className="font-serif text-lg font-semibold text-stone-900">
                  Select or Capture Craft Photo
                </h2>
                <p className="text-xs text-stone-500 font-sans">
                  Choose a craft archetype or snap your studio photograph for automatic AI lighting enhancement.
                </p>
              </div>

              {/* Photo presets */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {SAMPLE_PHOTO_PRESETS.map((preset) => (
                  <div
                    key={preset.label}
                    onClick={() => {
                      setSelectedImage(preset.url);
                      setEnhancedResult(null);
                    }}
                    className={`relative rounded-xl overflow-hidden cursor-pointer border-2 transition-all aspect-square group ${
                      selectedImage === preset.url
                        ? 'border-[#8C3B1E] ring-2 ring-[#8C3B1E]/20'
                        : 'border-transparent hover:opacity-90'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 text-left">
                      <span className="text-[11px] font-sans font-medium text-white block">
                        {preset.label}
                      </span>
                    </div>
                    {selectedImage === preset.url && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#8C3B1E] text-white flex items-center justify-center shadow-xs">
                        <Check size={12} strokeWidth={3} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* AI Enhancement button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#FAF7F2] p-4 rounded-xl border border-stone-200/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#8C3B1E]/10 text-[#8C3B1E] flex items-center justify-center shrink-0">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-stone-900 font-sans">
                      Studio Light AI Calibration
                    </h4>
                    <p className="text-[11px] text-stone-500 font-sans">
                      Cleans reflections, balances shadows and sharpens intricate craft textures.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleEnhanceImage}
                  disabled={isEnhancingImage}
                  className="w-full sm:w-auto px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-[#8C3B1E] transition-colors flex items-center justify-center gap-1.5 shrink-0"
                >
                  {isEnhancingImage ? (
                    <>
                      <RefreshCw size={13} className="animate-spin" />
                      <span>Calibrating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={13} />
                      <span>{enhancedResult ? 'Re-Enhance Photo' : 'Enhance with AI'}</span>
                    </>
                  )}
                </button>
              </div>

              {enhancedResult && (
                <div className="p-3.5 bg-[#2E4033]/10 border border-[#2E4033]/20 rounded-xl space-y-1 text-xs text-[#2E4033] font-sans">
                  <span className="font-semibold flex items-center gap-1">
                    <CheckCircle2 size={13} />
                    Photo Enhanced (Clarity Index: {enhancedResult.clarityScore}%)
                  </span>
                  <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-[#2E4033]/90">
                    {enhancedResult.improvements.map((imp, idx) => (
                      <li key={idx}>{imp}</li>
                    ))}
                  </ul>
                </div>
              )}
            </GlassSurface>

            {/* Voice Narration Simulation */}
            <GlassSurface className="p-6 rounded-2xl border border-stone-200/80 bg-white/70 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-serif text-lg font-semibold text-stone-900">
                    Artisan Voice Input (बोलकर बताइए)
                  </h3>
                  <p className="text-xs text-stone-500 font-sans">
                    Artisans can describe their craft naturally in Hindi, Bengali, or English. Our AI will automatically translate and extract all specifications.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {SAMPLE_ARTISAN_VOICES.map((sample, idx) => (
                  <button
                    key={sample.id}
                    onClick={() => handleVoiceRecord(idx)}
                    disabled={isRecording}
                    className="p-3 text-left border border-stone-200/90 rounded-xl bg-white hover:border-[#8C3B1E] hover:bg-[#FAF7F2] transition-all space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs font-medium text-stone-800">
                      <span className="flex items-center gap-1">
                        <Mic size={12} className="text-[#8C3B1E]" />
                        {sample.languageLabel}
                      </span>
                      <span className="text-[10px] text-stone-400">{sample.detectedCraft}</span>
                    </div>
                    <p className="text-[11px] text-stone-600 line-clamp-2 font-sans italic">
                      "{sample.transcription}"
                    </p>
                  </button>
                ))}
              </div>

              {isRecording && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3 text-xs text-amber-900">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                  <span>Listening to artisan speech and translating audio stream...</span>
                </div>
              )}

              {voiceTranscript && (
                <div className="p-3.5 bg-stone-100 rounded-xl space-y-1 text-xs font-sans text-stone-800">
                  <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block">
                    Transcribed Speech ({voiceLanguage})
                  </span>
                  <p className="italic">"{voiceTranscript}"</p>
                </div>
              )}
            </GlassSurface>

            <div className="flex justify-end">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-6 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-medium hover:bg-[#8C3B1E] transition-colors flex items-center gap-1.5"
              >
                <span>Continue to AI Extraction</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 1: AI Craft Understanding & Specifications */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <GlassSurface className="p-6 rounded-2xl border border-stone-200/80 bg-white/70 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-lg font-semibold text-stone-900">
                    Extracted Craft Specifications
                  </h2>
                  <p className="text-xs text-stone-500 font-sans">
                    Refine titles, materials, and artisan heritage stories generated by Shilpsetu AI.
                  </p>
                </div>
                <div className="px-2.5 py-1 bg-[#2E4033]/10 text-[#2E4033] rounded-full text-xs font-medium flex items-center gap-1">
                  <Sparkles size={11} />
                  AI Verified
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                <div className="space-y-1">
                  <label className="font-medium text-stone-700">Product Title</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-stone-900 focus:ring-1 focus:ring-[#8C3B1E]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-stone-700">Short Display Name</label>
                  <input
                    type="text"
                    value={shortName}
                    onChange={(e) => setShortName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-stone-900 focus:ring-1 focus:ring-[#8C3B1E]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-stone-700">Craft Category</label>
                  <select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      const matched = primaryCategories.find(c => c.name === e.target.value);
                      if (matched) setCategoryId(matched.id);
                    }}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-stone-900 focus:ring-1 focus:ring-[#8C3B1E]"
                  >
                    {primaryCategories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-stone-700">Primary Material</label>
                  <input
                    type="text"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-stone-900 focus:ring-1 focus:ring-[#8C3B1E]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-stone-700">Dimensions (L × W × H)</label>
                  <input
                    type="text"
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-stone-900 focus:ring-1 focus:ring-[#8C3B1E]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-stone-700">Making Time</label>
                  <input
                    type="text"
                    value={makingTime}
                    onChange={(e) => setMakingTime(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-stone-900 focus:ring-1 focus:ring-[#8C3B1E]"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="font-medium text-stone-700">Craft Technique & Heritage Story</label>
                  <textarea
                    rows={3}
                    value={craftStory}
                    onChange={(e) => setCraftStory(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-stone-900 focus:ring-1 focus:ring-[#8C3B1E]"
                  />
                </div>

                <div className="sm:col-span-2 pt-2 border-t border-stone-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="b2bCheck"
                      checked={b2bAvailable}
                      onChange={(e) => setB2bAvailable(e.target.checked)}
                      className="rounded text-[#8C3B1E] focus:ring-[#8C3B1E]"
                    />
                    <label htmlFor="b2bCheck" className="font-medium text-stone-800 cursor-pointer">
                      Enable for Institutional B2B Bulk Orders
                    </label>
                  </div>

                  {b2bAvailable && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-stone-500">Minimum Order Qty (MOQ):</span>
                      <input
                        type="number"
                        min={5}
                        max={500}
                        value={moq}
                        onChange={(e) => setMoq(Number(e.target.value))}
                        className="w-20 px-2 py-1 bg-white border border-stone-300 rounded text-center"
                      />
                    </div>
                  )}
                </div>
              </div>
            </GlassSurface>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(0)}
                className="px-4 py-2 border border-stone-300 rounded-xl text-xs font-medium text-stone-600 hover:bg-stone-100 flex items-center gap-1"
              >
                <ChevronLeft size={14} />
                <span>Back</span>
              </button>
              <button
                onClick={() => setCurrentStep(2)}
                className="px-6 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-medium hover:bg-[#8C3B1E] transition-colors flex items-center gap-1.5"
              >
                <span>Continue to Fair Pricing</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Fair Artisan Pricing */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <GlassSurface className="p-6 rounded-2xl border border-stone-200/80 bg-white/70 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-lg font-semibold text-stone-900">
                    Transparent Artisan Pricing Engine
                  </h2>
                  <p className="text-xs text-stone-500 font-sans">
                    Ensures liveable craftsman wages, fair profit margin, and volume discount tiers.
                  </p>
                </div>
                <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                  Ethical Commerce
                </span>
              </div>

              {/* Calculator sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-4 bg-[#FAF7F2] rounded-xl border border-stone-200/70 text-xs font-sans">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-stone-700">Raw Materials Cost</span>
                    <span className="font-semibold text-stone-900">₹{rawMaterials}</span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={3000}
                    step={25}
                    value={rawMaterials}
                    onChange={(e) => handleRecalculatePricing(Number(e.target.value), laborHours)}
                    className="w-full accent-[#8C3B1E]"
                  />
                  <span className="text-[10px] text-stone-400">Clay, pigments, natural glazes, fuel</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-stone-700">Crafting Time (Hours)</span>
                    <span className="font-semibold text-stone-900">{laborHours} hrs</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={40}
                    step={1}
                    value={laborHours}
                    onChange={(e) => handleRecalculatePricing(rawMaterials, Number(e.target.value))}
                    className="w-full accent-[#8C3B1E]"
                  />
                  <span className="text-[10px] text-stone-400">At standard fair artisan rate (₹90/hr)</span>
                </div>
              </div>

              {/* Cost breakdown cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-sans">
                <div className="p-3 bg-white border border-stone-200 rounded-xl">
                  <span className="text-stone-400 block text-[10px] uppercase">Artisan Labor</span>
                  <span className="font-serif text-base font-semibold text-stone-900 mt-0.5 block">
                    ₹{pricingBreakdown.totalLabor}
                  </span>
                </div>
                <div className="p-3 bg-white border border-stone-200 rounded-xl">
                  <span className="text-stone-400 block text-[10px] uppercase">Net Profit Margin</span>
                  <span className="font-serif text-base font-semibold text-[#2E4033] mt-0.5 block">
                    +₹{pricingBreakdown.artisanMargin}
                  </span>
                </div>
                <div className="p-3 bg-white border border-stone-200 rounded-xl">
                  <span className="text-stone-400 block text-[10px] uppercase">Packaging & Logistics</span>
                  <span className="font-serif text-base font-semibold text-stone-900 mt-0.5 block">
                    ₹{pricingBreakdown.packagingLogistics}
                  </span>
                </div>
                <div className="p-3 bg-[#8C3B1E]/10 border border-[#8C3B1E]/30 rounded-xl">
                  <span className="text-[#8C3B1E] block text-[10px] uppercase font-semibold">Suggested B2C Price</span>
                  <span className="font-serif text-base font-bold text-[#8C3B1E] mt-0.5 block">
                    ₹{pricingBreakdown.suggestedRetailPrice}
                  </span>
                </div>
              </div>

              {/* B2B Wholesale Tier Table */}
              <div className="space-y-2 pt-2 border-t border-stone-200 text-xs font-sans">
                <h4 className="font-semibold text-stone-800">Wholesale Volume Pricing Tiers</h4>
                <div className="grid grid-cols-3 gap-2">
                  {pricingBreakdown.wholesaleTiers.map((tier) => (
                    <div key={tier.minQuantity} className="p-2.5 bg-white border border-stone-200 rounded-lg text-center">
                      <span className="text-stone-500 text-[10px] block">MOQ {tier.minQuantity}+ units</span>
                      <span className="font-serif font-bold text-stone-900 block text-sm">₹{tier.unitPrice}/unit</span>
                      <span className="text-[10px] text-[#2E4033] font-medium">{tier.discountPercent}% off</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassSurface>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2 border border-stone-300 rounded-xl text-xs font-medium text-stone-600 hover:bg-stone-100 flex items-center gap-1"
              >
                <ChevronLeft size={14} />
                <span>Back</span>
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="px-6 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-medium hover:bg-[#8C3B1E] transition-colors flex items-center gap-1.5"
              >
                <span>Proceed to Final Review</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Review & Publish */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <GlassSurface className="p-6 rounded-2xl border border-stone-200/80 bg-white/70 space-y-6">
              <div className="space-y-1">
                <h2 className="font-serif text-lg font-semibold text-stone-900">
                  Ready to Publish
                </h2>
                <p className="text-xs text-stone-500 font-sans">
                  Preview how your handcrafted product will appear to marketplace shoppers and bulk institutional buyers.
                </p>
              </div>

              {/* Product Card Simulation */}
              <div className="max-w-md mx-auto border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-xs">
                <div className="relative aspect-4/3 bg-stone-100">
                  <img
                    src={selectedImage}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 bg-[#2E4033] text-white rounded-full text-[10px] font-sans font-medium flex items-center gap-1">
                      <ShieldCheck size={11} />
                      Verified Artisan
                    </span>
                    {b2bAvailable && (
                      <span className="px-2.5 py-1 bg-stone-900 text-white rounded-full text-[10px] font-sans font-medium">
                        B2B Available
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4 space-y-2 text-left">
                  <div className="flex justify-between items-center text-xs text-stone-500 font-sans">
                    <span>{category}</span>
                    <span>Bhopal, Madhya Pradesh</span>
                  </div>
                  <h3 className="font-serif text-base font-semibold text-stone-900">
                    {name}
                  </h3>
                  <p className="text-xs text-stone-600 font-sans line-clamp-2">
                    {craftStory}
                  </p>
                  <div className="pt-2 flex items-baseline justify-between border-t border-stone-100">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-lg font-bold text-stone-900">
                        ₹{price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-stone-400 line-through">
                        ₹{originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#2E4033] font-medium font-sans">
                      Ready to Ship
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#FAF7F2] rounded-xl border border-stone-200 text-xs font-sans space-y-1 text-stone-700">
                <div className="flex items-center gap-1.5 font-medium text-stone-900">
                  <Check size={13} className="text-[#2E4033]" />
                  <span>Immediate Visibility Guarantee</span>
                </div>
                <p className="text-stone-500 text-[11px]">
                  Once you click publish, this craft piece will instantly be injected into the central catalog and appear at the top of the Shilpsetu Marketplace.
                </p>
              </div>
            </GlassSurface>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2 border border-stone-300 rounded-xl text-xs font-medium text-stone-600 hover:bg-stone-100 flex items-center gap-1"
              >
                <ChevronLeft size={14} />
                <span>Back</span>
              </button>
              <button
                onClick={handlePublish}
                className="px-8 py-3 bg-[#8C3B1E] text-white rounded-xl text-sm font-medium hover:bg-[#722F17] transition-all shadow-md flex items-center gap-2"
              >
                <Sparkles size={16} />
                <span>Confirm & Publish Craft</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </SellerLayout>
  );
}
