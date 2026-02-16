"use client"

import { useParams } from "next/navigation"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import ContractForm from "@/modules/scm/components/containers/procurement/supplier/contract/contract-form"
import { useContractById } from "@/modules/scm/hooks/procurement/supplier/use-contract"
import { Contract } from "@/modules/scm/types/procurement/supplier/contract-types"
import { Button } from "@/components/ui"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import PageLoading from "@/modules/scm/components/base/page-loading"

export default function ContractDetails() {
  const params = useParams()
  const router = useRouter()
  const t = useTranslations("common")
  const supplierId = Number(params.slug)

  const pageHeader = {
    title: "text-contract-details",
    breadcrumb: [
      {
        name: "text-procurement",
      },
      {
        name: "text-supplier-list",
        href: routes.scm.procurement.suppliers.suppliers,
      },
      {
        name: "text-supplier-details",
        href: routes.scm.procurement.suppliers.supplierDetails(supplierId),
      },
      {
        name: "text-contract-details",
      },
    ],
  }

  const { data: contractData, isLoading } = useContractById(
    Number(params.slug)
  ) as {
    data: Contract
    isLoading: boolean
  }

  if (isLoading) return <PageLoading />

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          {/* <TranslatableButton
            href={routes.scm.procurement.suppliers.editSupplier(
              Number(params.id)
            )}
            icon={<PencilIcon className="h-[17px] w-[17px]" />}
            variant="outline"
          /> */}
          <Button onClick={() => router.back()}>{t("text-back")}</Button>
        </div>
      </PageHeader>
      <ContractForm initialData={contractData} isViewForm={true} />
    </>
  )
}
