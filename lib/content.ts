/**
 * Single source of truth for everything shown on the site.
 *
 * To add a real photograph: put the file in /public/photos and set its `src`
 * (e.g. "/photos/lab74-01.jpg"). Leave `src: null` to show a labeled placeholder.
 * `focus` is a CSS object-position (e.g. "50% 20%") that keeps faces in frame
 * in cropped thumbnails; the lightbox always shows the full, uncropped image.
 */

export type Category =
  | 'Editorial'
  | 'Fashion'
  | 'Runway'
  | 'Commercial'
  | 'Beauty'
  | 'Music Videos'
  | 'Film'

export type Orientation = 'portrait' | 'landscape' | 'square'

export type Photo = {
  id: string
  src: string | null
  alt: string
  orientation: Orientation
  focus?: string
  caption?: string
  photographer?: string
}

export type CreditGroup =
  | 'Runway / Fashion / Commercial'
  | 'Music Video / Film'
  | 'Television'
  | 'Beauty / Brand'

export type Project = {
  slug: string
  title: string
  client: string
  role: string
  date?: string
  status?: string
  creditGroup: CreditGroup
  categories: Category[]
  featuredCredit?: boolean
  collaborators?: { label: string; name: string }[]
  links?: { label: string; href: string }[]
  photos: Photo[]
}

export const profile = {
  name: 'Maria Williams',
  fullName: 'Maria Rosella Williams',
  descriptor: 'Model',
  titles: ['Model', 'Dancer', 'Creative Talent'],
  location: 'Los Angeles, CA',
  email: 'mariarosella.bookings@gmail.com',
  phone: '601-951-9975',
  phoneHref: 'tel:+16019519975',
  travel: 'Available to travel for work',
  bio: [
    'Maria Williams is a Los Angeles-based model, dancer, and creative talent working across fashion, beauty, fragrance, lifestyle, streetwear, runway, branded campaigns, music videos, and on-camera performance.',
    'Her movement background through the USC Kaufman School of Dance brings ease, control, and storytelling to every frame — on set, on the runway, and in front of the camera.',
  ],
  /**
   * Social profiles. Set `href` to the full profile URL and `handle` to the
   * username (e.g. '@mariarosella'). Leave `href: null` to show a placeholder.
   */
  socials: [
    { label: 'Instagram', handle: '@mariaaa_williams', href: 'https://www.instagram.com/mariaaa_williams' },
    { label: 'TikTok', handle: '@rirosella', href: 'https://www.tiktok.com/@rirosella' },
  ] as { label: 'Instagram' | 'TikTok'; handle: string | null; href: string | null }[],
  heroPhoto: {
    id: 'hero',
    src: null,
    alt: 'Portrait of Maria Williams',
    orientation: 'portrait',
    focus: '50% 25%',
  } satisfies Photo as Photo,
  contactPhoto: {
    id: 'contact',
    src: null,
    alt: 'Maria Williams on set',
    orientation: 'portrait',
    focus: '50% 30%',
  } satisfies Photo as Photo,
}

/**
 * Résumé PDFs. To replace a file, drop the new PDF into /public and update `src`
 * (or overwrite the existing file with the same name). Leave `src: null` to show
 * a placeholder with disabled buttons until the PDF is uploaded.
 */
export type Resume = {
  id: string
  tab: string
  heading: string
  /** The two-part display title, e.g. ['Modeling', 'Résumé'] — the second part is italicized. */
  title: [string, string]
  src: string | null
  fileName: string
  orientation?: 'portrait' | 'landscape'
}

