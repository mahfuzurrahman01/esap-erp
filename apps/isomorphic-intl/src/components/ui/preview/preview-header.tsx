"use client"

import Logo from "@/components/icons/logo"

interface PreviewHeaderProps {
  title: string
  subtitle: string
}

export default function PreviewHeader({ title, subtitle }: PreviewHeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo className="w-[200px] dark:text-title" />
        </div>
        <div className="-mt-1.5 flex flex-col items-end gap-3">
          <h4 className="text-base font-medium @xl:text-xl @2xl:text-2xl @2xl:font-bold">
            {title}
          </h4>
          <span className="text-base text-body">{subtitle}</span>
        </div>
      </div>
    </>
  )
}
