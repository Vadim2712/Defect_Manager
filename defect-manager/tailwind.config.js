/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                brand: {
                    dark: '#232323',
                    medium: '#2f2f2f',
                    accent: '#f57c00',
                    light: '#f5f5f5'
                }
            }
        }
    },
    plugins: [],
}
