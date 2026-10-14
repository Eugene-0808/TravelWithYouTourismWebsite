import { StoreProvider, usePath } from "./store"
import { Footer, Header, Toast } from "./ui"
import {
  CountryPage,
  Deals,
  Destinations,
  Home,
  NotFound,
  PackageDetail,
  SearchResults,
  ShipDetail,
  Ships,
} from "./pages1"
import {
  Account,
  Cart,
  Checkout,
  Confirmation,
  Forgot,
  Login,
  PaymentFailed,
  Register,
} from "./pages2"
import { About, Blog, BlogPost, Contact, Faq, Policy } from "./pages3"

function Routes({ path }: { path: string }) {
  const [, a, b, c] = path.split("/")
  switch (a) {
    case "":
      return <Home />
    case "destinations":
      if (b === "region" && c)
        return <Destinations region={decodeURIComponent(c)} />
      return b ? <CountryPage id={b} /> : <Destinations />
    case "package":
      return <PackageDetail id={b} />
    case "deals":
      return <Deals />
    case "ships":
      return b ? <ShipDetail id={b} /> : <Ships />
    case "search":
      return <SearchResults />
    case "cart":
      return <Cart />
    case "checkout":
      return <Checkout />
    case "confirmation":
      return <Confirmation />
    case "payment-failed":
      return <PaymentFailed />
    case "login":
      return <Login />
    case "register":
      return <Register />
    case "forgot":
      return <Forgot />
    case "account":
      return <Account />
    case "about":
      return <About />
    case "contact":
      return <Contact />
    case "faq":
      return <Faq />
    case "terms":
    case "privacy":
    case "cancellation":
      return <Policy id={a} />
    case "blog":
      return b ? <BlogPost id={b} /> : <Blog />
    default:
      return <NotFound />
  }
}

export default function App() {
  const path = usePath()
  return (
    <StoreProvider>
      <Header path={path} />
      <main key={path}>
        <Routes path={path} />
      </main>
      <Footer />
      <Toast />
    </StoreProvider>
  )
}
