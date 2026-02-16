import React, { useEffect, useState } from "react"
import { useAnalyticLeadSummary, useCustomerOverview, useDealPipelineOverview, useLeadTargetOverview, useSalesRevenueOverview } from "@/modules/crm/hooks/use-dashboard-reports"
import PieMeter from "./pie-meter"
import OrgTopBar from "./org-top-bar"
import YearlyRevenue from "./yearly-revenue";
import MetricCard from "@core/components/cards/metric-card";
import ThreeMonthLeads from "./three-month-leads";
import LeadBySource from "./lead-by-source";
import ProfileSaleOverview from "./profile-sale-overview";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

type AnalyticLeadSummary = {
  leadsThisMonth: number;
  growthPercentage: number;
  lastMonthRelative: string;
};

type RevenueSummary = {
  revenueThisMonth: number;
  growthPercentage: number;
  lastMonthRelative: string;
};

type DealPipelineSummary = number;

type CustomerOverview = {
  customerThisMonth: number;
  growthPercentage: number;
  lastMonthRelative: string;
};

const OrganizationContainer = () => {
  const t = useTranslations("crm")
  const { data: leads } = useAnalyticLeadSummary() || {};
  const { data: revenue } = useSalesRevenueOverview() || {};
  const { data: dealPipeline } = useDealPipelineOverview() || {};
  const { data: customer } = useCustomerOverview() || {};
  const { data: leadTargetData, isLoading } : any = useLeadTargetOverview() || {};

  const analyticLeadSummary = leads?.data as AnalyticLeadSummary | undefined;
  const revenueSummary = revenue?.data as RevenueSummary | undefined;
  const dealPipelineSummary = dealPipeline?.data as DealPipelineSummary | undefined;
  const customerOverview = customer?.data as CustomerOverview | undefined;

  const [chartData, setChartData] = useState<{ name: string; value: number; fill: string }[]>([]);
  const [remaining, setRemaining] = useState(0);

  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    if (leadTargetData?.data) {
      const achieved = leadTargetData.data.leadsGenerated || 0;
      const target = 10
      const calculatedRemaining = target - achieved;

      const newData = [
        { name: "Leads", value: achieved, fill: "#a250ff" },
        { name: "Target", value: target, fill: isDark ? "#2e3842" : "#edeff1" },
      ];

      setChartData(newData);
      setRemaining(calculatedRemaining);
    }
  }, [leadTargetData]);

  return (
    <>
      <OrgTopBar
        analyticLeadSummary={analyticLeadSummary}
        revenueSummary={revenueSummary}
        dealPipelineSummary={dealPipelineSummary}
        customerOverview={customerOverview}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4">
        <PieMeter
          chartData={chartData}
          remaining={remaining}
        />
        <YearlyRevenue />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <MetricCard
          title={t("text-last-three-months-performance-monitor")}
          metric=""
          metricClassName="3xl:text-[22px]"
          className="w-full max-w-full justify-between border-none rounded-2xl !p-0"
          titleClassName="text-title px-6 pt-7 pb-1">
            <ThreeMonthLeads />
        </MetricCard>
        <MetricCard
          title={t("text-leads-by-source")}
          metric=""
          metricClassName="3xl:text-[22px]"
          className="w-full max-w-full justify-between border-none text-title rounded-2xl p-0 lg:p-0"
          titleClassName="text-title p-6">
            <LeadBySource />
        </MetricCard>
        <MetricCard
          title={t("text-profile-sale-overview")}
          metric=""
          metricClassName="3xl:text-[22px]"
          className="w-full max-w-full justify-between border-none rounded-2xl !p-0"
          titleClassName="text-title px-6 pt-7 pb-1">
            <ProfileSaleOverview />
        </MetricCard>
      </div>
    </>
  )
}

export default OrganizationContainer
