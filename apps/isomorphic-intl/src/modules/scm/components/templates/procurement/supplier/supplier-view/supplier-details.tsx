"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useMemo } from "react";



import { useTranslations } from "next-intl";



import PageHeader from "@/components/base/page-header";
import Spinner from "@/components/base/spinner";
import PencilIcon from "@/components/icons/pencil";
import { Button } from "@/components/ui";
import { routes } from "@/config/routes";
import TranslatableButton from "@/modules/fms/components/base/translatable-button";
import SupplierDetailsNav from "@/modules/scm/components/containers/procurement/supplier/supplier-view";
import SupplierProfileHeader from "@/modules/scm/components/containers/procurement/supplier/supplier-view/profile-header";
import { useSupplierById } from "@/modules/scm/hooks/procurement/supplier/use-supplier";
import { Supplier } from "@/modules/scm/types/procurement/supplier/supplier-types";
import PageLoading from "@/modules/scm/components/base/page-loading";





export const pageHeader = {
  title: "text-supplier-list",
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
    },
  ],
}

export default function SupplierDetails() {
  const router = useRouter()
  const params = useParams()
  const t = useTranslations("common")

  const {
    data: supplier,
    isLoading,
    isError,
  } = useSupplierById(Number(params.id))

  if (isLoading) {
    return <PageLoading />
  }

  if (isError) {
    return <div>Error loading supplier data.</div>
  }

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.scm.procurement.suppliers.editSupplier(
              Number(params.id)
            )}
            icon={<PencilIcon className="h-[17px] w-[17px]" />}
            variant="outline"
          />
          <Button onClick={() => router.back()}>{t("text-back")}</Button>
        </div>
      </PageHeader>

      <SupplierProfileHeader supplier={supplier as Supplier} />
      <SupplierDetailsNav supplierData={supplier as Supplier} />
    </>
  )
}