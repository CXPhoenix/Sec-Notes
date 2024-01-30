import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Cyber Security Notes",
  description:
    "CXPh03n1x's cyber security notes about CTF, wargames, and more.",
  themeConfig: {
    logo: "Sec-Notes-logo-circle.png",
    nav: [{ text: "Home", link: "/" }],

    socialLinks: [
      { icon: "github", link: "https://github.com/CXPhoenix/sec-notes" },
    ],
  },
});
