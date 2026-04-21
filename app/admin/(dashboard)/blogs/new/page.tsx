'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';

const INPUT_STYLE: React.CSSProperties = {
  width: '100%', padding: '11px 14px', borderRadius: '8px',
  border: '1.5px solid rgba(67,36,48,0.18)', fontSize: '0.9rem',
  color: '#432430', outline: 'none', boxSizing: 'border-box',
  fontFamily: 'inherit', background: '#fff', transition: 'border-color 0.2s',
};

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function NewBlogPage() {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [readTime, setReadTime] = useState('5 min read');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTitleChange = (v: string) => {
    setTitle(v);
    if (!slug || slug === slugify(title)) setSlug(slugify(v));
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !excerpt || !content) { setError('Title, excerpt and content are required.'); return; }
    setLoading(true); setError('');

    let cover_url = null, cover_storage_path = null;

    // Upload cover image if provided
    if (coverFile) {
      const ext = coverFile.name.split('.').pop();
      const path = `${Date.now()}-${slug}.${ext}`;
      const { error: upErr } = await supabase.storage.from('blog-covers').upload(path, coverFile);
      if (upErr) { setError('Cover upload failed: ' + upErr.message); setLoading(false); return; }
      const { data: urlData } = supabase.storage.from('blog-covers').getPublicUrl(path);
      cover_url = urlData.publicUrl;
      cover_storage_path = path;
    }

    const { error: dbErr } = await supabase.from('blogs').insert({
      title, slug: slug || slugify(title), excerpt, content,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      read_time: readTime, status, cover_url, cover_storage_path,
    });

    if (dbErr) { setError(dbErr.message); setLoading(false); return; }
    router.push('/admin/blogs');
  };

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', color: '#432430', fontWeight: 700 }}>
          New Blog Post
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', alignItems: 'start' }}>
          {/* Main content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Card>
              <Label>Title *</Label>
              <input value={title} onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Your blog post title..." style={INPUT_STYLE}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#ffcc45'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(67,36,48,0.18)'; }}
              />
              <Label style={{ marginTop: '14px' }}>Slug (URL)</Label>
              <input value={slug} onChange={(e) => setSlug(slugify(e.target.value))}
                placeholder="auto-generated-from-title" style={{ ...INPUT_STYLE, fontFamily: 'monospace', fontSize: '0.82rem' }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#ffcc45'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(67,36,48,0.18)'; }}
              />
            </Card>

            <Card>
              <Label>Excerpt * <span style={{ color: '#aaa', fontWeight: 400 }}>(shown on blog list)</span></Label>
              <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A brief summary of this post..." rows={3}
                style={{ ...INPUT_STYLE, resize: 'vertical', lineHeight: 1.6 }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#ffcc45'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(67,36,48,0.18)'; }}
              />
            </Card>

            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <Label style={{ margin: 0 }}>Content * <span style={{ color: '#aaa', fontWeight: 400 }}>(Markdown supported)</span></Label>
                <span style={{ fontSize: '0.7rem', color: '#aaa' }}>{content.length} chars</span>
              </div>
              <textarea value={content} onChange={(e) => setContent(e.target.value)}
                placeholder={`# Heading\n\nWrite your blog content here...\n\n**Bold text**, *italics*, and regular paragraphs.\n\n## Section\n\nMore content...`}
                rows={20}
                style={{ ...INPUT_STYLE, resize: 'vertical', lineHeight: 1.7, fontFamily: 'monospace', fontSize: '0.85rem' }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#ffcc45'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(67,36,48,0.18)'; }}
              />
            </Card>
          </div>

          {/* Sidebar settings */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Publish */}
            <Card>
              <Label>Status</Label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {(['draft', 'published'] as const).map((s) => (
                  <button key={s} type="button" onClick={() => setStatus(s)}
                    style={{
                      flex: 1, padding: '9px', borderRadius: '7px', cursor: 'pointer',
                      fontWeight: 700, fontSize: '0.8rem', border: 'none', transition: 'all 0.2s',
                      background: status === s ? (s === 'published' ? 'rgba(34,197,94,0.12)' : 'rgba(234,179,8,0.12)') : '#f5f5f5',
                      color: status === s ? (s === 'published' ? '#16a34a' : '#92400e') : '#888',
                      textTransform: 'capitalize',
                    }}>
                    {s}
                  </button>
                ))}
              </div>
              {error && (
                <div style={{ marginTop: '12px', padding: '10px', borderRadius: '8px', background: 'rgba(220,38,38,0.06)', color: '#dc2626', fontSize: '0.8rem' }}>
                  {error}
                </div>
              )}
              <button type="submit" disabled={loading}
                style={{
                  width: '100%', marginTop: '16px', padding: '13px', borderRadius: '8px',
                  background: loading ? '#ccc' : '#432430', color: '#ffcc45',
                  border: 'none', fontWeight: 700, fontSize: '0.9rem', cursor: loading ? 'not-allowed' : 'pointer',
                }}>
                {loading ? 'Saving...' : status === 'published' ? '🚀 Publish Post' : '💾 Save Draft'}
              </button>
            </Card>

            {/* Cover Image */}
            <Card>
              <Label>Cover Image</Label>
              {coverPreview && (
                <div style={{ position: 'relative', width: '100%', paddingBottom: '55%', borderRadius: '8px', overflow: 'hidden', marginBottom: '10px' }}>
                  <Image src={coverPreview} alt="Cover preview" fill style={{ objectFit: 'cover' }} />
                </div>
              )}
              <label style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                padding: '11px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.82rem',
                border: '2px dashed rgba(67,36,48,0.2)', color: '#666', transition: 'all 0.2s',
              }}>
                📷 {coverPreview ? 'Change Image' : 'Upload Cover Image'}
                <input type="file" accept="image/*" onChange={handleCoverChange} style={{ display: 'none' }} />
              </label>
            </Card>

            {/* Meta */}
            <Card>
              <Label>Tags <span style={{ color: '#aaa', fontWeight: 400 }}>(comma separated)</span></Label>
              <input value={tags} onChange={(e) => setTags(e.target.value)}
                placeholder="Velvet, Care Tips, Trends"
                style={INPUT_STYLE}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#ffcc45'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(67,36,48,0.18)'; }}
              />
              <Label style={{ marginTop: '14px' }}>Read Time</Label>
              <input value={readTime} onChange={(e) => setReadTime(e.target.value)}
                placeholder="5 min read" style={INPUT_STYLE}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#ffcc45'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(67,36,48,0.18)'; }}
              />
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', borderRadius: '12px', padding: '22px', border: '1px solid rgba(67,36,48,0.08)' }}>
      {children}
    </div>
  );
}

function Label({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#432430', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px', ...style }}>
      {children}
    </label>
  );
}
