import { adminSupabase } from '@/lib/supabase/admin';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import DeleteBlogButton from '@/components/DeleteBlogButton';

export const dynamic = 'force-dynamic';

async function deleteBlog(id: string) {
  'use server';
  const { data: blog } = await adminSupabase.from('blogs').select('cover_storage_path').eq('id', id).single();
  if (blog?.cover_storage_path) {
    await adminSupabase.storage.from('blog-covers').remove([blog.cover_storage_path]);
  }
  await adminSupabase.from('blogs').delete().eq('id', id);
  revalidatePath('/admin/blogs');
}

async function toggleStatus(id: string, currentStatus: string) {
  'use server';
  const newStatus = currentStatus === 'published' ? 'draft' : 'published';
  await adminSupabase.from('blogs').update({ status: newStatus }).eq('id', id);
  revalidatePath('/admin/blogs');
}

export default async function AdminBlogsPage() {
  const { data: blogs } = await adminSupabase
    .from('blogs').select('*').order('created_at', { ascending: false });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', color: '#432430', fontWeight: 700, marginBottom: '4px' }}>
            Blog Posts
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#888' }}>{blogs?.length ?? 0} total posts</p>
        </div>
        <Link href="/admin/blogs/new" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: '#432430', color: '#ffcc45', textDecoration: 'none',
          padding: '11px 22px', borderRadius: '8px',
          fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.05em',
        }}>
          ✏️ New Blog Post
        </Link>
      </div>

      {!blogs?.length ? (
        <div style={{ textAlign: 'center', padding: '80px 24px', background: '#fff', borderRadius: '12px', border: '1px solid rgba(67,36,48,0.08)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📝</div>
          <h2 style={{ fontSize: '1.25rem', color: '#432430', fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>No blog posts yet</h2>
          <p style={{ color: '#888', marginBottom: '24px', fontSize: '0.875rem' }}>Write your first blog post to engage your customers.</p>
          <Link href="/admin/blogs/new" style={{
            background: '#432430', color: '#ffcc45', textDecoration: 'none',
            padding: '12px 28px', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 700,
            display: 'inline-block',
          }}>
            Create First Post
          </Link>
        </div>
      ) : (
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid rgba(67,36,48,0.08)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(67,36,48,0.08)', background: '#faf6f0' }}>
                {['Title', 'Status', 'Tags', 'Date', 'Actions'].map((h) => (
                  <th key={h} style={{ padding: '12px 20px', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', textAlign: 'left' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id} style={{ borderBottom: '1px solid rgba(67,36,48,0.05)' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#432430', marginBottom: '2px' }}>{blog.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#aaa' }}>{blog.excerpt.slice(0, 60)}...</div>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{
                      fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                      padding: '4px 10px', borderRadius: '999px',
                      background: blog.status === 'published' ? 'rgba(34,197,94,0.1)' : 'rgba(234,179,8,0.1)',
                      color: blog.status === 'published' ? '#16a34a' : '#92400e',
                    }}>
                      {blog.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {blog.tags?.slice(0, 2).map((t: string) => (
                        <span key={t} style={{ fontSize: '0.65rem', padding: '2px 8px', borderRadius: '999px', background: 'rgba(67,36,48,0.06)', color: '#666' }}>{t}</span>
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px', fontSize: '0.8rem', color: '#888', whiteSpace: 'nowrap' }}>
                    {new Date(blog.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Link href={`/admin/blogs/${blog.id}/edit`} style={{
                        fontSize: '0.75rem', padding: '5px 12px', borderRadius: '6px', textDecoration: 'none',
                        background: 'rgba(67,36,48,0.07)', color: '#432430', fontWeight: 600,
                      }}>
                        Edit
                      </Link>
                      <form action={toggleStatus.bind(null, blog.id, blog.status)}>
                        <button type="submit" style={{
                          fontSize: '0.75rem', padding: '5px 12px', borderRadius: '6px', cursor: 'pointer',
                          background: blog.status === 'published' ? 'rgba(234,179,8,0.1)' : 'rgba(34,197,94,0.1)',
                          color: blog.status === 'published' ? '#92400e' : '#16a34a',
                          border: 'none', fontWeight: 600,
                        }}>
                          {blog.status === 'published' ? 'Unpublish' : 'Publish'}
                        </button>
                      </form>
                      <form action={deleteBlog.bind(null, blog.id)}>
                        <DeleteBlogButton />
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
