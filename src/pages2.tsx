import { useEffect, useState } from "react";
import { AlertTriangle, Check, CreditCard, Landmark, Lock, Minus, Plus, Trash2, Download, Mail, XCircle } from "lucide-react";
import { Link, navigate, useStore } from "./store";
import { ADDONS, TAX_RATE, fmt, fmtDate, getCountry, getPkg, img, itemAvailable, itemTotal, unitPrice, type Booking, type CartItem } from "./data";
import { Field, Notice, PageHead, TextInput, Wrap, btnGhost, btnPrimary, input, label } from "./ui";

/* ================= CART ================= */
function CartRow({ it }: { it: CartItem }) {
  const { updateItem, removeItem } = useStore();
  const p = getPkg(it.pkgId)!;
  const ok = itemAvailable(it);
  const unit = unitPrice(p, it.pax);
  return (
    <article className={`border bg-card ${ok ? "border-line" : "border-vermilion"}`}>
      {!ok && (
        <div className="flex items-start gap-3 bg-vermilion px-4 py-2.5 text-sm font-medium text-white" role="alert">
          <AlertTriangle size={18} className="mt-0.5 shrink-0" />
          <span>The {fmtDate(it.date)} departure is no longer available. Choose a new date to keep this package.</span>
        </div>
      )}
      <div className="grid gap-5 p-5 sm:grid-cols-[160px_1fr]">
        <img src={img(p.image, 400, 300)} alt={p.name} className="aspect-[4/3] w-full bg-sea/30 object-cover sm:h-full" />
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <Link to={`/package/${p.id}`} className="font-display text-2xl leading-tight hover:underline">{p.name}</Link>
              <div className="font-mono text-[11px] uppercase tracking-widest text-mute">{getCountry(p.country).name} · {p.days} days</div>
            </div>
            <button onClick={() => removeItem(it.uid)} aria-label={`Remove ${p.name}`} className="grid size-9 shrink-0 place-items-center border border-line hover:border-vermilion hover:text-vermilion"><Trash2 size={16} /></button>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <label><span className={label}>Date</span>
              <select value={ok ? it.date : ""} onChange={(e) => updateItem(it.uid, { date: e.target.value })} className={input}>
                {!ok && <option value="" disabled>Select a date</option>}
                {p.departures.map((d) => <option key={d} value={d}>{fmtDate(d)}</option>)}
              </select></label>
            <div><span className={label}>Pax</span>
              <div className="flex items-center border border-line">
                <button aria-label="Fewer guests" onClick={() => updateItem(it.uid, { pax: Math.max(1, it.pax - 1) })} className="grid size-10 place-items-center hover:bg-paper-deep"><Minus size={14} /></button>
                <span className="flex-1 text-center font-mono">{it.pax}</span>
                <button aria-label="More guests" onClick={() => updateItem(it.uid, { pax: Math.min(12, it.pax + 1) })} className="grid size-10 place-items-center hover:bg-paper-deep"><Plus size={14} /></button>
              </div></div>
            <div><span className={label}>Price per pax</span><div className="py-2 font-display text-xl">{fmt(unit)}</div></div>
          </div>
          <fieldset className="mt-4"><legend className={label}>Add-ons</legend>
            <div className="flex flex-wrap gap-2">
              {ADDONS.map((a) => {
                const on = it.addons.includes(a.id);
                return (
                  <label key={a.id} className={`flex cursor-pointer items-center gap-2 border px-3 py-1.5 text-sm ${on ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"}`}>
                    <input type="checkbox" className="sr-only" checked={on} onChange={() => updateItem(it.uid, { addons: on ? it.addons.filter((x) => x !== a.id) : [...it.addons, a.id] })} />
                    {on && <Check size={13} />}{a.label} <span className="font-mono text-xs opacity-70">+{fmt(a.price)}</span>
                  </label>
                );
              })}
            </div></fieldset>
          <div className="mt-4 flex justify-end border-t border-line pt-3 font-display text-2xl">{fmt(itemTotal(it))}</div>
        </div>
      </div>
    </article>
  );
}

