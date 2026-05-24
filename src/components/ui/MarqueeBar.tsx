'use client'

interface MarqueeBarProps {
  text?: string
  repeat?: number
  className?: string
}

export default function MarqueeBar({
  text = 'ROW BALTIC 2026 ✦ IELU MĀKSLA ✦ CĪŅA ✦ RĪGA ✦ SARKANDAUGAVA ✦',
  repeat = 4,
  className = '',
}: MarqueeBarProps) {
  return (
    <div className={`overflow-hidden whitespace-nowrap bg-acid text-ink-900 py-3 ${className}`}>
      <div className="inline-flex animate-marquee">
        {Array.from({ length: repeat * 2 }).map((_, i) => (
          <span key={i} className="text-sm font-mono font-bold uppercase tracking-widest px-4">
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
