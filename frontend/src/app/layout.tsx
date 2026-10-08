import type { Metadata } from 'next';
import './globals.css';

const description = [
  'Find a place on campus, see what is inside,',
  'and follow a clear walking route.',
].join(' ');
const siteUrl = process.env.SITE_URL;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: 'CNS | Find your way around campus',
  description,
  openGraph: {
    title: 'CNS | Find your way around campus',
    description,
    type: 'website',
    ...(siteUrl ? { images: ['/images/og-image.svg'] } : {}),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CNS | Find your way around campus',
    description,
  },
  icons: {icon: '/images/logo.svg',},
};

export default function RootLayout({children,}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
