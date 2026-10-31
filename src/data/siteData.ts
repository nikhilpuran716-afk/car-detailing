export interface DemoContactInfo {
  businessName: string;
  cityState: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsappHref: string;
  emailDisplay: string;
  instagramHandle: string;
  instagramUrl: string;
  hoursDisplay: string;
  serviceRadius: string;
}

export const DEMO_CONTACT: DemoContactInfo = {
  businessName: 'APEX AUTO DETAILING',
  cityState: 'Miami, Florida, USA',
  phoneDisplay: '(305) 890-4210',
  phoneHref: 'tel:+13058904210',
  whatsappHref:
    'https://wa.me/13058904210?text=Hello%20Apex%20Auto%20Detailing%2C%20I%20would%20like%20to%20schedule%20a%20mobile%20detailing%20appointment.',
  emailDisplay: 'concierge@apexautodetailing.com',
  instagramHandle: '@apexdetailing.miami',
  instagramUrl: '#work',
  hoursDisplay: 'Mon – Sun · 7:00 AM – 7:00 PM EST (By Appointment)',
  serviceRadius: 'Miami-Dade & Surrounding Coastal Communities',
};

/**
 * Centralized Replaceable Real Image Configuration.
 * All paths below point to real local photographs in /public/assets/ and can be
 * replaced in code or swapped live in the browser via the Client Image Customizer.
 */
export interface SiteImagesConfig {
  heroSupercar: string;
  services: {
    'exterior-detailing': string;
    'interior-detailing': string;
    'full-detail': string;
    'ceramic-coating': string;
  };
  beforeAfter: {
    'paint-restoration': { before: string; after: string };
    'interior-cleaning': { before: string; after: string };
    'wheel-detailing': { before: string; after: string };
    'exterior-shine': { before: string; after: string };
  };
}

export const DEFAULT_SITE_IMAGES: SiteImagesConfig = {
  heroSupercar: '/assets/hero-black-supercar.jpg',
  services: {
    'exterior-detailing': '/assets/images/service-exterior.jpg',
    'interior-detailing': '/assets/images/service-interior-real.jpg',
    'full-detail': '/assets/images/service-full-real.jpg',
    'ceramic-coating': '/assets/images/service-ceramic-real.jpg',
  },
  beforeAfter: {
    'paint-restoration': {
      before: '/assets/images/ba-paint-before-v3.jpg',
      after: '/assets/images/ba-paint-after-v3.jpg',
    },
    'interior-cleaning': {
      before: '/assets/images/ba-interior-before-v3.jpg',
      after: '/assets/images/ba-interior-after-v3.jpg',
    },
    'wheel-detailing': {
      before: '/assets/images/ba-wheel-before-v3.jpg',
      after: '/assets/images/ba-wheel-after-v3.jpg',
    },
    'exterior-shine': {
      before: '/assets/images/ba-shine-before-v3.jpg',
      after: '/assets/images/ba-shine-after-v3.jpg',
    },
  },
};

export const HERO_SUPERCAR_IMAGE = DEFAULT_SITE_IMAGES.heroSupercar;

export type VehicleSizeKey = 'coupe' | 'suv' | 'exotic';

export interface VehicleSizeOption {
  key: VehicleSizeKey;
  label: string;
  multiplierLabel: string;
}

export const VEHICLE_SIZE_OPTIONS: VehicleSizeOption[] = [
  { key: 'coupe', label: 'Coupe / Sedan', multiplierLabel: 'Standard Coupe & Sedan Rate' },
  { key: 'suv', label: 'SUV / Crossover', multiplierLabel: 'Mid-Size SUV Rate' },
  { key: 'exotic', label: 'Exotic / Full-Size SUV', multiplierLabel: 'Exotic & Full-Size Rate' },
];

export interface ServiceItem {
  id: keyof SiteImagesConfig['services'];
  index: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  detailedDescription: string;
  samplePrices: Record<VehicleSizeKey, string>;
  durationEstimate: string;
  features: string[];
  processHighlights: string[];
  recommendedFor: string;
  imageSrc: string;
  imageAlt: string;
}

export interface BeforeAfterItem {
  id: keyof SiteImagesConfig['beforeAfter'];
  category: string;
  title: string;
  vehicleLabel: string;
  summary: string;
  beforeLabel: string;
  afterLabel: string;
  beforeNotes: string[];
  afterNotes: string[];
  beforeImageSrc: string;
  afterImageSrc: string;
}

