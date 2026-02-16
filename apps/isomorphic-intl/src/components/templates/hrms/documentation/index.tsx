"use client"

import { useState } from "react"

import { AnimatePresence, motion } from "framer-motion"
import { useTranslations } from "next-intl"
import {
  PiChartBar,
  PiChartLineUp,
  PiClockCountdown,
  PiFileText,
  PiGraduationCap,
  PiHandCoins,
  PiUsersFour,
} from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"

import FlowDiagram from "./flow-diagram"
import StepGuide from "./step-guide"

const pageHeader = {
  title: "text-documentation",
  breadcrumb: [
    {
      href: routes.hr.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.hr.documentation,
      name: "text-documentation",
    },
  ],
}

const sidebarItems = [
  {
    id: "employees",
    title: "Employees",
    icon: PiUsersFour,
    color: "#4338ca",
  },
  {
    id: "attendance",
    title: "Attendance",
    icon: PiClockCountdown,
    color: "#0891b2",
  },

  {
    id: "saudization",
    title: "Saudization",
    icon: PiChartLineUp,
    color: "#0891b2",
  },
  {
    id: "recruitment",
    title: "Recruitment",
    icon: PiUsersFour,
    color: "#059669",
  },
  {
    id: "payroll",
    title: "Payroll",
    icon: PiHandCoins,
    color: "#d97706",
  },
  {
    id: "appraisal",
    title: "Appraisal",
    icon: PiChartLineUp,
    color: "#be185d",
  },
  {
    id: "fileManagement",
    title: "File Management",
    icon: PiFileText,
    color: "#7c3aed",
  },
  {
    id: "training",
    title: "Training",
    icon: PiGraduationCap,
    color: "#0891b2",
  },
  {
    id: "reports",
    title: "Reports",
    icon: PiChartBar,
    color: "#059669",
  },
]

const Documentation = () => {
  const [activeItem, setActiveItem] = useState("employees")
  const t = useTranslations()

  return (
    <div className="flex min-h-screen flex-col">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <div className="mx-auto w-full max-w-[1536px] flex-grow px-4 pb-6">
        <div className="mt-6 flex gap-6">
          {/* Sidebar - Updated with glassmorphism */}
          <div className="card-shadow sticky top-24 h-fit w-64 shrink-0 rounded-lg bg-white/80 p-4 backdrop-blur-sm transition-colors duration-200 dark:bg-gray-900/60">
            {sidebarItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`mb-2 flex w-full items-center gap-3 rounded-lg p-3 transition-all ${
                  activeItem === item.id
                    ? "bg-primary/20 text-gray-900 dark:text-gray-100"
                    : "text-gray-600 hover:bg-gray-100/50 dark:text-gray-400 dark:hover:bg-gray-800/50"
                }`}>
                <item.icon className="text-xl" style={{ color: item.color }} />
                <span>{item.title}</span>
                <span
                  className={`ml-auto rounded-full px-2 py-0.5 text-xs font-medium ${
                    activeItem === item.id
                      ? "bg-primary/10 text-primary dark:bg-primary/20"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  }`}>
                  {index + 1}
                </span>
              </button>
            ))}
          </div>

          {/* Main Content - Updated with glassmorphism */}
          <div className="card-shadow flex-1 rounded-lg bg-white/80 backdrop-blur-sm transition-colors duration-200 dark:bg-gray-900/80">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col">
                {/* Flow Diagram Section */}
                <div className="h-[400px] border-b border-gray-100 p-6 dark:border-gray-800">
                  <FlowDiagram moduleId={activeItem} />
                </div>
                {/* Step Guide Section - Natural height */}
                <div className="p-6">
                  <StepGuide moduleId={activeItem} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Documentation
