"use client"

import Breadcrumb from "@core/ui/breadcrumb"
import cn from "@core/utils/class-names"
import { useTranslations } from "next-intl"
import { Title } from "rizzui"

export type PageHeaderTypes = {
  title?: string
  serialNumber?: string
  breadcrumb?: { name: string; href?: string }[]
  className?: string
}

export default function PageHeader({
  title,
  serialNumber,
  breadcrumb,
  children,
  className,
}: React.PropsWithChildren<PageHeaderTypes>) {
  const t = useTranslations("common")

  return (
    <header className={cn("mb-6 @container xs:-mt-2 lg:mb-7", className)}>
      <div className="flex flex-col @lg:flex-row @lg:items-center @lg:justify-between">
        <div>
          {title && (
            <Title
              as="h2"
              className={cn(
                "text-[22px] lg:text-2xl 4xl:text-[26px]",
                breadcrumb && "mb-2"
              )}>
              {t(title!)}
            </Title>
          )}

          {serialNumber && (
            <Title
              as="h2"
              className={cn(
                "text-[22px] lg:text-2xl 4xl:text-[26px]",
                breadcrumb && "mb-2"
              )}>
              {serialNumber}
            </Title>
          )}

          {breadcrumb && (
            <Breadcrumb
              separator=""
              separatorVariant="circle"
              itemClassName="text-gray-800 dark:text-gray-0 last:dark:text-gray-600"
              className="flex-wrap">
              {breadcrumb?.map((item) => (
                <Breadcrumb.Item
                  key={item.name}
                  {...(item?.href && { href: item?.href })}>
                  {t(item?.name)}
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
          )}
        </div>
        {children}
      </div>
    </header>
  )
}
