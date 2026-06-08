import type { Lang } from '@/i18n'
import Link from 'next/link'

interface Props {
  params: Promise<{ lang: string }>
}

const content: Record<string, {
  title: string
  subtitle: string
  back: string
  sections: { heading: string; items: string[] }[]
  prizes_title: string
  prizes: { place: string; reward: string }[]
  contact_title: string
  contact_body: string
}> = {
  lv: {
    title: 'Konkursa nolikums',
    subtitle: 'ROW BALTICS 2026 · Sarkandaugava, Rīga · 22. augusts',
    back: '← Atpakaļ',
    sections: [
      {
        heading: '1. Konkursa mērķis',
        items: [
          'ROW BALTICS ir ielu mākslas festivāls, kas pulcē talantīgus māksliniekus no Latvijas, Lietuvas un Igaunijas.',
          'Konkursa mērķis ir radīt augstas kvalitātes sienas gleznojumus Sarkandaugavas rajonā, Rīgā.',
          'Konkursa tēma 2026. gadā: CĪŅA.',
        ],
      },
      {
        heading: '2. Dalībnieki',
        items: [
          'Konkursam var pieteikties jebkurš mākslinieks vai mākslinieku kolektīvs.',
          'Dalībnieks vai viens no kolektīva dalībniekiem ir sasniedzis 18 gadu vecumu.',
          'Dalībniekam jāiesniedz portfolio ar pēdējo 2 gadu darbiem.',
        ],
      },
      {
        heading: '3. Pieteikšanās',
        items: [
          'Pieteikšanās notiek caur vietni rowbaltics.com līdz 2026. gada 28. jūnijam plkst. 23:59.',
          'Pieteikumā jāiekļauj: vārds/pseidonīms, e-pasts, tālrunis, portfolio (faili vai saite), Instagram/Facebook profils.',
          'Katrs pretendents var iesniegt tikai vienu pieteikumu.',
        ],
      },
      {
        heading: '4. Atlase',
        items: [
          'Konkursam tiks apstiprināti 30 dalībnieki.',
          'Apstiprināto dalībnieku saraksts tiks publicēts 2026. gada 30. jūnijā vietnē rowbaltics.com.',
          'Atlases kritēriji: mākslinieciskā kvalitāte, pieredze, stila oriģinalitāte.',
          'Organizatoru lēmums ir galīgs.',
        ],
      },
      {
        heading: '5. Darba realizācija',
        items: [
          'Darbu realizācija notiks 2026. gada 22. augustā Sarkandaugavā, Zāģeru ielā.',
          'Konkursa norises laiks: plkst. 10:00–17:00.',
          'Darba laukuma izmērs: 2.8m × 4.1m.',
          'Organizatori nodrošina sienas sagatavošanu (grunts krāsu).',
          'Dalībnieki izmanto savas krāsas un materiālus.',
        ],
      },
      {
        heading: '6. Tēma un nosacījumi',
        items: [
          'Darbu tēma: CĪŅA. Interpretācija ir brīva.',
          'Darbam jāatbilst sabiedriskās morāles normām.',
          'Aizliegts izmantot politiskas, rasiskas vai diskriminējošas simbolikas.',
          'Darbs jāizveido patstāvīgi bez mehāniskām palīgierīcēm.',
        ],
      },
      {
        heading: '7. Balsojums un rezultāti',
        items: [
          'Festivāla noslēgumā visi 30 dalībnieki piedalīsies savstarpējā balsojumā.',
          'Katrs dalībnieks balso par 3 labākajiem darbiem (nevar balsot par savu).',
          'Uzvarētājus nosauc 3 labāko darbu autori pēc balsojuma rezultātiem.',
        ],
      },
      {
        heading: '8. Intelektuālais īpašums',
        items: [
          'Dalībnieki saglabā tiesības uz saviem darbiem.',
          'Piedaloties konkursā, dalībnieks piekrīt, ka festivāla dokumentācija (foto, video) var tikt izmantota ROW BALTICS publicitātes nolūkos.',
          'Organizatori apņemas norādīt autoru vārdus publiskajos materiālos.',
        ],
      },
      {
        heading: '9. Personas dati',
        items: [
          'Pieteikumā iesniegtie personas dati tiks apstrādāti saskaņā ar ROW BALTICS Privātuma politiku.',
          'Dati tiek izmantoti tikai konkursa organizēšanai un saziņai ar dalībniekiem.',
          'Sīkāka informācija: rowbaltics.com/lv/privacy',
        ],
      },
    ],
    prizes_title: 'Balvas',
    prizes: [
      { place: '1. vieta', reward: '100 krāsu baloniņi' },
      { place: '2. vieta', reward: '50 krāsu baloniņi' },
      { place: '3. vieta', reward: '25 krāsu baloniņi' },
    ],
    contact_title: 'Jautājumi',
    contact_body: 'Jautājumu gadījumā rakstiet: info@rowbaltics.com',
  },
  en: {
    title: 'Competition Rules',
    subtitle: 'ROW BALTICS 2026 · Sarkandaugava, Riga · 22 August',
    back: '← Back',
    sections: [
      {
        heading: '1. Purpose',
        items: [
          'ROW BALTICS is a street art festival bringing together talented artists from Latvia, Lithuania and Estonia.',
          'The competition aims to create high-quality wall murals in the Sarkandaugava district of Riga.',
          'The 2026 competition theme is: BATTLE.',
        ],
      },
      {
        heading: '2. Participants',
        items: [
          'Any artist or artistic collective may apply.',
          'The applicant or at least one collective member must be 18 years of age or older.',
          'Each applicant must submit a portfolio of work from the last 2 years.',
        ],
      },
      {
        heading: '3. Application',
        items: [
          'Applications are submitted via rowbaltics.com by 28 June 2026 at 23:59.',
          'The application must include: name/pseudonym, email, phone, portfolio (files or link), Instagram/Facebook profile.',
          'Each applicant may submit only one application.',
        ],
      },
      {
        heading: '4. Selection',
        items: [
          '30 participants will be confirmed for the competition.',
          'The list of confirmed participants will be published on 30 June 2026 at rowbaltics.com.',
          'Selection criteria: artistic quality, experience, and originality of style.',
          'The organisers\' decision is final.',
        ],
      },
      {
        heading: '5. Execution',
        items: [
          'Works will be created on 22 August 2026 in Sarkandaugava, Zāģeru Street.',
          'Competition hours: 10:00–17:00.',
          'Wall size: 2.8m × 4.1m.',
          'Organisers provide wall preparation (primer).',
          'Participants use their own paints and materials.',
        ],
      },
      {
        heading: '6. Theme and conditions',
        items: [
          'Theme: BATTLE. Interpretation is free.',
          'Works must comply with public morality standards.',
          'Political, racist or discriminatory imagery is prohibited.',
          'Works must be created independently without mechanical aids.',
        ],
      },
      {
        heading: '7. Voting and results',
        items: [
          'At the end of the festival, all 30 participants take part in a peer vote.',
          'Each participant votes for 3 best works (cannot vote for their own).',
          'Winners are the 3 artists with the most votes.',
        ],
      },
      {
        heading: '8. Intellectual property',
        items: [
          'Participants retain rights to their works.',
          'By participating, the artist agrees that festival documentation (photos, video) may be used for ROW BALTICS publicity.',
          'Organisers will credit artists by name in public materials.',
        ],
      },
      {
        heading: '9. Personal data',
        items: [
          'Personal data submitted in the application will be processed in accordance with the ROW BALTICS Privacy Policy.',
          'Data is used solely for organising the competition and communicating with participants.',
          'More information: rowbaltics.com/en/privacy',
        ],
      },
    ],
    prizes_title: 'Prizes',
    prizes: [
      { place: '1st place', reward: '100 paint cans' },
      { place: '2nd place', reward: '50 paint cans' },
      { place: '3rd place', reward: '25 paint cans' },
    ],
    contact_title: 'Questions',
    contact_body: 'For any questions: info@rowbaltics.com',
  },
  lt: {
    title: 'Konkurso taisyklės',
    subtitle: 'ROW BALTICS 2026 · Sarkandaugava, Ryga · rugpjūčio 22 d.',
    back: '← Atgal',
    sections: [
      {
        heading: '1. Tikslas',
        items: [
          'ROW BALTICS yra gatvės meno festivalis, telkiantis talentingus menininkus iš Latvijos, Lietuvos ir Estijos.',
          'Konkurso tikslas – sukurti aukštos kokybės sienų piešinius Sarkandaugavos rajone, Rygoje.',
          'BATTLE yra 2026 m. konkurso tema.',
        ],
      },
      {
        heading: '2. Dalyviai',
        items: [
          'Gali dalyvauti bet kuris menininkas ar menininkų kolektyvas.',
          'Pareiškėjas arba bent vienas kolektyvo narys turi būti sulaukęs 18 metų.',
          'Reikia pateikti paskutinių 2 metų darbų portfolio.',
        ],
      },
      {
        heading: '3. Registracija',
        items: [
          'Paraiškos teikiamos per rowbaltics.com iki 2026 m. birželio 28 d. 23:59.',
          'Paraiška turi apimti: vardą/slapyvardį, el. paštą, telefoną, portfolio (failai arba nuoroda), Instagram/Facebook profilį.',
          'Kiekvienas dalyvis gali pateikti tik vieną paraišką.',
        ],
      },
      {
        heading: '4. Atranka',
        items: [
          'Konkursui bus patvirtinti 30 dalyvių.',
          'Patvirtintų dalyvių sąrašas bus paskelbtas 2026 m. birželio 30 d. svetainėje rowbaltics.com.',
          'Atrankos kriterijai: meninė kokybė, patirtis, stiliaus originalumas.',
          'Organizatorių sprendimas yra galutinis.',
        ],
      },
      {
        heading: '5. Darbų kūrimas',
        items: [
          'Darbai bus kuriami 2026 m. rugpjūčio 22 d. Sarkandaugavoje, Zāģeru gatvėje.',
          'Konkurso laikas: 10:00–17:00.',
          'Sienos dydis: 2,8m × 4,1m.',
          'Organizatoriai paruošia sieną (gruntas).',
          'Dalyviai naudoja savo dažus ir medžiagas.',
        ],
      },
      {
        heading: '6. Tema ir sąlygos',
        items: [
          'Tema: KOVA. Interpretacija laisva.',
          'Darbai turi atitikti visuomenės moralės normas.',
          'Draudžiama naudoti politinę, rasistinę ar diskriminuojančią simboliką.',
          'Darbai turi būti kuriami savarankiškai.',
        ],
      },
      {
        heading: '7. Balsavimas ir rezultatai',
        items: [
          'Festivalio pabaigoje visi 30 dalyvių dalyvauja tarpusavio balsavime.',
          'Kiekvienas dalyvis balsuoja už 3 geriausius darbus (negali balsuoti už savo).',
          'Nugalėtojai – 3 menininkai, surinkę daugiausiai balsų.',
        ],
      },
      {
        heading: '8. Intelektinė nuosavybė',
        items: [
          'Dalyviai išlaiko teises į savo darbus.',
          'Dalyvaudamas, menininkas sutinka, kad festivalio dokumentacija gali būti naudojama ROW BALTICS viešinimo tikslais.',
          'Organizatoriai įsipareigoja nurodyti autorių vardus viešuose materiuose.',
        ],
      },
      {
        heading: '9. Asmens duomenys',
        items: [
          'Paraiškoje pateikti asmens duomenys bus tvarkomi pagal ROW BALTICS privatumo politiką.',
          'Duomenys naudojami tik konkurso organizavimui ir komunikacijai su dalyviais.',
          'Daugiau informacijos: rowbaltics.com/lt/privacy',
        ],
      },
    ],
    prizes_title: 'Prizai',
    prizes: [
      { place: '1 vieta', reward: '100 dažų balionėlių' },
      { place: '2 vieta', reward: '50 dažų balionėlių' },
      { place: '3 vieta', reward: '25 dažų balionėliai' },
    ],
    contact_title: 'Klausimai',
    contact_body: 'Klausimais: info@rowbaltics.com',
  },
  ee: {
    title: 'Konkursi tingimused',
    subtitle: 'ROW BALTICS 2026 · Sarkandaugava, Riia · 22. august',
    back: '← Tagasi',
    sections: [
      {
        heading: '1. Eesmärk',
        items: [
          'ROW BALTICS on tänavakunstifestival, mis koondab andekaid kunstnikke Lätist, Leedust ja Eestist.',
          'Konkursi eesmärk on luua kõrge kvaliteediga seinamaale Sarkandaugava linnaosas Riias.',
          'LAHING on 2026. aasta konkursi teema.',
        ],
      },
      {
        heading: '2. Osalejad',
        items: [
          'Osaleda võib iga kunstnik või kunstnike kollektiiv.',
          'Taotleja või vähemalt üks kollektiivi liige peab olema 18-aastane.',
          'Tuleb esitada viimase 2 aasta tööde portfoolio.',
        ],
      },
      {
        heading: '3. Registreerimine',
        items: [
          'Avaldused esitatakse rowbaltics.com kaudu 28. juuniks 2026 kell 23:59.',
          'Avaldus peab sisaldama: nime/pseudonüümi, e-posti, telefoni, portfooliot (failid või link), Instagrami/Facebooki profiili.',
          'Iga taotleja võib esitada ainult ühe avalduse.',
        ],
      },
      {
        heading: '4. Valik',
        items: [
          'Konkursile kinnitatakse 30 osalejat.',
          'Kinnitatud osalejate nimekiri avaldatakse 30. juunil 2026 veebilehel rowbaltics.com.',
          'Valikukriteeriumid: kunstiline kvaliteet, kogemus, stiili originaalsus.',
          'Korraldajate otsus on lõplik.',
        ],
      },
      {
        heading: '5. Teoste loomine',
        items: [
          'Teosed luuakse 22. augustil 2026 Sarkandaugavas, Zāģeru tänaval.',
          'Konkursi kellaaeg: 10:00–17:00.',
          'Seina suurus: 2,8m × 4,1m.',
          'Korraldajad valmistavad seina ette (krunt).',
          'Osalejad kasutavad oma värve ja materjale.',
        ],
      },
      {
        heading: '6. Teema ja tingimused',
        items: [
          'Teema: LAHING. Tõlgendus on vaba.',
          'Teos peab vastama avaliku moraali normidele.',
          'Poliitilise, rassistliku või diskrimineeriva sümbolika kasutamine on keelatud.',
          'Teosed peavad olema loodud iseseisvalt.',
        ],
      },
      {
        heading: '7. Hääletamine ja tulemused',
        items: [
          'Festivali lõpus osalevad kõik 30 osalejat vastastikuses hääletuses.',
          'Iga osaleja hääletab 3 parima töö poolt (enda töö eest hääletada ei saa).',
          'Võitjad on 3 kunstnikku, kes kogusid enim hääli.',
        ],
      },
      {
        heading: '8. Intellektuaalne omand',
        items: [
          'Osalejad säilitavad õigused oma teostele.',
          'Osaledes nõustub kunstnik, et festivali dokumentatsiooni võib kasutada ROW BALTICS avalikkussuhtluses.',
          'Korraldajad kohustuvad avalikes materjalides autorite nimesid märkima.',
        ],
      },
      {
        heading: '9. Isikuandmed',
        items: [
          'Avalduses esitatud isikuandmeid töödeldakse vastavalt ROW BALTICS privaatsuspoliitikale.',
          'Andmeid kasutatakse ainult konkursi korraldamiseks ja osalejatega suhtlemiseks.',
          'Lisateave: rowbaltics.com/ee/privacy',
        ],
      },
    ],
    prizes_title: 'Auhinnad',
    prizes: [
      { place: '1. koht', reward: '100 värvipurki' },
      { place: '2. koht', reward: '50 värvipurki' },
      { place: '3. koht', reward: '25 värvipurki' },
    ],
    contact_title: 'Küsimused',
    contact_body: 'Küsimuste korral: info@rowbaltics.com',
  },
}

