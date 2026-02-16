import { SalesOrder } from "@/modules/crm/types/sales-order"

export const initialValue = {
  id: 0,
  opportunity: "",
  customer: "",
  quotation_prefix: "",
  quotation_no: "",
  billing_address: "",
  shipping_address: "",
  expiry_date: "",
  payment_terms: "",
  type: "",
  courier: "",
  stages: "",
  status: "",
  quotationDetails: [
    {
      id: 1,
      sn: 1,
      product: "",
      quantity: "",
      unit_price: "",
      vat: "",
      tax: "",
      discount: "",
    },
  ],
}
export const quotationOptions = [
  { label: "Quotation 1", value: "Quotation 1" },
  { label: "Quotation 2", value: "Quotation 2" },
  { label: "Quotation 3", value: "Quotation 3" },
]
export const customerOptions = [
  { label: "Customer 1", value: "Customer 1" },
  { label: "Customer 2", value: "Customer 2" },
  { label: "Customer 3", value: "Customer 3" },
]
export const paymentTermOptions = [
  { label: "Customer 1", value: "Customer 1" },
  { label: "Customer 2", value: "Customer 2" },
  { label: "Customer 3", value: "Customer 3" },
]
export const typeOptions = [
  { label: "Product", value: "Product" },
  { label: "Service", value: "Service" },
]
export const stagesOptions = [
  { label: "Stage 1", value: "Stage 1" },
  { label: "Stage 2", value: "Stage 2" },
  { label: "Stage 3", value: "Stage 3" },
]
export const statusOptions = [
  { label: "Status 1", value: "Status 1" },
  { label: "Status 2", value: "Status 2" },
  { label: "Status 3", value: "Status 3" },
]
export const courierOptions = [
  { label: "Courier 1", value: "Courier 1" },
  { label: "Courier 2", value: "Courier 2" },
  { label: "Courier 3", value: "Courier 3" },
]

export const getDefaultValues = (
  salesOrderData: SalesOrder,
  quotationIdFromParams: string
) => ({
  type: salesOrderData?.type || "",
  customerId: salesOrderData?.customerId || "",
  salesOrderNo: salesOrderData?.salesOrderNo || "",
  quotationId: quotationIdFromParams || salesOrderData?.quotationId,
  deliveryDate: salesOrderData?.prefix || "",
  quotationNo: salesOrderData?.quotationNo || "",
  title: salesOrderData?.title || "",
  description: salesOrderData?.description || "",
  billingAddress: salesOrderData?.billingAddress || "",
  shippingAddress: salesOrderData?.shippingAddress || "",
  postingDate: salesOrderData?.expireDate || "",
  payment_terms: salesOrderData?.paymentTerms || "",
  company: salesOrderData?.deliveryStatus || "",
  currencyId: salesOrderData?.warehouseId || "",
  updateStock: salesOrderData?.updateStock || false,
  stages: salesOrderData?.stages || "",
})