export const resumes: Resume[] = [
  {
    id: 'modeling',
    tab: 'Modeling',
    heading: 'Modeling Résumé',
    title: ['Modeling', 'Résumé'],
    src: '/maria-williams-modeling-resume.pdf',
    fileName: 'Maria-Williams-Modeling-Resume.pdf',
  },
  {
    id: 'professional',
    tab: 'Professional',
    heading: 'Professional Résumé',
    title: ['Professional', 'Résumé'],
    src: '/maria-williams-professional-resume.pdf',
    fileName: 'Maria-Williams-Professional-Resume.pdf',
  },
  {
    id: 'comp-card',
    tab: 'Comp Card',
    heading: 'Comp Card',
    title: ['Comp', 'Card'],
    src: '/maria-williams-comp-card.pdf',
    fileName: 'Maria-Williams-Comp-Card.pdf',
    orientation: 'landscape',
  },
]

export const details: { label: string; value: string }[] = [
  { label: 'Height', value: `5'3"` },
  { label: 'Waist', value: '25–26"' },
  { label: 'Dress', value: '2' },
  { label: 'Shoe', value: '5.5' },
  { label: 'Hair', value: 'Dark Brown' },
  { label: 'Eyes', value: 'Dark Brown' },
  { label: 'Age', value: '22' },
  { label: 'Base', value: 'Los Angeles, CA' },
  { label: 'Ethnicity', value: 'African American, White, and Choctaw Native American' },
  { label: 'Travel', value: 'Available to travel for work' },
]

export const skills = [
  'Dance',
  'Runway',
  'Movement direction',
  'Improvisation',
  'Editorial posing',
  'Commercial modeling',
  'On-camera storytelling',
  'Music video performance',
]

export const strengths = [
  'Fashion',
  'Beauty',
  'Fragrance',
  'Streetwear',
  'Lifestyle',
  'Commercial',
  'Runway',
  'Editorial',
  'Music Video',
  'Acting',
  'Movement-Based Work',
  'Brand Storytelling',
  'DJ',
  'Piano',
  'Tennis',
  'Soccer',
  'Basketball',
]

export const training = [
  'University of Southern California — B.S. Computational Neuroscience; Minor in Dance',
  'Dance training through USC Kaufman School of Dance',
  'Film and acting coursework at USC',
]

export const petTalent =
  'Miniature Schnauzer available for pet-friendly shoots: brown, blue eyes, 17 lbs, camera-experienced and comfortable on set.'

function slots(slug: string, label: string, orientations: Orientation[]): Photo[] {
  return orientations.map((orientation, i) => ({
    id: `${slug}-${i + 1}`,
    src: null,
    alt: `${label} — photo ${i + 1}`,
    orientation,
    focus: '50% 30%',
  }))
}

