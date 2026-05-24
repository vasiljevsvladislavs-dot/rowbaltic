import MarqueeBar from '@/components/ui/MarqueeBar'

const nav = [
  { href: '#par-festivalu', label: 'Par festivālu' },
  { href: '#row-baltic-2026', label: 'ROW BALTIC 2026' },
  { href: '#konkurss', label: 'Konkurss' },
  { href: '#registracija', label: 'Reģistrācija' },
]

export default function Footer() {
  return (
    <footer className="bg-ink-900 border-t border-ink-800">
      <MarqueeBar
        text="ROW BALTIC ✦ RIGA OPEN WALL ✦ IELU MĀKSLA ✦ 2026 ✦"
        className="opacity-40"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-none text-cream mb-6">
              ROW<br />
              <span className="text-acid">BALTIC</span>
            </h2>
            <p className="text-ink-400 text-sm leading-relaxed max-w-xs">
              Riga Open Wall — ielu mākslas festivāls, kas pārvērš pilsētvidi par atvērtu mākslas
              galeriju.
            </p>
          </div>

          {/* Nav */}
          <div className="md:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-600 mb-6">
              Navigācija
            </p>
            <ul className="space-y-3">
              {nav.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="font-mono text-sm text-ink-300 hover:text-acid transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div className="md:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-600 mb-6">
              Kontakti
            </p>
            <div className="space-y-4">
              <div>
                <p className="font-mono text-[10px] text-ink-500 mb-1">E-pasts</p>
                <a
                  href="mailto:rowbaltics@gmail.com"
                  className="font-mono text-sm text-acid hover:underline"
                >
                  rowbaltics@gmail.com
                </a>
              </div>
              <div>
                <p className="font-mono text-[10px] text-ink-500 mb-1">Festivāls</p>
                <p className="font-mono text-sm text-ink-200">22. augusts, 2026</p>
                <p className="font-mono text-sm text-ink-400">Sarkandaugava, Rīga</p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-ink-500 mb-1">Organizators</p>
                <p className="font-mono text-sm text-ink-200">Dainis Rudens</p>
                <p className="font-mono text-sm text-ink-400">Biedrība „Mākslas birojs"</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-ink-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-mono text-[10px] text-ink-600 uppercase tracking-widest">
            © 2026 ROW BALTIC. Visas tiesības aizsargātas.
          </p>
          <p className="font-mono text-[10px] text-ink-700 uppercase tracking-widest">
            Rīgas valstspilsētas pašvaldības atbalsts
          </p>
        </div>
      </div>
    </footer>
  )
}
