# Email Booking Extractor (Next.js)

Single-page Next.js app with a 2-column layout:
- Left: textarea input, sample-fill buttons, and submit button
- Right: extracted JSON pretty print

Extraction runs in the browser using regex + simple rules.

## Extracted fields
- `bookingDate`
- `bookingTime`
- `bookingLocation`
- `customerName`
- `customerEmail`
- `customerPhone`

If a field is not found, it is returned as `null`, and `issues` includes a missing-field message.

## Run locally
```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Screenshots
Save UI screenshots in `docs/screenshots/` with these names:
- `example01.png`
- `example02.png`
- `example03.png`

GitHub will render them in this README automatically:

### Main UI
![Main UI](docs/screenshots/ui-main.png)

### Sample Loaded
![Sample Loaded](docs/screenshots/ui-sample-loaded.png)

### Extracted JSON Output
![Extracted JSON Output](docs/screenshots/ui-extracted-json.png)

## Notes
- This implementation is intentionally simple and rule-based.
- You can extend the regex list in `app/page.js` for more formats.
