'use client';

export default function DeleteBlogButton() {
  return (
    <button type="submit" style={{
      fontSize: '0.75rem', padding: '5px 12px', borderRadius: '6px', cursor: 'pointer',
      background: 'rgba(220,38,38,0.07)', color: '#dc2626',
      border: 'none', fontWeight: 600,
    }}
      onClick={(e) => { if (!confirm('Delete this blog post?')) e.preventDefault(); }}
    >
      Delete
    </button>
  );
}
