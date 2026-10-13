import { getCountry, getShip, fmt, fmtDate, type Pkg } from "./data";

type Day = [place: string, activities: string, transport: string];

export const ITINERARIES: Record<string, Day[]> = {
  "sakura-rail": [
    ["Tokyo", "Arrive at Haneda, welcome dinner in Shinjuku", "Private transfer"],
    ["Tokyo", "Senso-ji, Meiji Shrine and Shibuya crossing", "Metro"],
    ["Hakone", "Lake Ashi cruise, Owakudani valley, onsen night at a ryokan", "Rail and ropeway"],
    ["Kanazawa", "Kenroku-en garden and Higashi Chaya district", "Shinkansen"],
    ["Takayama", "Old town walk, morning market, Hida folk village", "Express train"],
    ["Kyoto", "Philosopher's Path blossom walk", "Limited express"],
    ["Kyoto", "Private tea ceremony, Kinkaku-ji, Gion evening stroll", "Private coach"],
    ["Nara", "Todai-ji temple, deer park, hanami picnic", "Local train"],
    ["Osaka", "Osaka Castle and Dotonbori street food tour", "Train"],
    ["Osaka", "Free morning, departure transfer", "Private transfer"],
  ],
  "kyoto-retreat": [
    ["Kyoto", "Arrive, check in to the machiya townhouse, welcome dinner", "Private transfer"],
    ["Kyoto", "Dawn meditation at Daitoku-ji, Nishiki Market lunch", "On foot"],
    ["Fushimi", "Sunrise walk among the red gates of Fushimi Inari", "Local train"],
    ["Kyoto", "Kaiseki cooking masterclass and sake tasting", "On foot"],
    ["Arashiyama", "Bamboo grove, Tenryu-ji garden, river boat", "Tram"],
    ["Nara", "Todai-ji and Kasuga Taisha shrine day trip", "Train"],
    ["Kyoto", "Free morning, farewell lunch, departure", "Private transfer"],
  ],
  "amalfi-escape": [
    ["Rome", "Arrive, evening walk to the Trevi Fountain", "Private transfer"],
    ["Sorrento", "Morning train south, lemon grove visit", "High-speed rail"],
    ["Positano", "Settle in, beach club afternoon", "Private coach"],
    ["Capri", "Private boat day, Blue Grotto and Anacapri", "Private boat"],
    ["Path of the Gods", "Guided cliff hike from Bomerano to Nocelle", "On foot"],
    ["Amalfi", "Cathedral, paper museum and trattoria pasta workshop", "Ferry"],
    ["Ravello", "Villa Cimbrone gardens and a free afternoon", "Local bus"],
    ["Naples", "Pizza lunch in the old town, departure", "Private transfer"],
  ],
  "med-grand": [
    ["Venice", "Embark Aurelia Voyager, sail-away past St Mark's", "Ship"],
    ["At sea", "Spa deck, lectures and specialty dining", "Ship"],
    ["Dubrovnik", "City walls walk and cable car", "Shore excursion coach"],
    ["Kotor", "Old town and bay panorama", "Tender and coach"],
    ["At sea", "Open decks, theatre evening", "Ship"],
    ["Valletta", "Upper Barrakka gardens and Mdina", "Shore excursion coach"],
    ["At sea", "Leisure day on board", "Ship"],
    ["Naples", "Pompeii guided visit", "Shore excursion coach"],
    ["Civitavecchia", "Rome highlights day", "Shore excursion coach"],
    ["Livorno", "Pisa and Florence options", "Shore excursion coach"],
    ["Marseille", "Old Port and Notre-Dame de la Garde", "Shore excursion coach"],
    ["Barcelona", "Disembark after breakfast", "Ship"],
  ],
  "aegean-hopper": [
    ["Athens", "Embark Coral Horizon at Piraeus, Acropolis sunset option", "Ship"],
    ["Syros", "Ermoupoli neoclassical town and loukoumi tasting", "Ship and on foot"],
    ["Mykonos", "Windmills, Little Venice and beach swim stop", "Tender"],
    ["Delos", "Guided tour of the sacred island ruins", "Small boat"],
    ["Naxos", "Portara gate, grilled octopus on the quay", "Ship"],
    ["Paros", "Naoussa harbour and cove swim", "Ship"],
    ["Milos", "Sarakiniko moonscape and boat swim", "Tender"],
    ["Santorini", "Caldera cruise, Oia sunset and island wine tasting", "Ship and coach"],
    ["Santorini", "Disembark, transfer to the airport", "Private transfer"],
  ],
  "inca-trail": [
    ["Lima", "Arrive, ceviche dinner in Barranco", "Private transfer"],
    ["Lima", "Historic centre and Larco Museum", "Private car"],
    ["Cusco", "Fly to Cusco, rest and acclimatise", "Domestic flight"],
    ["Cusco", "Cathedral, Qorikancha and San Blas", "On foot"],
    ["Sacred Valley", "Pisac market and Ollantaytambo fortress", "Private coach"],
    ["Sacred Valley", "Maras salt pans and Moray terraces", "Private coach"],
    ["Aguas Calientes", "Vistadome rail journey, evening in the village", "Vistadome train"],
    ["Machu Picchu", "Sunrise entry, guided tour with an archaeologist", "Shuttle bus"],
    ["Cusco", "Return by train, free afternoon", "Train"],
    ["Cusco", "Rainbow Mountain option or cooking class", "Coach"],
    ["Cusco", "Departure transfer", "Private transfer"],
  ],
  "mara-migration": [
    ["Nairobi", "Arrive, briefing dinner", "Private transfer"],
    ["Maasai Mara", "Fly into the Mara, first afternoon game drive", "Light aircraft"],
    ["Maasai Mara", "Morning and afternoon game drives", "Safari vehicle"],
    ["Maasai Mara", "Dawn balloon flight and champagne breakfast", "Hot-air balloon"],
    ["Mara River", "Full day at the river crossing points", "Safari vehicle"],
    ["Maasai Mara", "Conservancy community visit and bush walk", "Safari vehicle"],
    ["Maasai Mara", "Two game drives, sundowners on the plains", "Safari vehicle"],
    ["Maasai Mara", "Morning drive, fly back to Nairobi", "Light aircraft"],
    ["Nairobi", "Giraffe Centre visit, departure", "Private transfer"],
  ],
  "iceland-aurora": [
    ["Reykjavik", "Arrive, Blue Lagoon soak", "Private transfer"],
    ["South Coast", "Seljalandsfoss and Skogafoss waterfalls", "Minibus"],
    ["Vik", "Reynisfjara black sand beach, Dyrholaey cliffs", "Minibus"],
    ["Jokulsarlon", "Glacier lagoon boat trip and Diamond Beach", "Minibus"],
    ["East Fjords", "Fjord drive and Seydisfjordur village", "Minibus"],
    ["Lake Myvatn", "Geothermal fields, Godafoss, aurora hunt", "Minibus"],
    ["Akureyri", "Whale watching option, drive to Borgarnes", "Minibus"],
    ["Reykjavik", "Golden Circle highlights, departure", "Minibus and transfer"],
  ],
  "andaman-escape": [
    ["Bangkok", "Arrive, Chinatown street food evening", "Private transfer"],
    ["Bangkok", "Grand Palace, Wat Pho, longtail canal ride", "Boat and tuk-tuk"],
    ["Phuket", "Fly south, check in to beachfront villa", "Domestic flight"],
    ["Phang Nga Bay", "Longtail island hopping, James Bond Island", "Longtail boat"],
    ["Phi Phi Islands", "Snorkelling at Maya Bay and Pileh Lagoon", "Speedboat"],
    ["Phuket", "Big Buddha, Old Town and Thai cooking class", "Private car"],
    ["Phuket", "Free beach day, optional spa", "None"],
    ["Phuket", "Departure transfer", "Private transfer"],
  ],
  "reef-cruise": [
    ["Sydney", "Embark Meridian Star, harbour sail-away", "Ship"],
    ["At sea", "Marine biologist lecture, observation lounge", "Ship"],
    ["Coffs Harbour", "Big Banana and coastal walk option", "Tender"],
    ["Byron Bay", "Cape Byron lighthouse walk", "Tender"],
    ["Brisbane", "Lone Pine koala sanctuary", "Shore excursion coach"],
    ["At sea", "Leisure day on board", "Ship"],
    ["Airlie Beach", "Whitsunday Islands and Whitehaven Beach", "Catamaran"],
    ["Whitsundays", "Snorkel and dive programme", "Dive platform"],
    ["At sea", "Reef talk and open-air cinema", "Ship"],
    ["Townsville", "Magnetic Island koala trail", "Ferry"],
    ["Great Barrier Reef", "Full day on the outer reef", "Reef vessel"],
    ["Cairns", "Daintree rainforest day", "Coach"],
    ["Cairns", "Kuranda scenic railway option", "Scenic rail"],
    ["Cairns", "Disembark, departure transfer", "Ship and transfer"],
  ],
  "atlantic-crossing": [
    ["New York", "Embark Nordic Dawn, Manhattan skyline sail-away", "Ship"],
    ["At sea", "Expedition briefing and lectures", "Ship"],
    ["At sea", "Seabird watching from the heated deck", "Ship"],
    ["Halifax", "Peggy's Cove and waterfront", "Shore excursion coach"],
    ["At sea", "Photography workshop", "Ship"],
    ["At sea", "Leisure day, sauna and hot tubs", "Ship"],
    ["At sea", "Greenland approach lectures", "Ship"],
    ["Prince Christian Sound", "Scenic cruising among glaciers", "Ship"],
    ["Qaqortoq", "Zodiac landing and town walk", "Zodiac"],
    ["At sea", "Denmark Strait crossing", "Ship"],
    ["Isafjordur", "Westfjords hike", "Zodiac and on foot"],
    ["Heimaey", "Westman Islands puffin colonies", "Zodiac"],
    ["At sea", "Farewell dinner", "Ship"],
    ["Reykjavik", "Disembark after breakfast", "Ship"],
  ],
  "bali-terraces": [
    ["Ubud", "Arrive, rice-field villa check-in", "Private transfer"],
    ["Ubud", "Tegallalang terraces and Tirta Empul water temple", "Private car"],
    ["Ubud", "Village priest offering workshop, Monkey Forest", "On foot"],
    ["Mount Batur", "Pre-dawn sunrise trek and hot springs", "Jeep and on foot"],
    ["Sidemen", "Weaving village and valley walk", "Private car"],
    ["Tirta Gangga", "Water palace and Lempuyang gate", "Private car"],
    ["Sanur", "Transfer to the coast, beach afternoon", "Private car"],
    ["Sanur", "Snorkel trip to Nusa Penida option", "Fast boat"],
    ["Sanur", "Departure transfer", "Private transfer"],
  ],
  "pacific-crossing": [
    ["Singapore", "Embark Navigator of the Seas at Marina Bay, sail-away past the skyline", "Ship"],
    ["At sea", "South China Sea crossing, onboard lectures and spa deck", "Ship"],
    ["Ho Chi Minh City (Phu My)", "Mekong Delta gateway, city highlights and street food", "Shore excursion coach"],
    ["At sea", "Cruising the Gulf of Thailand, leisure day on board", "Ship"],
    ["Bangkok (Laem Chabang)", "Grand Palace, Wat Pho and canal ride", "Shore excursion coach"],
    ["Bangkok (Laem Chabang)", "Floating market or free day in the city", "Shore excursion coach"],
    ["At sea", "Open decks, cooking demonstration and theatre evening", "Ship"],
    ["At sea", "Leisure day, pool deck and specialty dining", "Ship"],
    ["Langkawi", "Sky Bridge cable car and mangrove boat tour", "Tender and coach"],
    ["At sea", "Farewell dinner and captain's reception", "Ship"],
    ["Singapore", "Disembark after breakfast", "Ship"],
  ],
  "5DCY4": [
    ["Kuala Lumpur / Haikou", "Depart from KLIA to Haikou. Transfer to Danzhou Haihua Island. Check-in Castle Hotel. Visit Ming Qing Food Street (dinner at own expense) and watch the Wedding Manor light show.", "Flight OD614, Shuttle Bus"],
    ["Danzhou / Sanya", "Nanshan Cultural Tourism Zone + Buggy ride, 108m Guanyin, free 'Nanshan As You Wish' show. Visit Tianya Town (Santorini of Hainan).", "Coach"],
    ["Sanya", "Binlanggu Valley Li & Miao Cultural Area + Buggy ride. Luhuitou Peak Park. Underwater Restaurant Afternoon Tea. Popular Night Market.", "Coach"],
    ["Sanya / Haikou", "Scenic drive along Hainan Coastal Scenic Highway. Visit Haikou Qilou Old Street, Tianhou Palace, Intangible Cultural Heritage Museum, Haikou Clock Tower, and Wanlvyuan Park.", "Coach"],
    ["Haikou / Kuala Lumpur", "Free time until transfer to Haikou Meilan International Airport for flight home.", "Flight OD615, Private transfer"],
  ],
};