export interface ServiceAreaLocation {
  id: string;
  name: string;
  zone: string;
  arrivalNote: string;
  accessDetails: string;
  coordinates: { x: number; y: number };
}

export interface DemoTestimonial {
  id: string;
  placeholderLabel: string;
  clientName: string;
  initials: string;
  location: string;
  neighborhoodDetail: string;
  reviewDate: string;
  vehicle: string;
  service: string;
  quote: string;
  outcomeSummary: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'exterior-detailing',
    index: '01',
    title: 'Exterior Detailing',
    subtitle: 'Decontamination & Mirror Gloss Finish',
    shortDescription:
      'Meticulous hand wash, wheel and brake caliper decontamination, and hydrophobic surface treatment engineered to restore deep exterior gloss.',
    detailedDescription:
      'Designed for daily-driven luxury vehicles and weekend sports cars exposed to Miami coastal salt air and road film. We use spot-free deionized water, pH-neutral snow foam, and ultra-plush microfiber wash media to safely lift contaminants without introducing wash marring.',
    samplePrices: {
      coupe: '$150',
      suv: '$185',
      exotic: '$225',
    },
    durationEstimate: '1.5 – 2.5 Hours at Your Location',
    features: [
      'Hand wash with spot-free deionized water & pH-neutral snow foam',
      'Wheel and tire cleaning including inner wheel barrels & brake calipers',
      'Exterior surface treatment & iron/fallout decontamination',
      'Professional finishing with streak-free glass & satin tire dressing',
    ],
    processHighlights: [
      'Pre-rinse & citrus bug/tar emulsification on front bumper and mirrors',
      'Two-bucket grit-guard contact wash with dedicated wheel brushes',
      'Warm filtered air blow-dry of emblems, grilles, and door jambs',
      'Hydrophobic silica spray sealant application for UV & water protection',
    ],
    recommendedFor: 'Bi-weekly or monthly maintenance to preserve showroom gloss and protect clearcoat.',
    imageSrc: DEFAULT_SITE_IMAGES.services['exterior-detailing'],
    imageAlt: 'Black luxury sports car receiving a pressure rinse and exterior foam wash',
  },
  {
    id: 'interior-detailing',
    index: '02',
    title: 'Interior Detailing',
    subtitle: 'Cabin Restoration & Material Conditioning',
    shortDescription:
      'Deep interior cleaning across leather, Alcantara, carbon trim, carpets, and consoles to restore a crisp, factory-matte cabin environment.',
    detailedDescription:
      'Miami heat, humidity, and sunscreen transfer can prematurely wear fine automotive interiors. Our interior treatment purges embedded dust from air vents and seams, gently lifts oils from leather bolsters, and leaves a zero-grease, non-slippery matte finish.',
    samplePrices: {
      coupe: '$175',
      suv: '$215',
      exotic: '$250',
    },
    durationEstimate: '2 – 3 Hours at Your Location',
    features: [
      'Deep interior cleaning & multi-stage HEPA vacuuming',
      'Dashboard and console cleaning with soft boar-hair detailing brushes',
      'Carpet and upholstery cleaning with heated fabric extraction',
      'Interior detailing finish with UV-protective matte leather conditioning',
    ],
    processHighlights: [
      'Compressed air purge of seat tracks, crevices, and stitching lines',
      'pH-balanced leather cleansing & breathable conditioning cream',
      'Steam sanitization of high-touch controls, cupholders, and vents',
      'Crystal-clear interior glass & panoramic sunroof cleaning',
    ],
    recommendedFor: 'Vehicles needing cabin refreshment, sand/spill removal, or leather preservation.',
    imageSrc: DEFAULT_SITE_IMAGES.services['interior-detailing'],
    imageAlt: 'Detailed Porsche luxury leather steering wheel, center console, and perforated leather seats',
  },
  {
    id: 'full-detail',
    index: '03',
    title: 'Full Interior & Exterior Detail',
    subtitle: 'Complete Bumper-to-Bumper Transformation',
    shortDescription:
      'Our comprehensive signature package combining complete interior restoration and exterior decontamination with customized service options.',
    detailedDescription:
      'The flagship turnaround package for owners who want every square inch of their vehicle reset at home or the office. Combines our full exterior decontamination and sealant protection with deep cabin extraction and leather conditioning.',
    samplePrices: {
      coupe: '$295',
      suv: '$350',
      exotic: '$420',
    },
    durationEstimate: '3.5 – 5 Hours at Your Location',
    features: [
      'Complete vehicle detailing inside and out in a single mobile visit',
      'Interior and exterior treatment including door jambs & trunk compartment',
      'Clay-bar paint decontamination & 6-month polymer paint sealant',
      'Customized service options tailored to your vehicle materials',
    ],
    processHighlights: [
      'Full exterior foam bath, iron removal, and synthetic clay decontamination',
      'Deep interior steam cleaning, carpet shampooing, and leather care',
      'Engine bay dust wipe-down and dressed trim restoration',
      'Final LED inspection walk-around with the vehicle owner',
    ],
    recommendedFor: 'Seasonal deep resets, new-to-you vehicle acquisitions, or lease return preparation.',
    imageSrc: DEFAULT_SITE_IMAGES.services['full-detail'],
    imageAlt: 'Mobile auto detailer performing a two-bucket hand wash and full detail on a black Porsche in a driveway',
  },
  {
    id: 'ceramic-coating',
    index: '04',
    title: 'Ceramic Coating',
    subtitle: 'Long-Term Surface Protection & Extreme Depth',
    shortDescription:
      'Meticulous paint preparation followed by high-solids nano-ceramic surface protection for relentless hydrophobic beading and candy-like gloss.',
    detailedDescription:
      'Engineered to shield your vehicle’s clearcoat against Florida UV radiation, acid rain, bird droppings, and coastal salt air. After thorough surface decontamination and machine polish preparation, we hand-apply a durable ceramic barrier that makes routine washing effortless.',
    samplePrices: {
      coupe: '$690',
      suv: '$840',
      exotic: '$990',
    },
    durationEstimate: '5 – 8 Hours (Covered Driveway / Garage Recommended)',
    features: [
      'Paint preparation including chemical & mechanical decontamination',
      'Single-stage gloss enhancement polish to remove light haze',
      'Surface protection with professional-grade SiO2 ceramic coating',
      'Premium finish on paintwork, exterior glass, and wheel faces',
    ],
    processHighlights: [
      'Full strip wash, iron decontamination, and clay bar treatment',
      'Machine polish to amplify paint clarity and depth before bonding',
      'Isopropyl alcohol (IPA) panel prep wipe to ensure pure molecular bond',
      'Precision cross-hatch ceramic application & infrared/ambient cure check',
    ],
    recommendedFor: 'New vehicles, dark-colored paintwork, and owners seeking long-term ease of maintenance.',
    imageSrc: DEFAULT_SITE_IMAGES.services['ceramic-coating'],
    imageAlt: 'Mirror-like ceramic coated sports coupe hood reflecting palm trees in bright coastal sunlight',
  },
];

