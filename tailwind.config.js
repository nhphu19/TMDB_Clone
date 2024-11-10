/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                darkBlue: 'var(--dark-blue)',
            },
            width: {
                destop: 'var(--width-destop)',
            },
            boxShadow: {
                cardMovie: '0 2px 8px rgba(0, 0, 0, 0.1)',
            },
        },
    },
    plugins: [require('@tailwindcss/line-clamp')],
};
