"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

import { Modal } from "rizzui"

import { useModal } from "@/components/base/modal-views/use-modal"

export default function GlobalModal() {
  const { isOpen, view, closeModal, customSize, size } = useModal()
  const pathname = usePathname()
  useEffect(() => {
    closeModal()
  }, [pathname])

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      customSize={customSize}
      size={size}
      overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
      containerClassName="dark:bg-gray-100"
      className="z-[9999] [&_.pointer-events-none]:overflow-visible">
      {view}
    </Modal>
  )
}
