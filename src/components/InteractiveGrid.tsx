'use client';

import { useEffect, useRef } from 'react';

export default function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const gridSize = 40;
    const maxDistance = 200;
    const pushStrength = 35; // How far particles move away from cursor

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const dx = mouseX - x;
          const dy = mouseY - y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          let finalX = x;
          let finalY = y;
          let opacity = 0.1;
          let size = 0.5;

          if (distance < maxDistance) {
            // Calculate push effect (particles move away from cursor)
            const pushFactor = 1 - distance / maxDistance;
            const pushX = -(dx / distance) * pushStrength * pushFactor;
            const pushY = -(dy / distance) * pushStrength * pushFactor;

            finalX = x + pushX;
            finalY = y + pushY;
            opacity = 0.1 + pushFactor * 0.7;
            size = 0.5 + pushFactor * 2;

            // Draw particle with glow
            ctx.beginPath();
            ctx.arc(finalX, finalY, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(96, 165, 250, ${opacity})`;
            ctx.fill();

            // Add glow effect
            if (pushFactor > 0.3) {
              ctx.beginPath();
              ctx.arc(finalX, finalY, size + 3, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(96, 165, 250, ${opacity * 0.2})`;
              ctx.fill();
            }

            // Draw lines to nearby points with enhanced visibility
            if (x + gridSize < canvas.width) {
              const nextDx = mouseX - (x + gridSize);
              const nextDy = mouseY - y;
              const nextDistance = Math.sqrt(nextDx * nextDx + nextDy * nextDy);

              if (nextDistance < maxDistance) {
                const nextPushFactor = 1 - nextDistance / maxDistance;
                const nextPushX = -(nextDx / nextDistance) * pushStrength * nextPushFactor;
                const nextPushY = -(nextDy / nextDistance) * pushStrength * nextPushFactor;

                ctx.beginPath();
                ctx.moveTo(finalX, finalY);
                ctx.lineTo(x + gridSize + nextPushX, y + nextPushY);
                ctx.strokeStyle = `rgba(96, 165, 250, ${opacity * 0.4})`;
                ctx.lineWidth = 1;
                ctx.stroke();
              }
            }

            if (y + gridSize < canvas.height) {
              const nextDx = mouseX - x;
              const nextDy = mouseY - (y + gridSize);
              const nextDistance = Math.sqrt(nextDx * nextDx + nextDy * nextDy);

              if (nextDistance < maxDistance) {
                const nextPushFactor = 1 - nextDistance / maxDistance;
                const nextPushX = -(nextDx / nextDistance) * pushStrength * nextPushFactor;
                const nextPushY = -(nextDy / nextDistance) * pushStrength * nextPushFactor;

                ctx.beginPath();
                ctx.moveTo(finalX, finalY);
                ctx.lineTo(x + nextPushX, y + gridSize + nextPushY);
                ctx.strokeStyle = `rgba(96, 165, 250, ${opacity * 0.4})`;
                ctx.lineWidth = 1;
                ctx.stroke();
              }
            }
          } else {
            // Draw static grid
            ctx.beginPath();
            ctx.arc(x, y, 0.5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(drawGrid);
    };

    drawGrid();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  );
}
