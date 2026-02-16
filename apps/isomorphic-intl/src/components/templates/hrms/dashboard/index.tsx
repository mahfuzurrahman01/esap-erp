"use client"

import { useTranslations } from "next-intl"
import { PiHandWaving } from "react-icons/pi"

import BackgroundSvg from "@/components/icons/hrms/dashboard/background-svg"
import BackgroundSvgDown from "@/components/icons/hrms/dashboard/background-svg-down"
import CardSlider from "@/components/ui/hrms/dashboard/card-slider"
import EmployeeDistributionChart from "@/components/ui/hrms/dashboard/employee-distribution-chart"
import UpcomingLeaveStats from "@/components/ui/hrms/dashboard/upcoming-leave-stats"

export default function HRMSDashboard() {
  const t = useTranslations("common")

  const getGreeting = () => {
    const currentHour = new Date().getHours()
    if (currentHour < 12) return "Good Morning"
    if (currentHour < 18) return "Good Afternoon"
    return "Good Evening"
    // try {
    //   if (currentHour < 12) return t("text-good-morning") || "Good Morning"
    //   if (currentHour < 18) return t("text-good-afternoon") || "Good Afternoon"
    //   return t("text-good-evening") || "Good Evening"
    // } catch (error) {
    //   console.error("Translation error:", error)
    //   // Fallback to direct text if translation fails
    //   if (currentHour < 12) return "Good Morning"
    //   if (currentHour < 18) return "Good Afternoon"
    //   return "Good Evening"
    // }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-pink-200 via-pink-100 to-white px-5 py-24 @container lg:bg-none">
      {/* Background SVGs Container - Only visible on large screens */}
      <div className="pointer-events-none fixed inset-0 -z-50 hidden h-full w-full overflow-hidden lg:block">
        <BackgroundSvg className="absolute left-0 top-0 h-[80%] w-full object-cover opacity-90" />
        <BackgroundSvgDown className="absolute bottom-0 left-0 h-[70%] w-full object-cover opacity-90" />
      </div>

      {/* Header with Gradient Text */}
      <div className="mb-6 flex w-full items-center justify-center sm:mb-8">
        <div className="flex w-4/5 items-start gap-2 px-0 sm:gap-3 sm:px-4">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm sm:h-12 sm:w-12">
              <PiHandWaving className="h-6 w-6 text-white sm:h-7 sm:w-7" />
            </div>
            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-gradient-to-r from-[#FF8FD5] to-[#CC6FF4] sm:h-5 sm:w-5" />
          </div>
          <div className="flex flex-col">
            <div className="rounded-2xl py-2 sm:py-3">
              <h2
                className={`bg-clip-text py-1 text-2xl font-bold leading-tight sm:py-2 sm:text-3xl md:text-4xl lg:text-5xl ${
                  // Change text color based on screen size
                  "bg-black text-transparent lg:bg-black lg:text-transparent"
                }`}>
                {getGreeting()}
              </h2>
              <div className="flex items-center gap-2">
                <span className="inline-block h-0.5 w-4 rounded-full bg-black/40 sm:w-5 lg:bg-white/40" />
                <p className="text-sm font-medium text-black/90 sm:text-base lg:text-white/90">
                  {t("text-welcome-back")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-4 flex w-11/12 items-center justify-center sm:mt-7">
        <div className="w-full px-0 sm:w-11/12 sm:px-4 md:w-4/5">
          <CardSlider />
        </div>
      </div>

      <div className="mt-6 flex w-full items-center justify-center sm:mt-8 md:mt-10">
        <div className="w-full px-0 sm:w-11/12 sm:px-4 md:w-4/5">
          <div className="flex w-full flex-col items-start justify-center gap-4 sm:gap-6 lg:flex-row lg:items-center">
            <div className="w-full lg:w-1/2">
              <EmployeeDistributionChart />
            </div>
            <div className="w-full lg:w-1/2">
              <UpcomingLeaveStats />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
