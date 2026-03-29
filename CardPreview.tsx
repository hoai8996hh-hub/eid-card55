import { Template } from '../types';
import { useEffect, useRef } from 'react';

interface CardPreviewProps {
  template: Template;
  userName: string;
  userImage: string | null;
}

export default function CardPreview({ template, userName, userImage }: CardPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getGradientStyle = () => {
    if (template.pattern === 'radial') {
      return `radial-gradient(circle, ${template.gradient.join(', ')})`;
    } else if (template.pattern === 'diagonal') {
      return `linear-gradient(135deg, ${template.gradient.join(', ')})`;
    } else {
      return `linear-gradient(to bottom, ${template.gradient.join(', ')})`;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawPattern = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 0.15;

      if (template.pattern === 'islamic') {
        for (let i = 0; i < 5; i++) {
          const x = (canvas.width / 6) * (i + 1);
          const y = canvas.height / 2;

          ctx.beginPath();
          ctx.arc(x, y - 40, 30, Math.PI, 0);
          ctx.strokeStyle = template.textColor;
          ctx.lineWidth = 3;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(x, y + 40, 50, 0, Math.PI * 2);
          ctx.stroke();
        }

        for (let i = 0; i < 10; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          drawStar(ctx, x, y, 5, 8, 4);
        }
      } else if (template.pattern === 'stars') {
        for (let i = 0; i < 50; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          const size = Math.random() * 3 + 2;
          drawStar(ctx, x, y, 5, size * 2, size);
        }
      } else if (template.pattern === 'confetti') {
        for (let i = 0; i < 100; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          const size = Math.random() * 10 + 5;
          const rotation = Math.random() * Math.PI * 2;

          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(rotation);
          ctx.fillStyle = `hsl(${Math.random() * 360}, 80%, 60%)`;
          ctx.fillRect(-size / 2, -size / 2, size, size / 4);
          ctx.restore();
        }
      } else if (template.pattern === 'geometric') {
        for (let i = 0; i < 30; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          const size = Math.random() * 40 + 20;

          ctx.strokeStyle = template.textColor;
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, size, size);
        }
      }
    };

    const drawStar = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      spikes: number,
      outerRadius: number,
      innerRadius: number
    ) => {
      let rot = (Math.PI / 2) * 3;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(x, y - outerRadius);

      for (let i = 0; i < spikes; i++) {
        ctx.lineTo(x + Math.cos(rot) * outerRadius, y + Math.sin(rot) * outerRadius);
        rot += step;
        ctx.lineTo(x + Math.cos(rot) * innerRadius, y + Math.sin(rot) * innerRadius);
        rot += step;
      }

      ctx.lineTo(x, y - outerRadius);
      ctx.closePath();
      ctx.strokeStyle = template.textColor;
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    drawPattern();
  }, [template]);

  return (
    <div id="card-preview" className="relative w-full max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
      <div
        className="relative w-full aspect-[4/3] flex flex-col items-center justify-center p-12"
        style={{ background: getGradientStyle() }}
      >
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="absolute inset-0 w-full h-full"
        />

        <div className="relative z-10 text-center space-y-8">
          {userImage && (
            <div className="mx-auto w-40 h-40 rounded-full overflow-hidden border-4 shadow-2xl" style={{ borderColor: template.textColor }}>
              <img
                src={userImage}
                alt={userName}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="space-y-4">
            <h1
              className={`text-${template.titleSize} font-bold tracking-tight drop-shadow-lg`}
              style={{ color: template.textColor }}
            >
              Happy Birthday
            </h1>

            <div className="flex items-center justify-center gap-3">
              <div className="h-1 w-16 rounded-full" style={{ backgroundColor: template.textColor, opacity: 0.6 }} />
              <h2
                className={`text-${template.subtitleSize} font-semibold`}
                style={{ color: template.textColor }}
              >
                {userName || 'Your Name'}
              </h2>
              <div className="h-1 w-16 rounded-full" style={{ backgroundColor: template.textColor, opacity: 0.6 }} />
            </div>

            <p
              className={`text-lg font-medium opacity-90`}
              style={{ color: template.textColor }}
            >
              From Acode Team with Love
            </p>

            <div className="flex items-center justify-center gap-2 pt-4">
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  fill={template.textColor}
                  opacity="0.8"
                />
              </svg>
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill={template.textColor} opacity="0.6" />
              </svg>
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  fill={template.textColor}
                  opacity="0.8"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
