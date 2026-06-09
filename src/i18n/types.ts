export type Lang = 'lv' | 'en' | 'lt' | 'ee'

export interface Dict {
  meta: {
    title: string
    description: string
  }
  nav: {
    about: string
    festival: string
    competition: string
    register: string
  }
  hero: {
    tag: string
    festival_label: string
    theme_word: string
    theme_label: string
    vieta_label: string
    vieta_value: string
    deadline_label: string
    deadline_value: string
    organize_label: string
    organize_value: string
    atbalsta_label: string
    atbalsta_value: string
    register_cta: string
    marquee: string
  }
  about: {
    num: string
    label: string
    heading: [string, string, string]
    p1: string
    p2: string
    p3: string
    stats: [
      { num: string; label: string },
      { num: string; label: string },
      { num: string; label: string },
    ]
  }
  festival: {
    num: string
    label: string
    support: string
    theme_sublabel: string
    p1: string
    p2: string
    p3: string
    collage_heading: string
    marquee: string
  }
  competition: {
    num: string
    label: string
    heading: [string, string]
    p1: string
    p2: string
    theme_label: string
    theme_desc: string
    wall_label: string
    participants_label: string
    rules: [
      { num: string; title: string; text: string },
      { num: string; title: string; text: string },
      { num: string; title: string; text: string },
      { num: string; title: string; text: string },
    ]
    prizes_label: string
    prizes: [
      { place: string; reward: string; color: string },
      { place: string; reward: string; color: string },
      { place: string; reward: string; color: string },
    ]
    contact_label: string
    copyright_label: string
    copyright_text: string
  }
  registration: {
    num: string
    label: string
    heading: string
    p1: string
    info: [
      { label: string; value: string },
      { label: string; value: string },
      { label: string; value: string },
      { label: string; value: string },
      { label: string; value: string },
    ]
    f_nickname: string
    f_nickname_ph: string
    f_phone: string
    f_phone_ph: string
    f_email: string
    f_email_ph: string
    f_portfolio_url: string
    f_social_url: string
    f_file: string
    f_file_hint: string
    f_file_selected: string
    f_file_or: string
    f_wall_size: string
    f_wall_default: string
    f_shirt: string
    f_shirt_default: string
    f_accommodation_label: string
    f_accommodation_desc: string
    f_night1: string
    f_night2: string
    f_consent: string
    f_consent_rules_link: string
    f_gdpr: string
    f_gdpr_link: string
    f_submit: string
    f_submitting: string
    wall_sizes: [string, string, string]
    success_title: string
    success_text: string
    success_btn: string
    contact_label: string
    error_label: string
  }
  footer: {
    tagline: string
    nav_label: string
    contact_label: string
    email_label: string
    festival_label: string
    festival_date: string
    festival_place: string
    organizer_label: string
    organizer_name: string
    organizer_org: string
    copyright: string
    support: string
  }
}
