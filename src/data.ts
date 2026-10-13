export const img = (id: string, w = 900, h = 640) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=75`

export type Region = "Asia" | "Oceania" | "Africa" | "Europe" | "South America" | "North America"
export const REGIONS: Region[] = [
  "Asia",
  "Oceania",
  "Africa",
  "Europe",
  "South America",
  "North America",
]

export interface Country {
  id: string
  name: string
  region: Region
  image: string
  blurb: string
}

export const COUNTRIES: Country[] = [
  {
    id: "japan",
    name: "Japan",
    region: "Asia",
    image: "1624253321171-1be53e12f5f4",
    blurb: "Temples, bullet trains and blossom season.",
  },
  {
    id: "china",
    name: "China",
    region: "Asia",
    image: "1508804185872-d7badad00f7d",
    blurb: "Chinese culture, high-speed trains and street food.",
  },
  {
    id: "thailand",
    name: "Thailand",
    region: "Asia",
    image: "1704314838317-460424fd6688",
    blurb: "Limestone islands and warm Andaman water.",
  },
  {
    id: "indonesia",
    name: "Indonesia",
    region: "Asia",
    image: "1555400038-63f5ba517a47",
    blurb: "Bali's terraces, shrines and slow mornings.",
  },
  {
    id: "australia",
    name: "Australia",
    region: "Oceania",
    image: "1624138784614-87fd1b6528f8",
    blurb: "Harbour cities and the Great Barrier Reef.",
  },
  {
    id: "kenya",
    name: "Kenya",
    region: "Africa",
    image: "1535940360221-641a69c43bac",
    blurb: "The Great Migration across the Mara.",
  },
  {
    id: "italy",
    name: "Italy",
    region: "Europe",
    image: "1612698093158-e07ac200d44e",
    blurb: "Cliffside villages and long lunches.",
  },
  {
    id: "greece",
    name: "Greece",
    region: "Europe",
    image: "1580502304784-8985b7eb7260",
    blurb: "Whitewashed islands in the Aegean.",
  },
  {
    id: "iceland",
    name: "Iceland",
    region: "Europe",
    image: "1476610182048-b716b8518aae",
    blurb: "Waterfalls, black sand and aurora skies.",
  },
  {
    id: "peru",
    name: "Peru",
    region: "South America",
    image: "1526392060635-9d6019884377",
    blurb: "Inca stonework above the cloud line.",
  },
  {
    id: "usa",
    name: "United States",
    region: "North America",
    image: "1496588152823-86ff7695e68f",
    blurb: "Skylines, coastlines and Atlantic departures.",
  },
]

export type TripType = "Cultural" | "Beach" | "Adventure" | "Wildlife" | "Cruise"
export const TRIP_TYPES: TripType[] = [
  "Cultural",
  "Beach",
  "Adventure",
  "Wildlife",
  "Cruise",
]

export interface Pkg {
  id: string
  name: string
  country: string
  desc: string
  long: string
  priceFrom: number
  priceTo: number
  rating: number
  reviews: number
  days: number
  type: TripType
  ship?: string
  depPort: string
  destPort: string
  departures: string[]
  image: string
  highlights: string[]
}

export const PACKAGES: Pkg[] = [
  {
    id: "sakura-rail",
    name: "Sakura Rail Journey",
    country: "japan",
    type: "Cultural",
    days: 10,
    desc: "Tokyo to Osaka by rail through the cherry blossom front.",
    long: "Follow the sakura north to south on Japan's famous rail network, with private tea ceremonies, a night in a mountain ryokan and guided walks under the blossoms in Kyoto's Philosopher's Path.",
    priceFrom: 3890,
    priceTo: 4650,
    rating: 4.9,
    reviews: 412,
    depPort: "Tokyo",
    destPort: "Osaka",
    departures: ["2027-03-27", "2027-04-03", "2027-04-10"],
    image: "1624253321171-1be53e12f5f4",
    highlights: [
      "Private tea ceremony in Kyoto",
      "Overnight in a Hakone ryokan",
      "Hanami picnic in Maruyama Park",
      "Rail pass and luggage forwarding",
    ],
  },
  {
    id: "kyoto-retreat",
    name: "Kyoto Temple Retreat",
    country: "japan",
    type: "Cultural",
    days: 7,
    desc: "A quieter week of shrines, gardens and zen cooking.",
    long: "Seven slow days based in a restored machiya townhouse. Dawn meditation at Daitoku-ji, a kaiseki masterclass and a day among the red gates of Fushimi Inari.",
    priceFrom: 2450,
    priceTo: 3100,
    rating: 4.7,
    reviews: 238,
    depPort: "Kyoto",
    destPort: "Kyoto",
    departures: ["2027-05-08", "2027-10-16", "2027-11-13"],
    image: "1558870832-c8db4b5b47d1",
    highlights: [
      "Dawn zen meditation",
      "Kaiseki cooking class",
      "Fushimi Inari sunrise walk",
      "Machiya townhouse stay",
    ],
  },
  {
    id: "amalfi-escape",
    name: "Amalfi Coast Slow Escape",
    country: "italy",
    type: "Beach",
    days: 8,
    desc: "Lemon groves, ferry hops and cliffside villages.",
    long: "Base yourself between Positano and Amalfi with private boat days, a pasta workshop in a family trattoria and an unhurried walk along the Path of the Gods.",
    priceFrom: 2980,
    priceTo: 3790,
    rating: 4.8,
    reviews: 355,
    depPort: "Rome",
    destPort: "Naples",
    departures: ["2027-05-22", "2027-06-12", "2027-09-18"],
    image: "1612698093158-e07ac200d44e",
    highlights: [
      "Private boat day to Capri",
      "Path of the Gods guided hike",
      "Trattoria pasta workshop",
      "Sea-view hotel in Positano",
    ],
  },
  {
    id: "med-grand",
    name: "Mediterranean Grand Cruise",
    country: "italy",
    type: "Cruise",
    ship: "Aurelia Voyager",
    days: 12,
    desc: "Venice to Barcelona with calls at six ports.",
    long: "Twelve nights aboard Aurelia Voyager with calls in Dubrovnik, Valletta, Naples and Marseille. Shore excursions are included at every port.",
    priceFrom: 3350,
    priceTo: 6200,
    rating: 4.6,
    reviews: 521,
    depPort: "Venice",
    destPort: "Barcelona",
    departures: ["2027-06-05", "2027-07-17", "2027-09-04"],
    image: "1583844056361-4418a8f2a985",
    highlights: [
      "Six ports of call",
      "Shore excursion at every stop",
      "Specialty dining credit",
      "Balcony cabins available",
    ],
  },
  {
    id: "aegean-hopper",
    name: "Aegean Island Hopper",
    country: "greece",
    type: "Cruise",
    ship: "Coral Horizon",
    days: 9,
    desc: "Sail from Athens to Santorini via Mykonos and Naxos.",
    long: "A small-ship week among the Cyclades. Swim in hidden coves, watch the Oia sunset from the caldera rim and eat grilled octopus on the quay in Naxos.",
    priceFrom: 2790,
    priceTo: 4300,
    rating: 4.8,
    reviews: 297,
    depPort: "Athens",
    destPort: "Santorini",
    departures: ["2027-05-29", "2027-06-26", "2027-09-11"],
    image: "1580502304784-8985b7eb7260",
    highlights: [
      "Caldera sunset in Oia",
      "Swim stops in private coves",
      "Island wine tasting",
      "Small-ship, 1,200 guests",
    ],
  },
  {
    id: "inca-trail",
    name: "Sacred Valley & Machu Picchu",
    country: "peru",
    type: "Adventure",
    days: 11,
    desc: "Lima, Cusco and the citadel in the clouds.",
    long: "Acclimatise in the Sacred Valley, then take the Vistadome train to Aguas Calientes for a sunrise entry to Machu Picchu with a specialist archaeologist guide.",
    priceFrom: 3250,
    priceTo: 4100,
    rating: 4.9,
    reviews: 468,
    depPort: "Lima",
    destPort: "Cusco",
    departures: ["2027-04-24", "2027-05-15", "2027-08-07"],
    image: "1526392060635-9d6019884377",
    highlights: [
      "Sunrise entry to Machu Picchu",
      "Vistadome rail journey",
      "Pisac market and Ollantaytambo",
      "Archaeologist-led guiding",
    ],
  },
  {
    id: "mara-migration",
    name: "Maasai Mara Great Migration",
    country: "kenya",
    type: "Wildlife",
    days: 9,
    desc: "Tented camps on the plains during river crossings.",
    long: "Timed to the wildebeest crossings, with two private game drives a day, a dawn balloon flight and a visit to a Maasai community conservancy.",
    priceFrom: 4150,
    priceTo: 5900,
    rating: 4.9,
    reviews: 331,
    depPort: "Nairobi",
    destPort: "Nairobi",
    departures: ["2027-07-10", "2027-08-14", "2027-09-04"],
    image: "1535940360221-641a69c43bac",
    highlights: [
      "Two game drives daily",
      "Dawn balloon safari",
      "Luxury tented camp",
      "Conservancy community visit",
    ],
  },
  {
    id: "iceland-aurora",
    name: "Iceland Ring Road & Aurora",
    country: "iceland",
    type: "Adventure",
    days: 8,
    desc: "Waterfalls by day, northern lights by night.",
    long: "Drive the full ring road with a small-group guide: Skógafoss, Jökulsárlón glacier lagoon, black-sand beaches and geothermal soaking every evening.",
    priceFrom: 3450,
    priceTo: 4200,
    rating: 4.7,
    reviews: 276,
    depPort: "Reykjavik",
    destPort: "Reykjavik",
    departures: ["2027-02-06", "2027-03-06", "2027-09-25"],
    image: "1476610182048-b716b8518aae",
    highlights: [
      "Glacier lagoon boat trip",
      "Aurora hunting with a guide",
      "Geothermal pools nightly",
      "Max 14 guests",
    ],
  },
  {
    id: "andaman-escape",
    name: "Andaman Island Escape",
    country: "thailand",
    type: "Beach",
    days: 8,
    desc: "Bangkok street food, then Phuket and Phi Phi by longtail.",
    long: "Two nights in Bangkok for temples and night markets, then island-hopping across Phang Nga Bay with snorkelling stops and a beachfront villa in Phuket.",
    priceFrom: 1890,
    priceTo: 2650,
    rating: 4.5,
    reviews: 612,
    depPort: "Bangkok",
    destPort: "Phuket",
    departures: ["2027-01-23", "2027-02-20", "2027-11-06"],
    image: "1704314838317-460424fd6688",
    highlights: [
      "Bangkok street food evening",
      "Phang Nga Bay longtail day",
      "Snorkelling at Phi Phi",
      "Beachfront villa",
    ],
  },
  {
    id: "reef-cruise",
    name: "Sydney to the Reef",
    country: "australia",
    type: "Cruise",
    ship: "Meridian Star",
    days: 14,
    desc: "Harbour to Great Barrier Reef aboard Meridian Star.",
    long: "Fourteen nights up the east coast with a snorkel and dive programme on the reef, a rainforest train in Cairns and a harbour-view send-off in Sydney.",
    priceFrom: 5200,
    priceTo: 7400,
    rating: 4.8,
    reviews: 189,
    depPort: "Sydney",
    destPort: "Cairns",
    departures: ["2027-03-13", "2027-10-02", "2027-11-20"],
    image: "1624138784614-87fd1b6528f8",
    highlights: [
      "Reef snorkel and dive programme",
      "Daintree rainforest day",
      "Harbour send-off in Sydney",
      "Marine biologist on board",
    ],
  },
  {
    id: "atlantic-crossing",
    name: "Atlantic Crossing: New York to Iceland",
    country: "usa",
    type: "Cruise",
    ship: "Nordic Dawn",
    days: 14,
    desc: "Sail the North Atlantic from Manhattan to Reykjavik.",
    long: "A fourteen-night crossing with calls in Halifax, Greenland's Prince Christian Sound and the Westman Islands. Expedition lectures run daily.",
    priceFrom: 5890,
    priceTo: 9800,
    rating: 4.7,
    reviews: 142,
    depPort: "New York",
    destPort: "Reykjavik",
    departures: ["2027-06-19", "2027-08-21"],
    image: "1496588152823-86ff7695e68f",
    highlights: [
      "Prince Christian Sound transit",
      "Daily expedition lectures",
      "Suites with private verandas",
      "Zodiac landings",
    ],
  },
  {
    id: "bali-terraces",
    name: "Bali Rice Terraces & Temples",
    country: "indonesia",
    type: "Cultural",
    days: 9,
    desc: "Ubud, Sidemen and the east coast without the crowds.",
    long: "Stay in rice-field villas, learn offering-making from a village priest, trek Mount Batur at sunrise and finish with three days of beach in Sanur.",
    priceFrom: 2150,
    priceTo: 3050,
    rating: 4.6,
    reviews: 384,
    depPort: "Denpasar",
    destPort: "Denpasar",
    departures: ["2027-04-17", "2027-07-24", "2027-10-09"],
    image: "1555400038-63f5ba517a47",
    highlights: [
      "Batur sunrise trek",
      "Village priest workshop",
      "Rice-field villa stay",
      "Three beach days in Sanur",
    ],
  },
  {
    id: "pacific-crossing",
    name: "Pacific Crossing: Thailand & Vietnam Cruise",
    country: "thailand",
    type: "Cruise",
    ship: "Navigator of the Seas",
    days: 10,
    desc: "Visit Thailand & Vietnam.",
    long: "A ten-night crossing.",
    priceFrom: 1109,
    priceTo: 9851,
    rating: 4.8,
    reviews: 241,
    depPort: "Singapore",
    destPort: "Singapore",
    departures: ["2027-01-02", "2027-01-11"],
    image: "1496588152823-86ff7695e68f",
    highlights: [
      "The Contrast of Capitals",
      "Cruising the Gulf of Thailand",
      "A Taste of Two Worlds",
      "The Mekong Delta Gateway",
    ],
  },
  {
    id: "5DCY4",
    name: "Voyage Hainan",
    country: "china",
    type: "Cultural",
    days: 5,
    desc: "5D4N direct flight from Kuala Lumpur to Haikou, exploring the tropical beauty of Hainan.",
    long: "Experience the best of Hainan on this 5-day journey. From the luxurious Danzhou Haihua Island and the spiritual Nanshan Cultural Tourism Zone to the Mediterranean vibes of Tianya Town and the historical Qilou Old Street. Highlights include the 108m Guanyin, Li & Miao cultural experiences, an underwater restaurant afternoon tea, and a scenic drive along the Hainan Coastal Highway. Note: Compulsory package (+RM200) for Guanyin of Nanshan + Buggy, 2 shopping stops (Fish Oil & Sea Products, Traditional Herbs/Charcoal).",
    priceFrom: 1699,
    priceTo: 1999,
    rating: 4.7,
    reviews: 128,
    depPort: "Kuala Lumpur (KUL)",
    destPort: "Haikou (HAK)",
    departures: [
      "2027-03-27",
      "2027-04-10",
      "2027-04-17",
      "2027-04-24",
      "2027-05-01",
      "2027-05-08",
      "2027-05-15",
      "2027-05-22",
      "2027-05-29",
    ],
    image: "1563245372-f21724e3856d",
    highlights: [
      "Danzhou Haihua Island & Light Show",
      "Nanshan Cultural Tourism Zone & 108m Guanyin",
      "Tianya Town - The Santorini of Hainan",
      "Binlanggu Valley Li & Miao Cultural Experience",
      "Underwater Restaurant Afternoon Tea",
      "Haikou Qilou Old Street & Coastal Scenic Highway",
    ],
  },
]

export interface Deal {
  id: string
  type: "New user" | "Limited-time" | "Early bird" | "Group discount"
  pkgId: string
  pct: number
  endsAt?: number
  terms: string
}

const now = Date.now()
const H = 3600 * 1000
export const DEALS: Deal[] = [
  {
    id: "d1",
    type: "Limited-time",
    pkgId: "amalfi-escape",
    pct: 20,
    endsAt: now + 53 * H,
    terms:
      "Valid on 2027 departures. Book within the countdown. Not combinable with other deals.",
  },
  {
    id: "d2",
    type: "Limited-time",
    pkgId: "aegean-hopper",
    pct: 18,
    endsAt: now + 9 * H,
    terms: "Cabin categories IA to 2B only. Subject to availability.",
  },
  {
    id: "d3",
    type: "Early bird",
    pkgId: "inca-trail",
    pct: 15,
    endsAt: now + 21 * 24 * H,
    terms: "Pay a 20% deposit today; balance due 90 days before departure.",
  },
  {
    id: "d4",
    type: "Early bird",
    pkgId: "sakura-rail",
    pct: 10,
    endsAt: now + 34 * 24 * H,
    terms:
      "Applies to the April 2027 departures. Free date change up to 60 days out.",
  },
  {
    id: "d5",
    type: "New user",
    pkgId: "bali-terraces",
    pct: 12,
    terms:
      "First booking with a new TravelWithYou account. One use per customer.",
  },
  {
    id: "d6",
    type: "New user",
    pkgId: "kyoto-retreat",
    pct: 10,
    terms:
      "First booking with a new TravelWithYou account. One use per customer.",
  },
  {
    id: "d7",
    type: "Group discount",
    pkgId: "mara-migration",
    pct: 10,
    terms: "Applies when travelling with 6 or more guests on one booking.",
  },
  {
    id: "d8",
    type: "Group discount",
    pkgId: "andaman-escape",
    pct: 12,
    terms: "Applies when travelling with 6 or more guests on one booking.",
  },
]

export interface Cabin {
  type: string
  size: string
  from: number
  note: string
}
export interface Ship {
  id: string
  name: string
  image: string
  gallery: string[]
  capacity: number
  crew: number
  cls: string
  rating: number
  year: number
  overview: string
  amenities: string[]
  cabins: Cabin[]
  decks: { n: string label: string items: string }[]
}

export const SHIPS: Ship[] = [
  {
    id: "aurelia-voyager",
    name: "Aurelia Voyager",
    image: "1559599746-8823b38544c6",
    gallery: [
      "1559599746-8823b38544c6",
      "1562672753-8cccbe9806ce",
      "1579592672790-39239b6cbc31",
      "1599700548547-10a85af5b390",
    ],
    capacity: 2400,
    crew: 980,
    cls: "Grand Class",
    rating: 4.6,
    year: 2019,
    overview:
      "Our flagship Mediterranean liner pairs generous open decks with six restaurants, a 900-seat theatre and a spa that takes up an entire deck.",
    amenities: [
      "Three pools",
      "Six restaurants",
      "Spa and thermal suite",
      "Theatre",
      "Kids club",
      "Fitness studio",
    ],
    cabins: [
      {
        type: "Interior",
        size: "16 m²",
        from: 3350,
        note: "Double bed or twin, walk-in shower",
      },
      {
        type: "Ocean view",
        size: "19 m²",
        from: 3980,
        note: "Picture window, sofa seating",
      },
      {
        type: "Balcony",
        size: "24 m²",
        from: 4900,
        note: "Private veranda, lounge area",
      },
      {
        type: "Suite",
        size: "42 m²",
        from: 6200,
        note: "Butler service, bathtub, priority boarding",
      },
    ],
    decks: [
      {
        n: "Deck 14",
        label: "Sun Deck",
        items: "Infinity pool, adults-only solarium, sky bar",
      },
      {
        n: "Deck 12",
        label: "Wellness",
        items: "Spa, thermal suite, jogging track",
      },
      {
        n: "Deck 8",
        label: "Suites",
        items: "Suite corridor, private lounge, concierge",
      },
      {
        n: "Deck 5",
        label: "Promenade",
        items: "Atrium, theatre, specialty dining, shops",
      },
    ],
  },
  {
    id: "meridian-star",
    name: "Meridian Star",
    image: "1585793753011-397e6e4668d6",
    gallery: [
      "1585793753011-397e6e4668d6",
      "1575110445943-15b543686b56",
      "1562672753-8cccbe9806ce",
      "1579592672790-39239b6cbc31",
    ],
    capacity: 1650,
    crew: 640,
    cls: "Explorer Class",
    rating: 4.8,
    year: 2021,
    overview:
      "Built for the reef and the coast, Meridian Star carries a marine lab, dive platform and a fleet of tenders for easy landings.",
    amenities: [
      "Dive platform",
      "Marine lab",
      "Open-air cinema",
      "Three restaurants",
      "Observation lounge",
      "Plunge pools",
    ],
    cabins: [
      {
        type: "Ocean view",
        size: "20 m²",
        from: 5200,
        note: "Floor-to-ceiling windows",
      },
      {
        type: "Balcony",
        size: "25 m²",
        from: 6100,
        note: "Private veranda, daybed",
      },
      {
        type: "Suite",
        size: "40 m²",
        from: 7400,
        note: "Wraparound balcony, lounge, minibar",
      },
    ],
    decks: [
      {
        n: "Deck 11",
        label: "Observation",
        items: "Panorama lounge, plunge pools, open-air cinema",
      },
      {
        n: "Deck 7",
        label: "Staterooms",
        items: "Balcony and suite cabins, library",
      },
      {
        n: "Deck 3",
        label: "Marina",
        items: "Dive platform, tender bay, marine lab",
      },
    ],
  },
  {
    id: "coral-horizon",
    name: "Coral Horizon",
    image: "1614095557130-2f4a9e1da57d",
    gallery: [
      "1614095557130-2f4a9e1da57d",
      "1599700548547-10a85af5b390",
      "1562672753-8cccbe9806ce",
      "1559599746-8823b38544c6",
    ],
    capacity: 1200,
    crew: 470,
    cls: "Boutique Class",
    rating: 4.8,
    year: 2022,
    overview:
      "A smaller ship that can slip into island harbours the big liners cannot, with a relaxed, sun-first atmosphere and a taverna-style deck kitchen.",
    amenities: [
      "Deck taverna",
      "Two pools",
      "Wine cellar lounge",
      "Yoga lawn",
      "Water-sports marina",
    ],
    cabins: [
      {
        type: "Interior",
        size: "15 m²",
        from: 2790,
        note: "Compact, double or twin",
      },
      { type: "Balcony", size: "22 m²", from: 3500, note: "Private veranda" },
      {
        type: "Suite",
        size: "36 m²",
        from: 4300,
        note: "Sea-view bath, lounge",
      },
    ],
    decks: [
      { n: "Deck 9", label: "Sun Deck", items: "Pools, taverna, yoga lawn" },
      { n: "Deck 6", label: "Cabins", items: "Balcony and suite cabins" },
      {
        n: "Deck 3",
        label: "Marina",
        items: "Water-sports platform, tender access",
      },
    ],
  },
  {
    id: "nordic-dawn",
    name: "Nordic Dawn",
    image: "1617170788899-ef9587d6e63f",
    gallery: [
      "1617170788899-ef9587d6e63f",
      "1688269910608-e3c65eb4ac3a",
      "1579592672790-39239b6cbc31",
      "1575110445943-15b543686b56",
    ],
    capacity: 780,
    crew: 360,
    cls: "Expedition Class",
    rating: 4.7,
    year: 2023,
    overview:
      "An ice-strengthened expedition ship with heated viewing decks, Zodiac landings and a lecture theatre led by working naturalists.",
    amenities: [
      "Heated viewing deck",
      "Zodiac fleet",
      "Lecture theatre",
      "Hot tubs",
      "Sauna",
      "Photography studio",
    ],
    cabins: [
      {
        type: "Balcony",
        size: "26 m²",
        from: 5890,
        note: "Private veranda, heated floors",
      },
      {
        type: "Junior suite",
        size: "34 m²",
        from: 7400,
        note: "Sitting area, bathtub",
      },
      {
        type: "Owner's suite",
        size: "58 m²",
        from: 9800,
        note: "Two balconies, butler, private dining",
      },
    ],
    decks: [
      {
        n: "Deck 8",
        label: "Observation",
        items: "Heated viewing deck, hot tubs, sauna",
      },
      { n: "Deck 5", label: "Suites", items: "Junior and owner's suites" },
      {
        n: "Deck 2",
        label: "Expedition",
        items: "Zodiac bay, boot room, lecture theatre",
      },
    ],
  },
  {
    id: "navigator-of-the-seas",
    name: "Navigator of the Seas",
    image: "1562672753-8cccbe9806ce",
    gallery: [
      "1562672753-8cccbe9806ce",
      "1579592672790-39239b6cbc31",
      "1599700548547-10a85af5b390",
      "1559599746-8823b38544c6",
    ],
    capacity: 3386,
    crew: 1215,
    cls: "Voyager Class",
    rating: 4.5,
    year: 2002,
    overview:
      "An amplified adventure on the high seas, Navigator of the Seas pairs record-breaking thrills with relaxed resort-style vibes. It features the longest waterslide at sea, a revitalized pool deck, and a vibrant Royal Promenade packed with dining and nightlife.",
    amenities: [
      "The Blaster Aqua Coaster",
      "Riptide Mat Racer Waterslide",
      "FlowRider Surf Simulator",
      "Ice Skating Rink",
      "Rock Climbing Wall",
      "Mini Golf",
      "Laser Tag",
      "Casino Royale",
      "The Lime and Coconut Bar",
      "Spa and Fitness Center",
    ],
    cabins: [
      {
        type: "Interior",
        size: "15 m²",
        from: 1109,
        note: "Double bed or twin, walk-in shower",
      },
      {
        type: "Oceanview",
        size: "17 m²",
        from: 1709,
        note: "Picture window, sofa seating",
      },
      {
        type: "Balcony",
        size: "18 m²",
        from: 2179,
        note: "Private veranda, lounge area",
      },
      {
        type: "Suite",
        size: "26 m²",
        from: 4508,
        note: "Butler service, bathtub, priority boarding",
      },
    ],
    decks: [
      {
        n: "Deck 15",
        label: "Sun Deck",
        items: "The Blaster, Riptide, FlowRider, sports court, mini golf",
      },
      {
        n: "Deck 14",
        label: "Pool & Recreation",
        items: "Main pool, solarium, The Lime and Coconut, Windjammer",
      },
      {
        n: "Deck 11",
        label: "Vitality Spa & Fitness",
        items: "Spa, thermal suite, fitness center, jogging track",
      },
      {
        n: "Deck 5",
        label: "Royal Promenade",
        items: "Atrium, shops, Café Promenade, pubs, and lounges",
      },
      {
        n: "Deck 4",
        label: "Entertainment",
        items: "Metropolis Theatre, Casino Royale, main dining room",
      },
    ],
  },
]

export const ADDONS = [
  { id: "insurance", label: "Travel insurance", price: 89 },
  { id: "transfer", label: "Private airport transfers", price: 60 },
  { id: "excursion", label: "Premium excursion pass", price: 140 },
]

export const PROMOS: Record<string, number> = { WELCOME10: 0.1, SUMMER15: 0.15 }
export const TAX_RATE = 0.07

export const MONTHS = (() => {
  const out: { v: string label: string }[] = []
  for (let m = 0; m < 12; m++) {
    const d = new Date(2027, m, 1)
    out.push({
      v: `2027-${String(m + 1).padStart(2, "0")}`,
      label: d.toLocaleString("en-US", { month: "long", year: "numeric" }),
    })
  }
  return out
})()

export const fmt = (n: number) => "$" + Math.round(n).toLocaleString("en-US")
export const fmtDate = (s: string) =>
  new Date(s + "T00:00:00").toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

export const getPkg = (id: string) => PACKAGES.find((p) => p.id === id)
export const getCountry = (id: string) => COUNTRIES.find((c) => c.id === id)!
export const getShip = (name?: string) => SHIPS.find((s) => s.name === name)
export const dealFor = (pkgId: string) => DEALS.find((d) => d.pkgId === pkgId)

export function unitPrice(p: Pkg, pax = 1) {
  const d = dealFor(p.id)
  if (!d) return p.priceFrom
  if (d.type === "Group discount" && pax < 6) return p.priceFrom
  return p.priceFrom * (1 - d.pct / 100)
}

export interface CartItem {
  uid: string
  pkgId: string
  date: string
  pax: number
  addons: string[]
}

export function itemAvailable(it: CartItem) {
  const p = getPkg(it.pkgId)
  return !!p && p.departures.includes(it.date)
}

export function itemTotal(it: CartItem) {
  const p = getPkg(it.pkgId)!
  const add = it.addons.reduce(
    (s, a) => s + (ADDONS.find((x) => x.id === a)?.price ?? 0),
    0,
  )
  return (unitPrice(p, it.pax) + add) * it.pax
}

export interface Booking {
  ref: string
  items: CartItem[]
  total: number
  placed: string
  status: "Upcoming" | "Completed"
}

export const BLOG = [
  {
    id: "sakura-timing",
    title: "When to chase the cherry blossoms in Japan",
    tag: "Japan",
    read: "6 min",
    image: "1558870832-c8db4b5b47d1",
    body: "The blossom front moves north at roughly 25 km a day. Tokyo usually peaks in the last days of March, Kyoto in the first week of April, and Hokkaido in early May. Build a loose itinerary and keep two days of slack: a single rain shower can end peak bloom overnight. Book hotels in Kyoto at least six months out; weekends sell out first.",
  },
  {
    id: "cruise-first",
    title: "Your first cruise: five things nobody tells you",
    tag: "Cruising",
    read: "5 min",
    image: "1559599746-8823b38544c6",
    body: "Pick a deck mid-ship for the least motion. Book specialty dining on day one, not day three. Shore excursions through the ship cost more than independent ones, but they guarantee the ship will wait. Pack a lanyard, a power strip without surge protection (many lines ban surge strips) and a light layer for the air-conditioned theatre.",
  },
  {
    id: "migration",
    title: "Reading the Great Migration like a guide",
    tag: "Africa",
    read: "7 min",
    image: "1535940360221-641a69c43bac",
    body: "The herds reach the Mara River between July and September, but the exact crossings depend on rain in the Serengeti. Guides watch for restless clusters at the bank and the behaviour of the zebra, who tend to lead. Patience matters more than a long lens: sit with one crossing point for a full morning.",
  },
  {
    id: "iceland-winter",
    title: "Iceland in February: what to pack and what to skip",
    tag: "Europe",
    read: "4 min",
    image: "1476610182048-b716b8518aae",
    body: "Bring waterproof outer layers, merino base layers and ice cleats. Skip the heavy snow boots: insulated waterproof hikers with cleats work better on wet black sand. Keep your camera battery in an inside pocket and charge your phone every night; the cold drains both faster than you expect.",
  },
]

export const FAQS = [
  {
    q: "How do I book a tour package?",
    a: "Choose a package, pick a departure date and number of guests, then add it to your cart. Proceed to checkout, enter traveller details and pay by card, PayPal or bank transfer.",
  },
  {
    q: "Can I change the date or number of guests after adding to cart?",
    a: "Yes. Open your cart and edit the date, guest count or add-ons. Prices update instantly. Once a booking is confirmed, changes are handled by our support team.",
  },
  {
    q: "When is the balance due?",
    a: "A 20% deposit confirms most bookings. The balance is due 90 days before departure for land tours and 120 days for cruises.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Free cancellation up to 90 days before departure. Between 89 and 45 days a 30% fee applies, and inside 44 days the booking is non-refundable. See the full policy for details.",
  },
  {
    q: "Do I need travel insurance?",
    a: "We strongly recommend it and offer a comprehensive policy as an add-on at checkout. It is required for expedition cruises.",
  },
  {
    q: "Do you offer group discounts?",
    a: "Yes. Groups of six or more qualify for selected departures. Check the Deals page or contact us for a custom quote.",
  },
]

export const CONTACT = {
  phone: "+1 (800) 555-0142",
  email: "hello@travelwithyou.com",
  address: "48 Harbour Lane, Suite 6, San Francisco, CA 94111",
}
