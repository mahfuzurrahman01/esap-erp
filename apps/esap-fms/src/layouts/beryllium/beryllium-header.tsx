"use client"

import cn from "@core/utils/class-names"
import { PiMagnifyingGlass } from "react-icons/pi"

import SearchWidget from "@/components/base/search/search"
import Logo from "@/components/icons/logo"
import { Link } from "@/i18n/routing"
import Sidebar from "@/layouts/beryllium/beryllium-sidebar-drawer"
import HamburgerButton from "@/layouts/hamburger-button"
import HeaderMenuRight from "@/layouts/header-menu-right"
import StickyHeader from "@/layouts/sticky-header"

export default function Header({ className }: { className?: string }) {
  return (
    <StickyHeader
      className={cn(
        "z-[990] justify-between bg-paper p-3 dark:bg-gray-900 xl:pe-8",
        className
      )}>
      <div className="hidden items-center gap-3 xl:flex">
        <Link
          aria-label="Site Logo"
          href={"/"}
          className="me-4 hidden w-[155px] shrink-0 text-title hover:text-gray-900 lg:me-5 xl:block">
          <Logo className="w-[155px] dark:text-title" />
        </Link>
      </div>

      <div className="flex w-full items-center justify-between gap-5 xl:w-[calc(100%_-_190px)] 2xl:w-[calc(100%_-_310px)] 3xl:gap-6">
        <div className="flex max-w-2xl items-center xl:w-auto">
          <HamburgerButton
            view={<Sidebar className="static w-full 2xl:w-full" />}
          />
          <Link
            aria-label="Site Logo"
            href="/"
            className="me-4 w-9 shrink-0 text-title hover:text-gray-900 lg:me-5 xl:hidden">
            <Logo className="w-[155px] dark:text-title max-sm:w-[120px]" />
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <SearchWidget
            icon={<PiMagnifyingGlass className="me-3 h-[20px] w-[20px]" />}
            className="xl:border:none border-none bg-[#f6f7f8] xl:w-auto xl:shadow-none dark:bg-[#afafaf26] xl:mr-4 mr-2"
            placeholderClassName="xl:hidden"
          />
          <HeaderMenuRight />
        </div>
      </div>
    </StickyHeader>
  )
}
