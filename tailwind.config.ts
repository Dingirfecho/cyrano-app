// tailwind.config.ts

import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        background: "#0a0a0b",
        foreground: "#fafafa",
        card: "#141416",
        "card-border": "#27272a",
        primary: "#ef4444",
        secondary: "#3b82f6",
        muted: "#71717a",
      },
    },
  },
  plugins: [],
}

export default config