export const INCLUDED_BASE = [
  "Accommodation as listed in the itinerary",
  "Daily breakfast",
  "English-speaking local guides",
  "Ground transport listed in the itinerary",
  "Entrance fees for listed sightseeing",
  "24/7 support line during your trip",
];
export const EXCLUDED_BASE = [
  "International flights to and from the start point",
  "Visas and passport fees",
  "Travel insurance (available as an add-on)",
  "Meals not mentioned in the itinerary",
  "Personal expenses and gratuities",
];

export function getIncluded(p: Pkg) {
  if (p.type === "Cruise") return ["Cabin accommodation in your chosen category", "Full-board dining in main restaurants", "Onboard entertainment, lectures and activities", "Port taxes and fees", "Shore excursions as listed", "24/7 support line during your trip"];
  if (p.type === "Wildlife") return [...INCLUDED_BASE, "Park and conservancy fees", "Daily game drives", "Internal flights listed"];
  return [...INCLUDED_BASE, "Airport arrival and departure transfers on day 1 and last day"].slice(0, 7);
}
export function getExcluded(p: Pkg) {
  if (p.type === "Cruise") return ["International flights to and from the ports", "Visas and passport fees", "Travel insurance (available as an add-on)", "Drinks packages and specialty dining beyond credit", "Gratuities (suggested $16 per guest per day)", "Spa treatments and personal expenses"];
  return EXCLUDED_BASE;
}

