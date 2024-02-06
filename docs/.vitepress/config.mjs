import { defineConfig } from "vitepress";
import path from "path";
import gen_top_nav from "./Utils/top_nav_gen.js";
import gen_sidebar from "./Utils/sidebar_gen.js";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Cyber Security Notes",
  description:
    "CXPh03n1x's cyber security notes about CTF, wargames, and more.",
  themeConfig: {
    logo: "/Sec-Notes-logo-circle.png",
    nav: [{ text: "Home", link: "/" }, ...gen_top_nav()],
    socialLinks: [
      { icon: "github", link: "https://github.com/CXPhoenix/sec-notes" },
    ],
    sidebar: gen_sidebar(),
    search: {
      provider: "local",
    },
  },
  lastUpdated: true,
  vite: {
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "./Theme/Components"),
        "@style": path.resolve(__dirname, "./Theme/tailwindcss.css"),
      },
    },
  },
});
