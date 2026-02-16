"use client"

import cn from "@core/utils/class-names"
import { useTranslations } from "next-intl"

import Box from "@/components/ui/box"
import BoxContainer from "@/components/ui/box-container"
import BoxGroup from "@/components/ui/box-group"
import { BankAccountList } from "@/modules/fms/types"

export default function BankAccountInformation({
  data,
}: {
  data: BankAccountList
}) {
  const t = useTranslations("common")
  return (
    <Box className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11">
      <BoxContainer>
        <BoxGroup
          title={t("text-bank-account-information")}
          childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12 pt-4">
          <ul className="grid grid-cols-3 gap-y-3">
            <BankAccountInformationItem
              label={t("text-bank-account-name")}
              value={data?.accountName || "--"}
            />
            <BankAccountInformationItem
              label={t("text-bank-account-type")}
              value={data?.bankAccountType?.bankAccountTypeName || "--"}
            />
            <BankAccountInformationItem
              label={t("text-bank-name")}
              value={data?.bank?.bankName || "--"}
            />
            <BankAccountInformationItem
              label={t("text-bank-account-number")}
              value={data?.accountNumber || "--"}
            />
            <BankAccountInformationItem
              label={t("text-bank-iban")}
              value={data?.iban || "--"}
            />
            <BankAccountInformationItem
              label={t("text-bank-company-name")}
              value={data?.company?.companyName || "--"}
            />
            <BankAccountInformationItem
              label={t("text-is-active")}
              value={data?.isActive ? "Yes" : "No"}
            />
            <BankAccountInformationItem
              label={t("text-bank-is-default")}
              value={data?.isDefaultAccount ? "Yes" : "No"}
            />
          </ul>
        </BoxGroup>
        <BoxGroup
          title={t("text-party-details")}
          className="pt-7 @2xl:pt-9 @3xl:pt-11"
          childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12 pt-4">
          <ul className="grid grid-cols-3 gap-y-3">
            <BankAccountInformationItem
              label={t("text-party-name")}
              value={data?.partyType || "--"}
            />
            {data?.supplierName && (
              <BankAccountInformationItem
                label={t("text-supplier-name")}
                value={data?.supplierName || "--"}
              />
            )}
            {data?.customerName && (
              <BankAccountInformationItem
                label={t("text-customer-name")}
                value={data?.customerName || "--"}
              />
            )}
          </ul>
        </BoxGroup>
      </BoxContainer>
    </Box>
  )
}

function BankAccountInformationItem({
  label,
  value,
  className,
}: {
  label: string
  value: string
  className?: string
}) {
  return (
    <li className={cn("grid grid-cols-2", className)}>
      <span className="text-sm text-body">{label} :</span>
      <span className="text-sm font-semibold text-title">{value || "--"}</span>
    </li>
  )
}
