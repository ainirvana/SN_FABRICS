'use client';

const testimonials = [
  {
    name: 'Priya Mehta',
    role: 'Boutique Owner, Mumbai',
    initials: 'PM',
    stars: 5,
    text: 'The Makhan Velvet from SN Fabrics is absolutely stunning — buttery soft, consistent quality, and delivered on time every single order. My customers love every lehenga I make with it. Couldn\'t ask for a more reliable supplier.',
  },
  {
    name: 'Rajesh Agarwal',
    role: 'Wholesale Dealer, Delhi',
    initials: 'RA',
    stars: 5,
    text: 'I\'ve been sourcing 9000 velvet from SN Fabrics for over a year now. The quality is top-notch, pricing is fair, and Alok bhai is always responsive. The trust factor here is unmatched — transparent trade, no surprises.',
  },
  {
    name: 'Fatima Al-Rashid',
    role: 'Fashion Designer, Dubai',
    initials: 'FA',
    stars: 5,
    text: 'As an international buyer, I needed a reliable exporter from Surat. SN Fabrics exceeded my expectations — their 11000 velvet and Fendy fabric are world-class. Smooth documentation, timely shipment, and premium packaging.',
  },
];

export default function Testimonials() {
  return (
    <section
      style={{
        backgroundColor: 'var(--cream)',
        padding: '96px 0',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--maroon)',
              marginBottom: '12px',
              fontWeight: 700,
            }}
          >
            ✦ Client Stories
          </p>
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--maroon)',
              marginBottom: '16px',
            }}
          >
            Words from Our <span style={{ color: 'var(--gold-muted)' }}>Trusted Partners</span>
          </h2>
          <div className="gold-line" />
        </div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="card-hover"
              style={{
                backgroundColor: '#fff',
                border: '1px solid rgba(67,36,48,0.1)',
                borderRadius: '12px',
                padding: '36px 32px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Gold top accent */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, var(--gold), var(--peach))' }} />

              {/* Quote mark */}
              <div
                style={{
                  fontSize: '4rem',
                  color: 'rgba(255,204,69,0.25)',
                  lineHeight: 1,
                  marginBottom: '16px',
                  fontFamily: 'Georgia, serif',
                  position: 'absolute',
                  top: '20px',
                  right: '24px',
                }}
              >
                "
              </div>

              {/* Stars */}
              <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
                {Array.from({ length: t.stars }).map((_, j) => (
                  <span key={j} style={{ color: 'var(--gold)', fontSize: '1rem' }}>★</span>
                ))}
              </div>

              <p
                style={{
                  fontSize: '0.95rem',
                  color: '#555',
                  lineHeight: 1.8,
                  marginBottom: '28px',
                  fontStyle: 'italic',
                }}
              >
                "{t.text}"
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--maroon), var(--maroon-light))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    flexShrink: 0,
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: 'var(--maroon)', fontSize: '0.95rem' }}>{t.name}</p>
                  <p style={{ fontSize: '0.8rem', color: '#888' }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
