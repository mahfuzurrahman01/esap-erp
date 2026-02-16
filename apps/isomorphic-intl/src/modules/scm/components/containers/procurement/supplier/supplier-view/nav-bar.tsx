"use client"

import SimpleBar from "@core/ui/simplebar"
import cn from "@core/utils/class-names"
import { Link } from "react-scroll"

export const navParts = {
  basicInformation: "basicInformation",
  complianceLegalInfo: "complianceLegalInfo",
  financialInfo: "financialInfo",
  contractInfo: "contractInfo",
  Invoice: "Invoice",
}

export const menuItems = [
  {
    label: "Compliance & Legal Information",
    value: navParts.complianceLegalInfo,
  },
  {
    label: "Banking Information",
    value: navParts.financialInfo,
  },
  {
    label: "Contract Information",
    value: navParts.contractInfo,
  },
  {
    label: "Invoice",
    value: navParts.Invoice,
  },
]

interface NavProps {
  className?: string
}

export default function NavBar({ className }: NavProps) {
  return (
    <div
      className={cn(
        "sticky top-[68px] z-20 border-b border-gray-500/20 bg-gray-0 py-0 pl-6 font-medium text-gray-500 @2xl:top-20 dark:border-gray-500/20 dark:bg-gray-800",
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
              className="relative cursor-pointer whitespace-nowrap py-4 hover:text-primary dark:hover:text-primary"
              activeClass="active before:absolute before:bg-primary before:bottom-0 before:left-0 before:z-[1] before:h-0.5 before:w-full before:bg-gray-1000 font-semibold text-primary dark:before:bg-primary dark:text-primary">
              {tab.label}
            </Link>
          ))}
        </div>
      </SimpleBar>
    </div>
  )
}
