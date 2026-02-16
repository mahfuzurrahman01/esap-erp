"use client"

import { useEffect } from "react"

import { Form } from "@core/ui/form"
import dayjs from "dayjs"
import { useAtom } from "jotai"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"

import { DatePicker } from "@/components/base/date-picker"
import FormFooter from "@/components/base/form-footer"
import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Select } from "@/components/ui"
import Box from "@/components/ui/box"
import { usePayslipById } from "@/modules/hrms/hooks/payroll/use-payslip"
import { useSalesInvoiceById } from "@/modules/crm/hooks/use-sales-invoice"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import {
  useCreatePaymentRequest,
  usePaymentRequestById,
  useUpdatePaymentRequest,
} from "@/modules/fms/hooks/use-payments-request"
import { selectedPartyTypeAtom } from "@/modules/fms/store/party-type-atom"
import { CreatePaymentRequest, PaymentRequestList } from "@/modules/fms/types"
import {
  PaymentRequestFormInput,
  paymentRequestFormSchema,
} from "@/modules/fms/validators/payment-request-schema"

import BankAccountDetails from "./bank-account-details"
import PartyDetails from "./party-details"
import TransactionDetails from "./transaction-details"

const paymentRequestTypeOptions = [
  { value: "Internal", label: "Internal" },
  { value: "External", label: "External" },
]

