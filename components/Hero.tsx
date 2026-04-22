'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const words = ['Velvet.', 'Luxury.', 'Excellence.', 'Trust.'];

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIdx((i) => (i + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Animate a shimmer wave on canvas to simulate light on velvet fabric
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);

      // Draw 3 sweeping shimmer bands — like light reflecting off velvet
      const bands = [
        { speed: 0.0012, amp: 0.22, opacity: 0.07, color: '#ffcc45' },
        { speed: 0.0007, amp: 0.18, opacity: 0.045, color: '#ffd699' },
        { speed: 0.0018, amp: 0.15, opacity: 0.06, color: '#ffffff' },
      ];

      bands.forEach(({ speed, amp, opacity, color }) => {
        const phase = t * speed * Math.PI * 2;
        const grd = ctx.createLinearGradient(0, 0, w, h);
        const cx = (Math.sin(phase) * 0.5 + 0.5) * w;
        const grd2 = ctx.createRadialGradient(cx, h * amp, 0, cx, h * (1 - amp), w * 0.8);
        grd2.addColorStop(0, `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`);
        grd2.addColorStop(0.5, `${color}12`);
        grd2.addColorStop(1, `${color}00`);
        ctx.fillStyle = grd2;
        ctx.fillRect(0, 0, w, h);
      });

      // Fine velvet thread lines
      ctx.save();
      for (let i = 0; i < 80; i++) {
        const x = (i / 80) * w;
        const wave = Math.sin(t * 0.001 + i * 0.3) * 12;
        const alpha = 0.015 + Math.sin(t * 0.002 + i * 0.5) * 0.01;
        ctx.strokeStyle = `rgba(255,204,69,${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(x + wave, 0);
        ctx.lineTo(x - wave, h);
        ctx.stroke();
      }
      ctx.restore();

      t += 1;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
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
      {/* ── Premium Velvet Shimmer Canvas (animated background) ── */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          pointerEvents: 'none', zIndex: 0,
        }}
      />

      {/* Background decorative circles */}
      <div style={{
        position: 'absolute', top: '-10%', right: '-5%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,204,69,0.1) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 1,
      }} />
      <div style={{
        position: 'absolute', bottom: '-15%', left: '-10%',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,214,153,0.07) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Hexagon pattern overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L55 20 L55 40 L30 55 L5 40 L5 20 Z' fill='none' stroke='rgba(255,204,69,0.05)' stroke-width='1'/%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px',
        pointerEvents: 'none', zIndex: 2,
      }} />

      {/* Top-right radial gold glow */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '40vw', height: '40vw',
        background: 'radial-gradient(ellipse at center, rgba(255,204,69,0.12) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 2,
      }} />

      {/* ── Main Content ── */}
      <div
        style={{
          maxWidth: '900px', margin: '0 auto', padding: '0 24px',
          textAlign: 'center', position: 'relative', zIndex: 3,
        }}
      >
        {/* Badge */}
        <div
          className="animate-fadeIn"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            backgroundColor: 'rgba(255,204,69,0.12)',
            border: '1px solid rgba(255,204,69,0.3)',
            borderRadius: '999px', padding: '6px 18px', marginBottom: '32px',
            fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'var(--gold)', fontWeight: 600,
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--gold)', display: 'inline-block' }} className="animate-pulse-glow" />
          Surat-Based Premium Textile House
        </div>

        {/* Main heading */}
        <h1
          className="animate-fadeInUp font-serif"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'var(--cream)',
            lineHeight: 1.15, marginBottom: '16px', fontWeight: 700,
          }}
        >
          Premium Fabrics,
          <br />
          <span style={{ color: 'var(--gold)' }}>Trusted Trade.</span>
        </h1>

        {/* Rotating word */}
        <p
          key={wordIdx}
          style={{
            fontSize: 'clamp(1.25rem, 3vw, 2rem)', color: 'var(--peach)',
            marginBottom: '24px', fontFamily: 'var(--font-serif)', fontStyle: 'italic',
            minHeight: '2.5rem', animation: 'fadeInUp 0.5s ease',
          }}
        >
          Crafting {words[wordIdx]}
        </p>

        {/* Description */}
        <p
          className="animate-fadeIn"
          style={{
            fontSize: '1.05rem', color: 'rgba(255,240,221,0.82)',
            maxWidth: '640px', margin: '0 auto 40px', lineHeight: 1.8,
          }}
        >
          A Surat-based textile house redefining modern fabric trading with a rich portfolio
          of premium velvets — Makhan, 9000, 11000 — and an expanding collection of modern
          fabrics. Serving designers, retailers &amp; exporters across India and worldwide.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/products"
            style={{
              backgroundColor: 'var(--gold)', color: 'var(--maroon-dark)',
              padding: '14px 36px', borderRadius: '4px', fontWeight: 700,
              fontSize: '0.9rem', letterSpacing: '0.08em', textTransform: 'uppercase',
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px',
              transition: 'all 0.25s ease', boxShadow: '0 4px 20px rgba(255,204,69,0.3)',
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
              backgroundColor: 'transparent', color: 'var(--cream)',
              padding: '14px 36px', borderRadius: '4px', fontWeight: 600,
              fontSize: '0.9rem', letterSpacing: '0.08em', textTransform: 'uppercase',
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px',
              border: '1px solid rgba(255,240,221,0.4)', transition: 'all 0.25s ease',
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
          {/* Call Now Hero CTA */}
          <a
            href="tel:+919825154197"
            style={{
              backgroundColor: 'rgba(255,204,69,0.1)', color: 'var(--gold)',
              padding: '14px 28px', borderRadius: '4px', fontWeight: 700,
              fontSize: '0.9rem', letterSpacing: '0.08em', textTransform: 'uppercase',
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '9px',
              border: '1px solid rgba(255,204,69,0.4)', transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(255,204,69,0.2)';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(255,204,69,0.1)';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
            }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            Call Now
          </a>
        </div>



        {/* Gold divider */}
        <div style={{ marginTop: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <div style={{ flex: 1, maxWidth: '120px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,204,69,0.5))' }} />
          <span style={{ color: 'var(--gold)', fontSize: '1rem' }}>✦</span>
          <div style={{ flex: 1, maxWidth: '120px', height: '1px', background: 'linear-gradient(90deg, rgba(255,204,69,0.5), transparent)' }} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          color: 'rgba(255,240,221,0.5)', fontSize: '0.7rem',
          letterSpacing: '0.15em', textTransform: 'uppercase', zIndex: 3,
        }}
      >
        <span>Scroll</span>
        <div style={{ width: '1px', height: '40px', background: 'linear-gradient(180deg, rgba(255,204,69,0.5), transparent)' }} className="animate-float" />
      </div>
    </section>
  );
}
