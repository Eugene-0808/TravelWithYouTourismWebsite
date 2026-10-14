import { useEffect, useMemo, useState } from "react"
import {
  ArrowRight,
  ArrowLeft,
  Anchor,
  Check,
  Heart,
  Minus,
  Plus,
  Users,
  Calendar,
  Ship as ShipIcon,
  X,
  FileText,
  Download,
  Eye,
  Bus,
} from "lucide-react"
import { Link, navigate, useStore, EMPTY_FILTERS } from "./store"
import {
  ITINERARIES,
  buildPackagePdf,
  getExcluded,
  getIncluded,
} from "./packageContent"
import {
  ADDONS,
  BLOG,
  COUNTRIES,
  DEALS,
  MONTHS,
  PACKAGES,
  REGIONS,
  SHIPS,
  dealFor,
  fareFor,
  fareUnitPrice,
  fmt,
  fmtDate,
  getCountry,
  getPkg,
  getShip,
  img,
  unitPrice,
} from "./data"
import {
  Countdown,
  PackageCard,
  PageHead,
  SearchBar,
  SectionTitle,
  Stars,
  Wrap,
  btnGhost,
  btnPrimary,
  input,
  label,
  matches,
} from "./ui"

/* ================= HOME ================= */
const SLIDES = [
  {
    img: "1612698093158-e07ac200d44e",
    kicker: "Limited-time · 20% off",
    title: "Amalfi, unhurried.",
    sub: "Eight days of lemon groves and boat days on the Italian coast.",
    cta: "Book Now",
    to: "/package/amalfi-escape",
    end: DEALS[0].endsAt,
  },
  {
    img: "1614095557130-2f4a9e1da57d",
    kicker: "New ship · Coral Horizon",
    title: "Sail the Cyclades.",
    sub: "A boutique ship for hidden harbours, from Athens to Santorini.",
    cta: "Explore Ships",
    to: "/ships/coral-horizon",
  },
  {
    img: "1526392060635-9d6019884377",
    kicker: "Early bird · 15% off",
    title: "Above the cloud line.",
    sub: "Machu Picchu at sunrise with an archaeologist at your side.",
    cta: "View Deal",
    to: "/deals",
    end: DEALS[2].endsAt,
  },
  {
    img: "1535940360221-641a69c43bac",
    kicker: "Group discount · 10% off",
    title: "The Great Migration.",
    sub: "Tented camps on the Mara. Bring five friends and save.",
    cta: "View Deal",
    to: "/deals",
  },
]

