"use client"

import Link from "next/link"

import { useTranslations } from "next-intl"

import { Button } from "@/components/ui"
import { ButtonProps } from "@/components/ui/button"

export default function TranslatableButton({
  title,
  href,
  icon,
  ...props
}: {
  title?: string
  href?: string
  icon?: React.ReactNode
  variant?: ButtonProps["variant"]
}) {
  const t = useTranslations("common")

  return (
    <Link href={href!} className="w-full @lg:w-auto">
      <Button as="span" {...props}>
        {icon}
        {title && t(title)}
      </Button>
    </Link>
  )
}
