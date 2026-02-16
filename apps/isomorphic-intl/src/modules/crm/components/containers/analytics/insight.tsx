import React from "react"
import { useDealPipelineOverview } from "@/modules/crm/hooks/use-dashboard-reports"
import MetricCard from "@core/components/cards/metric-card";
import InsightTopBar from "./insight-top-bar";
import RevenueByUser from "./revenue-by-user";
import DealByStage from "./deal-by-stage";
import OpenAmountByUser from "./open-amount-by-user";
import AmountByStage from "./amount-by-stage";
import AmountBySource from "./amount-by-source";
import { useTranslations } from "next-intl";

type DealPipelineSummary = number;

const InsightContainer = () => {
  const t = useTranslations("crm")
  const { data: dealPipeline } = useDealPipelineOverview() || {};

  const dealPipelineSummary = dealPipeline?.data as DealPipelineSummary | undefined;

  return (
    <>
      <InsightTopBar
        dealPipelineSummary={dealPipelineSummary}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title={t("text-revenue-by-users")}
          metric=""
          metricClassName="crm-card-value dark:text-gray-300 pt-4 pb-1"
          className="w-full max-w-full justify-between border-none rounded-2xl !p-0 mt-6"
          titleClassName="text-title px-6 pt-7 pb-1">
            <RevenueByUser />
        </MetricCard>
        <DealByStage />
        <MetricCard
          title={t("text-open-amount-by-users")}
          metric=""
          metricClassName="crm-card-value dark:text-gray-300 pt-4 pb-1"
          className="w-full max-w-full justify-between border-none rounded-2xl !p-0 mt-6"
          titleClassName="text-title px-6 pt-7 pb-1">
            <OpenAmountByUser />
        </MetricCard>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricCard
          title={t("text-open-amount-by-source")}
          metric=""
          metricClassName="crm-card-value dark:text-gray-300 pt-4 pb-1"
          className="w-full max-w-full justify-between border-none mt-6 rounded-2xl"
          titleClassName="text-title">
            <AmountBySource />
        </MetricCard>
        <MetricCard
          title={t("text-open-amount-by-stage")}
          metric=""
          metricClassName="crm-card-value dark:text-gray-300 pt-4 pb-1"
          className="w-full max-w-full justify-between border-none md:mt-6 rounded-2xl"
          titleClassName="text-title">
            <AmountByStage />
        </MetricCard>
      </div>
    </>
  )
}

export default InsightContainer
