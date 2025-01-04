'use client';

import { motion } from 'framer-motion';
import { DollarSign, Coins, CreditCard, Wallet, PiggyBank } from 'lucide-react';
import { useEffect, useState } from 'react';

export function AnimatedBackground() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };

      handleResize(); // Set initial size
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  const items = Array.from({ length: 25 }, (_, i) => i); // Increased number of items

  const icons = [DollarSign, Coins, CreditCard, Wallet, PiggyBank];

  const getRandomIcon = () => {
    const Icon = icons[Math.floor(Math.random() * icons.length)];
    return <Icon className="w-12 h-12" />; // Increased icon size
  };

  const getRandomColor = () => {
    const colors = [
      'text-emerald-500',
      'text-blue-500',
      'text-purple-500',
      'text-yellow-500',
      'text-pink-500',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  if (!windowSize.width || !windowSize.height) {
    // Avoid rendering until we have window dimensions
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map((item) => (
        <motion.div
          key={item}
          initial={{
            x: Math.random() * windowSize.width,
            y: -50,
            rotate: 0,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            y: windowSize.height + 50,
            rotate: 360,
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: Math.random() * 8 + 8,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 5,
          }}
          className={`absolute ${getRandomColor()} drop-shadow-lg`}
        >
          {getRandomIcon()}
        </motion.div>
      ))}

      {/* Add floating particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          initial={{
            x: Math.random() * windowSize.width,
            y: Math.random() * windowSize.height,
            scale: 0,
          }}
          animate={{
            x: Math.random() * windowSize.width,
            y: Math.random() * windowSize.height,
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-blue-400 blur-sm"
        />
      ))}
    </div>
  );
}
