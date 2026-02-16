"use client"

import SimpleBar from "@core/ui/simplebar"
import cn from "@core/utils/class-names"
import { useTranslations } from "next-intl"
import { Link } from "react-scroll"

export const formParts = {
  basicInformation: "basicInformation",
  complianceLegalInfo: "complianceLegalInfo",
  financialInfo: "financialInfo",
  contractInfo: "contractInfo",
}

interface FormNavProps {
  className?: string
}

export default function FormNav({ className }: FormNavProps) {
  const t = useTranslations("form")

  const menuItems = [
    {
      label: t("form-basic-information"),
      value: formParts.basicInformation,
    },
    {
      label: t("form-compliance-legal-information"),
      value: formParts.complianceLegalInfo,
    },
    {
      label: t("form-banking-information"),
      value: formParts.financialInfo,
    },
  ]

  return (
    <div
      className={cn(
        "sticky top-[72px] z-20 rounded-t-lg border-b border-gray-200 bg-white py-0 pl-6 font-medium text-gray-500 @2xl:top-[72px] dark:border-gray-600 dark:bg-gray-800 2xl:top-20",
        className
      )}>
      <SimpleBar>
        <div className="inline-grid grid-flow-col gap-5 md:gap-7 lg:gap-10">
          {menuItems.map((tab, idx) => (
            <Link
              key={tab.value}
              to={tab.value}
              spy={true}
              hashSpy={true}
              smooth={true}
              offset={idx === 0 ? -250 : -150}
              duration={500}
              className="relative cursor-pointer whitespace-nowrap py-4 hover:text-gray-1000 dark:hover:text-gray-300"
              activeClass="active before:absolute before:bottom-0 before:left-0 before:z-[1] before:h-0.5 before:w-full before:bg-gray-1000 font-semibold text-gray-1000 dark:before:bg-gray-0 dark:text-gray-0">
              {tab.label}
            </Link>
          ))}
        </div>
      </SimpleBar>
    </div>
  )
}
