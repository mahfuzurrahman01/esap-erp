import { UseFormSetValue } from "react-hook-form"

import { PaymentRequestFormInput } from "@/modules/fms/validators/payment-request-schema"

type InitializeFormValuesProps = {
  requestFor: "HRMS" | "SCM" | "CRM" | "FMS" | undefined
  setValue: UseFormSetValue<PaymentRequestFormInput>
  data?: any
  partyTypeOptions?: any[]
}

export const initializeFormValues = ({
  requestFor,
  setValue,
  data,
  partyTypeOptions,
}: InitializeFormValuesProps) => {
  switch (requestFor) {
    case "HRMS":
      initializeHRMSValues({
        setValue,
        payslipData: data,
        partyTypeOptions: partyTypeOptions || [],
      })
      break
    case "SCM":
      initializeSCMValues({
        setValue,
        purchaseData: data,
        partyTypeOptions: partyTypeOptions || [],
      })
      break
    // Add other cases as needed
  }
}

const initializeHRMSValues = ({
  setValue,
  payslipData,
  partyTypeOptions,
}: {
  setValue: UseFormSetValue<PaymentRequestFormInput>
  payslipData: any
  partyTypeOptions: any[]
}) => {
  if (!payslipData) return

  const matchingPartyType = partyTypeOptions?.find(
    (option: any) => option.label === "Employee"
  )

  if (matchingPartyType) {
    setValue("partyId", matchingPartyType.value)
  }

  setValue("referenceType", "Payslip")
  setValue("paymentRequestSerialNumber", payslipData.serialNumber || "")
  setValue("partyId", payslipData?.employeeContract?.employee?.id || 0)
  setValue("amount", payslipData?.netPayableSalary || 0)
  setValue(
    "partyAccountCurrencyId",
    payslipData?.employeeContract?.employee?.privateInformation?.currencyId
  )
  setValue(
    "bankAccountId",
    payslipData?.employeeContract?.employee?.privateInformation
      ?.bankAccountId || 0
  )
}

const initializeSCMValues = ({
  setValue,
  purchaseData,
  partyTypeOptions,
}: {
  setValue: UseFormSetValue<PaymentRequestFormInput>
  purchaseData: any
  partyTypeOptions: any[]
}) => {
  if (!purchaseData) return

  const matchingPartyType = partyTypeOptions?.find(
    (option: any) => option.label === "Supplier"
  )

  if (matchingPartyType) {
    setValue("partyId", matchingPartyType.value)
  }

  // Add SCM specific initializations
  setValue("referenceType", "Purchase")
  setValue("paymentRequestSerialNumber", purchaseData.purchaseOrderNumber || "")
  // setValue("amount", purchaseData.totalAmount || 0)
  // ... other SCM specific values
}

type GetFormPropsParams = {
  mode?: "create" | "edit" | "view"
  requestFor?: "HRMS" | "SCM" | "CRM" | "FMS"
  paymentRequestById: any
  payslipById?: any
  initialValues: any
}

export const getFormProps = ({
  mode,
  requestFor,
  paymentRequestById,
  payslipById,
  initialValues,
}: GetFormPropsParams) => {
  return {
    defaultValues: mode === "edit" ? paymentRequestById : initialValues,
    mode: "onChange" as const,
    values: getFormValues({ requestFor, paymentRequestById, payslipById }),
  }
}

const getFormValues = ({
  requestFor,
  paymentRequestById,
  payslipById,
}: Omit<GetFormPropsParams, "mode" | "initialValues">) => {
  switch (requestFor) {
    case "HRMS":
      return paymentRequestById
        ? {
            ...paymentRequestById,
            paymentRequestTypeId: paymentRequestById.paymentRequestTypeId || 0,
            companyId: payslipById?.employeeContract?.companyId,
          }
        : paymentRequestById
    // Add other cases as needed
    default:
      return paymentRequestById
  }
}
