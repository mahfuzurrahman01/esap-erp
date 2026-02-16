"use client"


import PageHeader from "@/components/base/page-header"
import SalesOperationPlanList from "@/modules/scm/components/containers/demand-and-forecasting/sales-operation-plan/sales-operation-plan-list"

const pageHeader = {
  title: "text-sales-operation-planning-list",
  breadcrumb: [
    {
      name: "text-demand-forecasting",
    },
    {
      name: "text-sales-operation-planning-list",
    },
  ],
}

export default function SalesOperationPlanListPage() {

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          {/* <Link
            href={
              routes.scm.demandForecasting.salesOperationsPlan
                .createSalesOperationPlan
            }
            className="w-full @lg:w-auto">
            <Button as="span">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              {t("form-create")}
            </Button>
          </Link> */}
        </div>
      </PageHeader>
      <SalesOperationPlanList />
    </>
  )
}
