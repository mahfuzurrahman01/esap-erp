"use client"

import { PiArrowLineDownBold } from "react-icons/pi"
import { Button } from "rizzui"

import { useModal } from "@/components/base/modal-views/use-modal"

type ExportButtonProps = {
  modalView: React.ReactNode
}

export default function UploadButton({ modalView }: ExportButtonProps) {
  const { openModal } = useModal()
  return (
    <Button
      className="mt-4 w-full @lg:mt-0 @lg:w-auto"
      onClick={() =>
        openModal({
          view: modalView,
        })
      }>
      <PiArrowLineDownBold className="me-1.5 h-[17px] w-[17px]" />
      Upload
    </Button>
  )
}
