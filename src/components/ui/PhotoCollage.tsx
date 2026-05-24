'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { PhotoCollageImage } from '@/types'

interface PhotoCollageProps {
  images: PhotoCollageImage[]
  className?: string
  variant?: 'overlap' | 'grid' | 'featured'
}

const ROTATIONS = [-3, 2, -1.5, 3, -2]

export default function PhotoCollage({
  images,
  className,
  variant = 'overlap',
}: PhotoCollageProps) {
  const [hovered, setHovered] = useState<number | null>(null)

  if (variant === 'featured' && images.length >= 3) {
    return (
      <div className={cn('w-full', className)}>
        {/* Desktop: featured layout */}
        <div className="hidden md:grid grid-cols-12 grid-rows-2 gap-3 h-[600px]">
          <div className="col-span-7 row-span-2 relative overflow-hidden group">
            <Image
              src={images[0].src}
              alt={images[0].alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 58vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent" />
          </div>
          {images.slice(1, 5).map((img, i) => (
            <div key={i} className="col-span-5 relative overflow-hidden group">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="42vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/40 to-transparent" />
            </div>
          ))}
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {images.map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-72 h-48 relative overflow-hidden rounded-sm snap-center"
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="288px" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/50 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'grid') {
    return (
      <div className={cn('w-full', className)}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
          {images.map((img, i) => (
            <div
              key={i}
              className={cn(
                'relative overflow-hidden group',
                i === 0 ? 'col-span-2 md:col-span-1 h-64 md:h-80' : 'h-48 md:h-64'
              )}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-ink-900/20 group-hover:bg-ink-900/0 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Default: overlapping scattered collage
  return (
    <div className={cn('relative w-full h-[420px] md:h-[520px]', className)}>
      {images.slice(0, 5).map((img, i) => {
        const positions = [
          { left: '0%', top: '5%', w: 280, h: 200 },
          { left: '20%', top: '30%', w: 260, h: 190 },
          { left: '42%', top: '0%', w: 300, h: 210 },
          { left: '62%', top: '35%', w: 260, h: 185 },
          { left: '10%', top: '55%', w: 250, h: 180 },
        ]
        const pos = positions[i]
        const isHovered = hovered === i
        return (
          <div
            key={i}
            className={cn(
              'absolute overflow-hidden shadow-2xl cursor-pointer transition-all duration-300',
              isHovered ? 'z-20 scale-105 shadow-acid/20' : `z-${10 - i}`
            )}
            style={{
              left: pos.left,
              top: pos.top,
              width: pos.w,
              height: pos.h,
              transform: `rotate(${ROTATIONS[i]}deg) ${isHovered ? 'scale(1.05)' : ''}`,
              zIndex: isHovered ? 20 : 10 - i,
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="300px"
            />
            <div
              className={cn(
                'absolute inset-0 bg-gradient-to-b from-transparent to-ink-900/60 transition-opacity duration-300',
                isHovered ? 'opacity-0' : 'opacity-100'
              )}
            />
          </div>
        )
      })}
    </div>
  )
}
