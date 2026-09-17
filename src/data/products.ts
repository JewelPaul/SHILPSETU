import type { Product } from './types';
import { getProductImage, getProductGallery } from './images';
import { resolveAssetUrl } from '@/utils/assets';

const categoryNameMap: Record<string, string> = {
  'terracotta': 'Terracotta',
  'pottery': 'Pottery & Ceramics',
  'blue-pottery': 'Pottery & Ceramics',
  'handloom': 'Handloom',
  'cotton-textiles': 'Block Print & Textiles',
  'silk-textiles': 'Handloom',
  'block-print': 'Block Print & Textiles',
  'kalamkari': 'Folk Art',
  'ikat': 'Handloom',
  'woodcraft': 'Woodcraft',
  'channapatna': 'Woodcraft',
  'toys': 'Woodcraft',
  'dhokra': 'Metalcraft',
  'bangles': 'Metalcraft',
  'earrings': 'Metalcraft',
  'necklaces': 'Metalcraft',
  'jute': 'Jute & Natural Fibre',
  'home-decor': 'Terracotta',
  'wall-decor': 'Folk Art',
  'kitchen': 'Woodcraft',
  'sculptures': 'Metalcraft',
  'folk-art': 'Folk Art',
  'bamboo': 'Bamboo Craft',
};

const artisanNameMap: Record<string, string> = {
  'artisan-1': 'Rameshwar Lal Prajapati',
  'artisan-2': 'Mohan Lal Kumhar',
  'artisan-3': 'Kailash Chand Sharma',
  'artisan-4': 'Biren Das',
  'artisan-5': 'Mukesh Kumar',
  'artisan-6': 'Anas Ansari',
  'artisan-7': 'Chhagan Lal Chippa',
  'artisan-8': 'Radha Bai Chitrakar',
  'artisan-9': 'Narayana Murthy',
  'artisan-10': 'Subhash Sharma',
  'artisan-11': 'Ganesh Acharya',
  'artisan-12': 'Shanti Devi Baghel',
};

function p(
  id: string, name: string, shortName: string, categoryId: string, subcategory: string,
  price: number, artisanId: string, regionId: string, state: string, city: string,
  technique: string, material: string, dims: string, weight: string, color: string,
  stock: number, avail: Product['availability'], time: string,
  rating: number, reviews: number, desc: string, longDesc: string,
  tags: string[], care: string, ship: string, returnOk: boolean,
  idx: number, opts?: Partial<Product>
): Product {
  const rawImage = opts?.image || getProductImage(categoryId, idx);
  const image = resolveAssetUrl(rawImage);
  const hoverImage = opts?.hoverImage && opts.hoverImage !== rawImage ? resolveAssetUrl(opts.hoverImage) : undefined;
  const rawGallery = opts?.gallery && opts.gallery.length > 0
    ? opts.gallery
    : hoverImage
    ? [image, hoverImage]
    : getProductGallery(categoryId, idx);
  const gallery = rawGallery.map(resolveAssetUrl);

  const category = opts?.category || categoryNameMap[categoryId] || 'Handcrafted';
  const originalPrice = opts?.originalPrice || Math.round(price * 1.25);
  const discountPercent = opts?.discountPercent || Math.round(((originalPrice - price) / originalPrice) * 100);
  const artisanName = opts?.artisanName || artisanNameMap[artisanId] || 'Master Artisan';
  const region = opts?.region || `${city}, ${state}`;
  const craftStory = opts?.craftStory || desc;
  const makingTime = opts?.makingTime || time;
  const moq = opts?.moq || (price > 2000 ? 5 : 15);
  const leadTime = opts?.leadTime || s710;
  const isVerified = opts?.isVerified !== undefined ? opts.isVerified : true;
  const b2bAvailable = opts?.b2bAvailable !== undefined ? opts.b2bAvailable : (idx % 3 !== 1);
  const model3D = opts?.model3D ? resolveAssetUrl(opts.model3D) : undefined;

  return {
    id, name, shortName, category, categoryId, subcategory, description: desc, longDescription: longDesc,
    craftStory, price, originalPrice, discountPercent, artisanId, artisanName, region, regionId, state, city,
    craftTechnique: technique, material, dimensions: dims, weight, color, stock, stockCount: stock,
    availability: avail, makingTime, craftingTime: time, moq, leadTime,
    rating, reviewCount: reviews,
    hoverImage,
    has3D: opts?.has3D !== undefined ? opts.has3D : Boolean(model3D),
    isFeatured3D: opts?.isFeatured3D ?? false,
    isVerified, b2bAvailable, featured: false, bestSeller: false, newArrival: false,
    tags, careInstructions: care, shippingEstimate: ship, returnEligible: returnOk,
    createdAt: `2024-0${(idx % 9) + 1}-${String((idx % 28) + 1).padStart(2, '0')}`,
    ...opts,
    image,
    images: gallery,
    gallery,
    model3D,
  };
}

const dry = 'Wipe with dry cloth. Keep away from moisture.';
const wash = 'Hand wash with mild soap. Do not machine wash.';
const gentle = 'Dry clean recommended. Store in cool, dry place.';
const wood = 'Wipe clean. Apply linseed oil occasionally.';
const metal = 'Polish with soft cloth. Avoid harsh chemicals.';
const s57 = '5-7 business days';
const s710 = '7-10 business days';
const s1014 = '10-14 business days';

