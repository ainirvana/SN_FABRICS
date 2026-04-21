export interface Product {
  id: string; // Changed to string for UUID
  slug: string;
  name: string;
  websiteName: string;
  description: string;
  qualityDescription: string;
  weight?: string;
  priceRange: string;
  width: string;
  usedFor: string;
  whatsappMsg: string;
  category: 'velvet' | 'specialty';
  featured?: boolean;
  images?: string[];
}

export function mapDatabaseProduct(dbProduct: any): Product {
  return {
    id: dbProduct.id,
    slug: dbProduct.slug,
    name: dbProduct.name,
    websiteName: dbProduct.website_name,
    description: dbProduct.description,
    qualityDescription: dbProduct.quality_desc,
    weight: dbProduct.weight || undefined,
    priceRange: dbProduct.price_range,
    width: dbProduct.width,
    usedFor: dbProduct.used_for,
    whatsappMsg: dbProduct.whatsapp_msg,
    category: dbProduct.category,
    featured: dbProduct.featured,
    images: dbProduct.product_images?.map((img: any) => img.url) || [],
  };
}
