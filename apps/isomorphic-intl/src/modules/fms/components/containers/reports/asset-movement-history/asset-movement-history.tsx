"use client"

import { useState, useEffect, useMemo } from "react"

import WidgetCard from "@core/components/cards/widget-card"
import { useMedia } from "@core/hooks/use-media"
import SimpleBar from "@core/ui/simplebar"
import cn from "@core/utils/class-names"
import { Text, Title } from "rizzui"
import { Skeleton } from "@/components/ui"
import { AssetMovementHistory } from "@/modules/fms/types/asset-movement-history"

interface Props {
  className?: string
  data?: AssetMovementHistory[]
}

export default function AssetMovementHistoryOverview({ className, data = [] }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const isTab = useMedia("(max-width: 768px)", false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const totalMovements = data.length
  const uniqueLocations = useMemo(() => {
    const locations = new Set<string>()
    data.forEach((item) => {
      locations.add(item.fromLocation)
      locations.add(item.toLocation)
    })
    return locations.size
  }, [data])

  const movementTypes = useMemo(() => {
    const types = new Map<string, number>()
    data.forEach((item) => {
      const count = types.get(item.purposeOfMovement) || 0
      types.set(item.purposeOfMovement, count + 1)
    })
    return types
  }, [data])

  return (
    <WidgetCard
      title="Asset Movement Overview"
      titleClassName="font-normal sm:text-sm text-gray-500 mb-2.5 font-inter"
      className={cn("min-h-[28rem] border-transparent", className)}
      description={
        isLoading ? (
          <div className="flex items-center justify-start">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="ml-2 h-6 w-20" />
          </div>
        ) : (
          <div className="flex items-center justify-start">
            <Title as="h2" className="me-2 font-semibold">
              {totalMovements} Movements
            </Title>
            <Text className="flex items-center leading-none text-gray-500">
              across {uniqueLocations} locations
            </Text>
          </div>
        )
      }
      action={
        <div className="flex items-center gap-5">
          {isLoading ? (
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {Array.from(movementTypes.entries()).map(([type, count]) => (
                <div key={type} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <Text className="text-sm text-gray-600">
                    {type}: {count}
                  </Text>
                </div>
              ))}
            </div>
          )}
        </div>
      }>

      <div className="space-y-4">
        {data.map((item) => (
          <div
            key={item.movementCode}
            className="rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <Text className="font-medium">{item.assetCode}</Text>
                <Text className="text-sm text-gray-500">
                  {item.movementCode}
                </Text>
              </div>
              <div className="text-right">
                <Text className="font-medium">{item.purposeOfMovement}</Text>
                <Text className="text-sm text-gray-500">
                  {item.handledBy}
                </Text>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <Text className="text-sm text-gray-600">
                From: {item.fromLocation}
              </Text>
              <Text className="text-sm text-gray-600">
                To: {item.toLocation}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </WidgetCard>
  )
}
