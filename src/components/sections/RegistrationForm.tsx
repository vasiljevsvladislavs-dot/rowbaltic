'use client'

import { useState, useRef } from 'react'
import AnimateIn from '@/components/ui/AnimateIn'
import type { Dict, Lang } from '@/i18n'

const SHIRT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const MAX_FILES = 5
const MAX_SIZE_MB = 25

interface Props {
  dict: Dict
  lang: Lang
}

export default function RegistrationForm({ dict, lang }: Props) {
  const r = dict.registration
  const [needsAccommodation, setNeedsAccommodation] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    const valid = files.filter((f) => f.size <= MAX_SIZE_MB * 1024 * 1024).slice(0, MAX_FILES)
    setSelectedFiles(valid)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const form = e.currentTarget
    const fd = new FormData(form)

    // Append language
    fd.set('language', lang)

    // Append files under correct field name
    fd.delete('portfolioFiles')
    for (const file of selectedFiles) {
      fd.append('portfolioFiles', file)
    }

    try {
      const res = await fetch('/api/register', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || r.error_label)
      setStatus('success')
      form.reset()
      setNeedsAccommodation(false)
      setSelectedFiles([])
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : r.error_label)
    }
  }

  if (status === 'success') {
    return (
      <section id="registracija" className="section-pad bg-white border-t border-gray-200">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="border border-acid/30 bg-acid/5 p-16">
            <div className="font-display text-7xl text-acid mb-6">✓</div>
            <h3 className="font-display text-4xl text-ink-900 mb-4">{r.success_title}</h3>
            <p className="text-gray-600 font-mono text-sm">{r.success_text}</p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-8 font-mono text-xs uppercase tracking-widest text-acid border border-acid/40 px-6 py-3 hover:bg-acid hover:text-ink-900 transition-all"
            >
              {r.success_btn}
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="registracija" className="section-pad bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <AnimateIn>
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-acid">{r.num}</span>
            <div className="w-12 h-px bg-acid" />
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gray-500">{r.label}</span>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: intro */}
          <div className="lg:col-span-4">
            <AnimateIn delay={100}>
              <h2 className="font-display text-[clamp(1.4rem,3vw,3.2rem)] leading-tight text-ink-900 mb-8">
                {r.heading.split(' ').map((word, i, arr) =>
                  i === arr.length - 1
                    ? <span key={i} className="text-acid"> {word}</span>
                    : <span key={i}>{i > 0 ? ' ' : ''}{word}</span>
                )}
              </h2>
            </AnimateIn>
            <AnimateIn delay={200}>
              <p className="text-gray-600 leading-relaxed mb-8">{r.p1}</p>
            </AnimateIn>
          </div>

          {/* Right: form */}
          <AnimateIn direction="left" delay={150} className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Honeypot — hidden from real users */}
              <input
                name="honeypot"
                type="text"
                autoComplete="off"
                tabIndex={-1}
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0 }}
              />

              {/* Row 1: name + phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">{r.f_nickname}</label>
                  <input name="name" required className="form-input" placeholder={r.f_nickname_ph} />
                </div>
                <div>
                  <label className="form-label">{r.f_phone}</label>
                  <input name="phone" type="tel" required className="form-input" placeholder={r.f_phone_ph} />
                </div>
              </div>

              {/* Row 2: email */}
              <div>
                <label className="form-label">{r.f_email}</label>
                <input name="email" type="email" required className="form-input" placeholder={r.f_email_ph} />
              </div>

              {/* Portfolio upload */}
              <div className="border border-gray-200 p-5 space-y-3">
                <div>
                  <label className="form-label mb-1">{r.f_file}</label>
                  <p className="font-mono text-[10px] text-gray-400 mb-3">{r.f_file_hint}</p>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="font-mono text-xs uppercase tracking-widest border border-ink-600 px-5 py-2.5 text-gray-600 hover:border-acid hover:text-acid transition-all duration-200"
                  >
                    {selectedFiles.length > 0
                      ? r.f_file_selected.replace('{n}', String(selectedFiles.length))
                      : r.f_file}
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.webp,.zip"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {/* File list */}
                  {selectedFiles.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {selectedFiles.map((f, i) => (
                        <li key={i} className="flex items-center justify-between">
                          <span className="font-mono text-[11px] text-gray-600 truncate max-w-xs">{f.name}</span>
                          <span className="font-mono text-[10px] text-gray-400 ml-3 shrink-0">
                            {(f.size / 1024 / 1024).toFixed(1)} MB
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Portfolio link — alternative */}
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-gray-400 block mb-1.5">
                    {r.f_portfolio_url} <span className="normal-case text-gray-400">— {r.f_file_or}</span>
                  </label>
                  <input name="portfolioLink" type="url" className="form-input" placeholder="https://..." />
                </div>
              </div>

              {/* Social link */}
              <div>
                <label className="form-label">{r.f_social_url} *</label>
                <input name="socialLink" type="url" required className="form-input" placeholder="https://instagram.com/..." />
              </div>

              {/* Shirt size */}
              <div>
                <label className="form-label">{r.f_shirt}</label>
                <select name="shirtSize" required className="form-input">
                  <option value="">{r.f_shirt_default}</option>
                  {SHIRT_SIZES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Accommodation toggle */}
              <div className="border border-gray-200 p-5">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="relative mt-0.5 shrink-0">
                    <input
                      name="needsAccommodation"
                      type="checkbox"
                      value="true"
                      checked={needsAccommodation}
                      onChange={(e) => setNeedsAccommodation(e.target.checked)}
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
                    <p className="font-mono text-xs uppercase tracking-widest text-ink-900 group-hover:text-acid transition-colors">
                      {r.f_accommodation_label}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">{r.f_accommodation_desc}</p>
                  </div>
                </label>

                {needsAccommodation && (
                  <div className="mt-5 pt-5 border-t border-gray-200 space-y-3">
                    {/* Night 1 */}
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative shrink-0">
                        <input
                          name="night1"
                          type="checkbox"
                          value="true"
                          className="sr-only peer"
                        />
                        <div className="w-5 h-5 border border-ink-600 peer-checked:bg-acid peer-checked:border-acid transition-all" />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100">
                          <svg className="w-3 h-3 text-ink-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <span className="font-mono text-xs text-gray-600 group-hover:text-ink-900 transition-colors">
                        {r.f_night1}
                      </span>
                    </label>

                    {/* Night 2 */}
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative shrink-0">
                        <input
                          name="night2"
                          type="checkbox"
                          value="true"
                          className="sr-only peer"
                        />
                        <div className="w-5 h-5 border border-ink-600 peer-checked:bg-acid peer-checked:border-acid transition-all" />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100">
                          <svg className="w-3 h-3 text-ink-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <span className="font-mono text-xs text-gray-600 group-hover:text-ink-900 transition-colors">
                        {r.f_night2}
                      </span>
                    </label>
                  </div>
                )}
              </div>

              {/* Rules consent */}
              <div>
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="relative mt-0.5 shrink-0">
                    <input name="consent" type="checkbox" value="true" required className="sr-only peer" />
                    <div className="w-5 h-5 border border-ink-600 peer-checked:bg-acid peer-checked:border-acid transition-all" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100">
                      <svg className="w-3 h-3 text-ink-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed group-hover:text-gray-600 transition-colors">
                    {r.f_consent}{' '}
                    <a
                      href={`/${lang}/rules`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-acid underline hover:text-acid-dark"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {r.f_consent_rules_link}
                    </a>
                  </p>
                </label>
              </div>

              {/* GDPR consent */}
              <div>
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="relative mt-0.5 shrink-0">
                    <input name="gdprConsent" type="checkbox" value="true" required className="sr-only peer" />
                    <div className="w-5 h-5 border border-ink-600 peer-checked:bg-acid peer-checked:border-acid transition-all" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100">
                      <svg className="w-3 h-3 text-ink-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed group-hover:text-gray-600 transition-colors">
                    {r.f_gdpr}{' '}
                    <a
                      href={`/${lang}/privacy`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-acid underline hover:text-acid-dark"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {r.f_gdpr_link}
                    </a>
                  </p>
                </label>
              </div>

              {/* Error */}
              {status === 'error' && (
                <div className="border border-rust/40 bg-rust/5 px-4 py-3">
                  <p className="font-mono text-xs text-rust">{errorMsg || r.error_label}</p>
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
                {status === 'loading' ? r.f_submitting : r.f_submit}
              </button>

              <p className="text-gray-400 text-xs font-mono text-center">{r.contact_label}</p>
            </form>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}
