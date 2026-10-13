import { useEffect, useState, type ReactNode, type InputHTMLAttributes } from "react";
import { Compass, Heart, Menu, Search, ShoppingBag, Star, User as UserIcon, X, Mail, Phone, MapPin } from "lucide-react";
import { Link, navigate, useStore, EMPTY_FILTERS, type Filters } from "./store";
import { CONTACT, MONTHS, PACKAGES, dealFor, fmt, getCountry, img, unitPrice, type Pkg } from "./data";

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 bg-vermilion px-5 py-3 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-vermilion-dark disabled:cursor-not-allowed disabled:opacity-50";
export const btnGhost =
  "inline-flex items-center justify-center gap-2 border border-ink px-5 py-3 text-sm font-semibold tracking-wide text-ink transition-colors hover:bg-ink hover:text-paper";
export const input =
  "w-full border border-line bg-card px-3 py-2.5 text-sm text-ink placeholder:text-mute focus:border-ink focus:outline-none";
export const label = "mb-1.5 block font-mono text-[11px] uppercase tracking-[0.14em] text-mute";

export function Field({ title, error, children }: { title: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className={label}>{title}</span>
      {children}
      {error && <span className="mt-1 block text-xs font-medium text-vermilion">{error}</span>}
    </label>
  );
}

export function TextInput({ error, ...p }: InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  return <input {...p} className={`${input} ${error ? "border-vermilion" : ""} ${p.className ?? ""}`} />;
}

