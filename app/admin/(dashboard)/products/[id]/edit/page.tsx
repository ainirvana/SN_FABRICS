'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';

const INPUT_STYLE: React.CSSProperties = {
  width: '100%', padding: '10px 14px', borderRadius: '8px',
  border: '1.5px solid rgba(67,36,48,0.18)', fontSize: '0.88rem',
  color: '#432430', outline: 'none', boxSizing: 'border-box',
  fontFamily: 'inherit', background: '#fff', transition: 'border-color 0.2s',
};
const FOCUS = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { e.currentTarget.style.borderColor = '#ffcc45'; };
const BLUR  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { e.currentTarget.style.borderColor = 'rgba(67,36,48,0.18)'; };

type ProductImage = { id: string; url: string; storage_path: string | null; sort_order: number };

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const supabase = createClient();

  const [productId, setProductId] = useState('');
  const [form, setForm] = useState({
    name: '', website_name: '', description: '', quality_desc: '',
    weight: '', price_range: '', width: '', used_for: '',
    whatsapp_msg: '', category: 'velvet', featured: false,
  });
  const [images, setImages] = useState<ProductImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    params.then(({ id }) => {
      setProductId(id);
      Promise.all([
        supabase.from('products').select('*').eq('id', id).single(),
        supabase.from('product_images').select('*').eq('product_id', id).order('sort_order'),
      ]).then(([{ data: product }, { data: imgs }]) => {
        if (product) {
          setForm({
            name: product.name, website_name: product.website_name,
            description: product.description, quality_desc: product.quality_desc,
            weight: product.weight ?? '', price_range: product.price_range,
            width: product.width, used_for: product.used_for,
            whatsapp_msg: product.whatsapp_msg, category: product.category,
            featured: product.featured,
          });
        }
        setImages(imgs ?? []);
        setFetchLoading(false);
      });
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess('');
    const { error: err } = await supabase.from('products').update(form).eq('id', productId);
    if (err) setError(err.message);
    else setSuccess('Product saved successfully!');
    setLoading(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploadingImage(true); setError('');

    for (const file of files) {
      const ext = file.name.split('.').pop();
      const path = `${productId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: upErr } = await supabase.storage.from('shade-cards').upload(path, file);
      if (upErr) { setError('Upload failed: ' + upErr.message); continue; }
      const { data: urlData } = supabase.storage.from('shade-cards').getPublicUrl(path);
      const newImg = {
        product_id: productId, url: urlData.publicUrl,
        storage_path: path, sort_order: images.length,
      };
      const { data: inserted } = await supabase.from('product_images').insert(newImg).select().single();
      if (inserted) setImages((prev) => [...prev, inserted]);
    }
    setUploadingImage(false);
    e.target.value = '';
  };

  const handleDeleteImage = async (img: ProductImage) => {
    if (!confirm('Remove this shade card photo?')) return;
    if (img.storage_path) {
      await supabase.storage.from('shade-cards').remove([img.storage_path]);
    }
    await supabase.from('product_images').delete().eq('id', img.id);
    setImages((prev) => prev.filter((i) => i.id !== img.id));
  };

  if (fetchLoading) return <div style={{ padding: '60px', textAlign: 'center', color: '#888' }}>Loading product...</div>;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
        <button onClick={() => router.push('/admin/products')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', fontSize: '0.875rem' }}>
          ← Products
        </button>
        <h1 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)', color: '#432430', fontWeight: 700 }}>
          {form.name}
        </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '24px', alignItems: 'start' }}>
        {/* Product details form */}
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Card title="Basic Information">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <Field label="Product Name">
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={INPUT_STYLE} onFocus={FOCUS} onBlur={BLUR} />
              </Field>
              <Field label="Website Display Name">
                <input value={form.website_name} onChange={(e) => setForm({ ...form, website_name: e.target.value })} style={INPUT_STYLE} onFocus={FOCUS} onBlur={BLUR} />
              </Field>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '14px' }}>
              <Field label="Category">
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={INPUT_STYLE} onFocus={FOCUS} onBlur={BLUR}>
                  <option value="velvet">Velvet</option>
                  <option value="specialty">Specialty</option>
                </select>
              </Field>
              <Field label="Featured on Homepage">
                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                  {[true, false].map((v) => (
                    <button key={String(v)} type="button" onClick={() => setForm({ ...form, featured: v })}
                      style={{
                        flex: 1, padding: '9px', borderRadius: '7px', cursor: 'pointer', border: 'none',
                        fontWeight: 700, fontSize: '0.8rem', transition: 'all 0.2s',
                        background: form.featured === v ? (v ? 'rgba(34,197,94,0.12)' : 'rgba(67,36,48,0.08)') : '#f5f5f5',
                        color: form.featured === v ? (v ? '#16a34a' : '#432430') : '#888',
                      }}>
                      {v ? '⭐ Yes' : '✗ No'}
                    </button>
                  ))}
                </div>
              </Field>
            </div>
          </Card>

          <Card title="Description">
            <Field label="Full Description">
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4}
                style={{ ...INPUT_STYLE, resize: 'vertical', lineHeight: 1.6 }} onFocus={FOCUS} onBlur={BLUR} />
            </Field>
            <Field label="Quality Description" style={{ marginTop: '14px' }}>
              <input value={form.quality_desc} onChange={(e) => setForm({ ...form, quality_desc: e.target.value })} style={INPUT_STYLE} onFocus={FOCUS} onBlur={BLUR} />
            </Field>
          </Card>

          <Card title="Pricing & Specs">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
              <Field label="Price Range">
                <input value={form.price_range} onChange={(e) => setForm({ ...form, price_range: e.target.value })} placeholder="₹100/mtr" style={INPUT_STYLE} onFocus={FOCUS} onBlur={BLUR} />
              </Field>
              <Field label="Width">
                <input value={form.width} onChange={(e) => setForm({ ...form, width: e.target.value })} placeholder="44'" style={INPUT_STYLE} onFocus={FOCUS} onBlur={BLUR} />
              </Field>
              <Field label="Weight / Roll">
                <input value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} placeholder="19 kg" style={INPUT_STYLE} onFocus={FOCUS} onBlur={BLUR} />
              </Field>
            </div>
            <Field label="Best Used For" style={{ marginTop: '14px' }}>
              <input value={form.used_for} onChange={(e) => setForm({ ...form, used_for: e.target.value })} placeholder="Sarees, Lehengas..." style={INPUT_STYLE} onFocus={FOCUS} onBlur={BLUR} />
            </Field>
          </Card>

          <Card title="WhatsApp Inquiry Message">
            <Field label="Pre-filled WhatsApp message">
              <textarea value={form.whatsapp_msg} onChange={(e) => setForm({ ...form, whatsapp_msg: e.target.value })} rows={3}
                style={{ ...INPUT_STYLE, resize: 'vertical', lineHeight: 1.6 }} onFocus={FOCUS} onBlur={BLUR} />
            </Field>
          </Card>

          {error && <div style={{ padding: '12px 16px', borderRadius: '8px', background: 'rgba(220,38,38,0.06)', color: '#dc2626', fontSize: '0.85rem' }}>{error}</div>}
          {success && <div style={{ padding: '12px 16px', borderRadius: '8px', background: 'rgba(34,197,94,0.08)', color: '#16a34a', fontSize: '0.85rem' }}>✅ {success}</div>}

          <button type="submit" disabled={loading} style={{
            padding: '13px', borderRadius: '8px', background: loading ? '#ccc' : '#432430',
            color: '#ffcc45', border: 'none', fontWeight: 700, fontSize: '0.9rem',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}>
            {loading ? 'Saving...' : '💾 Save Product Details'}
          </button>
        </form>

        {/* Shade Cards Manager */}
        <div>
          <div style={{ background: '#fff', borderRadius: '12px', padding: '22px', border: '1px solid rgba(67,36,48,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#432430' }}>
                🎨 Shade Card Photos
              </h2>
              <span style={{ fontSize: '0.75rem', color: '#888' }}>{images.length} photo{images.length !== 1 ? 's' : ''}</span>
            </div>

            {/* Upload button */}
            <label style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: '13px', borderRadius: '8px', cursor: uploadingImage ? 'not-allowed' : 'pointer',
              border: '2px dashed rgba(67,36,48,0.25)', color: uploadingImage ? '#aaa' : '#432430',
              fontSize: '0.85rem', fontWeight: 600, marginBottom: '16px',
              background: uploadingImage ? '#fafafa' : 'rgba(255,204,69,0.04)',
              transition: 'all 0.2s',
            }}>
              {uploadingImage ? '⏳ Uploading...' : '📤 Upload Shade Card Photos'}
              <input type="file" accept="image/*" multiple onChange={handleImageUpload}
                disabled={uploadingImage} style={{ display: 'none' }} />
            </label>

            {/* Image grid */}
            {images.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '32px 16px', color: '#bbb', fontSize: '0.85rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📸</div>
                No shade card photos yet.<br />Upload some above!
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {images.map((img) => (
                  <div key={img.id} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(67,36,48,0.1)' }}>
                    <div style={{ position: 'relative', paddingBottom: '75%' }}>
                      <Image src={img.url} alt="Shade card" fill style={{ objectFit: 'cover' }} unoptimized={img.url.startsWith('/materials')} />
                    </div>
                    <button
                      onClick={() => handleDeleteImage(img)}
                      style={{
                        position: 'absolute', top: '6px', right: '6px',
                        background: 'rgba(220,38,38,0.85)', color: '#fff',
                        border: 'none', borderRadius: '50%', width: '26px', height: '26px',
                        cursor: 'pointer', fontSize: '0.8rem', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', fontWeight: 700,
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <p style={{ marginTop: '14px', fontSize: '0.72rem', color: '#bbb', lineHeight: 1.5 }}>
              * Uploaded photos are stored in Supabase Storage. You can upload multiple at once.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', borderRadius: '12px', padding: '22px', border: '1px solid rgba(67,36,48,0.08)' }}>
      <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#432430', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid rgba(67,36,48,0.06)' }}>{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, children, style }: { label: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={style}>
      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>{label}</label>
      {children}
    </div>
  );
}