export const BEFORE_AFTER_ITEMS: BeforeAfterItem[] = [
  {
    id: 'paint-restoration',
    category: 'Luxury Car Paint Restoration',
    title: 'Swirl & Oxidation Removal on Rosso Corsa Ferrari Clearcoat',
    vehicleLabel: 'Rosso Corsa Ferrari LaFerrari · Multi-Stage Paint Correction',
    summary:
      'High-gloss exotic paintwork reveals every wash mark and mineral ring. Compare dull, swirl-hazed clearcoat against a corrected, liquid-depth studio finish.',
    beforeLabel: 'BEFORE · Swirl Marks & Oxidation Haze',
    afterLabel: 'AFTER · Corrected Rosso Corsa Mirror Gloss',
    beforeNotes: [
      'Circular wash marring & spiderweb scratches across the front hood and fenders',
      'Mineral water spot rings & chalky oxidation muting red pigment vibrancy',
      'Road dust and grime dulling lower carbon-fiber splitters and intakes',
    ],
    afterNotes: [
      'Multi-stage machine polish restores deep, distortion-free studio reflection',
      'Decontaminated and leveled clearcoat with vibrant Rosso Corsa depth',
      'Sealed with hydrophobic protection for relentless wet-look gloss',
    ],
    beforeImageSrc: DEFAULT_SITE_IMAGES.beforeAfter['paint-restoration'].before,
    afterImageSrc: DEFAULT_SITE_IMAGES.beforeAfter['paint-restoration'].after,
  },
  {
    id: 'interior-cleaning',
    category: 'Interior Deep Cleaning',
    title: 'Mercedes-AMG GT Nappa Leather & Turbine Cockpit Restoration',
    vehicleLabel: 'Mercedes-AMG GT 43 · Perforated Nappa Leather Cockpit',
    summary:
      'Coastal sand, sunscreen transfer, and cabin dust dull perforated Nappa leather and brushed metal consoles. Our deep cabin detail restores a crisp factory-matte finish.',
    beforeLabel: 'BEFORE · Cabin Sand, Dust & Soiled Leather',
    afterLabel: 'AFTER · Crisp Factory-Matte AMG Cockpit',
    beforeNotes: [
      'Embedded beach sand & dust across perforated leather bucket seat bolsters',
      'Fingerprints, oils, and dust inside V8 center console switches and turbine vents',
      'Dull, unconditioned steering wheel rim and contrast white stitching',
    ],
    afterNotes: [
      'Purged and sanitized perforated Nappa leather with breathable matte conditioner',
      'Spotless brushed-aluminum center console, switchgear, and digital cluster',
      'Zero-grease UV barrier applied across all leather, carbon, and trim surfaces',
    ],
    beforeImageSrc: DEFAULT_SITE_IMAGES.beforeAfter['interior-cleaning'].before,
    afterImageSrc: DEFAULT_SITE_IMAGES.beforeAfter['interior-cleaning'].after,
  },
  {
    id: 'wheel-detailing',
    category: 'Wheel and Tire Detailing',
    title: 'Audi R8 V10 Forged Wheel, Caliper & Lower Rocker Decontamination',
    vehicleLabel: 'Satin Charcoal Audi R8 V10 · Custom Forged Alloy Wheels',
    summary:
      'High-performance carbon-ceramic and iron brakes coat forged rims and lower body panels in corrosive dust and road splatter. We decontaminate every spoke and barrel.',
    beforeLabel: 'BEFORE · Heavy Brake Dust & Road Splatter',
    afterLabel: 'AFTER · Decontaminated Forged Wheels & Trim',
    beforeNotes: [
      'Heavy brown iron brake dust and road mud dulling forged spokes and orange barrel lip',
      'Oxidized brown blooming on low-profile performance tire sidewalls',
      'Road film and grit accumulated along lower side skirts and rear diffuser',
    ],
    afterNotes: [
      'pH-neutral iron decontamination restores gloss-black spokes and vibrant orange accents',
      'Deep barrel and caliper cleaning with dedicated soft boars-hair wheel brushes',
      'Sling-free satin tire conditioning and spotless lower aero bodywork',
    ],
    beforeImageSrc: DEFAULT_SITE_IMAGES.beforeAfter['wheel-detailing'].before,
    afterImageSrc: DEFAULT_SITE_IMAGES.beforeAfter['wheel-detailing'].after,
  },
  {
    id: 'exterior-shine',
    category: 'Exterior Shine',
    title: 'Sakhir Orange Metallic Gloss & Palm-Tree Mirror Reflection',
    vehicleLabel: 'BMW M4 Coupe · Sakhir Orange Metallic Hood Reflection',
    summary:
      'Miami salt air and traffic film flatten metallic flake and blur overhead reflections. Our exterior decontamination and silica sealant lock in razor-sharp clarity.',
    beforeLabel: 'BEFORE · Coastal Salt Film & Cloudy Hood',
    afterLabel: 'AFTER · Razor-Sharp Palm Mirror Reflection',
    beforeNotes: [
      'Coastal salt haze and traffic film muting Sakhir Orange metallic flake',
      'Cloudy, diffused palm-tree reflections across the sculpted hood and bumper',
      'Water-spot streaks and bug residue along the kidney grilles and headlights',
    ],
    afterNotes: [
      'Crystal-clear, high-definition reflection of overhead Miami palm trees',
      'Slick hydrophobic SiO2 sealant amplifies metallic warmth and color depth',
      'Jewel-like clarity across LED headlamps, carbon roof, and gloss-black grilles',
    ],
    beforeImageSrc: DEFAULT_SITE_IMAGES.beforeAfter['exterior-shine'].before,
    afterImageSrc: DEFAULT_SITE_IMAGES.beforeAfter['exterior-shine'].after,
  },
];

