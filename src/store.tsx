import { createContext, useCallback, useContext, useEffect, useState, type ReactNode, type AnchorHTMLAttributes } from "react";
import { PROMOS, TAX_RATE, itemAvailable, itemTotal, getPkg, type Booking, type CartItem } from "./data";

/* ---------- hash router ---------- */
const read = () => (window.location.hash.slice(1) || "/").split("?")[0];

export function usePath() {
  const [path, setPath] = useState(read);
  useEffect(() => {
    const on = () => {
      setPath(read());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return path;
}

export const navigate = (to: string) => {
  window.location.hash = to;
};

export function Link({ to, ...rest }: { to: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a href={"#" + to} {...rest} />;
}

/* ---------- search filters ---------- */
export interface Filters {
  q: string;
  ship: string;
  country: string;
  depPort: string;
  destPort: string;
  month: string;
  price: string;
  duration: string;
  type: string;
}
export const EMPTY_FILTERS: Filters = { q: "", ship: "", country: "", depPort: "", destPort: "", month: "", price: "", duration: "", type: "" };

/* ---------- app store ---------- */
export interface User { username: string; name: string; email: string; phone: string }
interface Account { password: string; user: User }

interface Store {
  cart: CartItem[];
  addToCart: (pkgId: string, date: string, pax: number, addons: string[]) => void;
  updateItem: (uid: string, patch: Partial<CartItem>) => void;
  removeItem: (uid: string) => void;
  clearCart: () => void;
  promo: string;
  promoPct: number;
  applyPromo: (code: string) => boolean;
  totals: { subtotal: number; discount: number; taxes: number; total: number };
  user: User | null;
  register: (u: User, password: string) => string;
  signIn: (username: string, password: string) => string;
  changeUsername: (next: string) => string;
  logout: () => void;
  wishlist: string[];
  toggleWish: (id: string) => void;
  bookings: Booking[];
  lastOrder: Booking | null;
  placeOrder: () => Booking;
  filters: Filters;
  setFilters: (f: Filters) => void;
  toast: string;
  notify: (m: string) => void;
}

const Ctx = createContext<Store>(null as unknown as Store);
export const useStore = () => useContext(Ctx);

const uid = () => Math.random().toString(36).slice(2, 8);

const SEED_BOOKING: Booking[] = [
  { ref: "TWY-48215", items: [{ uid: "b1", pkgId: "andaman-escape", date: "2027-01-23", pax: 2, addons: ["insurance"] }], total: 4420, placed: "2026-09-02", status: "Upcoming" },
  { ref: "TWY-30977", items: [{ uid: "b2", pkgId: "iceland-aurora", date: "2026-02-07", pax: 2, addons: [] }], total: 7360, placed: "2025-11-14", status: "Completed" },
];

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([
    { uid: "c1", pkgId: "amalfi-escape", date: "2027-06-12", pax: 2, addons: ["transfer"] },
    { uid: "c2", pkgId: "sakura-rail", date: "2026-12-05", pax: 2, addons: [] },
  ]);
  const [promo, setPromo] = useState("");
  const [promoPct, setPromoPct] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [accounts, setAccounts] = useState<Record<string, Account>>({
    "sarah.lim": { password: "travel123", user: { username: "sarah.lim", name: "Sarah Lim", email: "sarah.lim@example.com", phone: "+1 415 555 0188" } },
  });
  const [wishlist, setWishlist] = useState<string[]>(["kyoto-retreat", "mara-migration"]);
  const [bookings, setBookings] = useState<Booking[]>(SEED_BOOKING);
  const [lastOrder, setLastOrder] = useState<Booking | null>(null);
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [toast, setToast] = useState("");

  const notify = useCallback((m: string) => {
    setToast(m);
    window.setTimeout(() => setToast(""), 2600);
  }, []);

  const addToCart: Store["addToCart"] = (pkgId, date, pax, addons) => {
    setCart((c) => [...c, { uid: uid(), pkgId, date, pax, addons }]);
    notify(`${getPkg(pkgId)?.name} added to cart`);
  };

  const subtotal = cart.reduce((s, i) => s + itemTotal(i), 0);
  const discount = subtotal * promoPct;
  const taxes = (subtotal - discount) * TAX_RATE;
  const totals = { subtotal, discount, taxes, total: subtotal - discount + taxes };

  const placeOrder = () => {
    const b: Booking = {
      ref: "TWY-" + Math.floor(10000 + Math.random() * 89999),
      items: cart.filter(itemAvailable),
      total: totals.total,
      placed: new Date().toISOString().slice(0, 10),
      status: "Upcoming",
    };
    setBookings((x) => [b, ...x]);
    setLastOrder(b);
    setCart([]);
    setPromo("");
    setPromoPct(0);
    return b;
  };

  const value: Store = {
    cart,
    addToCart,
    updateItem: (id, patch) => setCart((c) => c.map((i) => (i.uid === id ? { ...i, ...patch } : i))),
    removeItem: (id) => setCart((c) => c.filter((i) => i.uid !== id)),
    clearCart: () => setCart([]),
    promo,
    promoPct,
    applyPromo: (code) => {
      const pct = PROMOS[code.trim().toUpperCase()];
      if (!pct) return false;
      setPromo(code.trim().toUpperCase());
      setPromoPct(pct);
      return true;
    },
    totals,
    user,
    register: (u, password) => {
      const key = u.username.trim().toLowerCase();
      if (accounts[key]) return "That username is already taken. Please choose another.";
      const nu = { ...u, username: u.username.trim() };
      setAccounts((a) => ({ ...a, [key]: { password, user: nu } }));
      setUser(nu);
      return "";
    },
    signIn: (username, password) => {
      const a = accounts[username.trim().toLowerCase()];
      if (!a || a.password !== password) return "Username or password is incorrect.";
      setUser(a.user);
      return "";
    },
    changeUsername: (next) => {
      if (!user) return "";
      const key = next.trim().toLowerCase();
      if (!/^[a-z0-9._-]{3,20}$/i.test(next.trim())) return "Use 3-20 letters, numbers, dots, dashes or underscores.";
      if (key !== user.username.toLowerCase() && accounts[key]) return "That username is already taken.";
      const nu = { ...user, username: next.trim() };
      setAccounts((a) => {
        const { [user.username.toLowerCase()]: old, ...rest } = a;
        return { ...rest, [key]: { password: old?.password ?? "", user: nu } };
      });
      setUser(nu);
      return "";
    },
    logout: () => setUser(null),
    wishlist,
    toggleWish: (id) => setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id])),
    bookings,
    lastOrder,
    placeOrder,
    filters,
    setFilters,
    toast,
    notify,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
