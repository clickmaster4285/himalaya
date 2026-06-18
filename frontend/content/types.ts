// types.ts

export interface Article {
  slug: string;
  title: string;
  metaDescription: string;
  keywords: string;
  eyebrow: string;
  h1: string;
  heroTagline: string;
  heroImage: string;
    blocks: Block[];
    
}

export type Block =
  | CalloutQABlock
  | ParagraphBlock
  | SectionBlock
  | FactsBlock
  | ComparisonBlock
  | AudienceBlock
  | CTABlock
  | FAQBlock
  | RelatedBlock;

export interface CalloutQABlock {
  type: "callout-qa";
  question: string;
  answer: string;
}

export interface ParagraphBlock {
  type: "paragraph";
  text: string;
}

export interface SectionBlock {
  type: "section";
  eyebrow?: string;
  heading?: string;
  paragraphs: string[];
  bullets?: Bullet[];
  image?: Image;
}

export interface Bullet {
  label?: string;
  text: string;
}

export interface Image {
  src: string;
  alt: string;
}

export interface FactsBlock {
  type: "facts";
  heading: string;
  items: FactItem[];
}

export interface FactItem {
  label: string;
  value: string;
}

export interface ComparisonBlock {
  type: "comparison";
  heading: string;
  columns:  string[];
  rows: ComparisonRow[];
}

export interface ComparisonRow {
  feature: string;
  a: string;
    b: string;
    c?: string;
    d?: string;
    e?: string;
}

export interface AudienceBlock {
  type: "audience";
  heading: string;
  items: AudienceItem[];
}

export interface AudienceItem {
  title: string;
  text: string;
}

export interface CTABlock {
  type: "cta";
  eyebrow: string;
  heading: string;
  text: string;
  buttonLabel: string;
  buttonHref: string;
  footnote?: string;
}

export interface FAQBlock {
  type: "faqs";
  heading: string;
  items: FAQItem[];
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface RelatedBlock {
  type: "related";
  heading: string;
  items: RelatedItem[];
}

export interface RelatedItem {
  href: string;
  label: string;
}