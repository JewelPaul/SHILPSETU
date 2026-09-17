/**
 * Fair Artisan Pricing Service
 * Calculates transparent, equitable pricing models for traditional Indian artisans.
 * Protects maker dignity, guarantees liveable wages, and outlines clear wholesale structures.
 */

export interface PricingBreakdown {
  rawMaterials: number;
  laborHours: number;
  hourlyRate: number;
  totalLabor: number;
  packagingLogistics: number;
  artisanMargin: number;
  platformFee: number;
  suggestedRetailPrice: number;
  wholesaleTiers: {
    minQuantity: number;
    unitPrice: number;
    discountPercent: number;
  }[];
}

export function calculateFairPrice(
  rawMaterials: number = 280,
  laborHours: number = 8,
  hourlyRate: number = 90 // ₹90/hr (~₹720/day fair artisan wage)
): PricingBreakdown {
  const totalLabor = laborHours * hourlyRate;
  const packagingLogistics = 120;
  const baseCost = rawMaterials + totalLabor + packagingLogistics;
  const artisanMargin = Math.round(baseCost * 0.35); // 35% artisan profit margin
  const subtotal = baseCost + artisanMargin;
  const platformFee = Math.round(subtotal * 0.05); // 5% minimal marketplace platform fee
  const suggestedRetailPrice = Math.ceil((subtotal + platformFee) / 50) * 50; // rounded to clean 50s

  const wholesaleTiers = [
    {
      minQuantity: 15,
      unitPrice: Math.round(suggestedRetailPrice * 0.82),
      discountPercent: 18,
    },
    {
      minQuantity: 50,
      unitPrice: Math.round(suggestedRetailPrice * 0.72),
      discountPercent: 28,
    },
    {
      minQuantity: 100,
      unitPrice: Math.round(suggestedRetailPrice * 0.65),
      discountPercent: 35,
    },
  ];

  return {
    rawMaterials,
    laborHours,
    hourlyRate,
    totalLabor,
    packagingLogistics,
    artisanMargin,
    platformFee,
    suggestedRetailPrice,
    wholesaleTiers,
  };
}
