'use client'

import { useState } from 'react'
import AnimateIn from '@/components/ui/AnimateIn'

const WALL_SIZES = ['2.7m × 4m (Standarts)', '2.7m × 8m (Dubultplatforma)', 'Cits izmērs']
const SHIRT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export default function RegistrationForm() {
  const [isBaltic, setIsBaltic] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Kļūda nosūtot pieteikumu')
      setStatus('success')
      form.reset()
      setIsBaltic(false)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Kļūda. Mēģiniet vēlreiz.')
    }
  }

  if (status === 'success') {
    return (
      <section id="registracija" className="section-pad bg-ink-900 border-t border-ink-800">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="border border-acid/30 bg-acid/5 p-16">
            <div className="font-display text-7xl text-acid mb-6">✓</div>
            <h3 className="font-display text-4xl text-cream mb-4">Pieteikums saņemts!</h3>
            <p className="text-ink-300 font-mono text-sm">
              Paldies! Jūsu pieteikums ir veiksmīgi iesniegts. Apstiprināto dalībnieku sarakstu
              publicēsim 2026. gada 30. jūnijā.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-8 font-mono text-xs uppercase tracking-widest text-acid border border-acid/40 px-6 py-3 hover:bg-acid hover:text-ink-900 transition-all"
            >
              Iesniegt vēl vienu pieteikumu
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="registracija" className="section-pad bg-ink-900 border-t border-ink-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <AnimateIn>
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-acid">04</span>
            <div className="w-12 h-px bg-acid" />
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink-400">
              Reģistrācija
            </span>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: intro */}
          <div className="lg:col-span-4">
            <AnimateIn delay={100}>
              <h2 className="font-display text-[clamp(2rem,4.5vw,4.5rem)] leading-none text-cream mb-8 whitespace-nowrap">
                PIETEIK<span className="text-acid">TIES</span>
              </h2>
            </AnimateIn>
            <AnimateIn delay={200}>
              <p className="text-ink-300 leading-relaxed mb-8">
                Aizpildi pieteikuma veidlapu un kļūsti par daļu no ROW BALTIC 2026. Pieteikšanās
                ir atvērta līdz{' '}
                <span className="text-acid">2026. gada 22. jūnijam plkst. 23:59</span>.
              </p>
            </AnimateIn>
            <AnimateIn delay={300}>
              <div className="space-y-4 border-t border-ink-800 pt-8">
                {[
                  { label: 'Datums', value: '22. augusts, 2026' },
                  { label: 'Vieta', value: 'Zāģeru iela, Sarkandaugava' },
                  { label: 'Laiks', value: '10:00 – 17:00' },
                  { label: 'Dalībnieki', value: '30 mākslinieki' },
                  { label: 'Darba laukums', value: '2.7m × 4m' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-baseline">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-ink-500">
                      {label}
                    </span>
                    <span className="font-mono text-xs text-ink-200">{value}</span>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>

          {/* Right: form */}
          <AnimateIn direction="left" delay={150} className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">
                    Vārds / Pseidonīms *
                  </label>
                  <input
                    name="nickname"
                    required
                    className="form-input"
                    placeholder="Tavs vārds vai pseidonīms"
                  />
                </div>
                <div>
                  <label className="form-label">
                    Kontakttālrunis *
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    className="form-input"
                    placeholder="+371 2X XXX XXX"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div>
                <label className="form-label">E-pasts *</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="form-input"
                  placeholder="tavs@epasts.lv"
                />
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Portfolio saite</label>
                  <input
                    name="portfolioUrl"
                    type="url"
                    className="form-input"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="form-label">Instagram / Facebook saite</label>
                  <input
                    name="socialUrl"
                    type="url"
                    className="form-input"
                    placeholder="https://instagram.com/..."
                  />
                </div>
              </div>

              {/* Portfolio file */}
              <div>
                <label className="form-label">Portfolio fails (PDF vai ZIP, maks. 10MB)</label>
                <input
                  name="portfolioFile"
                  type="file"
                  accept=".pdf,.zip,.jpg,.jpeg,.png"
                  className="w-full bg-ink-800 border border-ink-600 text-cream text-sm font-mono
                    file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-mono
                    file:uppercase file:tracking-widest file:bg-ink-700 file:text-ink-200
                    hover:file:bg-acid hover:file:text-ink-900 file:cursor-pointer
                    px-0 py-0 cursor-pointer focus:outline-none focus:border-acid
                    transition-colors duration-200"
                />
              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Vēlamais platformas izmērs</label>
                  <select name="wallSize" className="form-input">
                    <option value="">Izvēlieties...</option>
                    {WALL_SIZES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="form-label">Krekla izmērs *</label>
                  <select name="shirtSize" required className="form-input">
                    <option value="">Izvēlieties...</option>
                    {SHIRT_SIZES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Baltic artist toggle */}
              <div className="border border-ink-700 p-5">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="relative mt-0.5 shrink-0">
                    <input
                      name="isBalticArtist"
                      type="checkbox"
                      checked={isBaltic}
                      onChange={(e) => setIsBaltic(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 border border-ink-600 peer-checked:bg-acid peer-checked:border-acid transition-all" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100">
                      <svg className="w-3 h-3 text-ink-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-cream group-hover:text-acid transition-colors">
                      Es esmu Baltijas mākslinieks
                    </p>
                    <p className="text-ink-400 text-xs mt-1">
                      Latvija, Lietuva vai Igaunija — papildu informācija viesnīcas rezervācijai
                    </p>
                  </div>
                </label>

                {/* Conditional fields */}
                {isBaltic && (
                  <div className="mt-5 pt-5 border-t border-ink-700 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Vārds Uzvārds *</label>
                      <input
                        name="fullName"
                        required={isBaltic}
                        className="form-input"
                        placeholder="Jānis Bērziņš"
                      />
                    </div>
                    <div>
                      <label className="form-label">Personas kods *</label>
                      <input
                        name="personalCode"
                        required={isBaltic}
                        className="form-input"
                        placeholder="XXXXXX-XXXXX"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Consent */}
              <div>
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="relative mt-0.5 shrink-0">
                    <input
                      name="consent"
                      type="checkbox"
                      required
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 border border-ink-600 peer-checked:bg-acid peer-checked:border-acid transition-all" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100">
                      <svg className="w-3 h-3 text-ink-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-ink-400 text-xs leading-relaxed group-hover:text-ink-300 transition-colors">
                    Apliecinu, ka esmu iepazinies ar konkursa nolikumu un piekrītu, ka festivāla
                    laikā radītais darbs un tā dokumentācija var tikt izmantota publicitātes
                    vajadzībām. *
                  </p>
                </label>
              </div>

              {/* Error */}
              {status === 'error' && (
                <div className="border border-rust/40 bg-rust/5 px-4 py-3">
                  <p className="font-mono text-xs text-rust">{errorMsg}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-acid text-ink-900 font-mono text-sm uppercase tracking-widest
                  py-5 hover:bg-acid-dark active:scale-[0.99]
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-200 font-bold"
              >
                {status === 'loading' ? 'Nosūta...' : 'Iesniegt pieteikumu →'}
              </button>

              <p className="text-ink-600 text-xs font-mono text-center">
                Jautājumi: rowbaltics@gmail.com
              </p>
            </form>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}
