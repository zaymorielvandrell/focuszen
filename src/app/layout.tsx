import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "~/styles/globals.css";

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"]
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: {
    default: "FocusZen",
    template: "%s | FocusZen"
  },
  description: "..."
};

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
