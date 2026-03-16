import type { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: "https://focuszen.zaymoriel.com/sitemap.xml"
  };
};

export default robots;
