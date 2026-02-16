"use client"

import { useParams } from "next/navigation"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import PageLoading from "@/modules/scm/components/base/page-loading"
import SlaMonitoring from "@/modules/scm/components/containers/procurement/supplier/sla-monitoring"
import { useSLAMonitoringById } from "@/modules/scm/hooks/procurement/supplier/use-sla-monitoring"
import { ServiceLevelAgreementMonitoring } from "@/modules/scm/types/procurement/supplier/service-level-agreement-monitoring-types"

export default function EditSLAMonitoringPage() {
  const params = useParams()
  const pageHeader = {
    title: "text-sla-monitoring",
    breadcrumb: [
      {
        name: "text-procurement",
      },
      {
        name: "text-sla-monitoring",
        href: routes.scm.procurement.suppliers.slaMonitoring(
          Number(params?.params),
          Number(params?.supplierId)
        ), // Call the function with the appropriate parameter
      },
      {
        name: "text-sla-monitoring-edit",
      },
    ],
  }
  const {
    data: slaMonitoring,
    isLoading,
    isError,
  } = useSLAMonitoringById(Number(params?.params))

  if (isLoading) {
    return <PageLoading />
  }

  if (isError) {
    return <div>Error loading SLA Monitoring data.</div>
  }

  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}></PageHeader>

      <SlaMonitoring
        contractId={Number(params?.params)}
        initialData={slaMonitoring as ServiceLevelAgreementMonitoring}
        isEditForm={true}
      />
    </>
  )
}
