// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  image: {
    domains: ["kebabhan.dev"],
  },
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
