import Image from "next/image"
import React from "react"

import icChat from "@public/auth/ic-chat-active.svg"
import { useTranslations } from "next-intl"

export default function Preview() {
  const t = useTranslations("crm")
  return (
    <div className="flex flex-1 items-center justify-center text-gray-500">
      <div className="grid grid-cols-1 place-items-center text-center">
        <Image
          src={icChat}
          alt="Logo"
          width={160}
          height={160}
          priority
          className="object-center"
        />
        <p className="py-2">{t("text-good-day")}</p>
        <p>{t("text-select-a-contact-to-start-chatting")}</p>
      </div>
    </div>
  )
}
