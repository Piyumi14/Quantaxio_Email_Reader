export const FIELD_NAMES = [
  'bookingDate',
  'bookingTime',
  'bookingLocation',
  'customerName',
  'customerEmail',
  'customerPhone',
];

export const PATTERNS = {
  bookingDate: [
    /booking\s*date\s*[:\-]\s*([^\n]+)/i,
    /\bdate\s*[:\-]\s*([^\n]+)/i,
    /on\s+([A-Za-z]+\s+\d{1,2},\s*\d{4})/i,
    /\b(\d{4}-\d{2}-\d{2})\b/,
    /\b(\d{2}\/\d{2}\/\d{4})\b/,
  ],
  bookingTime: [
    /booking\s*time\s*[:\-]\s*([^\n]+)/i,
    /\btime\s*[:\-]\s*([^\n]+)/i,
    /at\s+(\d{1,2}:\d{2}\s?(?:AM|PM|am|pm)?)/,
    /\b(\d{1,2}\s?(?:AM|PM|am|pm))\b/,
  ],
  bookingLocation: [
    /booking\s*location\s*[:\-]\s*([^\n]+)/i,
    /\blocation\s*[:\-]\s*([^\n]+)/i,
    /\bvenue\s*[:\-]\s*([^\n]+)/i,
    /in\s+([A-Za-z0-9\s'-]{3,})/i,
  ],
  customerName: [
    /customer\s*name\s*[:\-]\s*([^\n]+)/i,
    /\bname\s*[:\-]\s*([^\n]+)/i,
    /this is\s+([A-Za-z][A-Za-z\s'.-]{1,})/i,
    /customer\s*[:\-]\s*([^\n]+)/i,
  ],
  customerEmail: [
    /email\s*[:\-]\s*([^\s\n]+)/i,
    /\b([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})\b/i,
  ],
  customerPhone: [
    /phone\s*[:\-]\s*([^\n]+)/i,
    /contact\s*[:\-]\s*([^\n]+)/i,
    /(\+?\d[\d\s().-]{7,}\d)/,
  ],
};
