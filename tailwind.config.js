import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    mode: "jit",
    darkMode: 'class', // or 'media' or 'class'
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.jsx",
    ],
    theme: {
        fontFamily: {
            sans: ['Figtree', ...defaultTheme.fontFamily.sans],
        },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
