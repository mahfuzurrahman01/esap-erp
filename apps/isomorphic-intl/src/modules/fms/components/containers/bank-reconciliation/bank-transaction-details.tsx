"use client"

import dayjs from "dayjs"
import { useTranslations } from "next-intl"

import FormGroup from "@/components/base/form-group"
import Input from "@/components/ui/input"
import { BankTransactionList } from "@/modules/fms/types/bank-transaction"

export default function BankTransactionDetails({
  data,
}: {
  data: BankTransactionList
}) {
  const t = useTranslations("form")
  return (
    <FormGroup
      title={t("form-details")}
      className="pt-7 @2xl:pt-9 @3xl:pt-11"
      childrenContainerClassName="grid-cols-1 lg:grid-cols-2 @4xl:col-span-12">
      <Input
        type="text"
        label={t("form-transaction-date")}
        placeholder={t("form-enter-transaction-date")}
        value={dayjs(data.transactionDate).format("DD-MM-YYYY")}
        disabled
      />
      <Input
        type="text"
        label={t("form-transaction-code")}
        placeholder={t("form-enter-transaction-code")}
        value={data.bankTransactionCode}
        disabled
      />
      <Input
        type="text"
        label={t("form-transaction-type")}
        placeholder={t("form-enter-transaction-type")}
        value={data.transactionType}
        disabled
      />
      <Input
        type="text"
        label={t("form-amount")}
        placeholder={t("form-enter-amount")}
        value={data.amount ?? 0}
        disabled
      />
      <Input
        type="text"
        label={t("form-description")}
        placeholder={t("form-enter-description")}
        value={data.description}
        disabled
      />
      <Input
        type="text"
        label={t("form-allocated-amount")}
        placeholder={t("form-enter-allocated-amount")}
        value={data.totalAllocatedAmount}
        disabled
      />
      <Input
        type="text"
        label={t("form-unallocated-amount")}
        placeholder={t("form-enter-unallocated-amount")}
        value={data.totalUnAllocatedAmount}
        disabled
      />
    </FormGroup>
  )
}