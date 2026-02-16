import React from "react"
import { LineGroup, Skeleton } from "@core/ui/skeleton"

const columnsConfig: number[] = [6, 5, 4];

export default function SkeletonLoader() {
  return (
    <div className="grid gap-3 p-5">
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-6 rounded dark:bg-gray-700" />
        <Skeleton className="h-3 w-32 rounded dark:bg-gray-700" />
        <Skeleton className="h-3 w-3 rounded-full dark:bg-gray-700" />
        <Skeleton className="ml-auto h-3 w-16 rounded dark:bg-gray-700" />
      </div>

      {Array(4).fill(columnsConfig).map((columns, index) => (
        <React.Fragment key={index}>
          {columns.map((column: number, idx: number) => (
            <LineGroup
              key={idx}
              columns={column}
              className={`grid-cols-${column} gap-1.5`}
              skeletonClassName="h-2"
            />
          ))}
          <br />
          <br />
          <br />
        </React.Fragment>
      ))}
    </div>
  )
}