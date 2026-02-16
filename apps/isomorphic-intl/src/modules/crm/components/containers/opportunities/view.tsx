"use client";
import { useCustomerById } from "@/modules/crm/hooks/use-customers";
import { useUserById } from "@/hooks/auth/use-user";
import { CustomerData } from "@/modules/crm/types/customer";
import { useTranslations } from "next-intl";
import React from "react";
import { Text } from "rizzui";
import { ContactsTable } from "./contacts-table";
import { EmailsTable } from "../lead/emails-table";
import { MeetingsTable } from "./meetings-table";
import { TasksTable } from "./tasks-table";
import { formatDate } from "@/utils/format-date";

export default function OpportunityDetailsContainer({
  opportunityData,
}: {
  opportunityData?: any;
}) {
  const t = useTranslations("crm");
  const { data } = useUserById(opportunityData?.dealOwner) as {
    data: { data: { firstName: string; lastName: string } } | undefined;
    isLoading: boolean;
  };
  const dealOwnerName = `${data?.data?.firstName || ""} ${data?.data?.lastName || ""}`.trim();

  const { data: customerData } = useCustomerById(opportunityData?.customerId) as {
    data: CustomerData | undefined
    isLoading: boolean
  }

  const fields = [
    { label: t("text-id"), value: opportunityData?.shortOrder },
    { label: t("text-customer"), value: customerData?.firstName },
    { label: t("text-name"), value: opportunityData?.name },
    { label: t("text-amount"), value: opportunityData?.amount },
    { label: t("text-type"), value: opportunityData?.type },
    { label: t("text-closing-date"), value: opportunityData?.closingDate ? formatDate(opportunityData?.closingDate, "DD/MM/YYYY") : "" },
    { label: t("text-primary-contact"), value: opportunityData?.primaryContact },
    { label: t("text-stage"), value: opportunityData?.stage },
    { label: t("text-description"), value: opportunityData?.description },
    { label: t("text-expected-revenue"), value: opportunityData?.forecastedRevenue },
    { label: t("text-probability"), value: opportunityData?.probability },
    { label: t("text-deal-owner"), value: dealOwnerName },
    { label: t("text-lead-source"), value: opportunityData?.leadSource },
    { label: t("text-next-step"), value: opportunityData?.nextStep },
    { label: t("text-description"), value: opportunityData?.description },
  ];

  // Group fields into pairs for display
  const groupedFields = [];
  for (let i = 0; i < fields.length; i += 2) {
    groupedFields.push(fields.slice(i, i + 2));
  }

  return (
    <div className="card-shadow mx-auto w-full max-w-[210mm] mb-8">
      <div
        className="min-h-[297mm] w-[210mm] shadow-sm dark:!text-gray-900 divide-y divide-dashed divide-gray-500/20 p-6"
        style={{ margin: "0 auto" }}
      >
        <div className="font-semibold pb-8">
          <Text className="text-base font-medium text-black dark:text-gray-100">
            {t("text-information")}
          </Text>
          <br />
          <table className="w-full">
            <tbody>
              {groupedFields.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((field, fieldIndex) => (
                    <React.Fragment key={fieldIndex}>
                      <td className="py-2 w-1/4">
                        <p className="font-medium text-[#919EAB]">{field.label}:</p>
                      </td>
                      <td className="py-2 w-1/4">
                        <p className="font-medium text-black dark:text-gray-100">
                          {field.value || "-"}
                        </p>
                      </td>
                    </React.Fragment>
                  ))}
                  {row.length < 2 && (
                    <>
                      <td className="py-2 w-1/4"></td>
                      <td className="py-2 w-1/4"></td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {opportunityData?.meetings && (
          <MeetingsTable data={opportunityData} />
        )}
        {opportunityData?.tasks && (
          <TasksTable data={opportunityData} />
        )}
        {opportunityData?.contacts && (
          <ContactsTable data={opportunityData} />
        )}
        {opportunityData?.emailTrackings && (
          <EmailsTable data={opportunityData} />
        )}
      </div>
    </div>
  );
}