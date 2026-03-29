import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  type: 'star' | 'firework' | 'cake' | 'crescent';
  hue: number;
  life: number;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        type: ['star', 'firework', 'cake', 'crescent'][Math.floor(Math.random() * 4)] as Particle['type'],
        hue: Math.random() * 360,
        life: Math.random() * 100,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;

      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life += 0.5;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.save();
        ctx.translate(particle.x, particle.y);

        if (particle.type === 'star') {
          ctx.fillStyle = `hsla(${particle.hue}, 100%, 70%, 0.8)`;
          ctx.beginPath();
          for (let i = 0; i < 5; i++) {
            const angle = (i * 4 * Math.PI) / 5;
            const x = Math.cos(angle) * particle.size;
            const y = Math.sin(angle) * particle.size;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fill();
        } else if (particle.type === 'crescent') {
          ctx.fillStyle = `hsla(50, 100%, 70%, 0.6)`;
          ctx.beginPath();
          ctx.arc(0, 0, particle.size, 0.2, Math.PI * 1.8);
          ctx.fill();
        } else if (particle.type === 'firework') {
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size);
          gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 60%, 0.8)`);
          gradient.addColorStop(1, `hsla(${particle.hue}, 100%, 50%, 0)`);
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(0, 0, particle.size * 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `hsla(${particle.hue}, 80%, 60%, 0.7)`;
          ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        }

        ctx.restore();
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)' }}
    />
  );
}
