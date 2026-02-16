"use client"

import { useAtom } from "jotai"
import { useTranslations } from "next-intl"

import { Select } from "@/components/ui"
import { selectedYearAtom } from "@/modules/fms/store/year-atom"

type NumberFormatOption = {
  label: string
  value: number
}

export default function Year() {
  const t = useTranslations("form")
  const yearOptions: NumberFormatOption[] = [
    { label: "2025", value: 2025 },
    { label: "2024", value: 2024 },
    { label: "2023", value: 2023 },
  ]
  const [selectedYear, setSelectedYear] = useAtom(selectedYearAtom)

  return (
    <div className="shrink-0 grow-0 basis-auto">
      <Select
        label={t("form-year")}
        labelClassName="text-title mb-0"
        options={yearOptions}
        value={yearOptions.find((option) => option.value === selectedYear) || null}
        onChange={(newValue: unknown) =>
          setSelectedYear((newValue as NumberFormatOption)?.value ?? 2025)
        }
        placeholder={t("form-select")}
        className="flex items-center gap-3"
        controlClassName="border-transparent bg-gray-500/20 rounded-full ps-5 pe-3 gap-2 hover:border-transparent focus-within:border-transparent"
      />
    </div>
  )
}