export const projects: Project[] = [
  {
    slug: 'lab-74-runway',
    title: 'Lab 74 Fashion Show',
    client: 'Lab 74 Clothing Brand',
    role: 'Runway Model',
    date: 'Aug 2026',
    creditGroup: 'Runway / Fashion / Commercial',
    categories: ['Runway', 'Fashion'],
    featuredCredit: true,
    photos: slots('lab-74-runway', 'Lab 74 runway show', ['portrait', 'portrait', 'landscape']),
  },
  {
    slug: 'apple-music',
    title: 'Apple Music',
    client: 'Apple Music',
    role: 'Stand-in Model',
    creditGroup: 'Runway / Fashion / Commercial',
    categories: ['Commercial'],
    featuredCredit: true,
    photos: [],
  },
  {
    slug: 'gap-campaign',
    title: 'Gap Campaign',
    client: 'Gap',
    role: 'Model',
    status: 'Media pending',
    creditGroup: 'Runway / Fashion / Commercial',
    categories: ['Fashion', 'Commercial'],
    featuredCredit: true,
    photos: [],
  },
  {
    slug: 'riot-games',
    title: 'League of Legends Merch Drop',
    client: 'Riot Games',
    role: 'Model',
    creditGroup: 'Runway / Fashion / Commercial',
    categories: ['Commercial', 'Fashion'],
    featuredCredit: true,
    photos: slots('riot-games', 'Riot Games merch drop', ['landscape', 'portrait', 'portrait']),
  },
  {
    slug: 'blrd-streetwear',
    title: 'BLRD Streetwear',
    client: 'BLRD',
    role: 'Model',
    status: 'Media pending',
    creditGroup: 'Runway / Fashion / Commercial',
    categories: ['Fashion'],
    photos: [],
  },
  {
    slug: 'destin-conrad-nervous',
    title: '“Nervous”',
    client: 'Destin Conrad',
    role: 'Music Video Talent & Dancer',
    creditGroup: 'Music Video / Film',
    categories: ['Music Videos'],
    featuredCredit: true,
    photos: slots('destin-conrad-nervous', 'Destin Conrad “Nervous” music video', ['landscape', 'portrait']),
  },
  {
    slug: 'osita-davd-vex',
    title: '“VEX”',
    client: 'Osita Davd',
    role: 'Music Video Model',
    creditGroup: 'Music Video / Film',
    categories: ['Music Videos'],
    photos: slots('osita-davd-vex', 'Osita Davd “VEX” music video', ['portrait', 'landscape']),
  },
  {
    slug: 'lurks-turbulence',
    title: '“Turbulence”',
    client: 'Lurks',
    role: 'Music Video Model',
    creditGroup: 'Music Video / Film',
    categories: ['Music Videos'],
    photos: slots('lurks-turbulence', 'Lurks “Turbulence” music video', ['landscape', 'portrait']),
  },
  {
    slug: 'writerboy-film',
    title: 'Writerboy',
    client: 'Writerboy Film',
    role: 'Background Actress',
    creditGroup: 'Music Video / Film',
    categories: ['Film'],
    photos: [],
  },
  {
    slug: 'sony-door-3',
    title: 'Door 3',
    client: 'SONY Productions',
    role: 'Dating Show Contestant',
    date: 'October 2026',
    creditGroup: 'Television',
    categories: ['Film'],
    photos: [],
  },
  {
    slug: 'hedonistas-mezcal',
    title: 'Hedonistas De La Fe',
    client: 'Hedonistas De La Fe Mezcal Tequila',
    role: 'Model',
    creditGroup: 'Beauty / Brand',
    categories: ['Commercial'],
    photos: slots('hedonistas-mezcal', 'Hedonistas De La Fe mezcal campaign', ['portrait', 'square']),
  },
  {
    slug: 'zernell-gillie-fragrances',
    title: 'Zernell Gillie Fragrances',
    client: 'Zernell Gillie Fragrances',
    role: 'Model',
    creditGroup: 'Beauty / Brand',
    categories: ['Beauty', 'Commercial'],
    photos: slots('zernell-gillie-fragrances', 'Zernell Gillie fragrance shoot', ['portrait', 'portrait']),
  },
  {
    slug: 'portfolio-shots',
    title: 'Professional Portfolio',
    client: 'Personal portfolio',
    role: 'Beauty, Editorial & Lifestyle Model',
    creditGroup: 'Beauty / Brand',
    categories: ['Editorial', 'Beauty'],
    photos: slots('portfolio-shots', 'Beauty and editorial portfolio', [
      'portrait',
      'portrait',
      'landscape',
      'portrait',
    ]),
  },
]

/** Curated images for the home page "Selected Work" grid, in display order. */
export const selectedWork: { project: string; photo: string }[] = [
  { project: 'portfolio-shots', photo: 'portfolio-shots-1' },
  { project: 'lab-74-runway', photo: 'lab-74-runway-1' },
  { project: 'destin-conrad-nervous', photo: 'destin-conrad-nervous-1' },
  { project: 'zernell-gillie-fragrances', photo: 'zernell-gillie-fragrances-1' },
  { project: 'riot-games', photo: 'riot-games-1' },
]

export const creditGroups: CreditGroup[] = [
  'Runway / Fashion / Commercial',
  'Music Video / Film',
  'Television',
  'Beauty / Brand',
]

export function getSelectedWork() {
  return selectedWork.flatMap(({ project, photo }) => {
    const p = projects.find((x) => x.slug === project)
    const ph = p?.photos.find((x) => x.id === photo)
    return p && ph ? [{ project: p, photo: ph }] : []
  })
}
