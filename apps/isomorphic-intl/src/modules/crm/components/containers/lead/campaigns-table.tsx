"use client"

import cn from "@core/utils/class-names"
import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import { Button } from "@/components/ui"
import TableGrid from "@/components/ui/table-grid"
import { useCampaignsColumns } from "./campaigns-columns"
import Link from "next/link"
import { routes } from "@/config/routes"

interface PaymentReferenceTableProps {
  data?: any
}

export function CampaignsTable({
  data = [],
}: PaymentReferenceTableProps) {
  const t = useTranslations("form")
  const columns = useCampaignsColumns()
  return (
    <div className="print:non-scrollable space-y-4 pt-4 pb-8">
      <div className="flex items-center justify-between">
        <div className="py-6 text-base font-medium text-title">
          {t("form-campaign")}
        </div>
        <Link href={routes.crm.createCampaign}>
          <Button variant="outline" className="flex items-center gap-2 text-sm">
            <PiPlusBold className="h-4 w-4" />
            {t("form-add-new")}
          </Button>
        </Link>
      </div>
      <TableGrid
        data={data.campaigns}
        columns={columns}
        gridTemplateColumns={cn(
          "50px 250px 1fr 1fr 150px"
        )}
        variant="modern"
      />
    </div>
  )
}
