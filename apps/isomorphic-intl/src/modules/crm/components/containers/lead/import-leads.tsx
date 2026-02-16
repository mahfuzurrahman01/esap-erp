"use client"

import dynamic from "next/dynamic"

import cn from "@core/utils/class-names"
import { useTranslations } from "next-intl"
import { PiArrowLineUpBold } from "react-icons/pi"

import { useModal } from "@/components/base/modal-views/use-modal"
import { useImportLead } from "@/modules/crm/hooks/use-leads"
import { Button } from "@/components/ui"

const FileUpload = dynamic(() => import("./file-upload"), {
  ssr: false,
})

type ImportButtonProps = {
  title?: string
  modalBtnLabel?: string
  className?: string
  buttonLabel?: string
}

export default function ImporLeads({
  title,
  className,
  buttonLabel = "Import",
}: React.PropsWithChildren<ImportButtonProps>) {
  const { openModal } = useModal()
  const importLead = useImportLead()
  const t = useTranslations("common")
  const handleFileUpload =  async (files: File[]) => {
    await importLead.mutateAsync({File : files[0]})
  }

  return (
    <Button
      onClick={() =>
        openModal({
          view: (
            <FileUpload
              label={t(title)}
              accept="csv"
              multiple={false}
              onUpload={handleFileUpload}
              btnLabel={buttonLabel}
              className="col-span-full w-full @2xl:p-0"
            />
          ),
          customSize: "480px",
        })
      }
      className={cn("w-full @lg:w-auto", className)}
      variant="outline"
      color="black">
      <PiArrowLineUpBold className="me-1.5 h-[17px] w-[17px]" />
      {buttonLabel}
    </Button>
  )
}
