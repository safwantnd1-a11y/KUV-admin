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

export const products: Product[] = [];

export const riceMillProducts = products.filter(p => p.category === 'rice-mill');
export const poultryFeedProducts = products.filter(p => p.category === 'poultry-feed');
export const attaChakkiProducts = products.filter(p => p.category === 'atta-chakki');
