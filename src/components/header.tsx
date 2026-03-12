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
  );
};

export default Header;
