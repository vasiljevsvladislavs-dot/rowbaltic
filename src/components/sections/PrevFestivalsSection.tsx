import AnimateIn from '@/components/ui/AnimateIn'
import PhotoCollage from '@/components/ui/PhotoCollage'
import type { Dict } from '@/i18n'

const images = [
  { src: '/collage2/photo-05.jpg', alt: 'ROW BALTICS 2025' },
  { src: '/collage2/photo-06.jpg', alt: 'Urban art Riga' },
  { src: '/collage2/photo-07.jpg', alt: 'Street art festival' },
  { src: '/collage2/photo-08.jpg', alt: 'ROW BALTICS artists' },
  { src: '/collage2/photo-09.jpg', alt: 'Sarkandaugava festival' },
  { src: '/collage2/photo-10.jpg', alt: 'ROW BALTICS graffiti' },
  { src: '/collage2/photo-11.jpg', alt: 'Street art Riga' },
  { src: '/collage2/photo-12.jpg', alt: 'ROW BALTICS 2025 battle' },
]

interface Props {
  dict: Dict
}

export default function PrevFestivalsSection({ dict }: Props) {
  const f = dict.festival

  return (
    <section id="iepriekshejie" className="bg-white border-t border-gray-200">
      <div className="section-pad px-6 md:px-12 max-w-7xl mx-auto">
        <AnimateIn>
          <h3 className="font-display text-3xl md:text-4xl text-gray-700 mb-10">
            {f.collage_heading}
          </h3>
        </AnimateIn>
        <AnimateIn delay={150}>
          <PhotoCollage images={images} variant="masonry" />
        </AnimateIn>
      </div>
    </section>
  )
}
