import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us | S N Fabrics — Premium Fabrics, Trusted Trade',
  description: 'Learn about S N Fabrics — a Surat-based textile trading company with a passion for quality, consistency and evolving design. Vision, Mission, and Certifications.',
};

const missionPoints = [
  'To consistently deliver premium-quality fabrics that elevate every creation',
  'To build long-term partnerships based on trust, transparency, and reliability',
  'To expand our reach across domestic and international markets with strong export capabilities',
  'To continuously diversify and stay ahead with trend-forward and high-demand fabrics',
  "To uphold Surat's legacy as a textile hub through modern, quality-driven trade practices",
];

const certifications = [
  { title: 'GST Certificate', number: '24ABNPC6070A2Z5', icon: '📋', description: 'Goods & Services Tax Registration — verified business entity' },
  { title: 'Udyam Aadhar', number: 'UDYAM-GJ-22-0434307', icon: '🏭', description: 'MSME Registration under Ministry of MSME, Government of India' },
  { title: 'IEC Code', number: 'ABNPC6070A', icon: '🌍', description: 'Importer-Exporter Code — authorized for international trade' },
];

const heroBg = 'linear-gradient(135deg, #2e1820 0%, #432430 60%, #5c3242 100%)';
const hexPattern = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L55 20 L55 40 L30 55 L5 40 L5 20 Z' fill='none' stroke='rgba(255,204,69,0.05)' stroke-width='1'/%3E%3C/svg%3E")`;

