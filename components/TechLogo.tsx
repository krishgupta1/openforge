import Image from 'next/image';
import { getTechLogo } from '@/lib/techLogos';

interface TechLogoProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fallback?: boolean;
}

const sizeClasses = {
  sm: 'w-5 h-5',
  md: 'w-7 h-7',
  lg: 'w-10 h-10'
};

export default function TechLogo({ name, size = 'md', className = '', fallback = true }: TechLogoProps) {
  const logoPath = getTechLogo(name);
  const sizeClass = sizeClasses[size];

  if (logoPath) {
    return (
      <div className={`${sizeClass} rounded-[4px] overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center ${className}`}>
        <Image
          src={logoPath}
          alt={name}
          width={size === 'sm' ? 20 : size === 'md' ? 28 : 40}
          height={size === 'sm' ? 20 : size === 'md' ? 28 : 40}
          className="w-full h-full object-contain p-0.5"
          unoptimized
        />
      </div>
    );
  }

  // Fallback to text-based logo if no image found and fallback is enabled
  if (fallback) {
    return (
      <div className={`${sizeClass} bg-neutral-800 border border-neutral-700 rounded-[4px] flex items-center justify-center text-neutral-400 font-bold ${className}`}
           style={{ fontSize: size === 'sm' ? '8px' : size === 'md' ? '10px' : '12px' }}>
        {name.length > 3 ? name.substring(0, 3).toUpperCase() : name.toUpperCase()}
      </div>
    );
  }

  return null;
}
