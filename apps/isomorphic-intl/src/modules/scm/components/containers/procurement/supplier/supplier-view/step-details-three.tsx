"use client"

import Link from "next/link"
import React from "react"

import { useTranslations } from "next-intl"
import { Empty, Text } from "rizzui"

import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import PdfIcon from "@/components/icons/pdf-icon"
import { Button, Input } from "@/components/ui"
import { Supplier } from "@/modules/scm/types/procurement/supplier/supplier-types"

type indexProps = {
  supplierData: Supplier
  className?: string
}

export default function FinancialInfo({ supplierData }: indexProps) {
  const t = useTranslations("common")
  return (
    <FormGroupContainer>
      <FormGroup title={t("text-bank-account-details")}>
        <div>
          <Input
            label={t("text-bank-name")}
            value={supplierData?.supplierBankAccountDetailDto?.bankName}
            readOnly
            disabled
          />
        </div>
        <div>
          <Input
            label={t("text-bank-branch-name")}
            value={supplierData?.supplierBankAccountDetailDto?.branchName}
            readOnly
            disabled
          />
        </div>
        <div>
          <Input
            label={t("text-bank-account-holders-name")}
            value={
              supplierData?.supplierBankAccountDetailDto?.accountHolderName
            }
            readOnly
            disabled
          />
        </div>
        <div>
          <Input
            label={t("text-bank-account-number")}
            value={supplierData?.supplierBankAccountDetailDto?.accountNumber}
            readOnly
            disabled
          />
        </div>
        <div>
          <Input
            label={t("text-bank-country")}
            value={supplierData?.supplierBankAccountDetailDto?.countryName}
            readOnly
            disabled
          />
        </div>
        <div>
          <Input
            label={t("text-bank-address")}
            value={supplierData?.supplierBankAccountDetailDto?.address}
            readOnly
            disabled
          />
        </div>
        <div>
          <Input
            label={t("text-currency")}
            value={supplierData?.supplierBankAccountDetailDto?.currencyName}
            readOnly
            disabled
          />
        </div>
        <div>
          <Input
            label={t("text-routing-number")}
            value={supplierData?.supplierBankAccountDetailDto?.routingNumber}
            readOnly
            disabled
          />
        </div>

        <div className="col-span-full flex items-center justify-between rounded-lg">
          {supplierData?.supplierBankAccountDetailDto
            ?.accountVerificationDocument === "" ? (
            <Empty text="No Data" textClassName="mt-2" />
          ) : (
            <>
              <div className="flex items-center">
                <PdfIcon className="mr-2 h-8 w-8" />
                <Text className="font-base text-gray-900 dark:text-gray-0">
                  {t("text-document")}
                </Text>
              </div>
              <Button variant="outline">
                <Link
                  href={
                    supplierData?.supplierBankAccountDetailDto
                      ?.accountVerificationDocument || ""
                  }
                  download>
                  {t("text-download")}
                </Link>
              </Button>
            </>
          )}
        </div>
      </FormGroup>
    </FormGroupContainer>
  )
}