export default function AboutPage() {
  return (
    <main style={{ paddingTop: '72px' }}>

      {/* ── Hero ──────────────────────────────────────── */}
      <section style={{ background: heroBg, padding: '100px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: hexPattern, backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ffcc45', marginBottom: '16px', fontWeight: 700 }}>✦ Our Story</p>
          <h1 className="font-serif" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#fff0dd', marginBottom: '24px', lineHeight: 1.15 }}>
            About <span style={{ color: '#ffcc45' }}>S N Fabrics</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,240,221,0.8)', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto' }}>
            Premium Fabrics, Trusted Trade — rooted in Surat, built for the world.
          </p>
        </div>
      </section>

      {/* ── Story ─────────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--cream)', padding: '96px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'start' }}>
            <div>
              <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--maroon)', marginBottom: '16px', fontWeight: 700 }}>✦ Who We Are</p>
              <h2 className="font-serif" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: 'var(--maroon)', marginBottom: '28px', lineHeight: 1.2 }}>
                A Name Built on Quality &amp; Trust
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '1rem', color: '#555', lineHeight: 1.9 }}>
                <p>S N Fabrics is a Surat-based textile trading company built on a passion for quality, consistency, and evolving design. Guided by our philosophy — <strong style={{ color: 'var(--maroon)' }}>"Premium Fabrics, Trusted Trade"</strong> — we specialise in delivering fabrics that meet the highest standards of finish, feel, and reliability.</p>
                <p>Over the past two years, we have established ourselves as a trusted name in the market, particularly in premium velvet categories such as Makhan Velvet, 9000 Velvet, and 11000 Velvet. Known for their rich texture, durability, and luxurious appeal, our velvet collections have become a preferred choice for designers, retailers, and manufacturers alike.</p>
                <p>Expanding beyond domestic markets, we have also grown into a reliable exporter over the last year, serving clients who value both quality and long-term partnerships. As we continue to evolve, S N Fabrics is actively diversifying into a wider range of textile offerings — bringing innovation, variety and global trends to our customers.</p>
                <p>At S N Fabrics, we believe that great fabrics are the foundation of exceptional creations. Our commitment lies in providing premium materials with transparency, trust, and a forward-looking approach to the textile industry.</p>
              </div>
            </div>

            <div>
              {/* Why Trust */}
              <div style={{ backgroundColor: 'var(--maroon)', borderRadius: '12px', padding: '40px 36px', marginBottom: '24px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,204,69,0.08)' }} />
                <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px', fontWeight: 700 }}>Why Trust Us?</p>
                <h3 className="font-serif" style={{ fontSize: '1.5rem', color: 'var(--cream)', marginBottom: '20px' }}>Your Partner for Premium Fabrics</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '20px' }}>
                  Our fabrics are carefully sourced and curated to ensure durability, comfort and a refined finish — making them ideal for garments, accessories, and designer projects. Whether you are a boutique owner, designer or fashion enthusiast, we provide versatile textile options that elevate every creation with a touch of global luxury.
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                  With a focus on quality, consistency and trend-forward designs, we aim to be your trusted partner in premium fabric trading.
                </p>
              </div>

              {/* Fact grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[
                  { icon: '📍', label: 'Surat, Gujarat', sub: "India's Textile Capital" },
                  { icon: '🌍', label: 'Global Exports', sub: 'Worldwide Delivery' },
                  { icon: '✅', label: 'GST Verified', sub: 'Transparent Trade' },
                  { icon: '📦', label: 'Pan-India', sub: 'Delivery Network' },
                ].map((f, i) => (
                  <div key={i} style={{ backgroundColor: '#fff', border: '1px solid rgba(67,36,48,0.1)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '1.4rem' }}>{f.icon}</span>
                    <p style={{ fontWeight: 700, color: 'var(--maroon)', fontSize: '0.85rem' }}>{f.label}</p>
                    <p style={{ fontSize: '0.75rem', color: '#888' }}>{f.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision & Mission ─────────────────────────── */}
      <section style={{ backgroundColor: 'var(--cream-dark)', padding: '96px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--maroon)', marginBottom: '12px', fontWeight: 700 }}>✦ Our Direction</p>
            <h2 className="font-serif" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--maroon)', marginBottom: '16px' }}>
              Vision &amp; <span style={{ color: 'var(--gold-muted)' }}>Mission</span>
            </h2>
            <div className="gold-line" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div style={{ backgroundColor: 'var(--maroon-dark)', borderRadius: '12px', padding: '48px 40px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, var(--gold), var(--peach))' }} />
              <div style={{ fontSize: '2.5rem', marginBottom: '20px' }}>🔭</div>
              <h3 className="font-serif" style={{ fontSize: '1.6rem', color: 'var(--gold)', marginBottom: '16px' }}>Vision</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.9 }}>
                To become a globally recognised textile trading house from Surat, known for setting benchmarks in premium fabric quality, innovation and trusted relationships across markets.
              </p>
            </div>

            <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '48px 40px', border: '1px solid rgba(67,36,48,0.1)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, var(--maroon), var(--maroon-light))' }} />
              <div style={{ fontSize: '2.5rem', marginBottom: '20px' }}>🎯</div>
              <h3 className="font-serif" style={{ fontSize: '1.6rem', color: 'var(--maroon)', marginBottom: '20px' }}>Mission</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {missionPoints.map((pt, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.875rem', color: '#555', lineHeight: 1.6 }}>
                    <span style={{ color: 'var(--gold-muted)', fontWeight: 700, marginTop: '2px', flexShrink: 0 }}>✦</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Client First ─────────────────────────────── */}
      <section style={{ background: 'linear-gradient(135deg, var(--maroon) 0%, var(--maroon-dark) 100%)', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: hexPattern, backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '3rem', marginBottom: '24px' }}>❤️</div>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px', fontWeight: 700 }}>✦ Client First</p>
          <h2 className="font-serif" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--cream)', marginBottom: '28px' }}>
            At S N Fabrics, the <span style={{ color: 'var(--gold)' }}>Client Takes Centre Stage</span>
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,240,221,0.8)', lineHeight: 1.9, marginBottom: '16px' }}>
            Our clients have always been at the heart of everything we do. From the quality of every fabric roll we trade to the reliability of every delivery, we hold ourselves to a standard that earns trust — and keeps it.
          </p>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,240,221,0.8)', lineHeight: 1.9, marginBottom: '48px' }}>
            Client satisfaction is not just a goal at S N Fabrics — it is the foundation we are built on. Every order we fulfil is backed by premium quality, on-time delivery, and a commitment to long-term trade relationships that our clients can depend on.
          </p>
          <Link href="/contact" className="btn-gold">Get a Quote →</Link>
        </div>
      </section>

      {/* ── Certifications ───────────────────────────── */}
      <section style={{ backgroundColor: 'var(--cream)', padding: '96px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--maroon)', marginBottom: '12px', fontWeight: 700 }}>✦ Government Registered</p>
            <h2 className="font-serif" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--maroon)', marginBottom: '16px' }}>
              Our <span style={{ color: 'var(--gold-muted)' }}>Certifications</span>
            </h2>
            <div className="gold-line" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {certifications.map((cert, i) => (
              <div key={i} className="card-hover" style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid rgba(67,36,48,0.1)', padding: '40px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, var(--gold), var(--peach))' }} />
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>{cert.icon}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--maroon)', marginBottom: '8px', letterSpacing: '0.05em' }}>{cert.title}</h3>
                <p style={{ fontSize: '0.875rem', color: '#888', marginBottom: '16px', lineHeight: 1.6 }}>{cert.description}</p>
                <div style={{ backgroundColor: 'rgba(67,36,48,0.05)', border: '1px solid rgba(67,36,48,0.12)', borderRadius: '6px', padding: '10px 16px', fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--maroon)', fontWeight: 600, letterSpacing: '0.05em' }}>
                  {cert.number}
                </div>
                <p style={{ fontSize: '0.7rem', color: '#bbb', marginTop: '12px' }}>Certificate available on request</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
