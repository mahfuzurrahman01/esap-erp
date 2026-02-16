"use client"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import SupplierContractsTable from "@/modules/scm/components/containers/procurement/procurement-settings/supplier-contracts/supplier-contracts-table"

const pageHeader = {
  title: "text-supplier-contracts",
  breadcrumb: [
    {
      href: routes.scm.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.scm.procurement.setting.supplierContracts,
      name: "text-supplier-contracts",
    },
  ],
}

const SupplierContracts = () => {
  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <SupplierContractsTable />
    </div>
  )
}

export default SupplierContracts
