"use client"

import CircleProgressBar from "@core/components/charts/circle-progressbar"
import cn from "@core/utils/class-names"
import UpArrowSCMIcon from "@/components/icons/scm/dashboard/up-arrow"
import Box from "@/components/ui/box"
import MetricCard from "../../base/metric-card"


export default function StatCards({
  className,
  data,
}: {
  className?: string
  data?: any
}) {

  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-4 pb-1">
        {data.map((stat: any) => (
          <Box
            className="!min-w-[200px] !rounded-2xl p-6 !shadow-xl transition-shadow duration-200 !mt-2 md:!mt-2"
            key={stat.title + stat.id}>
            <MetricCard
              key={stat.title + stat.id}
              title={stat.title}
              metric={stat.metric}
              icon={stat.icon}
              className="min-w-[200px] !rounded-xl border-0 p-1 @2xl:min-w-[200px] lg:p-1"
              titleClassName="capitalize"
              contentClassName="ps-5"
              metricClassName="text-lg font-semibold text-gray-800 2xl:xl:text-xl dark:text-gray-0"
              chartClassName={cn(
                "hidden !rounded-full @[150px]:flex @[150px]:items-center h-[4.2rem] w-20 !shadow-xl",
                Number(stat.percentage) < 0 
                  ? "!shadow-red-500/50"  // Red color for negative percentage
                  : stat.sl === 1 
                    ? "!shadow-green-500/50"
                    : stat.sl === 2 
                      ? "!shadow-purple-500/50"
                      : stat.sl === 3 
                        ? "!shadow-yellow-500/50"
                        : stat.sl === 4 
                          ? "!shadow-orange-500/50"
                          : ""
              )}
              chart={
                <CircleProgressBar
                  percentage={stat.percentage}
                  size={75}
                  stroke="rgb(245, 240, 240)"
                  strokeWidth={7}
                   progressColor={
                    Number(stat.percentage) < 0 
                    ? "#fa1313"  // Red color for negative percentage
                    : stat.sl === 1
                      ? "#5BE49B"
                      : stat.sl === 2
                        ? "#8C4BF6"
                        : stat.sl === 3
                          ? "#FFD666"
                          : stat.sl === 4
                            ? "#FF5630"
                            : ""
                  }
                  useParentResponsive={true}
                  label={
                    <UpArrowSCMIcon
                      className={`h-4 w-4`}
                      fill={
                        Number(stat.percentage) < 0 
                        ? "#fa1313"  // Red color for negative percentage
                        : stat.sl === 1
                          ? "#5BE49B"
                          : stat.sl === 2

                            ? "#8C4BF6"
                            : stat.sl === 3
                              ? "#FFD666"
                              : stat.sl === 4
                                ? "#FF5630"
                                : ""
                      }
                    />
                  }
                />
              }>
              {/* <Text className="mt-5 flex items-center leading-none text-gray-500">
                <Text
                  as="span"
                  className={cn(
                    "me-2 inline-flex items-center font-medium",
                    stat.increased ? "text-green-500" : "text-red-500"
                  )}>
                  {stat.increased ? (
                    <TrendingUpIcon className="me-1 h-4 w-4" />
                  ) : (
                    <TrendingDownIcon className="me-1 h-4 w-4" />
                  )}
                  {stat.percentage}%
                </Text>
                <Text as="span" className="me-1 hidden @[240px]:inline-flex">
                  {stat.increased ? "Increased" : "Decreased"}
                </Text>{" "}
                last month
              </Text> */}
            </MetricCard>
          </Box>
        ))}
      </div>
    </div>
  )
}
