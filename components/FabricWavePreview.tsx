'use client';

import { motion } from 'framer-motion';

export default function FabricWavePreview({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full h-full overflow-hidden group perspective-[1000px]">
      <motion.div
        className="w-full h-full"
        whileHover={{
          rotateX: [0, 5, -5, 0],
          rotateY: [0, -5, 5, 0],
          scale: 1.05,
          transition: {
            duration: 2,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'mirror',
          },
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <img 
          src={src} 
          alt={alt}
          className="w-full h-full object-cover filter brightness-[0.8] contrast-125"
        />
        {/* Simulate light rolling over the fabric */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer" />
      </motion.div>
    </div>
  );
}
