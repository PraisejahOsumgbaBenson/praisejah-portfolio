"use client";

import "./globals.css";
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
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <title>Praisejah | Portfolio</title>
      </head>
      <body>
        <ClientProviders>
          <Cursor />
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