export function Summary({ compact = false }: { compact?: boolean }) {
  const { totals, promo, promoPct } = useStore();
  const row = (l: string, v: string, strong = false) => (
    <div className={`flex justify-between ${strong ? "border-t border-ink pt-3 font-display text-3xl" : "text-sm"}`}><span className={strong ? "" : "text-mute"}>{l}</span><span>{v}</span></div>
  );
  return (
    <div className="space-y-2.5">
      {row("Subtotal", fmt(totals.subtotal))}
      {row(`Taxes / fees (${TAX_RATE * 100}%)`, fmt(totals.taxes))}
      {row(promo ? `Discount (${promo}, ${promoPct * 100}%)` : "Discount", totals.discount ? "−" + fmt(totals.discount) : "$0")}
      {row("Total", fmt(totals.total), true)}
      {!compact && null}
    </div>
  );
}

export function PromoField() {
  const { applyPromo, promo, notify } = useStore();
  const [code, setCode] = useState(promo);
  const [err, setErr] = useState("");
  return (
    <div>
      <span className={label}>Promo code</span>
      <form onSubmit={(e) => { e.preventDefault(); if (applyPromo(code)) { setErr(""); notify("Promo code applied"); } else setErr("That code is not valid. Try WELCOME10."); }} className="flex">
        <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="WELCOME10" className={`${input} uppercase`} aria-label="Promo code" />
        <button className="shrink-0 bg-ink px-4 text-sm font-semibold text-paper hover:bg-sea">Apply</button>
      </form>
      {err && <p className="mt-1 text-xs font-medium text-vermilion">{err}</p>}
      {promo && !err && <p className="mt-1 text-xs font-medium text-sea">{promo} applied.</p>}
    </div>
  );
}

export function Cart() {
  const { cart } = useStore();
  const bad = cart.filter((i) => !itemAvailable(i)).length;
  return (
    <>
      <PageHead kicker="Cart" title="Your trips." />
      <Wrap className="py-10">
        {cart.length === 0 ? (
          <div className="border border-dashed border-ink/40 p-16 text-center">
            <p className="font-display text-4xl">Your cart is empty.</p>
            <Link to="/destinations" className={`${btnPrimary} mt-6`}>Continue Shopping</Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="space-y-5 lg:col-span-8">
              {bad > 0 && <Notice>{bad} {bad === 1 ? "package needs" : "packages need"} a new date before you can check out.</Notice>}
              {cart.map((it) => <CartRow key={it.uid} it={it} />)}
            </div>
            <aside className="lg:col-span-4">
              <div className="sticky top-32 space-y-5 border border-ink bg-card p-6 shadow-[8px_8px_0_0_var(--color-ink)]">
                <h2 className="font-display text-2xl">Order summary</h2>
                <PromoField />
                <Summary />
                <div className="grid gap-3">
                  <Link to="/checkout" className={btnPrimary}>Proceed to Checkout</Link>
                  <Link to="/destinations" className={btnGhost}>Continue Shopping</Link>
                </div>
              </div>
            </aside>
          </div>
        )}
      </Wrap>
    </>
  );
}

/* ================= CHECKOUT ================= */
type Errs = Record<string, string>;

