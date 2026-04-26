'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: 'var(--maroon-dark)',
        color: 'var(--cream)',
        paddingTop: '64px',
        paddingBottom: '32px',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        {/* Top grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          {/* Brand */}
          <div>
            <Image
              src="/logo.png"
              alt="S N Fabrics"
              width={160}
              height={48}
              style={{ objectFit: 'contain', height: '48px', width: 'auto', marginBottom: '16px' }}
            />
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '240px' }}>
              Premium Fabrics, Trusted Trade.<br />
              Surat-based textile house serving clients across India and globally.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: '20px',
                fontWeight: 700,
              }}
            >
              Quick Links
            </h3>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { href: '/',         label: 'Home'          },
                { href: '/about',    label: 'About Us'      },
                { href: '/products', label: 'Product Range' },
                { href: '/blogs',    label: 'Blogs'         },
                { href: '/contact',  label: 'Contact Us'    },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    style={{
                      color: 'var(--text-muted)',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)')}
                  >
                    → {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h3
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: '16px',
                marginTop: '32px',
                fontWeight: 700,
              }}
            >
              Review Us
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="https://g.page/r/Cf1uXRf1tp4XEBM/review" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem' }}>
                ⭐ Review us on Google
              </a>
              <a href="https://www.indiamart.com/ambika-flock-velvet/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem' }}>
                🏢 IndiaMart Profile
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: '20px',
                fontWeight: 700,
              }}
            >
              Contact
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <p>Alok Chaudhary</p>
              <a href="tel:+919825154197" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                +91 98251 54197
              </a>
              <a 
                href="https://www.google.com/maps?vet=10CAAQoqAOahcKEwjo9rqB8oGUAxUAAAAAHQAAAAAQBg..i&pvq=Cg0vZy8xMXo1N19uaDI4IhAKCnNuIGZhYnJpY3MQAhgD&lqi=ChBzbiBmYWJyaWNzIHN1cmF0kgEbZmFicmljX3Byb2R1Y3RfbWFudWZhY3R1cmVy&fvr=1&cs=0&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KWWQ1SjZT-A7Mf1uXRf1tp4X&daddr=129+Shree,+Textile+World,+Kuberji+House,+UG-128,+Kumbharia+Main+Rd,+Saroli,+Puna,+Surat,+Gujarat+395010"
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  color: 'var(--text-muted)', 
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  display: 'inline-flex',
                  alignItems: 'flex-start',
                  gap: '6px',
                  lineHeight: 1.5
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)')}
              >
                <span style={{ marginTop: '2px' }}>📍</span>
                <span>UG-128-129, Shree Kuber Ji Textile World,<br />Puna Kumbhariya Road, Surat – 395010</span>
              </a>
              <a
                href="https://wa.me/919825154197"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#25d366',
                  fontWeight: 600,
                  textDecoration: 'none',
                  marginTop: '4px',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.549 4.122 1.514 5.861L0 24l6.302-1.494A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 01-5.001-1.367l-.358-.214-3.742.886.934-3.637-.235-.374A9.808 9.808 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Registrations */}
          <div>
            <h3
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: '20px',
                fontWeight: 700,
              }}
            >
              Certifications
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'GST', value: '24ABNPC6070A2Z5' },
                { label: 'Udyam', value: 'UDYAM-GJ-22-0434307' },
                { label: 'IEC', value: 'ABNPC6070A' },
              ].map((r) => (
                <div key={r.label} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--gold)', textTransform: 'uppercase' }}>
                    {r.label}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{r.value}</span>
                </div>
              ))}
              <div
                style={{
                  marginTop: '12px',
                  padding: '8px 12px',
                  background: 'rgba(255,204,69,0.08)',
                  border: '1px solid rgba(255,204,69,0.2)',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                }}
              >
                🌍 Pan-India Delivery · Global Exports · GST Verified
              </div>
            </div>
          </div>
        </div>

        {/* Gold divider */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,204,69,0.3), transparent)', marginBottom: '24px' }} />

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
          }}
        >
          <p>© {year} S N Fabrics. All rights reserved. Premium Fabrics, Trusted Trade.</p>
          <p style={{ letterSpacing: '0.05em' }}>Made with ♥ in Surat, Gujarat</p>
        </div>
      </div>
    </footer>
  );
}
