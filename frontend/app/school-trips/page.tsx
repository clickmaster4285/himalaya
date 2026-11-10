import type { Metadata, Viewport } from "next";
import { preload } from "react-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SchoolTripsClient from "./SchoolTripsClient";
import "./school-trips.css";

/* /school-trips — ported from the Clickmasters static reference build (05_Landing_Page/index.html, 8 Nov 2026).
   Indexable and in the sitemap (auto-discovered), but deliberately NOT linked from the main navigation or footer menus. */

const TITLE = "School & College Group Trips to Bhurban, Murree | Himalaya Villas";
const IMG = "/school-trips/images";

export const metadata: Metadata = {
  title: TITLE,
  description:
    "Day excursions, evening programmes and overnight stays for schools, colleges and universities in Bhurban, Murree — about 1 hr 20 min from Islamabad by car. Request a customised group plan and quotation.",
  alternates: { canonical: "/school-trips" },
  openGraph: {
    type: "website",
    title: TITLE,
    description:
      "Day excursions, evening programmes and overnight stays for school, college and university groups — one site, one gate, meals to your timetable. Request a customised plan and quotation.",
    url: "/school-trips",
    images: [{ url: `${IMG}/hv-school-trips-og-1200x630.jpg`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    images: [`${IMG}/hv-school-trips-og-1200x630.jpg`],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#1E2925" };

const WA_HREF =
  "https://wa.me/923045679000?text=Hello%2C%20I%20am%20planning%20a%20school%20trip%20and%20would%20like%20a%20customised%20plan%20and%20quotation%20from%20Himalaya%20Villas.";

function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 1.8a8.2 8.2 0 1 1-4.2 15.3l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8zm-3.3 4.4c-.2 0-.5 0-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3 2.4 1 2.9.8 3.4.7.5 0 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3l-2-1c-.3-.1-.5-.1-.7.1l-.9 1.1c-.2.2-.3.2-.6.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.1.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.4-.4-.6-.4h-.5z" />
    </svg>
  );
}

const GALLERY: { file: string; full: number; h: number; alt: string; cap: string }[] = [
  { file: "01-hero-mountain-view-bhurban", full: 1600, h: 450, alt: "Balconies of a villa at Himalaya Villas looking out over forested hills and the Bhurban valley, Murree", cap: "The view from Himalaya Villas across the Bhurban hills." },
  { file: "02-estate-overview-villas-lawns", full: 1200, h: 533, alt: "Aerial view of Himalaya Villas, Bhurban, showing villas, a covered terrace and lawns", cap: "The estate from above: villas, a covered terrace and lawns on a single site." },
  { file: "03-lawn-group-space-hills", full: 1200, h: 450, alt: "Lawn at Himalaya Villas, Bhurban, with a gazebo, fountain and a trampoline, forested hills behind", cap: "The lower lawn, with the hills behind it, where groups run outdoor games and open-air sessions." },
  { file: "05-dining-terrace", full: 1200, h: 450, alt: "Covered terrace dining area with white drapes at Himalaya Villas, Bhurban", cap: "The covered terrace, where groups take lunch or an evening meal." },
  { file: "04-activity-area-lawns-climbing-wall", full: 1200, h: 450, alt: "Top-down view of the activity area at Himalaya Villas, Bhurban: lawns, a trampoline and climbing walls", cap: "The activity area beside the lawns, seen from above. Activities available on a given date are confirmed with each booking." },
  { file: "06-twin-room-accommodation", full: 1200, h: 533, alt: "Twin-bed room with a stone feature wall inside a villa at Himalaya Villas, Bhurban", cap: "A twin room in one of the villas. Overnight groups of 60 to 70 are housed across 22 rooms." },
  { file: "07-conference-hall", full: 1200, h: 533, alt: "Conference hall with a U-shaped table and leather chairs at Himalaya Villas, Bhurban", cap: "The conference hall: the morning briefing room, the faculty-retreat room and the wet-weather fallback." },
  { file: "09-villa-exterior-blue-sky", full: 1200, h: 533, alt: "Timber-and-stone villa with white balconies at Himalaya Villas, Bhurban, under a clear blue sky", cap: "One of the villas on a clear day." },
  { file: "11-estate-aerial-pines", full: 1200, h: 533, alt: "Aerial view of the villas at Himalaya Villas, Bhurban, with pine forest behind", cap: "The villas against the pine forest behind the estate." },
  { file: "13-guest-room", full: 1200, h: 533, alt: "Guest room with a large bed, armchairs and tall curtained windows at Himalaya Villas, Bhurban", cap: "A guest room in one of the villas." },
  { file: "12-clouds-over-the-valley", full: 1200, h: 450, alt: "Clouds drifting over the forested valley beside a villa at Himalaya Villas, Bhurban", cap: "Afternoon cloud moving across the valley." },
  { file: "08-evening-estate-view", full: 1200, h: 450, alt: "Himalaya Villas, Bhurban, lit up at dusk, seen from above", cap: "Evening at Himalaya Villas, when day groups head home and overnight groups settle in." },
];

const FAQS: [string, string][] = [
  ["How far is Bhurban from Islamabad, and how long is the journey?", "Roughly 50 kilometres by the Murree Expressway — about an hour and twenty minutes by car on a clear weekday morning. Coaches take longer on the climb, and so do weekends, public holidays and snow; our sample day itinerary allows two hours each way."],
  ["How many students can stay overnight?", "The property sleeps 60 to 70 people across its 22 rooms, up to three to a room. Villas and apartments can be allocated between boys, girls and staff on request."],
  ["How many students can come for a day trip?", "Day-trip numbers are agreed per booking. Tell us your expected headcount when you ask for a plan and we will confirm in writing what we can host on your date."],
  ["What is included?", "A day excursion includes lunch, the lawns and terraces, on-site games and a guided walk on the nearby forest trail. The evening programme adds a barbecue dinner and a bonfire; the overnight stay adds accommodation and breakfast. Transport is not included."],
  ["Can coaches reach the estate, and where do they park?", "The estate's own road is a hill road. Before you hire the coach, confirm the largest vehicle that can reach the gate and where coaches wait with the reservations team; the answer goes into your written confirmation."],
  ["How are boys, girls and staff accommodated?", "Whole villas and apartments can be allocated separately — for example one villa for boys, one for girls, with staff rooms alongside each. Tell us your numbers by gender and the allocation is set out in the confirmation."],
  ["What happens if the weather turns?", "Spring and autumn are the reliable windows; winter brings snow and, in bad spells, restrictions on entry to Murree. Agree a fallback date with us when you book, and treat the conference hall as the wet-weather plan for briefings and indoor sessions."],
  ["What documents will the school receive?", "A written booking confirmation with the address, contact numbers and a timed itinerary. Private schools in Punjab need prior permission from the education authorities before a student trip; the confirmation is the document that application, and the parents' consent forms, are built on."],
  ["How do I get a plan and quotation?", "Message us on WhatsApp or send the inquiry form below with your dates, numbers and preferred format. Quotations are per student and depend on dates, group size, format and requirements; everything is confirmed in writing before you announce the trip to parents."],
];

/* FAQPage JSON-LD — wording exactly as in the reference build. */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    ["How far is Bhurban from Islamabad, and how long is the journey?", "Roughly 50 kilometres by the Murree Expressway — about an hour and twenty minutes by car on a clear weekday morning. Coaches take longer on the climb, and so do weekends, public holidays and snow."],
    ["How many students can stay overnight at Himalaya Villas?", "The property sleeps 60 to 70 people across its 22 rooms, up to three to a room. Villas and apartments can be allocated between boys, girls and staff on request."],
    ["How many students can come for a day trip?", "Day-trip numbers are agreed per booking. Share your expected headcount when you ask for a plan and the resort confirms in writing what it can host on your date."],
    ["What is included in a school trip to Himalaya Villas?", "A day excursion includes lunch, the lawns and terraces, on-site games and a guided walk on the nearby forest trail. The evening programme adds a barbecue dinner and a bonfire; the overnight stay adds accommodation and breakfast. Transport is not included."],
    ["Can coaches reach the estate, and where do they park?", "The estate's own road is a hill road. Confirm the largest vehicle that can reach the gate and where coaches wait with the reservations team before hiring the coach; the answer is set out in the written confirmation."],
    ["How are boys, girls and staff accommodated?", "Whole villas and apartments can be allocated separately, with staff rooms alongside each group. The allocation is set out in the booking confirmation."],
    ["What happens if the weather turns?", "Spring and autumn are the reliable windows; winter brings snow and, in bad spells, restrictions on entry to Murree. A fallback date is agreed at booking and the conference hall is the wet-weather plan."],
    ["What documents will the school receive?", "A written booking confirmation with the address, contact numbers and a timed itinerary, which supports the permission application private schools in Punjab must make before a student trip and the parents' consent forms."],
    ["How do I get a plan and quotation?", "Message Himalaya Villas on WhatsApp at +92 304 567 9000 or send the inquiry form with dates, numbers and preferred format. Quotations are per student and depend on dates, group size, format and requirements; everything is confirmed in writing."],
  ].map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })),
};

