'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const NAV = [
  { href: '/admin',          label: 'Dashboard',  icon: '📊' },
  { href: '/admin/products', label: 'Products',   icon: '🧵' },
  { href: '/admin/blogs',    label: 'Blogs',      icon: '📝' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  return (
    <aside style={{
      width: '220px', flexShrink: 0,
      background: 'linear-gradient(180deg, #2e1820 0%, #1e0f16 100%)',
      borderRight: '1px solid rgba(255,204,69,0.12)',
      display: 'flex', flexDirection: 'column',
      minHeight: '100vh', position: 'sticky', top: 0,
    }}>
      {/* Logo */}
      <div style={{
        padding: '24px 20px',
        borderBottom: '1px solid rgba(255,204,69,0.1)',
      }}>
        <p style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ffcc45', marginBottom: '4px', fontWeight: 700 }}>
          ✦ Admin Panel
        </p>
        <p style={{ fontSize: '1rem', fontWeight: 700, color: '#fff0dd', fontFamily: 'var(--font-serif)' }}>
          SN Fabrics
        </p>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {NAV.map(({ href, label, icon }) => {
          const active = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 14px', borderRadius: '8px',
                textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500,
                color: active ? '#ffcc45' : 'rgba(255,240,221,0.65)',
                background: active ? 'rgba(255,204,69,0.12)' : 'transparent',
                border: active ? '1px solid rgba(255,204,69,0.2)' : '1px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              <span>{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,204,69,0.1)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Link
          href="/"
          target="_blank"
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '9px 14px', borderRadius: '8px',
            textDecoration: 'none', fontSize: '0.8rem',
            color: 'rgba(255,240,221,0.5)',
            border: '1px solid rgba(255,240,221,0.1)',
            transition: 'all 0.2s',
          }}
        >
          🌐 View Site
        </Link>
        <button
          onClick={logout}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '9px 14px', borderRadius: '8px', cursor: 'pointer',
            fontSize: '0.8rem', color: 'rgba(255,100,100,0.8)',
            background: 'none', border: '1px solid rgba(255,100,100,0.15)',
            transition: 'all 0.2s', width: '100%',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,100,100,0.1)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'none';
          }}
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}
