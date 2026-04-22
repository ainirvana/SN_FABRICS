'use client';

import { useState } from 'react';

const PRODUCTS_LIST = [
  'Makhan Velvet (Single Tone)',
  'Micro Velvet 9000 (Single Tone)',
  'Micro Velvet 9000 Crush',
  'Micro Velvet 11000 (Single Tone)',
  'Ice Velvet',
  'Velvet 99999 (Single Tone)',
  'Velvet 99999 Crush',
  'Velvet Embroidery Work',
  'Fendy (NC Satin)',
  'Sindoor Fabric',
  'Multiple Products / Other',
];

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: '6px',
  border: '1px solid rgba(67,36,48,0.2)',
  fontSize: '0.9rem',
  color: '#432430',
  outline: 'none',
  backgroundColor: '#fff',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: 700,
  color: '#432430',
  marginBottom: '6px',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
};

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', country: '', mobile: '', email: '', product: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const buildWAMessage = () =>
    `Hello S N Fabrics! I want to place a bulk order inquiry.\n\n*Name:* ${form.name}\n*Country:* ${form.country}\n*Mobile:* ${form.mobile}\n*Email:* ${form.email}\n*Product Looking For:* ${form.product}\n*Message:* ${form.message || 'Please share availability and pricing.'}\n\nLooking forward to hearing from you!`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(`https://wa.me/919825154197?text=${encodeURIComponent(buildWAMessage())}`, '_blank');
    setSubmitted(true);
  };

  return (
    <main style={{ paddingTop: '72px' }}>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #2e1820 0%, #432430 60%, #5c3242 100%)',
        padding: '100px 0 80px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L55 20 L55 40 L30 55 L5 40 L5 20 Z' fill='none' stroke='rgba(255,204,69,0.05)' stroke-width='1'/%3E%3C/svg%3E")`, backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ffcc45', marginBottom: '16px', fontWeight: 700 }}>✦ Reach Out</p>
          <h1 className="font-serif" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#fff0dd', marginBottom: '24px', lineHeight: 1.15 }}>
            Contact <span style={{ color: '#ffcc45' }}>Us</span>
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,240,221,0.8)', lineHeight: 1.8 }}>
            Bulk orders, custom requirements, export inquiries — we are just a message away.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ backgroundColor: '#fff0dd', padding: '96px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'start' }}>

            {/* Info Panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Proprietor Card */}
              <div style={{ backgroundColor: '#432430', borderRadius: '12px', padding: '36px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #ffcc45, #ffd699)' }} />
                <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#ffcc45', marginBottom: '16px', fontWeight: 700 }}>✦ Proprietor</p>
                <h2 className="font-serif" style={{ fontSize: '1.5rem', color: '#fff0dd', marginBottom: '24px' }}>Alok Chaudhary</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { icon: '📞', label: 'Mobile', value: '+91 98251 54197', href: 'tel:+919825154197' },
                    { icon: '📍', label: 'Address', value: 'UG-128-129, Shree Kuber Ji Textile World, Puna Kumbhariya Road, Kumbharia Gaon, Surat — 395010, Gujarat', href: 'https://www.google.com/maps?vet=10CAAQoqAOahcKEwjo9rqB8oGUAxUAAAAAHQAAAAAQBg..i&pvq=Cg0vZy8xMXo1N19uaDI4IhAKCnNuIGZhYnJpY3MQAhgD&lqi=ChBzbiBmYWJyaWNzIHN1cmF0kgEbZmFicmljX3Byb2R1Y3RfbWFudWZhY3R1cmVy&fvr=1&cs=0&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KWWQ1SjZT-A7Mf1uXRf1tp4X&daddr=129+Shree,+Textile+World,+Kuberji+House,+UG-128,+Kumbharia+Main+Rd,+Saroli,+Puna,+Surat,+Gujarat+395010' },
                    { icon: '🌍', label: 'Markets', value: 'Worldwide — Pan-India & Global Exports' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '1.1rem', marginTop: '2px', flexShrink: 0 }}>{item.icon}</span>
                      <div>
                        <p style={{ fontSize: '0.7rem', color: '#ffcc45', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2px' }}>{item.label}</p>
                        {item.href ? (
                          <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ color: '#c9a47e', fontSize: '0.875rem', lineHeight: 1.6, textDecoration: 'none' }}>{item.value}</a>
                        ) : (
                          <p style={{ color: '#c9a47e', fontSize: '0.875rem', lineHeight: 1.6 }}>{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Registrations */}
              <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid rgba(67,36,48,0.1)', padding: '28px' }}>
                <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#432430', marginBottom: '16px', fontWeight: 700 }}>✦ Registration Numbers</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { label: 'GST No.', value: '24ABNPC6070A2Z5' },
                    { label: 'Udyam No.', value: 'UDYAM-GJ-22-0434307' },
                    { label: 'IEC Code', value: 'ABNPC6070A' },
                  ].map((r) => (
                    <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', backgroundColor: 'rgba(67,36,48,0.04)', borderRadius: '6px', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.75rem', color: '#432430', fontWeight: 700, letterSpacing: '0.05em' }}>{r.label}</span>
                      <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#5c3242', fontWeight: 600 }}>{r.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919825154197?text=Hello%20SN%20Fabrics!%20I%20am%20interested%20in%20your%20fabric%20collection."
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: '#25d366', borderRadius: '12px', padding: '24px 28px', display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none' }}
              >
                <svg viewBox="0 0 24 24" width="36" height="36" fill="white" style={{ flexShrink: 0 }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.549 4.122 1.514 5.861L0 24l6.302-1.494A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 01-5.001-1.367l-.358-.214-3.742.886.934-3.637-.235-.374A9.808 9.808 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/>
                </svg>
                <div>
                  <p style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', marginBottom: '2px' }}>Chat on WhatsApp</p>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.8rem' }}>+91 98251 54197 — Instant Response</p>
                </div>
              </a>

              {/* Sample Kit */}
              <div style={{ backgroundColor: 'rgba(67,36,48,0.06)', border: '1px solid rgba(67,36,48,0.15)', borderRadius: '8px', padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ fontSize: '1.4rem' }}>📦</span>
                <div>
                  <p style={{ fontWeight: 700, color: '#432430', fontSize: '0.875rem', marginBottom: '4px' }}>Sample Kit Available</p>
                  <p style={{ fontSize: '0.8rem', color: '#666', lineHeight: 1.6 }}>Fabric swatches for all categories on a chargeable basis. WhatsApp us to request samples.</p>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid rgba(67,36,48,0.1)', padding: '40px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #ffcc45, #ffd699)' }} />
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#432430', marginBottom: '8px', fontWeight: 700 }}>✦ Bulk Order Inquiry</p>
              <h2 className="font-serif" style={{ fontSize: '1.8rem', color: '#432430', marginBottom: '8px' }}>Get a Quote</h2>
              <p style={{ fontSize: '0.875rem', color: '#888', marginBottom: '32px', lineHeight: 1.6 }}>Fill in your details and we will connect via WhatsApp instantly.</p>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</div>
                  <h3 className="font-serif" style={{ fontSize: '1.5rem', color: '#432430', marginBottom: '12px' }}>WhatsApp Opened!</h3>
                  <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.7 }}>Your inquiry has been pre-filled. Complete the conversation with Alok to finalise your order.</p>
                  <button onClick={() => setSubmitted(false)} style={{ marginTop: '24px', backgroundColor: '#432430', color: '#fff0dd', border: 'none', padding: '12px 28px', borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem' }}>
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label htmlFor="c-product" style={labelStyle}>Product You Are Looking For *</label>
                    <select id="c-product" name="product" required value={form.product} onChange={handleChange} style={inputStyle}>
                      <option value="">Select a product...</option>
                      {PRODUCTS_LIST.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="c-name" style={labelStyle}>Name *</label>
                    <input type="text" id="c-name" name="name" required placeholder="Your full name" value={form.name} onChange={handleChange} style={inputStyle} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label htmlFor="c-country" style={labelStyle}>Country *</label>
                      <input type="text" id="c-country" name="country" required placeholder="India, UAE..." value={form.country} onChange={handleChange} style={inputStyle} />
                    </div>
                    <div>
                      <label htmlFor="c-mobile" style={labelStyle}>Mobile No. *</label>
                      <input type="tel" id="c-mobile" name="mobile" required placeholder="+91 00000 00000" value={form.mobile} onChange={handleChange} style={inputStyle} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="c-email" style={labelStyle}>Email</label>
                    <input type="email" id="c-email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} style={inputStyle} />
                  </div>
                  <div>
                    <label htmlFor="c-message" style={labelStyle}>Additional Message</label>
                    <textarea id="c-message" name="message" rows={3} placeholder="Quantity, preferred colours, any specific requirements..." value={form.message} onChange={handleChange} style={{ ...inputStyle, resize: 'vertical' }} />
                  </div>
                  <button
                    type="submit"
                    style={{ backgroundColor: '#25d366', color: '#fff', border: 'none', padding: '14px 24px', borderRadius: '6px', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.05em', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', textTransform: 'uppercase' }}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.549 4.122 1.514 5.861L0 24l6.302-1.494A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 01-5.001-1.367l-.358-.214-3.742.886.934-3.637-.235-.374A9.808 9.808 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/>
                    </svg>
                    Send Inquiry via WhatsApp
                  </button>
                  <p style={{ fontSize: '0.75rem', color: '#aaa', textAlign: 'center' }}>Your inquiry will open in WhatsApp pre-filled with your details.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