export const asciiSafe = (s: string) => s.replace(/[–—]/g, "-").replace(/→/g, "->").replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/[^\x20-\x7E]/g, "");

/* ---- minimal PDF writer ---- */
export function buildPackagePdf(p: Pkg): Blob {
  const lines: { t: string; b?: boolean; s?: number }[] = [];
  const wrap = (text: string, n = 88) => {
    const out: string[] = [];
    let cur = "";
    for (const w of asciiSafe(text).split(" ")) {
      if ((cur + " " + w).trim().length > n) { out.push(cur); cur = w; } else cur = (cur + " " + w).trim();
    }
    if (cur) out.push(cur);
    return out;
  };
  const add = (t: string, o: { b?: boolean; s?: number } = {}) => wrap(t).forEach((l) => lines.push({ t: l, ...o }));
  const gap = () => lines.push({ t: "" });
  const ship = getShip(p.ship);

  add("TravelWithYou", { b: true, s: 12 });
  add(p.name, { b: true, s: 22 });
  add(`${getCountry(p.country).name} | ${p.type} | ${p.days} days | ${p.depPort} to ${p.destPort}`);
  add(`From ${fmt(p.priceFrom)} per person | Rated ${p.rating}/5 (${p.reviews} reviews)`);
  gap();
  add(p.long);
  gap();
  add("Departure dates", { b: true, s: 14 });
  add(p.departures.map(fmtDate).join(", "));
  gap();
  add("Highlights", { b: true, s: 14 });
  p.highlights.forEach((h) => add("- " + h));
  gap();
  add("Daily trip plan", { b: true, s: 14 });
  (ITINERARIES[p.id] ?? []).forEach(([pl, act, tr], i) => {
    add(`Day ${i + 1} - ${pl}`, { b: true });
    add(act);
    add(`Transport: ${tr}`);
  });
  gap();
  add("Included", { b: true, s: 14 });
  getIncluded(p).forEach((x) => add("- " + x));
  gap();
  add("Not included", { b: true, s: 14 });
  getExcluded(p).forEach((x) => add("- " + x));
  if (ship) {
    gap();
    add(`Room types aboard ${ship.name}`, { b: true, s: 14 });
    ship.cabins.forEach((c) => add(`- ${c.type} (${c.size}), from ${fmt(c.from)}: ${c.note}`));
  }
  gap();
  add("Prices are per person and subject to availability. See travelwithyou.com for full terms.", { s: 9 });

  const perPage = 46;
  const pages: typeof lines[] = [];
  for (let i = 0; i < lines.length; i += perPage) pages.push(lines.slice(i, i + perPage));
  const esc = (s: string) => s.replace(/[\\()]/g, "\\$&");
  const objs: string[] = [];
  const pageIds = pages.map((_, i) => 5 + i * 2);
  objs[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objs[2] = `<< /Type /Pages /Kids [${pageIds.map((i) => `${i} 0 R`).join(" ")}] /Count ${pages.length} >>`;
  objs[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";
  objs[4] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>";
  pages.forEach((pg, i) => {
    let y = 750;
    let c = "";
    pg.forEach((l) => {
      const s = l.s ?? 10.5;
      if (l.t) c += `BT /${l.b ? "F2" : "F1"} ${s} Tf 50 ${y} Td (${esc(l.t)}) Tj ET\n`;
      y -= s + 4.5;
    });
    objs[5 + i * 2] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${6 + i * 2} 0 R >>`;
    objs[6 + i * 2] = `<< /Length ${c.length} >>\nstream\n${c}endstream`;
  });
  let out = "%PDF-1.4\n";
  const offs: number[] = [];
  for (let i = 1; i < objs.length; i++) { offs[i] = out.length; out += `${i} 0 obj\n${objs[i]}\nendobj\n`; }
  const xref = out.length;
  out += `xref\n0 ${objs.length}\n0000000000 65535 f \n`;
  for (let i = 1; i < objs.length; i++) out += `${String(offs[i]).padStart(10, "0")} 00000 n \n`;
  out += `trailer\n<< /Size ${objs.length} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return new Blob([out], { type: "application/pdf" });
}
