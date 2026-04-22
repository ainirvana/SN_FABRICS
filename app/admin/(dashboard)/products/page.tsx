import { adminSupabase } from '@/lib/supabase/admin';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const { data: products } = await adminSupabase
    .from('products')
    .select('*, product_images(count)')
    .order('sort_order', { ascending: true });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', color: '#432430', fontWeight: 700, marginBottom: '4px' }}>
            Products
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#888' }}>{products?.length ?? 0} products · Click any to edit or manage shade cards</p>
        </div>
        <Link href="/admin/products/new" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: '#432430', color: '#ffcc45', textDecoration: 'none',
          padding: '11px 22px', borderRadius: '8px',
          fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.05em',
        }}>
          ➕ New Product
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {products?.map((product) => {
          const imageCount = (product.product_images as unknown as { count: number }[])?.[0]?.count ?? 0;
          return (
            <Link key={product.id} href={`/admin/products/${product.id}/edit`} style={{ textDecoration: 'none' }}>
              <div className="card-hover" style={{
                background: '#fff', borderRadius: '12px', padding: '20px',
                border: '1px solid rgba(67,36,48,0.08)',
                boxShadow: '0 2px 8px rgba(67,36,48,0.04)',
                transition: 'all 0.2s', cursor: 'pointer',
              }}
              >
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{
                    fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                    padding: '3px 9px', borderRadius: '999px',
                    background: product.category === 'velvet' ? 'rgba(67,36,48,0.08)' : 'rgba(255,204,69,0.12)',
                    color: product.category === 'velvet' ? '#432430' : '#92400e',
                  }}>
                    {product.category}
                  </span>
                  {product.featured && (
                    <span style={{ fontSize: '0.65rem', color: '#f59e0b', fontWeight: 700, background: 'rgba(245,158,11,0.1)', padding: '3px 8px', borderRadius: '999px' }}>
                      ⭐ Featured
                    </span>
                  )}
                </div>

                <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#432430', marginBottom: '4px', lineHeight: 1.3 }}>
                  {product.name}
                </h2>
                <p style={{ fontSize: '0.78rem', color: '#888', marginBottom: '12px' }}>{product.website_name}</p>

                {/* Stats */}
                <div style={{ display: 'flex', gap: '12px', borderTop: '1px solid rgba(67,36,48,0.06)', paddingTop: '12px' }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Price</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#432430' }}>{product.price_range}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Photos</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: imageCount > 0 ? '#16a34a' : '#dc2626' }}>
                      {imageCount} {imageCount === 1 ? 'image' : 'images'}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Width</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#432430' }}>{product.width}</div>
                  </div>
                </div>

                <div style={{ marginTop: '12px', fontSize: '0.75rem', color: '#432430', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  ✏️ Edit product & manage shade cards →
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
