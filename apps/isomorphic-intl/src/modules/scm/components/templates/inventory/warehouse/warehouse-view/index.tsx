"use client"

import Link from "next/link"
import { useParams } from "next/navigation"

import { useTranslations } from "next-intl"

import PageHeader from "@/components/base/page-header"
import EditIcon from "@/components/icons/base/edit"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import WarehouseView from "@/modules/scm/components/containers/invenory/warehouse/warehouse-view"
import { useWarehouseById } from "@/modules/scm/hooks/inventory/warehouse/use-warehouse"
import { Warehouse } from "@/modules/scm/types/inventory/warehouse/warehouse-types"

const pageHeader = {
  title: "text-warehouse-view",
  breadcrumb: [
    {
      name: "text-inventory",
    },
    {
      name: "text-warehouse-list",
      href: routes.scm.inventory.warehouse.warehouse,
    },
    {
      name: "text-warehouse-view",
    },
  ],
}

export default function WarehouseViewPage() {
  const params = useParams()
  const t = useTranslations("form")
  const { data } = useWarehouseById(Number(params?.id))
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Link
            href={routes.scm.inventory.warehouse.editWarehouse(
              Number(params?.id)
            )}
            className="w-full @lg:w-auto">
            <Button as="span">
              <EditIcon className="me-1.5 h-[17px] w-[17px]" />
              {t("form-edit-details")}
            </Button>
          </Link>
        </div>
      </PageHeader>
      <WarehouseView initialData={data as Warehouse} />
    </>
  )
}
