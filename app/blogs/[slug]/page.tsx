import type { Metadata } from 'next';
import { adminSupabase } from '@/lib/supabase/admin';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

/** Lightweight markdown → HTML (no extra dependencies) */
function markdownToHtml(md: string): string {
  return md
    // Headings
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold & italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Inline code
    .replace(/`(.+?)`/g, '<code>$1</code>')
    // Blockquote
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    // Unordered lists
    .replace(/^\s*[-*+] (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]+?<\/li>)/g, '<ul>$1</ul>')
    // Ordered lists
    .replace(/^\s*\d+\. (.+)$/gm, '<li>$1</li>')
    // Horizontal rule
    .replace(/^---$/gm, '<hr />')
    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%;border-radius:8px;margin:16px 0;" />')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Paragraphs — wrap lines separated by blank lines
    .split(/\n{2,}/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return '';
      if (/^<(h[1-6]|ul|ol|li|blockquote|hr|img)/.test(trimmed)) return trimmed;
      return `<p>${trimmed.replace(/\n/g, '<br />')}</p>`;
    })
    .join('\n');
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: blog } = await adminSupabase
    .from('blogs')
    .select('title, excerpt, cover_url')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!blog) return { title: 'Blog | S N Fabrics' };

  return {
    title: `${blog.title} | S N Fabrics Blog`,
    description: blog.excerpt,
    openGraph: blog.cover_url ? { images: [blog.cover_url] } : undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: blog } = await adminSupabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!blog) notFound();

  const htmlContent = markdownToHtml(blog.content || '');
  const formattedDate = new Date(blog.created_at).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <main style={{ paddingTop: '72px' }}>
      {/* ── Hero ── */}
      <section
        style={{
          background: 'linear-gradient(135deg, #2e1820 0%, #432430 60%, #5c3242 100%)',
          padding: blog.cover_url ? '0' : '80px 0 60px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {blog.cover_url ? (
          <div style={{ position: 'relative', width: '100%', height: '480px' }}>
            <Image
              src={blog.cover_url}
              alt={blog.title}
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              loading="eager"
              priority
            />
            {/* Dark overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(46,24,32,0.92) 0%, rgba(46,24,32,0.5) 50%, rgba(46,24,32,0.2) 100%)',
              }}
            />
            {/* Text over image */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '60px 24px 48px',
                maxWidth: '860px',
                margin: '0 auto',
              }}
            >
              <HeroContent blog={blog} formattedDate={formattedDate} />
            </div>
          </div>
        ) : (
          <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 24px' }}>
            <HeroContent blog={blog} formattedDate={formattedDate} />
          </div>
        )}
      </section>

      {/* ── Content ── */}
      <section style={{ backgroundColor: 'var(--cream)', padding: '72px 0 96px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 24px' }}>
          {/* Back link */}
          <Link
            href="/blogs"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--maroon)',
              textDecoration: 'none',
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '48px',
              opacity: 0.7,
            }}
          >
            ← Back to Blog
          </Link>

          {/* Article body */}
          <article>
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </article>

          {/* Tags */}
          {blog.tags?.length > 0 && (
            <div style={{ marginTop: '56px', paddingTop: '24px', borderTop: '1px solid rgba(67,36,48,0.1)', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: '0.1em', marginRight: '4px' }}>
                Tags:
              </span>
              {blog.tags.map((t: string) => (
                <span
                  key={t}
                  style={{
                    backgroundColor: 'rgba(67,36,48,0.07)',
                    color: 'var(--maroon)',
                    padding: '5px 14px',
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--maroon-dark) 0%, var(--maroon) 100%)',
          padding: '80px 0',
        }}
      >
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px', fontWeight: 700 }}>
            ✦ Explore More
          </p>
          <h2
            className="font-serif"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: 'var(--cream)', marginBottom: '16px' }}
          >
            Interested in Our Fabrics?
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'rgba(255,240,221,0.75)', marginBottom: '32px', lineHeight: 1.7 }}>
            Explore our full range of premium velvets and specialty fabrics, or get in touch for a sample kit.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/products" className="btn-gold">View Products</Link>
            <Link href="/blogs" className="btn-maroon" style={{ border: '1px solid rgba(255,240,221,0.3)' }}>
              ← All Blog Posts
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .blog-content {
          font-family: var(--font-inter), -apple-system, sans-serif;
          color: #333;
          line-height: 1.85;
          font-size: 1.05rem;
        }
        .blog-content h1 {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: clamp(2rem, 4vw, 3rem);
          color: #432430;
          margin: 48px 0 20px;
          line-height: 1.2;
          font-weight: 700;
        }
        .blog-content h2 {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: clamp(1.4rem, 3vw, 2rem);
          color: #432430;
          margin: 40px 0 16px;
          line-height: 1.25;
          font-weight: 700;
          padding-bottom: 10px;
          border-bottom: 2px solid rgba(255,204,69,0.3);
        }
        .blog-content h3 {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: 1.25rem;
          color: #5c3242;
          margin: 32px 0 12px;
          font-weight: 700;
        }
        .blog-content p {
          margin: 0 0 20px;
          color: #444;
        }
        .blog-content strong {
          color: #432430;
          font-weight: 700;
        }
        .blog-content em {
          font-style: italic;
          color: #5c3242;
        }
        .blog-content a {
          color: #432430;
          font-weight: 600;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .blog-content a:hover { color: #5c3242; }
        .blog-content code {
          background: rgba(67,36,48,0.07);
          color: #432430;
          padding: 2px 7px;
          border-radius: 4px;
          font-size: 0.9em;
          font-family: monospace;
        }
        .blog-content blockquote {
          border-left: 4px solid #ffcc45;
          margin: 28px 0;
          padding: 16px 24px;
          background: rgba(255,204,69,0.06);
          border-radius: 0 8px 8px 0;
          font-style: italic;
          color: #5c3242;
        }
        .blog-content ul {
          margin: 0 0 20px 24px;
          padding: 0;
        }
        .blog-content li {
          margin-bottom: 8px;
          color: #444;
        }
        .blog-content hr {
          border: none;
          border-top: 1px solid rgba(67,36,48,0.12);
          margin: 40px 0;
        }
      `}</style>
    </main>
  );
}

function HeroContent({
  blog,
  formattedDate,
}: {
  blog: any;
  formattedDate: string;
}) {
  return (
    <>
      {/* Tags row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {blog.tags?.slice(0, 2).map((t: string) => (
          <span
            key={t}
            style={{
              backgroundColor: 'rgba(255,204,69,0.18)',
              border: '1px solid rgba(255,204,69,0.4)',
              color: '#ffcc45',
              padding: '4px 14px',
              borderRadius: '999px',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            {t}
          </span>
        ))}
        <span style={{ fontSize: '0.78rem', color: 'rgba(255,240,221,0.6)' }}>{blog.read_time ?? '5 min read'}</span>
      </div>

      {/* Title */}
      <h1
        className="font-serif"
        style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          color: '#fff0dd',
          lineHeight: 1.15,
          marginBottom: '20px',
          fontWeight: 700,
          maxWidth: '820px',
        }}
      >
        {blog.title}
      </h1>

      {/* Excerpt */}
      <p
        style={{
          fontSize: '1.05rem',
          color: 'rgba(255,240,221,0.8)',
          lineHeight: 1.7,
          maxWidth: '680px',
          marginBottom: '24px',
        }}
      >
        {blog.excerpt}
      </p>

      {/* Meta */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.8rem', color: 'rgba(255,240,221,0.55)' }}>
        <span>S N Fabrics</span>
        <span>·</span>
        <span>{formattedDate}</span>
      </div>
    </>
  );
}
