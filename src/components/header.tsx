"use client";

import { ChartNoAxesColumnIcon, SettingsIcon, TimerIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Header = () => {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
        return;
      }

      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement ||
        (event.target instanceof HTMLElement && event.target.isContentEditable)
      ) {
        return;
      }

      if (event.key === "1") {
        router.push("/");
      }

      if (event.key === "2") {
        router.push("/stats");
      }

      if (event.key === "3") {
        router.push("/settings");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [router]);

  return (
    <header>
      <nav className="navbar flex-col gap-4 sm:flex-row">
        <div className="navbar-start justify-center sm:justify-start">
          <Link href="/" className="text-xl font-semibold">
            FocusZen
          </Link>
        </div>
        <div className="navbar-end justify-center gap-2 sm:justify-start">
          <Link href="/" className="btn btn-sm">
            <TimerIcon />
            <span className="hidden sm:inline-block">Timer</span>
            <kbd className="kbd hidden kbd-sm sm:inline-flex">1</kbd>
          </Link>
          <Link href="/stats" className="btn btn-sm">
            <ChartNoAxesColumnIcon />
            <span className="hidden sm:inline-block">Stats</span>
            <kbd className="kbd hidden kbd-sm sm:inline-flex">2</kbd>
          </Link>
          <Link href="/settings" className="btn btn-sm">
            <SettingsIcon />
            <span className="hidden sm:inline-block">Settings</span>
            <kbd className="kbd hidden kbd-sm sm:inline-flex">3</kbd>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
