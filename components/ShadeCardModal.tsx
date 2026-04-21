'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import type { Product } from '@/lib/products';

interface Props {
  product: Product;
  onClose: () => void;
}

const PHONE = '919825154197';
const PHONE_DISPLAY = '+91 98251 54197';

export default function ShadeCardModal({ product, onClose }: Props) {
  const images = product.images ?? [];
  const [current, setCurrent] = useState(0);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setCurrent((c) => (c + 1) % images.length);
      if (e.key === 'ArrowLeft') setCurrent((c) => (c - 1 + images.length) % images.length);
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose, images.length]);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);

  const waUrl = `https://wa.me/${PHONE}?text=${encodeURIComponent(product.whatsappMsg)}`;
  const callUrl = `tel:+${PHONE}`;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9998,
        backgroundColor: 'rgba(20, 8, 14, 0.92)',
        backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.25s ease',
      }}
    >
      {/* Modal Panel */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(145deg, #2e1820 0%, #1e0f16 100%)',
          borderRadius: '18px',
          border: '1px solid rgba(255,204,69,0.2)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,204,69,0.1)',
          maxWidth: '960px',
          width: '100%',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'fadeInUp 0.3s ease',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 24px',
          borderBottom: '1px solid rgba(255,204,69,0.15)',
          flexShrink: 0,
        }}>
          <div>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ffcc45', marginBottom: '4px', fontWeight: 700 }}>
              ✦ Shade Card — {product.websiteName}
            </p>
            <h2 className="font-serif" style={{ fontSize: '1.4rem', color: '#fff0dd', lineHeight: 1.2 }}>
              {product.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,204,69,0.1)', border: '1px solid rgba(255,204,69,0.3)',
              borderRadius: '50%', width: '38px', height: '38px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#ffcc45', fontSize: '1.1rem',
              transition: 'all 0.2s',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,204,69,0.2)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,204,69,0.1)'; }}
          >
            ✕
          </button>
        </div>

        {/* Body: image + details */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden', minHeight: 0 }}>
          {/* Image Viewer */}
          <div style={{
            flex: images.length > 0 ? '0 0 58%' : '0 0 0%',
            position: 'relative',
            background: '#0e0609',
            display: images.length ? 'flex' : 'none',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}>
            {images.length > 0 && (
              <>
                <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '350px' }}>
                  <Image
                    key={current}
                    src={images[current]}
                    alt={`${product.name} shade card ${current + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 560px"
                    style={{ objectFit: 'contain', padding: '16px' }}
                  />
                </div>

                {/* Nav arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      style={{
                        position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
                        background: 'rgba(255,204,69,0.15)', border: '1px solid rgba(255,204,69,0.35)',
                        borderRadius: '50%', width: '40px', height: '40px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', color: '#ffcc45', fontSize: '1.1rem',
                        transition: 'all 0.2s', backdropFilter: 'blur(4px)',
                        zIndex: 5,
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,204,69,0.3)'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,204,69,0.15)'; }}
                    >
                      ‹
                    </button>
                    <button
                      onClick={next}
                      style={{
                        position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                        background: 'rgba(255,204,69,0.15)', border: '1px solid rgba(255,204,69,0.35)',
                        borderRadius: '50%', width: '40px', height: '40px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', color: '#ffcc45', fontSize: '1.1rem',
                        transition: 'all 0.2s', backdropFilter: 'blur(4px)',
                        zIndex: 5,
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,204,69,0.3)'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,204,69,0.15)'; }}
                    >
                      ›
                    </button>
                  </>
                )}

                {/* Dots */}
                {images.length > 1 && (
                  <div style={{
                    position: 'absolute', bottom: '14px', left: '50%', transform: 'translateX(-50%)',
                    display: 'flex', gap: '6px', zIndex: 5,
                  }}>
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        style={{
                          width: i === current ? '22px' : '7px', height: '7px',
                          borderRadius: '4px',
                          background: i === current ? '#ffcc45' : 'rgba(255,255,255,0.3)',
                          border: 'none', cursor: 'pointer', padding: 0,
                          transition: 'all 0.25s',
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Counter */}
                <div style={{
                  position: 'absolute', top: '14px', right: '14px',
                  background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(5px)',
                  borderRadius: '20px', padding: '4px 12px',
                  fontSize: '0.7rem', color: '#ffd699', fontWeight: 600,
                  letterSpacing: '0.08em', zIndex: 5,
                }}>
                  {current + 1} / {images.length}
                </div>
              </>
            )}
          </div>

          {/* Details Side */}
          <div style={{
            flex: 1, padding: '28px 28px', overflowY: 'auto',
            display: 'flex', flexDirection: 'column', gap: '18px',
          }}>
            {/* Price tag */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              backgroundColor: 'rgba(255,204,69,0.12)',
              border: '1px solid rgba(255,204,69,0.3)',
              borderRadius: '8px', padding: '8px 18px',
              width: 'fit-content',
            }}>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffcc45', fontFamily: 'var(--font-serif)' }}>
                {product.priceRange}
              </span>
              {product.weight && (
                <span style={{ fontSize: '0.72rem', color: '#c9a47e', borderLeft: '1px solid rgba(255,204,69,0.2)', paddingLeft: '10px' }}>
                  {product.weight}
                </span>
              )}
            </div>

            {/* Description */}
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,240,221,0.8)', lineHeight: 1.8 }}>
              {product.description}
            </p>

            {/* Specs */}
            <div style={{ borderTop: '1px solid rgba(255,204,69,0.12)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Width', val: product.width },
                { label: 'Category', val: product.category.charAt(0).toUpperCase() + product.category.slice(1) },
                { label: 'Best For', val: product.usedFor },
                { label: 'Quality', val: product.qualityDescription },
              ].map(({ label, val }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', fontSize: '0.82rem' }}>
                  <span style={{ color: 'rgba(255,204,69,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, flexShrink: 0 }}>
                    {label}
                  </span>
                  <span style={{ color: '#fff0dd', textAlign: 'right' }}>{val}</span>
                </div>
              ))}
            </div>

            {/* Shade card notice */}
            {images.length > 0 && (
              <div style={{
                background: 'rgba(255,204,69,0.07)',
                border: '1px solid rgba(255,204,69,0.18)',
                borderRadius: '8px', padding: '10px 14px',
                fontSize: '0.75rem', color: '#c9a47e',
                display: 'flex', alignItems: 'flex-start', gap: '8px',
              }}>
                <span>📸</span>
                <span>Showing actual shade card photos. Colours may vary slightly due to screen calibration. Contact us for physical samples.</span>
              </div>
            )}

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 'auto', paddingTop: '4px' }}>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  backgroundColor: '#25d366', color: '#fff',
                  padding: '13px 20px', borderRadius: '8px',
                  fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.05em',
                  textDecoration: 'none', transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#1da851'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#25d366'; }}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.549 4.122 1.514 5.861L0 24l6.302-1.494A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 01-5.001-1.367l-.358-.214-3.742.886.934-3.637-.235-.374A9.808 9.808 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/>
                </svg>
                Get Quote on WhatsApp
              </a>
              <a
                href={callUrl}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  backgroundColor: 'rgba(255,204,69,0.12)',
                  border: '1.5px solid rgba(255,204,69,0.4)', color: '#ffcc45',
                  padding: '12px 20px', borderRadius: '8px',
                  fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.05em',
                  textDecoration: 'none', transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(255,204,69,0.22)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(255,204,69,0.12)'; }}
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                Call Now — {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
