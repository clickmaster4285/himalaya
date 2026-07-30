import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { absoluteUrl } from "@/lib/seo/site-config";

// --- Metadata & SEO Specification ---
export const metadata: Metadata = createPageMetadata({
  // Title shortened to avoid truncation with site suffix: " | Himalaya Villas & Resorts"
  title: "Live Music Venue in Murree & Bhurban (2026 Guide)",
  description:
    "Where you can actually host live music in the Murree hills — venue types, noise curfews, power, acoustics, real 2026 costs, and the one booking model with no curfew at all.",
  path: "/live-music-venue-murree",
  keywords: [
    "live music venue",
    "live music venue murree",
    "live music venue bhurban",
    "venue with live music near islamabad",
    "private event venue murree",
    "music night venue murree",
    "qawwali night venue islamabad",
    "outdoor event venue bhurban",
    "corporate event venue murree with music",
  ],
});

// --- Assets (Update with actual page-specific images) ---
const heroBg = "/images/villas/lux-complete4.jpg"; // Replace with a relevant hero image
const bottomCtaBg = "/assets/why-villa-garden.jpg"; // Replace with a relevant CTA image

// --- FAQPage JSON-LD Schema ---
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is there a dedicated live music venue in Murree?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The Murree–Bhurban corridor has no purpose-built performance venue. What exists are hotels, restaurants and private estates that permit music on their premises under their own conditions. The practical question is which property will host your act, for how long, and at what volume.",
      },
    },
    {
      "@type": "Question",
      name: "How late can live music go at a hotel in Murree or Bhurban?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most hotels enforce a stop between 10pm and 11pm, because other guests are sleeping in rooms above or beside the function space. Get the noise policy in writing before paying, and note that the duty manager on the night enforces it, not the sales coordinator who sold you the hall.",
      },
    },
    {
      "@type": "Question",
      name: "Can I host a private music night with no curfew near Islamabad?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Only on a property with no other paying guests. Exclusive-use estates in Bhurban, such as Himalaya Villas, admit one group at a time, so there is no internal curfew to enforce — just the external consideration of neighbours and the hour, which distance from other households largely resolves.",
      },
    },
    {
      "@type": "Question",
      name: "What does a live band cost for an event in Murree?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Indicatively, a solo vocalist runs PKR 40,000–90,000, an acoustic duo or trio PKR 90,000–200,000, a qawwali party PKR 150,000–400,000, and a full band PKR 250,000–700,000, plus a 20–40% uplift for Murree travel. Sound hire with an engineer adds PKR 60,000–150,000.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a licence for live music at a private event in Pakistan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No performance licence is required for a private gathering on private property. What governs in practice is local administration discretion and neighbour tolerance. A complaint at midnight ends an event regardless of your contract, so physical separation from other homes matters more than paperwork.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best season for an outdoor music event in the Murree hills?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Late April to mid-June is the strongest window — cool, dry evenings and late light. July to mid-September is monsoon and needs a genuinely covered performance area. Winter works with a bonfire and heating but suits a short outdoor opening moving indoors.",
      },
    },
    {
      "@type": "Question",
      name: "What power supply does a live music event in Bhurban need?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A 25–40 kVA generator with a stabiliser covers a small PA, lighting and catering for twenty to forty guests. Confirm it has an automatic transfer switch and an assigned overnight operator — grid voltage in the hills is unstable, and manual starts lose the room during a set.",
      },
    },
    {
      "@type": "Question",
      name: "How many guests can a private estate in Bhurban host for a music evening?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Estate scale in Bhurban is modest. Himalaya Villas runs eleven keys across three buildings at up to three persons per room, which suits a gathering of roughly twenty to thirty guests plus musicians. Wedding-scale functions of several hundred need a marquee and lawn instead.",
      },
    },
    {
      "@type": "Question",
      name: "Can musicians stay overnight at the venue?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "They should. A band finishing at eleven is not driving down the hill in fog. On an exclusive-use estate this is an internal allocation within your own booking; at a hotel it is a separate paid reservation. Either budget for it or end the set early enough for a safe descent.",
      },
    },
    {
      "@type": "Question",
      name: "Is a marquee setup cheaper than booking a whole estate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rarely, at small guest counts. Marquee economics assume scale — you pay transport and setup for infrastructure a standing property already has. Below about fifty guests, a whole-estate booking where venue and accommodation are one line item usually costs less and carries no curfew risk.",
      },
    },
  ],
};

// --- Article JSON-LD Schema ---
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Live Music Venue in Murree and Bhurban: What Is Actually Possible in the Hills",
  description:
    "Where you can actually host live music in the Murree hills — venue types, noise curfews, power, acoustics, real 2026 costs, and the one booking model with no curfew at all.",
  author: {
    "@type": "Person",
    name: "Himalaya Villas Travel Team",
  },
  datePublished: "2026-07-30",
  dateModified: "2026-07-30",
  publisher: {
    "@type": "Organization",
    name: "Himalaya Villas",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": absoluteUrl("/live-music-venue-murree"),
  },
};

