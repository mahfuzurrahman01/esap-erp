"use client"

import dynamic from "next/dynamic"

import cn from "@core/utils/class-names"
import { useTranslations } from "next-intl"
import { PiArrowLineUpBold } from "react-icons/pi"
import { Button } from "rizzui"

import { useModal } from "@/components/base/modal-views/use-modal"

const FileUpload = dynamic(() => import("@/components/base/file-upload"), {
  ssr: false,
})

type ImportButtonProps = {
  title?: string
  modalBtnLabel?: string
  className?: string
  buttonLabel?: string
}

export default function ImportButton({
  title,
  modalBtnLabel = "Import File",
  className,
  buttonLabel = "Import",
}: React.PropsWithChildren<ImportButtonProps>) {
  const { openModal } = useModal()
  const t = useTranslations("common")

  return (
    <Button
      onClick={() =>
        openModal({
          view: (
            <FileUpload
              label={t(title)}
              accept="csv"
              multiple={false}
              btnLabel={modalBtnLabel}
              onUpload={(files) => {
                const file = files[0]
                const reader = new FileReader()
                reader.onload = (e) => {
                  const csv = e.target?.result
                  console.log(csv)
                }
                reader.readAsText(file)
              }}
            />
          ),
          customSize: "480px",
        })
      }
      className={cn("w-full @lg:w-auto", className)}>
      <PiArrowLineUpBold className="me-1.5 h-[17px] w-[17px]" />
      {buttonLabel}
    </Button>
  )
}
