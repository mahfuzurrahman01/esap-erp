import { useEffect, useState } from "react"

import dayjs from "dayjs"
import { useAtom } from "jotai"
import { SubmitHandler } from "react-hook-form"

import { useSalesInvoiceById } from "@/modules/crm/hooks"
import { useSalesInvoiceStatusUpdate } from "@/modules/crm/hooks/use-sales-invoice"
import { SalesInvoice } from "@/modules/crm/types/sales-invoice"
import {
  DEFAULT_DEDUCTION_LOSS,
  DEFAULT_PAYMENT_REFERENCE,
  DEFAULT_PAYMENT_VALUES,
  DEFAULT_TAX_CHARGE,
} from "@/modules/fms/constants/payment-constants"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import { partyTypeOptions } from "@/modules/fms/constants/shared-data-hook"
import {
  useCreatePayment,
  usePaymentById,
  useUpdatePayments,
} from "@/modules/fms/hooks/use-payments"
import {
  PartyType,
  selectedPartyTypeAtom,
} from "@/modules/fms/store/party-type-atom"
import {
  paymentAmountAtom,
  taxRowsAtom,
} from "@/modules/fms/store/payment-allocation"
import {
  PaymentType,
  selectedPaymentTypeAtom,
} from "@/modules/fms/store/payment-type-atom"
import { TaxType } from "@/modules/fms/store/tax-type-atom"
import { transactionTypeOptions } from "@/modules/fms/store/transaction-payment-type-atom"
import {
  PaymentDeductionAndLoss,
  PaymentList,
  PaymentReference,
  PaymentTaxAndCharge,
} from "@/modules/fms/types"
import { PaymentFormInput } from "@/modules/fms/validators/payment-schema"
import { usePayslipById } from "@/modules/hrms/hooks/payroll/use-payslip"
import { useUpdatePayslipStatus } from "@/modules/hrms/hooks/payroll/use-payslip"
import { useInvoiceById, usePatchInvoiceReceived } from "@/modules/scm/hooks"
import { Invoice } from "@/modules/scm/types/procurement/invoice/invoice-types"

interface UsePaymentFormProps {
  id?: number
  mode?: "create" | "edit" | "view"
  requestFor?: "HRMS" | "FMS" | "SCM" | "CRM"
}

