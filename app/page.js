'use client';

import { useMemo, useState } from 'react';
import { extractBookingData } from '../lib/extractor';

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
