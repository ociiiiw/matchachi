import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MatchaChi — Matcha Brewer',
  description: 'Premium matcha drinks crafted with love.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
