'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, KeyRound, ArrowRight } from 'lucide-react';

export default function DealerLogin() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center gap-2 px-6 py-2 bg-surface border border-surface text-foreground/80 hover:text-secondary hover:border-secondary transition-all duration-300 uppercase tracking-widest text-xs"
      >
        <KeyRound size={14} />
        Dealer Portal
      </button>

      {/* Adding it also to the mobile menu would be ideal, but for now we'll put the desktop trigger. 
          To ensure it's easily visible, we'll render a floating tab on the right side if closed. */}
      
      {!isOpen && (
        <motion.button
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ delay: 3 }}
          onClick={() => setIsOpen(true)}
          className="fixed top-1/2 right-0 -translate-y-1/2 bg-surface text-secondary py-6 px-3 rounded-l-md writing-vertical font-semibold tracking-widest uppercase text-xs z-40 hover:bg-secondary hover:text-primary transition-colors shadow-2xl flex flex-col items-center gap-4"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Dealer Portal
          <KeyRound size={16} className="rotate-90"/>
        </motion.button>
      )}

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md flex items-center justify-center p-4 lg:p-0"
          >
            <div className="flex w-full max-w-5xl bg-surface border border-surface shadow-2xl relative overflow-hidden h-[600px]">
              
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-foreground/50 hover:text-foreground transition-colors z-20 bg-background/50 p-2 rounded-full backdrop-blur-sm"
              >
                <X size={24} />
              </button>

              {/* Image Side */}
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="hidden lg:block w-1/2 relative h-full"
              >
                <img 
                  src="https://images.unsplash.com/photo-1594968710313-2679c65ab757?q=80&w=1968&auto=format&fit=crop" 
                  alt="Exclusive patterns"
                  className="w-full h-full object-cover filter brightness-[0.5]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-80" />
                <div className="absolute bottom-10 left-10 right-10">
                  <h3 className="font-serif text-3xl text-white mb-2">Exclusive Access.</h3>
                  <p className="text-foreground/70 font-light text-sm">
                    Enter the wholesale portal to view live inventory, manage bulk orders, and access tier-based pricing.
                  </p>
                </div>
              </motion.div>

              {/* Login Form Side */}
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-background/50 relative"
              >
                 {/* Decorative background element */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10" />

                <div className="mb-10">
                  <span className="text-secondary tracking-[0.2em] uppercase text-xs mb-2 block font-bold">S N Fabrics</span>
                  <h2 className="font-serif text-4xl text-white">Wholesale Login</h2>
                </div>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-foreground/50 mb-3">
                      Email Address
                    </label>
                    <input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent border-b border-surface py-3 text-white focus:outline-none focus:border-secondary transition-colors"
                      placeholder="dealer@example.com"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-3">
                      <label className="block text-xs uppercase tracking-widest text-foreground/50">
                        Password
                      </label>
                      <a href="#" className="text-xs text-secondary hover:underline">Forgot?</a>
                    </div>
                    <input 
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-transparent border-b border-surface py-3 text-white focus:outline-none focus:border-secondary transition-colors"
                      placeholder="••••••••"
                    />
                  </div>

                  <button className="w-full mt-8 group relative px-8 py-4 bg-secondary text-primary font-semibold tracking-widest uppercase overflow-hidden flex items-center justify-center gap-2 hover:bg-white transition-colors duration-300">
                    <span>Sign In</span>
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </form>

                <div className="mt-12 text-center">
                  <p className="text-xs text-foreground/50">
                    Not a registered wholesale partner? <br/>
                    <a href="https://wa.me/YOUR_PHONE_NUMBER" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline mt-2 inline-block">Request Access via WhatsApp</a>
                  </p>
                </div>

              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
