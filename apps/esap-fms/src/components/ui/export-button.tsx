"use client"

import cn from "@core/utils/class-names"
import { exportToCSV } from "@core/utils/export-to-csv"
import { useTranslations } from "next-intl"
import { PiArrowLineDownBold } from "react-icons/pi"

import Button from "./button"

type ExportButtonProps = {
  data: unknown[]
  header: string
  fileName: string
  className?: string
}

export default function ExportButton({
  data,
  header,
  fileName,
  className,
}: ExportButtonProps) {
  const t = useTranslations("common")
  return (
    <Button
      onClick={() => exportToCSV(data, header, fileName)}
      className={cn("w-full @lg:w-auto", className)}
      variant="outline"
      color="black">
      <PiArrowLineDownBold className="me-1.5 h-[17px] w-[17px]" />
      {t("text-export")}
    </Button>
  )
}
