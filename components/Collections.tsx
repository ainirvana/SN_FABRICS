'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

import FabricWavePreview from './FabricWavePreview';
import ProductModal from './ProductModal';

const collections = [
  {
    id: 1,
    title: 'Plain Velvet',
    description: 'Classic luxury. Perfect solid colors for minimalist elegance and heavy drapery.',
    image: 'https://images.unsplash.com/photo-1584988448834-8c886e0018a3?q=80&w=1964&auto=format&fit=crop', // Deep velvet
    link: '#plain-velvet',
  },
  {
    id: 2,
    title: 'Embroidered Velvet',
    description: 'Intricate patterns woven directly into high GSM velvet for royalty.',
    image: 'https://images.unsplash.com/photo-1594968710313-2679c65ab757?q=80&w=1968&auto=format&fit=crop', // Rich patterned
    link: '#embroidered',
  },
  {
    id: 3,
    title: 'Bridal Collection',
    description: 'The epitome of grandeur. Exquisite artistry for the most special occasions.',
    image: 'https://images.unsplash.com/photo-1623880447035-af39ca7e6fd0?q=80&w=2070&auto=format&fit=crop', // Rich gold/red
    link: '#bridal',
  },
];

export default function Collections() {
  const [activeProduct, setActiveProduct] = useState<typeof collections[0] | null>(null);

  return (
    <>
      <section id="collections" className="py-32 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-secondary tracking-[0.3em] uppercase text-sm mb-4 block"
              >
                Curated Selection
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-serif text-4xl md:text-6xl text-foreground font-normal"
              >
                Our Masterpieces
              </motion.h2>
            </div>
            
            <motion.a 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              href="#all-collections"
              className="group flex items-center space-x-3 text-foreground/70 hover:text-secondary transition-colors"
            >
              <span className="uppercase tracking-widest text-sm">View Full Catalog</span>
              <span className="p-3 border border-surface rounded-full group-hover:border-secondary group-hover:bg-secondary/10 transition-colors">
                 <ArrowRight size={16} />
              </span>
            </motion.a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {collections.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group relative cursor-pointer"
                onClick={() => setActiveProduct(item)}
              >
                <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                  {/* Image zoom effect on hover */}
                  <FabricWavePreview src={item.image} alt={item.title} />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end transform transition-transform duration-500 group-hover:-translate-y-4">
                    <h3 className="font-serif text-3xl text-white mb-3 group-hover:text-secondary transition-colors duration-300">
                      {item.title}
                    </h3>
                    
                    {/* Hidden content that reveals on hover */}
                    <div className="overflow-hidden h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      <p className="text-foreground/80 font-light text-sm mb-6 leading-relaxed">
                        {item.description}
                      </p>
                      <span className="inline-block border-b border-secondary text-secondary pb-1 text-sm uppercase tracking-widest">
                        View Interactive Details
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProductModal 
        isOpen={!!activeProduct} 
        onClose={() => setActiveProduct(null)} 
        product={activeProduct} 
      />
    </>
  );
}
