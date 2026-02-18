"use client"

import Link from "next/link"

import MenuPopover from "@/components/base/menu-popover"
import { cn } from "@/utils/cn"
import { useTranslations } from "next-intl"
import { routes } from "@/config/routes"
import FmsNavbarIcon from "@/components/icons/fms-navbar"
import { CRMIcon } from "@/components/icons/crm/crm"
import { HRuserIcon } from "@/components/icons/hrms/hrms-user"

type DocumentsNavigatorProps = {
  className?: string
  icon?: React.ReactNode
  label?: string
  onClick?: () => void
}

export default function DocumentsNavigator({
  className,
}: DocumentsNavigatorProps) {
  const t = useTranslations("common")

  return (
    <div className={cn(className)}>
      <MenuPopover>
        <Link
          href={"#"}
          aria-label="HR Documents"
          className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
          <HRuserIcon className="h-4 w-4" />
          <span className="text-sm text-title font-semibold">{t("text-documents-hr")}</span>
        </Link>
        <Link
          href={routes.fms.documents}
          aria-label="FMS Documents"
          className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
          <FmsNavbarIcon className="h-4 w-4" />
          <span className="text-sm text-title font-semibold">{t("text-documents-fms")}</span>
        </Link>
        <Link
          href={routes.crm.documentation}
          aria-label="CRM Documents"
          className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
          <CRMIcon className="h-4 w-4" />
          <span className="text-sm text-title font-semibold">{t("text-documents-crm")}</span>
        </Link>
      </MenuPopover>
    </div>
  )
}
