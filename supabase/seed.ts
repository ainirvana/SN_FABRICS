/**
 * Run once after schema.sql to seed all 10 products into Supabase.
 * Usage: npx ts-node --skip-project supabase/seed.ts
 *   OR  put this in a Next.js API route and call it once
 */
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const PRODUCTS = [
  {
    slug: 'makhan-velvet', name: 'Makhan Velvet', website_name: 'Makhan Single Tone',
    description: 'Makhan Velvet is loved for its ultra-soft, buttery feel and smooth, rich texture. It has a graceful fall and a subtle shine that gives every outfit a premium look without feeling heavy. It combines comfort with elegance effortlessly.',
    quality_desc: 'Perfect for sarees, lehengas, blouses, gowns, and garments',
    weight: '19 kg', price_range: '₹200/mtr', width: "44'",
    used_for: 'Sarees, Lehengas, Blouses, Gowns',
    whatsapp_msg: "Hello SN Fabrics! I'm interested in *Makhan Velvet (Single Tone, 44')* — ultra-soft, buttery feel. Could you please share availability, colours and pricing? Thank you!",
    category: 'velvet', featured: true, sort_order: 1,
    images: ['/materials/makhan/Makhan.jpg', '/materials/makhan/Makhan2.jpg'],
  },
  {
    slug: 'micro-velvet-9000', name: 'Micro Velvet 9000', website_name: 'Micro Velvet 9000 Single Tone',
    description: 'Micro Velvet 9000 is a lightweight, 100% polyester velvet with a soft touch and elegant shine. It is thin, easy to handle, and drapes well, making it a practical yet stylish choice.',
    quality_desc: 'Lightweight polyester velvet with elegant drape',
    weight: '18.5 kg', price_range: '₹101/mtr', width: "44' / 54'",
    used_for: 'Ethnic Wear, Drapes, Curtains',
    whatsapp_msg: "Hello SN Fabrics! I'm interested in *Micro Velvet 9000 (Single Tone)* — lightweight 100% polyester velvet. Could you please share available shades, width (44'/54') and current pricing? Thank you!",
    category: 'velvet', featured: true, sort_order: 2,
    images: ['/materials/9000/1.jpg', '/materials/9000/2.jpg'],
  },
  {
    slug: 'micro-velvet-9000-crush', name: 'Velvet 9000 Crush', website_name: 'Micro Velvet 9000 Crush',
    description: "A perfect blend of richness and texture, Velvet 9000 Crush is known for its distinctive crushed finish that adds depth and dimension to every design. With a soft touch and subtle sheen, this fabric creates a statement look.",
    quality_desc: 'Crushed finish velvet with depth and dimension',
    price_range: '₹100–105/mtr', width: "44'",
    used_for: 'Occasion Wear, Drapes, High-End Garments',
    whatsapp_msg: "Hello SN Fabrics! I'm interested in *Micro Velvet 9000 Crush (44')* — crushed finish velvet with rich texture. Could you please share available colours and pricing? Thank you!",
    category: 'velvet', featured: false, sort_order: 3, images: [],
  },
  {
    slug: 'micro-velvet-11000', name: 'Micro Velvet 11000', website_name: 'Micro Velvet 11000 Single Tone',
    description: 'Micro Velvet 11000 offers a richer and slightly thicker feel for a more premium look. With deeper colours, a smoother finish, and a beautiful fall, it stands out in occasion and bridal wear.',
    quality_desc: 'Richer, thicker velvet for premium occasion wear',
    weight: '22 kg', price_range: '₹80–85/mtr', width: "44'",
    used_for: 'Lehengas, Sherwanis, Bridal Wear',
    whatsapp_msg: "Hello SN Fabrics! I'm interested in *Micro Velvet 11000 (Single Tone, 44')* — richer, thicker premium velvet. Could you please share colour options and current pricing? Thank you!",
    category: 'velvet', featured: true, sort_order: 4, images: [],
  },
  {
    slug: 'ice-velvet', name: 'Ice Velvet', website_name: 'Ice Velvet',
    description: 'Ice Velvet offers a smooth, cool-toned finish with a gentle shine that reflects understated sophistication. Lightweight yet plush, it provides a sleek and modern appeal, perfect for contemporary designs.',
    quality_desc: 'Cool-toned velvet with smooth sleek finish',
    weight: '21 kg', price_range: '₹100–105/mtr', width: "44'",
    used_for: 'Contemporary Fashion, Fluid Silhouettes',
    whatsapp_msg: "Hello SN Fabrics! I'm interested in *Ice Velvet (44')* — smooth cool-toned finish with gentle shine. Could you please share available shades and pricing? Thank you!",
    category: 'velvet', featured: false, sort_order: 5, images: [],
  },
  {
    slug: 'velvet-99999', name: 'Velvet 99999', website_name: 'Velvet 99999 — Single Tone',
    description: 'Crafted for those who demand the finest, Velvet 99999 represents superior quality with an ultra-soft hand feel and a rich, dense texture. Its luxurious finish and durability make it ideal for high-end creations.',
    quality_desc: 'Ultra-soft, dense, durable premium velvet',
    weight: '26 kg', price_range: '₹180–185/mtr', width: "44'",
    used_for: 'High-End Couture, Designer Garments',
    whatsapp_msg: "Hello SN Fabrics! I'm interested in *Velvet 99999 (Single Tone, 44')* — ultra-premium dense velvet. Could you please share colours and bulk pricing? Thank you!",
    category: 'velvet', featured: false, sort_order: 6, images: [],
  },
  {
    slug: 'velvet-99999-crush', name: 'Velvet 99999 Crush', website_name: 'Velvet 99999 Crush — Single Tone',
    description: 'An elevated version of our premium range, Velvet 99999 Crush combines the richness of top-grade velvet with a textured crushed effect. The interplay of light and shadow creates a bold, glamorous look.',
    quality_desc: 'Premium velvet + crushed texture — bold and glamorous',
    price_range: '₹250–255/mtr', width: "44'",
    used_for: 'Statement Outfits, Designer Collections',
    whatsapp_msg: "Hello SN Fabrics! I'm interested in *Velvet 99999 Crush (Single Tone, 44')* — premium crushed velvet. Could you please share colour availability, min. order quantity and pricing? Thank you!",
    category: 'velvet', featured: false, sort_order: 7,
    images: ['/materials/velvet-99999-crush/99999crush.jpg'],
  },
  {
    slug: 'velvet-embroidery', name: 'Velvet Embroidery', website_name: 'Velvet Embroidery Work',
    description: 'Our Velvet Embroidery Work fabric showcases intricate craftsmanship on a rich velvet base, blending texture with detailed artistry. Ideal for festive and couture wear, it brings elegance and design precision together.',
    quality_desc: 'Intricate embroidery on premium velvet base',
    price_range: 'As per design', width: "44'",
    used_for: 'Festive Wear, Couture, Bridal',
    whatsapp_msg: "Hello SN Fabrics! I'm interested in *Velvet Embroidery Work (44')* — intricate craftsmanship on velvet. Could you please share design catalogue and pricing? Thank you!",
    category: 'velvet', featured: false, sort_order: 8,
    images: ['/materials/velvet-work/Velvet-Work.png'],
  },
  {
    slug: 'fendi', name: 'Fendi', website_name: 'Fendi — Printed NC Satin',
    description: 'Fendi fabric is a premium printed material inspired by the iconic Fendi house signature — featuring bold interlocking FF motifs, geometric brocade patterns, and a rich satin-like finish. Widely loved in Indian fashion markets for its luxurious look at an accessible price point, it drapes beautifully and photographs exceptionally well.',
    quality_desc: 'Iconic FF-inspired print on smooth satin base — rich, photo-ready finish',
    weight: '9 kg', price_range: '₹42–44/mtr', width: "44'",
    used_for: 'Kurtis, Tops, Blouses, Dupattas, Modern Ethnic Wear',
    whatsapp_msg: "Hello SN Fabrics! I'm interested in *Fendi Fabric (Printed NC Satin, 44')* — the iconic FF-motif patterned fabric. Could you please share available print variants, colours, and current pricing? Thank you!",
    category: 'specialty', featured: true, sort_order: 9,
    images: ['/materials/fendi/f1.png', '/materials/fendi/F2.png', '/materials/fendi/F3.png', '/materials/fendi/F4.png', '/materials/fendi/F5.png', '/materials/fendi/F6.png'],
  },
  {
    slug: 'sindoor', name: 'Sindoor Fabric', website_name: 'Sindoor',
    description: 'Sindoor Fabric is a vibrant and striking textile known for its rich, deep red tone that symbolizes tradition, celebration, and timeless elegance. With a smooth finish and graceful fall, it is widely preferred for ethnic wear.',
    quality_desc: 'Vibrant deep red tone — smooth finish, graceful fall',
    weight: '9 kg', price_range: '₹40–42/mtr', width: "44'",
    used_for: 'Ethnic Wear, Festive Collections, Statement Pieces',
    whatsapp_msg: "Hello SN Fabrics! I'm interested in *Sindoor Fabric (44')* — rich deep red with smooth finish. Could you please share availability, variants and pricing? Thank you!",
    category: 'specialty', featured: false, sort_order: 10, images: [],
  },
];

async function seed() {
  console.log('🌱 Seeding products...');
  for (const p of PRODUCTS) {
    const { images, ...productData } = p;
    const { data: product, error } = await supabase
      .from('products')
      .upsert(productData, { onConflict: 'slug' })
      .select()
      .single();
    if (error) { console.error(`❌ ${p.name}:`, error.message); continue; }
    console.log(`✅ ${p.name}`);
    if (images && images.length > 0) {
      const imageRows = images.map((url, i) => ({ product_id: product.id, url, sort_order: i }));
      const { error: imgErr } = await supabase.from('product_images').upsert(imageRows);
      if (imgErr) console.error(`  ❌ images:`, imgErr.message);
      else console.log(`  📸 ${images.length} images seeded`);
    }
  }
  console.log('✅ Done!');
}

seed();
