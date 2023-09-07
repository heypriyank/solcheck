/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            screens: {
                sm: "500px", // Small screens (default)
                md: "768px", // Medium screens (default)
                lg: "1024px", // Large screens (default)
                xl: "1280px", // Extra-large screens (default)
                "2xl": "1536px", // Custom breakpoint for 2xl screens
            },
            backgroundColor: {
                'input-grey': '#3B3B3B',
              },
        },
    },
    plugins: [],
};
