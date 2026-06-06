import type { Lang } from '@/i18n'
import Link from 'next/link'

interface Props {
  params: Promise<{ lang: string }>
}

const content: Record<string, {
  title: string
  updated: string
  sections: { heading: string; body: string }[]
  back: string
}> = {
  lv: {
    title: 'Privātuma politika',
    updated: 'Pēdējo reizi atjaunināta: 2026. gada 1. jūnijā',
    back: '← Atpakaļ',
    sections: [
      {
        heading: '1. Pārzinis',
        body: 'Personas datu pārzinis ir ROW BALTICS festivāla organizators. Kontakts jautājumiem par personas datiem: info@rowbaltics.com.',
      },
      {
        heading: '2. Kādi dati tiek vākti',
        body: 'Reģistrācijas veidlapā mēs vācam: vārdu vai pseidonīmu, tālruņa numuru, e-pasta adresi, Instagram/Facebook profila saiti, krekla izmēru, nakšņošanas preferences (nav obligāti), portfolio failus vai saiti uz portfolio, kā arī piekrišanas apstiprinājumus. Tehniski tiek saglabāts arī iesniegšanas laiks un formas valoda.',
      },
      {
        heading: '3. Kāpēc tiek vākti dati',
        body: 'Dati tiek vākti, lai: (1) izskatītu pieteikumu dalībai ROW BALTICS 2026 festivālā; (2) sazinātos ar pieteicēju par pieteikuma statusu; (3) organizētu dalībnieka dalību festivālā, tostarp nakšņošanu; (4) nosūtītu festivāla organizatoriskas ziņas.',
      },
      {
        heading: '4. Kur dati tiek glabāti',
        body: 'Dati tiek saglabāti Google Sheets (Google LLC, ASV) un nosūtīti uz e-pastu info@rowbaltics.com. Portfolio faili tiek augšupielādēti Google Drive (Google LLC, ASV). Visi Google pakalpojumi atbilst GDPR prasībām saskaņā ar standarta līguma klauzulām.',
      },
      {
        heading: '5. Kam dati tiek nodoti',
        body: 'Dati netiek pārdoti trešajām pusēm. Dati ir pieejami tikai ROW BALTICS organizatoriem. Google kā datu apstrādātājs piekļūst datiem tikai pakalpojumu sniegšanas nolūkā.',
      },
      {
        heading: '6. Glabāšanas termiņš',
        body: 'Dati tiek glabāti 12 mēnešus pēc festivāla. Pēc šī termiņa dati tiek dzēsti vai anonimizēti, ja vien to saglabāšanai nav cita juridiska pamata.',
      },
      {
        heading: '7. Jūsu tiesības',
        body: 'Saskaņā ar GDPR jums ir tiesības: piekļūt saviem datiem; labot neprecīzus datus; dzēst savus datus ("tiesības tikt aizmirstam"); ierobežot apstrādi; iebilst pret apstrādi; datu pārnesamība. Lai īstenotu savas tiesības, sazinieties: info@rowbaltics.com. Jums ir arī tiesības iesniegt sūdzību Datu valsts inspekcijā (www.dvi.gov.lv).',
      },
      {
        heading: '8. Piekrišanas atsaukšana',
        body: 'Jūs varat jebkurā laikā atsaukt savu piekrišanu personas datu apstrādei, rakstot uz info@rowbaltics.com. Piekrišanas atsaukšana neietekmē apstrādes likumību pirms atsaukšanas.',
      },
      {
        heading: '9. Kontakts',
        body: 'Jautājumu gadījumā par personas datu apstrādi: info@rowbaltics.com',
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    updated: 'Last updated: 1 June 2026',
    back: '← Back',
    sections: [
      {
        heading: '1. Data Controller',
        body: 'The data controller is the organiser of the ROW BALTICS festival. For data protection enquiries: info@rowbaltics.com.',
      },
      {
        heading: '2. What data we collect',
        body: 'Through the registration form we collect: name or pseudonym, phone number, email address, Instagram/Facebook profile link, t-shirt size, accommodation preferences (optional), portfolio files or a portfolio link, and consent confirmations. The submission timestamp and form language are also stored technically.',
      },
      {
        heading: '3. Why we collect data',
        body: 'Data is collected to: (1) review your application to participate in ROW BALTICS 2026; (2) contact you regarding the status of your application; (3) organise your participation in the festival, including accommodation; (4) send festival-related organisational communications.',
      },
      {
        heading: '4. Where data is stored',
        body: 'Data is stored in Google Sheets (Google LLC, USA) and sent to info@rowbaltics.com. Portfolio files are uploaded to Google Drive (Google LLC, USA). All Google services comply with GDPR under Standard Contractual Clauses.',
      },
      {
        heading: '5. Who has access to your data',
        body: 'Your data is not sold to third parties. Data is accessible only to ROW BALTICS organisers. Google, as a data processor, accesses data solely for the purpose of providing services.',
      },
      {
        heading: '6. Retention period',
        body: 'Data is retained for 12 months after the festival. After this period, data is deleted or anonymised unless there is another legal basis for retention.',
      },
      {
        heading: '7. Your rights',
        body: 'Under GDPR you have the right to: access your data; rectify inaccurate data; erase your data ("right to be forgotten"); restrict processing; object to processing; data portability. To exercise your rights, contact: info@rowbaltics.com. You also have the right to lodge a complaint with your national supervisory authority.',
      },
      {
        heading: '8. Withdrawal of consent',
        body: 'You may withdraw your consent to the processing of personal data at any time by writing to info@rowbaltics.com. Withdrawal of consent does not affect the lawfulness of processing prior to withdrawal.',
      },
      {
        heading: '9. Contact',
        body: 'For any questions about personal data processing: info@rowbaltics.com',
      },
    ],
  },
  lt: {
    title: 'Privatumo politika',
    updated: 'Paskutinį kartą atnaujinta: 2026 m. birželio 1 d.',
    back: '← Atgal',
    sections: [
      {
        heading: '1. Duomenų valdytojas',
        body: 'Asmens duomenų valdytojas yra ROW BALTICS festivalio organizatorius. Dėl duomenų apsaugos klausimų: info@rowbaltics.com.',
      },
      {
        heading: '2. Kokie duomenys renkami',
        body: 'Registracijos formoje renkame: vardą arba slapyvardį, telefono numerį, el. pašto adresą, Instagram/Facebook profilio nuorodą, marškinėlių dydį, apgyvendinimo pageidavimus (neprivaloma), portfolio failus arba nuorodą į portfolio, bei sutikimų patvirtinimus. Techniškai taip pat išsaugomas pateikimo laikas ir formos kalba.',
      },
      {
        heading: '3. Kodėl renkami duomenys',
        body: 'Duomenys renkami siekiant: (1) išnagrinėti paraišką dalyvauti ROW BALTICS 2026 festivalyje; (2) susisiekti su pareiškėju dėl paraiškos statuso; (3) organizuoti dalyvio dalyvavimą festivalyje, įskaitant apgyvendinimą; (4) siųsti su festivaliu susijusius organizacinius pranešimus.',
      },
      {
        heading: '4. Kur duomenys saugomi',
        body: 'Duomenys saugomi „Google Sheets" (Google LLC, JAV) ir siunčiami į info@rowbaltics.com. Portfolio failai įkeliami į „Google Drive" (Google LLC, JAV). Visi „Google" paslaugos atitinka BDAR reikalavimus pagal standartines sutarčių sąlygas.',
      },
      {
        heading: '5. Kam perduodami duomenys',
        body: 'Duomenys neparduodami trečiosioms šalims. Duomenimis naudojasi tik ROW BALTICS organizatoriai. „Google" kaip duomenų tvarkytojas prieigą prie duomenų turi tik paslaugų teikimo tikslais.',
      },
      {
        heading: '6. Saugojimo terminas',
        body: 'Duomenys saugomi 12 mėnesių po festivalio. Pasibaigus šiam terminui, duomenys ištrinami arba anonimiizuojami, jei nėra kito teisinio pagrindo juos saugoti.',
      },
      {
        heading: '7. Jūsų teisės',
        body: 'Pagal BDAR turite teisę: susipažinti su savo duomenimis; ištaisyti netikslius duomenis; ištrinti savo duomenis; apriboti tvarkymą; nesutikti su tvarkymu; duomenų perkeliamumas. Norėdami pasinaudoti savo teisėmis, susisiekite: info@rowbaltics.com. Taip pat turite teisę pateikti skundą priežiūros institucijai.',
      },
      {
        heading: '8. Sutikimo atšaukimas',
        body: 'Bet kada galite atšaukti savo sutikimą dėl asmens duomenų tvarkymo, parašydami į info@rowbaltics.com. Sutikimo atšaukimas neturi įtakos tvarkymo teisėtumui iki atšaukimo.',
      },
      {
        heading: '9. Kontaktai',
        body: 'Klausimais dėl asmens duomenų tvarkymo: info@rowbaltics.com',
      },
    ],
  },
  ee: {
    title: 'Privaatsuspoliitika',
    updated: 'Viimati uuendatud: 1. juunil 2026',
    back: '← Tagasi',
    sections: [
      {
        heading: '1. Vastutav töötleja',
        body: 'Isikuandmete vastutav töötleja on ROW BALTICS festivali korraldaja. Andmekaitsega seotud päringute jaoks: info@rowbaltics.com.',
      },
      {
        heading: '2. Milliseid andmeid kogume',
        body: 'Registreerimisvormiga kogume: nime või pseudonüümi, telefoninumbri, e-posti aadressi, Instagrami/Facebooki profiililingi, T-särgi suuruse, majutuseelistused (valikuline), portfoolio failid või lingi portfooliosse ning nõusolekute kinnitused. Tehniliselt salvestatakse ka esitamise ajatempel ja vormi keel.',
      },
      {
        heading: '3. Miks andmeid kogume',
        body: 'Andmeid kogutakse, et: (1) vaadata läbi avaldus ROW BALTICS 2026 festivalil osalemiseks; (2) võtta teiega ühendust avalduse staatuse osas; (3) korraldada teie osalemine festivalil, sh majutus; (4) saata festivali organisatsioonilisi teateid.',
      },
      {
        heading: '4. Kus andmeid säilitatakse',
        body: 'Andmeid säilitatakse Google Sheetsis (Google LLC, USA) ja saadetakse aadressile info@rowbaltics.com. Portfoolio failid laaditakse üles Google Drive\'i (Google LLC, USA). Kõik Google\'i teenused vastavad GDPR nõuetele standardlepingu klauslite alusel.',
      },
      {
        heading: '5. Kellel on juurdepääs andmetele',
        body: 'Teie andmeid ei müüda kolmandatele osapooltele. Andmetele on juurdepääs ainult ROW BALTICS korraldajatel. Google kui andmetöötleja pääseb andmetele ligi ainult teenuste osutamise eesmärgil.',
      },
      {
        heading: '6. Säilitamise tähtaeg',
        body: 'Andmeid säilitatakse 12 kuud pärast festivali. Pärast seda perioodi kustutatakse andmed või muudetakse need anonüümseks, kui puudub muu õiguslik alus nende säilitamiseks.',
      },
      {
        heading: '7. Teie õigused',
        body: 'GDPR alusel on teil õigus: pääseda juurde oma andmetele; parandada ebatäpseid andmeid; kustutada oma andmed; piirata töötlemist; esitada vastuväiteid töötlemisele; andmete ülekandmine. Oma õiguste kasutamiseks võtke ühendust: info@rowbaltics.com. Teil on ka õigus esitada kaebus järelevalveasutusele.',
      },
      {
        heading: '8. Nõusoleku tagasivõtmine',
        body: 'Võite isikuandmete töötlemiseks antud nõusoleku igal ajal tagasi võtta, kirjutades aadressile info@rowbaltics.com. Nõusoleku tagasivõtmine ei mõjuta töötlemise seaduslikkust enne tagasivõtmist.',
      },
      {
        heading: '9. Kontakt',
        body: 'Isikuandmete töötlemisega seotud küsimuste korral: info@rowbaltics.com',
      },
    ],
  },
}

export default async function PrivacyPage({ params }: Props) {
  const { lang: rawLang } = await params
  const lang = (['lv', 'en', 'lt', 'ee'].includes(rawLang) ? rawLang : 'lv') as Lang
  const t = content[lang] ?? content.lv

  return (
    <main className="min-h-screen bg-ink-900 text-cream">
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-16">
        {/* Back link */}
        <Link
          href={`/${lang}#registracija`}
          className="font-mono text-xs uppercase tracking-widest text-acid hover:text-acid-dark transition-colors mb-10 inline-block"
        >
          {t.back}
        </Link>

        {/* Title */}
        <h1 className="font-display text-5xl md:text-6xl text-cream mb-4">{t.title}</h1>
        <p className="font-mono text-xs text-ink-500 mb-12">{t.updated}</p>

        {/* Sections */}
        <div className="space-y-10">
          {t.sections.map((section) => (
            <div key={section.heading} className="border-t border-ink-800 pt-8">
              <h2 className="font-display text-xl text-acid mb-3">{section.heading}</h2>
              <p className="text-ink-300 leading-relaxed text-sm">{section.body}</p>
            </div>
          ))}
        </div>

        {/* Contact footer */}
        <div className="mt-16 pt-8 border-t border-ink-800">
          <p className="font-mono text-xs text-ink-500">
            © 2026 ROW BALTICS ·{' '}
            <a href="mailto:info@rowbaltics.com" className="text-acid hover:underline">
              info@rowbaltics.com
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