export function usePaymentForm({
  id,
  mode = "create",
  requestFor = "FMS",
}: UsePaymentFormProps) {
  const isFieldDisabled = mode === "view"
  const [paymentReferences, setPaymentReferences] = useState<
    PaymentReference[]
  >([])
  const [paymentTaxCharges, setPaymentTaxCharges] = useState<
    PaymentTaxAndCharge[]
  >([])
  const [paymentDeductionAndLosses, setPaymentDeductionAndLosses] = useState<
    PaymentDeductionAndLoss[]
  >([])
  const [formValues, setFormValues] = useState(DEFAULT_PAYMENT_VALUES)
  const [selectedPaymentType, setSelectedPaymentType] = useAtom(
    selectedPaymentTypeAtom
  )
  const [selectedPartyType, setSelectedPartyType] = useAtom(
    selectedPartyTypeAtom
  )
  const [, setPaymentAmount] = useAtom(paymentAmountAtom)
  const [, setTaxRows] = useAtom(taxRowsAtom)

  const { supplier, customer, employee } = useSharedDataHooks([
    "supplier",
    "customer",
    "employee",
  ])

  const { data: paymentById, isLoading: isPaymentLoading } = usePaymentById(
    Number(id)
  )
  const { data: payslipById, isLoading: isPayslipLoading } = usePayslipById(
    Number(id)
  )

  const { data: invoiceById, isLoading: isInvoiceLoading } = useInvoiceById(
    Number(id)
  ) as {
    data: Invoice
    isLoading: boolean
  }

  const { data: salesInvoiceData, isLoading: isSalesInvoiceLoading } =
    useSalesInvoiceById(id) as {
      data: SalesInvoice
      isLoading: boolean
    }

  const { mutateAsync: updatePayslipStatus } = useUpdatePayslipStatus()

  const { mutateAsync: updateInvoiceStatus } = usePatchInvoiceReceived()

  const { mutateAsync: updateSalesInvoiceStatus } =
    useSalesInvoiceStatusUpdate()
  const {
    mutateAsync: createPayment,
    isPending: isCreatePaymentLoading,
    isSuccess: isCreatePaymentSuccess,
  } = useCreatePayment()
  const {
    mutateAsync: updatePayment,
    isPending: isUpdatePaymentLoading,
    isSuccess: isUpdatePaymentSuccess,
  } = useUpdatePayments()

  const paymentTypeId =
    selectedPaymentType && transactionTypeOptions
      ? transactionTypeOptions.find(
          (option: any) => option.value === selectedPaymentType
        )?.value
      : null

  // const partyTypeId =
  //   selectedPartyType && partyTypeOptions
  //     ? partyTypeOptions.find(
  //         (option: any) => option.value === selectedPartyType
  //       )?.value
  //     : null

  useEffect(() => {
    if (paymentById && requestFor === "FMS") {
      setPaymentReferences(
        paymentById.paymentReferences?.map((reference) => ({
          ...reference,
          id: reference.id || 0,
          paymentId: paymentById.id || 0,
        })) || []
      )
      setPaymentTaxCharges(
        paymentById.paymentTaxCharges?.map((taxCharge) => ({
          ...taxCharge,
          id: taxCharge.id || 0,
          paymentId: paymentById.id || 0,
          taxType: taxCharge.taxType as TaxType,
        })) || []
      )
      // Update tax rows from payment tax charges
      setTaxRows(
        paymentById.paymentTaxCharges?.map((taxCharge) => ({
          taxRate: taxCharge.taxRate || 0,
          amount: taxCharge.amount || 0,
          taxType: taxCharge.taxType as TaxType,
        })) || []
      )
      setPaymentDeductionAndLosses(
        paymentById.paymentDeductionAndLosses?.map((deduction) => ({
          ...deduction,
          id: deduction.id || 0,
          paymentId: paymentById.id || 0,
        })) || []
      )

      if (paymentById.transactionType) {
        setSelectedPaymentType(paymentById.transactionType as PaymentType)
      }
      if (paymentById.partyType) {
        setSelectedPartyType(paymentById.partyType as PartyType)
      }
      // Set the total tax value from API response
      if (paymentById.totalTax !== undefined) {
        setPaymentAmount(Number(paymentById.totalTax))
      }

      setFormValues({
        transactionType: paymentById.transactionType || "",
        paymentAmount: paymentById.paymentAmount || 0,
        paymentNo: paymentById.paymentNo || "",
        postingDate: paymentById.postingDate || dayjs().toISOString(),
        companyId: paymentById.companyId || 0,
        partyType: paymentById.partyType || "",
        partyId: paymentById.partyId || 0,
        partyName: paymentById.partyName || "",
        partyBankAccountId: paymentById.partyBankAccountId || null,
        companyBankAccountId: paymentById.companyBankAccountId || null,
        modeOfPaymentId: paymentById.modeOfPaymentId || 0,
        accountPaidFromId: paymentById.accountPaidFromId || null,
        accountPaidToId: paymentById.accountPaidToId || null,
        fromCurrencyId: paymentById.fromCurrencyId || null,
        toCurrencyId: paymentById.toCurrencyId || null,
        referenceNumber: paymentById.referenceNumber || "",
        referenceDate: paymentById.referenceDate || "",
        paymentStatus: paymentById.paymentStatus || null,
        totalTax: paymentById.totalTax || 0,
        totalAllocationAmount: paymentById.totalAllocationAmount || 0,
        unallocatedAmount: paymentById.unallocatedAmount || 0,
        differentAmount: paymentById.differentAmount || 0,
        paymentRequestId: paymentById.paymentRequestId || null,
      })
    }
    if (payslipById && requestFor === "HRMS") {
      setSelectedPaymentType("Pay")
      setSelectedPartyType("Employee")

      setFormValues({
        transactionType: paymentTypeId || "",
        paymentAmount: payslipById.netPayableSalary || 0,
        paymentNo: payslipById.serialNumber || "",
        postingDate: dayjs().toISOString(),
        companyId:
          payslipById.employeeContract?.employee?.workInformation
            ?.workingAddress?.companyId || 0,
        partyBankAccountId:
          payslipById.employeeContract?.employee?.privateInformation
            ?.bankAccountId || null,
        partyId: payslipById.employeeContract?.employee?.id || 0,
        companyBankAccountId: null,
        modeOfPaymentId: 0,
        accountPaidFromId: null,
        accountPaidToId: null,
        fromCurrencyId: null,
        toCurrencyId:
          payslipById.employeeContract?.employee?.privateInformation
            ?.currencyId || null,
        referenceNumber: payslipById.serialNumber || "",
        referenceDate: "",
        paymentStatus: null,
        totalTax: 0,
        totalAllocationAmount: 0,
        unallocatedAmount: payslipById.netPayableSalary || 0,
        differentAmount: 0,
      })
    }
    if (invoiceById && requestFor === "SCM" && !isInvoiceLoading) {
      setSelectedPaymentType("Pay") // default for SCM module (temporary)
      setSelectedPartyType("Supplier") // default for SCM module (temporary)
      setPaymentTaxCharges(
        invoiceById?.invoiceVatTaxDetails?.map((taxCharge) => ({
          // ...taxCharge,
          id: 0,
          chartOfAccountId: taxCharge.chartOfAccountId || 0,
          chartOfAccountName: "",
          paymentId: 0,
          taxTypeId: taxCharge.taxTypeId || 0,
          taxTypeName: "",
          amount: taxCharge.amount || 0,
          rate: taxCharge.rate || 0,
          total: taxCharge.total || 0,
        })) || []
      )
      setFormValues({
        transactionType: paymentTypeId || "",
        paymentAmount:
          Number(invoiceById.outstandingAmount || invoiceById.netTotalAmount) ||
          0,
        paymentNo: invoiceById.invoiceBillNo || "",
        postingDate: dayjs().toISOString(),
        companyId: invoiceById.companyId || 0,
        referenceNumber: invoiceById.invoiceBillNo || "",
        referenceDate: invoiceById.dueDate || "",
        paymentStatus: String(invoiceById.paymentStatus) || null,
        totalTax: Number(invoiceById.totalTax) || 0,
        totalAllocationAmount: 0,
        unallocatedAmount:
          Number(invoiceById.outstandingAmount || invoiceById.netTotalAmount) ||
          0,
        differentAmount: 0,
        partyId: invoiceById.supplierId || 0,
        fromCurrencyId: invoiceById.currencyId || null,
        toCurrencyId: invoiceById.currencyId || null,
        modeOfPaymentId: 0,
        accountPaidFromId: null,
        accountPaidToId: null,
        partyBankAccountId: null,
        companyBankAccountId: null,
      })
    }
    if (salesInvoiceData && requestFor === "CRM" && !isSalesInvoiceLoading) {
      setSelectedPaymentType("Receive") // default for CRM module (temporary)
      setSelectedPartyType("Customer") // default for CRM module (temporary)
      setPaymentTaxCharges(
        invoiceById?.invoiceVatTaxDetails?.map((taxCharge) => ({
          ...taxCharge,
          id: taxCharge.id || 0,
          paymentId: 0,
        })) || []
      )
      setFormValues({
        ...formValues,
        transactionType: paymentTypeId || "", // default for CRM module (temporary)
        paymentAmount: salesInvoiceData.subtotal || 0,
        paymentNo: salesInvoiceData.invoiceNo || "",
        postingDate: dayjs().toISOString(),
        companyId: Number(salesInvoiceData.companyId),
        referenceDate: salesInvoiceData.invoiceDate || "",
        paymentStatus: salesInvoiceData.status || null,
        referenceNumber: salesInvoiceData.invoiceNo || "",
        totalTax: salesInvoiceData.tax || 0,
        totalAllocationAmount: salesInvoiceData.subtotal || 0,
        unallocatedAmount: 0,
        differentAmount: 0,
        partyId: Number(salesInvoiceData.customerId),
        partyBankAccountId: null,
        companyBankAccountId: null,
        toCurrencyId: Number(salesInvoiceData.currencyId) || null,
      })
    }
  }, [
    paymentById,
    setSelectedPaymentType,
    setSelectedPartyType,
    payslipById,
    invoiceById,
    salesInvoiceData,
    isInvoiceLoading,
    isPayslipLoading,
    isSalesInvoiceLoading,
  ])

  // this side effect will be used only when our request for payment is success //
  useEffect(() => {
    if (isCreatePaymentSuccess && requestFor === "HRMS") {
      updatePayslipStatus({
        serialNumber: payslipById?.serialNumber || "",
        status: "Submitted",
      })
    }
  }, [isCreatePaymentSuccess])

  useEffect(() => {
    if (isCreatePaymentSuccess && requestFor === "SCM") {
      if (invoiceById && invoiceById.id !== undefined) {
        updateInvoiceStatus(invoiceById.id)
      }
    }
  }, [isCreatePaymentSuccess])

  useEffect(() => {
    if (isCreatePaymentSuccess && requestFor === "CRM") {
      updateSalesInvoiceStatus({
        id: salesInvoiceData?.id || "",
        status: "Submitted",
      })
    }
  }, [isCreatePaymentSuccess])

  const handleReferenceChange = (index: number, field: string, value: any) => {
    setPaymentReferences((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const handleReferenceDelete = (index: number) => {
    setPaymentReferences((prev) => prev.filter((_, i) => i !== index))
  }

  const handleReferenceAdd = () => {
    setPaymentReferences((prev) => [
      ...prev,
      { ...DEFAULT_PAYMENT_REFERENCE, paymentId: id || 0 },
    ])
  }

  const handleTaxChargeChange = (index: number, field: string, value: any) => {
    setPaymentTaxCharges((prev) => {
      const updated = [...prev]
      updated[index] = {
        ...updated[index],
        [field]: value,
        taxType:
          field === "taxType" ? (value as TaxType) : updated[index].taxType,
      }
      return updated
    })
  }

  const handleTaxChargeDelete = (index: number) => {
    setPaymentTaxCharges((prev) => prev.filter((_, i) => i !== index))
  }

  const handleTaxChargeAdd = () => {
    setPaymentTaxCharges((prev) => [
      ...prev,
      { ...DEFAULT_TAX_CHARGE, paymentId: id || 0 },
    ])
  }

  const handleDeductionChange = (index: number, field: string, value: any) => {
    setPaymentDeductionAndLosses((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const handleDeductionDelete = (index: number) => {
    setPaymentDeductionAndLosses((prev) => prev.filter((_, i) => i !== index))
  }

  const handleDeductionAdd = () => {
    setPaymentDeductionAndLosses((prev) => [
      ...prev,
      { ...DEFAULT_DEDUCTION_LOSS, paymentId: id || 0 },
    ])
  }

  const onSubmit: SubmitHandler<PaymentFormInput> = async (data) => {
    let partyName = ""
    if (data.partyType === "Supplier" && data.partyId) {
      const selectedSupplier = supplier.supplierList?.data?.find(
        (supplier: any) => supplier.id === data.partyId
      )
      partyName = selectedSupplier?.supplierName || ""
    } else if (data.partyType === "Customer" && data.partyId) {
      const selectedCustomer = customer.customerList?.data?.find(
        (customer: any) => customer.id === data.partyId
      )
      partyName = selectedCustomer?.name || ""
    } else if (data.partyType === "Employee" && data.partyId) {
      const selectedEmployee = employee.employeeList?.data?.find(
        (employee: any) => employee.id === data.partyId
      )
      partyName = selectedEmployee?.name || ""
    }

    const formattedData = {
      ...data,
      id: id && requestFor === "FMS" ? id : 0,
      paymentReferences,
      paymentTaxCharges: paymentTaxCharges,
      paymentDeductionAndLosses: paymentDeductionAndLosses,
      partyName,
      partyId: data.partyId ? String(data.partyId) : undefined,
      paymentStatus:
        data.transactionType === "Internal Transfer"
          ? "Internal Transfer"
          : data.paymentStatus,
      companyBankAccountId: data.companyBankAccountId || null,
      partyBankAccountId: data.partyBankAccountId || null,
      fromCurrencyId: data.fromCurrencyId || null,
    }

    if (id && requestFor === "FMS") {
      await updatePayment({
        ...(formattedData as PaymentList),
        id,
      })
    } else {
      await createPayment(formattedData as PaymentList)
    }
  }

  const getFormValues = () => formValues

  return {
    isFieldDisabled,
    paymentReferences,
    paymentTaxCharges,
    paymentDeductionAndLosses,
    handleReferenceChange,
    handleReferenceDelete,
    handleReferenceAdd,
    handleTaxChargeChange,
    handleTaxChargeDelete,
    handleTaxChargeAdd,
    handleDeductionChange,
    handleDeductionDelete,
    handleDeductionAdd,
    onSubmit,
    getFormValues,
    isLoading:
      isCreatePaymentLoading || isUpdatePaymentLoading || isPaymentLoading,
    isSuccess: isCreatePaymentSuccess || isUpdatePaymentSuccess,
  }
}