export const MIAMI_SERVICE_AREAS: ServiceAreaLocation[] = [
  {
    id: 'brickell',
    name: 'Brickell & Downtown Miami',
    zone: 'Central Core',
    arrivalNote: 'Same-Week & Morning Executive Slots',
    accessDetails: 'Equipped for residential luxury condo valet decks and private office parking garages.',
    coordinates: { x: 58, y: 52 },
  },
  {
    id: 'coral-gables',
    name: 'Coral Gables',
    zone: 'Southwest',
    arrivalNote: 'Driveway & Estate Service',
    accessDetails: 'Self-contained water and quiet power ideal for gated estates and shaded driveways.',
    coordinates: { x: 42, y: 64 },
  },
  {
    id: 'miami-beach',
    name: 'Miami Beach & South Beach',
    zone: 'Coastal Barrier Island',
    arrivalNote: 'Coastal Salt-Air Protection Focus',
    accessDetails: 'Full mobile coverage across South of Fifth, Mid-Beach, and Venetian Islands residences.',
    coordinates: { x: 76, y: 46 },
  },
  {
    id: 'coconut-grove',
    name: 'Coconut Grove',
    zone: 'Bayfront South',
    arrivalNote: 'Tree-Sap & Canopy Fallout Specialists',
    accessDetails: 'Gentle decontamination for vehicles parked beneath lush banyan and oak canopies.',
    coordinates: { x: 51, y: 72 },
  },
  {
    id: 'wynwood-design',
    name: 'Wynwood & Design District',
    zone: 'Midtown / North Core',
    arrivalNote: 'Studio & Commercial Office Visits',
    accessDetails: 'We detail your vehicle while you work at your studio, showroom, or private lot.',
    coordinates: { x: 57, y: 38 },
  },
  {
    id: 'key-biscayne',
    name: 'Key Biscayne',
    zone: 'Island Community',
    arrivalNote: 'Marine-Grade Ceramic & Interior Care',
    accessDetails: 'Tailored protection against ocean spray, sand intrusion, and intense UV exposure.',
    coordinates: { x: 73, y: 74 },
  },
  {
    id: 'doral',
    name: 'Doral',
    zone: 'West Miami-Dade',
    arrivalNote: 'Residential & Corporate Park Coverage',
    accessDetails: 'Convenient driveway and corporate campus mobile detailing appointments.',
    coordinates: { x: 25, y: 42 },
  },
  {
    id: 'aventura',
    name: 'Aventura & Sunny Isles',
    zone: 'North Miami Coastal',
    arrivalNote: 'North Corridor Appointments',
    accessDetails: 'Serving private residences, marina slips, and luxury waterfront communities.',
    coordinates: { x: 69, y: 18 },
  },
];

