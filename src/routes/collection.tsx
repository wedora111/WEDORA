import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { invitationDesigns } from "@/data/designs";
import { DesignCard } from "@/components/DesignCard";

const TITLE = "The WEDORA Collection — Interactive Wedding Invitations";
const DESC = "Browse 21 interactive digital wedding invitation designs. View each live and try your favourite.";

export const Route = createFileRoute("/collection")({
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
  component: Collection,
});

function Collection() {
  const categories = ["All", ...Array.from(new Set(invitationDesigns.map((d) => d.category)))];
  const [cat, setCat] = useState("All");
  const list = cat === "All" ? invitationDesigns : invitationDesigns.filter((d) => d.category === cat);

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 md:px-10 md:py-24">
      <p className="eyebrow reveal">The WEDORA collection</p>
      <h1 className="reveal mt-4 max-w-3xl text-5xl leading-[1] md:text-7xl">Choose the invitation that feels like your story.</h1>
      <div className="-mx-5 mt-10 flex gap-6 overflow-x-auto border-b border-border px-5 pb-3 md:mx-0 md:px-0">
        {categories.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`eyebrow shrink-0 pb-1 transition-colors ${cat === c ? "!text-foreground border-b border-gold" : "hover:text-foreground"}`}>
            {c}
          </button>
        ))}
      </div>
      <div className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((d, i) => (
          <div key={d.id} className={`${i % 3 === 1 ? "lg:mt-24" : ""} ${i % 2 === 1 ? "sm:mt-12 lg:mt-0" : ""}`}>
            <DesignCard design={d} tall={i % 4 === 0 || i % 4 === 3} eager={i < 2} />
          </div>
        ))}
      </div>
    </section>
  );
}
