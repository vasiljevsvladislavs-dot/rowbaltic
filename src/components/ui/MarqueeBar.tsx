'use client'

interface MarqueeBarProps {
  text?: string
  repeat?: number
  className?: string
}

export default function MarqueeBar({
  text = 'ROW BALTICS 2026 ✦ IELU MĀKSLA ✦ CĪŅA ✦ RĪGA ✦ SARKANDAUGAVA ✦',
  repeat = 4,
  className = '',
}: MarqueeBarProps) {
  return (
    <div className={`overflow-hidden whitespace-nowrap bg-ink-800 border-t border-ink-700 text-ink-500 py-2.5 ${className}`}>
      <div className="inline-flex animate-marquee">
        {Array.from({ length: repeat * 2 }).map((_, i) => (
          <span key={i} className="text-xs font-mono uppercase tracking-widest px-4">
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
