'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';

export default function BulkCalculator() {
  const [isOpen, setIsOpen] = useState(false);
  const [meters, setMeters] = useState<number | ''>('');
  const [fabricType, setFabricType] = useState('plain');

  const basePrice = {
    plain: 450,
    embroidered: 850,
    bridal: 1200
  }[fabricType] || 450;

  let discount = 0;
  const numMeters = Number(meters);
  if (numMeters >= 500) discount = 0.20;
  else if (numMeters >= 100) discount = 0.10;
  else if (numMeters >= 50) discount = 0.05;

  const total = numMeters ? numMeters * basePrice * (1 - discount) : 0;
  
  return (
    <>
      {/* Floating CTA */}
      <motion.button 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 z-40 bg-secondary text-primary px-6 py-3 font-semibold tracking-widest uppercase text-xs sm:text-sm shadow-[0_0_20px_rgba(201,161,74,0.3)] hover:scale-105 transition-transform"
      >
        Wholesale Calculator
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-surface border border-secondary/20 p-8 w-full max-w-lg relative shadow-2xl"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-foreground/50 hover:text-foreground transition-colors"
              >
                <X size={24} />
              </button>

              <h3 className="font-serif text-3xl mb-2 text-white">Bulk Estimate</h3>
              <p className="text-foreground/60 text-sm font-light mb-8">
                Instant pricing for wholesale orders.
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-foreground/70 mb-3">
                    Select Collection
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['plain', 'embroidered', 'bridal'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setFabricType(type)}
                        className={`py-3 text-xs uppercase tracking-wider border transition-colors ${
                          fabricType === type 
                            ? 'bg-secondary text-primary border-secondary' 
                            : 'border-surface bg-background/50 hover:border-secondary/50 text-foreground'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-foreground/70 mb-3">
                    Quantity (Meters)
                  </label>
                  <input 
                    type="number"
                    min="1"
                    value={meters}
                    onChange={(e) => setMeters(Number(e.target.value) || '')}
                    className="w-full bg-background border border-surface p-4 text-white focus:outline-none focus:border-secondary transition-colors"
                    placeholder="Enter meters (e.g. 100)"
                  />
                  <div className="flex gap-4 mt-2">
                     <span className="text-xs text-foreground/50 flex items-center gap-1"><CheckCircle2 size={12}/> 50m+ (5% off)</span>
                     <span className="text-xs text-foreground/50 flex items-center gap-1"><CheckCircle2 size={12}/> 100m+ (10% off)</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-surface flex justify-between items-end">
                  <div>
                    <span className="block text-xs uppercase tracking-widest text-foreground/50 mb-1">
                      Estimated Cost
                    </span>
                    <span className="font-serif text-3xl text-secondary">
                      ₹{total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <a 
                    href={`https://wa.me/YOUR_PHONE_NUMBER?text=Hi, I would like to order ${numMeters || 0} meters of ${fabricType} velvet. The estimated total is ₹${total}. Please confirm availability.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-primary px-6 py-3 uppercase tracking-widest text-xs font-semibold hover:bg-secondary transition-colors"
                  >
                    Send Inquiry
                  </a>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
