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
 * The WEDORA showcase collection. To add a design, append an entry.
 * Thumbnails use the matching numbered screenshots in the public folder.
 */
export const invitationDesigns: InvitationDesign[] = [
  { id: "01", number: "01", name: "Antique Bloom", category: "Botanical", description: "Vintage florals and soft ink, unfolding like a pressed keepsake.", thumbnail: "/1.jpeg", demoUrl: "https://henna-bloom-invites.vercel.app/arian-elara-01" },
  { id: "02", number: "02", name: "Cinematic Vows", category: "Cinematic", description: "A film-like opening sequence that sets the stage for your story.", thumbnail: "/2.jpeg", demoUrl: "https://cinematic-vows.vercel.app/arian-elara-02" },
  { id: "03", number: "03", name: "Gilded Envelope", category: "Classic", description: "A sealed envelope that opens to reveal your invitation.", thumbnail: "/3.jpeg", demoUrl: "https://glided-envelope.vercel.app/arian-elara-03" },
  { id: "04", number: "04", name: "Lantern Glow", category: "Festive", description: "Warm lantern light and evening tones for a celebration after dusk.", thumbnail: "/4.jpeg", demoUrl: "https://lantern-glow.vercel.app/arian-elara-04" },
  { id: "05", number: "05", name: "Velvet Reveal", category: "Cinematic", description: "Deep velvet curtains part to unveil the couple.", thumbnail: "/5.jpeg", demoUrl: "https://velvet-reveal-kappa.vercel.app/arian-elara-05" },
  { id: "06", number: "06", name: "Haldi Bloom", category: "Festive", description: "Sunlit yellows and marigolds for joyful pre-wedding days.", thumbnail: "/6.jpeg", demoUrl: "https://haldi-bloom.vercel.app/arian-elara-06" },
  { id: "07", number: "07", name: "Heritage Scroll", category: "Heritage", description: "An unrolling scroll with timeless ornament and calligraphy.", thumbnail: "/7.jpeg", demoUrl: "https://heritage-scroll.vercel.app/arian-elara-07" },
  { id: "08", number: "08", name: "Royal Arch", category: "Heritage", description: "Grand arches frame every chapter of your celebration.", thumbnail: "/8.jpeg", demoUrl: "https://royal-arch.vercel.app/arian-elara-08" },
  { id: "09", number: "09", name: "Storybook", category: "Romantic", description: "Turn the pages of your love story, one chapter at a time.", thumbnail: "/9.jpeg", demoUrl: "https://storybook-inv.vercel.app/arian-elara-09" },
  { id: "10", number: "10", name: "Dord", category: "Modern", description: "Clean, confident and quietly luxurious.", thumbnail: "/10.jpeg", demoUrl: "https://dord-one.vercel.app/arian-elara-10" },
  { id: "11", number: "11", name: "Botanical Noir", category: "Botanical", description: "Dark greenery and moonlit florals with dramatic contrast.", thumbnail: "/11.jpeg", demoUrl: "https://botanicalnoir.vercel.app/arian-elara-11" },
  { id: "12", number: "12", name: "Blooming Love", category: "Romantic", description: "Blossoms that open as your guests scroll.", thumbnail: "/12.jpeg", demoUrl: "https://blooming-love-pied.vercel.app/arian-elir" },
  { id: "13", number: "13", name: "Golden Filigree", category: "Classic", description: "Fine gold linework, delicate and ceremonial.", thumbnail: "/13.jpeg", demoUrl: "https://golden-filigree.vercel.app/arian-elara-13" },
  { id: "14", number: "14", name: "Grand Reveal", category: "Cinematic", description: "A bold entrance designed for unforgettable first impressions.", thumbnail: "/14.jpeg", demoUrl: "https://grand-reveal-seven.vercel.app/arian-elara-14" },
  { id: "15", number: "15", name: "Mirror Bloom", category: "Botanical", description: "Symmetrical florals reflected in soft, luminous tones.", thumbnail: "/15.jpeg", demoUrl: "https://mirror-bloom.vercel.app/arian-elara-15" },
  { id: "16", number: "16", name: "Pearl", category: "Modern", description: "Luminous whites and pearl finishes for a serene celebration.", thumbnail: "/16.jpeg", demoUrl: "https://pearl-hyd.vercel.app/arian-elara-16" },
  { id: "17", number: "17", name: "Silk Ribbon", category: "Romantic", description: "A flowing ribbon guides guests through your day.", thumbnail: "/17.jpeg", demoUrl: "https://silk-ribbon.vercel.app/arian-elara-17" },
  { id: "18", number: "18", name: "Woven Elegance", category: "Heritage", description: "Textile-inspired patterns woven with tradition.", thumbnail: "/18.jpeg", demoUrl: "https://woven-elegance.vercel.app/arian-elara-18" },
  { id: "19", number: "19", name: "Ink & Calligraphy", category: "Classic", description: "Hand-lettered beauty in flowing ink.", thumbnail: "/19.jpeg", demoUrl: "https://ink-calig.vercel.app/arian-elara" },
  { id: "20", number: "20", name: "Wedding Mural", category: "Artistic", description: "A painted mural that tells your story in scenes.", thumbnail: "/20.jpeg", demoUrl: "https://wedding-mural.vercel.app/arian-elara-20" },
  { id: "21", number: "21", name: "Heritage Noir", category: "Heritage", description: "Heritage ornament reimagined in deep, dramatic noir.", thumbnail: "/21.jpeg", demoUrl: "https://hns-scr.vercel.app/arian-elara-21" },
];

export const getDesign = (id?: string) => invitationDesigns.find((d) => d.id === id);
