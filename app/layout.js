"use client";

import "./globals.css";
import Script from "next/script";
import Cursor from "../components/Cursor";
import ClientProviders from "../components/ClientProviders";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Praisejah's Portfolio - Software Engineer"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=striper@400&f[]=chillax@400&f[]=stardom@400&f[]=space-grotesk@300,400&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Gaegu&family=Gotu&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Syne:wght@400..800&display=swap"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <title>Praisejah | Portfolio</title>
      </head>
      <body>
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "uwnn31jdup");
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JNF9DR132N"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JNF9DR132N');
          `}
        </Script>
        <ClientProviders>
          <Cursor />
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
