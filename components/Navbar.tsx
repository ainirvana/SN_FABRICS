'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/',         label: 'Home'          },
  { href: '/about',    label: 'About Us'      },
  { href: '/products', label: 'Product Range' },
  { href: '/blogs',    label: 'Blogs'         },
  { href: '/contact',  label: 'Contact Us'    },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'all 0.3s ease',
          backgroundColor: scrolled ? 'rgba(67,36,48,0.97)' : '#432430',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,204,69,0.15)' : '1px solid rgba(255,204,69,0.1)',
        }}
      >
        <nav
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '72px',
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: '12px' }}>
            <Image
              src="/logo.png"
              alt="S N Fabrics Logo"
              width={160}
              height={48}
              style={{ objectFit: 'contain', width: 'auto', height: '48px' }}
              priority
              loading="eager"
            />
          </Link>

          {/* Desktop Nav */}
          <ul
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
            className="nav-desktop"
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{
                    color: pathname === link.href ? 'var(--gold)' : 'var(--cream)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    position: 'relative',
                    paddingBottom: '4px',
                    transition: 'color 0.2s ease',
                    borderBottom: pathname === link.href ? '2px solid var(--gold)' : '2px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      pathname === link.href ? 'var(--gold)' : 'var(--cream)';
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--gold)',
                  color: 'var(--maroon-dark)',
                  padding: '10px 22px',
                  borderRadius: '4px',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--peach)';
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 6px 20px rgba(255,204,69,0.4)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--gold)';
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
                }}
              >
                ✦ Get a Quote
              </Link>
            </li>
          </ul>

          {/* Mobile Hamburger */}
          <button
            className="nav-mobile-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'none',
            }}
          >
            <span style={{ display: 'block', width: '24px', height: '2px', background: 'var(--gold)', marginBottom: '5px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }}/>
            <span style={{ display: 'block', width: '24px', height: '2px', background: 'var(--gold)', marginBottom: '5px', opacity: menuOpen ? 0 : 1, transition: 'all 0.3s' }}/>
            <span style={{ display: 'block', width: '24px', height: '2px', background: 'var(--gold)', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }}/>
          </button>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="animate-slideDown"
            style={{
              backgroundColor: 'var(--maroon-dark)',
              borderTop: '1px solid rgba(255,204,69,0.15)',
              padding: '20px 24px 24px',
            }}
          >
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      color: pathname === link.href ? 'var(--gold)' : 'var(--cream)',
                      textDecoration: 'none',
                      fontSize: '1rem',
                      fontWeight: 500,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'var(--gold)',
                    color: 'var(--maroon-dark)',
                    padding: '12px 24px',
                    borderRadius: '4px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    marginTop: '8px',
                  }}
                >
                  ✦ Get a Quote
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>

      <style>{`
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}
