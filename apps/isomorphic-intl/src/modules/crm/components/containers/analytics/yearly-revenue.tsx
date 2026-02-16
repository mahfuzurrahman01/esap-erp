import React from "react";

import { useRevenueTargetOverview } from "@/modules/crm/hooks/use-dashboard-reports";
import { useTranslations } from "next-intl";
import { Progressbar } from "rizzui/progressbar";
import icDrive from "@public/auth/ic-app-onedrive.svg"
import Image from "next/image";

export default function YearlyRevenue() {
  const t = useTranslations("crm")
  const { data: revenueTargetData }: any = useRevenueTargetOverview() || {};
  const revenueTarget = revenueTargetData?.data;
  const achievedPercentage =
  revenueTarget?.target > 0
    ? Math.min((revenueTarget?.achieved / revenueTarget?.target) * 100, 100)
    : 0;
  return (
    <section className="border border-muted bg-paper dark:bg-paper mt-6 border-none col-span-2 rounded-2xl pt-12 px-6">
      <Image
        src={icDrive}
        alt="Logo"
        width={48}
        height={48}
        priority
        className="items-center object-cover text-center"
      />
      <h6 className="font-medium text-title py-6">{t("text-revenue-target-this-year")}</h6>
      <Progressbar
        value={Number(achievedPercentage.toFixed(2))}
        barClassName="bg-[#1c252e] dark:bg-white text-gray-100"
        className="gap-0"
        trackClassName="crm-dark-progress"
      />
      <div className="flex items-center gap-1 @[30rem]:gap-2 float-right mt-5">
        <span className="font-normal text-gray-500 dark:text-gray-600">
          {revenueTarget?.achieved ?? 0}
        </span><span className="text-title">/</span>
        <span className="font-semibold text-gray-900 dark:text-gray-300">
          {revenueTarget?.target ?? 0}
        </span>
      </div>
    </section>
  );
}