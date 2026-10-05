import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
        <Link to="/" className="font-display text-2xl tracking-[0.3em]">ZARWI</Link>
        <nav className="flex items-center gap-5 md:gap-8">
          <Link to="/collection" className="eyebrow hover:text-foreground" activeProps={{ className: "text-foreground" }}>Collection</Link>
          <Link to="/create" className="eyebrow hidden hover:text-foreground sm:inline" activeProps={{ className: "text-foreground" }}>Create</Link>
          <Link to="/create" className="btn-primary !px-4 !py-2.5">Free preview</Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-3 md:px-10">
        <div>
          <p className="font-display text-3xl tracking-[0.3em]">ZARWI</p>
          <p className="mt-4 max-w-xs text-sm opacity-70">Interactive digital wedding invitations, personalized for your celebration.</p>
        </div>
        <div className="space-y-3 text-sm opacity-80">
          <Link to="/collection" className="block hover:opacity-100">The Collection</Link>
          <Link to="/create" className="block hover:opacity-100">Request a free preview</Link>
        </div>
        <p className="text-xs tracking-[0.2em] uppercase opacity-60 md:text-right">© {new Date().getFullYear()} ZARWI · Made for every celebration</p>
      </div>
    </footer>
  );
}
