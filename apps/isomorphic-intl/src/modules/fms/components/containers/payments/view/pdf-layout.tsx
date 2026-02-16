"use client"

import { useTranslations } from "next-intl"
import dayjs from "dayjs"

import PDFDocument, {
  PDFContainer,
  PDFHeader,
  PDFGroup,
  PDFItem,
} from "@/components/ui/pdf/pdf-document"
import { PaymentList } from "@/modules/fms/types"

interface PreviewItemConfig {
  key: string
  label: string
  format?: (value: any) => string
  skip?: boolean
}

interface PDFLayoutProps {
  data?: PaymentList
}

// Helper function to get nested values
function getNestedValue(obj: any, path: string) {
  return path.split('.').reduce((o, i) => o?.[i], obj)
}

export default function PDFLayout({ data }: PDFLayoutProps) {
  const t = useTranslations("common")

  const previewItems: PreviewItemConfig[] = [
    { key: "transactionType", label: "text-transaction-type" },
    { key: "postingDate", label: "text-transaction-date", format: (value) => value ? dayjs(value).format("DD-MM-YYYY") : "--" },
    { key: "companyBankAccount.accountName", label: "text-company-bank-account" },
    { key: "modeOfPayment.modeOfPaymentName", label: "text-mode-of-payment" },
    { key: "partyType", label: "text-party-type" },
    { key: "partyName", label: "text-party-name" },
    { key: "partyBankAccount.accountName", label: "text-party-bank-account" },
    { key: "fromCurrency.currencyName", label: "text-from-currency" },
    { key: "toCurrency.currencyName", label: "text-to-currency" },
    { key: "referenceNumber", label: "text-reference-number" },
    {
      key: "referenceDate",
      label: "text-reference-date",
      format: (value) => value ? dayjs(value).format("DD-MM-YYYY") : "--"
    },
    { key: "paymentStatus", label: "text-status" },
    { key: "paymentAmount", label: "text-amount" },
    { key: "unallocatedAmount", label: "text-unallocated-amount" },
    { key: "totalTax", label: "text-total-tax" },
  ]

  const renderPreviewItems = () => {
    return previewItems
      .filter(item => {
        const value = getNestedValue(data, item.key)
        return !Array.isArray(value) && value != null && value !== ''
      })
      .map(item => (
        <PDFItem
          key={item.key}
          label={t(item.label)}
          value={
            item.format
              ? item.format(getNestedValue(data, item.key))
              : (getNestedValue(data, item.key) as string | number) || "--"
          }
        />
      ))
  }

  if (!data) return null

  return (
    <PDFDocument>
      <PDFContainer>
        <PDFHeader
          title={t("text-payment-entry")}
          subtitle={data.paymentNo || ""}
        />

        <PDFGroup title={t("text-payment-details")}>
          {renderPreviewItems()}
        </PDFGroup>

        {(data.paymentReferences?.length ?? 0) > 0 && (
          <PDFGroup title={t("text-payment-reference")}>
            {/* TODO: Implement PDF version of PaymentReferenceTable */}
          </PDFGroup>
        )}

        {(data.paymentTaxCharges?.length ?? 0) > 0 && (
          <PDFGroup title={t("text-payment-tax-and-charge")}>
            {/* TODO: Implement PDF version of PaymentTaxAndChargeTable */}
          </PDFGroup>
        )}

        {(data.paymentDeductionAndLosses?.length ?? 0) > 0 && (
          <PDFGroup title={t("text-payment-deduction-and-loss")}>
            {/* TODO: Implement PDF version of DeductionsOrLossTable */}
          </PDFGroup>
        )}
      </PDFContainer>
    </PDFDocument>
  )
}
