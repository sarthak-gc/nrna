/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.{js,jsx}",
        "./resources/**/*.vue",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#1e40af",
            },
            fontFamily: {
                primary: ["Lato", "sans-serif"],
            },
            spacing: {
                "half-screen": "50vh",
                "5vw": "5vw",
                "10vw": "10vw",
            },
        },
    },
    plugins: [],
};
