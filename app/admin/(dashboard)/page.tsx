import { adminSupabase } from '@/lib/supabase/admin';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [
    { count: totalProducts },
    { count: featuredProducts },
    { count: totalBlogs },
    { count: publishedBlogs },
  ] = await Promise.all([
    adminSupabase.from('products').select('*', { count: 'exact', head: true }),
    adminSupabase.from('products').select('*', { count: 'exact', head: true }).eq('featured', true),
    adminSupabase.from('blogs').select('*', { count: 'exact', head: true }),
    adminSupabase.from('blogs').select('*', { count: 'exact', head: true }).eq('status', 'published'),
  ]);

  const { data: recentBlogs } = await adminSupabase
    .from('blogs').select('id, title, status, created_at')
    .order('created_at', { ascending: false }).limit(5);

  const stats = [
    { label: 'Total Products', value: totalProducts ?? 0, icon: '🧵', href: '/admin/products', color: '#432430' },
    { label: 'Featured Products', value: featuredProducts ?? 0, icon: '⭐', href: '/admin/products', color: '#5c3242' },
    { label: 'Total Blogs', value: totalBlogs ?? 0, icon: '📝', href: '/admin/blogs', color: '#432430' },
    { label: 'Published Blogs', value: publishedBlogs ?? 0, icon: '✅', href: '/admin/blogs', color: '#5c3242' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', color: '#432430', fontWeight: 700, marginBottom: '6px' }}>
          Dashboard
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#888' }}>
          Welcome back! Here&apos;s an overview of your S N Fabrics store.
        </p>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginBottom: '40px' }}>
        {stats.map((s) => (
          <Link key={s.label} href={s.href} style={{ textDecoration: 'none' }}>
            <div className="card-hover" style={{
              background: '#fff', borderRadius: '12px', padding: '24px',
              border: '1px solid rgba(67,36,48,0.08)',
              boxShadow: '0 2px 12px rgba(67,36,48,0.05)',
              transition: 'all 0.2s', cursor: 'pointer',
            }}
            >
              <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>{s.icon}</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: s.color, fontFamily: 'var(--font-serif)', marginBottom: '4px' }}>
                {s.value}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                {s.label}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {/* Recent Blogs */}
        <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', border: '1px solid rgba(67,36,48,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#432430' }}>Recent Blogs</h2>
            <Link href="/admin/blogs/new" style={{
              fontSize: '0.75rem', color: '#432430', textDecoration: 'none',
              background: 'rgba(255,204,69,0.15)', border: '1px solid rgba(255,204,69,0.4)',
              padding: '5px 12px', borderRadius: '6px', fontWeight: 700,
            }}>
              + New
            </Link>
          </div>
          {!recentBlogs?.length ? (
            <p style={{ fontSize: '0.85rem', color: '#bbb', textAlign: 'center', padding: '16px 0' }}>
              No blogs yet. Create your first!
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {recentBlogs.map((b) => (
                <Link key={b.id} href={`/admin/blogs/${b.id}/edit`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(67,36,48,0.05)' }}>
                  <span style={{ fontSize: '0.85rem', color: '#432430', fontWeight: 500 }}>{b.title}</span>
                  <span style={{
                    fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                    padding: '3px 8px', borderRadius: '999px',
                    background: b.status === 'published' ? 'rgba(34,197,94,0.1)' : 'rgba(234,179,8,0.1)',
                    color: b.status === 'published' ? '#16a34a' : '#92400e',
                  }}>
                    {b.status}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', border: '1px solid rgba(67,36,48,0.08)' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#432430', marginBottom: '20px' }}>Quick Actions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { href: '/admin/blogs/new', label: '✏️ Write a New Blog Post', color: '#432430' },
              { href: '/admin/products', label: '🧵 Manage Products & Shade Cards', color: '#432430' },
              { href: '/', label: '🌐 View Public Website ↗', color: '#666' },
            ].map((a) => (
              <Link key={a.href} href={a.href} target={a.href === '/' ? '_blank' : undefined}
                className="q-action"
                style={{
                  display: 'block', padding: '12px 16px', borderRadius: '8px',
                  textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, color: a.color,
                  border: '1px solid rgba(67,36,48,0.1)', transition: 'all 0.2s',
                }}
              >
                {a.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
