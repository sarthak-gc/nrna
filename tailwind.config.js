/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.{js,jsx}",
        "./resources/**/*.vue",
    ],
    theme: {
        extend: {
            fontFamily: {
                primary: ["Lato", "sans-serif"],
            },
            spacing: {
                "half-screen": "50vh",
            },
        },
    },
    plugins: [],
};
