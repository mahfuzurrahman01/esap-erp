"use client"

import { useIsMounted } from "@core/hooks/use-is-mounted"

import BerylLiumLayout from "@/layouts/beryllium/beryllium-layout"

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isMounted = useIsMounted()

  if (!isMounted) {
    return null
  }

  return <BerylLiumLayout>{children}</BerylLiumLayout>
}
