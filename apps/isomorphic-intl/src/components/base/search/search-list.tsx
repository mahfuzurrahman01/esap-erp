"use client"

import { Fragment, useEffect, useRef, useState } from "react"

import { PiFileTextDuotone, PiMagnifyingGlassBold, PiXBold } from "react-icons/pi"
import { ActionIcon, Button, Empty, SearchNotFoundIcon, Title } from "rizzui"

import { Input } from "@/components/ui"

import { pageLinks } from "./page-links.data"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { cn } from "@/utils/cn"

export default function SearchList({ onClose }: { onClose?: () => void }) {
  const t = useTranslations("layout")
  const tText = useTranslations("common")
  const inputRef = useRef(null)
  const [searchText, setSearchText] = useState("")

  let menuItemsFiltered = pageLinks
  if (searchText.length > 0) {
    menuItemsFiltered = pageLinks.filter((item: any) => {
      const label = item.name
      return (
        label.match(searchText.toLowerCase()) ||
        (label.toLowerCase().match(searchText.toLowerCase()) && label)
      )
    })
  }

  useEffect(() => {
    if (inputRef?.current) {
      // @ts-ignore
      inputRef.current.focus()
    }
    return () => {
      inputRef.current = null
    }
  }, [])

  return (
    <>
      <div className="flex items-center px-5 py-4">
        <Input
          value={searchText}
          ref={inputRef}
          onChange={(e) => setSearchText(() => e.target.value)}
          placeholder="Search pages here"
          className="flex-1 !border-none !focus:border-none"
          prefix={
            <PiMagnifyingGlassBold className="h-[18px] w-[18px] text-gray-600" />
          }
          suffix={
            searchText && (
              <Button
                size="sm"
                variant="text"
                className="h-auto w-auto px-0"
                onClick={(e) => {
                  e.preventDefault()
                  setSearchText(() => "")
                }}>
                {tText("text-clear")}
              </Button>
            )
          }
        />
        <ActionIcon
          variant="text"
          size="sm"
          className="ms-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-500"
          onClick={onClose}>
          <PiXBold className="h-5 w-5" />
        </ActionIcon>
      </div>

      <div className="custom-scrollbar max-h-[50vh] overflow-y-auto border-t border-gray-500/20 px-2 py-4 xl:min-w-[650px]">
        <>
          {menuItemsFiltered.length === 0 ? (
            <Empty
              className="scale-75"
              image={<SearchNotFoundIcon />}
              text="No Result Found"
              textClassName="text-xl"
            />
          ) : null}
        </>

        {menuItemsFiltered.map((item, index) => {
          return (
            <Fragment key={`${item.name}-${index}`}>
              {item?.href ? (
                <Link
                  href={item?.href as string}
                  className="relative my-0.5 flex items-center rounded-lg border-b border-dashed border-gray-500/20 px-3 py-2 text-sm hover:border hover:border-dashed hover:border-primary hover:bg-primary/10 focus:outline-none focus-visible:bg-primary/10 dark:hover:bg-primary/10 dark:hover:backdrop-blur-lg">
                  {/* <span className="inline-flex items-center justify-center rounded-md border border-gray-300 p-2 text-gray-500 dark:border-gray-500">
                    <PiFileTextDuotone className="h-5 w-5" />
                  </span> */}

                  <span className="ms-3 grid gap-0.5">
                    <span className="font-medium capitalize text-gray-900 dark:text-gray-0">
                      {t(item.name)}
                    </span>
                    <span className="text-gray-500">
                      {item?.href as string}
                    </span>
                  </span>
                </Link>
              ) : (
                <Title
                  as="h6"
                  className={cn(
                    "mb-1 px-3 text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-500",
                    index !== 0 && "mt-6 4xl:mt-7"
                  )}>
                  {t(item.name)}
                </Title>
              )}
            </Fragment>
          )

        })}
      </div>
    </>
  )
}