function Hero() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setI((x) => (x + 1) % SLIDES.length), 7000)
    return () => clearTimeout(t)
  }, [i])
  const s = SLIDES[i]
  return (
    <section
      className="relative h-[calc(100svh-7rem)] min-h-[540px] overflow-hidden bg-ink text-white xl:h-[calc(100svh-4rem)]"
      aria-roledescription="carousel"
    >
      {SLIDES.map((sl, k) => (
        <div
          key={k}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            k === i ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={k !== i}
        >
          <img
            src={img(sl.img, 1800, 1100)}
            alt=""
            className={`h-full w-full object-cover ${
              k === i ? "kenburns" : ""
            }`}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-ink/20" />
      <button
        onClick={() => setI((i + SLIDES.length - 1) % SLIDES.length)}
        aria-label="Previous offer"
        className="absolute left-2 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center border border-white/70 bg-ink/60 text-white backdrop-blur hover:bg-white hover:text-ink sm:left-5 sm:size-12"
      >
        <ArrowLeft size={20} />
      </button>
      <button
        onClick={() => setI((i + 1) % SLIDES.length)}
        aria-label="Next offer"
        className="absolute right-2 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center border border-white/70 bg-ink/60 text-white backdrop-blur hover:bg-white hover:text-ink sm:right-5 sm:size-12"
      >
        <ArrowRight size={20} />
      </button>
      <Wrap className="relative flex h-full flex-col justify-end px-14 pb-24 sm:px-8 sm:pb-28">
        <div key={i} className="fade-up max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#ffb596]">
            {s.kicker}
          </p>
          <h1 className="mt-4 font-display text-5xl font-medium leading-[0.98] sm:text-7xl lg:text-8xl">
            {s.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/85">{s.sub}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link to={s.to} className={btnPrimary}>
              {s.cta} <ArrowRight size={16} />
            </Link>
            <Link
              to="/deals"
              className="inline-flex items-center border border-white/60 px-5 py-3 text-sm font-semibold hover:bg-white hover:text-ink"
            >
              All deals
            </Link>
          </div>
        </div>
        <div
          className="absolute bottom-8 right-5 flex items-center gap-4 sm:right-8"
          role="group"
          aria-label="Choose offer"
        >
          <div className="flex gap-2">
            {SLIDES.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                aria-label={`Show offer ${k + 1}`}
                className={`h-1 transition-all ${
                  k === i
                    ? "w-10 bg-[#ff8a5f]"
                    : "w-5 bg-white/50 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>
      </Wrap>
    </section>
  )
}

const TRENDING = [
  { l: "Cherry blossom", q: "sakura" },
  { l: "Mediterranean cruise", q: "Mediterranean" },
  { l: "Safari", q: "Wildlife" },
  { l: "Beach under $3,500", q: "Beach", f: { price: "2-3.5" } },
  { l: "Northern lights", q: "aurora" },
  { l: "Greek islands", q: "Greece" },
]

export function Home() {
  const { setFilters } = useStore()
  const popular = [...PACKAGES]
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 6)
  const run = (t: typeof TRENDING[number]) => {
    setFilters({ ...EMPTY_FILTERS, q: t.q, ...("f" in t ? t.f : {}) })
    navigate("/search")
  }
  return (
    <>
      <Hero />
      <Wrap className="relative z-10 -mt-14">
        <SearchBar
          onSearch={(f) => {
            setFilters(f)
            navigate("/search")
          }}
        />
      </Wrap>

      <Wrap className="mt-24">
        <SectionTitle
          n="01"
          title="Most popular trips"
          action={
            <Link
              to="/destinations"
              className="hidden text-sm font-semibold underline-offset-4 hover:underline sm:block"
            >
              All destinations →
            </Link>
          }
        />
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.16em] text-mute">
            Trending searches
          </span>
          {TRENDING.map((t) => (
            <button
              key={t.l}
              onClick={() => run(t)}
              className="border border-line bg-card px-3 py-1.5 text-sm hover:border-ink hover:bg-ink hover:text-paper"
            >
              {t.l}
            </button>
          ))}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((p) => (
            <PackageCard key={p.id} p={p} />
          ))}
        </div>
      </Wrap>

      <Wrap className="mt-24">
        <SectionTitle n="02" title="Where to next" />
        <div className="grid gap-4 md:grid-cols-12 md:grid-rows-2">
          {[COUNTRIES[0], COUNTRIES[5], COUNTRIES[8], COUNTRIES[4]].map(
            (c, k) => (
              <Link
                key={c.id}
                to={`/destinations/${c.id}`}
                className={`group relative block overflow-hidden bg-sea ${
                  k === 0
                    ? "min-h-80 md:col-span-7 md:row-span-2"
                    : k === 1
                      ? "min-h-64 md:col-span-5"
                      : k === 2
                        ? "min-h-64 md:col-span-3"
                        : "min-h-64 md:col-span-2"
                }`}
              >
                <img
                  src={img(c.image, 1000, 1000)}
                  alt={c.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                <div className="absolute bottom-0 p-5 text-white">
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/80">
                    {c.region}
                  </div>
                  <div className="font-display text-3xl">{c.name}</div>
                </div>
              </Link>
            ),
          )}
        </div>
      </Wrap>

      <section className="mt-24 bg-ink py-20 text-paper">
        <Wrap>
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-5">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff8a5f]">
                The fleet
              </p>
              <h2 className="mt-3 font-display text-4xl font-medium leading-tight sm:text-5xl">
                Four ships, four characters.
              </h2>
              <p className="mt-4 text-paper/75">
                From a 780-guest expedition vessel to a 2,400-guest
                Mediterranean flagship, there is a deck plan for every kind of
                traveller.
              </p>
              <Link
                to="/ships"
                className="mt-6 inline-flex items-center gap-2 border border-paper px-5 py-3 text-sm font-semibold hover:bg-paper hover:text-ink"
              >
                Explore Ships <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 md:col-span-7">
              {SHIPS.map((s) => (
                <Link key={s.id} to={`/ships/${s.id}`} className="group block">
                  <div className="aspect-[4/3] overflow-hidden bg-sea">
                    <img
                      src={img(s.image, 600, 450)}
                      alt={s.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-2 font-display text-xl">{s.name}</div>
                  <div className="font-mono text-[11px] uppercase tracking-widest text-paper/60">
                    {s.cls}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Wrap>
      </section>

      <Wrap className="mt-24">
        <SectionTitle
          n="03"
          title="Travel guides"
          action={
            <Link
              to="/blog"
              className="text-sm font-semibold underline-offset-4 hover:underline"
            >
              All guides →
            </Link>
          }
        />
        <div className="grid gap-6 md:grid-cols-3">
          {BLOG.slice(0, 3).map((b) => (
            <Link key={b.id} to={`/blog/${b.id}`} className="group block">
              <div className="aspect-[3/2] overflow-hidden bg-sea/30">
                <img
                  src={img(b.image, 700, 470)}
                  alt={b.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-vermilion">
                {b.tag} · {b.read}
              </div>
              <h3 className="mt-1 font-display text-2xl leading-snug group-hover:underline">
                {b.title}
              </h3>
            </Link>
          ))}
        </div>
      </Wrap>
    </>
  )
}

/* ================= SEARCH RESULTS ================= */
export function SearchResults() {
  const { filters, setFilters } = useStore()
  const res = useMemo(
    () => PACKAGES.filter((p) => matches(p, filters)),
    [filters],
  )
  return (
    <>
      <PageHead
        kicker="Search results"
        title={filters.q ? `Results for “${filters.q}”` : "Find your trip"}
      >
        {res.length} {res.length === 1 ? "trip matches" : "trips match"} your
        filters.
      </PageHead>
      <Wrap className="py-10">
        <SearchBar
          key={JSON.stringify(filters)}
          initial={filters}
          onSearch={setFilters}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {res.map((p) => (
            <PackageCard key={p.id} p={p} />
          ))}
        </div>
        {res.length === 0 && (
          <div className="mt-12 border border-dashed border-ink/40 p-12 text-center">
            <p className="font-display text-3xl">
              No trips match those filters.
            </p>
            <button
              onClick={() => setFilters(EMPTY_FILTERS)}
              className={`${btnGhost} mt-6`}
            >
              Clear filters
            </button>
          </div>
        )}
      </Wrap>
    </>
  )
}

/* ================= DESTINATIONS ================= */
export function Destinations({ region }: { region?: string }) {
  const regions = region ? REGIONS.filter((r) => r === region) : REGIONS
  return (
    <>
      <PageHead
        kicker="Destinations"
        title={region ? region : "Ten countries, six regions."}
      >
        Choose a country to see every tour package we run there.
      </PageHead>
      <Wrap className="py-10">
        <div
          className="flex flex-wrap gap-2 border-b border-line pb-6"
          role="tablist"
        >
          <Link
            to="/destinations"
            className={`border px-4 py-2 text-sm font-semibold ${
              !region
                ? "border-ink bg-ink text-paper"
                : "border-line hover:border-ink"
            }`}
          >
            All
          </Link>
          {REGIONS.map((r) => (
            <Link
              key={r}
              to={`/destinations/region/${r}`}
              className={`border px-4 py-2 text-sm font-semibold ${
                region === r
                  ? "border-ink bg-ink text-paper"
                  : "border-line hover:border-ink"
              }`}
            >
              {r}
            </Link>
          ))}
        </div>
        {regions.map((r) => (
          <section key={r} className="mt-12">
            <h2 className="mb-6 flex items-baseline gap-3 font-display text-3xl">
              {r}
              <span className="font-mono text-xs text-mute">
                {COUNTRIES.filter((c) => c.region === r).length} countries
              </span>
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {COUNTRIES.filter((c) => c.region === r).map((c) => {
                const pk = PACKAGES.filter((p) => p.country === c.id)
                return (
                  <Link
                    key={c.id}
                    to={`/destinations/${c.id}`}
                    className="group border border-line bg-card transition-shadow hover:shadow-[6px_6px_0_0_var(--color-ink)]"
                  >
                    <div className="aspect-[3/2] overflow-hidden bg-sea/30">
                      <img
                        src={img(c.image, 800, 540)}
                        alt={c.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex items-end justify-between p-5">
                      <div>
                        <h3 className="font-display text-2xl">{c.name}</h3>
                        <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-mute">
                          {pk.length} {pk.length === 1 ? "package" : "packages"}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-[10px] uppercase tracking-widest text-mute">
                          From
                        </div>
                        <div className="font-display text-xl">
                          {fmt(Math.min(...pk.map((p) => p.priceFrom)))}
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        ))}
      </Wrap>
    </>
  )
}

export function CountryPage({ id }: { id: string }) {
  const c = COUNTRIES.find((x) => x.id === id)
  const [sort, setSort] = useState("rating")
  const [month, setMonth] = useState("")
  const [dur, setDur] = useState("")
  const [maxP, setMaxP] = useState("")
  if (!c) return <NotFound />
  let list = PACKAGES.filter((p) => p.country === id)
  list = list.filter(
    (p) =>
      (!month || p.departures.some((d) => d.startsWith(month))) &&
      (!maxP || p.priceFrom <= +maxP) &&
      (!dur || (dur === "short" ? p.days <= 9 : p.days >= 10)),
  )
  list = [...list].sort((a, b) =>
    sort === "price-asc"
      ? a.priceFrom - b.priceFrom
      : sort === "price-desc"
        ? b.priceFrom - a.priceFrom
        : sort === "duration"
          ? a.days - b.days
          : b.rating - a.rating,
  )
  return (
    <>
      <section className="relative h-[46vh] min-h-72 bg-ink text-white">
        <img
          src={img(c.image, 1800, 800)}
          alt={c.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 to-ink/10" />
        <Wrap className="relative flex h-full flex-col justify-end pb-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#ffb596]">
            <Link to="/destinations" className="hover:underline">
              Destinations
            </Link>{" "}
            /{" "}
            <Link
              to={`/destinations/region/${c.region}`}
              className="hover:underline"
            >
              {c.region}
            </Link>
          </p>
          <h1 className="mt-2 font-display text-6xl font-medium sm:text-7xl">
            {c.name}
          </h1>
          <p className="mt-2 max-w-lg text-lg text-white/85">{c.blurb}</p>
        </Wrap>
      </section>
      <Wrap className="py-10">
        <div className="grid grid-cols-2 gap-4 border border-line bg-card p-5 md:grid-cols-4">
          <label>
            <span className={label}>Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className={input}
            >
              <option value="rating">Rating</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="duration">Duration</option>
            </select>
          </label>
          <label>
            <span className={label}>Departure month</span>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className={input}
            >
              <option value="">Any</option>
              {MONTHS.map((m) => (
                <option key={m.v} value={m.v}>
                  {m.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className={label}>Duration</span>
            <select
              value={dur}
              onChange={(e) => setDur(e.target.value)}
              className={input}
            >
              <option value="">Any</option>
              <option value="short">Up to 9 days</option>
              <option value="long">10+ days</option>
            </select>
          </label>
          <label>
            <span className={label}>Max price</span>
            <select
              value={maxP}
              onChange={(e) => setMaxP(e.target.value)}
              className={input}
            >
              <option value="">Any</option>
              <option value="2500">$2,500</option>
              <option value="3500">$3,500</option>
              <option value="5000">$5,000</option>
            </select>
          </label>
        </div>
        <p className="mb-6 mt-8 font-mono text-xs uppercase tracking-widest text-mute">
          {list.length} tour {list.length === 1 ? "package" : "packages"} in{" "}
          {c.name}
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <PackageCard key={p.id} p={p} showCountry={false} />
          ))}
        </div>
        {list.length === 0 && (
          <p className="border border-dashed border-ink/40 p-10 text-center font-display text-2xl">
            No packages match those filters.
          </p>
        )}
      </Wrap>
    </>
  )
}

/* ================= PACKAGE DETAIL ================= */
export function PackageDetail({ id }: { id: string }) {
  const p = getPkg(id)
  const { addToCart, wishlist, toggleWish } = useStore()
  const [date, setDate] = useState(p?.departures[0] ?? "")
  const [pax, setPax] = useState(2)
  const [adds, setAdds] = useState<string[]>([])
  const [pdfUrl, setPdfUrl] = useState("")
  const [cabin, setCabin] = useState("")
  useEffect(
    () => () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl)
    },
    [pdfUrl],
  )
  if (!p) return <NotFound />
  const fileName = `${p.id}-TravelWithYou.pdf`
  const preview = () => setPdfUrl(URL.createObjectURL(buildPackagePdf(p)))
  const download = () => {
    const u = URL.createObjectURL(buildPackagePdf(p))
    const a = document.createElement("a")
    a.href = u
    a.download = fileName
    a.click()
    setTimeout(() => URL.revokeObjectURL(u), 1000)
  }
  const c = getCountry(p.country)
  const deal = dealFor(p.id)
  const addPrice = adds.reduce(
    (s, a) => s + ADDONS.find((x) => x.id === a)!.price,
    0,
  )
  const ship = getShip(p.ship)
  const cab =
    p.type === "Cruise" && ship
      ? ship.cabins.some((c) => c.type === cabin)
        ? cabin
        : ship.cabins[0].type
      : undefined
  const unit = unitPrice(p, pax, date, cab)
  const total = (unit + addPrice) * pax

  return (
    <>
      <Wrap className="pt-8">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-mute">
          <Link to="/destinations" className="hover:text-ink">
            Destinations
          </Link>{" "}
          /{" "}
          <Link to={`/destinations/${c.id}`} className="hover:text-ink">
            {c.name}
          </Link>{" "}
          / {p.name}
        </p>
      </Wrap>
      <Wrap className="mt-6 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="aspect-[16/11] overflow-hidden bg-sea/30">
            <img
              src={img(p.image, 1400, 960)}
              alt={p.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-[0.16em] text-mute">
            <span className="border border-line px-2 py-1">{p.type}</span>
            <span>{p.days} days</span>
            <span>
              {p.depPort} → {p.destPort}
            </span>
            <Stars value={p.rating} count={p.reviews} />
          </div>
          <h1 className="mt-4 font-display text-4xl font-medium leading-tight sm:text-6xl">
            {p.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mute">
            {p.long}
          </p>
          <h2 className="mt-10 border-b border-ink pb-2 font-display text-2xl">
            Highlights
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {p.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-sm">
                <Check size={18} className="mt-0.5 shrink-0 text-vermilion" />
                {h}
              </li>
            ))}
          </ul>
          <h2 className="mt-12 border-b border-ink pb-2 font-display text-2xl">
            Daily trip plan
          </h2>
          <ol className="mt-2">
            {(ITINERARIES[p.id] ?? []).map(([place, act, tr], k) => (
              <li
                key={k}
                className="grid grid-cols-[3.5rem_1fr] gap-4 border-b border-line py-4 last:border-0"
              >
                <div className="font-mono text-xs uppercase tracking-widest text-vermilion">
                  Day
                  <div className="font-display text-3xl normal-case tracking-normal text-ink">
                    {k + 1}
                  </div>
                </div>
                <div>
                  <div className="font-display text-xl leading-tight">
                    {place}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-mute">
                    {act}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1.5 border border-line bg-card px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-mute">
                    <Bus size={12} />
                    {tr}
                  </span>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <section>
              <h2 className="border-b border-ink pb-2 font-display text-2xl">
                Included
              </h2>
              <ul className="mt-4 space-y-3">
                {getIncluded(p).map((x) => (
                  <li key={x} className="flex gap-3 text-sm">
                    <Check size={18} className="mt-0.5 shrink-0 text-sea" />
                    {x}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="border-b border-ink pb-2 font-display text-2xl">
                Not included
              </h2>
              <ul className="mt-4 space-y-3">
                {getExcluded(p).map((x) => (
                  <li key={x} className="flex gap-3 text-sm text-mute">
                    <X size={18} className="mt-0.5 shrink-0 text-vermilion" />
                    {x}
                  </li>
                ))}
              </ul>
            </section>
          </div>
          {ship && (
            <section className="mt-12">
              <h2 className="border-b border-ink pb-2 font-display text-2xl">
                Ship room types · {ship.name}
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {ship.cabins.map((c) => (
                  <div key={c.type} className="border border-line bg-card p-5">
                    <div className="font-mono text-[11px] uppercase tracking-widest text-mute">
                      {c.size}
                    </div>
                    <h3 className="font-display text-2xl">{c.type}</h3>
                    <p className="mt-1 text-sm text-mute">{c.note}</p>
                    <div className="mt-3 border-t border-line pt-2">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-mute">
                        From{" "}
                      </span>
                      <span className="font-display text-xl">
                        {fmt(c.from)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          <section className="mt-12 flex flex-wrap items-center justify-between gap-4 border border-ink bg-card p-5">
            <div className="flex items-center gap-4">
              <FileText
                size={32}
                className="text-vermilion"
                strokeWidth={1.4}
              />
              <div>
                <h2 className="font-display text-2xl leading-tight">
                  Package PDF
                </h2>
                <p className="text-sm text-mute">{fileName}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={preview} className={btnGhost}>
                <Eye size={16} />
                Preview
              </button>
              <button onClick={download} className={btnPrimary}>
                <Download size={16} />
                Download
              </button>
            </div>
          </section>
          {ship && (
            <Link
              to={`/ships/${ship.id}`}
              className="mt-10 flex items-center gap-4 border border-line bg-card p-4 hover:border-ink"
            >
              <img
                src={img(ship.image, 200, 140)}
                alt=""
                className="h-16 w-24 object-cover"
              />
              <div className="flex-1">
                <div className="font-mono text-[10px] uppercase tracking-widest text-mute">
                  Sailing aboard
                </div>
                <div className="font-display text-xl">{ship.name}</div>
              </div>
              <ArrowRight size={18} />
            </Link>
          )}
        </div>
        <aside className="lg:col-span-5">
          <div className="sticky top-32 border border-ink bg-card p-6 shadow-[8px_8px_0_0_var(--color-ink)]">
            {deal && (
              <div className="mb-4 flex items-center justify-between gap-3 bg-vermilion px-3 py-2 text-sm font-semibold text-white">
                <span>
                  {deal.type}: {deal.pct}% off
                </span>
                {deal.endsAt && (
                  <span className="font-mono text-xs">ends soon</span>
                )}
              </div>
            )}
            <div className="flex items-baseline gap-2">
              <span className="font-display text-4xl">{fmt(unit)}</span>
              <span className="text-sm text-mute">per person</span>
              {unit < p.priceFrom && (
                <span className="text-mute line-through">
                  {fmt(p.priceFrom)}
                </span>
              )}
            </div>
            {deal?.type === "Group discount" && pax < 6 && (
              <p className="mt-1 text-xs text-mute">
                Group discount applies from 6 guests.
              </p>
            )}
            <div className="mt-6 space-y-4">
              <label className="block">
                <span className={label}>
                  <Calendar size={11} className="mr-1 inline" />
                  Departure date
                </span>
                <select
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={input}
                >
                  {p.departures.map((d) => {
                    const f = fareFor(p, d)
                    return (
                      <option key={d} value={d}>
                        {fmtDate(d)}
                        {f
                          ? ` — ${fmt(fareUnitPrice(p, f))}${
                              f.bogo ? " pp (buy 1 free 1)" : ""
                            }`
                          : ""}
                      </option>
                    )
                  })}
                </select>
              </label>
              {fareFor(p, date)?.note && (
                <p className="mt-1 text-xs text-mute">
                  {fareFor(p, date)!.note}
                </p>
              )}
              {ship && (
                <fieldset>
                  <legend className={label}>
                    <ShipIcon size={11} className="mr-1 inline" />
                    Cabin type
                  </legend>
                  <div className="space-y-2">
                    {ship.cabins.map((c) => (
                      <label
                        key={c.type}
                        className={`flex cursor-pointer items-center justify-between gap-3 border px-3 py-2.5 text-sm ${
                          cab === c.type
                            ? "border-ink bg-ink text-paper"
                            : "border-line hover:border-ink"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="cabin"
                            className="sr-only"
                            checked={cab === c.type}
                            onChange={() => setCabin(c.type)}
                          />
                          <span>
                            <strong>{c.type}</strong>{" "}
                            <span className="text-xs opacity-70">
                              {c.size} · {c.note}
                            </span>
                          </span>
                        </span>
                        <span className="font-mono text-xs">
                          {fmt(c.from)} pp
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}
              <div>
                <span className={label}>
                  <Users size={11} className="mr-1 inline" />
                  Guests
                </span>
                <div className="flex w-40 items-center border border-line">
                  <button
                    aria-label="Fewer guests"
                    onClick={() => setPax(Math.max(1, pax - 1))}
                    className="grid size-10 place-items-center hover:bg-paper-deep"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="flex-1 text-center font-mono">{pax}</span>
                  <button
                    aria-label="More guests"
                    onClick={() => setPax(Math.min(12, pax + 1))}
                    className="grid size-10 place-items-center hover:bg-paper-deep"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
              <fieldset>
                <legend className={label}>Add-ons</legend>
                {ADDONS.map((a) => (
                  <label
                    key={a.id}
                    className="flex cursor-pointer items-center justify-between border-b border-line py-2.5 text-sm last:border-0"
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="size-4 accent-vermilion"
                        checked={adds.includes(a.id)}
                        onChange={() =>
                          setAdds(
                            adds.includes(a.id)
                              ? adds.filter((x) => x !== a.id)
                              : [...adds, a.id],
                          )
                        }
                      />
                      {a.label}
                    </span>
                    <span className="font-mono text-xs">
                      +{fmt(a.price)} pp
                    </span>
                  </label>
                ))}
              </fieldset>
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-ink pt-4">
              <span className="font-mono text-xs uppercase tracking-widest">
                Total
              </span>
              <span className="font-display text-3xl">{fmt(total)}</span>
            </div>
            <div className="mt-5 grid gap-3">
              <button
                onClick={() => {
                  addToCart(p.id, date, pax, adds, cab)
                  navigate("/cart")
                }}
                className={btnPrimary}
              >
                Book Now
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => addToCart(p.id, date, pax, adds, cab)}
                  className={btnGhost}
                >
                  Add to cart
                </button>
                <button onClick={() => toggleWish(p.id)} className={btnGhost}>
                  <Heart
                    size={15}
                    className={
                      wishlist.includes(p.id)
                        ? "fill-vermilion text-vermilion"
                        : ""
                    }
                  />
                  {wishlist.includes(p.id) ? "Saved" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </aside>
      </Wrap>
      {pdfUrl && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Package PDF preview"
          className="fixed inset-0 z-50 flex flex-col bg-ink/80 p-3 sm:p-8"
          onClick={() => setPdfUrl("")}
        >
          <div
            className="mx-auto flex h-full w-full max-w-4xl flex-col bg-paper"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
              <span className="truncate font-mono text-xs">{fileName}</span>
              <div className="flex gap-2">
                <button onClick={download} className={`${btnPrimary} !py-2`}>
                  <Download size={14} />
                  Download
                </button>
                <button
                  onClick={() => setPdfUrl("")}
                  aria-label="Close preview"
                  className="grid size-9 place-items-center border border-line hover:bg-paper-deep"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            <iframe
              src={pdfUrl}
              title="Package PDF"
              className="w-full flex-1"
            />
          </div>
        </div>
      )}
      <Wrap className="mt-20">
        <SectionTitle n="+" title={`More in ${c.name}`} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PACKAGES.filter((x) => x.country === p.country && x.id !== p.id)
            .concat(
              PACKAGES.filter(
                (x) =>
                  x.country !== p.country && x.type === p.type && x.id !== p.id,
              ),
            )
            .slice(0, 3)
            .map((x) => (
              <PackageCard key={x.id} p={x} />
            ))}
        </div>
      </Wrap>
    </>
  )
}

/* ================= DEALS ================= */
const DEAL_TYPES = [
  "All",
  "New user",
  "Limited-time",
  "Early bird",
  "Group discount",
]

export function Deals() {
  const { addToCart } = useStore()
  const [tab, setTab] = useState("All")
  const pool = DEALS.map((d) => getPkg(d.pkgId)!)
  const [f, setF] = useState(EMPTY_FILTERS)
  const list = DEALS.filter(
    (d) => (tab === "All" || d.type === tab) && matches(getPkg(d.pkgId)!, f),
  )
  return (
    <>
      <PageHead kicker="Deals" title="Savings with the small print up front.">
        Every offer shows what you pay, what you save and the terms, with no
        surprises at checkout.
      </PageHead>
      <Wrap className="py-10">
        <SearchBar pool={pool} onSearch={setF} cta="Search deals" />
        <div className="mt-10 flex flex-wrap gap-2">
          {DEAL_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`border px-4 py-2 text-sm font-semibold ${
                tab === t
                  ? "border-ink bg-ink text-paper"
                  : "border-line hover:border-ink"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {list.map((d) => {
            const p = getPkg(d.pkgId)!
            const sale = p.priceFrom * (1 - d.pct / 100)
            return (
              <article
                key={d.id}
                className="grid border border-line bg-card sm:grid-cols-5"
              >
                <div className="relative min-h-52 bg-sea/30 sm:col-span-2">
                  <img
                    src={img(p.image, 500, 600)}
                    alt={p.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <span className="absolute left-0 top-4 bg-vermilion px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-white">
                    {d.pct}% off
                  </span>
                </div>
                <div className="flex flex-col p-5 sm:col-span-3">
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-vermilion">
                    {d.type}
                  </div>
                  <h3 className="mt-1 font-display text-2xl leading-tight">
                    {p.name}
                  </h3>
                  <div className="font-mono text-[11px] uppercase tracking-widest text-mute">
                    {getCountry(p.country).name} · {p.days} days
                  </div>
                  {d.endsAt && (
                    <div className="mt-4">
                      <Countdown endsAt={d.endsAt} />
                    </div>
                  )}
                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="font-display text-3xl">{fmt(sale)}</span>
                    <span className="text-mute line-through">
                      {fmt(p.priceFrom)}
                    </span>
                    <span className="text-xs text-mute">per person</span>
                  </div>
                  <p className="mt-3 flex-1 border-t border-line pt-3 text-xs leading-relaxed text-mute">
                    <strong className="text-ink">Terms:</strong> {d.terms}
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button
                      className={btnPrimary}
                      onClick={() => {
                        addToCart(
                          p.id,
                          p.departures[0],
                          d.type === "Group discount" ? 6 : 2,
                          [],
                        )
                        navigate("/cart")
                      }}
                    >
                      Book Now
                    </button>
                    <Link to={`/package/${p.id}`} className={btnGhost}>
                      View Deal
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
        {list.length === 0 && (
          <p className="mt-8 border border-dashed border-ink/40 p-10 text-center font-display text-2xl">
            No deals match. Try clearing a filter.
          </p>
        )}
      </Wrap>
    </>
  )
}

/* ================= SHIPS ================= */
export function Ships() {
  return (
    <>
      <PageHead kicker="Ships" title="Choose the ship, then the sea.">
        From boutique island-hoppers to ice-strengthened expedition vessels.
      </PageHead>
      <Wrap className="grid gap-6 py-12 md:grid-cols-2">
        {SHIPS.map((s) => (
          <Link
            key={s.id}
            to={`/ships/${s.id}`}
            className="group border border-line bg-card transition-shadow hover:shadow-[6px_6px_0_0_var(--color-ink)]"
          >
            <div className="aspect-[16/10] overflow-hidden bg-sea/30">
              <img
                src={img(s.image, 1000, 625)}
                alt={s.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-display text-3xl">{s.name}</h2>
                <Stars value={s.rating} />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 border-t border-line pt-4 font-mono text-xs uppercase tracking-widest text-mute">
                <div>
                  <div className="text-[10px]">Capacity</div>
                  <div className="mt-1 text-sm text-ink">
                    {s.capacity.toLocaleString()} guests
                  </div>
                </div>
                <div>
                  <div className="text-[10px]">Class</div>
                  <div className="mt-1 text-sm normal-case tracking-normal text-ink">
                    {s.cls}
                  </div>
                </div>
                <div>
                  <div className="text-[10px]">Built</div>
                  <div className="mt-1 text-sm text-ink">{s.year}</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </Wrap>
    </>
  )
}

const SHIP_TABS = [
  "Overview",
  "Gallery",
  "Deck plans",
  "Amenities",
  "Cabins",
  "Recent cruises",
]

export function ShipDetail({ id }: { id: string }) {
  const s = SHIPS.find((x) => x.id === id)
  const [tab, setTab] = useState("Overview")
  if (!s) return <NotFound />
  const cruises = PACKAGES.filter((p) => p.ship === s.name)
  return (
    <>
      <section className="relative h-[52vh] min-h-80 bg-ink text-white">
        <img
          src={img(s.image, 1800, 900)}
          alt={s.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-ink/10" />
        <Wrap className="relative flex h-full flex-col justify-end pb-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#ffb596]">
            <Link to="/ships" className="hover:underline">
              Ships
            </Link>{" "}
            / {s.cls}
          </p>
          <h1 className="mt-2 font-display text-6xl font-medium sm:text-7xl">
            {s.name}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-6 text-sm text-white/85">
            <Stars value={s.rating} />
            <span>{s.capacity.toLocaleString()} guests</span>
            <span>{s.crew} crew</span>
            <span>Built {s.year}</span>
          </div>
        </Wrap>
      </section>
      <Wrap className="py-10">
        <div
          className="flex gap-1 overflow-x-auto border-b border-ink"
          role="tablist"
        >
          {SHIP_TABS.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`shrink-0 px-5 py-3 text-sm font-semibold ${
                tab === t ? "bg-ink text-paper" : "hover:bg-paper-deep"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="py-10">
          {tab === "Overview" && (
            <div className="grid gap-10 md:grid-cols-12">
              <p className="font-display text-3xl leading-snug md:col-span-8">
                {s.overview}
              </p>
              <dl className="grid grid-cols-2 gap-4 md:col-span-4 md:grid-cols-1">
                {[
                  ["Class", s.cls],
                  ["Capacity", `${s.capacity.toLocaleString()} guests`],
                  ["Crew", `${s.crew}`],
                  ["Launched", `${s.year}`],
                ].map(([k, v]) => (
                  <div key={k} className="border-b border-line pb-3">
                    <dt className={label}>{k}</dt>
                    <dd className="font-display text-xl">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
          {tab === "Gallery" && (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {s.gallery.map((g, k) => (
                <div
                  key={g}
                  className={`overflow-hidden bg-sea/30 ${
                    k === 0 ? "col-span-2 row-span-2" : ""
                  }`}
                >
                  <img
                    src={img(g, 900, 700)}
                    alt={`${s.name} view ${k + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
          {tab === "Deck plans" && (
            <div className="space-y-3">
              {s.decks.map((d, k) => (
                <div
                  key={d.n}
                  className="grid items-center gap-4 border border-line bg-card p-5 md:grid-cols-12"
                >
                  <div className="md:col-span-2">
                    <div className="font-mono text-xs text-vermilion">
                      {d.n}
                    </div>
                    <div className="font-display text-2xl">{d.label}</div>
                  </div>
                  <div className="md:col-span-7">
                    <div
                      className="h-6 bg-ink/10"
                      style={{
                        clipPath:
                          "polygon(0 0, 92% 0, 100% 50%, 92% 100%, 0 100%, 4% 50%)",
                        width: `${100 - k * 8}%`,
                      }}
                    />
                  </div>
                  <p className="text-sm text-mute md:col-span-3">{d.items}</p>
                </div>
              ))}
            </div>
          )}
          {tab === "Amenities" && (
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {s.amenities.map((a) => (
                <li
                  key={a}
                  className="flex items-center gap-3 border border-line bg-card p-5 font-display text-xl"
                >
                  <Anchor size={18} className="text-vermilion" />
                  {a}
                </li>
              ))}
            </ul>
          )}
          {tab === "Cabins" && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {s.cabins.map((c) => (
                <div key={c.type} className="border border-line bg-card p-6">
                  <div className="font-mono text-xs uppercase tracking-widest text-mute">
                    {c.size}
                  </div>
                  <h3 className="font-display text-3xl">{c.type}</h3>
                  <p className="mt-2 text-sm text-mute">{c.note}</p>
                  <div className="mt-5 border-t border-line pt-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-mute">
                      From{" "}
                    </span>
                    <span className="font-display text-2xl">{fmt(c.from)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab === "Recent cruises" && (
            <div className="space-y-3">
              {cruises.map((p) => (
                <div
                  key={p.id}
                  className="grid items-center gap-4 border border-line bg-card p-5 md:grid-cols-12"
                >
                  <div className="md:col-span-4">
                    <div className="font-display text-2xl">{p.name}</div>
                    <div className="font-mono text-[11px] uppercase tracking-widest text-mute">
                      {getCountry(p.country).name}
                    </div>
                  </div>
                  <div className="text-sm md:col-span-3">
                    <div className={label}>Route</div>
                    {p.depPort} → {p.destPort}
                  </div>
                  <div className="text-sm md:col-span-2">
                    <div className={label}>Departs</div>
                    {new Date(p.departures[0] + "T00:00:00").toLocaleDateString(
                      "en-US",
                      { month: "short", year: "numeric" },
                    )}
                  </div>
                  <div className="text-sm md:col-span-1">
                    <div className={label}>Price</div>
                    {fmt(p.priceFrom)}–{fmt(p.priceTo)}
                  </div>
                  <div className="md:col-span-2 md:text-right">
                    <Link to={`/package/${p.id}`} className={btnPrimary}>
                      Book now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Wrap>
    </>
  )
}

export function NotFound() {
  return (
    <Wrap className="py-28 text-center">
      <ShipIcon
        className="mx-auto text-vermilion"
        size={44}
        strokeWidth={1.3}
      />
      <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-vermilion">
        Error 404
      </p>
      <h1 className="mt-3 font-display text-6xl">Off the map.</h1>
      <p className="mx-auto mt-4 max-w-md text-mute">
        That page has sailed. Let us point you back to dry land.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link to="/" className={btnPrimary}>
          Back home
        </Link>
        <Link to="/destinations" className={btnGhost}>
          Browse destinations
        </Link>
      </div>
    </Wrap>
  )
}
