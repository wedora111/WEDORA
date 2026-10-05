import { createFileRoute, Link } from "@tanstack/react-router";
import { invitationDesigns } from "@/data/designs";
import { DesignCard } from "@/components/DesignCard";
import t1 from "@/assets/designs/t1.jpg";
import t2 from "@/assets/designs/t2.jpg";
import t3 from "@/assets/designs/t3.jpg";

const TITLE = "ZARWI — Digital Wedding Invitations";
const DESC = "Beautiful interactive digital wedding invitations, personalized for your celebration and ready to share.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const steps = [
  ["01", "Choose", "Explore the ZARWI collection."],
  ["02", "Share", "Tell us about your wedding."],
  ["03", "We create", "We personalize your chosen design."],
  ["04", "Share your story", "Receive your invitation link on WhatsApp and share it with your guests."],
];
const why = [
  ["Interactive", "Not a static image. A real digital experience."],
  ["Personal", "Your names, dates, events and story."],
  ["Fast", "Ready within 1–3 hours."],
  ["Shareable", "One link for all your guests."],
  ["Preview first", "Tell us what you want and we'll prepare your personalized invitation."],
];

function Home() {
  const featured = invitationDesigns.slice(0, 6);
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-12 md:grid-cols-12 md:px-10 md:pt-20">
        <div className="md:col-span-6 md:pt-10">
          <p className="eyebrow reveal">Digital wedding invitations</p>
          <h1 className="reveal mt-6 text-[3.1rem] leading-[0.98] md:text-[5.5rem]" style={{ animationDelay: "0.1s" }}>
            Your wedding deserves <em className="text-gold">more</em> than a card.
          </h1>
          <p className="reveal mt-7 max-w-md text-base leading-relaxed text-muted-foreground" style={{ animationDelay: "0.2s" }}>
            Interactive digital wedding invitations, beautifully personalized for your celebration.
          </p>
          <div className="reveal mt-10 flex flex-wrap gap-3" style={{ animationDelay: "0.3s" }}>
            <Link to="/collection" className="btn-primary">Explore invitations</Link>
            <Link to="/create" className="btn-ghost">Create my invitation</Link>
          </div>
        </div>
        <div className="relative h-[460px] md:col-span-6 md:h-[620px]">
          <img src={t2} alt="Cinematic Vows invitation" width={768} height={1024} className="img-reveal absolute left-[4%] top-[8%] w-[48%] shadow-2xl" />
          <img src={t1} alt="Antique Bloom invitation" width={768} height={1024} className="img-reveal absolute right-[2%] top-0 w-[46%] shadow-xl" style={{ animationDelay: "0.25s" }} />
          <img src={t3} alt="Gilded Envelope invitation" width={768} height={1024} className="img-reveal absolute bottom-0 left-[30%] w-[42%] shadow-2xl" style={{ animationDelay: "0.5s" }} />
          <span className="eyebrow absolute bottom-3 right-0 rotate-90 origin-bottom-right">Tap · Scroll · Open</span>
        </div>
      </section>

      {/* Featured */}
      <section className="border-t border-border bg-card/60">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">The ZARWI collection</p>
              <h2 className="mt-4 text-4xl md:text-6xl">Choose the invitation that feels like your story.</h2>
            </div>
            <Link to="/collection" className="link-line self-start md:self-end">All {invitationDesigns.length} designs</Link>
          </div>
          <div className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((d, i) => (
              <div key={d.id} className={i % 3 === 1 ? "lg:mt-20" : ""}>
                <DesignCard design={d} tall={i % 2 === 0} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
          <p className="eyebrow !text-champagne">How it works</p>
          <h2 className="mt-4 max-w-2xl text-4xl md:text-6xl">From your story to your guests' screens.</h2>
          <ol className="mt-14 grid gap-10 md:grid-cols-4">
            {steps.map(([n, t, d]) => (
              <li key={n} className="border-t border-champagne/30 pt-6">
                <span className="font-display text-5xl italic text-gold">{n}</span>
                <h3 className="mt-4 text-2xl">{t}</h3>
                <p className="mt-2 text-sm opacity-70">{d}</p>
              </li>
            ))}
          </ol>
          <p className="eyebrow mt-14 !text-champagne">Typical delivery: 1–3 hours</p>
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
        <p className="eyebrow">Why ZARWI</p>
        <div className="mt-10 divide-y divide-border border-y border-border">
          {why.map(([t, d]) => (
            <div key={t} className="grid gap-2 py-7 md:grid-cols-12 md:items-baseline">
              <h3 className="text-3xl md:col-span-5 md:text-5xl">{t}</h3>
              <p className="text-muted-foreground md:col-span-7">{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-20 text-center">
          <h2 className="text-4xl md:text-6xl">Found the one?</h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">Share your details — we'll prepare your personalized preview and send it to you on WhatsApp. No payment needed to request.</p>
          <Link to="/create" className="btn-primary mt-8">Request my free preview</Link>
        </div>
      </section>
    </>
  );
}
