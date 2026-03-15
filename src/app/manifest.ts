import type { MetadataRoute } from "next";

const manifest = (): MetadataRoute.Manifest => {
  return {
    name: "FocusZen",
    short_name: "FZ",
    description:
      "A minimal Pomodoro timer for focused work and mindful breaks.",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        type: "image/png",
        sizes: "192x192"
      },
      {
        src: "/android-chrome-512x512.png",
        type: "image/png",
        sizes: "512x512"
      }
    ],
    id: "/",
    start_url: "/",
    theme_color: "#ffffff",
    background_color: "#ffffff",
    orientation: "portrait",
    display: "standalone"
  };
};

export default manifest;
