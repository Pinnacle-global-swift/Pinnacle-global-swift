import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      borderColor: {
        border: 'hsl(var(--border))', // Uses your defined CSS variable
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-inter)', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'inherit',
            a: {
              color: 'inherit',
              textDecoration: 'none',
              fontWeight: '500',
            },
            strong: {
              fontWeight: '700',
            },
            h1: {
              fontWeight: '700',
              fontFamily: 'var(--font-raleway)',
            },
            h2: {
              fontWeight: '600',
              fontFamily: 'var(--font-raleway)',
            },
            h3: {
              fontWeight: '600',
              fontFamily: 'var(--font-raleway)',
            },
            h4: {
              fontWeight: '600',
              fontFamily: 'var(--font-raleway)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
