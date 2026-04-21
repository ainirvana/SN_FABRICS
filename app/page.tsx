import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import Testimonials from '@/components/Testimonials';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { mapDatabaseProduct } from '@/lib/products';
import { adminSupabase } from '@/lib/supabase/admin';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SN Fabrics | Premium Fabrics, Trusted Trade — Surat, India',
  description:
    'SN Fabrics — Surat-based textile trading house specialising in luxury velvets, Makhan, 9000, 11000, Fendy, Sindoor and more. Pan-India delivery, global exports.',
  keywords: 'SN Fabrics, premium velvet fabric, Surat textile, Makhan velvet, wholesale fabric, fabric exporter India',
};

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const { data: dbProducts } = await adminSupabase
    .from('products')
    .select('*, product_images(url)')
    .eq('featured', true)
    .order('sort_order', { ascending: true })
    .limit(3);

  const featured = dbProducts?.map(mapDatabaseProduct) ?? [];

  return (
    <main>
      <Hero />
      <TrustBar />

      {/* ── About Snippet ─────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--cream)', padding: '96px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--maroon)', marginBottom: '16px', fontWeight: 700 }}>
                ✦ About S N Fabrics
              </p>
              <h2 className="font-serif" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--maroon)', marginBottom: '24px', lineHeight: 1.2 }}>
                Two Years of Excellence,
                <br />
                <span style={{ color: 'var(--gold-muted)' }}>A Legacy in Making</span>
              </h2>
              <p style={{ fontSize: '1rem', color: '#555', lineHeight: 1.9, marginBottom: '24px' }}>
                SN Fabrics is a Surat-based textile house redefining modern fabric trading. With a strong foundation in rich velvet
                categories like Makhan, 9000, and 11000 velvet, we have built a reputation for superior quality, refined textures,
                and consistent excellence.
              </p>
              <p style={{ fontSize: '1rem', color: '#555', lineHeight: 1.9, marginBottom: '36px' }}>
                With a growing global presence as exporters, we continue to evolve — expanding into Fendi, Sindoor and diverse fabric
                categories while staying rooted in trust, quality, and timeless luxury.
              </p>
              <Link href="/about" className="btn-maroon">
                Our Full Story →
              </Link>
            </div>

            {/* Stats cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { number: '3+', label: 'Years of Trust', icon: '🏆', dark: true },
                { number: '100+', label: 'Happy Clients', icon: '🤝', dark: false },
                { number: '10+', label: 'Fabric Varieties', icon: '🎨', dark: true },
                { number: '🌍', label: 'Global Exports Ready', icon: '', dark: false },
              ].map((s, i) => (
                <div
                  key={i}
                  className="card-hover"
                  style={{
                    backgroundColor: s.dark ? 'var(--maroon)' : '#fff',
                    borderRadius: '12px',
                    padding: '28px 24px',
                    border: `1px solid ${s.dark ? 'transparent' : 'rgba(67,36,48,0.1)'}`,
                    textAlign: 'center',
                  }}
                >
                  <p style={{ fontSize: '2rem', marginBottom: '8px' }}>{s.icon || s.number}</p>
                  {s.icon && (
                    <p style={{ fontSize: '1.8rem', fontWeight: 800, color: s.dark ? 'var(--gold)' : 'var(--maroon)', fontFamily: 'var(--font-serif)', marginBottom: '4px' }}>
                      {s.number}
                    </p>
                  )}
                  <p style={{ fontSize: '0.8rem', color: s.dark ? 'var(--text-muted)' : '#888' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Products ──────────────────────────── */}
      <section style={{ backgroundColor: 'var(--cream-dark)', padding: '96px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--maroon)', marginBottom: '12px', fontWeight: 700 }}>
              ✦ Our Collections
            </p>
            <h2 className="font-serif" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--maroon)', marginBottom: '16px' }}>
              Featured <span style={{ color: 'var(--gold-muted)' }}>Fabric Range</span>
            </h2>
            <div className="gold-line" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px', marginBottom: '48px' }}>
            {featured.map((p) => <ProductCard key={p.id} product={p} compact />)}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/products" className="btn-maroon">
              View All Fabrics →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────── */}
      <Testimonials />

      {/* ── CTA Banner ────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(135deg, var(--maroon-dark) 0%, var(--maroon) 100%)', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L55 20 L55 40 L30 55 L5 40 L5 20 Z' fill='none' stroke='rgba(255,204,69,0.05)' stroke-width='1'/%3E%3C/svg%3E")`, backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px', fontWeight: 700 }}>
            ✦ Start Your Order
          </p>
          <h2 className="font-serif" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--cream)', marginBottom: '16px' }}>
            Ready to Experience <br /><span style={{ color: 'var(--gold)' }}>Premium Textiles?</span>
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255,240,221,0.75)', marginBottom: '40px', lineHeight: 1.8 }}>
            Fill in our inquiry form or WhatsApp us directly. Bulk orders, custom shades, and international exports — we do it all.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-gold">Get a Quote</Link>
            <a href="https://wa.me/919825154197?text=Hello%20SN%20Fabrics!%20I%20am%20interested%20in%20placing%20a%20bulk%20order." target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
