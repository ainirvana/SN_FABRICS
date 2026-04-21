'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const words = ['Velvet.', 'Luxury.', 'Excellence.', 'Trust.'];

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIdx((i) => (i + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, var(--maroon-dark) 0%, var(--maroon) 55%, var(--maroon-light) 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '72px',
      }}
    >
      {/* Background decorative circles */}
      <div style={{
        position: 'absolute', top: '-10%', right: '-5%',
        width: '500px', height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,204,69,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-15%', left: '-10%',
        width: '600px', height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,214,153,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Decorative hexagon pattern overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L55 20 L55 40 L30 55 L5 40 L5 20 Z' fill='none' stroke='rgba(255,204,69,0.04)' stroke-width='1'/%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 24px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Badge */}
        <div
          className="animate-fadeIn"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(255,204,69,0.12)',
            border: '1px solid rgba(255,204,69,0.3)',
            borderRadius: '999px',
            padding: '6px 18px',
            marginBottom: '32px',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            fontWeight: 600,
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--gold)', display: 'inline-block' }} />
          Surat-Based Premium Textile House
        </div>

        {/* Main heading */}
        <h1
          className="animate-fadeInUp font-serif"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            color: 'var(--cream)',
            lineHeight: 1.15,
            marginBottom: '16px',
            fontWeight: 700,
          }}
        >
          Premium Fabrics,
          <br />
          <span style={{ color: 'var(--gold)' }}>Trusted Trade.</span>
        </h1>

        {/* Rotating word */}
        <p
          style={{
            fontSize: 'clamp(1.25rem, 3vw, 2rem)',
            color: 'var(--peach)',
            marginBottom: '24px',
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            minHeight: '2.5rem',
            transition: 'all 0.4s ease',
          }}
        >
          Crafting {words[wordIdx]}
        </p>

        {/* Description */}
        <p
          className="animate-fadeIn"
          style={{
            fontSize: '1.05rem',
            color: 'rgba(255,240,221,0.8)',
            maxWidth: '640px',
            margin: '0 auto 40px',
            lineHeight: 1.8,
          }}
        >
          A Surat-based textile house redefining modern fabric trading with a rich portfolio
          of premium velvets — Makhan, 9000, 11000 — and an expanding collection of modern
          fabrics. Serving designers, retailers & exporters across India and worldwide.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/products"
            style={{
              backgroundColor: 'var(--gold)',
              color: 'var(--maroon-dark)',
              padding: '14px 36px',
              borderRadius: '4px',
              fontWeight: 700,
              fontSize: '0.9rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.25s ease',
              boxShadow: '0 4px 20px rgba(255,204,69,0.3)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 30px rgba(255,204,69,0.5)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 20px rgba(255,204,69,0.3)';
            }}
          >
            Explore Our Range →
          </Link>
          <Link
            href="/contact"
            style={{
              backgroundColor: 'transparent',
              color: 'var(--cream)',
              padding: '14px 36px',
              borderRadius: '4px',
              fontWeight: 600,
              fontSize: '0.9rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid rgba(255,240,221,0.4)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--gold)';
              (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,240,221,0.4)';
              (e.currentTarget as HTMLAnchorElement).style.color = 'var(--cream)';
            }}
          >
            Get a Quote
          </Link>
        </div>

        {/* Gold line divider */}
        <div style={{ marginTop: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <div style={{ flex: 1, maxWidth: '120px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,204,69,0.5))' }} />
          <span style={{ color: 'var(--gold)', fontSize: '1rem' }}>✦</span>
          <div style={{ flex: 1, maxWidth: '120px', height: '1px', background: 'linear-gradient(90deg, rgba(255,204,69,0.5), transparent)' }} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          color: 'rgba(255,240,221,0.5)',
          fontSize: '0.7rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}
      >
        <span>Scroll</span>
        <div style={{ width: '1px', height: '40px', background: 'linear-gradient(180deg, rgba(255,204,69,0.5), transparent)' }} className="animate-float" />
      </div>
    </section>
  );
}
