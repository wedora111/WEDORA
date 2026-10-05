import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { z } from "zod";
import { invitationDesigns, getDesign } from "@/data/designs";
import { countries, normalizePhone } from "@/data/countries";
import { supabase } from "@/integrations/supabase/client";

const TITLE = "Create Your Invitation — WEDORA";
const DESC = "Choose a WEDORA design, share your wedding details and receive your personalized invitation preview on WhatsApp.";

export const Route = createFileRoute("/create")({
  validateSearch: z.object({ design: z.string().optional() }),
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
  component: CreatePage,
});

type Person = { name: string; photo: string; qualification: string; occupation: string; parents: string };
type EventItem = { name: string; date: string; time: string; venue: string };
type Contact = { name: string; phone: string };

const emptyPerson: Person = { name: "", photo: "", qualification: "", occupation: "", parents: "" };
const eventNames = ["Mehndi", "Haldi", "Sangeet", "Nikah", "Wedding", "Reception", "Engagement", "Walima", "Other"];
const STEPS = ["Design", "Couple", "Celebration", "Events", "Extras", "Contact", "Review"];


function CreatePage() {
  const search = Route.useSearch();
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const [designId, setDesignId] = useState(getDesign(search.design)?.id ?? "");
  const [groom, setGroom] = useState<Person>(emptyPerson);
  const [bride, setBride] = useState<Person>(emptyPerson);
  const [w, setW] = useState({ date: "" });
  const [noOpening, setNoOpening] = useState(false);
  const [opening, setOpening] = useState({ text: "", inviter: "" });
  const [venue, setVenue] = useState({ name: "", address: "", city: "", maps: "" });
  const [events, setEvents] = useState<EventItem[]>([]);
  const [music, setMusic] = useState({ name: "", enabled: false });
  const [photos, setPhotos] = useState<string[]>([]);
  const [dial, setDial] = useState("AE");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);

  const design = getDesign(designId);
  const country = countries.find((c) => c.code === dial)!;
  const normalized = normalizePhone(country.dial, phone);

  function validate(s: number): string | null {
    if (s === 0) {
      if (!design) return "Please select a design.";
    }
    if (s === 1 && !groom.name.trim() && !bride.name.trim()) return "Please add at least one name for the couple.";
    if (s === 5) {
      if (!phone.trim()) return "Please add your WhatsApp number so we can send your preview.";
      if (!normalized) return "That WhatsApp number doesn't look right. Please check the country and number.";
      if (email && !z.string().email().safeParse(email).success) return "Please check your email address.";
    }
    return null;
  }

  function next() {
    const e = validate(step);
    setError(e);
    if (!e) { setStep((s) => Math.min(s + 1, STEPS.length - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }
  }

  async function submit() {
    for (let i = 0; i < 6; i++) { const e = validate(i); if (e) { setError(e); setStep(i); return; } }
    setSending(true); setError(null);
    const clean = (p: Person) => Object.fromEntries(Object.entries(p).filter(([, v]) => v.trim()));
    const { error: dbErr } = await supabase.from("invitation_requests").insert({
      design_id: design!.id,
      design_name: design!.name,
      groom: clean(groom),
      bride: clean(bride),
      wedding_date: w.date || null,
      no_religious_opening: noOpening,
      opening_text: noOpening ? null : opening.text || null,
      inviter: opening.inviter || null,
      venue_name: venue.name || null,
      venue_address: venue.address || null,
      city: venue.city || null,
      maps_url: venue.maps || null,
      events: events.filter((e) => e.name.trim()),
      music_name: music.name || null,
      music_enabled: music.enabled,
      photo_urls: photos,
      whatsapp_number: normalized!,
      email: email || null,
      display_contacts: contacts.filter((c) => c.name.trim() || c.phone.trim()),
    });
    setSending(false);
    if (dbErr) {
      setError("Something went wrong while sending your details. Please try again.");
      return;
    }
    setDone(true);
    window.scrollTo({ top: 0 });
  }

  if (done) return <Confirmation />;

  const coupleLabel = [groom.name, bride.name].filter(Boolean).join(" & ");
  const dateLabel = w.date ? new Date(w.date + "T00:00:00").toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" }) : "To be confirmed";

  return (
    <section className="mx-auto max-w-3xl px-5 py-12 md:py-20">
      <p className="eyebrow">Free personalized preview</p>
      <h1 className="mt-4 text-5xl leading-none md:text-6xl">Tell us about your wedding.</h1>

      <div className="mt-10 flex gap-1.5" aria-label={`Step ${step + 1} of ${STEPS.length}`}>
        {STEPS.map((s, i) => (
          <button key={s} type="button" onClick={() => i < step && setStep(i)} className="flex-1 text-left">
            <span className={`block h-px transition-colors ${i <= step ? "bg-gold" : "bg-border"}`} />
            <span className={`eyebrow mt-2 hidden md:block ${i === step ? "!text-foreground" : ""}`}>{s}</span>
          </button>
        ))}
      </div>
      <p className="eyebrow mt-3 md:hidden">Step {step + 1} / {STEPS.length} · {STEPS[step]}</p>

      <div key={step} className="reveal mt-12 space-y-10">
        {step === 0 && (
          <>
            <Group title="Your design">
              <label className="block">
                <span className="eyebrow">Design *</span>
                <select className="field" value={designId} onChange={(e) => setDesignId(e.target.value)}>
                  <option value="">Select a design</option>
                  {invitationDesigns.map((d) => <option key={d.id} value={d.id}>{d.number} — {d.name}</option>)}
                </select>
              </label>
              {design && (
                <div className="flex items-center gap-4 border border-border p-3">
                  <img src={design.thumbnail} alt="" width={64} height={85} className="h-20 w-16 object-cover" />
                  <div className="flex-1">
                    <p className="font-display text-2xl">{design.name}</p>
                    <p className="eyebrow">{design.category}</p>
                  </div>
                  <a href={design.demoUrl} target="_blank" rel="noopener noreferrer" className="link-line">View</a>
                </div>
              )}
            </Group>
          </>
        )}

        {step === 1 && (
          <>
            <PersonFields title="Groom" p={groom} set={setGroom} />
            <PersonFields title="Bride" p={bride} set={setBride} />
            <p className="text-sm text-muted-foreground">At least one name is required. Everything else is optional.</p>
          </>
        )}

        {step === 2 && (
          <>
            <Group title="Your celebration">
              <Field label="Wedding date" type="date" value={w.date} onChange={(v) => setW({ ...w, date: v })} />
            </Group>
            <Group title="Opening" hint="Add family names, relatives or other acknowledgements if you'd like them displayed on the invitation.">
              <label className="flex items-center gap-3 text-sm">
                <input type="checkbox" checked={noOpening} onChange={(e) => setNoOpening(e.target.checked)} className="accent-[var(--color-gold)]" />
                No religious opening
              </label>
              {!noOpening && <Field label="Opening text" value={opening.text} onChange={(v) => setOpening({ ...opening, text: v })} placeholder="A blessing or verse" />}
              <Field label="Inviter" value={opening.inviter} onChange={(v) => setOpening({ ...opening, inviter: v })} placeholder="With love from the families of…" />
            </Group>
            <Group title="Venue">
              <Field label="Venue name" value={venue.name} onChange={(v) => setVenue({ ...venue, name: v })} />
              <Field label="Venue address" value={venue.address} onChange={(v) => setVenue({ ...venue, address: v })} />
              <Row>
                <Field label="City" value={venue.city} onChange={(v) => setVenue({ ...venue, city: v })} />
                <Field label="Maps link" value={venue.maps} onChange={(v) => setVenue({ ...venue, maps: v })} placeholder="Optional · https://" />
              </Row>
            </Group>
          </>
        )}

        {step === 3 && (
          <Group title="Your events" hint="Optional — add each part of your celebration.">
            {events.map((ev, i) => (
              <div key={i} className="space-y-4 border border-border p-5">
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl italic text-gold">Event {i + 1}</span>
                  <button type="button" className="eyebrow hover:text-destructive" onClick={() => setEvents(events.filter((_, j) => j !== i))}>Remove</button>
                </div>
                <label className="block">
                  <span className="eyebrow">Event</span>
                  <input list="event-names" className="field" value={ev.name} onChange={(e) => setEvents(events.map((x, j) => j === i ? { ...x, name: e.target.value } : x))} placeholder="Mehndi, Nikah, Reception…" />
                </label>
                <Row>
                  <Field label="Date" type="date" value={ev.date} onChange={(v) => setEvents(events.map((x, j) => j === i ? { ...x, date: v } : x))} />
                  <Field label="Time" type="time" value={ev.time} onChange={(v) => setEvents(events.map((x, j) => j === i ? { ...x, time: v } : x))} />
                </Row>
                <Field label="Venue" value={ev.venue} onChange={(v) => setEvents(events.map((x, j) => j === i ? { ...x, venue: v } : x))} />
              </div>
            ))}
            <datalist id="event-names">{eventNames.map((n) => <option key={n} value={n} />)}</datalist>
            <button type="button" className="btn-ghost" onClick={() => setEvents([...events, { name: "", date: "", time: "", venue: "" }])}>+ Add event</button>
          </Group>
        )}

        {step === 4 && (
          <>
            <Group title="Music">
              <Field label="Song name" value={music.name} onChange={(v) => setMusic({ ...music, name: v })} placeholder="e.g. Tum Hi Ho — Arijit Singh" />
              <label className="flex items-center gap-3 text-sm">
                <input type="checkbox" checked={music.enabled} onChange={(e) => setMusic({ ...music, enabled: e.target.checked })} className="accent-[var(--color-gold)]" />
                Play music on my invitation
              </label>
            </Group>
            <Group title="Your photos" hint="Upload your photos now, or send them later through WhatsApp.">
              <PhotoUpload label="Upload photos" multiple value={photos} onChange={setPhotos} />
            </Group>
          </>
        )}

        {step === 5 && (
          <>
            <Group title="How should we contact you?" hint="We'll send your personalized preview here. It won't be shown on your invitation.">
              <div>
                <span className="eyebrow">Your WhatsApp number *</span>
                <div className="flex gap-3">
                  <select className="field !w-36 shrink-0" value={dial} onChange={(e) => setDial(e.target.value)} aria-label="Country">
                    {countries.map((c) => <option key={c.code} value={c.code}>{c.code} +{c.dial}</option>)}
                  </select>
                  <input className="field" type="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="50 123 4567" aria-label="WhatsApp number" />
                </div>
                {phone && <p className={`mt-2 text-xs ${normalized ? "text-muted-foreground" : "text-destructive"}`}>{normalized ? `We'll message ${normalized}` : "Please check this number"}</p>}
              </div>
              <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="Optional" />
            </Group>
            <Group title="Contacts to display on the invitation" hint="Optional — people your guests can call. These can be different from your own number.">
              {contacts.map((c, i) => (
                <Row key={i}>
                  <Field label={`Contact ${i + 1} name`} value={c.name} onChange={(v) => setContacts(contacts.map((x, j) => j === i ? { ...x, name: v } : x))} />
                  <Field label="Phone / WhatsApp" type="tel" value={c.phone} onChange={(v) => setContacts(contacts.map((x, j) => j === i ? { ...x, phone: v } : x))} placeholder="+44 …" />
                </Row>
              ))}
              {contacts.length < 2 && <button type="button" className="btn-ghost" onClick={() => setContacts([...contacts, { name: "", phone: "" }])}>+ Add contact</button>}
            </Group>
          </>
        )}

        {step === 6 && (
          <div className="border border-border bg-card p-6 md:p-10">
            <p className="eyebrow">Ready to submit</p>
            <dl className="mt-6 divide-y divide-border">
              {[
                ["Design", design?.name],
                ["Couple", coupleLabel],
                ["Wedding", dateLabel],
                ["Events", String(events.filter((e) => e.name.trim()).length)],
                ["City", venue.city || "—"],
                ["WhatsApp", normalized],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 py-3.5">
                  <dt className="eyebrow">{k}</dt>
                  <dd className="text-right font-display text-xl">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm text-muted-foreground">No payment needed now. We'll send your personalized preview to WhatsApp, usually within 1–3 hours.</p>
          </div>
        )}
      </div>

      {error && <p role="alert" className="mt-8 border-l-2 border-destructive pl-4 text-sm text-destructive">{error}</p>}

      <div className="mt-12 flex items-center justify-between gap-4">
        {step > 0 ? <button type="button" onClick={() => { setError(null); setStep(step - 1); }} className="link-line">Back</button> : <span />}
        {step < STEPS.length - 1
          ? <button type="button" onClick={next} className="btn-primary">Continue</button>
          : <button type="button" onClick={submit} disabled={sending} className="btn-primary">{sending ? "Sending…" : "Request my free preview"}</button>}
      </div>
    </section>
  );
}

function Confirmation() {
  return (
    <section className="mx-auto max-w-2xl px-5 py-24 text-center md:py-36">
      <p className="eyebrow reveal">Request received</p>
      <h1 className="reveal mt-6 text-5xl leading-[1] md:text-7xl">Your invitation is on its way.</h1>
      <p className="reveal mx-auto mt-6 max-w-md text-muted-foreground">We've received your details and your selected design. We'll prepare your personalized invitation and contact you on WhatsApp.</p>
      <p className="reveal mt-10 font-display text-3xl italic text-gold">Typical delivery: 1–3 hours</p>
      <p className="eyebrow mt-3">Please keep an eye on WhatsApp</p>
      <div className="mt-12 flex flex-wrap justify-center gap-3">
        <Link to="/collection" className="btn-primary">Explore more designs</Link>
        <Link to="/" className="btn-ghost">Back to WEDORA</Link>
      </div>
    </section>
  );
}

function Group({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <fieldset className="space-y-6">
      <legend className="font-display text-3xl">{title}</legend>
      {hint && <p className="-mt-3 text-sm text-muted-foreground">{hint}</p>}
      {children}
    </fieldset>
  );
}
function Row({ children }: { children: ReactNode }) {
  return <div className="grid gap-6 sm:grid-cols-2">{children}</div>;
}
function Field({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <input className="field" type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}
function PersonFields({ title, p, set }: { title: string; p: Person; set: (p: Person) => void }) {
  const u = (k: keyof Person) => (v: string) => set({ ...p, [k]: v });
  return (
    <Group title={title}>
      <Field label="Full name" value={p.name} onChange={u("name")} />
      <Row>
        <Field label="Qualification" value={p.qualification} onChange={u("qualification")} placeholder="Optional" />
        <Field label="Occupation" value={p.occupation} onChange={u("occupation")} placeholder="Optional" />
      </Row>
      <Field label="Parents" value={p.parents} onChange={u("parents")} placeholder="Optional" />
      <PhotoUpload label="Photo (optional)" value={p.photo ? [p.photo] : []} onChange={(v) => set({ ...p, photo: v[0] ?? "" })} />
    </Group>
  );
}

const previews = new Map<string, string>();
function PhotoUpload({ label, value, onChange, multiple }: { label: string; value: string[]; onChange: (v: string[]) => void; multiple?: boolean }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  async function handle(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true); setErr(null);
    const added: string[] = [];
    for (const f of Array.from(files)) {
      if (!f.type.startsWith("image/")) { setErr("Please choose image files only."); continue; }
      if (f.size > 10 * 1024 * 1024) { setErr("Each photo must be under 10 MB."); continue; }
      const ext = (f.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("invitation-photos").upload(path, f, { contentType: f.type });
      if (error) { setErr("A photo couldn't be uploaded. Please try again."); continue; }
      previews.set(path, URL.createObjectURL(f));
      added.push(path);
    }
    setBusy(false);
    onChange(multiple ? [...value, ...added] : added.slice(0, 1).length ? added.slice(0, 1) : value);
  }
  return (
    <div>
      <span className="eyebrow">{label}</span>
      {value.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-3">
          {value.map((p) => (
            <div key={p} className="relative">
              {previews.get(p) ? <img src={previews.get(p)} alt="" className="h-20 w-20 border border-border object-cover" /> : <div className="h-20 w-20 border border-border" />}
              <button type="button" aria-label="Remove photo" onClick={() => onChange(value.filter((x) => x !== p))} className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-background text-xs border border-border">×</button>
            </div>
          ))}
        </div>
      )}
      {(multiple || value.length === 0) && (
        <label className="btn-ghost mt-3 inline-block cursor-pointer">
          {busy ? "Uploading…" : multiple ? "+ Upload photos" : "+ Upload photo"}
          <input type="file" accept="image/*" multiple={multiple} className="sr-only" disabled={busy} onChange={(e) => { handle(e.target.files); e.target.value = ""; }} />
        </label>
      )}
      {err && <p className="mt-2 text-xs text-destructive">{err}</p>}
    </div>
  );
}
