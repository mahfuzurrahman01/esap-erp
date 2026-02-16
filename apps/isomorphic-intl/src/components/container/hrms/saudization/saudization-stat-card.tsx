"use client"

import { ReactNode } from "react"

import { ChartLineUpIcon } from "@/components/icons"

type Props = {
  title: string
  value: number
  countArray?: any[]
  footerText?: ReactNode
  isSaudiCard?: boolean
  hideIcon?: boolean
  percentage?: number
  zone?: string
}

const SaudizationStatCard = ({
  title,
  value,
  footerText,
  isSaudiCard = false,
  hideIcon = false,
  zone = "",
}: Props) => {
  const isRedZone = zone.toLowerCase().includes("red")
  const shouldShowRed = isRedZone // Both cards show red only when zone is red

  return (
    <div className="card-shadow h-full w-full rounded-2xl p-6">
      <div className="flex items-center gap-2">
        <div className="flex h-full basis-2/3 flex-col gap-3">
          <p className="subtitle2 typography-primary">{title}</p>
          <p
            className={`text-3xl font-bold leading-[3rem] ${
              isSaudiCard
                ? isRedZone
                  ? "text-red-500"
                  : "text-primary"
                : "text-black dark:text-white"
            }`}>
            {value}
          </p>

          <div className="flex items-center gap-2">
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full ${
                !hideIcon && (shouldShowRed ? "bg-red-100" : "bg-primary/20")
              }`}>
              {!hideIcon && (
                <ChartLineUpIcon
                  className={shouldShowRed ? "text-red-500" : "text-primary"}
                />
              )}
            </div>
            {footerText && <>{footerText}</>}
          </div>
        </div>

        {/* <div className="aspect-auto h-[118px] basis-1/3">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={countArray}
              margin={{
                left: -10,
              }}>
              <Line
                type="monotone"
                strokeWidth={4}
                dataKey="value"
                stroke="#10b981"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div> */}
      </div>
    </div>
  )
}

export default SaudizationStatCard
