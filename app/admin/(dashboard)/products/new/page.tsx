'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const INPUT_STYLE: React.CSSProperties = {
  width: '100%', padding: '10px 14px', borderRadius: '8px',
  border: '1.5px solid rgba(67,36,48,0.18)', fontSize: '0.88rem',
  color: '#432430', outline: 'none', boxSizing: 'border-box',
  fontFamily: 'inherit', background: '#fff', transition: 'border-color 0.2s',
};
const FOCUS = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { e.currentTarget.style.borderColor = '#ffcc45'; };
const BLUR  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { e.currentTarget.style.borderColor = 'rgba(67,36,48,0.18)'; };

export default function NewProductPage() {
  const router = useRouter();
  const supabase = createClient();

  const [form, setForm] = useState({
    name: '', website_name: '', description: '', quality_desc: '',
    weight: '', price_range: '', width: '', used_for: '',
    whatsapp_msg: '', category: 'velvet', featured: false,
    sort_order: 99,
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState('');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.website_name) {
      setError('Name and Website Name are required');
      return;
    }

    setLoading(true); setError(''); setUploadProgress('');
    const { data, error: err } = await supabase.from('products').insert([form]).select().single();
    
    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    } 
    
    if (data && selectedFiles.length > 0) {
      setUploadProgress(`Uploading ${selectedFiles.length} photos...`);
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const ext = file.name.split('.').pop();
        const path = `${data.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: upErr } = await supabase.storage.from('shade-cards').upload(path, file);
        if (!upErr) {
          const { data: urlData } = supabase.storage.from('shade-cards').getPublicUrl(path);
          await supabase.from('product_images').insert({
            product_id: data.id, url: urlData.publicUrl,
            storage_path: path, sort_order: i,
          });
        }
      }
    }
    
    router.push(`/admin/products`);
    router.refresh();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
        <button onClick={() => router.push('/admin/products')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', fontSize: '0.875rem' }}>
          ← Products
        </button>
        <h1 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)', color: '#432430', fontWeight: 700 }}>
          Create New Product
        </h1>
      </div>

      <div style={{ maxWidth: '800px' }}>
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Card title="Basic Information">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <Field label="Product Name">
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={INPUT_STYLE} onFocus={FOCUS} onBlur={BLUR} placeholder="e.g. Makhan Velvet" required />
              </Field>
              <Field label="Website Display Name">
                <input value={form.website_name} onChange={(e) => setForm({ ...form, website_name: e.target.value })} style={INPUT_STYLE} onFocus={FOCUS} onBlur={BLUR} placeholder="e.g. S N Fabrics Makhan Velvet" required />
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
                style={{ ...INPUT_STYLE, resize: 'vertical', lineHeight: 1.6 }} onFocus={FOCUS} onBlur={BLUR} 
                placeholder="Hello S N Fabrics! I am interested in ordering..." />
            </Field>
          </Card>

          <Card title="🎨 Shade Card Photos (Optional)">
            <label style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: '13px', borderRadius: '8px', cursor: 'pointer',
              border: '2px dashed rgba(67,36,48,0.25)', color: '#432430',
              fontSize: '0.85rem', fontWeight: 600, background: 'rgba(255,204,69,0.04)',
              transition: 'all 0.2s',
            }}>
              {selectedFiles.length > 0 ? `📂 ${selectedFiles.length} photo(s) selected` : '📤 Select Shade Card Photos'}
              <input type="file" accept="image/*" multiple onChange={handleFileSelect} style={{ display: 'none' }} />
            </label>
            {selectedFiles.length > 0 && (
              <p style={{ marginTop: '8px', fontSize: '0.75rem', color: '#16a34a', fontWeight: 600 }}>
                Photos will be uploaded automatically when you click Create.
              </p>
            )}
          </Card>

          {error && <div style={{ padding: '12px 16px', borderRadius: '8px', background: 'rgba(220,38,38,0.06)', color: '#dc2626', fontSize: '0.85rem' }}>{error}</div>}
          {uploadProgress && <div style={{ padding: '12px 16px', borderRadius: '8px', background: 'rgba(255,204,69,0.15)', color: '#92400e', fontSize: '0.85rem', fontWeight: 600 }}>⏳ {uploadProgress}</div>}

          <button type="submit" disabled={loading} style={{
            padding: '13px', borderRadius: '8px', background: loading ? '#ccc' : '#432430',
            color: '#ffcc45', border: 'none', fontWeight: 700, fontSize: '0.9rem',
            cursor: loading ? 'not-allowed' : 'pointer', marginTop: '10px'
          }}>
            {loading ? 'Creating Product...' : '➕ Create Product & Upload Photos'}
          </button>
        </form>
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
