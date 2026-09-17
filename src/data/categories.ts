import type { Category } from './types';
import { IMAGES } from './images';

export const primaryCategories = [
  { id: 'terracotta', name: 'Terracotta', description: 'Earth-fired porous clay pottery, cookware & decor', image: IMAGES.terracotta[0] },
  { id: 'pottery', name: 'Pottery & Ceramics', description: 'Handcrafted stoneware, glazed ceramics & Jaipur blue pottery', image: IMAGES.pottery[0] },
  { id: 'handloom', name: 'Handloom', description: 'Heritage weaves, pure silk stoles & artisanal sarees', image: IMAGES.handloom[0] },
  { id: 'jute', name: 'Jute & Natural Fibre', description: 'Eco-friendly hand-braided baskets, mats & storage', image: IMAGES.jute[0] },
  { id: 'woodcraft', name: 'Woodcraft', description: 'Hand-carved teak, sheesham & GI-certified Channapatna toys', image: IMAGES.woodcraft[0] },
  { id: 'metalcraft', name: 'Metalcraft', description: '4,000-year-old Dhokra bell metal casting & pure brassware', image: IMAGES.dhokra[0] },
  { id: 'block-print', name: 'Block Print & Textiles', description: 'Hand-carved wooden block stamped fabrics & natural dyes', image: IMAGES.blockPrint[0] },
  { id: 'folk-art', name: 'Folk Art', description: 'Indigenous Madhubani, Warli, Gond paintings & tribal crafts', image: IMAGES.folkArt[0] },
  { id: 'bamboo', name: 'Bamboo Craft', description: 'Sustainable woven bamboo lamps, cane baskets & table accents', image: IMAGES.bamboo[0] },
];

export const categories: Category[] = [
  { id: 'terracotta', name: 'Terracotta', description: 'Earth-fired pottery from the heart of India', image: IMAGES.terracotta[0], productCount: 8, subcategories: ['Kitchenware', 'Garden', 'Festive', 'Wall Decor', 'Home Decor'] },
  { id: 'pottery', name: 'Pottery & Ceramics', description: 'Handcrafted stoneware and ceramics', image: IMAGES.pottery[0], productCount: 12, subcategories: ['Kitchen', 'Dining', 'Garden', 'Home Decor'] },
  { id: 'blue-pottery', name: 'Blue Pottery', description: 'Iconic Jaipur glazed quartz craft', image: IMAGES.bluePottery[0], productCount: 6, subcategories: ['Home Decor', 'Kitchen', 'Bathroom', 'Wall Decor'] },
  { id: 'handloom', name: 'Handloom', description: 'Heritage sarees from master weavers', image: IMAGES.handloom[0], productCount: 8, subcategories: ['Sarees', 'Stoles', 'Fabric'] },
  { id: 'cotton-textiles', name: 'Cotton Textiles', description: 'Handspun and block-printed cotton', image: IMAGES.cottonTextiles[0], productCount: 6, subcategories: ['Bedding', 'Dining', 'Home Decor', 'Fabric'] },
  { id: 'silk-textiles', name: 'Silk Textiles', description: 'Pure silk stoles and accessories', image: IMAGES.silkTextiles[0], productCount: 5, subcategories: ['Accessories', 'Fabric'] },
  { id: 'block-print', name: 'Block Print & Textiles', description: 'Teak wood block stamped textiles', image: IMAGES.blockPrint[0], productCount: 5, subcategories: ['Accessories', 'Fabric', 'Bags', 'Stationery'] },
  { id: 'kalamkari', name: 'Kalamkari', description: 'Hand pen-painted textile art', image: IMAGES.kalamkari[0], productCount: 4, subcategories: ['Wall Decor', 'Accessories', 'Dining', 'Home Decor'] },
  { id: 'ikat', name: 'Ikat', description: 'Tie-dye woven geometric textiles', image: IMAGES.ikat[0], productCount: 4, subcategories: ['Sarees', 'Fabric', 'Home Decor', 'Accessories'] },
  { id: 'woodcraft', name: 'Woodcraft', description: 'Carved and lathe-turned woodware', image: IMAGES.woodcraft[0], productCount: 6, subcategories: ['Kitchen', 'Home Decor', 'Storage'] },
  { id: 'channapatna', name: 'Channapatna Toys', description: 'GI-certified lacquered wooden toys', image: IMAGES.toys[0], productCount: 4, subcategories: ['Toys'] },
  { id: 'dhokra', name: 'Dhokra & Metalcraft', description: 'Ancient lost-wax bell metal casting', image: IMAGES.dhokra[0], productCount: 8, subcategories: ['Sculptures', 'Home Decor', 'Wall Decor', 'Lighting'] },
  { id: 'metalcraft', name: 'Metalcraft', description: 'Brass, bell metal and copper craft', image: IMAGES.dhokra[0], productCount: 8, subcategories: ['Sculptures', 'Home Decor', 'Dining'] },
  { id: 'bangles', name: 'Bangles', description: 'Handcrafted lac, brass and silver bangles', image: IMAGES.bangles[0], productCount: 4, subcategories: ['Jewelry'] },
  { id: 'earrings', name: 'Earrings', description: 'Silver, meenakari and brass earrings', image: IMAGES.earrings[0], productCount: 4, subcategories: ['Jewelry'] },
  { id: 'necklaces', name: 'Necklaces', description: 'Artisan pendants and choker neckpieces', image: IMAGES.necklaces[0], productCount: 3, subcategories: ['Jewelry'] },
  { id: 'jute', name: 'Jute & Natural Fibre', description: 'Eco-friendly hand-woven fibre craft', image: IMAGES.jute[0], productCount: 6, subcategories: ['Baskets', 'Dining', 'Kitchen', 'Bags', 'Storage'] },
  { id: 'bamboo', name: 'Bamboo Craft', description: 'Sustainable woven bamboo and cane craft', image: IMAGES.bamboo[0], productCount: 4, subcategories: ['Baskets', 'Lighting', 'Dining', 'Garden'] },
  { id: 'home-decor', name: 'Home Decor', description: 'Quiet handcrafted objects for living spaces', image: IMAGES.homeDecor[0], productCount: 5, subcategories: ['Garden', 'Wall Decor', 'Lighting', 'Home Decor'] },
  { id: 'wall-decor', name: 'Wall Decor', description: 'Folk paintings and carved wall hangings', image: IMAGES.wallDecor[0], productCount: 4, subcategories: ['Folk Art', 'Tribal Art'] },
  { id: 'kitchen', name: 'Kitchen & Dining', description: 'Handmade wooden and copper tableware', image: IMAGES.kitchen[0], productCount: 4, subcategories: ['Kitchenware', 'Dining'] },
  { id: 'sculptures', name: 'Sculptures', description: 'Handcrafted brass and terracotta idols', image: IMAGES.sculptures[0], productCount: 2, subcategories: ['Religious', 'Tribal'] },
  { id: 'folk-art', name: 'Folk Art', description: 'Traditional painting and indigenous arts', image: IMAGES.folkArt[0], productCount: 6, subcategories: ['Folk Art', 'Performance Art'] },
];
