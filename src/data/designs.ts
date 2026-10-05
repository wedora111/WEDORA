import t1 from "@/assets/designs/t1.jpg";
import t2 from "@/assets/designs/t2.jpg";
import t3 from "@/assets/designs/t3.jpg";
import t4 from "@/assets/designs/t4.jpg";

export type InvitationDesign = {
  id: string;
  number: string;
  name: string;
  category: string;
  description: string;
  thumbnail: string;
  demoUrl: string;
};

/**
 * The ZARWI showcase collection. To add a design, append an entry.
 * Replace `thumbnail` with the real screenshot of each invitation when available.
 */
export const invitationDesigns: InvitationDesign[] = [
  { id: "01", number: "01", name: "Antique Bloom", category: "Botanical", description: "Vintage florals and soft ink, unfolding like a pressed keepsake.", thumbnail: t1, demoUrl: "https://henna-bloom-invites.vercel.app/arian-elara-01" },
  { id: "02", number: "02", name: "Cinematic Vows", category: "Cinematic", description: "A film-like opening sequence that sets the stage for your story.", thumbnail: t2, demoUrl: "https://cinematic-vows.vercel.app/arian-elara-02" },
  { id: "03", number: "03", name: "Gilded Envelope", category: "Classic", description: "A sealed envelope that opens to reveal your invitation.", thumbnail: t3, demoUrl: "https://glided-envelope.vercel.app/arian-elara-03" },
  { id: "04", number: "04", name: "Lantern Glow", category: "Festive", description: "Warm lantern light and evening tones for a celebration after dusk.", thumbnail: t4, demoUrl: "https://lantern-glow.vercel.app/arian-elara-04" },
  { id: "05", number: "05", name: "Velvet Reveal", category: "Cinematic", description: "Deep velvet curtains part to unveil the couple.", thumbnail: t2, demoUrl: "https://velvet-reveal-kappa.vercel.app/arian-elara-05" },
  { id: "06", number: "06", name: "Haldi Bloom", category: "Festive", description: "Sunlit yellows and marigolds for joyful pre-wedding days.", thumbnail: t4, demoUrl: "https://haldi-bloom.vercel.app/arian-elara-06" },
  { id: "07", number: "07", name: "Heritage Scroll", category: "Heritage", description: "An unrolling scroll with timeless ornament and calligraphy.", thumbnail: t3, demoUrl: "https://heritage-scroll.vercel.app/arian-elara-07" },
  { id: "08", number: "08", name: "Royal Arch", category: "Heritage", description: "Grand arches frame every chapter of your celebration.", thumbnail: t2, demoUrl: "https://royal-arch.vercel.app/arian-elara-08" },
  { id: "09", number: "09", name: "Storybook", category: "Romantic", description: "Turn the pages of your love story, one chapter at a time.", thumbnail: t1, demoUrl: "https://storybook-inv.vercel.app/arian-elara-09" },
  { id: "10", number: "10", name: "Dord", category: "Modern", description: "Clean, confident and quietly luxurious.", thumbnail: t3, demoUrl: "https://dord-one.vercel.app/arian-elara-10" },
  { id: "11", number: "11", name: "Botanical Noir", category: "Botanical", description: "Dark greenery and moonlit florals with dramatic contrast.", thumbnail: t2, demoUrl: "https://botanicalnoir.vercel.app/arian-elara-11" },
  { id: "12", number: "12", name: "Blooming Love", category: "Romantic", description: "Blossoms that open as your guests scroll.", thumbnail: t1, demoUrl: "https://blooming-love-pied.vercel.app/arian-elir" },
  { id: "13", number: "13", name: "Golden Filigree", category: "Classic", description: "Fine gold linework, delicate and ceremonial.", thumbnail: t4, demoUrl: "https://golden-filigree.vercel.app/arian-elara-13" },
  { id: "14", number: "14", name: "Grand Reveal", category: "Cinematic", description: "A bold entrance designed for unforgettable first impressions.", thumbnail: t2, demoUrl: "https://grand-reveal-seven.vercel.app/arian-elara-14" },
  { id: "15", number: "15", name: "Mirror Bloom", category: "Botanical", description: "Symmetrical florals reflected in soft, luminous tones.", thumbnail: t1, demoUrl: "https://mirror-bloom.vercel.app/arian-elara-15" },
  { id: "16", number: "16", name: "Pearl", category: "Modern", description: "Luminous whites and pearl finishes for a serene celebration.", thumbnail: t3, demoUrl: "https://pearl-hyd.vercel.app/arian-elara-16" },
  { id: "17", number: "17", name: "Silk Ribbon", category: "Romantic", description: "A flowing ribbon guides guests through your day.", thumbnail: t3, demoUrl: "https://silk-ribbon.vercel.app/arian-elara-17" },
  { id: "18", number: "18", name: "Woven Elegance", category: "Heritage", description: "Textile-inspired patterns woven with tradition.", thumbnail: t4, demoUrl: "https://woven-elegance.vercel.app/arian-elara-18" },
  { id: "19", number: "19", name: "Ink & Calligraphy", category: "Classic", description: "Hand-lettered beauty in flowing ink.", thumbnail: t1, demoUrl: "https://ink-calig.vercel.app/arian-elara" },
  { id: "20", number: "20", name: "Wedding Mural", category: "Artistic", description: "A painted mural that tells your story in scenes.", thumbnail: t4, demoUrl: "https://wedding-mural.vercel.app/arian-elara-20" },
  { id: "21", number: "21", name: "Heritage Noir", category: "Heritage", description: "Heritage ornament reimagined in deep, dramatic noir.", thumbnail: t2, demoUrl: "https://hns-scr.vercel.app/arian-elara-21" },
];

export const getDesign = (id?: string) => invitationDesigns.find((d) => d.id === id);
