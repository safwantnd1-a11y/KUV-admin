export interface Product {
  id: string;
  name: string;
  category: 'rice-mill' | 'poultry-feed' | 'atta-chakki';
  badge?: string;
  description: string;
  specs: { label: string; value: string }[];
  images: string[];
  model3d?: string; // For future 3D view support
}

export const products: Product[] = [
  // ─── Rice Mill Machinery ───────────────────────────────────────
  {
    id: 'trolly-rice-plant',
    name: 'Trolly Rice Plant',
    category: 'rice-mill',
    badge: 'High Capacity',
    description: 'Fully automatic trolly rice plant with 40-50 tons per day capacity. Engineered for large-scale industrial paddy processing with superior sorting efficiency.',
    specs: [
      { label: 'Capacity', value: '40–50 Ton / Day' },
      { label: 'Grade', value: 'Automatic' },
      { label: 'Material', value: 'Mild Steel' },
      { label: 'Weight', value: '3000 kg' },
      { label: 'Sorting Efficiency', value: '90–95%' },
      { label: 'Delivery', value: '1 Week' },
    ],
    images: ['/products/trolly-rice-plant.webp'],
  },
  {
    id: 'nano-model-with-cyclone',
    name: 'Nano Model With Cyclone',
    category: 'rice-mill',
    badge: 'Computerized',
    description: 'Compact yet powerful nano model with integrated cyclone system. Computerized operation with precise control for efficient grain processing.',
    specs: [
      { label: 'Dimensions', value: '1500×1200×1800 mm' },
      { label: 'Grade', value: 'Automatic' },
      { label: 'Computerized', value: 'Yes' },
      { label: 'Weight', value: '950 kg' },
      { label: 'Warranty', value: '1 Year' },
    ],
    images: ['/products/nano-cyclone.webp'],
  },
  {
    id: 'trolly-machine-with-husk-tank',
    name: 'Trolly Machine With Husk Tank',
    category: 'rice-mill',
    badge: 'Semi-Automatic',
    description: 'Industrial trolly machine with integrated husk tank for efficient waste management. Designed for continuous 10-15 ton capacity operations.',
    specs: [
      { label: 'Capacity', value: '10–15 Ton' },
      { label: 'Grade', value: 'Semi-Automatic' },
      { label: 'Dimensions', value: '3500×2000×2500 mm' },
      { label: 'Weight', value: '1200 kg' },
      { label: 'Warranty', value: '1 Year' },
    ],
    images: ['/products/trolly-husk-tank.webp'],
  },
  {
    id: 'paddy-husker',
    name: 'Paddy Husker',
    category: 'rice-mill',
    badge: 'Automatic',
    description: 'High-performance automatic paddy husker with 500-2000 kg/hr capacity. Precision engineering for maximum husk removal with minimal grain damage.',
    specs: [
      { label: 'Capacity', value: '500–2000 kg/hr' },
      { label: 'Grade', value: 'Automatic' },
      { label: 'Dimensions', value: '1400×600×1800 mm' },
      { label: 'Weight', value: '800 kg' },
      { label: 'Delivery', value: '1 Week' },
    ],
    images: [],
  },
  {
    id: 'single-rice-polisher',
    name: 'Single Rice Polisher Machine',
    category: 'rice-mill',
    badge: 'Automatic',
    description: 'Automatic single rice polisher delivering 2-4 tons per hour throughput. Produces high-gloss, market-ready white rice with premium finish.',
    specs: [
      { label: 'Capacity', value: '2–4 Tons / hr' },
      { label: 'Grade', value: 'Automatic' },
      { label: 'Dimensions', value: '1450×850×1600 mm' },
      { label: 'Weight', value: '600 kg' },
    ],
    images: [],
  },
  {
    id: 'emery-roller-rice-polisher',
    name: 'Emery Roller Rice Polisher',
    category: 'rice-mill',
    badge: 'High Efficiency',
    description: 'Premium emery roller polisher with up to 99% sorting efficiency. Processes 2-10 tons per hour for large-scale industrial rice milling operations.',
    specs: [
      { label: 'Capacity', value: '2–10 Tons / hr' },
      { label: 'Dimensions', value: '2800×1000×1400 mm' },
      { label: 'Material', value: 'Emery Roller' },
      { label: 'Efficiency', value: 'Up to 99%' },
      { label: 'Weight', value: '~800 kg' },
    ],
    images: [],
  },
  {
    id: 'paddy-separator',
    name: 'Paddy Separator',
    category: 'rice-mill',
    badge: 'Semi-Automatic',
    description: 'Efficient paddy separator for precise separation of paddy from milled rice. 1000-1500 kg/hr capacity with superior separation accuracy.',
    specs: [
      { label: 'Capacity', value: '1000–1500 kg/hr' },
      { label: 'Dimensions', value: '2000×1000×1500 mm' },
      { label: 'Weight', value: '450 kg' },
      { label: 'Grade', value: 'Semi-Automatic' },
    ],
    images: [],
  },
  {
    id: 'paddy-sheller-upper-cleaner',
    name: 'Paddy Sheller With Upper Cleaner',
    category: 'rice-mill',
    badge: 'Semi-Automatic',
    description: 'Advanced paddy sheller with integrated upper cleaning mechanism. 500 kg/hour processing with 95% sorting efficiency and 1-year warranty.',
    specs: [
      { label: 'Capacity', value: '500 kg/hr' },
      { label: 'Material', value: 'Mild Steel' },
      { label: 'Efficiency', value: '95%' },
      { label: 'Weight', value: '250 kg' },
      { label: 'Warranty', value: '1 Year' },
    ],
    images: [],
  },
  {
    id: 'paddy-sheller-lower-cleaner',
    name: 'Paddy Sheller With Lower Cleaner',
    category: 'rice-mill',
    badge: 'Semi-Automatic',
    description: 'Paddy sheller with lower cleaning unit for enhanced grain quality. 200 kg/hr capacity with 95% sorting efficiency.',
    specs: [
      { label: 'Capacity', value: '200 kg/hr' },
      { label: 'Dimensions', value: '1500×750×1200 mm' },
      { label: 'Material', value: 'Mild Steel' },
      { label: 'Efficiency', value: '95%' },
      { label: 'Warranty', value: '1 Year' },
    ],
    images: [],
  },
  {
    id: 'duplex-paddy-sheller',
    name: 'Duplex Paddy Sheller',
    category: 'rice-mill',
    badge: 'Dual Processing',
    description: 'Duplex paddy sheller for double-capacity processing. Metal construction built for heavy-duty continuous operation in large mills.',
    specs: [
      { label: 'Material', value: 'Metal' },
      { label: 'Weight', value: '150 kg' },
      { label: 'Width', value: '25–40 cm' },
      { label: 'Delivery', value: '1 Week' },
      { label: 'Supply', value: '10 Per Week' },
    ],
    images: [],
  },
  {
    id: 'emery-cone-polisher',
    name: 'Emery Cone Polisher',
    category: 'rice-mill',
    badge: 'Semi-Automatic',
    description: 'Reliable emery cone polisher for premium rice finishing. 300 kg/hr throughput with high sorting efficiency and sturdy metal construction.',
    specs: [
      { label: 'Capacity', value: '300 kg/hr' },
      { label: 'Material', value: 'Metal' },
      { label: 'Weight', value: '150 kg' },
      { label: 'Width', value: '700 mm' },
      { label: 'Warranty', value: '1 Year' },
    ],
    images: [],
  },
  {
    id: 'air-jet-polisher',
    name: 'Air Jet Polisher',
    category: 'rice-mill',
    badge: 'Manual',
    description: 'Air jet polisher using pressurized air stream for gentle grain polishing. High supply capacity of 10 units per day for bulk requirements.',
    specs: [
      { label: 'Grade', value: 'Manual' },
      { label: 'Material', value: 'Metal' },
      { label: 'Delivery', value: '1 Week' },
      { label: 'Supply', value: '10 Per Day' },
    ],
    images: [],
  },
  {
    id: 'trolly-rice-mill-plant',
    name: 'Trolly Rice Mill Plant',
    category: 'rice-mill',
    badge: 'Semi-Automatic',
    description: 'Complete trolly rice mill plant for 1000-1500 kg/hr processing. 90% sorting efficiency with Mild Steel construction and 1-year warranty.',
    specs: [
      { label: 'Capacity', value: '1000–1500 kg/hr' },
      { label: 'Material', value: 'Mild Steel' },
      { label: 'Efficiency', value: '90%' },
      { label: 'Weight', value: '950 kg' },
      { label: 'Warranty', value: '1 Year' },
    ],
    images: [],
  },
  {
    id: 'white-rice-grader',
    name: 'White Rice Grader',
    category: 'rice-mill',
    badge: 'Computerized',
    description: 'Computerized white rice grader for precise grain sorting and grading. Ensures uniform output quality meeting export-grade standards.',
    specs: [
      { label: 'Grade', value: 'Semi-Automatic' },
      { label: 'Computerized', value: 'Yes' },
      { label: 'Dimensions', value: '1200×800×1500 mm' },
      { label: 'Weight', value: '150 kg' },
    ],
    images: [],
  },
  {
    id: 'rice-mill-elevator',
    name: 'Rice Mill Elevator',
    category: 'rice-mill',
    badge: '98% Efficiency',
    description: 'High-efficiency rice mill elevator for vertical grain transportation. 98% sorting efficiency with compact footprint for integrated mill setups.',
    specs: [
      { label: 'Dimensions', value: '3150×370×390 mm' },
      { label: 'Efficiency', value: '98%' },
      { label: 'Weight', value: '280 kg' },
    ],
    images: [],
  },
  {
    id: 'trolly-model-with-cyclone',
    name: 'Trolly Model With Cyclone',
    category: 'rice-mill',
    badge: 'With Cyclone',
    description: 'Industrial trolly model with integrated cyclone dust collection system for clean, efficient rice milling and processing.',
    specs: [
      { label: 'Type', value: 'Rice Mill' },
      { label: 'Feature', value: 'Cyclone System' },
      { label: 'Grade', value: 'Semi-Automatic' },
    ],
    images: ['/products/nano-cyclone.webp'],
  },
  {
    id: 'husk-tank-model',
    name: 'Husk Tank Model',
    category: 'rice-mill',
    badge: 'Waste Management',
    description: 'Dedicated husk tank model for efficient collection and management of rice husk by-products in integrated rice mill systems.',
    specs: [
      { label: 'Type', value: 'Husk Tank' },
      { label: 'Application', value: 'Waste Management' },
      { label: 'Grade', value: 'Semi-Automatic' },
    ],
    images: ['/products/trolly-husk-tank.webp'],
  },
  {
    id: 'bran-tank-rice-cleaner',
    name: 'Bran Tank With Rice Cleaner',
    category: 'rice-mill',
    badge: 'Dual Function',
    description: 'Bran tank integrated with rice cleaner for combined bran collection and rice cleaning in a single efficient processing unit.',
    specs: [
      { label: 'Type', value: 'Bran Tank + Cleaner' },
      { label: 'Application', value: 'Rice Processing' },
      { label: 'Grade', value: 'Semi-Automatic' },
    ],
    images: [],
  },

  // ─── Poultry Feed Plant ────────────────────────────────────────
  {
    id: 'poultry-feed-mill',
    name: 'Poultry Feed Mill',
    category: 'poultry-feed',
    badge: 'Complete Plant',
    description: 'Complete poultry feed mill for grinding and mixing of feed ingredients. Designed for high-volume commercial poultry farming operations.',
    specs: [
      { label: 'Type', value: 'Feed Mill' },
      { label: 'Application', value: 'Commercial Poultry' },
      { label: 'Grade', value: 'Semi-Automatic' },
    ],
    images: ['/products/feed-plant.webp'],
  },

  // ─── Atta Chakki & Oil Expeller ────────────────────────────────
  {
    id: 'chakki-oil-expeller',
    name: 'Chakki & Oil Expeller',
    category: 'atta-chakki',
    badge: '99% Efficiency',
    description: 'Combined Chakki and Oil Expeller unit for multi-purpose grain processing. 10-20 tons per day capacity with exceptional 99% processing efficiency.',
    specs: [
      { label: 'Capacity', value: '10–20 Tons / Day' },
      { label: 'Dimensions', value: '1800×800×1200 mm' },
      { label: 'Material', value: 'Mild Steel' },
      { label: 'Efficiency', value: '99%' },
      { label: 'Weight', value: '1200 kg' },
    ],
    images: ['/products/mobile-chakki-oil.webp'],
  },
  {
    id: 'oil-expeller-atta-chaki',
    name: 'Oil Expeller With Atta Chaki',
    category: 'atta-chakki',
    badge: 'Multi-Purpose',
    description: 'Combined oil expeller and atta chaki unit for dual-purpose processing. Ideal for small to medium agro-processing setups.',
    specs: [
      { label: 'Type', value: 'Oil Expeller + Chaki' },
      { label: 'Application', value: 'Multi-Purpose' },
      { label: 'Material', value: 'Mild Steel' },
    ],
    images: ['/products/oil-expeller-chakki.webp'],
  },
];

export const riceMillProducts = products.filter(p => p.category === 'rice-mill');
export const poultryFeedProducts = products.filter(p => p.category === 'poultry-feed');
export const attaChakkiProducts = products.filter(p => p.category === 'atta-chakki');
