import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Settings",
  description: "Configure FocusZen timer durations, notifications, and sound.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/settings" }
};

const SettingsLayout = ({ children }: PropsWithChildren) => {
  return children;
};

export default SettingsLayout;