export function Checkout() {
  const { cart, user, placeOrder, notify } = useStore();
  const [f, setF] = useState({ name: user?.name ?? "", email: user?.email ?? "", phone: user?.phone ?? "", billing: "", tName: "", dob: "", nation: "", passport: "", expiry: "", special: "", card: "", cardName: "", exp: "", cvc: "" });
  const [pay, setPay] = useState<"card" | "paypal" | "bank">("card");
  const [same, setSame] = useState(true);
  const [guest, setGuest] = useState(true);
  const [terms, setTerms] = useState({ t: false, p: false, c: false });
  const [errs, setErrs] = useState<Errs>({});
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });
  const bad = cart.filter((i) => !itemAvailable(i));

  if (cart.length === 0)
    return <Wrap className="py-24 text-center"><p className="font-display text-4xl">Nothing to check out.</p><Link to="/destinations" className={`${btnPrimary} mt-6`}>Browse destinations</Link></Wrap>;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Errs = {};
    const req = (k: keyof typeof f, m = "Required") => { if (!f[k].trim()) er[k] = m; };
    (["name", "phone", "billing", "tName", "dob", "nation", "passport", "expiry"] as const).forEach((k) => req(k));
    if (!/^\S+@\S+\.\S+$/.test(f.email)) er.email = "Enter a valid email address";
    if (pay === "card") {
      if (f.card.replace(/\s/g, "").length !== 16) er.card = "Card number must be 16 digits";
      req("cardName"); req("exp");
      if (!/^\d{3,4}$/.test(f.cvc)) er.cvc = "3 or 4 digits";
    }
    if (!terms.t) er.t = "Please accept the Terms & Conditions";
    if (!terms.p) er.p = "Please accept the Privacy Policy";
    if (!terms.c) er.c = "Please acknowledge the cancellation policy";
    setErrs(er);
    if (Object.keys(er).length) { notify("Please fix the highlighted fields"); return; }
    if (bad.length) return;
    setBusy(true);
    setTimeout(() => {
      if (pay === "card" && f.card.replace(/\s/g, "").endsWith("0000")) { setBusy(false); navigate("/payment-failed"); return; }
      placeOrder();
      navigate("/confirmation");
    }, 1100);
  };

  const box = "border border-line bg-card p-6";
  const h = (n: string, t: string) => <h2 className="mb-5 flex items-baseline gap-3 border-b border-line pb-3 font-display text-2xl"><span className="font-mono text-xs text-vermilion">{n}</span>{t}</h2>;
  const inp = (k: keyof typeof f, title: string, extra: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <Field title={title} error={errs[k]}><TextInput value={f[k]} onChange={set(k)} error={!!errs[k]} {...extra} /></Field>
  );

  return (
    <>
      <PageHead kicker="Checkout" title="Almost there." />
      <Wrap className="py-10">
        <form onSubmit={submit} noValidate className="grid gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            {bad.length > 0 && (
              <Notice>Your cart has expired items: {bad.map((b) => getPkg(b.pkgId)?.name).join(", ")}. <Link to="/cart" className="font-semibold underline">Update your cart</Link> to continue.</Notice>
            )}
            {!user && (
              <div className={box}>
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <label className="flex items-center gap-2"><input type="radio" className="accent-vermilion" checked={guest} onChange={() => setGuest(true)} />Guest checkout</label>
                  <label className="flex items-center gap-2"><input type="radio" className="accent-vermilion" checked={!guest} onChange={() => { setGuest(false); navigate("/login"); }} />I have an account, log in</label>
                </div>
              </div>
            )}
            <section className={box}>{h("01", "Contact details")}
              <div className="grid gap-4 sm:grid-cols-2">
                {inp("name", "Full name", { autoComplete: "name" })}{inp("email", "Email", { type: "email", autoComplete: "email" })}{inp("phone", "Phone number", { type: "tel" })}{inp("billing", "Billing address")}
              </div>
            </section>
            <section className={box}>{h("02", "Traveller details")}
              <div className="grid gap-4 sm:grid-cols-2">
                {inp("tName", "Full name as per passport")}{inp("dob", "Date of birth", { type: "date" })}{inp("nation", "Nationality")}{inp("passport", "Passport number")}{inp("expiry", "Passport expiry", { type: "date" })}
              </div>
              <label className="mt-4 block"><span className={label}>Dietary, medical or accessibility requests</span>
                <textarea value={f.special} onChange={set("special")} rows={3} className={input} /></label>
            </section>
            <section className={box}>{h("03", "Payment")}
              <div className="grid grid-cols-3 gap-2" role="tablist">
                {([["card", "Card", CreditCard], ["paypal", "PayPal", Lock], ["bank", "Bank transfer", Landmark]] as const).map(([k, l, I]) => (
                  <button key={k} type="button" role="tab" aria-selected={pay === k} onClick={() => setPay(k)} className={`flex items-center justify-center gap-2 border px-3 py-3 text-sm font-semibold ${pay === k ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"}`}><I size={16} />{l}</button>
                ))}
              </div>
              <div className="mt-5">
                {pay === "card" && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">{inp("card", "Card number", { placeholder: "4242 4242 4242 4242", inputMode: "numeric" })}</div>
                    {inp("cardName", "Name on card")}{inp("exp", "Expiry (MM/YY)", { placeholder: "08/29" })}{inp("cvc", "CVC", { inputMode: "numeric", maxLength: 4 })}
                    <p className="self-end text-xs text-mute">Demo tip: a card ending 0000 triggers a payment failure.</p>
                  </div>
                )}
                {pay === "paypal" && <p className="text-sm text-mute">You will be redirected to PayPal to authorise payment after you confirm.</p>}
                {pay === "bank" && <p className="text-sm text-mute">Bank details and your booking reference are emailed after you confirm. Your booking is held for 48 hours.</p>}
              </div>
              <label className="mt-5 flex items-center gap-3 text-sm"><input type="checkbox" className="size-4 accent-vermilion" checked={same} onChange={() => setSame(!same)} />Billing address same as contact</label>
              <p className="mt-4 flex items-center gap-2 text-xs text-mute"><Lock size={13} />Payments are encrypted and processed securely.</p>
            </section>
            <section className={box}>{h("04", "Terms & consent")}
              <div className="space-y-3 text-sm">
                {([["t", "I accept the Terms & Conditions", "/terms"], ["p", "I accept the Privacy Policy", "/privacy"], ["c", "I acknowledge the Cancellation & Refund Policy", "/cancellation"]] as const).map(([k, t, to]) => (
                  <div key={k}>
                    <label className="flex items-start gap-3"><input type="checkbox" className="mt-0.5 size-4 accent-vermilion" checked={terms[k]} onChange={() => setTerms({ ...terms, [k]: !terms[k] })} /><span>{t} <Link to={to} target="_blank" className="underline">(read)</Link></span></label>
                    {errs[k] && <p className="ml-7 mt-1 text-xs font-medium text-vermilion">{errs[k]}</p>}
                  </div>
                ))}
              </div>
            </section>
          </div>
          <aside className="lg:col-span-4">
            <div className="sticky top-32 border border-ink bg-card p-6 shadow-[8px_8px_0_0_var(--color-ink)]">
              <h2 className="font-display text-2xl">Booking summary</h2>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {cart.map((i) => {
                  const p = getPkg(i.pkgId)!;
                  return (
                    <li key={i.uid} className="py-3 text-sm">
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-mute">{itemAvailable(i) ? fmtDate(i.date) : <span className="font-medium text-vermilion">Date unavailable</span>} · {i.pax} pax × {fmt(unitPrice(p, i.pax))}</div>
                      {i.addons.length > 0 && <div className="text-xs text-mute">Add-ons: {i.addons.map((a) => ADDONS.find((x) => x.id === a)?.label).join(", ")}</div>}
                      <div className="mt-1 text-right font-mono text-xs">{fmt(itemTotal(i))}</div>
                    </li>
                  );
                })}
              </ul>
              <div className="my-5"><PromoField /></div>
              <Summary />
              <button className={`${btnPrimary} mt-6 w-full`} disabled={busy || bad.length > 0}>{busy ? "Processing…" : "Confirm Booking"}</button>
            </div>
          </aside>
        </form>
      </Wrap>
    </>
  );
}

