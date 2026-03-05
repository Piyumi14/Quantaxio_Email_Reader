'use client';

import { useMemo, useState } from 'react';

const samples = [
  {
    label: 'Sample 1',
    text: `Hello Team,\n\nI want to book a table.\nBooking Date: 2026-03-15\nBooking Time: 7:30 PM\nLocation: Downtown Hall\nName: Jane Doe\nEmail: jane.doe@example.com\nPhone: +1 (415) 555-0198\n\nThanks!`,
  },
  {
    label: 'Sample 2',
    text: `Hi, this is Michael Rivera.\nPlease schedule my booking on April 2, 2026 at 18:00 in Brooklyn Center.\nYou can reach me at michael.rivera@site.org.`,
  },
  {
    label: 'Sample 3',
    text: `Need a booking\nDate 05/21/2026\nTime 9am\nCustomer: Priya Singh\nContact: priya.singh@mail.com\nPhone: 212-555-0199\nVenue: Midtown Studio`,
  },
];

const FIELD_NAMES = [
  'bookingDate',
  'bookingTime',
  'bookingLocation',
  'customerName',
  'customerEmail',
  'customerPhone',
];

function matchRegex(text, patterns) {
  for (const regex of patterns) {
    const match = text.match(regex);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  return null;
}

function extractBookingData(input) {
  const text = input || '';

  const bookingDate = matchRegex(text, [
    /booking\s*date\s*[:\-]\s*([^\n]+)/i,
    /\bdate\s*[:\-]\s*([^\n]+)/i,
    /on\s+([A-Za-z]+\s+\d{1,2},\s*\d{4})/i,
    /\b(\d{4}-\d{2}-\d{2})\b/,
    /\b(\d{2}\/\d{2}\/\d{4})\b/,
  ]);

  const bookingTime = matchRegex(text, [
    /booking\s*time\s*[:\-]\s*([^\n]+)/i,
    /\btime\s*[:\-]\s*([^\n]+)/i,
    /at\s+(\d{1,2}:\d{2}\s?(?:AM|PM|am|pm)?)/,
    /\b(\d{1,2}\s?(?:AM|PM|am|pm))\b/,
  ]);

  const bookingLocation = matchRegex(text, [
    /booking\s*location\s*[:\-]\s*([^\n]+)/i,
    /\blocation\s*[:\-]\s*([^\n]+)/i,
    /\bvenue\s*[:\-]\s*([^\n]+)/i,
    /in\s+([A-Za-z0-9\s'-]{3,})/i,
  ]);

  const customerName = matchRegex(text, [
    /customer\s*name\s*[:\-]\s*([^\n]+)/i,
    /\bname\s*[:\-]\s*([^\n]+)/i,
    /this is\s+([A-Za-z][A-Za-z\s'.-]{1,})/i,
    /customer\s*[:\-]\s*([^\n]+)/i,
  ]);

  const customerEmail = matchRegex(text, [
    /email\s*[:\-]\s*([^\s\n]+)/i,
    /\b([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})\b/i,
  ]);

  const customerPhone = matchRegex(text, [
    /phone\s*[:\-]\s*([^\n]+)/i,
    /contact\s*[:\-]\s*([^\n]+)/i,
    /(\+?\d[\d\s().-]{7,}\d)/,
  ]);

  const extracted = {
    bookingDate,
    bookingTime,
    bookingLocation,
    customerName,
    customerEmail,
    customerPhone,
  };

  const issues = FIELD_NAMES.filter((field) => !extracted[field]).map(
    (field) => `Missing ${field}`
  );

  return { ...extracted, issues };
}

export default function HomePage() {
  const [input, setInput] = useState('');
  const [submittedText, setSubmittedText] = useState('');

  const extracted = useMemo(() => extractBookingData(submittedText), [submittedText]);

  return (
    <main className="container">
      <h1>Email Booking Extractor</h1>
      <section className="layout">
        <div className="column card">
          <h2>Input</h2>
          <div className="sampleRow">
            {samples.map((sample) => (
              <button
                key={sample.label}
                type="button"
                onClick={() => setInput(sample.text)}
                className="sampleButton"
              >
                {sample.label}
              </button>
            ))}
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste email text here..."
            className="input"
          />
          <button type="button" onClick={() => setSubmittedText(input)} className="submitButton">
            Submit
          </button>
        </div>

        <div className="column card">
          <h2>Extracted JSON</h2>
          <pre className="output">{JSON.stringify(extracted, null, 2)}</pre>
        </div>
      </section>
    </main>
  );
}