export default async function RulesPage({ params }: Props) {
  const { lang: rawLang } = await params
  const lang = (['lv', 'en', 'lt', 'ee'].includes(rawLang) ? rawLang : 'lv') as Lang
  const t = content[lang] ?? content.lv

  return (
    <main className="min-h-screen bg-white text-ink-900">
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-16">
        {/* Back link */}
        <Link
          href={`/${lang}#registracija`}
          className="font-mono text-xs uppercase tracking-widest text-acid hover:text-acid-dark transition-colors mb-10 inline-block"
        >
          {t.back}
        </Link>

        {/* Title */}
        <h1 className="font-display text-5xl md:text-6xl text-ink-900 mb-2">{t.title}</h1>
        <p className="font-mono text-xs text-gray-400 mb-12">{t.subtitle}</p>

        {/* Sections */}
        <div className="space-y-10">
          {t.sections.map((section) => (
            <div key={section.heading} className="border-t border-gray-200 pt-8">
              <h2 className="font-display text-xl text-acid mb-4">{section.heading}</h2>
              <ul className="space-y-2">
                {section.items.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                    <span className="text-acid shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Prizes */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="font-display text-xl text-acid mb-6">{t.prizes_title}</h2>
          <div className="space-y-3">
            {t.prizes.map((p) => (
              <div key={p.place} className="flex items-center gap-4">
                <span className="font-display text-2xl text-acid w-24 shrink-0">{p.place}</span>
                <div className="flex-1 h-px bg-ink-700" />
                <span className="font-mono text-sm text-ink-200">{p.reward}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="font-display text-xl text-acid mb-3">{t.contact_title}</h2>
          <p className="text-gray-600 text-sm">
            {t.contact_body.split('info@rowbaltics.com')[0]}
            <a href="mailto:info@rowbaltics.com" className="text-acid hover:underline">
              info@rowbaltics.com
            </a>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="font-mono text-xs text-gray-400">
            © 2026 ROW BALTICS ·{' '}
            <Link href={`/${lang}/privacy`} className="text-acid hover:underline">
              {lang === 'lv' ? 'Privātuma politika' : lang === 'lt' ? 'Privatumo politika' : lang === 'ee' ? 'Privaatsuspoliitika' : 'Privacy Policy'}
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