export default function CreateEditPaymentRequestForm({
  id,
  mode,
  requestFor,
}: {
  id?: number
  mode?: "create" | "edit" | "view"
  requestFor?: "HRMS" | "SCM" | "CRM" | "FMS"
}) {
  const t = useTranslations("form")
  const sharedData = useSharedDataHooks([
    "company",
    "modeOfPayment",
  ])

  const { company, modeOfPayment } = sharedData

  // Safely destructure the shared data with defaults
  const companyOptions = company?.companyOptions || []
  const companyList = company?.companyList
  const isCompanyLoading = company?.isCompanyLoading || false

  const modeOfPaymentOptions = modeOfPayment?.modeOfPaymentOptions || []
  const isModeOfPaymentLoading = modeOfPayment?.isModeOfPaymentLoading || false

  const [selectedPartyType, setSelectedPartyType] = useAtom(selectedPartyTypeAtom)
  const { data: paymentRequestById } = usePaymentRequestById(id!)
  const {
    mutateAsync: createPaymentRequest,
    isPending: isCreatePaymentRequestLoading,
  } = useCreatePaymentRequest()
  const {
    mutateAsync: updatePaymentRequest,
    isPending: isUpdatePaymentRequestLoading,
  } = useUpdatePaymentRequest()
  const { data: payslipById, isLoading: isPayslipLoading } = usePayslipById(
    Number(id)
  )
  const { data: salesInvoiceById, isLoading: isSalesInvoiceLoading } =
    useSalesInvoiceById(id)
  const isFieldDisabled = mode === "view"
  const isCompanyFieldDisabled = requestFor === "HRMS" || isFieldDisabled

  // Get default company ID
  const defaultCompanyId =
    companyList?.data?.find((company: any) => company.isDefault)?.id || 0

  const onSubmit: SubmitHandler<PaymentRequestFormInput> = async (data) => {
    const formattedData: CreatePaymentRequest = {
      paymentRequestType: data.paymentRequestType,
      companyId: data.companyId,
      transactionDate: data.transactionDate,
      modeOfPaymentId: data.modeOfPaymentId,
      partyType: data.partyType,
      partyId: data.partyId ? String(data.partyId) : "",
      partyName: data.partyName || "",
      referenceType: data.referenceType || "",
      referenceNumber: data.referenceNumber || "",
      amount: data.amount,
      transactionCurrencyId: data.transactionCurrencyId,
      partyAccountCurrencyId: data.partyAccountCurrencyId,
      bankAccountId: data.bankAccountId,
      bankName: data.bankName,
      bankAccountNumber: data.bankAccountNumber,
    }

    if (id && !requestFor) {
      await updatePaymentRequest({
        id,
        data: formattedData,
      })
    } else {
      await createPaymentRequest(formattedData)
    }
  }

  const defaultValues: PaymentRequestFormInput = {
    paymentRequestType: "",
    companyId: requestFor === "HRMS" ? payslipById?.employeeContract?.companyId || 0 : 0,
    transactionDate: mode === "create" ? dayjs().format("YYYY-MM-DD") : "",
    modeOfPaymentId: 0,
    partyType: "",
    partyId: "",
    partyName: "",
    referenceType: "",
    referenceNumber: "",
    amount: 0,
    transactionCurrencyId: 0,
    partyAccountCurrencyId: 0,
    bankAccountId: 0,
    bankName: "",
    bankAccountNumber: "",
  }

  if (requestFor === "HRMS") {
    setSelectedPartyType("Employee")
  }

  return (
    <Box>
      <Form<PaymentRequestFormInput>
        validationSchema={paymentRequestFormSchema}
        onSubmit={onSubmit}
        className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11"
        useFormProps={{
          defaultValues:
            mode === "edit"
              ? (paymentRequestById as unknown as PaymentRequestFormInput)
              : defaultValues,
          mode: "onChange",
          values: paymentRequestById as unknown as PaymentRequestFormInput,
        }}>
        {({ register, control, formState, watch, setValue }) => {
          useEffect(() => {
            if (!id && defaultCompanyId && !watch("companyId")) {
              setValue("companyId", defaultCompanyId)
            }
          }, [defaultCompanyId, setValue, id, watch])
          return (
            <>
              <FormGroupContainer>
                <FormGroup title={t("form-information")}>
                  <Controller
                    name="paymentRequestType"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label={t("form-payment-request-type")}
                        labelClassName="text-title"
                        isRequired
                        options={paymentRequestTypeOptions}
                        value={
                          value && paymentRequestTypeOptions
                            ? paymentRequestTypeOptions.find(
                              (option: any) => option.value === value
                            ) || null
                            : null
                        }
                        onChange={(option: any) => onChange(option?.value)}
                        isLoading={false}
                        isDisabled={
                          isFieldDisabled
                        }
                        placeholder={
                          isFieldDisabled
                            ? "Loading payment request types..."
                            : t("form-select-payment-request-type")
                        }
                        error={
                          formState.errors.paymentRequestType?.message &&
                          t(formState.errors.paymentRequestType.message)
                        }
                      />
                    )}
                  />
                  <Controller
                    name="companyId"
                    control={control}
                    defaultValue={
                      requestFor === "HRMS"
                        ? payslipById?.employeeContract?.companyId
                        : undefined
                    }
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label={t("form-company-name")}
                        labelClassName="text-title"
                        isRequired
                        options={companyOptions}
                        value={
                          companyOptions?.find(
                            (option: any) =>
                              option.value ===
                              (requestFor === "HRMS"
                                ? payslipById?.employeeContract?.companyId
                                : value)
                          ) || null
                        }
                        onChange={(option: any) => {
                          if (option?.value) {
                            onChange(option.value)
                            const selectedAccount = companyList?.data?.find(
                              (acc: any) => acc.id === option.value
                            )
                            console.log(selectedAccount)
                            if (selectedAccount) {
                              setValue?.("transactionCurrencyId", selectedAccount.currencyId || "")
                            }
                          }
                        }}
                        isLoading={isCompanyLoading || isPayslipLoading}
                        isDisabled={isCompanyFieldDisabled}
                        placeholder={
                          isCompanyLoading
                            ? "Loading companies..."
                            : t("form-select-company")
                        }
                        error={
                          formState.errors.companyId?.message &&
                          t(formState.errors.companyId.message)
                        }
                      />
                    )}
                  />
                  <Controller
                    name="transactionDate"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        inputProps={{
                          label: t("form-transaction-date"),
                          required: true,
                        }}
                        placeholderText={t("form-select-date")}
                        value={value ? new Date(value) : null}
                        onChange={(date: any) => {
                          const formattedDate = date
                            ? dayjs(date).format("YYYY-MM-DD")
                            : undefined
                          onChange(formattedDate)
                        }}
                        isRequired={true}
                        dateFormat="d MMMM yyyy"
                        popperPlacement="bottom-end"
                        disabled={isFieldDisabled}
                        error={
                          formState.errors.transactionDate?.message &&
                          t(formState.errors.transactionDate.message)
                        }
                      />
                    )}
                  />
                  <Controller
                    name="modeOfPaymentId"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label={t("form-mode-of-payment")}
                        labelClassName="text-title"
                        isRequired
                        options={modeOfPaymentOptions}
                        value={
                          value && modeOfPaymentOptions
                            ? modeOfPaymentOptions.find(
                              (option: any) => option.value === value
                            ) || null
                            : null
                        }
                        onChange={(option: any) => onChange(option?.value)}
                        isLoading={isModeOfPaymentLoading}
                        isDisabled={isFieldDisabled || isModeOfPaymentLoading}
                        placeholder={
                          isModeOfPaymentLoading
                            ? "Loading mode of payment..."
                            : t("form-select-mode-of-payment")
                        }
                        error={
                          formState.errors.modeOfPaymentId?.message &&
                          t(formState.errors.modeOfPaymentId.message)
                        }
                      />
                    )}
                  />
                </FormGroup>

                <FormGroup
                  title={t("form-party-details")}
                  className="pt-7 @2xl:pt-10 @3xl:pt-11">
                  <PartyDetails
                    isFieldDisabled={isFieldDisabled}
                    formMethods={{
                      register,
                      control,
                      formState,
                      watch,
                      setValue,
                    }}
                  />
                </FormGroup>

                <FormGroup
                  title={t("form-transaction-details")}
                  className="pt-7 @2xl:pt-10 @3xl:pt-11">
                  <TransactionDetails
                    isFieldDisabled={isFieldDisabled}
                    formMethods={{
                      register,
                      control,
                      formState,
                      watch,
                    }}
                  />
                </FormGroup>

                <FormGroup
                  title={t("form-bank-account-details")}
                  className="pt-7 @2xl:pt-10 @3xl:pt-11">
                  <BankAccountDetails
                    isFieldDisabled={isFieldDisabled}
                    formMethods={{
                      register,
                      control,
                      formState,
                      watch,
                      setValue,
                    }}
                  />
                </FormGroup>
              </FormGroupContainer>

              {mode !== "view" && (
                <FormFooter
                  isLoading={
                    isCreatePaymentRequestLoading ||
                    isUpdatePaymentRequestLoading
                  }
                  altBtnText={t("form-back")}
                  submitBtnText={
                    id && !requestFor
                      ? t("form-update-payment-request")
                      : t("form-create-payment-request")
                  }
                  className="border-gray-500/20 dark:bg-paper"
                />
              )}
            </>
          )
        }}
      </Form>
    </Box>
  )
}
