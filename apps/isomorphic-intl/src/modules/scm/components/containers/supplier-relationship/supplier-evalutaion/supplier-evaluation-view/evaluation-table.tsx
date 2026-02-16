"use client"

import { useMemo } from "react"

import { useDirection } from "@core/hooks/use-direction"
import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import MainTable from "@/components/base/table/main-table"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import {
  EvaluationCriteria,
  SupplierEvaluation,
} from "@/modules/scm/types/supplier-relationship/supplier-evaluation/supplier-evaluation-types"

const columnHelper = createColumnHelper<EvaluationCriteria>()

const useEvaluationColumn = () => {
  const t = useTranslations("form")

  const column = useMemo(() => {
    return [
      columnHelper.accessor("criteriaName", {
        id: "criteriaName",
        size: 240,
        header: t("form-criteria-name"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-title dark:text-title">
            {info.renderValue() as string}
          </Text>
        ),
      }),
      columnHelper.accessor("score", {
        id: "score",
        size: 240,
        header: t("form-score"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-title dark:text-title">
            {info.renderValue() as number}
          </Text>
        ),
      }),
    ]
  }, [t])

  return column
}

function EvaluationDetailsListTable({
  initialData,
}: {
  initialData: SupplierEvaluation
}) {
  const columns = useEvaluationColumn()
  const { direction } = useDirection()

  const { table, columnOrder } = useTanStackTable<SupplierEvaluation>({
    tableData: initialData?.evaluationCriteries || [],
    columnConfig: columns,
    options: {
      columnResizeDirection: direction as any,
      columnResizeMode: "onChange",
    },
  })
  return (
    <MainTable table={table} columnOrder={columnOrder} variant={"modern"} />
  )
}

export default function EvaluationViewTable({
  initialData,
}: {
  initialData: SupplierEvaluation
}) {
  const t = useTranslations("common")
  return (
    <div className="mt-4 @container">
      <Text className="my-2 ml-6 text-base font-medium text-title dark:text-title">
        {t("text-evaluation-information")}
      </Text>
      <EvaluationDetailsListTable initialData={initialData} />
    </div>
  )
}
