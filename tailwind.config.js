/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                darkBlue: 'var(--dark-blue)',
                primaryCus: 'rgba(31.5, 10.5, 10.5, 1)',
            },
            maxWidth: {
                page: 'var(--max-width-page)',
            },
            boxShadow: {
                cardMovie: '0 2px 8px rgba(0, 0, 0, 0.1)',
                button: '0px 3px 6px rgba(0, 0, 0, 0.3)',
            },
            borderRadius: {
                image: 'var(--radius-image)',
            },
        },
    },
    plugins: [require('@tailwindcss/line-clamp')],
};
