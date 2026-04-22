import { adminSupabase } from './admin';

async function updateDb() {
  const { data: products } = await adminSupabase.from('products').select('*');
  if (products) {
    for (const p of products) {
      let changed = false;
      const updates: any = {};
      
      if (p.whatsapp_msg.includes('SN Fabrics')) {
        updates.whatsapp_msg = p.whatsapp_msg.replace(/SN Fabrics/g, 'S N Fabrics');
        changed = true;
      }
      if (p.description.includes('SN Fabrics')) {
        updates.description = p.description.replace(/SN Fabrics/g, 'S N Fabrics');
        changed = true;
      }
      
      if (changed) {
        await adminSupabase.from('products').update(updates).eq('id', p.id);
        console.log(`Updated product: ${p.name}`);
      }
    }
  }

  const { data: blogs } = await adminSupabase.from('blogs').select('*');
  if (blogs) {
    for (const b of blogs) {
      let changed = false;
      const updates: any = {};
      
      if (b.author.includes('SN Fabrics')) {
        updates.author = b.author.replace(/SN Fabrics/g, 'S N Fabrics');
        changed = true;
      }
      
      if (changed) {
        await adminSupabase.from('blogs').update(updates).eq('id', b.id);
        console.log(`Updated blog: ${b.title}`);
      }
    }
  }
  
  console.log('DB update complete.');
}

updateDb();
