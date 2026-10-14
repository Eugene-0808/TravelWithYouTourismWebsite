import { useState } from "react"
import { Plus, Minus, Mail, Phone, MapPin } from "lucide-react"
import { Link, useStore } from "./store"
import { BLOG, CONTACT, FAQS, img } from "./data"
import {
  Field,
  PageHead,
  TextInput,
  Wrap,
  btnPrimary,
  input,
  label,
} from "./ui"
import { NotFound } from "./pages1"

const SECTIONS = [
  {
    t: "Company Story",
    b: "TravelWithYou began in 2009 as two friends and a borrowed minivan, driving small groups through Andalusia. Seventeen years on we run tours and cruises in forty countries, but we still plan every itinerary as if we were going ourselves.",
  },
  {
    t: "Mission & Vision",
    b: "We want travel to be unhurried, honest about its costs and good for the places it touches. Our vision is a world where a well-planned trip is within reach of anyone curious enough to book one.",
  },
  {
    t: "Awards & Certifications",
    b: "World Travel Awards: Best Tour Operator, Europe (2024). Certified B Corporation since 2022. Member of ATOL and the Cruise Lines International Association.",
  },
  {
    t: "Sustainability & Responsible Tourism",
    b: "We cap group sizes, work with locally owned lodges, offset 120% of trip emissions and donate $15 per guest to conservation partners in each destination.",
  },
  {
    t: "Careers",
    b: "We hire trip designers, destination specialists and engineers. Roles are hybrid, with an annual travel allowance. Write to careers@travelwithyou.com.",
  },
  {
    t: "Press / Media",
    b: "For interviews, images and fact sheets, contact press@travelwithyou.com. Our press kit is updated each quarter.",
  },
]
const TEAM = [
  ["Amara Okafor", "Founder & CEO", "1573496359142-b8d87734a5a2"],
  ["Daniel Reyes", "Head of Destinations", "1472099645785-5658abf4ff4e"],
  ["Mei Tanaka", "Director, Cruises", "1438761681033-6461ffad8d80"],
  ["Lucas Berg", "Head of Sustainability", "1507003211169-0a1dd7228f2d"],
]

export function About() {
  return (
    <>
      <PageHead kicker="About" title="Planned by people who have been there.">
        We are a travel company of 140 specialists, with one rule: never sell a
        trip we would not take.
      </PageHead>
      <Wrap className="py-12">
        <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          {SECTIONS.map((s, k) => (
            <section key={s.t} className="border-t border-ink pt-4">
              <div className="font-mono text-xs text-vermilion">0{k + 1}</div>
              <h2 className="mt-1 font-display text-3xl">{s.t}</h2>
              <p className="mt-3 leading-relaxed text-mute">{s.b}</p>
            </section>
          ))}
        </div>
        <h2 className="mb-6 mt-20 border-b border-ink pb-2 font-display text-4xl">
          Team
        </h2>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {TEAM.map(([n, r, i]) => (
            <div key={n}>
              <div className="aspect-[4/5] overflow-hidden bg-sea/30">
                <img
                  src={img(i, 500, 625)}
                  alt={n}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale"
                />
              </div>
              <div className="mt-3 font-display text-xl">{n}</div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-mute">
                {r}
              </div>
            </div>
          ))}
        </div>
      </Wrap>
    </>
  )
}

