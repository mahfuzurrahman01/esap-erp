"use client";

import cn from "@core/utils/class-names";
import { useTranslations } from "next-intl";
import { PiPlusBold } from "react-icons/pi";



import { Button } from "@/components/ui";
import TableGrid from "@/components/ui/table-grid";



import { usePaymentTaxAndChargeColumns } from "./payment-tax-and-charge-columns";





interface PaymentTaxAndChargeTableProps {
  isFieldDisabled?: boolean
  data?: any[]
  onRowChange?: (index: number, field: string, value: any) => void
  onRowDelete?: (index: number) => void
  onAddRow?: () => void
  setValue?: any
  formContext?: any // Add this prop
}

export function PaymentTaxAndChargeTable({
  isFieldDisabled = false,
  data = [],
  onRowChange,
  onRowDelete = () => {},
  onAddRow,
  setValue = () => {},
}: PaymentTaxAndChargeTableProps) {
  const t = useTranslations("form")

  const columns = usePaymentTaxAndChargeColumns({
    isFieldDisabled,
    onDelete: onRowDelete,
    setValue,
  })

  // useEffect(() => {
  //   if (data.length > 0) {
  //     // Initialize the tax rows with the existing data
  //     setTaxRows(data)
  //   }
  // }, [data])

  return (
    <div className="print:non-scrollable space-y-4">
      <TableGrid
        data={data}
        columns={columns as any}
        gridTemplateColumns={cn(
          "50px 1fr 1fr 200px 200px 200px",
          isFieldDisabled ? "5px" : "80px"
        )}
        variant="modern"
        onRowChange={onRowChange}
      />
      {!isFieldDisabled && (
        <Button variant="outline" onClick={onAddRow} className="mt-4">
          <PiPlusBold className="me-2 h-4 w-4" />
          {t("form-add-row")}
        </Button>
      )}
    </div>
  )
}