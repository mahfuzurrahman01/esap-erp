"use client"

import { useEffect, useMemo, useState } from "react"

import { AnimatePresence, motion } from "framer-motion"
import { MdOutlineSsidChart } from "react-icons/md"
import {
  PiBuildings,
  PiChartPieSlice,
  PiUsers,
  PiUsersFour,
} from "react-icons/pi"
import { Button, cn } from "rizzui"

import LeftIcon from "@/components/icons/hrms/dashboard/left-icon"
import RightIcon from "@/components/icons/hrms/dashboard/right-icon"
import { useDepartmentList } from "@/modules/hrms/hooks/employee/use-department"
import { useSaudization } from "@/modules/hrms/hooks/saudization/use-saudization"

const CardSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsToShow, setCardsToShow] = useState(3)

  // Add resize listener to update cards to show
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1)
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2)
      } else {
        setCardsToShow(3)
      }
    }

    // Initial call
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const { data: departmentList, isLoading: isDepartmentLoading } =
    useDepartmentList()
  const { data: saudizationData, isLoading: isSaudizationLoading } =
    useSaudization()

  const isLoading = isDepartmentLoading || isSaudizationLoading

  // Create stats array from API data
  const stats = useMemo(() => {
    if (!departmentList?.data || !saudizationData) return []

    return [
      {
        id: 1,
        label: "Total Departments",
        value: departmentList.count.toString(),
        growth: "+2",
        period: "this month",
        gradient: "from-[#118D57] to-[#22C55E]",
        icon: <PiBuildings className="h-9 w-9 text-white" />,
        showGraph: true,
      },
      {
        id: 2,
        label: "Total Employees",
        value: saudizationData.totalEmployees.toString(),
        growth: "+5 new",
        period: "this month",
        gradient: "from-[#8144E6] to-[#ED97AC]",
        icon: <PiUsers className="h-9 w-9 text-white" />,
        showGraph: true,
      },
      {
        id: 3,
        label: "Saudi Employees",
        value: saudizationData.saudiEmployees.toString(),
        growth: `${saudizationData.saudiPercentage.toFixed(1)}%`,
        period: "of total",
        gradient: "from-[#24B4E2] to-[#3686E2]",
        icon: <PiUsersFour className="h-9 w-9 text-white" />,
        showGraph: true,
      },
      {
        id: 4,
        label: "Status",
        value: saudizationData.zone.replace(" Zone", ""),
        growth: "Current",
        period: "status",
        gradient: "from-[#F43F5E] to-[#FF7A00]",
        icon: <PiChartPieSlice className="h-9 w-9 text-white" />,
        showGraph: false,
      },
    ]
  }, [departmentList, saudizationData])

  const visibleCards = useMemo(
    () => stats.slice(currentIndex, currentIndex + cardsToShow),
    [stats, currentIndex, cardsToShow]
  )

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="relative w-full px-8 sm:px-12 md:px-16">
        <div className="relative flex w-full items-center justify-center">
          {/* Left Arrow Skeleton */}
          <div className="absolute -left-8 top-[50%] z-10 -translate-y-1/2 sm:-left-10 md:-left-12">
            <div className="h-12 w-12 animate-pulse rounded-[12px] bg-gray-200 sm:h-14 sm:w-14 md:h-16 md:w-16" />
          </div>

          {/* Cards Container Skeleton */}
          <div className="relative flex w-[90%] items-center justify-center gap-4 sm:gap-5 md:gap-6">
            {Array(cardsToShow)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="w-[90%] sm:w-[48%] lg:w-[35%]">
                  <div
                    className={cn(
                      "relative rounded-[20px] bg-gray-200 transition-all",
                      "h-[200px] sm:h-[260px] lg:h-[320px]",
                      "p-4 sm:p-5 md:p-6",
                      "flex flex-col"
                    )}>
                    {/* Icon Skeleton */}
                    <div className="mb-3 h-10 w-10 animate-pulse rounded-full bg-gray-300 sm:h-12 sm:w-12 md:h-14 md:w-14" />

                    <div className="space-y-3">
                      {/* Label Skeleton */}
                      <div className="h-4 w-24 animate-pulse rounded bg-gray-300 sm:h-5 md:h-6" />

                      {/* Value Skeleton */}
                      <div className="h-8 w-32 animate-pulse rounded bg-gray-300 sm:h-10 sm:w-40 md:h-12 md:w-48" />

                      {/* Growth Stats Skeleton */}
                      <div className="absolute bottom-4 flex items-center gap-2 sm:bottom-5 md:bottom-6">
                        <div className="h-4 w-4 animate-pulse rounded-full bg-gray-300 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                        <div className="h-3 w-16 animate-pulse rounded bg-gray-300 sm:h-4 sm:w-20 md:h-5 md:w-24" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Right Arrow Skeleton */}
          <div className="absolute -right-8 top-[50%] z-10 -translate-y-1/2 sm:-right-10 md:-right-12">
            <div className="h-12 w-12 animate-pulse rounded-[12px] bg-gray-200 sm:h-14 sm:w-14 md:h-16 md:w-16" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full px-8 sm:px-12 md:px-16">
      <div className="relative flex w-full items-center justify-center">
        {/* Left Arrow */}
        <AnimatePresence initial={false}>
          {currentIndex > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute -left-8 top-[50%] z-10 -translate-y-1/2 sm:-left-10 md:-left-12">
              <Button
                variant="text"
                onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                className="h-12 w-12 rounded-[12px] bg-[#FFF1F5] p-0 text-gray-500 shadow-xl shadow-[#FAA2D0] hover:text-gray-900 sm:h-14 sm:w-14 sm:rounded-[15px] md:h-16 md:w-16 md:rounded-[18px]">
                <LeftIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cards Container */}
        <div className="relative flex w-[90%] items-center justify-center gap-4 sm:gap-5 md:gap-6">
          <AnimatePresence initial={false} mode="popLayout">
            {visibleCards.map((stat, index) => (
              <motion.div
                key={stat.id}
                layout
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "transition-all duration-500",
                  "w-[90%] sm:w-[48%] lg:w-[35%]"
                )}>
                <div
                  className={cn(
                    "relative bg-gradient-to-br text-white transition-all duration-500",
                    "rounded-[20px] sm:rounded-[25px] md:rounded-[30px]",
                    "p-4 sm:p-5 md:p-6",
                    stat.gradient,
                    cardsToShow === 1
                      ? "h-[200px] sm:h-[260px] lg:h-[320px]"
                      : cardsToShow === 2
                        ? "h-[300px]"
                        : index === Math.floor(cardsToShow / 2)
                          ? "h-[320px] shadow-2xl shadow-[#EEA2B133]"
                          : "h-[280px] shadow-xl shadow-[#EEA2B133]"
                  )}>
                  <div
                    className={cn(
                      "mb-3 flex items-center justify-center rounded-full bg-white/20 transition-all duration-500",
                      cardsToShow === 1 || cardsToShow === 2
                        ? "h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14"
                        : index === Math.floor(cardsToShow / 2)
                          ? "h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16"
                          : "h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14"
                    )}>
                    {stat.icon}
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-white/80 sm:text-sm md:text-base">
                      {stat.label}
                    </p>
                    <h3
                      className={cn(
                        "mt-1 font-bold leading-none text-white transition-all duration-500",
                        cardsToShow === 1 || cardsToShow === 2
                          ? "text-2xl sm:text-3xl md:text-4xl"
                          : index === Math.floor(cardsToShow / 2)
                            ? "text-4xl sm:text-5xl md:text-[60px]"
                            : "text-3xl sm:text-4xl md:text-[48px]"
                      )}>
                      {stat.value}
                    </h3>
                    <div className="absolute bottom-4 flex items-center gap-1.5 text-[10px] sm:bottom-5 sm:text-xs md:bottom-6 md:text-sm">
                      {stat.showGraph ? (
                        <div className="flex items-center gap-1 sm:gap-1.5">
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white sm:h-5 sm:w-5 md:h-6 md:w-6">
                            <MdOutlineSsidChart
                              className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4"
                              color="#22C55E"
                            />
                          </span>
                          <span className="flex items-center font-medium">
                            {stat.growth}
                          </span>
                          <span className="text-white/80">{stat.period}</span>
                        </div>
                      ) : (
                        <>
                          <span className="flex items-center font-medium">
                            {stat.growth}
                          </span>
                          <span className="text-white/80">{stat.period}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Right Arrow */}
        <AnimatePresence initial={false}>
          {currentIndex < stats.length - cardsToShow && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute -right-8 top-[50%] z-10 -translate-y-1/2 sm:-right-10 md:-right-12">
              <Button
                variant="text"
                onClick={() =>
                  setCurrentIndex((prev) =>
                    Math.min(prev + 1, stats.length - cardsToShow)
                  )
                }
                className="h-12 w-12 rounded-[12px] bg-[#FFF1F5] p-0 text-gray-500 shadow-xl shadow-[#FAA2D0] hover:text-gray-900 sm:h-14 sm:w-14 sm:rounded-[15px] md:h-16 md:w-16 md:rounded-[18px]">
                <RightIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default CardSlider
