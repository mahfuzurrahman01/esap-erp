"use client"

import Link from "next/link"

import { useTranslations } from "next-intl"
import { Empty, Text } from "rizzui"

import PdfIcon from "@/components/icons/pdf-icon"
import { Button, Input } from "@/components/ui"
import Box from "@/components/ui/box"
import { Contract } from "@/modules/scm/types/procurement/supplier/contract-types"

import { getStatusBadge } from "./status-option"

export default function ContractView({
  contractData,
}: {
  contractData: Contract
}) {
  const t = useTranslations("form")
  return (
    <Box className="p-6">
      <div className="grid grid-cols-3 gap-6">
        <Input
          label={t("form-contract-name")}
          value={contractData?.contractName}
          disabled
        />
        <Input
          label={t("form-supplier-name")}
          value={contractData?.supplierName}
          disabled
        />
        <Input
          label={t("form-start-date")}
          value={contractData?.startDate?.split("T")[0] || "-"}
          disabled
        />
        <Input
          label={t("form-end-date")}
          value={contractData?.endDate?.split("T")[0] || "-"}
          disabled
        />
        <Input
          label={t("form-payment-terms")}
          value={contractData?.paymentTerms}
          disabled
        />
        <Input
          label={t("form-currency")}
          value={contractData?.currencyName}
          disabled
        />
        <Input
          label={t("form-contract-value")}
          value={contractData?.contractValue}
          disabled
        />
        <div>
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {t("form-status")}
          </Text>
          <Text className="mt-4 font-bold">
            {getStatusBadge(
              contractData?.status === false ? "inactive" : "active"
            )}
          </Text>
        </div>
        <div className="col-span-2 flex items-center justify-between rounded-lg">
          {contractData?.contractDocumentUrl === "" ? (
            <Empty text="No Data" textClassName="mt-2" />
          ) : (
            <>
              <div className="flex items-center">
                <PdfIcon className="mr-2 h-8 w-8" />
                <Text className="font-base text-gray-900 dark:text-gray-0">
                  {t("form-document")}
                </Text>
              </div>
              <Button variant="outline">
                <Link href={contractData?.contractDocumentUrl || ""} download>
                  {t("form-download")}
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </Box>
  )
}
