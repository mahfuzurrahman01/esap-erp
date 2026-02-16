"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { PiCake } from "react-icons/pi"
import { Title } from "rizzui/typography"

import { cn } from "@/utils/cn"

// Dummy data - replace with real data later
const upcomingBirthdays = [
  {
    id: 1,
    name: "John Doe",
    avatar: "/avatars/avatar-1.png",
    designation: "Software Engineer",
    date: "Mar 24",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    avatar: "/avatars/avatar-2.png",
    designation: "UI Designer",
    date: "Mar 25",
  },
  {
    id: 3,
    name: "Mike Johnson",
    avatar: "/avatars/avatar-3.png",
    designation: "Product Manager",
    date: "Mar 27",
  },
]

interface Props {
  className?: string
}

export default function BirthdayCardStat({ className }: Props) {
  const t = useTranslations()

  return (
    <div
      className={cn(
        "rounded-xl bg-gray-0 p-5 dark:bg-gray-900",
        className
      )}>
      <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <PiCake className="h-6 w-6 text-orange-light" />
          <Title as="h3" className="font-semibold">
            {t("common.text-upcoming-birthdays")}
          </Title>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {upcomingBirthdays.map((birthday) => (
          <div
            key={birthday.id}
            className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={birthday.avatar}
                  alt={birthday.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {birthday.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {birthday.designation}
                </p>
              </div>
            </div>
            <div className="flex h-8 items-center rounded-full bg-orange-lighter/20 px-3 text-sm font-medium text-orange-dark dark:bg-orange-dark/10">
              {birthday.date}
            </div>
          </div>
        ))}
      </div>

      {upcomingBirthdays.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400">
          <PiCake className="mb-2 h-8 w-8" />
          <p>{t("common.text-no-upcoming-birthdays")}</p>
        </div>
      )}
    </div>
  )
}
