'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setLoading(true);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) { setError(err.message); setLoading(false); return; }
    router.push('/admin');
    router.refresh();
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #2e1820 0%, #432430 60%, #5c3242 100%)',
      padding: '24px',
    }}>
      <div style={{
        background: '#fff', borderRadius: '16px', padding: '48px 40px',
        width: '100%', maxWidth: '420px',
        boxShadow: '0 40px 80px rgba(0,0,0,0.3)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <Image src="/logo.png" alt="SN Fabrics" width={140} height={42} style={{ width: 'auto', marginBottom: '16px' }} />
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#432430', fontWeight: 700 }}>
            ✦ Admin Panel
          </p>
        </div>

        <h1 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', color: '#432430', marginBottom: '6px', textAlign: 'center', fontWeight: 700 }}>
          Welcome Back
        </h1>
        <p style={{ fontSize: '0.85rem', color: '#999', textAlign: 'center', marginBottom: '32px' }}>
          Sign in to manage your store
        </p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#432430', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              Email
            </label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              required placeholder="admin@snfabrics.com"
              style={{
                width: '100%', padding: '12px 14px', borderRadius: '8px',
                border: '1.5px solid rgba(67,36,48,0.2)', fontSize: '0.9rem',
                color: '#432430', outline: 'none', boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#ffcc45'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(67,36,48,0.2)'; }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#432430', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              Password
            </label>
            <input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              required placeholder="••••••••"
              style={{
                width: '100%', padding: '12px 14px', borderRadius: '8px',
                border: '1.5px solid rgba(67,36,48,0.2)', fontSize: '0.9rem',
                color: '#432430', outline: 'none', boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#ffcc45'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(67,36,48,0.2)'; }}
            />
          </div>

          {error && (
            <div style={{
              background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)',
              borderRadius: '8px', padding: '10px 14px',
              fontSize: '0.82rem', color: '#dc2626',
            }}>
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit" disabled={loading}
            style={{
              background: loading ? '#ccc' : '#432430', color: '#ffcc45',
              border: 'none', borderRadius: '8px', padding: '13px',
              fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.06em',
              textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s', marginTop: '4px',
            }}
          >
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>
      </div>
    </div>
  );
}
