import { Button, Select } from "@/components/ui"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { HiMiniChevronLeft, HiMiniChevronRight } from "react-icons/hi2"

const CustomToolbar = ({ label, onNavigate, onView, view }:any) => {
  const t = useTranslations("crm")
  const [selectedView, setSelectedView] = useState(view || 'month')

  const handleViewChange = (event:any) => {
    const newView = event.value
    setSelectedView(newView)
    onView(newView)
  }

  const screenTypes = [
    { label: "Month", value: "month" },
    { label: "Week", value: "week" },
    { label: "Day", value: "day" },
    { label: "Agenda", value: "agenda" },
  ]

  return (
    <div className="rbc-toolbar flex items-center justify-between dark:bg-[#1c252e] dark:border-gray-700">
      <div className="flex items-center space-x-2">
        <Select
            options={screenTypes}
            className="dropdown-border-none flex rounded-lg text-xs"
            onChange={handleViewChange}
            value={
                screenTypes.find((option) => option.value == view) || selectedView
            }
            styles={{
            control: (baseStyles) => ({
                ...baseStyles,
                padding: "5px 8px",
            }),
            }}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Button
          className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 border-0 dark:bg-[#1c252e] hover:dark:bg-[#1c252e] dark:text-gray-300 hover:dark:text-gray-300"
          onClick={() => onNavigate('PREV')}
        >
          <HiMiniChevronLeft className="w-5 h-5" />
        </Button>
        <span className="text-lg font-semibold min-w-36 text-center text-title">{label}</span>
        <Button
          className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 dark:bg-[#1c252e] hover:dark:bg-[#1c252e] dark:text-gray-300 hover:dark:text-gray-300"
          onClick={() => onNavigate('NEXT')}
        >
          <HiMiniChevronRight className="w-5 h-5" />
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          className="px-4 py-2 today-btn crm-red-btn hover:text-gray-0"
          onClick={() => onNavigate('TODAY')}
        >
          {t("text-today")}
        </Button>
      </div>
    </div>
  )
}

export default CustomToolbar