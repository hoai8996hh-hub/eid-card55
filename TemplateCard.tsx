import { Template } from '../types';
import { Check } from 'lucide-react';

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: () => void;
}

export default function TemplateCard({ template, isSelected, onSelect }: TemplateCardProps) {
  const getGradientStyle = () => {
    if (template.pattern === 'radial') {
      return `radial-gradient(circle, ${template.gradient.join(', ')})`;
    } else if (template.pattern === 'diagonal') {
      return `linear-gradient(135deg, ${template.gradient.join(', ')})`;
    } else {
      return `linear-gradient(to bottom, ${template.gradient.join(', ')})`;
    }
  };

  return (
    <button
      onClick={onSelect}
      className={`relative group rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 ${
        isSelected ? 'ring-4 ring-blue-500 scale-105' : 'ring-2 ring-white/20'
      }`}
    >
      <div
        className="w-full h-40 flex items-center justify-center relative"
        style={{ background: getGradientStyle() }}
      >
        <div className="absolute inset-0 opacity-20">
          {template.pattern === 'islamic' && (
            <svg className="w-full h-full" viewBox="0 0 200 200">
              <path
                d="M100 20 Q120 50 100 80 Q80 50 100 20"
                fill="currentColor"
                className="text-white"
              />
              <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="2" className="text-white" />
            </svg>
          )}
          {template.pattern === 'stars' && (
            <svg className="w-full h-full" viewBox="0 0 200 200">
              {[...Array(20)].map((_, i) => (
                <circle
                  key={i}
                  cx={Math.random() * 200}
                  cy={Math.random() * 200}
                  r="2"
                  fill="currentColor"
                  className="text-yellow-300"
                />
              ))}
            </svg>
          )}
        </div>

        <div className="relative z-10">
          <h3 className={`text-2xl font-bold mb-1`} style={{ color: template.textColor }}>
            ACODE
          </h3>
          <p className={`text-sm`} style={{ color: template.textColor, opacity: 0.9 }}>
            Birthday Celebration
          </p>
        </div>

        {isSelected && (
          <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
            <Check className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

      <div className="bg-gray-900/90 backdrop-blur-sm px-3 py-2">
        <p className="text-white text-sm font-medium">{template.name}</p>
        <p className="text-gray-400 text-xs capitalize">{template.category}</p>
      </div>
    </button>
  );
}
