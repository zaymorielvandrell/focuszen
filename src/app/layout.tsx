import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import type { PropsWithChildren } from "react";
import Header from "~/components/header";
import "~/styles/globals.css";

const sans = Inter({ variable: "--font-sans", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "FocusZen", template: "%s | FocusZen" },
  description: "..."
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${sans.variable} ${mono.variable}`}>
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
