/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./docs/**/*.{md,html}",
        "./docs/.vitepress/Theme/Components/**/*.{vue,js,jsx,md,html}",
        "./docs/.vitepress/Theme/ExtendLayouts.vue",
    ],
    theme: {
        extend: {},
    },
    plugins: ["daisyui"],
};
