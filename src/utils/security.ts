/**
 * Utility functions for input sanitization, security protection,
 * and safe string handling for CC-Market.
 */

/**
 * Sanitizes user input text by escaping HTML entity characters
 * to prevent Cross-Site Scripting (XSS).
 */
export function sanitizeInput(input: string, maxLength: number = 500): string {
  if (!input) return '';
  
  // Truncate to maximum allowed length to prevent memory buffer overload
  const truncated = input.slice(0, maxLength);
  
  // Replace hazardous HTML entities
  return truncated
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validates whether an email address matches standard RFC 5322 syntax.
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

/**
 * Clean plain text for safe speech synthesis without script or markup injection.
 */
export function sanitizeForSpeech(text: string): string {
  if (!text) return '';
  return text.replace(/<[^>]*>?/gm, '').replace(/[^\w\s\u00C0-\u024F.,-]/gi, '');
}
