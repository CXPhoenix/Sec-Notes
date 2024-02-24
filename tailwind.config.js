/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./docs/.vitepress/theme/Components/**/*.{vue,js,jsx,md,html}"],
    theme: {
        extend: {},
    },
    plugins: ["daisyui"],
};
