import type { MurreeHotelsSection } from "@/lib/seo/murree-hotels-seo-content";

type Variant = "homepage" | "luxury" | "best-hotels";

const variantStyles: Record<
  Variant,
  {
    section: string;
    title: string;
    paragraph: string;
    subsectionTitle: string;
    eyebrow?: string;
  }
> = {
  homepage: {
    section: "bg-background py-20 md:py-28 px-8 md:px-16 lg:px-24",
    title: "font-display text-3xl md:text-4xl lg:text-5xl font-normal leading-tight text-foreground",
    paragraph: "text-base md:text-lg leading-relaxed text-muted-foreground",
    subsectionTitle: "font-display text-xl md:text-2xl text-foreground mt-10 mb-4",
    eyebrow: "text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4",
  },
  luxury: {
    section: "py-20 md:py-28 bg-[#fcfbf8] px-6",
    title: "font-display text-4xl md:text-5xl text-[#1b261b]",
    paragraph: "text-[15px] text-[#8b8878] leading-relaxed",
    subsectionTitle: "font-display text-2xl text-[#1b261b] mt-10 mb-4",
    eyebrow: "flex items-center gap-3 text-[#8b8878] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-4",
  },
  "best-hotels": {
    section: "py-16 md:py-24 px-6 max-w-5xl mx-auto",
    title: "font-display text-3xl md:text-4xl font-bold text-neutral-900",
    paragraph: "text-lg text-neutral-600 leading-relaxed",
    subsectionTitle: "text-2xl font-bold text-neutral-900 mt-10 mb-4",
  },
};

type MurreeHotelsContentSectionProps = {
  content: MurreeHotelsSection;
  variant?: Variant;
  eyebrow?: string;
};

export default function MurreeHotelsContentSection({
  content,
  variant = "homepage",
  eyebrow,
}: MurreeHotelsContentSectionProps) {
  const styles = variantStyles[variant];

  return (
    <section className={styles.section}>
      <div className={variant === "luxury" ? "max-w-6xl mx-auto" : "max-w-4xl mx-auto"}>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        <h2 className={styles.title}>{content.title}</h2>
        <div className={`mt-8 space-y-6 ${variant === "luxury" ? "max-w-4xl" : ""}`}>
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
        {content.subsections?.map((subsection) => (
          <div key={subsection.heading} className="mt-10">
            <h3 className={styles.subsectionTitle}>{subsection.heading}</h3>
            <div className="space-y-6">
              {subsection.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className={styles.paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
