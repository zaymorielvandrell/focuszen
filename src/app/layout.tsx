import { ChartNoAxesColumnIcon, SettingsIcon, TimerIcon } from "lucide-react";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import "~/styles/globals.css";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"]
});

const mono = JetBrains_Mono({
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

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${sans.variable} ${mono.variable}`}>
      <body>
        <div className="container mx-auto max-w-3xl px-4">
          <header>
            <nav className="navbar">
              <div className="navbar-start">
                <Link href="/" className="text-xl font-semibold">
                  FocusZen
                </Link>
              </div>
              <div className="navbar-end gap-2">
                <Link href="/" className="btn btn-sm">
                  <TimerIcon />
                  Timer
                  <kbd className="kbd kbd-sm">1</kbd>
                </Link>
                <Link href="/stats" className="btn btn-sm">
                  <ChartNoAxesColumnIcon />
                  Stats
                  <kbd className="kbd kbd-sm">2</kbd>
                </Link>
                <Link href="/settings" className="btn btn-sm">
                  <SettingsIcon />
                  Settings
                  <kbd className="kbd kbd-sm">3</kbd>
                </Link>
              </div>
            </nav>
          </header>
          <main className="py-16">{children}</main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