export function PaymentFailed() {
  return (
    <Wrap className="py-24 text-center">
      <XCircle className="mx-auto text-vermilion" size={52} strokeWidth={1.3} />
      <h1 className="mt-5 font-display text-5xl">Payment didn&apos;t go through.</h1>
      <p className="mx-auto mt-4 max-w-md text-mute">Your card was declined and you have not been charged. Please check the details or try another payment method. Your cart is saved.</p>
      <div className="mt-8 flex justify-center gap-3"><Link to="/checkout" className={btnPrimary}>Retry payment</Link><Link to="/contact" className={btnGhost}>Contact support</Link></div>
    </Wrap>
  );
}

export function Confirmation() {
  const { lastOrder: o, notify } = useStore();
  if (!o) return <Wrap className="py-24 text-center"><p className="font-display text-4xl">No recent booking.</p><Link to="/account" className={`${btnPrimary} mt-6`}>View my bookings</Link></Wrap>;
  return (
    <Wrap className="max-w-[900px] py-16">
      <div className="text-center">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-sea text-white"><Check size={30} /></div>
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-vermilion">Booking confirmed</p>
        <h1 className="mt-2 font-display text-5xl sm:text-6xl">Bon voyage.</h1>
        <div className="mx-auto mt-6 inline-block border border-dashed border-ink px-8 py-4"><div className={label}>Booking reference</div><div className="font-mono text-3xl tracking-widest">{o.ref}</div></div>
      </div>
      <Notice tone="info"><span className="flex items-center gap-2"><Mail size={16} />A confirmation email with your itinerary is on its way.</span></Notice>
      <section className="mt-8 border border-line bg-card p-6">
        <h2 className="font-display text-2xl">Booking summary</h2>
        <ul className="mt-4 divide-y divide-line border-t border-line">
          {o.items.map((i) => { const p = getPkg(i.pkgId)!; return <li key={i.uid} className="flex justify-between gap-4 py-3 text-sm"><span><strong>{p.name}</strong><br /><span className="text-mute">{fmtDate(i.date)} · {i.pax} pax</span></span><span className="font-mono">{fmt(itemTotal(i))}</span></li>; })}
        </ul>
        <div className="mt-2 flex justify-between border-t border-ink pt-3 font-display text-2xl"><span>Total paid (incl. taxes)</span><span>{fmt(o.total)}</span></div>
      </section>
      <section className="mt-8">
        <h2 className="font-display text-2xl">What happens next</h2>
        <ol className="mt-4 space-y-3 text-sm">
          {["Within 24 hours your travel specialist will email you to confirm traveller details.", "Your e-documents and packing guide arrive 60 days before departure.", "The balance, if any, is due 90 days before you travel."].map((t, k) => <li key={k} className="flex gap-4"><span className="font-mono text-vermilion">0{k + 1}</span>{t}</li>)}
        </ol>
      </section>
      <div className="mt-10 flex flex-wrap gap-3">
        <button onClick={() => notify("Invoice downloaded")} className={btnPrimary}><Download size={16} />Download invoice</button>
        <button onClick={() => notify("Brochure downloaded")} className={btnGhost}><Download size={16} />Download brochure</button>
        <Link to="/account" className={btnGhost}>My bookings</Link>
      </div>
    </Wrap>
  );
}

