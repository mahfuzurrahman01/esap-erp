"use client"

import dayjs from "dayjs"
import { useTranslations } from "next-intl"

import PDFDocument, {
  PDFContainer,
  PDFGroup,
  PDFHeader,
  PDFItem,
} from "@/components/ui/pdf/pdf-document"
import { Invoice } from "@/modules/scm/types/procurement/invoice/invoice-types"

interface PreviewItemConfig {
  key: keyof Invoice
  label: string
  format?: (value: any) => string
  skip?: boolean
}

interface PDFLayoutProps {
  data?: Invoice
}

export default function PDFLayout({ data }: PDFLayoutProps) {
  const t = useTranslations("common")

  const previewItems: PreviewItemConfig[] = [
    { key: "supplierName", label: "text-supplier-name" },
    { key: "projectName", label: "text-project-name" },
    {
      key: "invoiceDate",
      label: "text-invoice-date",
      format: (value) => (value ? dayjs(value).format("DD-MM-YYYY") : "--"),
    },
    {
      key: "dueDate",
      label: "text-due-date",
      format: (value) => (value ? dayjs(value).format("DD-MM-YYYY") : "--"),
    },
    {
      key: "expectedDeliveryDate",
      label: "text-expected-delivery-date",
      format: (value) => (value ? dayjs(value).format("DD-MM-YYYY") : "--"),
    },
    { key: "companyName", label: "text-company-name" },
    { key: "currencyName", label: "text-currency" },
    { key: "paymentStatus", label: "text-payment-status" },
    { key: "grandTotal", label: "text-grand-total" },
    { key: "netTotalAmount", label: "text-net-total-amount" },
    { key: "totalAdvance", label: "text-total-advance" },
    { key: "outstandingAmount", label: "text-outstanding-amount" },
    { key: "totalTax", label: "text-total-tax" },
  ]

  const renderPreviewItems = () => {
    return previewItems
      .filter((item) => {
        const value = data?.[item.key]
        return !Array.isArray(value) && value != null && value !== ""
      })
      .map((item) => (
        <PDFItem
          key={item.key}
          label={t(item.label)}
          value={
            item.format
              ? item.format(data?.[item.key])
              : (data?.[item.key] as string | number) || "--"
          }
        />
      ))
  }

  if (!data) return null

  return (
    <PDFDocument>
      <PDFContainer>
        <PDFHeader
          title={t("text-purchase-invoice")}
          subtitle={data.invoiceBillNo || ""}
        />

        <PDFGroup title={t("text-payment-details")}>
          {renderPreviewItems()}
        </PDFGroup>

        {(data.invoiceItemDtos?.length ?? 0) > 0 && (
          <PDFGroup title={t("text-item-details")}>
            {/* TODO: Implement PDF version of PaymentReferenceTable */}
          </PDFGroup>
        )}

        {(data.invoiceVatTaxDetails?.length ?? 0) > 0 && (
          <PDFGroup title={t("text-payment-tax-and-charge")}>
            {/* TODO: Implement PDF version of PaymentTaxAndChargeTable */}
          </PDFGroup>
        )}
        {(data.invoiceAdvancePayments?.length ?? 0) > 0 && (
          <PDFGroup title={t("text-payment-advance-payments")}>
            {/* TODO: Implement PDF version of PaymentTaxAndChargeTable */}
          </PDFGroup>
        )}
      </PDFContainer>
    </PDFDocument>
  )
}