export default function SchoolTripsPage() {
  preload(`${IMG}/hv-school-trips-01-hero-mountain-view-bhurban-1600.webp`, {
    as: "image",
    type: "image/webp",
    fetchPriority: "high",
  });

  return (
    <>
      <Navbar />
      <main className="hv-st">
        {/* 1. Hero */}
        <header className="hero" id="top">
          <picture>
            <source type="image/webp" media="(max-width:720px)" srcSet={`${IMG}/hv-school-trips-01-hero-mountain-view-bhurban-800.webp`} />
            <source type="image/webp" srcSet={`${IMG}/hv-school-trips-01-hero-mountain-view-bhurban-1600.webp`} />
            { }
            <img src={`${IMG}/hv-school-trips-01-hero-mountain-view-bhurban-1600.jpg`} width={1600} height={900} alt="Balconies of a villa at Himalaya Villas looking out over forested hills and the Bhurban valley, Murree" fetchPriority="high" />
          </picture>
          <div className="wrap">
            <p className="eyebrow">School &amp; college group trips · Bhurban, Murree</p>
            <h1>
              School &amp; College Group Trips
              <br />
              to Bhurban, Murree
            </h1>
            <p className="sub">Day excursions, evening programmes and overnight stays for schools, colleges and universities across Pakistan — about 1 hour 20 minutes from Islamabad by car on a clear weekday morning.</p>
            <div className="cta">
              <a className="btn btn-wa btn-lg" data-wa="" data-placement="hero" href={WA_HREF}>
                <WaIcon />
                Chat With Us on WhatsApp
              </a>
              <a className="btn btn-outline btn-lg" href="#inquiry">Request a Proposal</a>
            </div>
          </div>
          <figure className="hero-side">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${IMG}/hv-school-trips-02-estate-overview-villas-lawns-800.jpg`} width={800} height={533} alt="Aerial view of Himalaya Villas, Bhurban, showing villas, a covered terrace and lawns" loading="lazy" />
            <figcaption>The estate from above: villas, a covered terrace and lawns on a single site.</figcaption>
          </figure>
        </header>

        <div className="strip" aria-label="Key facts">
          <div className="wrap">
            <div><b>22 rooms</b><span>60–70 overnight across villas and apartments</span></div>
            <div><b>1 hr 20 min</b><span>from Islamabad by car, clear weekday morning</span></div>
            <div><b>Halal kitchen</b><span>multi-cuisine meals to your timetable</span></div>
            <div><b>4.7 on Google</b><span>from more than 230 guest reviews</span></div>
          </div>
        </div>

        {/* 2. Benefits */}
        <section id="why">
          <div className="wrap">
            <p className="eyebrow">Why schools choose a self-contained estate</p>
            <h2>
              One site. One gate.
              <br />
              <em>The whole day in one place.</em>
            </h2>
            <p className="lede" style={{ marginTop: 18 }}>At a public picnic point the group shares everything with everyone else. Here the lawns, the dining terrace, the gathering spaces and the rooms are on one site, so the teachers plan the day rather than the moving between places.</p>
            <div className="tiles">
              <div className="tile"><div className="n">01</div><p>One site, one gate — headcounts at arrival and departure.</p></div>
              <div className="tile"><div className="n">02</div><p>Meals to your timetable, halal and multi-cuisine.</p></div>
              <div className="tile"><div className="n">03</div><p>Lawns, a forest trail and a covered terrace.</p></div>
              <div className="tile"><div className="n">04</div><p>A written confirmation and itinerary for your permission file.</p></div>
            </div>
          </div>
        </section>

        {/* 3. Formats */}
        <section className="formats" id="formats">
          <div className="wrap">
            <p className="eyebrow">Group booking formats</p>
            <h2>Day, evening or <em>overnight</em></h2>
            <div className="cards">
              <article className="card">
                <div className="tag">Format 01</div>
                <h3>Day excursion</h3>
                <ul>
                  <li>Lunch on the covered terrace</li>
                  <li>The lawns and terraces for the day</li>
                  <li>On-site games — basketball, foosball, tug of war</li>
                  <li>Guided walk on the nearby forest trail</li>
                </ul>
                <a className="textlink" data-wa="" data-placement="formats" href={WA_HREF}>Ask about this format →</a>
              </article>
              <article className="card">
                <div className="tag">Format 02</div>
                <h3>Evening programme</h3>
                <ul>
                  <li>Everything in the day excursion</li>
                  <li>Barbecue dinner</li>
                  <li>Bonfire on the lawn</li>
                  <li>A late departure, the drive home after dark planned with the school</li>
                </ul>
                <a className="textlink" data-wa="" data-placement="formats" href={WA_HREF}>Ask about this format →</a>
              </article>
              <article className="card">
                <div className="tag">Format 03</div>
                <h3>Overnight stay</h3>
                <ul>
                  <li>Everything in the evening programme</li>
                  <li>Villa and apartment accommodation, up to three to a room</li>
                  <li>Breakfast</li>
                  <li>Villas allocated between boys, girls and staff on request</li>
                </ul>
                <a className="textlink" data-wa="" data-placement="formats" href={WA_HREF}>Ask about this format →</a>
              </article>
            </div>
            <div className="cards" style={{ marginTop: 24, gridTemplateColumns: "1fr" }}>
              <article className="card alt">
                <div className="tag">Also arranged</div>
                <h3>Celebrations, college trips and faculty retreats</h3>
                <ul className="twocol">
                  <li>School celebrations and farewells</li>
                  <li>College and university trips</li>
                  <li>Faculty retreats using the conference hall</li>
                  <li>Transport is not included — schools use their own coaches or arrange them</li>
                </ul>
                <a className="textlink" data-wa="" data-placement="formats" href={WA_HREF}>Ask about these →</a>
              </article>
            </div>
            <p className="small muted" style={{ margin: "26px 0 0" }}>Quotations are per student and depend on dates, group size, format and requirements. Activities, facilities, meal arrangements, prices and group capacities are subject to availability and written confirmation for each booking.</p>
          </div>
        </section>

        {/* 4. Gallery */}
        <section id="gallery">
          <div className="wrap">
            <p className="eyebrow">The estate</p>
            <h2>Photographs from <em>Bhurban</em></h2>
            <p className="lede" style={{ marginTop: 18 }}>Every photograph below was taken at Himalaya Villas. Tap any image to view it larger.</p>
            <div className="gallery" id="galleryGrid">
              {GALLERY.map((g) => (
                <figure key={g.file}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${IMG}/hv-school-trips-${g.file}-800.jpg`} data-full={`${IMG}/hv-school-trips-${g.file}-${g.full}.jpg`} width={800} height={g.h} loading="lazy" alt={g.alt} />
                  <figcaption>{g.cap}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* 5 + 6. Facilities and activities */}
        <section className="formats" id="facilities">
          <div className="wrap split">
            <div>
              <p className="eyebrow">Verified facilities</p>
              <h2>What is <em>on the estate</em></h2>
              <ul className="list">
                <li>22 rooms across villas and apartments: Rakaposhi Villa (five executive rooms), Himalaya Luxury Villas (four bedrooms with its own garden) and two-bedroom apartments</li>
                <li>Lawns and terraces for games, open-air sessions and class photographs</li>
                <li>Covered dining terrace</li>
                <li>Conference hall for briefings, faculty sessions and wet-weather fallback</li>
                <li>Halal, multi-cuisine kitchen; dietary needs and allergies arranged in advance</li>
                <li>Central heating and Wi-Fi in the villas</li>
              </ul>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="photo" style={{ marginTop: 32 }} src={`${IMG}/hv-school-trips-05-dining-terrace-1200.jpg`} width={1200} height={675} loading="lazy" alt="Covered terrace dining area with white drapes at Himalaya Villas, Bhurban" />
            </div>
            <div>
              <p className="eyebrow">Activities and experiences</p>
              <h2>What the day <em>is made of</em></h2>
              <ul className="list">
                <li>Guided walk on the nearby forest trail</li>
                <li>Lawn games — basketball, foosball, tug of war</li>
                <li>Bonfire and barbecue evenings (evening and overnight formats)</li>
                <li>Class photographs on the terrace and lawns, with the hills behind</li>
                <li>Free time on the lawns, supervised by the school&apos;s own teachers</li>
              </ul>
              <p className="note">Activities available on your date are confirmed with your booking. Teachers remain responsible for their students throughout; the resort coordinates timings, meals and activities with the lead teacher.</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="photo" style={{ marginTop: 32 }} src={`${IMG}/hv-school-trips-03-lawn-group-space-hills-1200.jpg`} width={1200} height={675} loading="lazy" alt="Lawn at Himalaya Villas, Bhurban, with a gazebo, fountain and a trampoline, forested hills behind" />
            </div>
          </div>
        </section>

        {/* 7. Sample itineraries */}
        <section id="itineraries">
          <div className="wrap">
            <p className="eyebrow">Sample itineraries</p>
            <h2>How a trip <em>runs</em></h2>
            <p className="lede" style={{ marginTop: 18 }}>Two outlines to plan around. Both are illustrative: every itinerary is confirmed by the operations team for each booking, and the timed version goes into your written confirmation.</p>
            <div className="itins">
              <article className="itin">
                <header><span>Illustrative — confirmed per booking</span><h3>Day excursion from Islamabad or Rawalpindi</h3></header>
                <table>
                  <tbody>
                    <tr><td>7:00 am</td><td>Depart school by coach</td></tr>
                    <tr><td>9:00 am</td><td>Arrive; headcount at the gate; tea; briefing in the hall</td></tr>
                    <tr><td>9:45 am</td><td>Guided forest walk for half the group, lawn games for the other half</td></tr>
                    <tr><td>11:15 am</td><td>The two halves swap</td></tr>
                    <tr><td>12:45 pm</td><td>Prayer break</td></tr>
                    <tr><td>1:00 pm</td><td>Lunch on the terrace</td></tr>
                    <tr><td>2:00 pm</td><td>Free time on the lawns; class photographs</td></tr>
                    <tr><td>3:00 pm</td><td>Closing headcount at the gate; depart</td></tr>
                    <tr><td>5:00 pm</td><td>Back at school</td></tr>
                  </tbody>
                </table>
                <footer>Allows about two hours each way for a coach, including the climb. Schools further away should start earlier or choose the evening or overnight format; in October and November, leave earlier still.</footer>
              </article>
              <article className="itin">
                <header><span>Illustrative — confirmed per booking</span><h3>Overnight stay</h3></header>
                <table>
                  <tbody>
                    <tr><td>Mid-morning</td><td>Arrive; headcount; villas allocated between boys, girls and staff; briefing</td></tr>
                    <tr><td>Late morning</td><td>Lawn games and the forest trail in two groups</td></tr>
                    <tr><td>Afternoon</td><td>Lunch on the terrace; free time on the lawns; class photographs</td></tr>
                    <tr><td>Evening</td><td>Bonfire and barbecue dinner on the lawn</td></tr>
                    <tr><td>Night</td><td>Lights-out time set by the school</td></tr>
                    <tr><td>Morning</td><td>Breakfast; closing headcount</td></tr>
                    <tr><td>By 10:00 am</td><td>Depart</td></tr>
                  </tbody>
                </table>
                <footer>Schools from Lahore, Faisalabad, Gujranwala or Sialkot are usually better served by the evening or overnight format, which makes the longer drive part of the trip rather than most of it.</footer>
              </article>
            </div>
          </div>
        </section>

        {/* 8. Capacity and planning */}
        <section className="plan" id="planning">
          <div className="wrap">
            <p className="eyebrow">Group capacity and planning</p>
            <h2>What administrators <em>ask first</em></h2>
            <dl>
              <div><dt>Overnight capacity</dt><dd>60 to 70 people across 22 rooms, up to three to a room.</dd></div>
              <div><dt>Day-trip numbers</dt><dd>Agreed per booking. Share your expected headcount first and ask for the confirmed figure in writing.</dd></div>
              <div><dt>Boys, girls and staff</dt><dd>Villas and apartments can be allocated separately on request; the allocation goes into your confirmation.</dd></div>
              <div><dt>Coach access and parking</dt><dd>The estate&apos;s own road is a hill road. Confirm the largest vehicle that can reach the gate, and where coaches wait, with the reservations team before you hire the coach.</dd></div>
              <div><dt>Weather windows</dt><dd>Spring (March to May) and autumn (September to November) are the reliable windows. Agree a fallback date; the conference hall is the wet-weather plan.</dd></div>
              <div><dt>Emergencies</dt><dd>Ask what first-aid provision is on site for your date. Murree&apos;s Tehsil Headquarters Hospital is in Murree town, roughly 11 km from Bhurban. Schools carry their own kit and every student&apos;s emergency contact.</dd></div>
              <div><dt>Paperwork</dt><dd>A written booking confirmation with the address, contact numbers and a timed itinerary — the document your permission application and parents&apos; consent forms are built on.</dd></div>
              <div><dt>Meals</dt><dd>Halal and multi-cuisine, served to the timetable agreed with the school. Send dietary needs and allergies with the booking.</dd></div>
            </dl>
          </div>
        </section>

        {/* 9. Proposal band */}
        <section className="band" id="proposal">
          <div className="wrap">
            <div>
              <p className="eyebrow">Customised proposal</p>
              <h2 style={{ fontSize: "clamp(28px,3.6vw,40px)" }}>Every school is different. Tell us your dates, numbers and format and we will prepare a plan and quotation for your group.</h2>
            </div>
            <div className="cta">
              <a className="btn btn-wa btn-lg" data-wa="" data-placement="proposal" href={WA_HREF}>
                <WaIcon />
                WhatsApp the Reservations Team
              </a>
              <a className="btn btn-outline-dark btn-lg" href="#inquiry">Fill the Inquiry Form</a>
            </div>
          </div>
        </section>

        {/* 10. FAQs */}
        <section id="faqs">
          <div className="wrap">
            <p className="eyebrow">Questions schools ask</p>
            <h2>Frequently asked <em>questions</em></h2>
            <div className="faq">
              {FAQS.map(([q, a]) => (
                <article key={q}>
                  <h3>{q}</h3>
                  <p>{a}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 11. Inquiry form */}
        <section className="inquiry" id="inquiry">
          <div className="wrap form-wrap">
            <div className="form-aside">
              <p className="eyebrow">Request a plan and quotation</p>
              <h2>Tell us about <em>your group</em></h2>
              <p className="lede">Two minutes to fill in. A member of the reservations team will contact you on WhatsApp to confirm what is possible on your dates and prepare a customised plan and quotation.</p>
              <ul className="list">
                <li>No deposit or commitment to ask</li>
                <li>Everything confirmed in writing — numbers, meals, rooms, activities and price</li>
                <li>Prefer to talk? <a data-wa="" data-placement="form" href={WA_HREF}>WhatsApp +92 304 567 9000</a></li>
              </ul>
            </div>
            <div>
              <form id="schoolForm" noValidate autoComplete="on">
                <div className="field">
                  <label htmlFor="school">School / institution name <span className="req">*</span></label>
                  <input id="school" name="school" type="text" required maxLength={120} autoComplete="organization" />
                  <span className="err">Please enter the institution&apos;s name.</span>
                </div>
                <div className="grid2">
                  <div className="field">
                    <label htmlFor="contact">Contact person <span className="req">*</span></label>
                    <input id="contact" name="contact" type="text" required maxLength={80} autoComplete="name" />
                    <span className="err">Please enter your name.</span>
                  </div>
                  <div className="field">
                    <label htmlFor="designation">Designation</label>
                    <input id="designation" name="designation" type="text" maxLength={60} placeholder="Principal, coordinator, owner…" />
                  </div>
                </div>
                <div className="grid2">
                  <div className="field">
                    <label htmlFor="city">City <span className="req">*</span></label>
                    <input id="city" name="city" type="text" required maxLength={60} autoComplete="address-level2" />
                    <span className="err">Please enter your city.</span>
                  </div>
                  <div className="field">
                    <label htmlFor="phone">WhatsApp number <span className="req">*</span></label>
                    <input id="phone" name="phone" type="tel" inputMode="tel" required placeholder="03XX XXXXXXX" autoComplete="tel" />
                    <span className="err">Please enter a valid mobile number.</span>
                  </div>
                </div>
                <div className="grid2">
                  <div className="field">
                    <label htmlFor="students">Estimated number of students <span className="req">*</span></label>
                    <input id="students" name="students" type="number" inputMode="numeric" min={1} max={2000} required />
                    <span className="err">Please enter an estimate.</span>
                  </div>
                  <div className="field">
                    <label htmlFor="teachers">Number of teachers <span className="req">*</span></label>
                    <input id="teachers" name="teachers" type="number" inputMode="numeric" min={1} max={200} required />
                    <span className="err">Please enter a number.</span>
                  </div>
                </div>
                <div className="grid2">
                  <div className="field">
                    <label htmlFor="date">Preferred date <span className="req">*</span></label>
                    <input id="date" name="date" type="date" required />
                    <span className="err">Please choose a date (approximate is fine).</span>
                  </div>
                  <div className="field">
                    <label htmlFor="type">Trip type <span className="req">*</span></label>
                    <select id="type" name="type" required defaultValue="">
                      <option value="">Select…</option>
                      <option>Day excursion</option>
                      <option>Evening programme</option>
                      <option>Overnight stay</option>
                      <option>Other (celebration, college trip, faculty retreat)</option>
                    </select>
                    <span className="err">Please choose a format.</span>
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" maxLength={120} autoComplete="email" />
                </div>
                <div className="field">
                  <label htmlFor="notes">Additional requirements</label>
                  <textarea id="notes" name="notes" maxLength={600} placeholder="Dietary needs, boys/girls split, celebration, budget range per student…" />
                </div>
                <div className="hp" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>
                <p className="consent">We will use these details only to prepare and follow up your proposal.</p>
                <button className="btn btn-primary btn-lg" type="submit" id="submitBtn" style={{ width: "100%" }}>Request My School Trip Plan</button>
              </form>
              <div className="thanks" id="thanks" role="status" aria-live="polite">
                <p className="eyebrow">Thank you</p>
                <h3>Your request is on its way.</h3>
                <p>A member of the reservations team will contact you. If you would like to start the conversation now, your details are ready to send on WhatsApp.</p>
                <a className="btn btn-wa btn-lg" id="thanksWa" data-placement="thankyou" href="https://wa.me/923045679000">
                  <WaIcon />
                  Send My Details on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 12. Contact */}
        <section className="contact" id="contact">
          <div className="wrap">
            <div className="box">
              <h3>WhatsApp</h3>
              <p><a data-wa="" data-placement="contact" href={WA_HREF}>+92 304 567 9000</a></p>
              <p className="small muted">Message us on WhatsApp, or <a data-tel="" href="tel:+923045679000">call the same number</a>.</p>
            </div>
            <div className="box">
              <h3>Email</h3>
              <p><a href="mailto:reservations@himalayavillas.com">reservations@himalayavillas.com</a></p>
              <p className="small muted">Send your school&apos;s letterhead request here if your administration requires it.</p>
            </div>
            <div className="box">
              <h3>Address</h3>
              <p>Himalaya Villas, Mohra Iswal, near Kashmiri Bazar,<br />Bhurban, Murree Hills, Punjab 47190</p>
              <p><a href="https://www.google.com/maps/search/?api=1&query=33.941325%2C73.442723">Open in Google Maps</a></p>
            </div>
          </div>
        </section>

        {/* 13. Sticky mobile WhatsApp bar */}
        <div className="sticky" id="sticky">
          <a className="btn btn-wa" data-wa="" data-placement="sticky" href={WA_HREF}>
            <WaIcon />
            Chat about a school trip
          </a>
        </div>

        {/* Lightbox */}
        <div className="lb" id="lb" role="dialog" aria-modal="true" aria-label="Photograph">
          <button className="x" id="lbClose" aria-label="Close" type="button">×</button>
          <button className="prev" id="lbPrev" aria-label="Previous photograph" type="button">‹</button>
          <figure style={{ margin: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img id="lbImg" alt="" />
            <figcaption id="lbCap" />
          </figure>
          <button className="next" id="lbNext" aria-label="Next photograph" type="button">›</button>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <SchoolTripsClient />
      </main>
      <div className="hv-st-footpad">
        <Footer />
      </div>
    </>
  );
}
