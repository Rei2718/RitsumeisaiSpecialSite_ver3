import { metadata } from './metadata';
import RootLayoutClient from './RootLayoutClient';
import Script from 'next/script';
import { SpeedInsights } from "@vercel/speed-insights/next"

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="manifest" href="/icons/site.webmanifest" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#81D8D0" />
        <meta name="msapplication-TileColor" content="#81D8D0" />
        <meta name="theme-color" content="#81D8D0" />

        {/* Google tag */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-0RR4PKH3HL"></Script>
        <Script id="google-analytics" dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-0RR4PKH3HL');
        `}} />
      </head>
      <body>
        <RootLayoutClient>
          {children}
          <SpeedInsights/>
        </RootLayoutClient>
      </body>
    </html>
  );
}
