import { Link } from "@tanstack/react-router";
import type { InvitationDesign } from "@/data/designs";

export function DesignCard({ design, tall, eager }: { design: InvitationDesign; tall?: boolean; eager?: boolean }) {
  return (
    <article className="group reveal">
      <a href={design.demoUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${design.name} invitation`} className="block overflow-hidden bg-muted">
        <img
          src={design.thumbnail}
          alt={`${design.name} digital wedding invitation`}
          width={768}
          height={1024}
          loading={eager ? "eager" : "lazy"}
          className={`w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04] ${tall ? "aspect-[3/4.4]" : "aspect-[3/4]"}`}
        />
      </a>
      <div className="mt-5 flex items-baseline gap-4">
        <span className="font-display text-3xl italic text-gold">{design.number}</span>
        <div className="flex-1">
          <h3 className="text-2xl leading-tight md:text-3xl">{design.name}</h3>
          <p className="eyebrow mt-1">{design.category}</p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{design.description}</p>
      <div className="mt-5 flex flex-wrap items-center gap-6">
        <a href={design.demoUrl} target="_blank" rel="noopener noreferrer" className="link-line">View invitation</a>
        <Link to="/create" search={{ design: design.id }} className="link-line">Try this design</Link>
      </div>
    </article>
  );
}