export function Wrap({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1240px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function PageHead({ kicker, title, children }: { kicker: string; title: string; children?: ReactNode }) {
  return (
    <header className="border-b border-line bg-paper-deep/60 paper-grain">
      <Wrap className="py-12 sm:py-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-vermilion">{kicker}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-medium leading-[1.05] sm:text-6xl">{title}</h1>
        {children && <div className="mt-5 max-w-2xl text-lg text-mute">{children}</div>}
      </Wrap>
    </header>
  );
}

export function SectionTitle({ n, title, action }: { n: string; title: string; action?: ReactNode }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4 border-b border-ink pb-3">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-xs text-vermilion">{n}</span>
        <h2 className="font-display text-3xl font-medium sm:text-4xl">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function Stars({ value, count }: { value: number; count?: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm font-semibold">
      <Star size={14} className="fill-vermilion text-vermilion" aria-hidden />
      {value.toFixed(1)}
      {count !== undefined && <span className="font-normal text-mute">({count})</span>}
    </span>
  );
}

export function useCountdown(endsAt?: number) {
  const [left, setLeft] = useState(endsAt ? endsAt - Date.now() : 0);
  useEffect(() => {
    if (!endsAt) return;
    const t = setInterval(() => setLeft(endsAt - Date.now()), 1000);
    return () => clearInterval(t);
  }, [endsAt]);
  if (!endsAt) return null;
  const s = Math.max(0, Math.floor(left / 1000));
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}

export function Countdown({ endsAt }: { endsAt?: number }) {
  const c = useCountdown(endsAt);
  if (!c) return null;
  const cell = (v: number, l: string) => (
    <div className="min-w-12 border border-line bg-card px-2 py-1.5 text-center">
      <div className="font-mono text-lg font-medium leading-none">{String(v).padStart(2, "0")}</div>
      <div className="mt-1 font-mono text-[9px] uppercase tracking-widest text-mute">{l}</div>
    </div>
  );
  return (
    <div className="flex gap-1.5" role="timer" aria-label="Time left on this deal">
      {cell(c.d, "days")}
      {cell(c.h, "hrs")}
      {cell(c.m, "min")}
      {cell(c.s, "sec")}
    </div>
  );
}

export function PackageCard({ p, showCountry = true }: { p: Pkg; showCountry?: boolean }) {
  const { wishlist, toggleWish } = useStore();
  const deal = dealFor(p.id);
  const wished = wishlist.includes(p.id);
  return (
    <article className="group flex flex-col border border-line bg-card transition-shadow hover:shadow-[6px_6px_0_0_var(--color-ink)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-sea/30">
        <img src={img(p.image, 800, 600)} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        {deal && <span className="absolute left-0 top-4 bg-vermilion px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-white">{deal.pct}% off</span>}
        <button
          onClick={() => toggleWish(p.id)}
          aria-label={wished ? "Remove from wishlist" : "Save to wishlist"}
          className="absolute right-3 top-3 grid size-9 place-items-center bg-paper/95 text-ink hover:bg-white"
        >
          <Heart size={16} className={wished ? "fill-vermilion text-vermilion" : ""} />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
          <span>{showCountry ? getCountry(p.country).name : p.type}</span>
          <span>{p.days} days{p.ship ? ` · ${p.ship}` : ""}</span>
        </div>
        <h3 className="mt-2 font-display text-2xl font-medium leading-tight">{p.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-mute">{p.desc}</p>
        <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-mute">From</div>
            <div className="font-display text-2xl font-medium">
              {fmt(unitPrice(p))}
              {deal && <span className="ml-2 text-sm text-mute line-through">{fmt(p.priceFrom)}</span>}
            </div>
          </div>
          <Stars value={p.rating} count={p.reviews} />
        </div>
        <Link to={`/package/${p.id}`} className={`${btnGhost} mt-4`}>
          View Details
        </Link>
      </div>
    </article>
  );
}

/* ---------- search bar ---------- */
const uniq = (a: string[]) => [...new Set(a)].sort();
const PRICES = [["lt2", "Under $2,000"], ["2-3.5", "$2,000 – $3,500"], ["3.5-5", "$3,500 – $5,000"], ["gt5", "$5,000+"]];

export function matches(p: Pkg, f: Filters) {
  const price = p.priceFrom;
  if (f.q && !`${p.name} ${p.desc} ${getCountry(p.country).name} ${p.type}`.toLowerCase().includes(f.q.toLowerCase())) return false;
  if (f.ship && p.ship !== f.ship) return false;
  if (f.country && p.country !== f.country) return false;
  if (f.depPort && p.depPort !== f.depPort) return false;
  if (f.destPort && p.destPort !== f.destPort) return false;
  if (f.month && !p.departures.some((d) => d.startsWith(f.month))) return false;
  if (f.type && p.type !== f.type) return false;
  if (f.price === "lt2" && price >= 2000) return false;
  if (f.price === "2-3.5" && (price < 2000 || price > 3500)) return false;
  if (f.price === "3.5-5" && (price < 3500 || price > 5000)) return false;
  if (f.price === "gt5" && price < 5000) return false;
  if (f.duration === "1-7" && p.days > 7) return false;
  if (f.duration === "8-10" && (p.days < 8 || p.days > 10)) return false;
  if (f.duration === "11-14" && (p.days < 11 || p.days > 14)) return false;
  if (f.duration === "15" && p.days < 15) return false;
  return true;
}

export function SearchBar({ initial, onSearch, pool = PACKAGES, cta = "Search trips" }: { initial?: Filters; onSearch: (f: Filters) => void; pool?: Pkg[]; cta?: string }) {
  const [f, setF] = useState<Filters>(initial ?? EMPTY_FILTERS);
  const set = (k: keyof Filters) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });
  const sel = (k: keyof Filters, title: string, opts: [string, string][], any = "Any") => (
    <label className="block">
      <span className={label}>{title}</span>
      <select value={f[k]} onChange={set(k)} className={`${input} appearance-none`}>
        <option value="">{any}</option>
        {opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    </label>
  );
  const ships = uniq(pool.map((p) => p.ship ?? "").filter(Boolean));
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSearch(f); }}
      className="border border-ink bg-card p-5 shadow-[8px_8px_0_0_var(--color-ink)] sm:p-6"
    >
      <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
        {sel("month", "Departure Month", MONTHS.map((m) => [m.v, m.label]))}
        {sel("ship", "Ship", ships.map((s) => [s, s]))}
        {sel("depPort", "Departure Port", uniq(pool.map((p) => p.depPort)).map((s) => [s, s]))}
        {sel("price", "Price Range", PRICES as [string, string][])}
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <button type="button" onClick={() => setF(EMPTY_FILTERS)} className="text-sm font-medium text-mute underline-offset-4 hover:text-ink hover:underline">
          Clear filters
        </button>
        <button className={btnPrimary}><Search size={16} /> {cta}</button>
      </div>
    </form>
  );
}

