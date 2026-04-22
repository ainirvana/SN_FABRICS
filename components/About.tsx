'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="story" className="py-32 bg-surface text-foreground relative overflow-hidden">
      {/* Decorative large text background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center opacity-5 pointer-events-none overflow-hidden select-none">
        <span className="font-serif text-[15vw] whitespace-nowrap text-white leading-none">LEGACY</span>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-secondary tracking-[0.3em] uppercase text-sm mb-6 block"
            >
              Our Heritage
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight"
            >
              Decades of crafting <br/>
              <span className="italic text-secondary font-light">the extraordinary.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6 text-foreground/80 font-light text-lg leading-relaxed max-w-xl"
            >
              <p>
                As an industry-leading wholesaler, S N Fabrics has been the silent backbone behind the most magnificent garments and opulent interiors.
              </p>
              <p>
                We do not just sell fabric; we provide the canvas for visionaries. Our velvet is meticulously woven to capture light, define form, and deliver an unparalleled tactile experience.
              </p>
              <p className="border-l-2 border-secondary pl-6 italic text-white/90">
                &quot;Main simple website nahi banaunga. Main aapka digital showroom banaunga.&quot;
              </p>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.3 }}
               className="mt-12 flex gap-12"
            >
              <div>
                <span className="block font-serif text-4xl text-secondary mb-2">25+</span>
                <span className="text-xs uppercase tracking-widest text-foreground/50">Years Experience</span>
              </div>
              <div>
                <span className="block font-serif text-4xl text-secondary mb-2">10k+</span>
                <span className="text-xs uppercase tracking-widest text-foreground/50">Yards Woven</span>
              </div>
            </motion.div>
          </div>

          {/* Image Content */}
          <div className="order-1 lg:order-2 relative h-[500px] md:h-[700px] w-full" ref={ref}>
            <motion.div 
              style={{ y: imageY }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="absolute inset-4 md:inset-10 z-10"
            >
              <img 
                src="https://images.unsplash.com/photo-1618220179428-22790b46a0eb?q=80&w=1964&auto=format&fit=crop" 
                alt="Luxury textile weaving"
                className="w-full h-full object-cover shadow-2xl"
              />
              {/* Overlay frame */}
              <div className="absolute inset-0 border border-secondary/30 m-4 pointer-events-none mix-blend-overlay" />
            </motion.div>
            {/* Background offset block */}
            <motion.div 
              initial={{ opacity: 0, x: 20, y: -20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute -top-4 -right-4 w-2/3 h-2/3 bg-background border border-surface mix-blend-difference" 
            />
          </div>

        </div>
      </div>
    </section>
  );
}
