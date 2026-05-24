import type { Lang, Dict } from './types'
import lv from './lv'
import en from './en'
import lt from './lt'
import ee from './ee'

const dictionaries: Record<Lang, Dict> = { lv, en, lt, ee }

export function getDictionary(lang: Lang): Dict {
  return dictionaries[lang] ?? dictionaries.lv
}

export const languages: { code: Lang; label: string }[] = [
  { code: 'lv', label: 'LV' },
  { code: 'en', label: 'EN' },
  { code: 'lt', label: 'LT' },
  { code: 'ee', label: 'EE' },
]

export type { Lang, Dict }
