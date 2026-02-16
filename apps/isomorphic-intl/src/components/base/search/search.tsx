"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { Modal } from "rizzui"

import SearchList from "./search-list"
import SearchTrigger from "./search-trigger"

export default function SearchWidget({
  className,
  placeholderClassName,
  icon,
}: {
  className?: string
  icon?: React.ReactNode
  placeholderClassName?: string
}) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const pathname = usePathname()
  useEffect(() => {
    setOpen(() => false)
    return () => setOpen(() => false)
  }, [pathname])

  return (
    <>
      <SearchTrigger
        icon={icon}
        className={className}
        onClick={() => setOpen(true)}
        placeholderClassName={placeholderClassName}
      />

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        overlayClassName="dark:bg-opacity-20 dark:bg-gray-700 dark:backdrop-blur-sm"
        containerClassName="dark:bg-gray-800/90 overflow-hidden dark:backdrop-blur-xl xl:max-w-[650px]"
        className="z-[9999]">
        <SearchList onClose={() => setOpen(false)} />
      </Modal>
    </>
  )
}
