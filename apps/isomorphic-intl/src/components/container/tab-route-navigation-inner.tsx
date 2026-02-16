"use client"

import { usePathname } from "next/navigation"

import { useScrollableSlider } from "@core/hooks/use-scrollable-slider"
import cn from "@core/utils/class-names"
import { useTranslations } from "next-intl"
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi"
import { Button, Text } from "rizzui"

import { LAYOUT_OPTIONS } from "@/config/enums"
import { Link } from "@/i18n/routing"
import { useBerylliumSidebars } from "@/layouts/beryllium/beryllium-utils"
import { useLayout } from "@/layouts/use-layout"

type Props = {
  menuItems: {
    label: string
    value: string
  }[]
  translationObjectName: string
  containerClassName?: string
}

const TabRouteNavigationInner = ({
  menuItems,
  translationObjectName,
  containerClassName = "",
}: Props) => {
  const pathname = usePathname()
  const { layout } = useLayout()
  const {
    sliderEl,
    sliderPrevBtn,
    sliderNextBtn,
    scrollToTheRight,
    scrollToTheLeft,
  } = useScrollableSlider()
  const { expandedLeft } = useBerylliumSidebars()
  const t = useTranslations(translationObjectName)

  const pathnameWithoutLang = pathname.replace(/^\/[^/]+/, "")

  return (
    <div
      className={cn(
        "sticky z-20 rounded-tl-2xl rounded-tr-2xl border-b border-gray-500/10 bg-gray-0 px-4 py-0 font-medium text-gray-500 dark:bg-gray-800 md:px-5 lg:mt-0 lg:px-8 xl:px-6 2xl:top-[92px] 3xl:px-[33px] 4xl:px-10",
        containerClassName,
        layout === LAYOUT_OPTIONS.LITHIUM
          ? "top-[66px] sm:top-[70px] md:top-[73px]"
          : layout === LAYOUT_OPTIONS.BERYLLIUM
            ? "top-[62px] sm:top-[72px] 2xl:top-[72px]"
            : "top-[62px] md:top-[71px]",
        layout === LAYOUT_OPTIONS.BERYLLIUM &&
          expandedLeft &&
          "xl:-ms-1 xl:px-0 3xl:-ms-2 3xl:ps-0 4xl:-ms-2"
      )}>
      <div className="relative flex items-center overflow-hidden">
        <Button
          title="Prev"
          variant="text"
          ref={sliderPrevBtn}
          onClick={() => scrollToTheLeft()}
          className="!absolute left-0 top-0.5 z-10 !h-[calc(100%-4px)] w-8 !justify-start bg-gradient-to-r from-white via-white to-transparent px-0 text-gray-500 hover:text-black dark:from-gray-800 dark:via-gray-800 lg:hidden">
          <PiCaretLeftBold className="w-5" />
        </Button>
        <div className="flex h-[52px] items-start overflow-hidden">
          <div
            className="-mb-7 flex w-full gap-3 overflow-x-auto scroll-smooth pb-7 md:gap-5 lg:gap-8"
            ref={sliderEl}>
            {menuItems.map((menu, index) => (
              <Link
                href={`${menu.value}`}
                key={`menu-${index}`}
                className={cn(
                  "group relative cursor-pointer whitespace-nowrap py-2.5 font-medium text-gray-500 before:absolute before:bottom-0 before:left-0 before:z-[1] before:h-0.5 before:bg-primary before:transition-all hover:text-gray-900",
                  menu.value.toLowerCase() === pathnameWithoutLang
                    ? "text-primary before:visible before:w-full before:opacity-100"
                    : "before:invisible before:w-0 before:opacity-0"
                )}>
                <Text
                  as="span"
                  className="inline-flex rounded-md px-2.5 py-1.5 transition-all duration-200 group-hover:bg-gray-100/70">
                  {t(menu.label)}
                </Text>
              </Link>
            ))}
          </div>
        </div>
        <Button
          title="Next"
          variant="text"
          ref={sliderNextBtn}
          onClick={() => scrollToTheRight()}
          className="!absolute right-0 top-0.5 z-10 !h-[calc(100%-4px)] w-8 !justify-end bg-gradient-to-l from-white via-white to-transparent px-0 text-gray-500 hover:text-black dark:from-gray-800 dark:via-gray-800 lg:hidden">
          <PiCaretRightBold className="w-5" />
        </Button>
      </div>
    </div>
  )
}

export default TabRouteNavigationInner