/* ================= AUTH ================= */
function AuthShell({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <div className="grid min-h-[70vh] md:grid-cols-2">
      <div className="relative hidden bg-ink md:block">
        <img src={img("1585793753011-397e6e4668d6", 1000, 1000)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
        <p className="absolute bottom-10 left-10 max-w-xs font-display text-4xl italic text-white">The world is better when you&apos;re in it.</p>
      </div>
      <div className="flex items-center px-5 py-14 sm:px-12">
        <div className="mx-auto w-full max-w-sm">
          <h1 className="font-display text-5xl">{title}</h1>
          <p className="mt-2 text-mute">{sub}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function Login() {
  const { signIn } = useStore();
  const [e, setE] = useState(""); const [p, setP] = useState(""); const [err, setErr] = useState("");
  return (
    <AuthShell title="Welcome back" sub="Log in to see your trips and saved packages.">
      <form className="space-y-4" onSubmit={(ev) => { ev.preventDefault(); if (!e.trim() || !p) return setErr("Enter your username and password."); const m = signIn(e, p); if (m) return setErr(m); navigate("/account"); }}>
        {err && <Notice>{err}</Notice>}
        <Field title="Username"><TextInput autoComplete="username" value={e} onChange={(x) => setE(x.target.value)} /></Field>
        <Field title="Password"><TextInput type="password" value={p} onChange={(x) => setP(x.target.value)} /></Field>
        <p className="text-xs text-mute">Demo account: sarah.lim / travel123</p>
        <div className="text-right text-sm"><Link to="/forgot" className="underline">Forgot password?</Link></div>
        <button className={`${btnPrimary} w-full`}>Log in</button>
        <p className="text-center text-sm text-mute">New here? <Link to="/register" className="font-semibold text-ink underline">Create an account</Link></p>
      </form>
    </AuthShell>
  );
}

export function Register() {
  const { register } = useStore();
  const [f, setF] = useState({ username: "", name: "", email: "", phone: "", pw: "" }); const [err, setErr] = useState("");
  const s = (k: keyof typeof f) => (x: { target: { value: string } }) => setF({ ...f, [k]: x.target.value });
  return (
    <AuthShell title="Join TravelWithYou" sub="Save trips, speed up checkout and get new-user deals.">
      <form className="space-y-4" onSubmit={(ev) => { ev.preventDefault(); if (!/^[a-z0-9._-]{3,20}$/i.test(f.username.trim())) return setErr("Username must be 3-20 letters, numbers, dots, dashes or underscores."); if (!f.name || !/^\S+@\S+$/.test(f.email) || f.pw.length < 8) return setErr("Please add your full name, a valid email and a password of 8+ characters."); const m = register({ username: f.username, name: f.name, email: f.email, phone: f.phone }, f.pw); if (m) return setErr(m); navigate("/account"); }}>
        {err && <Notice>{err}</Notice>}
        <Field title="Username"><TextInput autoComplete="username" value={f.username} onChange={s("username")} /></Field>
        <Field title="Full name"><TextInput value={f.name} onChange={s("name")} /></Field>
        <Field title="Email"><TextInput type="email" value={f.email} onChange={s("email")} /></Field>
        <Field title="Phone"><TextInput type="tel" value={f.phone} onChange={s("phone")} /></Field>
        <Field title="Password"><TextInput type="password" value={f.pw} onChange={s("pw")} /></Field>
        <button className={`${btnPrimary} w-full`}>Create account</button>
        <p className="text-center text-sm text-mute">Already registered? <Link to="/login" className="font-semibold text-ink underline">Log in</Link></p>
      </form>
    </AuthShell>
  );
}

export function Forgot() {
  const [step, setStep] = useState(0); const [e, setE] = useState(""); const [pw, setPw] = useState("");
  return (
    <AuthShell title={step === 2 ? "Password updated" : "Reset password"} sub={step === 0 ? "We will email you a reset link." : step === 1 ? `Link sent to ${e}. Demo: set a new password below.` : "You can now log in."}>
      {step === 0 && <form className="space-y-4" onSubmit={(ev) => { ev.preventDefault(); if (/^\S+@\S+$/.test(e)) setStep(1); }}><Field title="Email"><TextInput type="email" value={e} onChange={(x) => setE(x.target.value)} /></Field><button className={`${btnPrimary} w-full`}>Send reset link</button></form>}
      {step === 1 && <form className="space-y-4" onSubmit={(ev) => { ev.preventDefault(); if (pw.length >= 8) setStep(2); }}><Field title="New password (8+ characters)"><TextInput type="password" value={pw} onChange={(x) => setPw(x.target.value)} /></Field><button className={`${btnPrimary} w-full`}>Reset password</button></form>}
      {step === 2 && <Link to="/login" className={`${btnPrimary} w-full`}>Go to log in</Link>}
    </AuthShell>
  );
}

/* ================= ACCOUNT ================= */
const TABS = ["Profile", "Bookings", "Wishlist", "Travellers", "Payment methods", "Notifications", "Support", "Security"];

function BookingCard({ b }: { b: Booking }) {
  return (
    <div className="border border-line bg-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-2"><span className="font-mono text-sm">{b.ref}</span><span className={`px-2 py-0.5 font-mono text-[11px] uppercase tracking-widest ${b.status === "Upcoming" ? "bg-sea text-white" : "bg-paper-deep"}`}>{b.status}</span></div>
      {b.items.map((i) => { const p = getPkg(i.pkgId)!; return <div key={i.uid} className="mt-3 flex gap-4"><img src={img(p.image, 200, 140)} alt="" className="h-16 w-24 bg-sea/30 object-cover" /><div className="text-sm"><div className="font-display text-xl">{p.name}</div><div className="text-mute">{fmtDate(i.date)} · {i.pax} pax</div></div></div>; })}
      <div className="mt-3 border-t border-line pt-2 text-right font-display text-xl">{fmt(b.total)}</div>
    </div>
  );
}

export function Account() {
  const { user, logout, bookings, wishlist, notify, changeUsername } = useStore();
  const [tab, setTab] = useState("Profile");
  const [prof, setProf] = useState(user ?? { username: "", name: "", email: "", phone: "" });
  const [uErr, setUErr] = useState("");
  const [pref, setPref] = useState({ deals: true, trips: true, news: false });
  const [tfa, setTfa] = useState(false);
  useEffect(() => { if (!user) navigate("/login"); }, [user]);
  if (!user) return null;
  const up = bookings.filter((b) => b.status === "Upcoming");
  const save = (m = "Saved") => (e: React.FormEvent) => { e.preventDefault(); notify(m); };
  return (
    <>
      <PageHead kicker="My account" title={`Hello, ${user.username}.`} />
      <Wrap className="grid gap-10 py-10 lg:grid-cols-12">
        <nav className="flex gap-1 overflow-x-auto lg:col-span-3 lg:flex-col" aria-label="Account sections">
          {TABS.map((t) => <button key={t} onClick={() => setTab(t)} className={`shrink-0 px-4 py-3 text-left text-sm font-semibold ${tab === t ? "bg-ink text-paper" : "hover:bg-paper-deep"}`}>{t}</button>)}
          <button onClick={() => { logout(); navigate("/"); }} className="shrink-0 px-4 py-3 text-left text-sm font-semibold text-vermilion hover:bg-paper-deep">Log out</button>
        </nav>
        <div className="lg:col-span-9">
          {tab === "Profile" && (
            <form onSubmit={(e) => { e.preventDefault(); const m = changeUsername(prof.username); setUErr(m); if (!m) notify("Profile updated"); }} className="grid max-w-xl gap-4 border border-line bg-card p-6">
              <Field title="Username" error={uErr}><TextInput value={prof.username} error={!!uErr} autoComplete="username" onChange={(e) => setProf({ ...prof, username: e.target.value })} /></Field>
              <p className="-mt-2 text-xs text-mute">Your username is unique and is used to log in.</p>
              <Field title="Email"><TextInput type="email" value={prof.email} onChange={(e) => setProf({ ...prof, email: e.target.value })} /></Field>
              <Field title="Phone"><TextInput value={prof.phone} onChange={(e) => setProf({ ...prof, phone: e.target.value })} /></Field>
              <Field title="Password"><TextInput type="password" defaultValue="••••••••" disabled /></Field>
              <button className={btnPrimary}>Save changes</button>
            </form>
          )}
          {tab === "Bookings" && (
            <div className="space-y-4"><h2 className="font-display text-3xl">Upcoming trips ({up.length})</h2>{up.map((b) => <BookingCard key={b.ref} b={b} />)}
              <h2 className="pt-6 font-display text-3xl">Booking history</h2>{bookings.filter((b) => b.status === "Completed").map((b) => <BookingCard key={b.ref} b={b} />)}</div>
          )}
          {tab === "Wishlist" && (
            <div className="grid gap-4 sm:grid-cols-2">{wishlist.map((id) => { const p = getPkg(id)!; return <Link key={id} to={`/package/${id}`} className="flex gap-4 border border-line bg-card p-4 hover:border-ink"><img src={img(p.image, 200, 160)} alt="" className="size-20 bg-sea/30 object-cover" /><div><div className="font-display text-xl leading-tight">{p.name}</div><div className="text-sm text-mute">from {fmt(p.priceFrom)}</div></div></Link>; })}{wishlist.length === 0 && <p className="text-mute">No saved packages yet.</p>}</div>
          )}
          {tab === "Travellers" && (
            <form onSubmit={save("Traveller details saved")} className="grid max-w-xl gap-4 border border-line bg-card p-6 sm:grid-cols-2">
              <Field title="IC number"><TextInput placeholder="e.g. 900101-14-5678" /></Field>
              <Field title="Name as per IC"><TextInput autoComplete="name" /></Field>
              <Field title="Passport number"><TextInput placeholder="X1234567" /></Field>
              <Field title="Passport expiry date"><TextInput type="date" /></Field>
              <Field title="Nationality"><TextInput /></Field><Field title="Date of birth"><TextInput type="date" /></Field>
              <div className="sm:col-span-2"><Field title="Billing address"><TextInput autoComplete="street-address" /></Field></div>
              <div className="sm:col-span-2"><Field title="Dietary / accessibility needs"><TextInput placeholder="e.g. vegetarian, step-free access" /></Field></div>
              <button className={`${btnPrimary} sm:col-span-2`}>Save traveller</button>
            </form>
          )}
          {tab === "Payment methods" && (
            <div className="max-w-xl space-y-3">
              <div className="flex items-center justify-between border border-line bg-card p-5"><span className="flex items-center gap-3"><CreditCard />Visa ending 4242</span><span className="font-mono text-xs text-mute">Expires 08/29</span></div>
              <button onClick={() => notify("Card form would open here")} className={btnGhost}>Add payment method</button>
            </div>
          )}
          {tab === "Notifications" && (
            <div className="max-w-xl divide-y divide-line border border-line bg-card">
              {([["deals", "New deals and offers"], ["trips", "Reminders for upcoming trips"], ["news", "Monthly newsletter"]] as const).map(([k, l]) => (
                <label key={k} className="flex cursor-pointer items-center justify-between p-5 text-sm">{l}<input type="checkbox" className="size-5 accent-vermilion" checked={pref[k]} onChange={() => setPref({ ...pref, [k]: !pref[k] })} /></label>
              ))}
            </div>
          )}
          {tab === "Support" && (
            <div className="max-w-xl space-y-4"><div className="border border-line bg-card p-5 text-sm"><div className="font-mono text-xs text-mute">12 Sep 2026 · Resolved</div><div className="mt-1 font-semibold">Change travel date for TWY-48215</div><div className="text-mute">Date moved to 23 Jan 2027 at no cost.</div></div>
              <Link to="/contact" className={btnPrimary}>New support request</Link></div>
          )}
          {tab === "Security" && (
            <div className="max-w-xl space-y-4">
              <form onSubmit={save("Password changed")} className="grid gap-4 border border-line bg-card p-6"><h2 className="font-display text-2xl">Change password</h2><Field title="Current password"><TextInput type="password" /></Field><Field title="New password"><TextInput type="password" /></Field><button className={btnPrimary}>Update password</button></form>
              <label className="flex cursor-pointer items-center justify-between border border-line bg-card p-5 text-sm"><span><strong className="block">Two-factor authentication</strong><span className="text-mute">{tfa ? "Enabled via authenticator app" : "Add an extra layer of security"}</span></span><input type="checkbox" className="size-5 accent-vermilion" checked={tfa} onChange={() => setTfa(!tfa)} /></label>
              <button onClick={() => notify("Logged out from all devices")} className={btnGhost}>Log out from all devices</button>
            </div>
          )}
        </div>
      </Wrap>
    </>
  );
}
