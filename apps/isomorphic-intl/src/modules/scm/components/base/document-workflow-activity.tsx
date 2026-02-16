import React from "react"

import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { useTranslations } from "next-intl"

dayjs.extend(relativeTime)

interface Activity {
    icon?: React.ReactNode
    title: string
    description: string
}

interface ActivityLogProps {
    activities: Activity[]
}

export default function DocumentWorkflowActivity({ activities }: ActivityLogProps) {
    const t = useTranslations("common")
    return (
        <div className="rounded-lg p-6 text-white">
            <h2 className="mb-6 text-xl font-semibold">{t("text-workflow")}</h2>
            <div className="relative">
                <div className="absolute bottom-2 left-[5px] top-[26px] w-[2px] bg-gray-500/20" />
                <div className="space-y-6">
                    {activities.map((activity, index) => (
                        <div key={index} className="relative flex items-start gap-4">
                            <div className="mt-1.5 h-3 w-3 rounded-full bg-gray-500/20" />
                            <div className="flex-1">
                                {activity.icon}
                                <p className="text-sm text-gray-500">
                                    <span className="font-medium text-title">
                                        {activity.title}
                                    </span>{" "}
                                    <span className="italic text-gray-500">
                                        {activity.description}
                                    </span>{" "}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
