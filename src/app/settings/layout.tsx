import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Settings"
};

const SettingsLayout = ({ children }: PropsWithChildren) => {
  return children;
};

export default SettingsLayout;
