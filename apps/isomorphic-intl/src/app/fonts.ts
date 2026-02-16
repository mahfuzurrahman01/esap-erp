import { Barlow, Public_Sans } from "next/font/google"

export const barlow = Barlow({
  subsets: ["latin"],
  variable: "--font-barlow",
  weight: ["400", "500", "600", "700", "800", "900"],
})

export const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
})
