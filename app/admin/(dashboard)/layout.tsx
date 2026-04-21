import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AdminSidebar from '@/components/AdminSidebar';

export const metadata: Metadata = { title: 'Admin — SN Fabrics' };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#faf6f0' }}>
      <AdminSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top bar */}
        <div style={{
          padding: '16px 32px',
          background: '#fff',
          borderBottom: '1px solid rgba(67,36,48,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <p style={{ fontSize: '0.75rem', color: '#999', letterSpacing: '0.05em' }}>
            Logged in as <strong style={{ color: '#432430' }}>{user.email}</strong>
          </p>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,204,69,0.1)', border: '1px solid rgba(255,204,69,0.3)',
            borderRadius: '999px', padding: '4px 14px',
            fontSize: '0.7rem', color: '#432430', fontWeight: 700, letterSpacing: '0.1em',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
            ADMIN
          </div>
        </div>

        {/* Page content */}
        <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
