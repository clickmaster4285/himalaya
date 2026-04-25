export default function Head() {
  const title = "Book Luxury Villa Stay in Bhurban | Himalaya Villas & Resorts";
  const description =
    "Reserve your luxury villa stay in Bhurban Murree with secure booking, date selection, guest details, and premium private accommodation options.";
  const url = "https://himalayavillas.com/book/stay";
  const image = "https://himalayavillas.com/assets/gallery-exterior.jpg";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
}
