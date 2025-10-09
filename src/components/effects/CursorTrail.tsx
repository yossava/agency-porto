'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Trail {
  id: number;
  x: number;
  y: number;
}

export default function CursorTrail() {
  const [trails, setTrails] = useState<Trail[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let trailId = 0;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });

      // Only add trail if mouse has moved significantly
      const distance = Math.sqrt(
        Math.pow(clientX - lastX, 2) + Math.pow(clientY - lastY, 2)
      );

      if (distance > 10) {
        setTrails((prev) => [
          ...prev.slice(-15), // Keep only last 15 trails
          { id: trailId++, x: clientX, y: clientY },
        ]);
        lastX = clientX;
        lastY = clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Remove old trails
    const interval = setInterval(() => {
      setTrails((prev) => prev.slice(1));
    }, 50);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {trails.map((trail, index) => (
          <motion.div
            key={trail.id}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
            style={{
              left: trail.x - 4,
              top: trail.y - 4,
            }}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>

      {/* Custom cursor */}
      <motion.div
        className="absolute w-6 h-6 rounded-full border-2 border-blue-400/50 pointer-events-none"
        animate={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      />
    </div>
  );
}
