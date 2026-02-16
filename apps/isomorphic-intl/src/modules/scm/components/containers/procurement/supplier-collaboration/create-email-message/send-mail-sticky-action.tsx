"use client"

import Link from "next/link"

import cn from "@core/utils/class-names"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import SendIcon from "@/components/icons/send-icon"

type Props = {
  className?: string

  isLoading?: boolean
  backToListPath?: string
}

const SendMailStickyActions = ({
  className,
  isLoading = false,
  backToListPath = routes.scm.procurement.supplierCollaboration.supplierCollaboration,
}: Props) => {
  const t = useTranslations("form")

  return (
    <div
      className={cn(
        "divider-color box-border flex h-[76px] w-auto justify-end gap-2 rounded-b-2xl border-t border-dashed bg-gray-0 px-5 py-6 dark:bg-gray-800",
        className
      )}>
      <div className="flex gap-2">
        <Link href={backToListPath}>
          <Button type="button" className="h-9 w-auto" variant="outline">
            {t("form-cancel")}
          </Button>
        </Link>
        <Button
          type="submit"
          isLoading={isLoading}
          className="flex items-center gap-2 px-3">
          {t("form-send")}
          {/* <SendIcon className="h-6 w-6" /> */}
        </Button>
      </div>
    </div>
  )
}

export default SendMailStickyActions
