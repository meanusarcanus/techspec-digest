'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  color: string;
  pulseSpeed: number;
  pulsePhase: number;
  geometryType: 'circle' | 'diamond' | 'star';
}

export default function AmbientCosmicBg() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      isHovered: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Color palette for cosmic particles: Sacred Gold, Indigo, Violet, Starlight
    const colors = [
      '#F59E0B', // Gold accent
      '#FBBF24', // Light gold
      '#818CF8', // Soft Indigo
      '#C084FC', // Soft Violet
      '#E2E8F0', // Starlight White
    ];

    const particleCount = Math.floor(Math.min(width, height) / 12);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        baseAlpha: Math.random() * 0.6 + 0.2,
        alpha: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulsePhase: Math.random() * Math.PI * 2,
        geometryType: Math.random() > 0.8 ? 'diamond' : Math.random() > 0.9 ? 'star' : 'circle',
      });
    }

    let angle = 0;

    const drawSacredNode = (ctx: CanvasRenderingContext2D, p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.fillStyle = p.color;
      ctx.strokeStyle = p.color;
      ctx.globalAlpha = p.alpha;

      if (p.geometryType === 'diamond') {
        const s = p.radius * 2;
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.lineTo(s, 0);
        ctx.lineTo(0, s);
        ctx.lineTo(-s, 0);
        ctx.closePath();
        ctx.fill();
      } else if (p.geometryType === 'star') {
        const s = p.radius * 2.5;
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.lineTo(s * 0.3, -s * 0.3);
        ctx.lineTo(s, 0);
        ctx.lineTo(s * 0.3, s * 0.3);
        ctx.lineTo(0, s);
        ctx.lineTo(-s * 0.3, s * 0.3);
        ctx.lineTo(-s, 0);
        ctx.lineTo(-s * 0.3, -s * 0.3);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    // Draw faint sacred geometry central overlay (Flower of Life motif)
    const drawFlowerOfLifeOverlay = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number) => {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle * 0.2);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.04)';
      ctx.lineWidth = 1;

      // Central ring
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.stroke();

      // 6 outer petal circles
      for (let i = 0; i < 6; i++) {
        const theta = (i * Math.PI) / 3;
        const cx = radius * Math.cos(theta);
        const cy = radius * Math.sin(theta);
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.restore();
    };

    const render = () => {
      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
      angle += 0.002;

      ctx.clearRect(0, 0, width, height);

      // Draw sacred geometry background overlay at mouse or center
      const centerOverlayX = mouse.isHovered ? mouse.x : width / 2;
      const centerOverlayY = mouse.isHovered ? mouse.y : height / 2;
      drawFlowerOfLifeOverlay(ctx, centerOverlayX, centerOverlayY, 140);
      drawFlowerOfLifeOverlay(ctx, width / 2, height / 2, Math.min(width, height) * 0.25);

      // Connect particles with delicate glowing web lines
      const maxDist = 130;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(245, 158, 11, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Connect particles to mouse cursor if near
      if (mouse.isHovered) {
        for (let i = 0; i < particles.length; i++) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const mouseDist = 180;

          if (dist < mouseDist) {
            const lineAlpha = (1 - dist / mouseDist) * 0.25;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(129, 140, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();

            // Slight magnetic pull towards mouse
            particles[i].x -= dx * 0.005;
            particles[i].y -= dy * 0.005;
          }
        }
      }

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce at boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Pulse alpha
        p.pulsePhase += p.pulseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.25;

        drawSacredNode(ctx, p);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0B0F19]">
      {/* Slow-pulsing cosmic gradient mesh background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-950/40 blur-[130px] animate-pulse-slow" />
      <div className="absolute top-[25%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-amber-500/10 blur-[150px] animate-pulse-slow [animation-delay:2s]" />
      <div className="absolute bottom-[-15%] left-[20%] w-[65vw] h-[65vw] rounded-full bg-violet-950/30 blur-[160px] animate-pulse-slow [animation-delay:4s]" />

      {/* Interactive Sacred Geometry Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
}
