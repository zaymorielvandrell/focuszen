import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono, Public_Sans } from "next/font/google";
import type { PropsWithChildren } from "react";
import Header from "~/components/header";
import "~/styles/globals.css";

const sans = Public_Sans({ variable: "--font-sans", subsets: ["latin"] });
const serif = Fraunces({ variable: "--font-serif", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://focuszen.zaymoriel.com"),
  title: { default: "FocusZen", template: "%s | FocusZen" },
  description: "A minimal Pomodoro timer for focused work and mindful breaks.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon-16x16.png" },
      { url: "/favicon-32x32.png" },
      { url: "/favicon.ico" }
    ],
    apple: "/apple-touch-icon.png"
  },
  openGraph: {
    images: [{ url: "/opengraph-image.png", alt: "FocusZen" }],
    url: "https://focuszen.zaymoriel.com",
    type: "website"
  },
  twitter: { card: "summary_large_image", creator: "@zaymoriel" }
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        <div className="container mx-auto max-w-3xl px-4">
          <Header />
          <main className="py-16">{children}</main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
