'use client';

import type { Product } from '@/lib/products';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const waUrl = `https://wa.me/919825154197?text=${encodeURIComponent(product.whatsappMsg)}`;

  return (
    <div
      className="card-hover"
      style={{
        background: '#fff',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid rgba(67,36,48,0.1)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Category badge */}
      <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 2 }}>
        <span
          style={{
            backgroundColor: product.category === 'velvet' ? 'var(--maroon)' : 'var(--maroon-light)',
            color: 'var(--gold)',
            padding: '4px 12px',
            borderRadius: '999px',
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          {product.category === 'velvet' ? '✦ Velvet' : '✦ Specialty'}
        </span>
      </div>

      {/* Fabric placeholder */}
      <div
        style={{
          height: compact ? '160px' : '200px',
          background: `linear-gradient(135deg, var(--maroon-dark) 0%, var(--maroon) 40%, var(--maroon-light) 100%)`,
          display: 'flex',
          alignItems: 'flex-end',
          padding: '16px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Texture pattern overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='1' fill='rgba(255,204,69,0.12)'/%3E%3C/svg%3E")`,
            backgroundSize: '20px 20px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(46,24,32,0.8) 0%, transparent 60%)',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ color: 'var(--cream)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.7 }}>
            {product.width} Width
          </p>
        </div>

        {/* Sample kit badge */}
        <div style={{ position: 'absolute', top: '50px', right: '16px', zIndex: 2 }}>
          <span
            style={{
              backgroundColor: 'rgba(255,204,69,0.15)',
              border: '1px solid rgba(255,204,69,0.3)',
              color: 'var(--gold)',
              padding: '3px 10px',
              borderRadius: '4px',
              fontSize: '0.6rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Sample Available*
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: compact ? '20px' : '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <h3
            className="font-serif"
            style={{
              fontSize: compact ? '1.15rem' : '1.3rem',
              color: 'var(--maroon)',
              marginBottom: '4px',
              fontWeight: 700,
            }}
          >
            {product.name}
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--maroon-light)', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 500 }}>
            {product.websiteName}
          </p>
        </div>

        <p
          style={{
            fontSize: '0.875rem',
            color: '#666',
            lineHeight: 1.7,
            display: compact ? '-webkit-box' : 'block',
            WebkitLineClamp: compact ? 3 : undefined,
            WebkitBoxOrient: compact ? 'vertical' : undefined,
            overflow: compact ? 'hidden' : undefined,
          }}
        >
          {product.description}
        </p>

        {/* Meta info */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
          <span
            style={{
              backgroundColor: 'rgba(255,204,69,0.12)',
              border: '1px solid rgba(255,204,69,0.3)',
              color: 'var(--maroon)',
              padding: '4px 12px',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 700,
            }}
          >
            {product.priceRange}
          </span>
          {product.weight && (
            <span
              style={{
                backgroundColor: 'rgba(67,36,48,0.06)',
                border: '1px solid rgba(67,36,48,0.12)',
                color: 'var(--maroon-light)',
                padding: '4px 12px',
                borderRadius: '4px',
                fontSize: '0.75rem',
              }}
            >
              {product.weight}
            </span>
          )}
        </div>

        {/* Use for */}
        {!compact && (
          <p style={{ fontSize: '0.75rem', color: '#888', fontStyle: 'italic' }}>
            Best for: {product.usedFor}
          </p>
        )}

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', paddingTop: '8px', flexWrap: 'wrap' }}>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              backgroundColor: '#25d366',
              color: '#fff',
              padding: '10px 16px',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '0.8rem',
              letterSpacing: '0.05em',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              minWidth: '140px',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#1da851';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#25d366';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
            }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.549 4.122 1.514 5.861L0 24l6.302-1.494A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 01-5.001-1.367l-.358-.214-3.742.886.934-3.637-.235-.374A9.808 9.808 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/>
            </svg>
            Get Quote on WhatsApp
          </a>
        </div>

        <p style={{ fontSize: '0.65rem', color: '#aaa', textAlign: 'center', marginTop: '4px' }}>
          *Sample kit available on chargeable basis
        </p>
      </div>
    </div>
  );
}
