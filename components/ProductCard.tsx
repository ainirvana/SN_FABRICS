'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Product } from '@/lib/products';
import ShadeCardModal from './ShadeCardModal';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

const PHONE = '919825154197';
const PHONE_DISPLAY = '+91 98251 54197';

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);

  const waUrl = `https://wa.me/${PHONE}?text=${encodeURIComponent(product.whatsappMsg)}`;
  const callUrl = `tel:+${PHONE}`;
  const hasImages = product.images && product.images.length > 0;
  const images = product.images ?? [];

  return (
    <>
      {/* ── Card ── */}
      <div
        className="card-hover"
        style={{
          background: '#fff',
          borderRadius: '14px',
          overflow: 'hidden',
          border: '1px solid rgba(67,36,48,0.1)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          boxShadow: '0 4px 24px rgba(67,36,48,0.07)',
        }}
      >
        {/* Category badge */}
        <div style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 3 }}>
          <span style={{
            backgroundColor: product.category === 'velvet' ? 'var(--maroon)' : 'var(--maroon-light)',
            color: 'var(--gold)',
            padding: '4px 12px',
            borderRadius: '999px',
            fontSize: '0.62rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 700,
          }}>
            {product.category === 'velvet' ? '✦ Velvet' : '✦ Specialty'}
          </span>
        </div>

        {/* ── Image / Shade Card Area ── */}
        <div
          style={{
            height: compact ? '180px' : '220px',
            position: 'relative',
            overflow: 'hidden',
            background: `linear-gradient(135deg, var(--maroon-dark) 0%, var(--maroon) 40%, var(--maroon-light) 100%)`,
          }}
        >
          {hasImages ? (
            <>
              <Image
                src={images[imgIdx]}
                alt={`${product.name} shade card ${imgIdx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
              />
              {/* Gradient overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(46,24,32,0.55) 0%, transparent 55%)',
                pointerEvents: 'none',
              }} />

              {/* Click to view shimmer badge */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgba(255,204,69,0.18)',
                border: '1.5px solid rgba(255,204,69,0.6)',
                backdropFilter: 'blur(6px)',
                borderRadius: '8px',
                padding: '7px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: '#ffcc45',
                textTransform: 'uppercase',
                opacity: 0,
                transition: 'opacity 0.25s',
                pointerEvents: 'none',
              }} className="shade-hover-badge">
                🔍 View Shade Card
              </div>

              {/* Multi-image dots */}
              {images.length > 1 && (
                <div style={{
                  position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)',
                  display: 'flex', gap: '5px', zIndex: 3,
                }}>
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setImgIdx(i); }}
                      style={{
                        width: i === imgIdx ? '20px' : '7px',
                        height: '7px',
                        borderRadius: '4px',
                        background: i === imgIdx ? '#ffcc45' : 'rgba(255,255,255,0.5)',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'all 0.25s',
                      }}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              {/* Gradient placeholder with velvet texture pattern */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='1' fill='rgba(255,204,69,0.12)'/%3E%3C/svg%3E")`,
                backgroundSize: '20px 20px',
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(46,24,32,0.8) 0%, transparent 60%)',
              }} />
              <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                textAlign: 'center', color: 'rgba(255,204,69,0.6)',
              }}>
                <div style={{ fontSize: '2.2rem', marginBottom: '6px' }}>🧵</div>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>Shade Card Coming Soon</div>
              </div>
            </>
          )}

          {/* Width badge */}
          <div style={{ position: 'absolute', bottom: '32px', right: '14px', zIndex: 4 }}>
            <span style={{
              backgroundColor: 'rgba(255,204,69,0.15)',
              border: '1px solid rgba(255,204,69,0.3)',
              color: 'var(--gold)',
              padding: '3px 10px',
              borderRadius: '4px',
              fontSize: '0.6rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              {product.width} Width
            </span>
          </div>
        </div>

        {/* ── Content ── */}
        <div style={{ padding: compact ? '18px' : '22px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div>
            <h3 className="font-serif" 
              onClick={() => hasImages && setModalOpen(true)}
              style={{
              fontSize: compact ? '1.1rem' : '1.25rem',
              color: 'var(--maroon)',
              marginBottom: '2px',
              fontWeight: 700,
              lineHeight: 1.2,
              cursor: hasImages ? 'pointer' : 'default',
              textDecoration: hasImages ? 'underline' : 'none',
              textDecorationColor: 'rgba(67,36,48,0.3)',
              textUnderlineOffset: '4px',
            }}>
              {product.name}
            </h3>
            <p style={{ fontSize: '0.72rem', color: 'var(--maroon-light)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500 }}>
              {product.websiteName}
            </p>
          </div>

          <p style={{
            fontSize: '0.85rem', color: '#666', lineHeight: 1.7,
            display: compact ? '-webkit-box' : 'block',
            WebkitLineClamp: compact ? 3 : undefined,
            WebkitBoxOrient: compact ? 'vertical' : undefined,
            overflow: compact ? 'hidden' : undefined,
          }}>
            {product.description}
          </p>

          {/* Meta badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', marginTop: '2px' }}>
            <span style={{
              backgroundColor: 'rgba(255,204,69,0.13)',
              border: '1px solid rgba(255,204,69,0.35)',
              color: 'var(--maroon)',
              padding: '4px 12px',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 700,
            }}>
              {product.priceRange}
            </span>
            {product.weight && (
              <span style={{
                backgroundColor: 'rgba(67,36,48,0.06)',
                border: '1px solid rgba(67,36,48,0.12)',
                color: 'var(--maroon-light)',
                padding: '4px 12px',
                borderRadius: '4px',
                fontSize: '0.75rem',
              }}>
                {product.weight}
              </span>
            )}
            {/* Sample Kit badge */}
            <span style={{
              backgroundColor: 'rgba(67,36,48,0.9)',
              border: '1.5px solid rgba(255,204,69,0.7)',
              color: '#ffcc45',
              padding: '4px 12px',
              borderRadius: '4px',
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}>
              🎁 Sample Kit Available
            </span>
          </div>

          {/* Used for */}
          {!compact && (
            <p style={{ fontSize: '0.75rem', color: '#888', fontStyle: 'italic' }}>
              Best for: {product.usedFor}
            </p>
          )}

          {/* ── CTA Buttons ── */}
          <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', paddingTop: '6px', flexWrap: 'wrap' }}>
            {/* WhatsApp */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
                backgroundColor: '#25d366', color: '#fff',
                padding: '10px 12px', borderRadius: '6px',
                fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.04em',
                textDecoration: 'none', transition: 'all 0.2s ease', minWidth: '110px',
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
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.549 4.122 1.514 5.861L0 24l6.302-1.494A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 01-5.001-1.367l-.358-.214-3.742.886.934-3.637-.235-.374A9.808 9.808 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/>
              </svg>
              WhatsApp
            </a>

            {/* Call Now */}
            <a
              href={callUrl}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                backgroundColor: 'var(--maroon)', color: 'var(--cream)',
                padding: '10px 14px', borderRadius: '6px',
                fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.04em',
                textDecoration: 'none', transition: 'all 0.2s ease', whiteSpace: 'nowrap',
                border: '1px solid rgba(67,36,48,0.3)',
              }}
              title={`Call ${PHONE_DISPLAY}`}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--maroon-light)';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--maroon)';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
              }}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              Call Now
            </a>
          </div>

          {/* View shade card link */}
          {hasImages && (
            <button
              onClick={() => setModalOpen(true)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '0.72rem', color: 'var(--maroon)',
                textDecoration: 'underline', textUnderlineOffset: '3px',
                padding: '2px 0', display: 'flex', alignItems: 'center', gap: '5px',
                fontWeight: 600, letterSpacing: '0.04em',
              }}
            >
              📸 View {images.length} Shade Card Photo{images.length > 1 ? 's' : ''}
            </button>
          )}
        </div>
      </div>

      {/* ── Shade Card Modal ── */}
      {modalOpen && (
        <ShadeCardModal
          product={product}
          onClose={() => setModalOpen(false)}
        />
      )}

      <style>{`
        .shade-hover-badge { opacity: 0; transition: opacity 0.25s; }
        div:hover > .shade-hover-badge { opacity: 1; }
      `}</style>
    </>
  );
}
