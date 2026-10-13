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
  /** Self-produced portfolio shoots: shown in the gallery, left out of the credits list. */
  personal?: boolean
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
  representation: 'Seeking agency representation',
  representationNote:
    'Maria is currently independent and open to agency representation. Agents and scouts are welcome to reach out directly or use the inquiry form.',
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
    photos: [
      {
        id: 'lab-74-runway-1',
        src: '/photos/lab74-01.jpeg',
        alt: 'Maria Williams at night in a blue camo bomber, pinstripe blazer, and coral skirt for Lab 74',
        orientation: 'portrait',
        focus: '50% 25%',
      },
      {
        id: 'lab-74-runway-2',
        src: '/photos/lab74-02.jpeg',
        alt: 'Maria Williams and a fellow model in Lab 74 looks beside parked cars at night',
        orientation: 'portrait',
        focus: '50% 30%',
      },
    ],
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
    creditGroup: 'Runway / Fashion / Commercial',
    categories: ['Fashion', 'Commercial'],
    featuredCredit: true,
    photos: [
      {
        id: 'gap-campaign-1',
        src: '/photos/gap-01.jpeg',
        alt: 'Four models in Gap denim posing on a sunlit rooftop',
        orientation: 'portrait',
        focus: '50% 30%',
      },
      {
        id: 'gap-campaign-2',
        src: '/photos/gap-02.jpeg',
        alt: 'Maria Williams and two models in Gap denim against a hillside skyline',
        orientation: 'portrait',
        focus: '40% 45%',
      },
      {
        id: 'gap-campaign-3',
        src: '/photos/gap-03.jpeg',
        alt: 'Gap campaign group shot beneath a parking structure stairway',
        orientation: 'landscape',
        focus: '50% 35%',
      },
      {
        id: 'gap-campaign-4',
        src: '/photos/gap-04.jpeg',
        alt: 'Maria Williams in a green halter and denim skirt on a stairway with the Gap cast',
        orientation: 'portrait',
        focus: '30% 35%',
      },
    ],
  },
  {
    slug: 'riot-games',
    title: 'League of Legends Merch Drop',
    client: 'Riot Games',
    role: 'Model',
    creditGroup: 'Runway / Fashion / Commercial',
    categories: ['Commercial', 'Fashion'],
    featuredCredit: true,
    photos: [
      {
        id: 'riot-games-1',
        src: '/photos/riot-01.jpeg',
        alt: 'Maria Williams in a maroon League of Legends Akali hoodie in a pink set',
        orientation: 'portrait',
        focus: '50% 30%',
      },
    ],
  },
  {
    slug: 'blrd-streetwear',
    title: 'BLRD Streetwear',
    client: 'BLRD',
    role: 'Model',
    creditGroup: 'Runway / Fashion / Commercial',
    categories: ['Fashion'],
    photos: [
      {
        id: 'blrd-streetwear-1',
        src: '/photos/blrd-01.jpeg',
        alt: 'Maria Williams in a brown BLRD soccer jersey leaning on a railing',
        orientation: 'portrait',
        focus: '50% 30%',
      },
      {
        id: 'blrd-streetwear-2',
        src: '/photos/blrd-02.jpeg',
        alt: 'Maria Williams posing with layered gold chains in a BLRD jersey',
        orientation: 'portrait',
        focus: '50% 30%',
      },
      {
        id: 'blrd-streetwear-3',
        src: '/photos/blrd-03.jpeg',
        alt: 'Maria Williams in a BLRD jersey at golden hour by the beach',
        orientation: 'portrait',
        focus: '50% 25%',
      },
      {
        id: 'blrd-streetwear-4',
        src: '/photos/blrd-04.jpeg',
        alt: 'Maria Williams seated on a railing in a BLRD jersey with palm trees behind',
        orientation: 'portrait',
        focus: '50% 30%',
      },
      {
        id: 'blrd-streetwear-5',
        src: '/photos/blrd-05.jpeg',
        alt: 'BLRD cast in soccer jerseys in front of a graffiti wall at the beach',
        orientation: 'landscape',
        focus: '60% 40%',
      },
    ],
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
    photos: [
      {
        id: 'zernell-gillie-fragrances-1',
        src: '/photos/zernell-gillie-01.jpeg',
        alt: 'Silhouette of Maria Williams holding a Zernell Gillie "Blues" fragrance bottle against amber light',
        orientation: 'square',
        focus: '50% 40%',
      },
    ],
  },
  {
    slug: 'studio-portrait',
    title: 'Studio Portrait',
    client: 'Personal portfolio',
    role: 'Beauty & Portrait Model',
    creditGroup: 'Beauty / Brand',
    categories: ['Beauty', 'Editorial'],
    personal: true,
    photos: [
      {
        id: 'studio-portrait-1',
        src: '/photos/studio-01.jpeg',
        alt: 'Studio portrait of Maria Williams in a burgundy lace halter with layered necklaces against a deep green backdrop',
        orientation: 'portrait',
        focus: '50% 30%',
      },
    ],
  },
  {
    slug: 'rooftop-pool',
    title: 'Rooftop & Pool',
    client: 'Personal portfolio',
    role: 'Swim & Lifestyle Model',
    creditGroup: 'Beauty / Brand',
    categories: ['Editorial', 'Fashion'],
    personal: true,
    photos: [
      {
        id: 'rooftop-pool-1',
        src: '/photos/rooftop-01.jpeg',
        alt: 'Maria Williams reclining poolside in a tropical print bikini and sarong beside a vintage caution sign',
        orientation: 'portrait',
        focus: '35% 65%',
      },
      {
        id: 'rooftop-pool-2',
        src: '/photos/rooftop-02.jpeg',
        alt: 'Maria Williams looking back over her shoulder against a rooftop glass railing above the city',
        orientation: 'portrait',
        focus: '50% 35%',
      },
      {
        id: 'rooftop-pool-3',
        src: '/photos/rooftop-03.jpeg',
        alt: 'Full-length shot of Maria Williams in a tropical print set on a sunlit rooftop',
        orientation: 'portrait',
        focus: '50% 30%',
      },
      {
        id: 'rooftop-pool-4',
        src: '/photos/rooftop-04.jpeg',
        alt: 'Maria Williams with hands on hips under a bright sun flare on a rooftop',
        orientation: 'portrait',
        focus: '50% 35%',
      },
      {
        id: 'rooftop-pool-5',
        src: '/photos/rooftop-05.jpeg',
        alt: 'Maria Williams lounging at the pool edge with a hand at her neck, checkered wall behind',
        orientation: 'portrait',
        focus: '35% 45%',
      },
    ],
  },
  {
    slug: 'venice-beach',
    title: 'Venice Beach',
    client: 'Personal portfolio',
    role: 'Editorial Model',
    creditGroup: 'Beauty / Brand',
    categories: ['Editorial', 'Fashion'],
    personal: true,
    photos: [
      {
        id: 'venice-beach-1',
        src: '/photos/venice-09.jpeg',
        alt: 'Maria Williams holding out the train of a hot pink gown at the shoreline as waves break behind her',
        orientation: 'portrait',
        focus: '50% 55%',
      },
      {
        id: 'venice-beach-2',
        src: '/photos/venice-01.jpeg',
        alt: 'Maria Williams in a hot pink slip dress between graffiti-painted palm trunks on Venice Beach',
        orientation: 'portrait',
        focus: '50% 40%',
      },
      {
        id: 'venice-beach-3',
        src: '/photos/venice-03.jpeg',
        alt: 'Maria Williams in a backless pink gown looking over her shoulder against a pink graffiti wall',
        orientation: 'portrait',
        focus: '45% 40%',
      },
      {
        id: 'venice-beach-4',
        src: '/photos/venice-10.jpeg',
        alt: 'Maria Williams in a flowing pink gown between graffiti palm trunks reading VIRTUAL',
        orientation: 'portrait',
        focus: '45% 50%',
      },
      {
        id: 'venice-beach-5',
        src: '/photos/venice-07.jpeg',
        alt: 'Close profile of Maria Williams in a backless pink gown at the water under a dramatic sky',
        orientation: 'portrait',
        focus: '35% 60%',
      },
      {
        id: 'venice-beach-6',
        src: '/photos/venice-05.jpeg',
        alt: 'Maria Williams glancing back at the shoreline in a pink gown beneath sweeping clouds',
        orientation: 'portrait',
        focus: '35% 70%',
      },
      {
        id: 'venice-beach-7',
        src: '/photos/venice-08.jpeg',
        alt: 'Maria Williams standing in the surf in a pink gown, looking back toward the camera',
        orientation: 'portrait',
        focus: '35% 60%',
      },
      {
        id: 'venice-beach-8',
        src: '/photos/venice-06.jpeg',
        alt: 'Maria Williams in profile at the waterline in a pink gown with wide blue sky above',
        orientation: 'portrait',
        focus: '30% 70%',
      },
      {
        id: 'venice-beach-9',
        src: '/photos/venice-02.jpeg',
        alt: 'Maria Williams in profile on the sand with sun flare between palm trees',
        orientation: 'portrait',
        focus: '50% 55%',
      },
      {
        id: 'venice-beach-10',
        src: '/photos/venice-04.jpeg',
        alt: 'Wider shot of Maria Williams in a pink gown against a graffiti wall and blue sky',
        orientation: 'portrait',
        focus: '45% 50%',
      },
    ],
  },
  {
    slug: 'santa-monica',
    title: 'Santa Monica',
    client: 'Personal portfolio',
    role: 'Swim & Lifestyle Model',
    creditGroup: 'Beauty / Brand',
    categories: ['Editorial'],
    personal: true,
    photos: [
      {
        id: 'santa-monica-1',
        src: '/photos/santa-monica-04.jpeg',
        alt: 'Silhouette of Maria Williams seated on wet sand at sunset with light reflecting off the water',
        orientation: 'landscape',
        focus: '55% 60%',
      },
      {
        id: 'santa-monica-2',
        src: '/photos/santa-monica-02.jpeg',
        alt: 'Maria Williams reclining in shallow water in a gold bikini and pink crochet skirt',
        orientation: 'landscape',
        focus: '45% 55%',
      },
      {
        id: 'santa-monica-3',
        src: '/photos/santa-monica-03.jpeg',
        alt: 'Maria Williams seated in the shallows looking down, lifeguard tower behind',
        orientation: 'landscape',
        focus: '50% 55%',
      },
      {
        id: 'santa-monica-4',
        src: '/photos/santa-monica-01.jpeg',
        alt: 'Maria Williams sitting on the sand in a gold bikini and pink crochet skirt on a busy beach',
        orientation: 'landscape',
        focus: '45% 60%',
      },
    ],
  },
]

/** Curated images for the home page "Selected Work" grid, in display order. */
export const selectedWork: { project: string; photo: string }[] = [
  { project: 'lab-74-runway', photo: 'lab-74-runway-1' },
  { project: 'blrd-streetwear', photo: 'blrd-streetwear-2' },
  { project: 'gap-campaign', photo: 'gap-campaign-4' },
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