export function Contact() {
  const { notify } = useStore()
  const [f, setF] = useState({
    name: "",
    email: "",
    topic: "Booking enquiry",
    msg: "",
  })
  const [err, setErr] = useState("")
  return (
    <>
      <PageHead kicker="Contact us" title="Leave us a message." />
      <Wrap className="grid gap-12 py-12 md:grid-cols-12">
        <form
          className="space-y-4 md:col-span-7"
          onSubmit={(e) => {
            e.preventDefault()
            if (!f.name || !/^\S+@\S+$/.test(f.email) || f.msg.length < 10)
              return setErr(
                "Please add your name, a valid email and a message.",
              )
            setErr("")
            notify("Message sent. We reply within one working day.")
            setF({ ...f, msg: "" })
          }}
        >
          {err && (
            <p
              role="alert"
              className="border-l-4 border-vermilion bg-vermilion/10 px-4 py-3 text-sm"
            >
              {err}
            </p>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field title="Name">
              <TextInput
                value={f.name}
                onChange={(e) => setF({ ...f, name: e.target.value })}
              />
            </Field>
            <Field title="Email">
              <TextInput
                type="email"
                value={f.email}
                onChange={(e) => setF({ ...f, email: e.target.value })}
              />
            </Field>
          </div>
          <label className="block">
            <span className={label}>Topic</span>
            <select
              value={f.topic}
              onChange={(e) => setF({ ...f, topic: e.target.value })}
              className={input}
            >
              {[
                "Booking enquiry",
                "Existing booking",
                "Group travel",
                "Press",
              ].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className={label}>Message</span>
            <textarea
              rows={6}
              value={f.msg}
              onChange={(e) => setF({ ...f, msg: e.target.value })}
              className={input}
            />
          </label>
          <button className={btnPrimary}>Send message</button>
        </form>
        <aside className="space-y-6 md:col-span-5">
          <div className="space-y-4 border border-line bg-card p-6 text-sm">
            <p className="flex gap-3">
              <Phone size={18} className="shrink-0 text-vermilion" />
              {CONTACT.phone}
            </p>
            <p className="flex gap-3">
              <Mail size={18} className="shrink-0 text-vermilion" />
              {CONTACT.email}
            </p>
            <p className="flex gap-3">
              <MapPin size={18} className="shrink-0 text-vermilion" />
              {CONTACT.address}
            </p>
            <p className="border-t border-line pt-4 text-mute">
              Mon–Fri 8am–8pm PT · Sat 9am–4pm PT
            </p>
          </div>
        </aside>
      </Wrap>
    </>
  )
}

export function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <>
      <PageHead kicker="FAQ" title="Questions, answered." />
      <Wrap className="max-w-[860px] py-12">
        {FAQS.map((f, k) => (
          <div key={f.q} className="border-b border-line">
            <button
              onClick={() => setOpen(open === k ? -1 : k)}
              aria-expanded={open === k}
              className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-2xl"
            >
              {f.q}
              {open === k ? <Minus size={20} /> : <Plus size={20} />}
            </button>
            {open === k && (
              <p className="pb-6 leading-relaxed text-mute">{f.a}</p>
            )}
          </div>
        ))}
        <p className="mt-10 text-mute">
          Still need help?{" "}
          <Link to="/contact" className="font-semibold text-ink underline">
            Contact us
          </Link>
          .
        </p>
      </Wrap>
    </>
  )
}

const POLICIES: Record<string, { title: string items: [string, string][] }> = {
  terms: {
    title: "Terms & Conditions",
    items: [
      [
        "Booking contract",
        "A booking is confirmed when we issue a reference number and receive your deposit. Prices are per person in US dollars and include the services listed on each package page.",
      ],
      [
        "Changes by you",
        "Date and traveller changes are free up to 60 days before departure, subject to availability. Later changes may incur supplier fees.",
      ],
      [
        "Changes by us",
        "We may adjust itineraries for safety, weather or supplier reasons. If a change is significant you can accept it, choose an alternative or receive a full refund.",
      ],
      [
        "Liability",
        "We are responsible for the proper performance of the services we sell. We are not liable for events outside our reasonable control.",
      ],
    ],
  },
  privacy: {
    title: "Privacy Policy",
    items: [
      [
        "What we collect",
        "Contact details, passport information needed to book, payment tokens and the preferences you share with us.",
      ],
      [
        "How we use it",
        "To process bookings, provide support, send requested updates and meet legal requirements. We never sell personal data.",
      ],
      [
        "Sharing",
        "We share only what suppliers need to deliver your trip: airlines, hotels and cruise lines, under data-protection agreements.",
      ],
      [
        "Your rights",
        "You can request access, correction or deletion at any time at privacy@travelwithyou.com.",
      ],
    ],
  },
  cancellation: {
    title: "Cancellation & Refund Policy",
    items: [
      [
        "90 days or more",
        "Full refund of all payments, less a $50 administration fee per booking.",
      ],
      [
        "89 to 45 days",
        "30% of the total package price is retained. The remainder is refunded.",
      ],
      [
        "44 days or fewer",
        "Non-refundable. We recommend travel insurance, available as an add-on.",
      ],
      [
        "If we cancel",
        "You receive a full refund within 14 days or may transfer to another departure at no cost.",
      ],
    ],
  },
}

export function Policy({ id }: { id: string }) {
  const p = POLICIES[id]
  return (
    <>
      <PageHead kicker="Legal" title={p.title}>
        Last updated 1 September 2026.
      </PageHead>
      <Wrap className="max-w-[820px] py-12">
        {p.items.map(([h, b], k) => (
          <section key={h} className="mb-8">
            <h2 className="font-display text-2xl">
              <span className="mr-3 font-mono text-xs text-vermilion">
                {k + 1}.
              </span>
              {h}
            </h2>
            <p className="mt-2 leading-relaxed text-mute">{b}</p>
          </section>
        ))}
      </Wrap>
    </>
  )
}

export function Blog() {
  return (
    <>
      <PageHead kicker="Travel guides" title="Field notes." />
      <Wrap className="grid gap-8 py-12 md:grid-cols-2">
        {BLOG.map((b) => (
          <Link key={b.id} to={`/blog/${b.id}`} className="group block">
            <div className="aspect-[3/2] overflow-hidden bg-sea/30">
              <img
                src={img(b.image, 800, 533)}
                alt={b.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-vermilion">
              {b.tag} · {b.read} read
            </div>
            <h2 className="mt-1 font-display text-3xl leading-snug group-hover:underline">
              {b.title}
            </h2>
          </Link>
        ))}
      </Wrap>
    </>
  )
}

export function BlogPost({ id }: { id: string }) {
  const b = BLOG.find((x) => x.id === id)
  if (!b) return <NotFound />
  return (
    <Wrap className="max-w-[780px] py-14">
      <Link
        to="/blog"
        className="font-mono text-xs uppercase tracking-widest text-mute hover:text-ink"
      >
        ← Travel guides
      </Link>
      <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-vermilion">
        {b.tag} · {b.read} read
      </div>
      <h1 className="mt-2 font-display text-5xl leading-tight">{b.title}</h1>
      <img
        src={img(b.image, 1200, 700)}
        alt={b.title}
        className="mt-8 aspect-[16/9] w-full bg-sea/30 object-cover"
      />
      <p className="mt-8 text-lg leading-relaxed">{b.body}</p>
    </Wrap>
  )
}
