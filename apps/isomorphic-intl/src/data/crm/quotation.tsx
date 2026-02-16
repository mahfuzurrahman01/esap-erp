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
export const opportunityOptions = [
  { label: "Opportunity 1", value: "Opportunity 1" },
  { label: "Opportunity 2", value: "Opportunity 2" },
  { label: "Opportunity 3", value: "Opportunity 3" },
]
export const customerOptions = [
  { label: "Customer 1", value: "Customer 1" },
  { label: "Customer 2", value: "Customer 2" },
  { label: "Customer 3", value: "Customer 3" },
]
export const invoiceOptions = [
  { label: "Invoice 1", value: "Invoice 1" },
  { label: "Invoice 2", value: "Invoice 2" },
  { label: "Invoice 3", value: "Invoice 3" },
]
export const paymentTermOptions = [
  { label: "Net 30 (Payment in 30 Days)", value: "net_30" },
  { label: "Net 15 (Payment in 15 Days)", value: "net_15" },
  { label: "Due on Receipt", value: "due_on_receipt" },
  { label: "2/10 Net 30 (2% Discount Within 10 Days)", value: "2_10_net_30" },
  { label: "50% Upfront, 50% Upon Completion", value: "50_50" },
  { label: "30/30/40 Milestone Payment", value: "30_30_40" },
  { label: "Monthly Payment", value: "monthly" },
  { label: "Quarterly Payment", value: "quarterly" },
  { label: "Others", value: "others" },
]
export const quotationTypes = [
  { label: "Product", value: "Product" },
  // { label: "Opportunity", value: "Opportunity" },
  { label: "Service", value: "Service" },
  { label: "Others", value: "Others" },
]
export const priceListOptions = [
  { label: "Standard Buying", value: 1 },
]
export const priorityOptions = [
  { label: "High", value: "High" },
  { label: "Medium", value: "Medium" },
  { label: "Low", value: "Low" },
  { label: "Optional", value: "Optional" },
]
export const salesOrderTypes = [
  // { label: "Opportunity", value: "Opportunity" },
  { label: "Product", value: "Product" },
  { label: "Service", value: "Service" },
  { label: "Others", value: "Others" },
]
export const stagesOptions = [
  { label: "Stage 1", value: "Stage 1" },
  { label: "Stage 2", value: "Stage 2" },
  { label: "Stage 3", value: "Stage 3" },
]
export const soStatusOptions = [
  {
    value: "Draft",
    label: "Draft",
  },
  {
    value: "Submitted",
    label: "Submitted",
  },
]

export const statusOptions = [
  {
    value: "Draft",
    label: "Draft",
  },
  {
    value: "Enable",
    label: "Enable",
  },
  {
    value: "Overdue",
    label: "Overdue",
  },
  {
    value: "Paid",
    label: "Paid",
  },
  {
    value: "Return",
    label: "Return",
  },
  {
    value: "Disable",
    label: "Disable",
  },
]
export const courierOptions = [
  { label: "Aramex", value: "Aramex" },
  { label: "SMSA Express", value: "SMSA Express" },
  { label: "Saudi Post (SPL)", value: "Saudi Post" },
  { label: "DHL Express", value: "DHL Express" },
  { label: "FedEx", value: "FedEx" },
  { label: "UPS", value: "UPS" },
  { label: "Zajil Express", value: "Zajil Express" },
  { label: "Naqel Express", value: "Naqel Express" },
  { label: "Shipa Delivery", value: "Shipa Delivery" },
  { label: "Fetchr", value: "Fetchr" },
  { label: "Careem Delivery", value: "Careem Delivery" },
  { label: "Tajawal Express", value: "Tajawal Express" },
  { label: "Others", value: "Others" },
]
export const unitOptions = [
  { value: "pcs", label: "Pieces" },
  { value: "kg", label: "Kilograms" },
  { value: "ltr", label: "Liters" },
  { value: "box", label: "Box" },
  { value: "set", label: "Set" },
]
export const paymentMethods = [
  { value: "Mada", label: "Mada" },
  { value: "STC Pay", label: "STC Pay" },
  { value: "Sadad", label: "Sadad" },
  { value: "PayPal", label: "PayPal" },
  { value: "Stripe", label: "Stripe" },
  { value: "Visa", label: "Visa" },
  { value: "Mastercard", label: "Mastercard" },
  { value: "Apple Pay", label: "Apple Pay" },
  { value: "Google Pay", label: "Google Pay" },
  { value: "Bank Transfer", label: "Bank Transfer" },
  { value: "Cash on Delivery", label: "Cash on Delivery" },
  { value: "American Express", label: "American Express" },
  { value: "Klarna", label: "Klarna" },
  { value: "Afterpay", label: "Afterpay" },
  { value: "Amazon Pay", label: "Amazon Pay" },
  { value: "Others", label: "Others" },
]
export const currencyOptions = [
  { value: "SAR", label: "Saudi Riyal (SAR)" },
  { value: "USD", label: "US Dollar (USD)" },
  { value: "EUR", label: "Euro (EUR)" },
  { value: "AED", label: "UAE Dirham (AED)" },
  { value: "GBP", label: "British Pound (GBP)" },
  { value: "INR", label: "Indian Rupee (INR)" },
  { value: "PKR", label: "Pakistani Rupee (PKR)" },
  { value: "EGP", label: "Egyptian Pound (EGP)" },
  { value: "QAR", label: "Qatari Riyal (QAR)" },
  { value: "KWD", label: "Kuwaiti Dinar (KWD)" },
  { value: "BHD", label: "Bahraini Dinar (BHD)" },
  { value: "OMR", label: "Omani Rial (OMR)" },
]
export const applyDiscountOptions = [
  { label: "Grand Total", value: "Grand Total" },
  { label: "Net Total", value: "Net Total" },
]
export const discountTypeOptions = [
  { label: "Percentage", value: "Percentage" },
  { label: "Flat", value: "Flat" },
]