export const products: Product[] = [
  // ═══════════ 3D FEATURED HERITAGE CRAFT MODELS (4) ═══════════
  p(
    '3d-pot-001',
    'Handcrafted Terracotta Urn & Storage Pot',
    'Terracotta Urn',
    'terracotta',
    'Storage & Urns',
    1299,
    'artisan-1',
    'rajasthan',
    'Rajasthan',
    'Molela',
    'Wheel-thrown & Pit-fired',
    'Natural Fired Clay / Terracotta',
    '24 × 24 × 28 cm',
    '2.4 kg',
    'Earthy Terracotta & Weathered Patina',
    16,
    'in-stock',
    '4-6 days',
    4.9,
    34,
    'Handcrafted traditional Indian terracotta urn and storage pot, wheel-thrown using mineral-rich village clay and pit-fired with husk and firewood for a characteristic warm earthy finish.',
    'Shaped by generational master potters of Molela, this timeless terracotta urn embodies rustic Indian craft. The vessel is wheel-thrown by hand, hand-burnished with river pebbles, and fired in traditional open pits to produce nuanced smoky gradients and organic textures. Ideal as a sustainable water vessel, dry botanical urn, or striking rustic centerpiece.',
    ['terracotta', 'pot', 'urn', 'pottery', 'clay', 'handcrafted', 'rustic', 'home decor', 'molela'],
    dry,
    s57,
    true,
    0,
    {
      featured: true,
      bestSeller: true,
      has3D: true,
      isFeatured3D: true,
      model3D: '/models/pot.glb',
      image: '/images/products/3d/pot-preview.jpg',
      gallery: [
        '/images/products/3d/pot-preview.jpg',
        '/images/products/3d/pot-texture.png',
      ],
      originalPrice: 1699,
      discountPercent: 24,
      artisanName: 'Rameshwar Lal Prajapati',
      region: 'Molela, Rajasthan',
      craftStory: 'Rameshwar Lal Prajapati continues an 800-year-old terracotta tradition in Molela, hand-kneading indigenous clay with organic chaff before throwing vessels with generational muscle memory.',
    }
  ),
  p(
    '3d-pot-002',
    'Artisanal Glazed Celadon Storage Pot with Handloom Cloth Seal',
    'Celadon Storage Pot',
    'pottery',
    'Storage Jars',
    1499,
    'artisan-2',
    'uttar-pradesh',
    'Uttar Pradesh',
    'Khurja',
    'Wheel-thrown Stoneware with High-Fire Mineral Glaze',
    'Stoneware Ceramic & Cotton Cloth',
    '22 × 22 × 20 cm',
    '1.9 kg',
    'Celadon Mineral Glaze with Indigo & Terracotta Accents',
    12,
    'in-stock',
    '5-7 days',
    4.8,
    27,
    'Hand-thrown stoneware ceramic storage vessel finished in a rich celadon mineral glaze, tied with traditional handloom cotton cloth seal and jute cord for heritage pantry storage or decorative curation.',
    'Originating from the historic ceramics hub of Khurja, this artisanal pot pairs high-fired vitrified stoneware with a hand-tied artisan cloth lid. The durable celadon glaze resists moisture and temperature fluctuations, while the tactile textile seal pays homage to traditional Indian grain and spice preservation techniques.',
    ['pottery', 'ceramics', 'celadon', 'storage pot', 'stoneware', 'khurja', 'glazed pot', 'kitchen', 'vessel'],
    wash,
    s57,
    true,
    1,
    {
      featured: true,
      bestSeller: true,
      has3D: true,
      isFeatured3D: true,
      model3D: '/models/another_pot.glb',
      image: '/images/products/3d/another-pot-preview.jpg',
      gallery: [
        '/images/products/3d/another-pot-preview.jpg',
        '/images/products/3d/another-pot-texture.png',
      ],
      originalPrice: 1899,
      discountPercent: 21,
      artisanName: 'Mohan Lal Kumhar',
      region: 'Khurja, Uttar Pradesh',
      craftStory: 'Mohan Lal Kumhar represents the third generation of Khurja ceramists, formulating custom mineral glazes using feldspar and natural quartz fired at 1220°C in energy-efficient kilns.',
    }
  ),
  p(
    '3d-vase-001',
    'Hand-Painted Floral Motif Ceramic Vase',
    'Floral Motif Vase',
    'pottery',
    'Vases & Vessels',
    1899,
    'artisan-3',
    'rajasthan',
    'Rajasthan',
    'Jaipur',
    'Underglaze Hand-Painting & High-Gloss Vitrification',
    'Glazed Ceramic & White Clay',
    '14 × 14 × 30 cm',
    '1.2 kg',
    'Glazed Ivory White with Terracotta Red Floral Motifs',
    9,
    'in-stock',
    '4-6 days',
    4.9,
    19,
    'Slender wheel-thrown ceramic vase adorned with hand-painted botanical red floral motifs and delicate foliage across a smooth milky-white glazed surface.',
    'This elegant ceramic vase showcases the delicate underglaze brushwork of Rajasthani ceramic painters. Featuring symmetrical crimson floral blossoms and trailing leaves inspired by Mughal miniature botanical patterns, the vase is double-fired to achieve a glass-like protective sheen. Perfect for fresh floral stems or as a standalone architectural accent.',
    ['vase', 'floral vase', 'ceramic', 'pottery', 'hand-painted', 'jaipur', 'home decor', 'flower vase', 'tabletop'],
    wash,
    s57,
    true,
    2,
    {
      featured: true,
      newArrival: true,
      has3D: true,
      isFeatured3D: true,
      model3D: '/models/floral_vase.glb',
      image: '/images/products/3d/floral-vase-preview.jpg',
      gallery: [
        '/images/products/3d/floral-vase-preview.jpg',
        '/images/products/3d/floral-vase-texture.png',
      ],
      originalPrice: 2399,
      discountPercent: 21,
      artisanName: 'Kailash Chand Sharma',
      region: 'Jaipur, Rajasthan',
      craftStory: 'Kailash Chand Sharma draws inspiration from the royal floral murals of Amer Fort, employing fine squirrel-hair brushes to hand-paint every petal before applying a crystalline mineral glaze.',
    }
  ),
  p(
    '3d-vase-002',
    'Heritage Ceramic Floral Display Vase',
    'Botanical Display Vase',
    'pottery',
    'Vases & Vessels',
    2499,
    'artisan-4',
    'west-bengal',
    'West Bengal',
    'Bankura',
    'Wheel-thrown Sculptural Stoneware & Floral Composition',
    'Stoneware Ceramic & Botanical Elements',
    '20 × 20 × 38 cm',
    '1.6 kg',
    'Earthy Cream Ceramic with Preserved Botanical Blossoms',
    7,
    'in-stock',
    '6-8 days',
    4.9,
    22,
    'Artisan stoneware display vase complemented by a hand-curated arrangement of preserved botanical blossoms, creating an instant living heritage centerpiece for tables and mantels.',
    'Created as a celebration of organic craft and floral balance, this display combines a substantial wheel-thrown stoneware vase with sculptural botanical stems. Handcrafted by master ceramists in Bengal, the vessel features subtle ribbed throwing rings that celebrate the maker\'s fingers on the wheel, paired with natural dried flora for enduring organic beauty.',
    ['vase', 'flowers', 'botanical vase', 'pottery', 'ceramics', 'floral display', 'bankura', 'centerpiece', 'living decor'],
    dry,
    s710,
    true,
    3,
    {
      featured: true,
      bestSeller: true,
      has3D: true,
      isFeatured3D: true,
      model3D: '/models/flowers_in_vase.glb',
      image: '/images/products/3d/flowers-vase-preview.jpg',
      gallery: [
        '/images/products/3d/flowers-vase-preview.jpg',
        '/images/products/3d/flowers-vase-texture.jpg',
      ],
      originalPrice: 3199,
      discountPercent: 22,
      artisanName: 'Biren Das',
      region: 'Bankura, West Bengal',
      craftStory: 'Biren Das works in the forested terracotta belt of Bankura, combining traditional wheel pottery with seasonal wild botanicals harvested and naturally dried along the riverbanks.',
    }
  ),

  // ═══════════ TERRACOTTA (8) ═══════════
  p('tc-1','Hand-Thrown Terracotta Water Carafe','Water Carafe','terracotta','Kitchenware',1850,'artisan-1','madhya-pradesh','Madhya Pradesh','Bhopal','Wheel throwing','Terracotta clay','28×12 cm','850g','Natural Terracotta',12,'in-stock','3-4 days',4.7,23,'Traditional wheel-thrown water carafe that keeps water naturally cool.','Shaped on a hand-powered wheel and fired in a wood kiln at low temperature to preserve porosity. The natural clay imparts a subtle earthy flavour and keeps water refreshingly cool without refrigeration.',['terracotta','kitchen','water','carafe'],dry,s57,true,0,{featured:true,bestSeller:true,collectionId:'earth-fire'}),
  p('tc-2','Terracotta Garden Planter','Garden Planter','terracotta','Garden',1200,'artisan-1','madhya-pradesh','Madhya Pradesh','Bhopal','Wheel throwing','Terracotta','18×16 cm dia','1.2kg','Earthy Brown',18,'in-stock','2-3 days',4.5,15,'Hand-thrown planter with carved geometric texture and drainage hole.','Each planter is thrown on a kick wheel, scored with a hand-carved pattern, and kiln-fired. The porous terracotta allows plant roots to breathe naturally.',['terracotta','planter','garden','indoor'],dry,s57,true,1,{collectionId:'earth-fire'}),
  p('tc-3','Terracotta Diya Set of 12','Diya Set','terracotta','Festive',450,'artisan-1','madhya-pradesh','Madhya Pradesh','Bhopal','Hand shaping','Terracotta','8×12 cm each','1.5kg total','Natural',50,'in-stock','1-2 days',4.8,38,'Traditional hand-shaped oil lamps for daily and festive use.','A set of twelve hand-shaped diyas, each slightly unique. These are the oldest form of Indian pottery — simple, functional and beautiful when lit.',['terracotta','diya','festive','lamp','set'],dry,s57,true,2,{bestSeller:true,newArrival:true}),
  p('tc-4','Terracotta Wall Plate — Floral','Wall Plate','terracotta','Wall Decor',1650,'artisan-1','madhya-pradesh','Madhya Pradesh','Bhopal','Hand carving','Terracotta','30 cm dia','1.8kg','Terracotta Red',8,'in-stock','4-5 days',4.3,9,'Decorative wall plate with hand-carved floral motif.','Flat-thrown and carved with a floral mandala pattern inspired by Madhya Pradesh temple architecture. Includes wall hook.',['terracotta','wall','decor','floral'],dry,s57,true,3),
  p('tc-5','Terracotta Matka Water Pot','Matka','terracotta','Kitchenware',950,'artisan-2','rajasthan','Rajasthan','Jaipur','Wheel throwing','Terracotta','35×25 cm','2.5kg','Natural',14,'in-stock','2-3 days',4.6,19,'Classic matka pot for storing and cooling water naturally.','A staple of Indian homes for millennia. This matka is fired at low temperature so the clay stays porous, cooling water through natural evaporation.',['terracotta','matka','water','traditional'],dry,s57,true,4,{bestSeller:true}),
  p('tc-6','Terracotta Pen Stand','Pen Stand','terracotta','Office',380,'artisan-1','madhya-pradesh','Madhya Pradesh','Bhopal','Hand shaping','Terracotta','10×8 cm','350g','Brown',25,'in-stock','1-2 days',4.2,7,'A compact hand-shaped terracotta pen holder.','Simple cylindrical form with a textured exterior, perfect for a desk or workshop table.',['terracotta','office','desk','pen-stand'],dry,s57,true,5,{newArrival:true}),
  p('tc-7','Terracotta Candle Holder Pair','Candle Holders','terracotta','Home Decor',780,'artisan-2','rajasthan','Rajasthan','Jaipur','Hand shaping','Terracotta','12×8 cm each','600g pair','Natural Red',16,'in-stock','2-3 days',4.4,12,'Pair of hand-shaped terracotta candle holders with rustic texture.','Sold as a pair. Each holder has a slightly irregular form that gives it character and catches candlelight beautifully.',['terracotta','candle','decor','pair'],dry,s57,true,6),
  p('tc-8','Terracotta Hanging Bell','Hanging Bell','terracotta','Home Decor',550,'artisan-1','madhya-pradesh','Madhya Pradesh','Bhopal','Hand shaping','Terracotta with jute cord','20×8 cm','400g','Natural',20,'in-stock','2-3 days',4.1,5,'Decorative terracotta bell on jute cord for doorways or gardens.','A charming hand-formed bell with a gentle tone, strung on natural jute rope.',['terracotta','bell','hanging','garden'],dry,s57,true,7),

  // ═══════════ POTTERY (6) ═══════════
  p('pt-1','Glazed Ceramic Serving Bowl','Serving Bowl','pottery','Kitchen',1450,'artisan-3','rajasthan','Rajasthan','Jaipur','Wheel & glaze','Stoneware ceramic','26×10 cm','900g','Teal Glaze',10,'in-stock','3-4 days',4.6,18,'Hand-thrown stoneware bowl with a rich teal crackle glaze.','Thrown on a kick wheel, bisque fired, hand-glazed and high-fired to 1200°C. Food-safe and microwave-friendly.',['pottery','bowl','kitchen','glazed'],wash,s57,true,0,{featured:true}),
  p('pt-2','Ceramic Dinner Plate Set of 4','Dinner Plates','pottery','Kitchen',3200,'artisan-3','rajasthan','Rajasthan','Jaipur','Wheel & glaze','Stoneware','28 cm dia each','3.2kg set','Cream & Brown',6,'in-stock','5-7 days',4.7,22,'Set of four hand-thrown dinner plates with an organic speckled finish.','Each plate has a slightly varied rim and organic speckle pattern. Dishwasher safe.',['pottery','plates','set','dining'],wash,s57,true,1,{bestSeller:true}),
  p('pt-3','Ceramic Soup Bowl with Handle','Soup Bowl','pottery','Kitchen',680,'artisan-3','rajasthan','Rajasthan','Jaipur','Wheel & glaze','Stoneware','14×10 cm','450g','Olive Green',15,'in-stock','3-4 days',4.4,11,'Cosy stoneware soup bowl with a pulled handle and smooth glaze.','The perfect vessel for winter soups. Hand-pulled handle and a comfortable lip.',['pottery','soup','bowl','kitchen'],wash,s57,true,2),
  p('pt-4','Handmade Ceramic Tea Cup Set','Tea Cups','pottery','Kitchen',1800,'artisan-4','west-bengal','West Bengal','Kolkata','Wheel & glaze','Porcelain','8×7 cm each','1kg set','White & Blue',9,'in-stock','4-5 days',4.8,28,'Set of six hand-thrown porcelain tea cups with blue rim accent.','Delicate porcelain cups thrown thin on a fast wheel. The cobalt blue rim is hand-painted before the final glaze firing.',['pottery','tea','cups','set','porcelain'],wash,s57,true,3,{featured:true,newArrival:true}),
  p('pt-5','Terracotta Flower Pot — Large','Flower Pot','pottery','Garden',890,'artisan-2','rajasthan','Rajasthan','Jaipur','Wheel throwing','Terracotta','22×20 cm','1.8kg','Natural',22,'in-stock','2-3 days',4.3,8,'Large wheel-thrown flower pot with rolled rim.','A generous pot for medium to large plants, with a drainage hole and saucer.',['pottery','flower','pot','garden'],dry,s57,true,4),
  p('pt-6','Ceramic Spice Jar with Lid','Spice Jar','pottery','Kitchen',520,'artisan-3','rajasthan','Rajasthan','Jaipur','Wheel & glaze','Stoneware','10×8 cm','350g','Warm Brown',30,'in-stock','3-4 days',4.5,14,'Airtight stoneware spice jar with cork-sealed lid.','A small but beautifully glazed jar for storing spices, tea leaves or dried herbs.',['pottery','spice','jar','kitchen','storage'],wash,s57,true,5,{newArrival:true}),

  // ═══════════ BLUE POTTERY (6) ═══════════
  p('bp-1','Blue Pottery Floral Bud Vase','Bud Vase','blue-pottery','Home Decor',3400,'artisan-5','rajasthan','Rajasthan','Jaipur','Quartz moulding','Quartz, glass, gum','24×14 cm','800g','Cobalt Blue',6,'in-stock','5-7 days',4.7,20,'Classic Jaipur blue pottery vase with hand-painted floral motifs.','Made without clay — from quartz stone powder, glass and gum. Hand-painted with cobalt oxide and fired at high temperature.',['blue-pottery','vase','jaipur','floral'],dry,s57,true,0,{featured:true,collectionId:'earth-fire'}),
  p('bp-2','Blue Pottery Tile Set of 6','Tile Set','blue-pottery','Wall Decor',2400,'artisan-5','rajasthan','Rajasthan','Jaipur','Hand painting','Quartz composite','10×10 cm each','1.2kg set','Blue & White',8,'in-stock','5-7 days',4.5,12,'Set of six decorative tiles with traditional Jaipur motifs.','Each tile is individually hand-painted. Can be used as coasters, wall art or kitchen backsplash accents.',['blue-pottery','tiles','wall','set'],dry,s57,true,1),
  p('bp-3','Blue Pottery Soap Dish','Soap Dish','blue-pottery','Bathroom',650,'artisan-5','rajasthan','Rajasthan','Jaipur','Hand painting','Quartz composite','14×10 cm','250g','Turquoise',20,'in-stock','3-4 days',4.3,8,'Delicate blue pottery soap dish with drainage ridges.','A functional yet beautiful addition to any bathroom. The ridges allow water to drain away from the soap.',['blue-pottery','soap','bathroom','gift'],dry,s57,true,2,{newArrival:true}),
  p('bp-4','Blue Pottery Coaster Set of 4','Coasters','blue-pottery','Kitchen',1200,'artisan-5','rajasthan','Rajasthan','Jaipur','Hand painting','Quartz composite','9 cm dia each','400g set','Blue & Yellow',14,'in-stock','3-4 days',4.6,16,'Four hand-painted blue pottery coasters with cork backing.','Each coaster features a different traditional motif. Cork backing protects furniture.',['blue-pottery','coasters','kitchen','set','gift'],dry,s57,true,3,{bestSeller:true}),
  p('bp-5','Blue Pottery Decorative Plate','Decorative Plate','blue-pottery','Wall Decor',2800,'artisan-5','rajasthan','Rajasthan','Jaipur','Hand painting','Quartz composite','30 cm dia','900g','Blue & White',5,'low-stock','5-7 days',4.8,25,'Large hand-painted plate for wall display or serving.','A stunning centrepiece painted with an intricate peacock feather pattern. Includes wall mount hook.',['blue-pottery','plate','wall','decorative'],dry,s57,true,4,{featured:true}),
  p('bp-6','Blue Pottery Coffee Mug','Coffee Mug','blue-pottery','Kitchen',750,'artisan-5','rajasthan','Rajasthan','Jaipur','Hand painting','Quartz composite','10×8 cm','300g','Cobalt Blue',18,'in-stock','3-4 days',4.4,10,'Hand-painted blue pottery mug with floral pattern.','Sturdy enough for daily use, beautiful enough for display. Hand wash recommended.',['blue-pottery','mug','kitchen','coffee'],wash,s57,true,5),

  // ═══════════ HANDLOOM SAREES (8) ═══════════
  p('hs-1','Banarasi Silk Saree — Gold Buta','Banarasi Saree','handloom','Sarees',12500,'artisan-6','uttar-pradesh','Uttar Pradesh','Varanasi','Pit loom weaving','Pure silk with zari','5.5×1.2m','650g','Deep Maroon',3,'low-stock','15-20 days',4.9,42,'Handwoven Banarasi silk with classic gold buta motifs.','Woven on a traditional pit loom with real gold zari thread. Each saree takes 15-20 days to complete.',['handloom','saree','banarasi','silk','wedding','zari'],gentle,s1014,false,0,{featured:true,bestSeller:true,originalPrice:15000,discountPercent:17}),
  p('hs-2','Chanderi Cotton-Silk Saree','Chanderi Saree','handloom','Sarees',4500,'artisan-7','madhya-pradesh','Madhya Pradesh','Chanderi','Handloom weaving','Cotton-silk blend','5.5×1.1m','400g','Ivory & Gold',7,'in-stock','7-10 days',4.6,18,'Lightweight Chanderi saree with delicate zari border.','The signature lightness and sheer quality of Chanderi fabric make this perfect for warm weather occasions.',['handloom','saree','chanderi','cotton-silk'],gentle,s710,false,1),
  p('hs-3','Maheshwari Handloom Saree','Maheshwari Saree','handloom','Sarees',3800,'artisan-7','madhya-pradesh','Madhya Pradesh','Maheshwar','Handloom weaving','Cotton-silk','5.5×1.1m','420g','Teal & Red',9,'in-stock','7-10 days',4.5,14,'Traditional Maheshwari saree with reversible border pattern.','Woven in the fort-town of Maheshwar on the banks of the Narmada. Known for its reversible borders.',['handloom','saree','maheshwari','cotton-silk'],gentle,s710,false,2,{newArrival:true}),
  p('hs-4','Pochampally Ikat Saree','Pochampally Saree','handloom','Sarees',5200,'artisan-8','telangana','Telangana','Pochampally','Ikat tie-dye weaving','Pure cotton','5.5×1.1m','500g','Indigo & White',5,'in-stock','10-15 days',4.7,21,'Geometric ikat patterns created by resist-dyeing threads before weaving.','The warp and weft threads are individually tied and dyed to create the characteristic blurred-edge geometric pattern.',['handloom','saree','ikat','pochampally','cotton'],gentle,s1014,false,3,{featured:true}),
  p('hs-5','Kanchipuram Silk Saree','Kanchipuram Saree','handloom','Sarees',18500,'artisan-9','tamil-nadu','Tamil Nadu','Kanchipuram','Pit loom weaving','Pure mulberry silk','5.5×1.2m','750g','Royal Blue & Gold',2,'low-stock','20-25 days',4.9,35,'Temple-border Kanchipuram silk with real gold zari work.','The queen of Indian sarees — heavy pure silk with a temple-inspired border woven with real gold-dipped zari thread.',['handloom','saree','kanchipuram','silk','wedding','premium'],gentle,s1014,false,4,{featured:true,bestSeller:true}),
  p('hs-6','Tussar Silk Saree — Natural','Tussar Saree','handloom','Sarees',6800,'artisan-10','bihar','Bihar','Bhagalpur','Handloom weaving','Tussar silk','5.5×1.1m','500g','Natural Gold',6,'in-stock','10-12 days',4.6,16,'Rich tussar silk saree with natural gold lustre and minimalist border.','Bhagalpur tussar silk has a distinctive textured weave and warm gold tone that comes from the silk itself.',['handloom','saree','tussar','silk','bhagalpur'],gentle,s710,false,5),
  p('hs-7','Muga Silk Saree — Assam','Muga Saree','handloom','Sarees',22000,'artisan-11','assam','Assam','Sualkuchi','Handloom weaving','Muga silk','5.5×1.2m','600g','Golden Yellow',1,'low-stock','20-25 days',5.0,8,'Rare Assamese muga silk saree — one of the most prestigious Indian textiles.','Muga silk is exclusive to Assam and is the only naturally golden silk in the world. It becomes more lustrous with each wash.',['handloom','saree','muga','silk','assam','premium','rare'],gentle,s1014,false,6,{featured:true}),
  p('hs-8','Paithani Silk Saree','Paithani Saree','handloom','Sarees',15000,'artisan-12','maharashtra','Maharashtra','Paithan','Handloom weaving','Pure silk','5.5×1.2m','700g','Green & Gold',3,'low-stock','15-20 days',4.8,19,'Traditional Maharashtra Paithani with peacock pallu motif.','The Paithani is Maharashtra\'s most celebrated textile — a pure silk saree with an elaborately woven peacock pallu.',['handloom','saree','paithani','silk','maharashtra','wedding'],gentle,s1014,false,7,{originalPrice:18000,discountPercent:17}),

  // ═══════════ COTTON TEXTILES (6) ═══════════
  p('ct-1','Block Print Cotton Bedsheet — King','Bedsheet','cotton-textiles','Bedding',2400,'artisan-13','rajasthan','Rajasthan','Bagru','Block printing','Handspun cotton','274×274 cm','1.8kg','Indigo & White',11,'in-stock','2-3 days',4.5,20,'King-size hand-block printed bedsheet with two matching pillowcases.','Printed using hand-carved teak blocks and natural indigo dye in the Bagru tradition. Pre-washed for softness.',['cotton','bedsheet','block-print','indigo','king'],wash,s57,true,0,{bestSeller:true}),
  p('ct-2','Cotton Table Runner — Dabu Print','Table Runner','cotton-textiles','Dining',850,'artisan-13','rajasthan','Rajasthan','Bagru','Dabu print','Cotton with natural dyes','180×35 cm','250g','Brown & Cream',16,'in-stock','2-3 days',4.4,12,'Hand-printed table runner using the traditional dabu mud-resist technique.','The dabu technique uses a mud paste stamped through carved blocks to create resist patterns before dyeing.',['cotton','table-runner','dabu','dining'],wash,s57,true,1),
  p('ct-3','Cotton Napkin Set of 6','Napkin Set','cotton-textiles','Dining',650,'artisan-13','rajasthan','Rajasthan','Bagru','Block printing','Cotton','40×40 cm each','300g set','Multi-colour',20,'in-stock','1-2 days',4.3,9,'Six hand-block printed cotton napkins in assorted traditional patterns.','Each napkin features a different block print motif. Machine washable; colours improve with washing.',['cotton','napkin','set','dining','block-print'],wash,s57,true,2,{newArrival:true}),
  p('ct-4','Handloom Cotton Cushion Cover Pair','Cushion Covers','cotton-textiles','Home Decor',890,'artisan-6','uttar-pradesh','Uttar Pradesh','Varanasi','Handloom weaving','Handloom cotton','45×45 cm each','400g pair','Indigo & Natural',14,'in-stock','1-2 days',4.5,15,'Pair of handloom cotton cushion covers with geometric weave pattern.','Woven on a traditional loom with natural and indigo-dyed cotton threads. Zip closure.',['cotton','cushion','cover','handloom','pair'],wash,s57,true,3,{collectionId:'threads-of-india'}),
  p('ct-5','Block Print Cotton Curtain Panel','Curtain','cotton-textiles','Home Decor',1600,'artisan-13','rajasthan','Rajasthan','Sanganer','Block printing','Cotton voile','210×120 cm','500g','White & Blue',8,'in-stock','2-3 days',4.4,7,'Sheer cotton voile curtain panel with delicate jaal block print.','Light-filtering hand-printed curtain that casts beautiful patterns when sunlit. Includes rod pocket.',['cotton','curtain','block-print','sheer'],wash,s57,true,4),
  p('ct-6','Cotton Throw Blanket — Kantha','Kantha Throw','cotton-textiles','Home Decor',2800,'artisan-14','west-bengal','West Bengal','Bolpur','Kantha stitching','Layers of cotton','200×150 cm','900g','Multicolour',5,'in-stock','7-10 days',4.7,22,'Hand-stitched kantha throw made from layers of vintage cotton.','Each kantha is stitched by hand through multiple layers of soft cotton, creating a unique texture and warmth.',['cotton','throw','kantha','bengal','hand-stitched'],wash,s710,true,5,{featured:true,bestSeller:true}),

  // ═══════════ SILK TEXTILES (5) ═══════════
  p('st-1','Handwoven Silk Stole','Silk Stole','silk-textiles','Accessories',3800,'artisan-6','uttar-pradesh','Uttar Pradesh','Varanasi','Pit loom weaving','Pure silk','180×55 cm','200g','Teal',7,'in-stock','5-7 days',4.6,14,'Delicate handwoven silk stole with fine zari border.','Woven on a pit loom with pure silk threads and fine zari edging that catches the light beautifully.',['silk','stole','handloom','banarasi'],gentle,s57,true,0,{collectionId:'threads-of-india'}),
  p('st-2','Kalamkari Silk Dupatta','Silk Dupatta','silk-textiles','Accessories',4200,'artisan-15','andhra-pradesh','Andhra Pradesh','Srikalahasti','Kalamkari hand painting','Silk','240×110 cm','250g','Natural & Red',5,'in-stock','7-10 days',4.7,18,'Hand-painted Kalamkari silk dupatta with mythological motifs.','Each line is drawn freehand using a bamboo pen dipped in natural dyes. The process takes several days.',['silk','dupatta','kalamkari','hand-painted'],gentle,s710,false,1,{featured:true}),
  p('st-3','Pashmina Silk Scarf','Silk Scarf','silk-textiles','Accessories',5500,'artisan-16','jammu-kashmir','Jammu & Kashmir','Srinagar','Hand weaving','Pashmina-silk blend','200×70 cm','120g','Ivory',4,'low-stock','10-14 days',4.9,30,'Ultra-fine pashmina-silk blend scarf with hand-embroidered border.','Woven from the finest pashmina-silk blend and finished with delicate hand embroidery along the border.',['silk','scarf','pashmina','kashmir','premium'],gentle,s1014,false,2,{originalPrice:7000,discountPercent:21}),
  p('st-4','Tussar Silk Fabric — 3 Metres','Silk Fabric','silk-textiles','Fabric',2200,'artisan-10','bihar','Bihar','Bhagalpur','Handloom weaving','Tussar silk','300×110 cm','350g','Natural Gold',10,'in-stock','3-5 days',4.4,8,'Three metres of hand-woven tussar silk fabric for tailoring.','A generous length of tussar silk with its characteristic textured weave — perfect for a kurta or blouse.',['silk','fabric','tussar','tailoring'],gentle,s57,true,3),
  p('st-5','Silk Pocket Square Set of 3','Pocket Squares','silk-textiles','Accessories',1400,'artisan-6','uttar-pradesh','Uttar Pradesh','Varanasi','Handloom weaving','Pure silk','25×25 cm each','60g set','Assorted',12,'in-stock','3-4 days',4.3,6,'Three handwoven silk pocket squares in complementary colours.','Hand-finished edges and a subtle sheen that only handloom silk can achieve.',['silk','pocket-square','men','set','gift'],gentle,s57,true,4,{newArrival:true}),

  // ═══════════ BLOCK PRINT (5) ═══════════
  p('bk-1','Bagru Block Print Dupatta','Block Print Dupatta','block-print','Accessories',1400,'artisan-13','rajasthan','Rajasthan','Bagru','Block printing','Cotton with natural dyes','240×110 cm','200g','Indigo & Red',10,'in-stock','2-3 days',4.5,16,'Hand-block printed cotton dupatta with traditional Bagru patterns.','Printed using the centuries-old Bagru technique with teak wood blocks and natural indigo and iron-based dyes.',['block-print','dupatta','cotton','bagru'],wash,s57,true,0),
  p('bk-2','Block Print Shirt Fabric — 2.5m','Shirt Fabric','block-print','Fabric',980,'artisan-13','rajasthan','Rajasthan','Sanganer','Block printing','Cotton','250×110 cm','300g','White & Green',14,'in-stock','2-3 days',4.4,11,'Enough hand-block printed cotton for one shirt.','Clean geometric print in natural dyes on pre-washed cotton. Ready for tailoring.',['block-print','fabric','shirt','cotton'],wash,s57,true,1,{newArrival:true}),
  p('bk-3','Block Print Dress Material — 3 Piece','Dress Material','block-print','Fabric',2200,'artisan-17','rajasthan','Rajasthan','Sanganer','Block printing','Cotton','3 cuts','600g','Pink & Blue',8,'in-stock','2-3 days',4.6,19,'Three-piece suit material — kurta, salwar and dupatta — all hand-printed.','Coordinated block-print set for a complete outfit. Natural dyes on soft cotton.',['block-print','dress-material','cotton','suit','set'],wash,s57,true,2,{bestSeller:true}),
  p('bk-4','Block Print Cotton Tote Bag','Tote Bag','block-print','Bags',680,'artisan-13','rajasthan','Rajasthan','Bagru','Block printing','Cotton canvas','38×42 cm','250g','Natural & Black',22,'in-stock','1-2 days',4.3,13,'Sturdy block-printed cotton tote with internal pocket.','A daily-use bag that celebrates traditional printing. Reinforced handles and a useful internal pocket.',['block-print','tote','bag','cotton','eco'],wash,s57,true,3),
  p('bk-5','Block Print Fabric Journal','Journal','block-print','Stationery',450,'artisan-17','rajasthan','Rajasthan','Jaipur','Block printing','Cotton-covered handmade paper','21×15 cm','250g','Blue',18,'in-stock','1-2 days',4.5,10,'Block-printed cotton cover with 120 pages of handmade paper.','A beautiful journal combining block-printed fabric with hand-pressed cotton-rag paper.',['block-print','journal','stationery','handmade-paper','gift'],dry,s57,true,4),

  // ═══════════ KALAMKARI (4) ═══════════
  p('kk-1','Kalamkari Wall Hanging — Garden Scene','Kalamkari Hanging','kalamkari','Wall Decor',4800,'artisan-15','andhra-pradesh','Andhra Pradesh','Srikalahasti','Kalamkari pen painting','Cotton with natural dyes','90×60 cm','400g','Multicolour',3,'low-stock','10-14 days',4.8,25,'Hand-painted Kalamkari wall hanging depicting a mythological garden.','Every line drawn freehand with a bamboo pen. Multiple rounds of painting, washing and re-painting build depth.',['kalamkari','wall-hanging','painting','cotton'],dry,s710,false,0,{featured:true}),
  p('kk-2','Kalamkari Cotton Dupatta','Kalamkari Dupatta','kalamkari','Accessories',1800,'artisan-15','andhra-pradesh','Andhra Pradesh','Srikalahasti','Block & pen kalamkari','Cotton','240×110 cm','200g','Natural & Black',8,'in-stock','5-7 days',4.5,12,'Kalamkari cotton dupatta combining pen work and block print.','A hybrid technique that uses blocks for backgrounds and freehand pen work for the central motifs.',['kalamkari','dupatta','cotton','hand-painted'],wash,s57,true,1),
  p('kk-3','Kalamkari Table Cloth — Round','Table Cloth','kalamkari','Dining',2400,'artisan-15','andhra-pradesh','Andhra Pradesh','Machilipatnam','Block kalamkari','Cotton','150 cm dia','500g','Red & Green',6,'in-stock','5-7 days',4.4,9,'Round Kalamkari table cloth with floral border pattern.','Block-printed using the Machilipatnam technique with vegetable dyes on preshrunk cotton.',['kalamkari','table-cloth','dining','block-print'],wash,s57,true,2),
  p('kk-4','Kalamkari Cushion Cover Set of 2','Kalamkari Cushions','kalamkari','Home Decor',1600,'artisan-15','andhra-pradesh','Andhra Pradesh','Srikalahasti','Block kalamkari','Cotton','45×45 cm each','350g pair','Cream & Earth',10,'in-stock','3-5 days',4.3,7,'Pair of Kalamkari-printed cushion covers with zip closure.','Traditional tree-of-life motif block-printed on natural cotton.',['kalamkari','cushion','cover','set','home'],wash,s57,true,3),

  // ═══════════ IKAT (4) ═══════════
  p('ik-1','Pochampally Ikat Cotton Saree','Ikat Saree','ikat','Sarees',5200,'artisan-8','telangana','Telangana','Pochampally','Ikat weaving','Pure cotton','5.5×1.1m','500g','Red & Black',5,'in-stock','10-15 days',4.7,21,'Double ikat saree with bold geometric patterns.','Both warp and weft threads are tie-dyed before weaving, creating the characteristic diamond pattern.',['ikat','saree','pochampally','cotton','geometric'],gentle,s1014,false,0,{collectionId:'threads-of-india'}),
  p('ik-2','Ikat Handloom Fabric — 5 Metres','Ikat Fabric','ikat','Fabric',3200,'artisan-8','telangana','Telangana','Pochampally','Ikat weaving','Cotton','500×110 cm','700g','Indigo & White',7,'in-stock','7-10 days',4.5,11,'Five metres of ikat-woven cotton for home furnishing or tailoring.','Enough fabric for curtains, cushion sets or two garments. Beautiful blurred-edge geometric pattern.',['ikat','fabric','cotton','handloom'],wash,s710,true,1),
  p('ik-3','Ikat Cushion Cover','Ikat Cushion','ikat','Home Decor',780,'artisan-8','telangana','Telangana','Pochampally','Ikat weaving','Cotton','45×45 cm','180g','Grey & White',14,'in-stock','3-5 days',4.4,8,'Single ikat-woven cushion cover with zipper back.','A contemporary diamond ikat pattern in subtle grey and white. Works beautifully with neutral interiors.',['ikat','cushion','home','geometric'],wash,s57,true,2,{newArrival:true}),
  p('ik-4','Ikat Silk Stole','Ikat Stole','ikat','Accessories',2800,'artisan-8','telangana','Telangana','Pochampally','Ikat weaving','Silk','180×55 cm','150g','Teal & Gold',6,'in-stock','7-10 days',4.6,13,'Ikat-woven silk stole with soft gradient effect.','The ikat technique on silk creates a uniquely soft, watercolour-like pattern.',['ikat','stole','silk','accessories'],gentle,s57,true,3),

  // ═══════════ WOODCRAFT (6) ═══════════
  p('wd-1','Hand-Carved Sheesham Serving Bowl','Serving Bowl','woodcraft','Kitchen',1600,'artisan-18','rajasthan','Rajasthan','Jodhpur','Lathe turning','Sheesham wood','26×10 cm','700g','Natural Brown',15,'in-stock','2-3 days',4.6,18,'Turned from a single piece of sheesham with a food-safe oil finish.','Each bowl shows the unique grain of the sheesham wood. Finished with food-safe linseed oil.',['wood','bowl','serving','kitchen','sheesham'],wood,s57,true,0,{collectionId:'wood-grain',bestSeller:true}),
  p('wd-2','Carved Wooden Serving Tray','Serving Tray','woodcraft','Kitchen',2100,'artisan-18','rajasthan','Rajasthan','Jodhpur','Hand carving','Sheesham with brass','40×25×5 cm','1.2kg','Dark Brown',10,'in-stock','3-4 days',4.5,14,'Hand-carved tray with brass handle inlays and carved border.','The border carving is done freehand, giving each piece subtle individual character.',['wood','tray','serving','brass','sheesham'],wood,s57,true,1,{collectionId:'wood-grain'}),
  p('wd-3','Wooden Spice Box with Lid — 9 Compartments','Spice Box','woodcraft','Kitchen',2800,'artisan-18','rajasthan','Rajasthan','Jodhpur','Hand carving','Mango wood','22×22×8 cm','1.5kg','Warm Brown',8,'in-stock','4-5 days',4.7,22,'Traditional masala dabba with nine removable compartments and a carved lid.','A beautifully carved version of the essential Indian kitchen staple.',['wood','spice-box','kitchen','masala-dabba','mango-wood'],wood,s57,true,2,{featured:true}),
  p('wd-4','Wooden Cutting Board — Acacia','Cutting Board','woodcraft','Kitchen',1200,'artisan-19','karnataka','Karnataka','Mysore','Hand shaping','Acacia wood','35×25×2 cm','900g','Light Brown',18,'in-stock','2-3 days',4.4,10,'Solid acacia wood cutting board with juice groove.','Dense, durable acacia wood with a natural antibacterial quality.',['wood','cutting-board','kitchen','acacia'],wood,s57,true,3),
  p('wd-5','Wooden Coaster Set of 6','Wood Coasters','woodcraft','Kitchen',580,'artisan-18','rajasthan','Rajasthan','Jodhpur','Lathe turning','Sheesham','9 cm dia each','300g set','Rosewood',25,'in-stock','1-2 days',4.3,8,'Set of six turned sheesham coasters in a holder.','Simple, elegant and functional. The natural rosewood grain makes each coaster unique.',['wood','coasters','set','kitchen'],wood,s57,true,4),
  p('wd-6','Wooden Bookend Pair — Elephant','Elephant Bookends','woodcraft','Home Decor',3500,'artisan-19','karnataka','Karnataka','Channapatna','Hand carving','Haldi wood','18×12×8 cm each','1.8kg pair','Natural',5,'in-stock','5-7 days',4.8,15,'Pair of hand-carved elephant bookends with lacquer finish.','Carved from a single block and finished with traditional Channapatna lacquer technique.',['wood','bookend','elephant','carved','pair'],wood,s57,true,5),

  // ═══════════ CHANNAPATNA TOYS (4) ═══════════
  p('cn-1','Channapatna Wooden Elephant','Toy Elephant','channapatna','Toys',680,'artisan-19','karnataka','Karnataka','Channapatna','Lathe & lacquer','Haldi wood','12×10×5 cm','200g','Multicolour',16,'in-stock','2-3 days',4.6,20,'Turned and lacquered wooden elephant in traditional Channapatna style.','Made using the GI-certified Channapatna lacquerware technique with non-toxic vegetable dyes.',['toy','elephant','channapatna','wooden','lacquer'],dry,s57,true,0,{giStatus:'GI-certified',bestSeller:true}),
  p('cn-2','Channapatna Spinning Top Set of 5','Spinning Tops','channapatna','Toys',450,'artisan-19','karnataka','Karnataka','Channapatna','Lathe & lacquer','Haldi wood','5×5 cm each','250g set','Assorted bright',25,'in-stock','1-2 days',4.7,28,'Set of five colourful lacquered spinning tops.','Classic spinning tops that delight children and adults alike. Non-toxic vegetable dyes.',['toy','spinning-top','channapatna','set','kids'],dry,s57,true,1,{giStatus:'GI-certified',newArrival:true}),
  p('cn-3','Channapatna Stacking Rings','Stacking Rings','channapatna','Toys',550,'artisan-19','karnataka','Karnataka','Channapatna','Lathe & lacquer','Haldi wood','18×8 cm','350g','Rainbow',18,'in-stock','2-3 days',4.5,15,'Classic wooden stacking toy with 8 colourful lacquered rings.','A timeless developmental toy made with food-safe lacquer paints.',['toy','stacking','channapatna','wooden','kids'],dry,s57,true,2),
  p('cn-4','Channapatna Baby Rattle','Baby Rattle','channapatna','Toys',350,'artisan-19','karnataka','Karnataka','Channapatna','Lathe & lacquer','Haldi wood','12×5 cm','80g','Pink & Green',22,'in-stock','1-2 days',4.8,32,'Smooth lacquered wooden rattle safe for babies 6 months+.','Tested for safety. Smooth edges, non-toxic colours, gentle sound.',['toy','rattle','baby','channapatna','safe'],dry,s57,true,3,{bestSeller:true}),

  // ═══════════ DHOKRA / BRASS (5) ═══════════
  p('dk-1','Dhokra Tribal Horse Sculpture','Dhokra Horse','dhokra','Sculptures',4200,'artisan-20','chhattisgarh','Chhattisgarh','Bastar','Lost-wax casting','Bell metal (brass)','22×18×8 cm','1.2kg','Golden Brass',5,'in-stock','7-10 days',4.7,23,'Striking Dhokra horse figure cast using the 4,000-year-old lost-wax technique.','Sculpted in beeswax, coated in clay and fired — the wax melts out, leaving a hollow mould for molten brass.',['dhokra','horse','brass','tribal','sculpture'],metal,s710,true,0,{featured:true,collectionId:'metal-traditions'}),
  p('dk-2','Dhokra Owl Figurine','Dhokra Owl','dhokra','Sculptures',2800,'artisan-20','chhattisgarh','Chhattisgarh','Bastar','Lost-wax casting','Bell metal','15×10×8 cm','800g','Antique Brass',8,'in-stock','5-7 days',4.5,14,'Wise owl figurine with characteristic Dhokra threadwork texture.','The fine thread-like texture on the surface comes from wax threads applied to the original model.',['dhokra','owl','brass','figurine','tribal'],metal,s57,true,1),
  p('dk-3','Bastar Dhokra Bell','Dhokra Bell','dhokra','Home Decor',1200,'artisan-20','chhattisgarh','Chhattisgarh','Bastar','Lost-wax casting','Bell metal','18×8 cm','600g','Dark Brass',12,'in-stock','5-7 days',4.4,10,'Traditional hanging bell with a deep, resonant tone.','Cast in bell metal for its rich sound. Often hung at doorways in tribal homes.',['dhokra','bell','brass','hanging','tribal'],metal,s57,true,2,{collectionId:'metal-traditions'}),
  p('dk-4','Brass Diya Lamp Stand','Brass Lamp','dhokra','Lighting',2400,'artisan-21','uttar-pradesh','Uttar Pradesh','Moradabad','Sand casting & engraving','Solid brass','18×12 cm','1kg','Gold Brass',9,'in-stock','3-4 days',4.6,17,'Hand-cast and engraved brass diya lamp with lotus petal base.','Cast using sand-casting technique, then every surface is hand-engraved with traditional motifs.',['brass','lamp','diya','lighting','moradabad'],metal,s57,true,3,{collectionId:'metal-traditions'}),
  p('dk-5','Brass Urli Bowl — Large','Brass Urli','dhokra','Home Decor',3200,'artisan-20','chhattisgarh','Chhattisgarh','Bastar','Casting & hammering','Cast brass','30×10 cm','2kg','Hammered Gold',6,'in-stock','4-5 days',4.5,11,'Traditional urli for floating flowers and candles.','A hammered-finish bowl that catches light beautifully when filled with water, flowers and floating diyas.',['brass','urli','decorative','floating','flowers'],metal,s57,true,4),

  // ═══════════ JEWELRY — BANGLES (4) ═══════════
  p('jb-1','Rajasthani Lac Bangle Set','Lac Bangles','bangles','Jewelry',450,'artisan-22','rajasthan','Rajasthan','Jaipur','Lac moulding','Lac resin with stone work','2.6 inner dia','100g set','Red & Gold',30,'in-stock','1-2 days',4.3,14,'Set of 8 traditional lac bangles with stone and mirror work.','Handcrafted from lac resin and decorated with tiny mirrors and coloured stones.',['bangles','lac','rajasthani','set','jewelry'],dry,s57,true,0,{variants:[{id:'jb1-24',label:'2.4',type:'size',value:'2.4',inStock:true},{id:'jb1-26',label:'2.6',type:'size',value:'2.6',inStock:true},{id:'jb1-28',label:'2.8',type:'size',value:'2.8',inStock:true}]}),
  p('jb-2','Brass Oxidised Cuff Bangle','Brass Cuff','bangles','Jewelry',680,'artisan-21','uttar-pradesh','Uttar Pradesh','Moradabad','Engraving','Oxidised brass','Adjustable','50g','Antique Silver',15,'in-stock','2-3 days',4.5,18,'Oxidised brass cuff with engraved tribal pattern.','An adjustable cuff bangle with a rich antique finish and hand-engraved geometric motifs.',['bangles','brass','cuff','oxidised','tribal'],metal,s57,true,1),
  p('jb-3','German Silver Bangle — Floral','Silver Bangle','bangles','Jewelry',950,'artisan-22','rajasthan','Rajasthan','Jaipur','Casting & engraving','German silver','2.6 inner dia','80g','Silver',10,'in-stock','2-3 days',4.6,21,'Chunky German silver bangle with hand-engraved floral pattern.','A statement piece that works beautifully stacked with other bangles.',['bangles','silver','floral','engraved','statement'],metal,s57,true,2,{variants:[{id:'jb3-24',label:'2.4',type:'size',value:'2.4',inStock:true},{id:'jb3-26',label:'2.6',type:'size',value:'2.6',inStock:true},{id:'jb3-28',label:'2.8',type:'size',value:'2.8',inStock:false}]}),
  p('jb-4','Hyderabadi Glass Bangle Set','Glass Bangles','bangles','Jewelry',280,'artisan-23','telangana','Telangana','Hyderabad','Glass blowing & lacquer','Glass with lacquer','2.4 inner dia','120g set','Multicolour',40,'in-stock','1 day',4.2,8,'Set of 12 delicate glass bangles in assorted colours.','Blown from coloured glass and finished with lac lacquer work. Each set is a rainbow of colour.',['bangles','glass','hyderabadi','set','colourful'],dry,s57,true,3,{variants:[{id:'jb4-r',label:'Red Tones',type:'color',value:'red',inStock:true},{id:'jb4-g',label:'Green Tones',type:'color',value:'green',inStock:true},{id:'jb4-b',label:'Blue Tones',type:'color',value:'blue',inStock:true}]}),

  // ═══════════ JEWELRY — EARRINGS (4) ═══════════
  p('je-1','Silver Jhumka Earrings','Jhumka Earrings','earrings','Jewelry',1800,'artisan-22','rajasthan','Rajasthan','Jaipur','Filigree & casting','Sterling silver','5 cm drop','15g pair','Silver',8,'in-stock','3-4 days',4.7,26,'Traditional bell-shaped jhumkas in sterling silver.','Handcrafted using a combination of casting and fine filigree work. Hypoallergenic.',['earrings','jhumka','silver','traditional'],metal,s57,true,0,{bestSeller:true}),
  p('je-2','Terracotta Stud Earrings','Terracotta Studs','earrings','Jewelry',250,'artisan-1','madhya-pradesh','Madhya Pradesh','Bhopal','Hand shaping','Terracotta with acrylic','1.5 cm dia','5g pair','Painted Multi',20,'in-stock','1-2 days',4.3,10,'Tiny hand-painted terracotta stud earrings.','Miniature terracotta discs hand-painted with traditional motifs and sealed with food-safe acrylic.',['earrings','terracotta','studs','painted','lightweight'],dry,s57,true,1),
  p('je-3','Brass Hoop Earrings — Tribal','Brass Hoops','earrings','Jewelry',550,'artisan-21','uttar-pradesh','Uttar Pradesh','Moradabad','Hand forging','Brass wire','3 cm dia','8g pair','Gold Brass',14,'in-stock','2-3 days',4.4,12,'Hand-forged brass hoop earrings with hammered texture.','Simple, elegant hoops with a hammered finish that catches the light.',['earrings','hoops','brass','tribal','minimal'],metal,s57,true,2),
  p('je-4','Meenakari Drop Earrings','Meenakari Drops','earrings','Jewelry',2200,'artisan-22','rajasthan','Rajasthan','Jaipur','Meenakari enamel','Silver with enamel','6 cm drop','12g pair','Blue & Green Enamel',6,'in-stock','5-7 days',4.8,22,'Sterling silver drop earrings with traditional Jaipur meenakari work.','Hand-enamelled using the meenakari technique — each colour is individually applied and fired.',['earrings','meenakari','silver','enamel','jaipur'],metal,s57,true,3,{featured:true}),

  // ═══════════ JEWELRY — NECKLACES (3) ═══════════
  p('jn-1','Oxidised Silver Choker — Tribal','Tribal Choker','necklaces','Jewelry',2400,'artisan-22','rajasthan','Rajasthan','Jaipur','Casting & oxidising','German silver','14-16 inch','100g','Antique Silver',5,'in-stock','3-5 days',4.6,17,'Bold tribal-style oxidised silver choker necklace.','A statement piece inspired by tribal jewellery traditions of Rajasthan.',['necklace','choker','silver','tribal','statement'],metal,s57,true,0),
  p('jn-2','Brass Pendant Necklace — Leaf','Leaf Pendant','necklaces','Jewelry',780,'artisan-21','uttar-pradesh','Uttar Pradesh','Moradabad','Hand forging','Brass with cotton cord','18 inch','30g','Brass & Brown',16,'in-stock','2-3 days',4.4,9,'Minimalist hand-forged brass leaf pendant on cotton cord.','A single hand-hammered leaf form suspended on an adjustable waxed cotton cord.',['necklace','pendant','brass','leaf','minimal'],metal,s57,true,1,{newArrival:true}),
  p('jn-3','Beaded Multi-Strand Necklace','Multi-Strand Necklace','necklaces','Jewelry',1400,'artisan-23','telangana','Telangana','Hyderabad','Bead stringing','Glass beads & brass','16-20 inch','80g','Coral & Gold',8,'in-stock','2-3 days',4.5,14,'Three-strand necklace of hand-blown glass beads and brass spacers.','A layered piece that brings colour and craft to any outfit.',['necklace','beaded','multi-strand','glass','coral'],dry,s57,true,2),

  // ═══════════ JUTE / NATURAL FIBRE (5) ═══════════
  p('jt-1','Hand-Woven Jute Market Basket','Jute Basket','jute','Baskets',980,'artisan-24','west-bengal','West Bengal','Murshidabad','Coil weaving','Natural jute fibre','30×25 cm','500g','Natural',20,'in-stock','2-3 days',4.5,16,'Sturdy hand-woven jute basket with rolled rim.','Woven by a women\'s cooperative using locally sourced jute. Perfect for markets or home storage.',['jute','basket','natural','eco','storage'],dry,s57,true,0,{collectionId:'natural-fibre',bestSeller:true}),
  p('jt-2','Jute Placemat Set of 4','Jute Placemats','jute','Dining',750,'artisan-24','west-bengal','West Bengal','Murshidabad','Coil stitching','Natural jute','35 cm dia each','400g set','Natural',25,'in-stock','1-2 days',4.4,12,'Round hand-stitched jute placemats — set of four.','Tightly coiled and hand-stitched for durability. Each one is slightly unique.',['jute','placemat','set','dining','natural'],dry,s57,true,1,{collectionId:'natural-fibre'}),
  p('jt-3','Jute Coaster Set of 6','Jute Coasters','jute','Kitchen',380,'artisan-24','west-bengal','West Bengal','Murshidabad','Coil stitching','Natural jute','10 cm dia each','150g set','Natural',35,'in-stock','1-2 days',4.3,8,'Compact hand-stitched jute coasters.','Protects surfaces while adding natural texture to your table.',['jute','coasters','set','kitchen','eco'],dry,s57,true,2),
  p('jt-4','Jute & Cotton Tote Bag','Jute Tote','jute','Bags',850,'artisan-24','west-bengal','West Bengal','Murshidabad','Weaving & stitching','Jute with cotton lining','38×42 cm','350g','Natural & Blue',14,'in-stock','2-3 days',4.5,11,'Lined jute tote bag with cotton handles and inner pocket.','A daily-use eco-friendly bag. Cotton lining keeps contents clean.',['jute','tote','bag','eco','cotton'],wash,s57,true,3),
  p('jt-5','Woven Cane Storage Bin — Medium','Cane Bin','jute','Storage',1400,'artisan-25','assam','Assam','Guwahati','Cane weaving','Bamboo cane','28×25 cm','600g','Natural',10,'in-stock','3-4 days',4.4,7,'Medium cane storage bin for laundry, toys or blankets.','Woven from split bamboo cane in a traditional Assamese pattern.',['cane','storage','bin','bamboo','assam'],dry,s57,true,4),

  // ═══════════ HOME DECOR (5) ═══════════
  p('hd-1','Brass Bell Wind Chime','Wind Chime','home-decor','Garden',1650,'artisan-21','uttar-pradesh','Uttar Pradesh','Moradabad','Casting','Brass with cotton cord','45 cm length','500g','Brass Gold',12,'in-stock','2-3 days',4.6,18,'Five brass bells on cotton cords producing a gentle melodic sound.','Each bell is individually cast and tuned. The sound is soft enough for bedroom windows.',['wind-chime','brass','bells','garden','home'],metal,s57,true,0),
  p('hd-2','Macrame Wall Hanging — Large','Macrame Hanging','home-decor','Wall Decor',2400,'artisan-26','kerala','Kerala','Kochi','Macrame knotting','Cotton rope','90×50 cm','600g','Natural White',6,'in-stock','5-7 days',4.5,11,'Large hand-knotted macrame wall hanging with fringe detail.','Hours of intricate knotting create this bohemian statement piece.',['macrame','wall-hanging','cotton','bohemian'],wash,s57,true,1),
  p('hd-3','Ceramic Bud Vase — Minimalist','Ceramic Vase','home-decor','Home Decor',1200,'artisan-3','rajasthan','Rajasthan','Jaipur','Wheel & glaze','Stoneware','16×8 cm','400g','Matte White',10,'in-stock','3-4 days',4.4,9,'Minimalist wheel-thrown ceramic bud vase with matte white glaze.','A quiet, elegant form for a single stem or small arrangement.',['ceramic','vase','minimal','white','home'],wash,s57,true,2),
  p('hd-4','Iron & Glass Lantern','Lantern','home-decor','Lighting',1800,'artisan-21','uttar-pradesh','Uttar Pradesh','Moradabad','Forging & assembly','Iron & glass','25×12 cm','800g','Matte Black',8,'in-stock','3-4 days',4.5,13,'Hand-forged iron lantern with clear glass panels.','Holds a standard tea light or small pillar candle. Suitable for indoor or sheltered outdoor use.',['lantern','iron','glass','candle','lighting'],metal,s57,true,3),
  p('hd-5','Soapstone Incense Holder','Incense Holder','home-decor','Home Decor',450,'artisan-27','rajasthan','Rajasthan','Agra','Hand carving','Soapstone','15×5 cm','200g','Cream',20,'in-stock','1-2 days',4.3,7,'Hand-carved soapstone incense holder with floral motif.','Catches ash neatly. The soft cream stone develops a warm patina over time.',['soapstone','incense','holder','carved'],dry,s57,true,4),

  // ═══════════ WALL DECOR (4) ═══════════
  p('wa-1','Madhubani Painting — Tree of Life','Madhubani Art','wall-decor','Folk Art',5500,'artisan-28','bihar','Bihar','Madhubani','Bharni painting','Natural pigments on paper','60×45 cm','300g','Multicolour',4,'in-stock','7-10 days',4.8,25,'Detailed Madhubani painting using natural pigments.','Painted with charcoal, turmeric, indigo and kumkum on handmade lokta paper.',['madhubani','painting','folk-art','tree-of-life'],dry,s710,false,0,{featured:true}),
  p('wa-2','Warli Art Canvas — Harvest Dance','Warli Art','wall-decor','Folk Art',3800,'artisan-29','maharashtra','Maharashtra','Dahanu','Warli painting','Rice paste on canvas','50×40 cm','400g','Brown & White',6,'in-stock','5-7 days',4.6,14,'Traditional Warli tribal art depicting a harvest celebration.','Painted using rice paste on a red-brown earth-coloured canvas. White figures dance in concentric circles.',['warli','painting','tribal','folk-art','canvas'],dry,s57,true,1),
  p('wa-3','Pattachitra Painting — Krishna','Pattachitra','wall-decor','Folk Art',6500,'artisan-30','odisha','Odisha','Puri','Pattachitra painting','Natural pigments on cloth','45×35 cm','250g','Rich Multicolour',3,'low-stock','10-14 days',4.9,20,'Traditional Odisha Pattachitra depicting Krishna Leela.','Painted on cloth prepared with tamarind paste and chalk, using pigments from stones and plants.',['pattachitra','painting','odisha','folk-art','krishna'],dry,s710,false,2,{featured:true}),
  p('wa-4','Brass Wall Plate — Sun Motif','Brass Sun Plate','wall-decor','Wall Decor',2800,'artisan-21','uttar-pradesh','Uttar Pradesh','Moradabad','Engraving','Brass','25 cm dia','800g','Polished Brass',7,'in-stock','3-5 days',4.5,11,'Hand-engraved brass wall plate with radiating sun motif.','The sun motif is a traditional symbol of energy and abundance. Includes wall mount.',['brass','wall','plate','sun','engraved'],metal,s57,true,3),

  // ═══════════ KITCHEN / DINING (4) ═══════════
  p('kd-1','Wooden Spoon Set of 5','Wooden Spoons','kitchen','Kitchenware',680,'artisan-18','rajasthan','Rajasthan','Jodhpur','Hand carving','Neem wood','Various sizes','200g set','Natural',18,'in-stock','1-2 days',4.5,15,'Set of five hand-carved neem wood cooking spoons.','Neem wood is naturally antibacterial and doesn\'t scratch cookware. Set includes ladle, spatula, stirrer, tasting spoon and rice scoop.',['kitchen','spoons','wooden','set','neem'],wood,s57,true,0,{bestSeller:true}),
  p('kd-2','Brass Thali Set — Traditional','Brass Thali','kitchen','Dining',4500,'artisan-21','uttar-pradesh','Uttar Pradesh','Moradabad','Casting & engraving','Solid brass','32 cm dia plate + bowls','2.5kg set','Polished Brass',4,'in-stock','5-7 days',4.7,18,'Complete brass thali set — plate, 4 bowls, glass and spoon.','Eating from brass is an ancient Ayurvedic practice. This set is cast and hand-engraved.',['brass','thali','set','dining','traditional','ayurvedic'],metal,s57,true,1,{featured:true}),
  p('kd-3','Copper Glass Set of 6','Copper Glasses','kitchen','Dining',2200,'artisan-21','uttar-pradesh','Uttar Pradesh','Moradabad','Hammering','Pure copper','10×8 cm each','1.8kg set','Hammered Copper',9,'in-stock','3-4 days',4.6,22,'Set of six hand-hammered pure copper drinking glasses.','Drinking from copper is recommended in Ayurveda. Each glass has a beautiful hammered texture.',['copper','glasses','set','kitchen','ayurvedic','hammered'],metal,s57,true,2,{bestSeller:true,variants:[{id:'kd3-4',label:'Set of 4',type:'size',value:'4',inStock:true},{id:'kd3-6',label:'Set of 6',type:'size',value:'6',inStock:true}]}),
  p('kd-4','Wooden Serving Platter — Oval','Serving Platter','kitchen','Dining',1800,'artisan-18','rajasthan','Rajasthan','Jodhpur','Lathe & carving','Acacia wood','45×25 cm','1kg','Natural',7,'in-stock','3-4 days',4.4,10,'Large oval acacia wood platter for cheese, fruits or snacks.','Finished with food-safe mineral oil to bring out the rich grain.',['wood','platter','serving','oval','acacia'],wood,s57,true,3),

  // ═══════════ SCULPTURES (2) ═══════════
  p('sc-1','Brass Nataraja — Dancing Shiva','Nataraja','sculptures','Religious',8500,'artisan-21','uttar-pradesh','Uttar Pradesh','Moradabad','Sand casting','Solid brass','30×25 cm','3kg','Polished Brass',3,'in-stock','7-10 days',4.9,30,'Traditional Nataraja — the cosmic dance of Shiva.','A detailed cast brass Nataraja following the classical Chola bronze proportions.',['brass','nataraja','sculpture','shiva','religious'],metal,s710,true,0,{featured:true}),
  p('sc-2','Terracotta Ganesh Idol','Ganesh Idol','sculptures','Religious',1800,'artisan-1','madhya-pradesh','Madhya Pradesh','Bhopal','Hand sculpting','Terracotta','20×15 cm','1.2kg','Natural Terracotta',8,'in-stock','3-5 days',4.6,18,'Hand-sculpted terracotta Ganesh with folk art detailing.','A contemporary folk-style Ganesh that can be immersed in water (eco-friendly).',['terracotta','ganesh','sculpture','eco-friendly','festive'],dry,s57,true,1),

  // ═══════════ FOLK ART / TRIBAL (2) ═══════════
  p('fa-1','Gond Painting on Paper — Birds','Gond Art','folk-art','Folk Art',3500,'artisan-28','madhya-pradesh','Madhya Pradesh','Mandla','Gond painting','Acrylic on paper','40×30 cm','200g','Vibrant Multi',5,'in-stock','5-7 days',4.7,16,'Gond tribal painting depicting birds in the characteristic dot-and-line style.','Painted by a Gond artist using the traditional technique of building forms from fine dots and lines.',['gond','painting','tribal','folk-art','birds'],dry,s57,true,0),
  p('fa-2','Tribal Dance Mask — Chhau','Chhau Mask','folk-art','Performance Art',2800,'artisan-14','west-bengal','West Bengal','Purulia','Papier-mache & paint','Papier-mache','30×25 cm','600g','Bright Multicolour',4,'in-stock','5-7 days',4.5,8,'Traditional Chhau dance mask from West Bengal.','Crafted from layers of papier-mache over a clay mould, then painted with bright folk colours.',['mask','chhau','dance','tribal','bengal'],dry,s57,true,1),

  // ═══════════ BAMBOO CRAFT (4) ═══════════
  p('bm-1','Handwoven Bamboo Fruit Basket','Bamboo Basket','bamboo','Baskets',850,'artisan-4','west-bengal','West Bengal','Bankura','Bamboo split weaving','Natural golden bamboo','30×12 cm','350g','Natural Bamboo',15,'in-stock','2-3 days',4.8,14,'Intricately handwoven bamboo basket crafted from matured local bamboo strips.','Skilled artisans split matured bamboo into flexible fine reeds and weave them in concentric patterns. Treated with natural oils for moisture resistance.',['bamboo','basket','kitchen','natural','fruit-basket'],dry,s57,true,0,{featured:true,b2bAvailable:true,moq:20}),
  p('bm-2','Bamboo Pendant Lamp Shade','Bamboo Lamp','bamboo','Lighting',1650,'artisan-4','west-bengal','West Bengal','Bankura','Lattice weaving','Moso bamboo & cane','35×30 cm','450g','Honey Gold',10,'in-stock','4-5 days',4.7,19,'Sleek cylindrical bamboo lampshade that casts gentle warm lattice shadows.','Handcrafted by bamboo artisans using steamed bamboo splits woven over a wooden mould. Diffuses warm ambient lighting for living rooms and cafes.',['bamboo','lamp','lighting','decor','pendant'],dry,s57,true,1,{featured:true,b2bAvailable:true,moq:15}),
  p('bm-3','Bamboo Tea Tray with Cane Handles','Tea Tray','bamboo','Dining',1250,'artisan-4','west-bengal','West Bengal','Bankura','Joinery & fine weaving','Bamboo & cane','40×28 cm','600g','Natural Blonde',12,'in-stock','3-4 days',4.6,11,'Minimalist lightweight serving tray with woven bamboo base and bent cane handles.','Combining sturdy solid bamboo frame with intricate diamond-woven bottom. Polished with non-toxic beeswax.',['bamboo','tray','dining','kitchen','serving'],dry,s57,true,2,{b2bAvailable:true,moq:25}),
  p('bm-4','Bamboo Wind Bell Chime','Bamboo Chime','bamboo','Garden',650,'artisan-4','west-bengal','West Bengal','Bankura','Hollow tube tuning','Seasoned bamboo & coconut shell','50×15 cm','400g','Earthy Brown',20,'in-stock','2-3 days',4.5,8,'Soothing deep-tone bamboo wind chime with carved coconut resonance top.','Hand-cut seasoned bamboo tubes tuned to harmonious pentatonic frequencies, producing a rich hollow acoustic sound in breezes.',['bamboo','wind-chime','garden','sound','balcony'],dry,s57,true,3,{b2bAvailable:true,moq:30}),
];
