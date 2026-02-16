import sharedConfig from "tailwind-config"
import type { Config } from "tailwindcss"

const config: Pick<Config, "prefix" | "presets" | "content" | "plugins"> = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/*.{js,ts,jsx,tsx}",
    "./node_modules/rizzui/dist/*.{js,ts,jsx,tsx}",
    "../../packages/isomorphic-core/src/**/*.{js,ts,jsx,tsx}",
    "node_modules/@shakibdshy/tailwind-theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [sharedConfig],
}

export default config
