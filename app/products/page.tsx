import type { Metadata } from 'next';
import ProductCard from '@/components/ProductCard';
import { mapDatabaseProduct } from '@/lib/products';
import { adminSupabase } from '@/lib/supabase/admin';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Product Range | S N Fabrics — Premium Velvet & Specialty Fabrics',
  description: 'Explore our complete fabric range: Makhan Velvet, 9000, 11000, Ice Velvet, 99999, Fendy, Sindoor and more. Sample kits available on request.',
};

export const dynamic = 'force-dynamic';

const heroBg = 'linear-gradient(135deg, #2e1820 0%, #432430 60%, #5c3242 100%)';
const hexPattern = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L55 20 L55 40 L30 55 L5 40 L5 20 Z' fill='none' stroke='rgba(255,204,69,0.05)' stroke-width='1'/%3E%3C/svg%3E")`;

export default async function ProductsPage() {
  const { data: dbProducts } = await adminSupabase
    .from('products')
    .select('*, product_images(url)')
    .order('sort_order', { ascending: true });

  const products = dbProducts?.map(mapDatabaseProduct) ?? [];
  const velvets = products.filter((p) => p.category === 'velvet');
  const specialty = products.filter((p) => p.category === 'specialty');

  return (
    <main style={{ paddingTop: '72px' }}>
      {/* ── Hero ──────────────────────────────────────── */}
      <section style={{ background: heroBg, padding: '100px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: hexPattern, backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ffcc45', marginBottom: '16px', fontWeight: 700 }}>✦ Collections</p>
          <h1 className="font-serif" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#fff0dd', marginBottom: '24px', lineHeight: 1.15 }}>
            Our <span style={{ color: '#ffcc45' }}>Product Range</span>
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,240,221,0.8)', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto 32px' }}>
            From ultra-soft Makhan Velvet to bold Fendy prints — discover fabrics crafted for designers, retailers, and fashion creators.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(255,204,69,0.12)', border: '1px solid rgba(255,204,69,0.3)', borderRadius: '8px', padding: '12px 24px', fontSize: '0.85rem', color: '#ffd699' }}>
            <span>📦</span>
            <span>Sample kits available for all categories (on chargeable basis) — WhatsApp us to request</span>
          </div>
        </div>
      </section>

      {/* ── Velvet Range ──────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--cream)', padding: '96px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ marginBottom: '48px' }}>
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--maroon)', marginBottom: '12px', fontWeight: 700 }}>✦ Premium Collection</p>
            <h2 className="font-serif" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: 'var(--maroon)', marginBottom: '16px' }}>
              Velvet <span style={{ color: 'var(--gold-muted)' }}>Range</span>
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#666', maxWidth: '600px', lineHeight: 1.7 }}>
              Our signature velvet categories — each crafted for a distinct aesthetic, feel, and purpose. Rich, consistent, and globally loved.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {velvets.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── Specialty Range ───────────────────────────── */}
      <section style={{ backgroundColor: 'var(--cream-dark)', padding: '96px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ marginBottom: '48px' }}>
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--maroon)', marginBottom: '12px', fontWeight: 700 }}>✦ Expanding Collection</p>
            <h2 className="font-serif" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: 'var(--maroon)', marginBottom: '16px' }}>
              Specialty <span style={{ color: 'var(--gold-muted)' }}>Fabrics</span>
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#666', maxWidth: '600px', lineHeight: 1.7 }}>
              Beyond velvet — our growing range of modern, trend-forward fabrics for today's fashion needs.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {specialty.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(135deg, var(--maroon-dark) 0%, var(--maroon) 100%)', padding: '80px 0' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <h2 className="font-serif" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: 'var(--cream)', marginBottom: '16px' }}>
            Can't find what you need?
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'rgba(255,240,221,0.75)', marginBottom: '32px', lineHeight: 1.7 }}>
            We are constantly expanding our range. WhatsApp us with your requirements and we'll source it for you.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://wa.me/919825154197?text=Hello%20SN%20Fabrics!%20I%20am%20looking%20for%20a%20specific%20fabric.%20Can%20you%20help%3F" target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              WhatsApp Inquiry
            </a>
            <Link href="/contact" className="btn-gold">Get a Quote</Link>
            <a href="tel:+919825154197" className="btn-maroon" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              Call Now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
