import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MatchaChi — Soft Matcha Café',
  description: 'Premium ceremonial matcha drinks & treats, crafted with love.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
