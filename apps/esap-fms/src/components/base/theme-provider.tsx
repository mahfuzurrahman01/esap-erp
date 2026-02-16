"use client"

import hideRechartsConsoleError from "@core/utils/recharts-console-error"
import { Provider } from "jotai"
import { ThemeProvider as NextThemeProvider } from "next-themes"

import { siteConfig } from "@/config/site.config"

hideRechartsConsoleError()

export function ThemeProvider({ children }: React.PropsWithChildren<{}>) {
  return (
    <NextThemeProvider
      enableSystem={false}
      defaultTheme={String(siteConfig.mode)}>
      {children}
    </NextThemeProvider>
  )
}

export function JotaiProvider({ children }: React.PropsWithChildren<{}>) {
  return <Provider>{children}</Provider>
}