export const DEMO_TESTIMONIALS: DemoTestimonial[] = [
  {
    id: 'review-1',
    placeholderLabel: 'Verified by Google',
    clientName: 'Marcus Vance',
    initials: 'MV',
    location: 'Coral Gables, FL 33134',
    neighborhoodDetail: 'Private Estate Driveway · Old Cutler Road Corridor',
    reviewDate: '2 weeks ago',
    vehicle: '2024 Porsche 911 Carrera GTS',
    service: 'Full Interior & Exterior Detail',
    quote:
      '"Having the mobile unit arrive directly at my driveway in Coral Gables saved my entire Saturday. Their spot-free water system left the Jet Black Metallic paint looking like wet glass in direct sun, and the perforated leather cabin felt brand new without any greasy residue."',
    outcomeSummary: 'Driveway Mobile Service · Coral Gables, FL',
  },
  {
    id: 'review-2',
    placeholderLabel: 'Verified by Google',
    clientName: 'Elena Rostova',
    initials: 'ER',
    location: 'Brickell, Miami, FL 33131',
    neighborhoodDetail: 'Brickell Key Luxury Condo · Valet Garage Deck',
    reviewDate: '3 weeks ago',
    vehicle: '2024 Range Rover Autobiography',
    service: 'Interior Detailing & Exterior Hand Wash',
    quote:
      '"Between Key Biscayne beach trips and daily commuting, our Range Rover interior needed serious attention. The precision across every air vent, contrast stitch line, and inner wheel barrel was remarkable—all completed right inside our building’s private garage."',
    outcomeSummary: 'Executive Garage Dispatch · Brickell, Miami',
  },
  {
    id: 'review-3',
    placeholderLabel: 'Verified by Google',
    clientName: 'David Kensington',
    initials: 'DK',
    location: 'Miami Beach, FL 33139',
    neighborhoodDetail: 'South of Fifth Waterfront Residence · Venetian Causeway',
    reviewDate: '1 month ago',
    vehicle: '2023 Ferrari F8 Tributo',
    service: 'Ceramic Coating & Paint Preparation',
    quote:
      '"Living right off the ocean on Miami Beach means constant salt air and hard water spots. Apex’s single-stage machine polish and ceramic coating gave the Rosso Corsa finish incredible liquid depth, and routine maintenance washing now takes half the time."',
    outcomeSummary: 'Waterfront Residence · Miami Beach, FL',
  },
];
