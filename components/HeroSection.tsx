const heroVideo = "/assets/hero-video.mp4";
import Navbar from "./Navbar";
import BookingWidget from "./BookingWidget";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="hero-overlay absolute inset-0 z-10" />

      {/* Navbar */}
      <Navbar />

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col justify-end h-full pb-8 sm:pb-16 md:pb-24 px-4 sm:px-8 md:px-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8">
          <div>
            <p
              className="text-xs font-semibold tracking-[0.3em] uppercase mb-4 animate-fade-up"
              style={{ color: "hsl(var(--hero-text) / 0.6)" }}
            >
              only 3Villas. No Exceptions.
            </p>
            <h1
              className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-normal leading-[1.1] animate-fade-up"
              style={{ color: "hsl(var(--hero-text))" }}
            >
              Bhurban's Most
              <br />
              Sought-After
              <br />
              Mountain Escape
            </h1>
            <p
              className="mt-6 text-base md:text-lg font-light max-w-md animate-fade-up-delay"
              style={{ color: "hsl(var(--hero-text) / 0.85)" }}
            >
              Private, personal, and entirely yours.
            </p>
            <div className="flex flex-wrap gap-4 mt-8 animate-fade-up-delay-2">
              <a
                href="#reserve"
                className="inline-flex items-center gap-2 text-sm font-medium tracking-wider uppercase transition-colors duration-300 hover:opacity-80"
                style={{ color: "hsl(var(--hero-text))" }}
              >
                Check Availability →
              </a>
              <a
                href="https://wa.me/923045679000?text=I%20would%20like%20to%20plan%20an%20event"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium tracking-wider uppercase px-6 py-2.5 border transition-all duration-300 hover:bg-white/10"
                style={{ color: "hsl(var(--hero-text))", borderColor: "hsl(var(--hero-text) / 0.4)" }}
              >
                Plan Your Event
              </a>
            </div>
          </div>

          <div className="animate-fade-up-delay-2 mr-30">
            <BookingWidget />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
