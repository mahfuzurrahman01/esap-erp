"use client";
import { useTranslations } from "next-intl";
import React from "react";
import { Text } from "rizzui";
import { LeadsTable } from "./leads-table";
import { CustomersTable } from "./customers-table";
import { OpportunitiesTable } from "./opportunities-table";
import { MeetingsTable } from "./meetings-table";
import { TasksTable } from "../opportunities/tasks-table";
import { ContactsTable } from "./contacts-table";
import { formatDate } from "@/utils/format-date";

export default function CampaignDetailsContainer({
  campaignData,
}: {
  campaignData?: any;
}) {
  const t = useTranslations("crm");
  return (
    <div className="card-shadow mx-auto w-full max-w-[210mm] mb-8">
      <div
        className="min-h-[297mm] w-[210mm shadow-sm dark:!text-gray-900 divide-y divide-dashed divide-gray-500/20 p-6"
        style={{ margin: "0 auto" }}
      >
        <div className="font-semibold pb-8">
          <Text className="text-base font-medium text-black dark:text-gray-100">
            {t("text-information")}
          </Text>
          <br />
          <table className="w-full">
            <tbody>
              {[
                [
                  {
                    label: t("text-company"),
                    value: campaignData?.company,
                  },
                  { label: t("text-service"), value: campaignData?.service },
                ],
                [
                  {
                    label: t("text-start-date"),
                    value: campaignData?.startDate ? formatDate(campaignData?.startDate, "DD/MM/YYYY") : ""
                  },
                  {
                    label: t("text-end-date"),
                    value: campaignData?.endDate ? formatDate(campaignData?.endDate, "DD/MM/YYYY") : ""
                  },
                ],
                [
                  { label: t("text-source"), value: campaignData?.source },
                  { label: t("text-type"), value: campaignData?.type },
                ],
                [
                  {
                    label: t("text-budgeted-cost"),
                    value: campaignData?.budgetedCost,
                  },
                  { label: t("text-id"), value: campaignData?.shortOrder },
                ],
                [
                  { label: t("text-description"), value: campaignData?.description },
                  { label: t("text-primary-contact"), value: campaignData?.primaryContact },
                ],
              ].map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((item, index) => (
                    <React.Fragment key={index}>
                      <td className="py-2">
                        <p className="font-medium text-[#919EAB]">
                          {item.label}:
                        </p>
                      </td>
                      <td className="py-2 w-[30%]">
                        <p className="font-medium text-black dark:text-gray-100">
                          {item.value || "-"}
                        </p>
                      </td>
                    </React.Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {campaignData?.leads && (
          <LeadsTable data={campaignData} />
        )}
        
        {campaignData?.customers && (
          <CustomersTable data={campaignData} />
        )}
        
        {campaignData?.opportunities && (
          <OpportunitiesTable data={campaignData} />
        )}
        
        {campaignData?.meetings && (
          <MeetingsTable data={campaignData} />
        )}
        
        {campaignData?.tasks && (
          <TasksTable data={campaignData} />
        )}
        
        {campaignData?.contacts && (
          <ContactsTable data={campaignData} />
        )}

      </div>
    </div>
  );
}