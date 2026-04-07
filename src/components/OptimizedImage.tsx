'use client';

import Image from 'next/image';
import { ImgHTMLAttributes, useState } from 'react';

type ImageType = 'hero' | 'gallery' | 'thumbnail' | 'portrait' | 'credential';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  src: string;
  alt: string;
  type?: ImageType;
  width?: number;
  height?: number;
  priority?: boolean;
  fill?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill';
  objectPosition?: string;
  fallback?: string;
}

const typeConfigs: Record<ImageType, { sizes: string; quality: number; placeholder?: 'blur' | 'empty' }> = {
  hero: {
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px',
    quality: 85,
    placeholder: 'blur'
  },
  gallery: {
    sizes: '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw',
    quality: 75,
    placeholder: 'empty'
  },
  thumbnail: {
    sizes: '(max-width: 640px) 100px, 150px',
    quality: 70,
    placeholder: 'empty'
  },
  portrait: {
    sizes: '(max-width: 640px) 100%, 300px',
    quality: 85,
    placeholder: 'blur'
  },
  credential: {
    sizes: '(max-width: 640px) 80px, 100px',
    quality: 85,
    placeholder: 'empty'
  }
};

/**
 * OptimizedImage Component
 *
 * Unified image loading component with Next.js Image optimization,
 * responsive sizing, error handling, and fallback support.
 *
 * Usage:
 * ```tsx
 * <OptimizedImage
 *   src="https://example.com/image.webp"
 *   alt="Description"
 *   type="hero"
 *   priority
 * />
 * ```
 */
export function OptimizedImage({
  src,
  alt,
  type = 'gallery',
  width,
  height,
  priority = false,
  fill = false,
  objectFit = 'cover',
  objectPosition = 'center',
  fallback,
  className = '',
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const config = typeConfigs[type];

  // Determine if we should use Next.js Image component
  const useNextImage = src.startsWith('http') || src.startsWith('/');

  if (hasError && fallback) {
    return (
      <img
        src={fallback}
        alt={alt}
        className={className}
        {...props}
      />
    );
  }

  if (!useNextImage) {
    // Fallback to native img tag for local files
    return (
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        className={className}
        {...props}
      />
    );
  }

  // Use Next.js Image for remote URLs
  if (fill) {
    return (
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={config.sizes}
          quality={config.quality}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          className={`${className} ${isLoading ? 'blur-sm' : 'blur-0 transition-all duration-300'}`}
          onLoadingComplete={() => setIsLoading(false)}
          onError={() => setHasError(true)}
          style={{
            objectFit: objectFit as any,
            objectPosition: objectPosition as any
          }}
          {...props}
        />
      </div>
    );
  }

  if (width && height) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={config.sizes}
        quality={config.quality}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        className={`${className} ${isLoading ? 'blur-sm' : 'blur-0 transition-all duration-300'}`}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        {...props}
      />
    );
  }

  // Fallback to native img
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      className={className}
      onError={() => setHasError(true)}
      {...props}
    />
  );
}

export default OptimizedImage;
