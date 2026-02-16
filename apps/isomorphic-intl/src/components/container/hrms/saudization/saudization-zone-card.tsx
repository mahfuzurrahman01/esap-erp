"use client"

import { useTranslations } from "next-intl"
import { PiSmileyFill, PiSmileySad } from "react-icons/pi"

import { ChartLineUpIcon } from "@/components/icons"

type Props = {
  title: string
  zone: string
  saudiPercentage: number
}

const SaudizationZoneCard = ({ title, zone, saudiPercentage }: Props) => {
  const isRedZone = zone.toLowerCase().includes("red")
  const t = useTranslations("form")
  return (
    <div className="card-shadow h-full w-full rounded-2xl p-6">
      <div className="flex items-center gap-2">
        <div className="flex h-full w-full flex-col gap-3">
          <p className="subtitle2 typography-primary">{title}</p>
          <div
            className={`flex items-center gap-3 ${isRedZone ? "text-red-500" : "text-primary"}`}>
            <p className="text-3xl font-bold leading-[3rem]">{zone}</p>
            {!isRedZone ? (
              <PiSmileyFill className="h-8 w-8" />
            ) : (
              <PiSmileySad className="h-8 w-8" />
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
              <ChartLineUpIcon className="text-primary" />
            </div>
            <p className="text-sm text-title">
              {t("form-as-saudization-percentage")} {saudiPercentage.toFixed(2)}
              %
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SaudizationZoneCard
