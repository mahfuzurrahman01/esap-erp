"use client";
import { leadStatusOptions, ratingOptions } from "@/data/crm/leads";
import { useUserById } from "@/hooks/auth/use-user";
import { UserList } from "@/types/auth";
import { useTranslations } from "next-intl";
import React from "react";
import { Text } from "rizzui";
import { CampaignsTable } from "./campaigns-table";
import { MeetingsTable } from "./meetings-table";
import { EmailsTable } from "./emails-table";
import { ContactsTable } from "./contacts-table";
import { TasksTable } from "./tasks-table";
import CountryCell from "../quotation/country-cell";

export default function LeadDetailsContainer({
  leadData,
}: {
  leadData?: any;
}) {
  const t = useTranslations("crm");

  const { data } = useUserById(leadData?.owner) as {
    data: { data: UserList } | undefined
    isLoading: boolean
  }
  const ownerName = data?.data?.firstName
  const rating = ratingOptions.find((option) => option.value === leadData?.rating)?.label || leadData?.rating
  const statusName = leadStatusOptions.find((option) => option.value === leadData?.status)?.label || leadData?.status

  const fields = [
    { label: t("text-first-name"), value: leadData?.firstName },
    { label: t("text-last-name"), value: leadData?.lastName },
    { label: t("text-email"), value: leadData?.email },
    { label: t("text-company"), value: leadData?.company },
    { label: t("text-phone"), value: leadData?.phone },
    { label: t("text-description"), value: leadData?.description },
    { label: t("text-industry"), value: leadData?.industry },
    { label: t("text-status"), value: statusName },
    { label: t("text-rating"), value: rating },
    { label: t("text-owner"), value: ownerName },
    { label: t("text-title"), value: leadData?.title },
    { label: t("text-cost"), value: leadData?.cost },
    { label: t("text-fax"), value: leadData?.fax },
    { label: t("text-website"), value: leadData?.website },
    { label: t("text-skype-id"), value: leadData?.skypeId },
    { label: t("text-secondary-email"), value: leadData?.secondaryEmail },
    { label: t("text-twitter"), value: leadData?.twitter },
  ];

  // Group fields into pairs
  const groupedFields = [];
  for (let i = 0; i < fields.length; i += 2) {
    groupedFields.push(fields.slice(i, i + 2));
  }

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
        <div className="font-semibold py-8">
          <Text className="text-base font-medium text-black dark:text-gray-100">
            {t("text-address")}
          </Text>
          <br />
          <table className="w-full">
            <tbody>
              {[
                [
                  { label: t("text-street"), value: leadData?.street },
                  { label: t("text-house"), value: leadData?.house },
                ],
                [
                  { label: t("text-zip"), value: leadData?.zip },
                  { label: t("text-state"), value: leadData?.state },
                ],
                [
                  { label: t("text-city"), value: leadData?.city },
                  { label: t("text-country"), value: leadData?.countryId ? <CountryCell countryId={leadData?.countryId} /> : "-"}
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
                      <td className="py-2">
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

        {leadData?.campaigns && (
          <CampaignsTable data={leadData} />
        )}

        {leadData?.meetings && (
          <MeetingsTable data={leadData} />
        )}
        
        {leadData?.tasks && (
          <TasksTable data={leadData} />
        )}
        
        {leadData?.contacts && (
          <ContactsTable data={leadData} />
        )}
        
        {leadData?.emailTrackings && (
          <EmailsTable data={leadData} />
        )}
      </div>
    </div>
  );
}