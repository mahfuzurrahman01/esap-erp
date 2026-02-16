import React from "react"

import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

interface Activity {
  user: string
  action: string
  time: string // ISO 8601 format
}

interface ActivityLogProps {
  activities: Activity[]
}

export default function ActivityLog({ activities }: ActivityLogProps) {
  return (
    <div className="rounded-lg p-6 text-white">
      <h2 className="mb-6 text-xl font-semibold">Activity</h2>
      <div className="relative">
        <div className="absolute bottom-2 left-[5px] top-[26px] w-[2px] bg-gray-500/20" />
        <div className="space-y-6">
          {activities.map((activity, index) => (
            <div key={index} className="relative flex items-start gap-4">
              <div className="mt-1.5 h-3 w-3 rounded-full bg-gray-500/20" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">
                  <span className="font-medium text-title">
                    {activity.user}
                  </span>{" "}
                  <span className="italic text-gray-500">
                    {activity.action}
                  </span>{" "}
                  · {dayjs(activity.time).fromNow()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
