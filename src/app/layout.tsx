import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'Overtink - The Restless and Impatient',
  description: 'The blog of Eyal Shahar',
  authors: [{ name: 'Eyal Shahar', url: 'https://ey.al' }],
  openGraph: {
    type: 'website',
    siteName: 'Overtink',
    title: 'Overtink - The Restless and Impatient',
    description: 'The blog of Eyal Shahar',
    images: [
      {
        url: '/overtink-logo.svg',
        width: 500,
        height: 500,
        alt: 'Overtink Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Overtink - The Restless and Impatient',
    description: 'The blog of Eyal Shahar',
    images: ['/overtink-logo.svg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="text-base">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="canonical" href="https://overtink.com" />
        <meta name="robots" content="index, follow" />
      </head>
      <body className="font-jetbrains-mono text-slate-700 bg-white">
        <div className="min-h-screen">
          {children}
        </div>
        <Script
          data-goatcounter="https://eyalblog.goatcounter.com/count"
          src="https://gc.zgo.at/count.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}