import './globals.css';

export const metadata = {
  title: 'Email Extractor',
  description: 'Extract booking details from free-form text',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
