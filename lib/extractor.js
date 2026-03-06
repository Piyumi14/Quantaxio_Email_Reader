import { FIELD_NAMES, PATTERNS } from './patterns';

function matchRegex(text, patterns) {
  for (const regex of patterns) {
    const match = text.match(regex);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  return null;
}

export function normalizeText(input) {
  return (input || '').replace(/\r\n?/g, '\n').replace(/[ \t]+/g, ' ').trim();
}

export function cleanPhone(value) {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  const hasPlus = trimmed.startsWith('+');
  const digits = trimmed.replace(/\D/g, '');

  if (digits.length < 8) {
    return null;
  }

  return `${hasPlus ? '+' : ''}${digits}`;
}

export function cleanEmail(value) {
  if (!value) {
    return null;
  }

  const cleaned = value
    .trim()
    .replace(/[),.;:!?]+$/g, '')
    .toLowerCase();

  return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(cleaned) ? cleaned : null;
}

export function extractBookingData(input) {
  const text = normalizeText(input);

  const extracted = {
    bookingDate: matchRegex(text, PATTERNS.bookingDate),
    bookingTime: matchRegex(text, PATTERNS.bookingTime),
    bookingLocation: matchRegex(text, PATTERNS.bookingLocation),
    customerName: matchRegex(text, PATTERNS.customerName),
    customerEmail: cleanEmail(matchRegex(text, PATTERNS.customerEmail)),
    customerPhone: cleanPhone(matchRegex(text, PATTERNS.customerPhone)),
  };

  const issues = FIELD_NAMES.filter((field) => !extracted[field]).map(
    (field) => `Missing ${field}`
  );

  return { ...extracted, issues };
}
