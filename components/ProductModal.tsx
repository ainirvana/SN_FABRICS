'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Rotate3D } from 'lucide-react';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    title: string;
    description: string;
    image: string;
  } | null;
}

export default function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [rotation, setRotation] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Simulate 360 degree viewing by panning the background
    // Calculate rotation based on mouse X position relative to container
    if (isZoomed) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element.
    const percentage = x / rect.width;
    
    // Map percentage to a rotation value
    setRotation((percentage - 0.5) * 30); // rotate between -15 and 15 degrees
  };

  return (
    <AnimatePresence>
      {isOpen && product && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-background flex flex-col md:flex-row overflow-hidden"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-50 text-foreground/50 hover:text-white transition-colors p-2 bg-background/50 rounded-full"
          >
            <X size={28} />
          </button>

          {/* Interactive Viewer Side */}
          <div className="w-full md:w-2/3 h-[50vh] md:h-full relative bg-surface overflow-hidden flex items-center justify-center cursor-crosshair">
            
            {/* Toolbar overlay */}
            <div className="absolute top-6 left-6 z-20 flex gap-4">
              <button 
                onClick={() => setIsZoomed(!isZoomed)}
                className={`p-3 rounded-full flex items-center gap-2 text-xs uppercase tracking-widest ${isZoomed ? 'bg-secondary text-primary' : 'bg-background/80 text-foreground hover:text-secondary'}`}
              >
                <ZoomIn size={16} />
                {isZoomed ? 'Zoom Out' : 'Zoom In'}
              </button>
              <div className="p-3 rounded-full flex items-center gap-2 text-xs uppercase tracking-widest bg-background/80 text-foreground">
                 <Rotate3D size={16} />
                 360° Simulation
              </div>
            </div>

            {/* Simulated 360/Zoom Container */}
            <motion.div 
              className="w-full h-full relative flex items-center justify-center transform-gpu"
              style={{ perspective: 1000 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setRotation(0)}
              animate={{ 
                scale: isZoomed ? 2.5 : 1,
              }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
               <motion.img 
                  animate={{ 
                    rotateY: isZoomed ? 0 : rotation,
                    scale: isZoomed ? 1 : 1.1 // base scale to prevent edges showing on rotation
                  }}
                  transition={{ type: 'spring', stiffness: 100, damping: 30 }}
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-cover filter brightness-[0.8]"
                  style={{ transformStyle: 'preserve-3d' }}
               />
               
               {/* Lighting simulation */}
               <motion.div 
                 animate={{ opacity: isZoomed ? 0 : 0.4 + (rotation / 60) }}
                 className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-black/60 pointer-events-none mix-blend-overlay"
               />
            </motion.div>
          </div>

          {/* Product Details Side */}
          <div className="w-full md:w-1/3 h-[50vh] md:h-full bg-background p-10 md:p-16 flex flex-col justify-center overflow-y-auto">
            <span className="text-secondary tracking-[0.2em] uppercase text-xs mb-4 block">Premium Collection</span>
            <h2 className="font-serif text-4xl text-white mb-6">{product.title}</h2>
            <p className="text-foreground/70 font-light leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="space-y-6 border-t border-surface pt-8">
               <div className="flex justify-between items-center text-sm">
                  <span className="uppercase tracking-widest text-foreground/50">GSM</span>
                  <span className="text-white">450 - High Density</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                  <span className="uppercase tracking-widest text-foreground/50">Width</span>
                  <span className="text-white">54&quot; (137cm)</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                  <span className="uppercase tracking-widest text-foreground/50">Available Colors</span>
                  <div className="flex gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#5A0F2E]"></div>
                    <div className="w-4 h-4 rounded-full bg-[#0D0D0D]"></div>
                    <div className="w-4 h-4 rounded-full bg-[#C9A14A]"></div>
                    <div className="w-4 h-4 rounded-full bg-[#1e3a5f]"></div>
                  </div>
               </div>
            </div>

            <div className="mt-12">
               <a 
                href={`https://wa.me/YOUR_PHONE_NUMBER?text=I am interested in bulk ordering ${product.title}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center py-4 border border-secondary text-secondary hover:bg-secondary hover:text-primary transition-colors tracking-widest uppercase text-sm font-semibold"
               >
                 Inquire Wholesale Pricing
               </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
