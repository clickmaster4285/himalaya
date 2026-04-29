export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim(); // Remove leading/trailing spaces
}

export function createEventSlug(title: string): string {
  // Create a shorter, more URL-friendly slug (3-4 words max)
  const words = title.toLowerCase().split(' ');
  const importantWords = words.filter(word => 
    word.length > 2 && 
    !['&', 'the', 'and', 'for', 'with', 'in', 'on', 'at'].includes(word)
  );
  
  // Take first 3-4 important words
  const slugWords = importantWords.slice(0, 4);
  return slugWords.join('-');
}
