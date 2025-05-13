import { defineConfig } from "astro/config";

import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import swup from "@swup/astro";

import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { remarkTOC } from "./src/plugins/remark-toc.mjs";
import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs";
import remarkMath from "remark-math";

import YukinaConfig from "./yukina.config";

import pagefind from "astro-pagefind";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: YukinaConfig.site,
  integrations: [tailwind(), svelte(), icon(), swup({
    theme: false,
    containers: ["main", "footer", ".banner-inner"],
    smoothScrolling: true,
    progress: true,
    cache: true,
    preload: true,
    updateHead: true,
    updateBodyClass: false,
    globalInstance: true,
  }), sitemap(), pagefind(), mdx()],
  build: {
    format: 'directory',
  },
  vite: {
    plugins: [
      // カスタムプラグインの追加（必要に応じて）
    ],
  },
 
  markdown: {
    shikiConfig: {
      theme: "github-dark-default",
    },
    remarkPlugins: [remarkReadingTime, remarkMath, remarkTOC],
    rehypePlugins: [
      rehypeSlug,
      rehypeKatex,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "prepend",
        },
      ],
    ],
  },
});