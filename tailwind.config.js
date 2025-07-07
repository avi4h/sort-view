/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'sora': ['Sora', 'sans-serif'],
                'sans': ['Sora', 'sans-serif'], 
            },
            colors: {
                'custom-bg': '#0D1117',
                'custom-teal': '#2DD4BF',
            },
        },
    },
};