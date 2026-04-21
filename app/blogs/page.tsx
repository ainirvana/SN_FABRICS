import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blogs | S N Fabrics — Textile Insights & Fabric Guides',
  description: 'Read the latest articles from S N Fabrics on premium velvet care, fabric trends, and the Surat textile industry.',
};

const blogs = [
  {
    id: 1,
    title: 'The Ultimate Guide to Premium Velvet Fabrics',
    excerpt: "Velvet is one of the most luxurious fabrics in the world — but not all velvet is created equal. From Makhan Velvet's buttery softness to the dense richness of Velvet 99999, here's everything you need to know before your next purchase.",
    date: 'April 10, 2026',
    readTime: '5 min read',
    tag: 'Fabric Guide',
    gradient: 'linear-gradient(135deg, #432430 0%, #5c3242 100%)',
    icon: '🪡',
  },
  {
    id: 2,
    title: 'Surat — The Textile Capital of India',
    excerpt: "Why does the world turn to Surat when it needs the finest fabrics? We explore the city's rich history as India's textile hub, its modern manufacturing ecosystem, and what makes Surat-sourced fabrics a mark of quality worldwide.",
    date: 'March 22, 2026',
    readTime: '6 min read',
    tag: 'Industry Insights',
    gradient: 'linear-gradient(135deg, #2e1820 0%, #432430 100%)',
    icon: '🏙️',
  },
  {
    id: 3,
    title: 'How to Care for Your Velvet Garments',
    excerpt: "Velvet garments are investments — and they deserve proper care. Learn the dos and don'ts of washing, storing, and maintaining your velvet pieces so they retain their lustre and softness for years to come.",
    date: 'March 5, 2026',
    readTime: '4 min read',
    tag: 'Care Tips',
    gradient: 'linear-gradient(135deg, #5c3242 0%, #432430 100%)',
    icon: '✨',
  },
];

const heroBg = 'linear-gradient(135deg, #2e1820 0%, #432430 60%, #5c3242 100%)';
const hexPattern = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L55 20 L55 40 L30 55 L5 40 L5 20 Z' fill='none' stroke='rgba(255,204,69,0.05)' stroke-width='1'/%3E%3C/svg%3E")`;
const dotPattern = `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='1' fill='rgba(255,204,69,0.15)'/%3E%3C/svg%3E")`;

export default function BlogsPage() {
  return (
    <main style={{ paddingTop: '72px' }}>

      {/* ── Hero ──────────────────────────────────────── */}
      <section style={{ background: heroBg, padding: '100px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: hexPattern, backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ffcc45', marginBottom: '16px', fontWeight: 700 }}>✦ Insights</p>
          <h1 className="font-serif" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#fff0dd', marginBottom: '24px', lineHeight: 1.15 }}>
            The SN Fabrics <span style={{ color: '#ffcc45' }}>Blog</span>
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,240,221,0.8)', lineHeight: 1.8 }}>
            Fabric guides, industry insights, care tips and more — straight from the heart of Surat's textile industry.
          </p>
        </div>
      </section>

      {/* ── Blog Grid ─────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--cream)', padding: '96px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '32px' }}>
            {blogs.map((blog) => (
              <article key={blog.id} className="card-hover" style={{ backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(67,36,48,0.1)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '200px', background: blog.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, backgroundImage: dotPattern, backgroundSize: '20px 20px' }} />
                  <span style={{ fontSize: '4rem', position: 'relative', zIndex: 1 }}>{blog.icon}</span>
                </div>
                <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <span style={{ backgroundColor: 'rgba(67,36,48,0.07)', color: 'var(--maroon)', padding: '4px 12px', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      {blog.tag}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#aaa' }}>{blog.readTime}</span>
                  </div>
                  <h2 className="font-serif" style={{ fontSize: '1.25rem', color: 'var(--maroon)', lineHeight: 1.3 }}>{blog.title}</h2>
                  <p style={{ fontSize: '0.875rem', color: '#666', lineHeight: 1.7, flex: 1 }}>{blog.excerpt}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid rgba(67,36,48,0.08)' }}>
                    <span style={{ fontSize: '0.75rem', color: '#aaa' }}>{blog.date}</span>
                    <span style={{ color: 'var(--maroon)', fontSize: '0.875rem', fontWeight: 600 }}>Coming Soon →</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div style={{ marginTop: '80px', backgroundColor: 'var(--maroon)', borderRadius: '16px', padding: '56px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, var(--gold), var(--peach))' }} />
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px', fontWeight: 700 }}>✦ Stay Updated</p>
            <h3 className="font-serif" style={{ fontSize: '2rem', color: 'var(--cream)', marginBottom: '16px' }}>Get Fabric Insights Delivered</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '32px', lineHeight: 1.7 }}>
              More blog posts, fabric guides, and industry updates coming soon. Follow us or WhatsApp us for the latest from S N Fabrics.
            </p>
            <a
              href="https://wa.me/919825154197?text=Hello%20SN%20Fabrics!%20Please%20keep%20me%20updated%20about%20your%20latest%20fabrics%20and%20offers."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              style={{ padding: '14px 32px' }}
            >
              Stay Connected on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
