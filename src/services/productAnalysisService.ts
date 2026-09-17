/**
 * Product Analysis Service
 * Deterministically extracts craft attributes, categorizations, materials,
 * specifications, and storytelling context from raw artisan descriptions or voice input.
 */

export interface ProductAnalysisResult {
  name: string;
  shortName: string;
  category: string;
  categoryId: string;
  subcategory: string;
  material: string;
  craftTechnique: string;
  dimensions: string;
  weight: string;
  makingTime: string;
  craftStory: string;
  tags: string[];
  b2bSuitability: {
    recommendedMoq: number;
    leadTimeDays: string;
    corporateGiftPotential: 'High' | 'Medium' | 'Low';
  };
}

export async function analyzeProductInput(inputText: string, craftHint?: string): Promise<ProductAnalysisResult> {
  // Simulate prompt inference latency
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const text = (inputText + ' ' + (craftHint || '')).toLowerCase();

  if (text.includes('bamboo') || text.includes('cane') || text.includes('বাঁশ')) {
    return {
      name: 'Artisanal Handwoven Bamboo Vessel',
      shortName: 'Bamboo Vessel',
      category: 'Bamboo Craft',
      categoryId: 'bamboo',
      subcategory: 'Home Decor',
      material: 'Matured North-East Golden Bamboo & Cane',
      craftTechnique: 'Split reed lattice weaving',
      dimensions: '28 × 28 × 16 cm',
      weight: '420g',
      makingTime: '3-4 days',
      craftStory: 'Harvested from sustainable local bamboo groves in Bankura, seasoned naturally in river beds, and hand-woven by hereditary craft communities.',
      tags: ['bamboo', 'sustainable', 'handwoven', 'eco-friendly', 'artisanal'],
      b2bSuitability: {
        recommendedMoq: 25,
        leadTimeDays: '10-14 business days',
        corporateGiftPotential: 'High',
      },
    };
  }

  if (text.includes('dhokra') || text.includes('metal') || text.includes('brass') || text.includes('पीतल')) {
    return {
      name: 'Dhokra Lost-Wax Bell Metal Figurine',
      shortName: 'Dhokra Figurine',
      category: 'Metalcraft',
      categoryId: 'dhokra',
      subcategory: 'Sculptures',
      material: 'Recycled brass and bronze bell metal',
      craftTechnique: '4,000-year-old cire-perdue (lost wax) casting',
      dimensions: '22 × 12 × 18 cm',
      weight: '1.4kg',
      makingTime: '6-8 days',
      craftStory: 'Formed from wild beeswax strings wrapped over clay cores, cast in earthen kilns. Each piece is fundamentally one-of-a-kind as the mould is shattered.',
      tags: ['metalcraft', 'dhokra', 'brass', 'heritage', 'sculpture'],
      b2bSuitability: {
        recommendedMoq: 15,
        leadTimeDays: '14-20 business days',
        corporateGiftPotential: 'High',
      },
    };
  }

  if (text.includes('handloom') || text.includes('saree') || text.includes('cotton') || text.includes('सूती') || text.includes('textile')) {
    return {
      name: 'Heritage Organic Handloom Weave Stole',
      shortName: 'Handloom Stole',
      category: 'Handloom',
      categoryId: 'handloom',
      subcategory: 'Stoles',
      material: '100% Desi Organic Handspun Cotton',
      craftTechnique: 'Pit loom interlacing with natural vegetable dyes',
      dimensions: '200 × 70 cm',
      weight: '280g',
      makingTime: '4-5 days',
      craftStory: 'Woven on indigenous wooden pit looms with hand-twisted cotton yarn. Breathable, durable, and softened through natural herbal washing.',
      tags: ['handloom', 'pure-cotton', 'sustainable', 'textiles', 'natural-dye'],
      b2bSuitability: {
        recommendedMoq: 20,
        leadTimeDays: '12-16 business days',
        corporateGiftPotential: 'High',
      },
    };
  }

  // Default Terracotta / Pottery
  return {
    name: 'Hand-Thrown Terracotta Urn Vessel',
    shortName: 'Terracotta Urn',
    category: 'Terracotta',
    categoryId: 'terracotta',
    subcategory: 'Kitchenware',
    material: 'Natural Alluvial Riverbed Clay',
    craftTechnique: 'Traditional kick-wheel throwing and wood firing',
    dimensions: '30 × 20 cm',
    weight: '1.6kg',
    makingTime: '3-4 days',
    craftStory: 'Shaped from fertile river clay without chemical glazes. Wood-fired in low temperature community kilns that preserve the microporous cooling structure.',
    tags: ['terracotta', 'handthrown', 'organic-clay', 'kitchenware', 'earthware'],
    b2bSuitability: {
      recommendedMoq: 30,
      leadTimeDays: '8-12 business days',
      corporateGiftPotential: 'High',
    },
  };
}
