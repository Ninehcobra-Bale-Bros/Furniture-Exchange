export const slugSerialize = (str: string): string => {
  return str
    .toLowerCase() // Convert to lowercase
    .normalize('NFD') // Normalize to NFD (decompose accents)
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^a-z0-9\-]/g, '') // Remove non-alphanumeric characters
    .replace(/\-{2,}/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
};

// export default slugSerialize;
