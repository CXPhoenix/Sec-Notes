/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./docs/**/*.{md,html}",
        "./docs/.vitepress/theme/Components/**/*.{vue,js,jsx,md,html}",
    ],
    theme: {
        extend: {},
    },
    plugins: ["daisyui"],
};
