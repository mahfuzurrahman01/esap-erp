"use client"


import { useQueryParams } from "@/hooks/use-query-params"

import {
  useInvoiceMaterialCost,
  useMainStaticCard,
  useMonthlyForecast,
  useMostProducedProducts,
  useOtherStaticCard,
  useTopSupplier,
} from "../../hooks/dashboard/use-dashboard-reports"
import { MonthlyForecastQueryOptions } from "../../types/dashboard/monthly-forecast-types"
import Forecast from "../containers/dashboard/forecast"
import Intro from "../containers/dashboard/intro"
import InvoiceAndCostAmountReport from "../containers/dashboard/invoice-and-cost-amount-report"
import MostProducedProduct from "../containers/dashboard/most-produced-product"
import ReportState from "../containers/dashboard/report-state"
import TopSupplierList from "../containers/dashboard/top-supplier-list"
import StatCards from "../containers/dashboard/transaction-state"
import PageLoading from "../base/page-loading"

export default function SCMDashboard() {
  const { params, updateParams } = useQueryParams<MonthlyForecastQueryOptions>({
    params: [
      {
        key: "search",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "pageIndex",
        defaultValue: 1,
        parse: (value) => Number(value) || 1,
      },
      {
        key: "pageSize",
        defaultValue: 10,
        parse: (value) => Number(value) || 10,
      },
      {
        key: "forecastYear",
        defaultValue: "",
        parse: (value) => value || "",
      },
    ],
  })

  const { data: forecast, isLoading: forecastLoading } = useMonthlyForecast({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    forecastYear: params.forecastYear,
  })
  const { data: topSupplier, isLoading: topSupplierLoading } = useTopSupplier()
  const { data: invoiceMaterialCost, isLoading: invoiceMaterialCostLoading } =
    useInvoiceMaterialCost()
  const { data: mostProducedProducts, isLoading: mostProducedProductsLoading } =
    useMostProducedProducts()
  const { data: mainStaticCard, isLoading: mainStaticCardLoading } =
    useMainStaticCard()
  const { data: otherStaticCard, isLoading: otherStaticCardLoading } =
    useOtherStaticCard()

  if (
    forecastLoading ||
    topSupplierLoading ||
    invoiceMaterialCostLoading ||
    mostProducedProductsLoading ||
    mainStaticCardLoading ||
    otherStaticCardLoading
  ) {
    return <PageLoading />
  }

  return (
    <>
      <div className="flex flex-col gap-5 pb-10 @container 2xl:gap-x-6 2xl:gap-y-7">
        <div className="grid grid-cols-12 @4xl:grid-cols-12 2xl:gap-x-5 2xl:gap-y-7">
          <Intro />
          <div className="col-span-full @4xl:col-span-7">
            <Forecast
              className="rounded-lg !border-none p-5"
              data={forecast ?? []}
              params={params}
              updateParams={updateParams}
            />
          </div>
          <div className="col-span-full flex flex-col gap-5 @3xl:col-span-5 @3xl:flex-row @4xl:col-span-5 @4xl:flex-row">
            <InvoiceAndCostAmountReport
              className="w-full !border-none px-5 col-span-full @4xl:col-span-5"
              data={invoiceMaterialCost ?? []}
            />
            <TopSupplierList
              className="w-full !border-none px-5 col-span-full @4xl:col-span-5"
              data={topSupplier ?? []}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-5 @4xl:grid-cols-12 2xl:gap-x-6 2xl:gap-y-7">
          <div className="col-span-full @3xl:col-span-4">
            <ReportState className="border-none" data={otherStaticCard ?? []} />
          </div>
          <div className="col-span-full @3xl:col-span-8 flex flex-col gap-5 @3xl:flex-row @4xl:flex-row">
            <StatCards
              className="border-none px-5 col-span-full @3xl:col-span-1/3 @3xl:px-0 @4xl:col-span-1/3 @4xl:px-0 mt-5"
              data={mainStaticCard ?? []}
            />
            <MostProducedProduct
              className="w-full !border-none px-5 col-span-full @3xl:w-1/3 @3xl:px-0 @4xl:w-1/3 @4xl:px-0"
              data={mostProducedProducts ?? []}
            />
          </div>
        </div>
      </div>
    </>
  )
}
