"use client"

import { useEffect } from "react"

import { useAtom } from "jotai"
import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"

import { Select } from "@/components/ui"
import {
  ColumnMapping,
  columnMappingAtom,
  columnPatterns,
  findMatchingColumn,
} from "@/modules/fms/store/bank-statement-store"

interface StatementDetailsProps {
  control: any
  availableColumns?: string[]
  isLoading?: boolean
}

export default function StatementDetails({
  control,
  availableColumns = [],
  isLoading = false,
}: StatementDetailsProps) {
  const t = useTranslations("form")
  const [columnMapping, setColumnMapping] = useAtom(columnMappingAtom)

  const columnOptions = availableColumns.map((col) => ({
    label: col,
    value: col,
  }))

  // Set default mappings when columns are available
  useEffect(() => {
    if (availableColumns.length > 0) {
      const defaultMapping: ColumnMapping = {
        date: findMatchingColumn(availableColumns, columnPatterns.date),
        amount: findMatchingColumn(availableColumns, columnPatterns.amount),
        transactionType: findMatchingColumn(availableColumns, columnPatterns.transactionType),
        referenceNumber: findMatchingColumn(
          availableColumns,
          columnPatterns.referenceNumber
        ),
        description: findMatchingColumn(
          availableColumns,
          columnPatterns.description
        ),
      }

      // Only update if we found at least one match and there's no existing mapping
      const hasMatch = Object.values(defaultMapping).some(
        (value) => value !== undefined
      )
      const hasExistingMapping = Object.values(columnMapping).some(
        (value) => value !== undefined
      )

      if (hasMatch && !hasExistingMapping) {
        setColumnMapping(defaultMapping)
      }
    }
  }, [availableColumns, setColumnMapping])

  const handleColumnSelect = (
    field: keyof typeof columnMapping,
    value: string
  ) => {
    setColumnMapping((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <>
      <Controller
        name="date"
        control={control}
        render={() => (
          <Select
            options={columnOptions}
            value={columnOptions.find(
              (opt) => opt.value === columnMapping.date
            )}
            onChange={(option: any) =>
              handleColumnSelect("date", option?.value)
            }
            placeholder={t("form-date")}
            isLoading={isLoading}
            isDisabled={isLoading}
          />
        )}
      />
      <Controller
        name="amount"
        control={control}
        render={() => (
          <Select
            options={columnOptions}
            value={columnOptions.find(
              (opt) => opt.value === columnMapping.amount
            )}
            onChange={(option: any) =>
              handleColumnSelect("amount", option?.value)
            }
            placeholder={t("form-amount")}
          />
        )}
      />
      <Controller
        name="transactionType"
        control={control}
        render={() => (
          <Select
            options={columnOptions}
            value={columnOptions.find(
              (opt) => opt.value === columnMapping.transactionType
            )}
            onChange={(option: any) =>
              handleColumnSelect("transactionType", option?.value)
            }
            placeholder={t("form-transaction-type")}
          />
        )}
      />
      <Controller
        name="referenceNumber"
        control={control}
        render={() => (
          <Select
            options={columnOptions}
            value={columnOptions.find(
              (opt) => opt.value === columnMapping.referenceNumber
            )}
            onChange={(option: any) =>
              handleColumnSelect("referenceNumber", option?.value)
            }
            placeholder={t("form-reference-number")}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={() => (
          <Select
            options={columnOptions}
            value={columnOptions.find(
              (opt) => opt.value === columnMapping.description
            )}
            onChange={(option: any) =>
              handleColumnSelect("description", option?.value)
            }
            placeholder={t("form-description")}
          />
        )}
      />
    </>
  )
}
