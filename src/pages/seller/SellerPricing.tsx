import { useState, useMemo } from 'react';
import { Calculator, TrendingUp } from 'lucide-react';
import { SellerLayout } from '@/components/layout/SellerLayout';
import { GlassSurface, GlassInput } from '@/components/ui';
import { products } from '@/data';

const sellerProducts = products.slice(0, 8);

export default function SellerPricing() {
  const [materialCost, setMaterialCost] = useState('');
  const [craftingHours, setCraftingHours] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [fuelCost, setFuelCost] = useState('');
  const [packagingCost, setPackagingCost] = useState('');
  const [otherCosts, setOtherCosts] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');

  const num = (v: string) => parseFloat(v) || 0;

  const calc = useMemo(() => {
    const material = num(materialCost);
    const labour = num(craftingHours) * num(hourlyRate);
    const fuel = num(fuelCost);
    const packaging = num(packagingCost);
    const other = num(otherCosts);
    const baseCost = material + labour + fuel + packaging + other;
    const suggestedPrice = baseCost * 2.5;
    const margin = suggestedPrice > 0 ? ((suggestedPrice - baseCost) / suggestedPrice) * 100 : 0;

    return { material, labour, fuel, packaging, other, baseCost, suggestedPrice, margin };
  }, [materialCost, craftingHours, hourlyRate, fuelCost, packagingCost, otherCosts]);

  const fmt = (v: number) => `₹${v.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

  const breakdownRows = [
    { label: 'Material Cost', value: calc.material },
    { label: 'Labour Cost', value: calc.labour, note: craftingHours && hourlyRate ? `${craftingHours}h × ₹${hourlyRate}/h` : undefined },
    { label: 'Fuel / Production', value: calc.fuel },
    { label: 'Packaging', value: calc.packaging },
    { label: 'Other Costs', value: calc.other },
  ];

  return (
    <SellerLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal">
            Pricing Calculator
          </h1>
          <p className="text-sm text-charcoal/50 mt-1 font-sans">
            Calculate fair prices that cover your costs and value your craft.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Inputs */}
          <GlassSurface className="lg:col-span-3 p-5 sm:p-6 space-y-5">
            <div className="flex items-center gap-2 mb-1">
              <Calculator size={18} className="text-terracotta" />
              <h2 className="font-serif text-lg font-semibold text-charcoal">Cost Inputs</h2>
            </div>

            <GlassInput
              label="Material Cost (₹)"
              type="number"
              placeholder="0"
              value={materialCost}
              onChange={e => setMaterialCost(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-4">
              <GlassInput
                label="Crafting Hours"
                type="number"
                placeholder="0"
                value={craftingHours}
                onChange={e => setCraftingHours(e.target.value)}
              />
              <GlassInput
                label="Hourly Rate (₹)"
                type="number"
                placeholder="0"
                value={hourlyRate}
                onChange={e => setHourlyRate(e.target.value)}
              />
            </div>

            <GlassInput
              label="Fuel / Production Cost (₹)"
              type="number"
              placeholder="0"
              value={fuelCost}
              onChange={e => setFuelCost(e.target.value)}
            />

            <GlassInput
              label="Packaging Cost (₹)"
              type="number"
              placeholder="0"
              value={packagingCost}
              onChange={e => setPackagingCost(e.target.value)}
            />

            <GlassInput
              label="Other Costs (₹)"
              type="number"
              placeholder="0"
              value={otherCosts}
              onChange={e => setOtherCosts(e.target.value)}
            />

            {/* Product selector */}
            <div className="pt-3 border-t border-charcoal/8 space-y-1.5">
              <label className="block text-xs font-medium tracking-wide text-charcoal/70 uppercase">
                Apply to Product (optional)
              </label>
              <select
                className="w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-charcoal/10 text-charcoal focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta/40 transition-all text-sm"
                value={selectedProduct}
                onChange={e => setSelectedProduct(e.target.value)}
              >
                <option value="">Select a product</option>
                {sellerProducts.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </GlassSurface>

          {/* Results */}
          <div className="lg:col-span-2 space-y-4">
            {/* Summary card */}
            <GlassSurface className="p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={18} className="text-forest" />
                <h2 className="font-serif text-lg font-semibold text-charcoal">Summary</h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-charcoal/8">
                  <span className="text-sm text-charcoal/60">Base Cost</span>
                  <span className="text-sm font-semibold text-charcoal tabular-nums">
                    {fmt(calc.baseCost)}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-charcoal/8">
                  <span className="text-sm text-charcoal/60">Suggested Price</span>
                  <span className="text-lg font-bold text-terracotta tabular-nums">
                    {fmt(calc.suggestedPrice)}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-charcoal/60">Margin</span>
                  <span className={`text-sm font-semibold tabular-nums ${calc.margin >= 50 ? 'text-forest' : calc.margin > 0 ? 'text-ochre' : 'text-charcoal/40'}`}>
                    {calc.margin > 0 ? `${calc.margin.toFixed(1)}%` : '—'}
                  </span>
                </div>
              </div>

              <p className="text-[10px] text-charcoal/40 pt-1">
                Suggested price = Base cost × 2.5 multiplier
              </p>
            </GlassSurface>

            {/* Breakdown */}
            <GlassSurface variant="light" className="p-5 sm:p-6">
              <h3 className="text-xs font-semibold tracking-widest uppercase text-charcoal/50 mb-3">
                Cost Breakdown
              </h3>
              <div className="space-y-2">
                {breakdownRows.map(row => (
                  <div key={row.label} className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-charcoal/60">{row.label}</span>
                      {row.note && (
                        <span className="text-[10px] text-charcoal/35 ml-1.5">({row.note})</span>
                      )}
                    </div>
                    <span className="text-xs font-medium text-charcoal tabular-nums">
                      {fmt(row.value)}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-2 mt-2 border-t border-charcoal/10">
                  <span className="text-xs font-semibold text-charcoal">Total Base Cost</span>
                  <span className="text-xs font-bold text-charcoal tabular-nums">
                    {fmt(calc.baseCost)}
                  </span>
                </div>
              </div>
            </GlassSurface>
          </div>
        </div>
      </div>
    </SellerLayout>
  );
}
