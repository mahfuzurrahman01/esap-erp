import { Metadata } from "next"

import logoIconImg from "@public/logo.svg"
import logoImg from "@public/logo-primary.svg"
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types"

import { LAYOUT_OPTIONS } from "@/config/enums"

enum MODE {
  DARK = "dark",
  LIGHT = "light",
}

export const siteConfig = {
  title: "ESAP ERP - Enterprise Resource Planning Solution",
  description: `ESAP ERP is a comprehensive Enterprise Resource Planning solution designed to streamline your business processes. Our powerful and flexible platform integrates various modules including Financial Management, Human Resources, and more to enhance productivity and decision-making across your organization.`,
  logo: logoImg,
  icon: logoIconImg,
  mode: MODE.LIGHT,
  layout: LAYOUT_OPTIONS.HYDROGEN,
  apiUrl: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
  // TODO: Update favicon
}

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title} - ESAP ERP` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - ESAP ERP` : title,
      description,
      url: "https://new-esap-v2.vercel.app/login", // Update this to your actual domain
      siteName: "ESAP ERP",
      images: {
        url: "https://static.wixstatic.com/media/630bc7_227cd36b4467495a98a17dfb678a6124~mv2.png/v1/fill/w_248,h_101,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Artboard%201.png", // Update this to your actual OG image URL
        width: 1200,
        height: 630,
      },
      locale: "en_US",
      type: "website",
    },
  }
}
