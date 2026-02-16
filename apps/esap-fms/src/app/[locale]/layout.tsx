import NextProgress from "@core/components/next-progress"
import cn from "@core/utils/class-names"
import { ReactFlowProvider } from "@xyflow/react"
import { getServerSession } from "next-auth"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { Toaster } from "react-hot-toast"

import { barlow, publicSans } from "@/app/fonts"
import auth from "@/auth.ts"
import AuthProvider from "@/components/base/auth-provider"
import GlobalDrawer from "@/components/base/drawer-views/container"
import GlobalModal from "@/components/base/modal-views/container"
import { JotaiProvider, ThemeProvider } from "@/components/base/theme-provider"
import QueryProvider from "@/config/query-provider"
import { siteConfig } from "@/config/site.config"
import { dir } from "@/i18n/direction"

import "./globals.css"

// const NextProgress = dynamic(() => import("@core/components/next-progress"), {
//   ssr: false,
// })

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
}

export default async function RootLayout(props: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const params = await props.params

  const { locale } = params

  const { children } = props

  const session = await getServerSession(auth)
  const messages = await getMessages()

  return (
    <html lang={locale} dir={dir(locale)} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(
          barlow.variable,
          publicSans.variable,
          "font-public-sans"
        )}>
        <QueryProvider>
          <AuthProvider session={session}>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <ThemeProvider>
                <ReactFlowProvider>
                  <NextProgress />
                  <JotaiProvider>
                    <NuqsAdapter>{children}</NuqsAdapter>
                    <Toaster />
                    <GlobalDrawer />
                    <GlobalModal />
                  </JotaiProvider>
                </ReactFlowProvider>
              </ThemeProvider>
            </NextIntlClientProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
