"use client";

import { SettingsIcon, TimerIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { isEditableElement } from "~/utils/dom";

const NAV_ITEMS = [
  { href: "/", icon: TimerIcon, label: "Timer", shortcut: "1" },
  {
    href: "/settings",
    icon: SettingsIcon,
    label: "Settings",
    shortcut: "2"
  }
] as const;

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
        return;
      }

      if (isEditableElement(event.target)) {
        return;
      }

      const targetItem = NAV_ITEMS.find((item) => item.shortcut === event.key);

      if (targetItem) {
        router.push(targetItem.href);
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
          {NAV_ITEMS.map(({ href, icon: Icon, label, shortcut }) => (
            <Link
              key={href}
              href={href}
              className={`btn btn-sm ${pathname === href ? "btn-active" : ""}`}>
              <Icon />
              <span className="hidden sm:inline-block">{label}</span>
              <kbd className="kbd hidden kbd-sm sm:inline-flex">{shortcut}</kbd>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
