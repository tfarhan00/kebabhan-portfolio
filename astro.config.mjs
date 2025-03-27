// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel/serverless";

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
  adapter: vercel({
    isr: {
      expiration: 60 * 60,
    },
  }),
});