export default function LiveMusicVenuePage() {
  return (
    <section className="min-h-screen bg-[#F6F1EA]">
      {/* --- Schema Markup --- */}
      <JsonLd
        items={[
          { id: "hv-jsonld-faq", data: faqSchema },
          { id: "hv-jsonld-article", data: articleSchema },
        ]}
      />

      {/* --- Hero Section --- */}
      <section className="relative h-[400px] sm:h-[480px] md:h-[560px] lg:h-[640px] w-full overflow-hidden">
        <Image
          src={heroBg}
          alt="Live music venue planning guide for Murree and Bhurban"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

        <Navbar />

        <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6">
          <div className="text-center max-w-4xl">
            <h1 className="font-display text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
              Live Music Venue in Murree and Bhurban:
              <br />
              <span className="text-[#c9a55b]">
                What Is Actually Possible in the Hills
              </span>
            </h1>
            <p className="mt-3 sm:mt-4 md:mt-5 text-white/90 text-sm sm:text-base md:text-lg tracking-wide max-w-3xl mx-auto">
              Venue types, noise curfews, power, acoustics, real 2026 costs,
              <br className="hidden sm:block" />
              and the one booking model with no curfew at all.
            </p>
          </div>
        </div>
      </section>

      {/* --- Introduction Section --- */}
      <section className="bg-[#F6F1EA] py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="space-y-4">
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              The question sounds simple. Somebody in Islamabad has a birthday,
              an anniversary, a company offsite or a mehndi in mind, they want
              it in the hills, and they want a guitarist or a qawwal party or a
              full band playing while it happens. So they search for a live
              music venue in Murree, and they find almost nothing — a handful of
              restaurant listings, a few marquee companies, and a great deal of
              silence.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              The silence is informative. Murree and Bhurban have no live music
              circuit in the way Lahore or Karachi do. There is no venue whose
              business model is performance. What exists instead is a set of
              hospitality properties that will, under specific conditions and
              within specific hours, permit music to happen on their premises.
              The distinction matters enormously, because it means the right
              question is not "which venue hosts live music?" but "which
              property will let me bring music in, for how long, and at what
              volume?"
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              That reframing changes everything about how you plan. It moves the
              decisive variables away from stage size and sightlines and toward
              things most hosts never think to ask about: how many other paying
              guests are sleeping within earshot, what time the property's own
              noise policy shuts you down, whether the power supply can carry a
              PA system through a load-shedding window, and whether the hillside
              behind you will bounce your sound into a village at midnight.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              This guide covers all of it — the five venue models available in
              the corridor, the curfew problem that ends most events earlier
              than planned, the acoustic behaviour of mountain terrain,
              indicative 2026 costs for musicians and sound hire, the seasonal
              window for outdoor performance, and a pre-deposit checklist. It is
              written for hosts planning something between twenty and forty
              guests, which is the size the Murree hills actually accommodate
              well.
            </p>
          </div>
        </div>
      </section>

      {/* --- What a "live music venue" means section --- */}
      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-neutral-900 mb-6">
            What a "live music venue" means in the Murree corridor
          </h2>
          <div className="space-y-4">
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              In a city, a live music venue is a purpose-built room: a stage, a
              house PA, a sound engineer on payroll, an acoustic treatment
              budget, and a licence that anticipates amplified performance. In
              the Murree–Bhurban corridor, none of that exists commercially.
              What you are actually shopping for is a hosting permission
              attached to a property that was built for sleeping and eating.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              This produces a consistent pattern of disappointment. A host
              books a hotel banquet hall on the strength of a photograph,
              arrives with a four-piece band, and discovers at 10:15pm that the
              duty manager is switching the power off because rooms on the floor
              above are occupied. Or a host books a lawn, and discovers that the
              lawn is shared with a restaurant terrace whose other diners did
              not sign up for a dholki.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              The properties are not being difficult. They are managing an
              obligation they have to guests who are not you. Every hotel and
              resort in the corridor sells rooms to strangers simultaneously,
              and those strangers have a reasonable expectation of quiet after
              a certain hour. The venue's curfew is not an arbitrary rule; it is
              the mathematical consequence of a shared-occupancy business model.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed bg-[#F6F1EA] p-6 rounded-lg border border-[#eadfce]">
              Once you understand that, the venue landscape sorts itself
              cleanly. Properties where other guests are present impose curfews.
              Properties where they are not, do not. Almost every practical
              difference between your options in the hills flows from that
              single structural fact.
            </p>
          </div>
        </div>
      </section>

      {/* --- The five venue models Section --- */}
      <section className="bg-[#F6F1EA] py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-neutral-900 mb-6">
            The five venue models — and what each one will actually let you do
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed mb-8">
            Working through the corridor from Murree's Mall Road down through
            Bhurban and out toward Patriata, there are five distinct models.
            They differ less in price than in permission.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-display font-medium text-neutral-900 mb-3">
                Hotel banquet halls and conference rooms
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
                The chain and four-star properties — the ones clustered around
                Bhurban and along the Murree expressway approaches — all have
                function space. It is professionally run, it comes with
                catering, and it is the easiest thing in the corridor to book,
                because banqueting is a product they actively sell.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed mt-2">
                The constraint is vertical. Banquet halls in hotels sit
                underneath or adjacent to guest rooms, and hotel sound policy is
                written for the sleepers, not the celebrants. Expect a hard stop
                between 10pm and 11pm, expect a decibel ceiling that is enforced
                by the duty manager rather than negotiated in advance, and
                expect amplified drums to be the first thing curtailed. Acoustic
                sets survive this environment; a full band with backline rarely
                does.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed mt-2 bg-[#F6F1EA] p-4 rounded-lg border border-[#eadfce]">
                Ask for the noise policy in writing before you pay. A verbal
                assurance from a sales coordinator is not the same instrument as
                a written clause, and the person who enforces the rule at
                10:30pm on a Saturday is not the person who sold you the room.
              </p>
              {/* Internal Link */}
              <div className="mt-4 pt-4 border-t border-[#eadfce]">
                <p className="text-sm sm:text-base text-neutral-700">
                  <span className="font-medium">Compare with:</span>{" "}
                  <Link
                    href="/hotel-rooms-in-murree"
                    className="text-[#8b6914] underline underline-offset-4 hover:text-[#6d5210] transition-colors"
                  >
                    Hotel rooms in Murree
                  </Link>{" "}
                  — understand the broader hotel landscape in the hills.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-display font-medium text-neutral-900 mb-3">
                Restaurants and cafés with a resident act
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
                A small number of restaurants in Murree and along the Bhurban
                road run occasional live evenings — usually a solo singer with a
                backing track, sometimes a duo. These are genuinely the closest
                thing the corridor has to a live music venue in the urban sense.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed mt-2">
                They are not, however, private. You are a table in someone
                else's room, sharing the performance with whoever else walked
                in. For a couple marking an anniversary that is often exactly
                right, and it costs nothing beyond dinner. For a hosted event
                with a guest list, it is unworkable: you cannot control the
                programme, the timing, the volume, or the other diners.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed mt-2">
                A handful will do a full buyout on a weekday. If you go this
                route, get the buyout in writing with a stated end time, confirm
                whether the kitchen closes before the room does, and establish
                who owns the sound system — because if it is the resident
                singer's, it leaves when he does.
              </p>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-display font-medium text-neutral-900 mb-3">
                Marquee and lawn setups
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
                The wedding-industrial model: hire a lawn or a flat piece of
                ground, bring in a marquee contractor, a caterer, a sound
                company and a generator, and build a venue for one night.
                Islamabad and Rawalpindi contractors will travel to Murree, and
                this is how most large hill-station functions actually happen.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed mt-2">
                It gives you total programming freedom and no curfew from a
                hotel management, which is the appeal. What it gives you instead
                is total responsibility: the weather risk, the ground condition,
                the power, the toilets, the vehicle access for a truck carrying
                staging up a hill road, and the goodwill of whoever lives within
                earshot. Murree's residential density is higher than it looks
                from the road, and a sound system at midnight in a valley
                reaches further than you expect.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed mt-2">
                Cost scales badly at small guest counts. A marquee build that
                makes sense at 300 guests is grotesque at 30 — you are paying
                setup and transport for infrastructure that a smaller property
                already has standing.
              </p>
              {/* Internal Link */}
              <div className="mt-4 pt-4 border-t border-[#eadfce]">
                <p className="text-sm sm:text-base text-neutral-700">
                  <span className="font-medium">Related:</span>{" "}
                  <Link
                    href="/marriage-halls-murree"
                    className="text-[#8b6914] underline underline-offset-4 hover:text-[#6d5210] transition-colors"
                  >
                    Marriage halls and wedding venues
                  </Link>{" "}
                  — explore larger function options.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-display font-medium text-neutral-900 mb-3">
                Rest houses and departmental guest houses
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
                Government, corporate and forest department rest houses exist
                throughout the corridor and are frequently beautiful. Access is
                the problem: most run on nomination or internal allocation
                rather than open booking, and the ones that accept outside
                bookings do so unpredictably.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed mt-2">
                Even when you secure one, the terms rarely contemplate an event.
                Guest capacity is small, catering is basic or self-arranged, and
                permission for amplified music is at the discretion of a
                caretaker who has no commercial incentive to say yes. They work
                well for a quiet family weekend with a guitar on a verandah.
                They do not work as event venues, and planning one as such is a
                reliable way to lose a deposit.
              </p>
              {/* Internal Link */}
              <div className="mt-4 pt-4 border-t border-[#eadfce]">
                <p className="text-sm sm:text-base text-neutral-700">
                  <span className="font-medium">Alternative:</span>{" "}
                  <Link
                    href="/guest-house-murree"
                    className="text-[#8b6914] underline underline-offset-4 hover:text-[#6d5210] transition-colors"
                  >
                    Guest house in Murree
                  </Link>{" "}
                  — for a more reliable private accommodation.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-display font-medium text-neutral-900 mb-3">
                Private estates on exclusive-use booking
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
                The last model is the smallest and the least understood: a
                property that sells its entire premises to one group at a time
                rather than selling rooms to several groups at once. Bhurban has
                a small number of these. They are usually described as villas or
                estates, and they are frequently mistaken for hotels by search
                engines and travellers alike.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed mt-2">
                The relevant feature is not luxury. It is arithmetic. If the
                property has admitted exactly one booking, there is no second
                party whose sleep the music could disturb, and therefore no
                internal curfew to enforce. The only remaining constraints are
                the genuine external ones — distance to the nearest neighbouring
                household, and basic courtesy about the hour.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed mt-2 bg-[#F6F1EA] p-4 rounded-lg border border-[#eadfce]">
                This is the only model in the corridor where the question "how
                late can the music go?" has an answer that is negotiated with
                you rather than announced to you. It is also, for a group of
                twenty to forty, frequently the cheapest of the five once you
                account for the fact that the accommodation and the venue are
                the same line item.
              </p>
              {/* Internal Link */}
              <div className="mt-4 pt-4 border-t border-[#eadfce]">
                <p className="text-sm sm:text-base text-neutral-700">
                  <span className="font-medium">Explore:</span>{" "}
                  <Link
                    href="/bhurban-resorts"
                    className="text-[#8b6914] underline underline-offset-4 hover:text-[#6d5210] transition-colors"
                  >
                    Bhurban resorts
                  </Link>{" "}
                  — discover more about the premium accommodation in the area.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- The Curfew Problem Section --- */}
      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-neutral-900 mb-6">
            The curfew problem, stated plainly
          </h2>
          <div className="space-y-4">
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              Almost every disappointing hill-station event traces back to the
              same moment: someone turns the sound off earlier than the host
              expected. It is worth understanding exactly why, because it
              determines which venue model you should be shopping in.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              A hotel with sixty rooms has, on a full Saturday, somewhere
              between eighty and a hundred and fifty people asleep or trying to
              be. The property's duty of care runs to all of them equally. When
              your band's third set collides with a complaint from room 214, the
              property resolves it in favour of the complainant, because the
              complainant is also a paying guest and, critically, one who will
              leave a review about it.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              No amount of advance negotiation reliably changes this. The sales
              team can promise midnight; the duty manager still has to answer
              the phone at 22:40. The policy that binds is the one operating at
              the moment of conflict, and that policy is written to protect the
              property's review scores.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed bg-[#F6F1EA] p-6 rounded-lg border border-[#eadfce]">
              The corollary is simple and useful: if your event depends on music
              continuing past eleven, you should not be shopping for a hall
              inside a property that is also selling rooms to other people that
              night. Shop instead for a property that has sold its entire self
              to you — or accept that your event ends at eleven and plan a
              programme that peaks at half past nine.
            </p>
            {/* Internal Link */}
            <div className="mt-4 pt-4 border-t border-[#eadfce]">
              <p className="text-sm sm:text-base text-neutral-700">
                <span className="font-medium">Consider:</span>{" "}
                <Link
                  href="/pc-hotel-bhurban-alternative"
                  className="text-[#8b6914] underline underline-offset-4 hover:text-[#6d5210] transition-colors"
                >
                  PC Hotel Bhurban alternative
                </Link>{" "}
                — for venues that offer more flexibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- What the mountain does to your sound Section --- */}
      <section className="bg-[#F6F1EA] py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-neutral-900 mb-6">
            What the mountain does to your sound
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed mb-8">
            Hill acoustics are not a technicality; they change what equipment
            you need and where you put it. Three effects matter.
          </p>

          <div className="space-y-6">
            <div className="border-l-4 border-[#c9a55b] pl-6">
              <h3 className="text-xl sm:text-2xl font-display font-medium text-neutral-900 mb-2">
                Thin Air
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
                Thin air at altitude carries high frequencies less efficiently
                than dense air at sea level. Bhurban sits at roughly 1,900
                metres and Murree slightly higher. Vocals and cymbals lose
                presence over distance faster than they would in Lahore, which
                is why outdoor sets in the hills often sound thin at the back of
                a lawn even when the levels look correct on the desk.
              </p>
            </div>

            <div className="border-l-4 border-[#c9a55b] pl-6">
              <h3 className="text-xl sm:text-2xl font-display font-medium text-neutral-900 mb-2">
                Valley Reflection
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
                Valleys reflect. Sound projected across an open slope returns
                off the opposite face with a delay long enough to be audible as
                a distinct echo rather than reverb. Pointing your PA into a
                valley is the single most common setup error at hill events, and
                the fix is trivial: orient the stage so the speakers fire into a
                hillside or a stand of trees rather than across open air.
              </p>
            </div>

            <div className="border-l-4 border-[#c9a55b] pl-6">
              <h3 className="text-xl sm:text-2xl font-display font-medium text-neutral-900 mb-2">
                Cedar and Pine Absorption
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
                Cedar and pine absorb. This is genuinely helpful. A performance
                area backed by mature forest behaves like a naturally treated
                room, soaking up reflections and containing spill. Terraces cut
                into a forested slope are the best acoustic environments the
                corridor offers, and they cost nothing to use.
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-white border border-[#eadfce] rounded-lg">
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              <strong>Practical consequence:</strong> for twenty to forty guests
              outdoors in the hills, a modest system placed correctly
              outperforms a large system placed carelessly. Two to four
              kilowatts, elevated, angled into the slope, with a small subwoofer
              for dhol and tabla, will comfortably serve a terrace gathering.
              Anything larger is mostly being donated to the valley.
            </p>
          </div>
        </div>
      </section>

      {/* --- Power Section --- */}
      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-neutral-900 mb-6">
            Power: the failure that ends more events than weather
          </h2>
          <div className="space-y-4">
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              Load-shedding in the hill stations is real, seasonal and worst
              precisely when you are most likely to be hosting — summer evenings
              and peak winter. Grid supply in the Murree–Bhurban corridor is
              also voltage-unstable, and unstable voltage is what kills
              amplifiers and mixing desks.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              The equipment you should insist on is not glamorous. A generator
              sized with genuine headroom, a stabiliser between the generator
              and the sound rig, and a fuel reserve calculated for the whole
              evening rather than the scheduled programme. A 25 to 40 kVA set
              covers a small PA, event lighting and catering equipment for a
              gathering of this size with room to spare.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              Two questions separate a competent supplier from a hopeful one.
              Ask whether the generator has an automatic transfer switch,
              because without one somebody has to notice the outage and start it
              manually — and during a performance nobody notices for thirty
              seconds, which is long enough to lose the room. Then ask who
              operates it overnight, because a generator with nobody assigned to
              it will run out of diesel at the worst possible time.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed bg-[#F6F1EA] p-6 rounded-lg border border-[#eadfce]">
              If the property provides backup power as standard, confirm the
              rating and confirm whether it covers the outdoor circuits or only
              the building. Many hill properties have backup sized for lights
              and fridges, not for a PA system.
            </p>
          </div>
        </div>
      </section>

      {/* --- Costs Table Section --- */}
      <section className="bg-[#F6F1EA] py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-neutral-900 mb-6">
            What live music actually costs in Pakistan in 2026
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed mb-8">
            Musician fees vary enormously with reputation, and hill-station
            travel adds a meaningful uplift because performers are giving up a
            night and absorbing a two-to-three-hour drive each way from
            Islamabad or considerably more from Lahore. The ranges below are
            indicative market rates for a private engagement in the Murree
            corridor and should be verified against live quotes; they are
            offered as a budgeting frame, not a price list.
          </p>

          <p className="text-sm sm:text-base font-medium text-neutral-800 mb-4">
            Indicative 2026 costs for a private live-music event in the
            Murree–Bhurban corridor (PKR)
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base md:text-lg border-collapse">
              <thead>
                <tr className="bg-[#c9a55b] text-white">
                  <th className="px-4 py-3 text-left font-medium">Element</th>
                  <th className="px-4 py-3 text-left font-medium">
                    Typical range
                  </th>
                  <th className="px-4 py-3 text-left font-medium">Notes</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#eadfce]">
                <tr>
                  <td className="px-4 py-3 font-medium text-neutral-800">
                    Solo vocalist with guitar or keyboard
                  </td>
                  <td className="px-4 py-3 text-neutral-700">
                    PKR 40,000 – 90,000
                  </td>
                  <td className="px-4 py-3 text-neutral-700">
                    Two to three sets; usually brings own small amp
                  </td>
                </tr>
                <tr className="bg-[#F6F1EA]">
                  <td className="px-4 py-3 font-medium text-neutral-800">
                    Acoustic duo or trio
                  </td>
                  <td className="px-4 py-3 text-neutral-700">
                    PKR 90,000 – 200,000
                  </td>
                  <td className="px-4 py-3 text-neutral-700">
                    The sweet spot for 20–40 guests on a terrace
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-neutral-800">
                    Qawwali party (6–9 performers)
                  </td>
                  <td className="px-4 py-3 text-neutral-700">
                    PKR 150,000 – 400,000
                  </td>
                  <td className="px-4 py-3 text-neutral-700">
                    Named parties command well above this range
                  </td>
                </tr>
                <tr className="bg-[#F6F1EA]">
                  <td className="px-4 py-3 font-medium text-neutral-800">
                    Full band with backline
                  </td>
                  <td className="px-4 py-3 text-neutral-700">
                    PKR 250,000 – 700,000
                  </td>
                  <td className="px-4 py-3 text-neutral-700">
                    Requires generator headroom and a proper load-in path
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-neutral-800">
                    Dhol player
                  </td>
                  <td className="px-4 py-3 text-neutral-700">
                    PKR 25,000 – 60,000
                  </td>
                  <td className="px-4 py-3 text-neutral-700">
                    Per performer; commonly booked in pairs for entrances
                  </td>
                </tr>
                <tr className="bg-[#F6F1EA]">
                  <td className="px-4 py-3 font-medium text-neutral-800">
                    Sound system hire, 2–4 kW with engineer
                  </td>
                  <td className="px-4 py-3 text-neutral-700">
                    PKR 60,000 – 150,000
                  </td>
                  <td className="px-4 py-3 text-neutral-700">
                    Includes setup, soundcheck and teardown
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-neutral-800">
                    Sound plus event lighting package
                  </td>
                  <td className="px-4 py-3 text-neutral-700">
                    PKR 120,000 – 280,000
                  </td>
                  <td className="px-4 py-3 text-neutral-700">
                    Uplighters and stage wash; ask about weather covers
                  </td>
                </tr>
                <tr className="bg-[#F6F1EA]">
                  <td className="px-4 py-3 font-medium text-neutral-800">
                    Generator 25–40 kVA with fuel and operator
                  </td>
                  <td className="px-4 py-3 text-neutral-700">
                    PKR 30,000 – 70,000
                  </td>
                  <td className="px-4 py-3 text-neutral-700">
                    Per night; confirm auto transfer switch
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-neutral-800">
                    Murree travel and overnight uplift
                  </td>
                  <td className="px-4 py-3 text-neutral-700">20% – 40%</td>
                  <td className="px-4 py-3 text-neutral-700">
                    Applied by most Islamabad and Lahore suppliers
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 p-6 bg-white border border-[#eadfce] rounded-lg space-y-4">
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              <strong>Two budgeting notes worth internalising.</strong>{" "}
              Musicians quote per engagement, not per hour, so a curfew that
              cuts your evening short does not reduce the fee — you simply
              receive less of what you paid for, which is another reason the
              curfew question belongs at the front of your planning rather than
              the end. And sound hire is where hosts most often economise and
              most often regret it; a strong performer through a poor system
              sounds worse than a modest performer through a good one.
            </p>
          </div>
        </div>
      </section>

      {/* --- Seasonal Window Section --- */}
      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-neutral-900 mb-6">
            The seasonal window for outdoor music
          </h2>
          <div className="space-y-4">
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              The corridor's climate divides the year into three usable states,
              and outdoor performance behaves differently in each.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              <strong>From late April to mid-June,</strong> evenings are cool,
              dry and close to ideal. This is the strongest outdoor window:
              temperatures fall comfortably after sunset, rain is intermittent
              rather than sustained, and the light lasts late enough for an
              early start outdoors.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              <strong>July through mid-September is monsoon.</strong> Afternoon
              and evening rain is frequent, mist rolls in without much warning,
              and humidity affects both instruments and equipment. Outdoor
              events remain possible but require a covered performance area as a
              genuine plan rather than a contingency — wooden instruments and
              open mixing desks do not survive an hour of hill rain.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              <strong>Mid-October through March is cold,</strong> clear and
              visually spectacular, with snow from roughly late December.
              Outdoor music is viable with heating — bonfire, patio heaters, or
              both — but sets run shorter because fingers stop working. Winter
              events in the corridor tend to work best as a short outdoor
              opening around a fire, moving indoors for the substantial part of
              the programme.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed bg-[#F6F1EA] p-6 rounded-lg border border-[#eadfce]">
              Whatever the season, build a wet-weather plan with a named indoor
              space and confirm that the property will let you move the
              performance there at short notice. "We'll see on the night" is not
              a plan, and the moment you need it is the moment nobody is
              available to authorise it.
            </p>
            {/* Internal Link */}
            <div className="mt-4 pt-4 border-t border-[#eadfce]">
              <p className="text-sm sm:text-base text-neutral-700">
                <span className="font-medium">Explore:</span>{" "}
                <Link
                  href="/things-to-do-in-murree"
                  className="text-[#8b6914] underline underline-offset-4 hover:text-[#6d5210] transition-colors"
                >
                  Things to do in Murree
                </Link>{" "}
                — plan your full itinerary around your event.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Permissions Section --- */}
      <section className="bg-[#F6F1EA] py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-neutral-900 mb-6">
            Permissions, neighbours and the practical legal position
          </h2>
          <div className="space-y-4">
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              For a private gathering on private property, no performance
              licence is required in Pakistan in the way it would be in the
              United Kingdom or the United States. What governs instead is a
              combination of local administration discretion, general
              public-nuisance provisions, and — in practice, most often — the
              tolerance of whoever lives nearby.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              That practical reality is worth taking seriously rather than
              dismissing. A complaint from a neighbouring household to the local
              police at midnight will end your event regardless of what your
              contract with the venue says. The properties that host music
              successfully in the corridor are the ones with genuine physical
              separation from other homes, and this is a question you can and
              should ask directly: how far is the nearest occupied house from
              the performance area?
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              Two further points of etiquette that also happen to be good risk
              management. Larger functions — a wedding-scale event with several
              hundred guests — attract attention from the local administration
              and are worth notifying in advance through the property, which
              will know the right channel. And a gathering during Ramadan or on
              days of religious observance requires a different judgement
              entirely about amplified music, one that most properties in the
              corridor will raise with you before you have to raise it with
              them.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              None of this is onerous. It is simply the difference between an
              event that runs to its own schedule and one that is ended by
              somebody else's.
            </p>
          </div>
        </div>
      </section>

      {/* --- Sourcing and briefing the performers Section --- */}
      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-neutral-900 mb-6">
            Sourcing and briefing the performers
          </h2>
          <div className="space-y-4">
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              There is no Murree talent pool of any depth. Effectively every act
              you book will travel from Islamabad or Rawalpindi, occasionally
              from Lahore for a named performer. This has three consequences
              your planning needs to absorb.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              <strong>Accommodation.</strong> A band that finishes at eleven is
              not driving down the hill at midnight in fog. Either budget rooms
              for the act and crew, or accept that the set ends early enough for
              a safe descent. On an exclusive-use property this is usually
              solvable within your own booking; in a hotel it is a separate
              reservation at your cost.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              <strong>Load-in.</strong> Ask the property directly what size
              vehicle can reach the performance area, and how far equipment must
              be carried from the last drivable point. Bhurban's approach roads
              are reasonable; individual property tracks vary considerably, and
              a sound engineer who discovers a hundred-metre carry with no
              trolley access will charge for it and resent it.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              <strong>Brief.</strong> Send the act a written brief covering set
              times, the curfew if there is one, the power arrangement, the
              covered area, and what you actually want — because "play something
              nice" produces a wedding-reception set at an event that wanted a
              quiet acoustic evening. Specify the mood, name three or four
              reference artists, and state clearly whether you want the audience
              listening or dancing. The two are different jobs and require
              different musicians.
            </p>
          </div>
        </div>
      </section>

      {/* --- The pre-deposit checklist Section --- */}
      <section className="bg-[#F6F1EA] py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-neutral-900 mb-6">
            The pre-deposit checklist
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed mb-8">
            Everything above compresses into a short list of questions. Ask all
            of them before money moves, and get the answers in writing rather
            than over the phone.
          </p>

          <ol className="space-y-4 list-decimal list-inside">
            <li className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed pl-4">
              <span className="font-medium text-neutral-900">
                Is my group the only booking on the property that night, or are
                rooms sold to other parties?
              </span>
            </li>
            <li className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed pl-4">
              <span className="font-medium text-neutral-900">
                What is the written noise policy, and what time does amplified
                music have to stop?
              </span>
            </li>
            <li className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed pl-4">
              <span className="font-medium text-neutral-900">
                Who enforces that policy on the night, and what is their name
                and number?
              </span>
            </li>
            <li className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed pl-4">
              <span className="font-medium text-neutral-900">
                How far is the nearest occupied household from the intended
                performance area?
              </span>
            </li>
            <li className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed pl-4">
              <span className="font-medium text-neutral-900">
                What is the backup power rating, does it cover outdoor circuits,
                and does it switch automatically?
              </span>
            </li>
            <li className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed pl-4">
              <span className="font-medium text-neutral-900">
                What is the covered wet-weather alternative, and can we move to
                it on the night without further approval?
              </span>
            </li>
            <li className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed pl-4">
              <span className="font-medium text-neutral-900">
                What vehicle can reach the performance area, and how far is the
                carry from there?
              </span>
            </li>
            <li className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed pl-4">
              <span className="font-medium text-neutral-900">
                Can the performers stay on site, and at what cost?
              </span>
            </li>
            <li className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed pl-4">
              <span className="font-medium text-neutral-900">
                Is outside catering permitted, or is the property's kitchen
                mandatory?
              </span>
            </li>
            <li className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed pl-4">
              <span className="font-medium text-neutral-900">
                What is the cancellation position if weather makes the road
                impassable?
              </span>
            </li>
          </ol>
        </div>
      </section>

      {/* --- Where this leads: the exclusive-use answer Section --- */}
      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-neutral-900 mb-6">
            Where this leads: the exclusive-use answer
          </h2>
          <div className="space-y-4">
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              Read that checklist back and notice how many of the ten questions
              resolve themselves the moment the answer to the first one is "yes,
              you are the only booking." The curfew question dissolves. The
              complaint-from-room-214 question dissolves. The wet-weather move
              dissolves, because there is no other party using the indoor space.
              Performer accommodation becomes an internal allocation rather than
              a separate reservation.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              That is the practical case for the exclusive-use model, and it is
              why a host planning live music in the Murree hills should start by
              looking at estates rather than at halls. The corridor has a small
              number of them.
            </p>
          </div>
        </div>
      </section>

      {/* --- Himalaya Villas Section --- */}
      <section className="bg-[#F6F1EA] py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-neutral-900 mb-6">
            Himalaya Villas — The Exclusive-Use Estate in Bhurban
          </h2>
          <div className="space-y-4">
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              Himalaya Villas, at Mohra Iswal near Kashmiri Bazar in Bhurban, is
              one such property. It is a private cedar estate of three buildings
              — Rakaposhi Villa with five executive rooms, Himalaya Luxury
              Villas with four bedrooms, and Himalaya Apartments with two —
              eleven keys in total, and it books to one group at a time. There
              is no second party on the property while you are there, which is
              the whole of the point.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              For music specifically, the relevant features are ordinary rather
              than exotic. A bonfire terrace cut into a forested slope, which is
              the acoustic environment described earlier in this guide — cedar
              behind the performance area absorbing reflections instead of a
              valley returning them. A café and BBQ facilities on site, so
              catering and the performance occupy the same footprint rather than
              requiring a marquee build. Room capacity across eleven keys at up
              to three persons per room, which comfortably absorbs a group of
              twenty to thirty plus the musicians. And no internal curfew
              imposed by other guests, because there are none — only the genuine
              external consideration of the hour and the neighbours, which the
              estate's separation from other households makes manageable rather
              than fraught.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              The arithmetic tends to surprise people. Booking a hotel hall for
              an evening and rooms for a group of twenty-five is two separate
              transactions, and the hall is charged as a function whether or not
              the music is allowed to finish. On a whole-estate booking, the
              venue and the accommodation are the same line item — you are not
              renting a room to celebrate in, you are simply celebrating in the
              house you have already booked. For a group of this size the totals
              frequently land closer together than expected, and the
              exclusive-use option carries no curfew risk on top.
            </p>
            <div className="bg-white p-6 rounded-lg border border-[#eadfce]">
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
                It will not suit everyone. A wedding of three hundred needs a
                marquee and a lawn, and this is not that. A couple who want a
                singer and a dinner without hosting anything should take a
                restaurant table for a fraction of the cost. The estate model
                earns its place for the gathering in between — twenty to forty
                people, a programme that matters to the host, and a real
                preference that it not be ended by somebody else's policy.
              </p>
            </div>
          </div>

          {/* CTA Block */}
          <div className="mt-8 bg-[#c9a55b] p-6 sm:p-8 rounded-lg text-center">
            <p className="text-white text-sm sm:text-base md:text-lg mb-4">
              <strong>Message Himalaya Villas on WhatsApp</strong> with your
              date, guest count, and what you have in mind musically, and you
              will get a straight answer on availability and on what the evening
              can actually run to.
            </p>
            <a
              href="https://wa.me/923045679000?utm_source=website&utm_medium=pillar&utm_campaign=live_music_venue"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#8b6914] px-8 py-3 rounded-lg font-medium hover:bg-[#F6F1EA] transition-colors text-sm sm:text-base"
            >
              Enquire on WhatsApp →
            </a>
          </div>

          <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed mt-6">
            Direct enquiries are also where the flexibility on arrival times,
            catering and programme lives — it is not something the booking
            platforms are built to handle.
          </p>
        </div>
      </section>

      {/* --- FAQ Section --- */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-widest text-[#a68b3b] mb-3">
              FAQ
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display text-[#1b1b1b]">
              Frequently Asked Questions: Live Music Venues in Murree and
              Bhurban
            </h2>
          </div>

          <div className="space-y-6">
            <div className="border-l-2 border-[#c9a55b] pl-6">
              <h3 className="text-base sm:text-lg font-semibold text-[#1b1b1b] mb-2">
                Is there a dedicated live music venue in Murree?
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                No. The Murree–Bhurban corridor has no purpose-built performance
                venue. What exists are hotels, restaurants and private estates
                that permit music on their premises under their own conditions.
                The practical question is which property will host your act, for
                how long, and at what volume.
              </p>
            </div>

            <div className="border-l-2 border-[#c9a55b] pl-6">
              <h3 className="text-base sm:text-lg font-semibold text-[#1b1b1b] mb-2">
                How late can live music go at a hotel in Murree or Bhurban?
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Most hotels enforce a stop between 10pm and 11pm, because other
                guests are sleeping in rooms above or beside the function space.
                Get the noise policy in writing before paying, and note that the
                duty manager on the night enforces it, not the sales coordinator
                who sold you the hall.
              </p>
            </div>

            <div className="border-l-2 border-[#c9a55b] pl-6">
              <h3 className="text-base sm:text-lg font-semibold text-[#1b1b1b] mb-2">
                Can I host a private music night with no curfew near Islamabad?
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Only on a property with no other paying guests. Exclusive-use
                estates in Bhurban, such as Himalaya Villas, admit one group at
                a time, so there is no internal curfew to enforce — just the
                external consideration of neighbours and the hour, which
                distance from other households largely resolves.
              </p>
            </div>

            <div className="border-l-2 border-[#c9a55b] pl-6">
              <h3 className="text-base sm:text-lg font-semibold text-[#1b1b1b] mb-2">
                What does a live band cost for an event in Murree?
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Indicatively, a solo vocalist runs PKR 40,000–90,000, an
                acoustic duo or trio PKR 90,000–200,000, a qawwali party PKR
                150,000–400,000, and a full band PKR 250,000–700,000, plus a
                20–40% uplift for Murree travel. Sound hire with an engineer
                adds PKR 60,000–150,000.
              </p>
            </div>

            <div className="border-l-2 border-[#c9a55b] pl-6">
              <h3 className="text-base sm:text-lg font-semibold text-[#1b1b1b] mb-2">
                Do I need a licence for live music at a private event in
                Pakistan?
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                No performance licence is required for a private gathering on
                private property. What governs in practice is local
                administration discretion and neighbour tolerance. A complaint
                at midnight ends an event regardless of your contract, so
                physical separation from other homes matters more than
                paperwork.
              </p>
            </div>

            <div className="border-l-2 border-[#c9a55b] pl-6">
              <h3 className="text-base sm:text-lg font-semibold text-[#1b1b1b] mb-2">
                What is the best season for an outdoor music event in the Murree
                hills?
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Late April to mid-June is the strongest window — cool, dry
                evenings and late light. July to mid-September is monsoon and
                needs a genuinely covered performance area. Winter works with a
                bonfire and heating but suits a short outdoor opening moving
                indoors.
              </p>
            </div>

            <div className="border-l-2 border-[#c9a55b] pl-6">
              <h3 className="text-base sm:text-lg font-semibold text-[#1b1b1b] mb-2">
                What power supply does a live music event in Bhurban need?
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                A 25–40 kVA generator with a stabiliser covers a small PA,
                lighting and catering for twenty to forty guests. Confirm it has
                an automatic transfer switch and an assigned overnight operator
                — grid voltage in the hills is unstable, and manual starts lose
                the room during a set.
              </p>
            </div>

            <div className="border-l-2 border-[#c9a55b] pl-6">
              <h3 className="text-base sm:text-lg font-semibold text-[#1b1b1b] mb-2">
                How many guests can a private estate in Bhurban host for a music
                evening?
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Estate scale in Bhurban is modest. Himalaya Villas runs eleven
                keys across three buildings at up to three persons per room,
                which suits a gathering of roughly twenty to thirty guests plus
                musicians. Wedding-scale functions of several hundred need a
                marquee and lawn instead.
              </p>
            </div>

            <div className="border-l-2 border-[#c9a55b] pl-6">
              <h3 className="text-base sm:text-lg font-semibold text-[#1b1b1b] mb-2">
                Can musicians stay overnight at the venue?
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                They should. A band finishing at eleven is not driving down the
                hill in fog. On an exclusive-use estate this is an internal
                allocation within your own booking; at a hotel it is a separate
                paid reservation. Either budget for it or end the set early
                enough for a safe descent.
              </p>
            </div>

            <div className="border-l-2 border-[#c9a55b] pl-6">
              <h3 className="text-base sm:text-lg font-semibold text-[#1b1b1b] mb-2">
                Is a marquee setup cheaper than booking a whole estate?
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Rarely, at small guest counts. Marquee economics assume scale —
                you pay transport and setup for infrastructure a standing
                property already has. Below about fifty guests, a whole-estate
                booking where venue and accommodation are one line item usually
                costs less and carries no curfew risk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Bottom CTA Section --- */}
      <section className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[480px] overflow-hidden">
        <Image
          src={bottomCtaBg}
          alt="Plan your live music event in Murree at Himalaya Villas"
          fill
          sizes="100vw"
          className="object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-full flex items-center justify-center">
          <div className="text-center text-white max-w-2xl">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4">
              Plan Your Perfect
              <br />
              <span className="text-[#c9a55b]">Music Event in the Hills</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/80 mb-6">
              Whether you're looking for a quiet acoustic evening or a full
              band performance, start planning your live music event today.
            </p>
            <a
              href="https://wa.me/923045679000?utm_source=website&utm_medium=pillar&utm_campaign=live_music_venue"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#c9a55b] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#b8944a] transition-colors text-sm sm:text-base"
            >
              Book Now via WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </section>
  );
}