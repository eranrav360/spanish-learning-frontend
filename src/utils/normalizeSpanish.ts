/**
 * Normalizes Spanish text by removing accents and special characters
 * This allows accent-insensitive comparison for answer validation
 */
export function normalizeSpanish(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD') // Decompose characters into base + diacritics
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/ñ/g, 'n') // Replace ñ with n
    .replace(/ü/g, 'u') // Replace ü with u
    .trim();
}

/**
 * Compares two Spanish texts ignoring accents and case
 */
export function compareSpanishText(text1: string, text2: string): boolean {
  return normalizeSpanish(text1) === normalizeSpanish(text2);
}
