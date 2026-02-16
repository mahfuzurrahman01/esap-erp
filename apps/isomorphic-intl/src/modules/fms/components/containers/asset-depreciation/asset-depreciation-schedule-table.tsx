import cn from "@core/utils/class-names"
import dayjs from "dayjs"
// import dayjs from "dayjs"
import { useTranslations } from "next-intl"
// import { PiPlusBold } from "react-icons/pi"
import { Text } from "rizzui"

// import { DatePicker } from "@/components/base/date-picker"
// import { Badge, Button, Input } from "@/components/ui"
// import Select from "@/components/ui/select"
import TableGrid from "@/components/ui/table-grid"

// import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hooks"
import { AssetDepreciationTableProps } from "./types"
import Link from "next/link"

const useAssetDepreciationColumns = ({
  isFieldDisabled,
}: {
  isFieldDisabled: boolean
}) => {
  const t = useTranslations("form")

  const columns = [
    {
      id: "id",
      header: "ID",
      accessorKey: "id",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.index + 1}
        </Text>
      ),
    },
    {
      id: "scheduleDate",
      header: t("form-schedule-date"),
      accessorKey: "scheduleDate",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {dayjs(props.row.original.scheduleDate).format("DD-MM-YYYY")}
        </Text>
      ),
    },
    {
      id: "depreciationAmount",
      header: t("form-depreciation-amount"),
      accessorKey: "depreciationAmount",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.depreciationAmount}
        </Text>
      ),
    },
    {
      id: "accumulatedDepreciationAmount",
      header: t("form-accumulated-depreciation-amount"),
      accessorKey: "accumulatedDepreciationAmount",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.accumulatedDepreciationAmount}
        </Text>
      ),
    },
    {
      id: "journal.journalSerialNumber",
      header: t("form-journal-entry-code"),
      accessorKey: "journal.journalSerialNumber",
      cell: (props: any) => (
        <Link href={`/journal-entry/${props.row.original.journalId}`} className="font-medium text-gray-900 dark:text-gray-0 hover:dark:text-primary hover:underline">
          {props.row.original.journal?.journalNo}
        </Link>
      ),
    },
  ]

  return columns
}

export function AssetDepreciationScheduleTable({
  isFieldDisabled,
  assetDepreciationDetails,
}: AssetDepreciationTableProps) {
  const columns = useAssetDepreciationColumns({ isFieldDisabled })

  return (
    <div className="space-y-4">
      <TableGrid
        columns={columns}
        data={assetDepreciationDetails}
        gridTemplateColumns={cn("50px 1fr 1fr 1fr 1fr")}
        variant="modern"
      />
      {/* {!isFieldDisabled && (
        <Button variant="outline" onClick={onAddRow} className="mt-4">
          <PiPlusBold className="me-2 h-4 w-4" />
          {t("form-add-row")}
        </Button>
      )} */}
    </div>
  )
}