/* ---------- header ---------- */
const NAV: [string, string][] = [["/destinations", "Destinations"], ["/deals", "Deals"], ["/ships", "Ships"], ["/about", "About"], ["/contact", "Contact Us"]];

export function Header({ path }: { path: string }) {
  const { cart, user, setFilters } = useStore();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  useEffect(() => setOpen(false), [path]);
  const go = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ ...EMPTY_FILTERS, q });
    navigate("/search");
  };
  const searchBox = (
    <form onSubmit={go} role="search" className="relative w-full">
      <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-mute" />
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search trips, countries…" aria-label="Search" className={`${input} bg-paper py-2 pl-9`} />
    </form>
  );
  const active = (to: string) => path.startsWith(to);
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <Wrap className="flex h-16 items-center gap-6">
        <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="TravelWithYou home">
          <Compass className="text-vermilion" size={26} strokeWidth={1.6} />
          <span className="font-display text-2xl font-semibold tracking-tight">TravelWith<em className="font-normal text-vermilion">You</em></span>
        </Link>
        <nav className="ml-4 hidden items-center gap-6 lg:flex" aria-label="Main">
          {NAV.map(([to, l]) => (
            <Link key={to} to={to} className={`border-b-2 py-1 text-sm font-semibold ${active(to) ? "border-vermilion" : "border-transparent hover:border-ink"}`}>{l}</Link>
          ))}
        </nav>
        <div className="ml-auto hidden w-64 xl:block">{searchBox}</div>
        <div className="ml-auto flex items-center gap-1 xl:ml-0">
          <Link to="/cart" className="relative grid size-10 place-items-center hover:bg-paper-deep" aria-label={`Cart, ${cart.length} items`}>
            <ShoppingBag size={20} />
            {cart.length > 0 && <span className="absolute right-0.5 top-0.5 grid size-4 place-items-center bg-vermilion font-mono text-[10px] text-white">{cart.length}</span>}
          </Link>
          <Link to={user ? "/account" : "/login"} className="flex h-10 items-center gap-2 px-2 hover:bg-paper-deep" aria-label={user ? "My account" : "Log in"}>
            {user ? (
              <span className="grid size-7 place-items-center rounded-full bg-sea font-mono text-xs text-white">{user.name.slice(0, 1).toUpperCase()}</span>
            ) : (
              <><UserIcon size={20} /><span className="hidden text-sm font-semibold sm:inline">Log in</span></>
            )}
          </Link>
          <button onClick={() => setOpen(!open)} className="grid size-10 place-items-center hover:bg-paper-deep lg:hidden" aria-label="Menu" aria-expanded={open}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </Wrap>
      <Wrap className="pb-3 xl:hidden">{searchBox}</Wrap>
      {open && (
        <nav className="border-t border-line bg-paper lg:hidden" aria-label="Mobile">
          <Wrap className="flex flex-col py-2">
            {[...NAV, ["/cart", `Cart (${cart.length})`], [user ? "/account" : "/login", user ? "My account" : "Log in / Register"]].map(([to, l]) => (
              <Link key={to} to={to} className="border-b border-line py-3 font-display text-xl last:border-0">{l}</Link>
            ))}
          </Wrap>
        </nav>
      )}
    </header>
  );
}

/* ---------- footer ---------- */
const PAYMENTS = ["VISA", "MC", "AMEX", "PayPal", "Bank"];

export function Footer() {
  const { notify } = useStore();
  const [email, setEmail] = useState("");
  return (
    <footer className="mt-24 bg-ink text-paper">
      <Wrap className="grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Link to="/" className="flex items-center gap-2" aria-label="TravelWithYou home">
            <Compass className="text-[#ff8a5f]" size={28} strokeWidth={1.6} />
            <span className="font-display text-3xl">TravelWith<em className="text-[#ff8a5f]">You</em></span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/70">Tour packages and cruises to forty countries, planned by people who have been there.</p>
          <div className="mt-6">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/60">Find us on</div>
            <div className="mt-3 flex gap-2">
              {[["Facebook", "f"], ["Instagram", "ig"], ["TikTok", "tt"]].map(([n, s]) => (
                <a key={n} href="#" onClick={(e) => e.preventDefault()} aria-label={n} className="grid size-10 place-items-center border border-paper/30 font-mono text-xs uppercase hover:bg-paper hover:text-ink">{s}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/60">Quick links</div>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV.map(([to, l]) => <li key={to}><Link to={to} className="hover:text-[#ff8a5f]">{l}</Link></li>)}
            <li><Link to="/cart" className="hover:text-[#ff8a5f]">Cart</Link></li>
            <li><Link to="/account" className="hover:text-[#ff8a5f]">Account</Link></li>
            <li><Link to="/blog" className="hover:text-[#ff8a5f]">Travel Guides</Link></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/60">Contact</div>
          <ul className="mt-4 space-y-3 text-sm text-paper/85">
            <li className="flex gap-3"><Phone size={16} className="mt-0.5 shrink-0" />{CONTACT.phone}</li>
            <li className="flex gap-3"><Mail size={16} className="mt-0.5 shrink-0" />{CONTACT.email}</li>
            <li className="flex gap-3"><MapPin size={16} className="mt-0.5 shrink-0" />{CONTACT.address}</li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/60">Newsletter</div>
          <p className="mt-4 text-sm text-paper/70">One email a month. Deals and field notes.</p>
          <form
            onSubmit={(e) => { e.preventDefault(); if (email.includes("@")) { notify("You are subscribed. Welcome aboard."); setEmail(""); } else notify("Please enter a valid email"); }}
            className="mt-3 flex"
          >
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" aria-label="Email for newsletter" className="min-w-0 flex-1 border border-paper/30 bg-transparent px-3 py-2.5 text-sm placeholder:text-paper/50 focus:border-paper focus:outline-none" />
            <button className="bg-[#ff8a5f] px-4 text-sm font-semibold text-ink hover:bg-white">Join</button>
          </form>
          <div className="mt-6 flex flex-wrap gap-2">
            {PAYMENTS.map((p) => <span key={p} className="border border-paper/30 px-2.5 py-1 font-mono text-[10px] tracking-wider text-paper/80">{p}</span>)}
          </div>
        </div>
      </Wrap>
      <div className="border-t border-paper/15">
        <Wrap className="flex flex-wrap items-center justify-between gap-3 py-5 text-xs text-paper/70">
          <span>© 2026 TravelWithYou Ltd. All rights reserved.</span>
          <div className="flex flex-wrap gap-5">
            <Link to="/terms" className="hover:text-white">Terms &amp; Conditions</Link>
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/cancellation" className="hover:text-white">Cancellation &amp; Refunds</Link>
            <Link to="/faq" className="hover:text-white">FAQ</Link>
          </div>
        </Wrap>
      </div>
    </footer>
  );
}

export function Toast() {
  const { toast } = useStore();
  if (!toast) return null;
  return (
    <div role="status" className="fade-up fixed bottom-6 left-1/2 z-50 -translate-x-1/2 border border-ink bg-ink px-5 py-3 text-sm font-medium text-paper shadow-[4px_4px_0_0_var(--color-vermilion)]">
      {toast}
    </div>
  );
}

export function Notice({ tone = "warn", children }: { tone?: "warn" | "ok" | "info"; children: ReactNode }) {
  const c = tone === "warn" ? "border-vermilion bg-vermilion/10" : tone === "ok" ? "border-sea bg-sea/10" : "border-line bg-paper-deep/60";
  return <div role={tone === "warn" ? "alert" : "status"} className={`border-l-4 px-4 py-3 text-sm ${c}`}>{children}</div>;
}
