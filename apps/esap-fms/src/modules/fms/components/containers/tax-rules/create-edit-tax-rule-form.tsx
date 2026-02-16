"use client"

import { Form } from "@core/ui/form"
import { useAtom } from "jotai"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"

import { DatePicker } from "@/components/base/date-picker"
import FormFooter from "@/components/base/form-footer"
import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Select } from "@/components/ui"
import Box from "@/components/ui/box"
import { useSelectOptions } from "@/hooks/use-select-options"
import { taxRuleTypeOptions, useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import {
  useCreateTaxRule,
  useTaxRuleById,
  useUpdateTaxRule,
} from "@/modules/fms/hooks/use-tax-rule"
import {
  selectedCustomerNameAtom,
  selectedSupplierNameAtom,
  selectedTaxRuleTypeAtom,
} from "@/modules/fms/store/tax-rule-store"
import { TaxTemplateList } from "@/modules/fms/types"
import { TaxRuleList } from "@/modules/fms/types/tax-rule"
import {
  TaxRuleFormInput,
  taxRuleFormSchema,
} from "@/modules/fms/validators/tax-rule-schema"

export default function CreateEditTaxRuleForm({
  id,
  mode,
}: {
  id?: number
  mode?: "create" | "edit" | "view"
}) {
  const t = useTranslations("form")
  const [selectedTaxRuleType, setSelectedTaxRuleType] = useAtom(
    selectedTaxRuleTypeAtom
  )
  const [selectedSupplierName, setSelectedSupplierName] = useAtom(
    selectedSupplierNameAtom
  )
  const [selectedCustomerName, setSelectedCustomerName] = useAtom(
    selectedCustomerNameAtom
  )

  console.log("selectedTaxRuleType", selectedTaxRuleType)

  const {
    taxTemplate,
    taxCategory,
    company,
    product,
    supplier,
    customer,
  } = useSharedDataHooks([
    "taxRuleType",
    "taxTemplate",
    "taxCategory",
    "company",
    "country",
    "product",
    "supplier",
    "customer",
  ])

  const { taxTemplateList,  isTaxTemplateLoading } = taxTemplate
  const { taxCategoryOptions, isTaxCategoryLoading } = taxCategory
  const { companyOptions, isCompanyLoading } = company
  const { productOptions, isProductLoading } = product
  const { supplierOptions, isSupplierLoading } = supplier
  const { customerOptions, isCustomerLoading } = customer

  const { mutateAsync: createTaxRule, isPending: isCreateTaxRuleLoading } =
    useCreateTaxRule()
  const { mutateAsync: updateTaxRule, isPending: isUpdateTaxRuleLoading } =
    useUpdateTaxRule()
  const { data: taxRuleById } = useTaxRuleById(Number(id!))

  const filteredTaxTemplateList = taxTemplateList?.data?.filter(
    (template: any) => {
      if (selectedTaxRuleType === "sales") {
        return template.templateType?.toLowerCase() === "sales"
      }
      if (selectedTaxRuleType === "purchase") {
        return template.templateType?.toLowerCase() === "purchase"
      }
      return true
    }
  )

  const taxTemplateOptions = useSelectOptions<TaxTemplateList>(
    filteredTaxTemplateList,
    "taxTemplateName"
  )

  const isFieldDisabled = mode === "view"

  const onSubmit: SubmitHandler<TaxRuleFormInput> = async (data) => {
    if (id) {
      await updateTaxRule({
        id: Number(id),
        data: {
          ...data,
          supplierName: selectedSupplierName,
          customerName: selectedCustomerName,
        } as TaxRuleList,
      })
    } else {
      await createTaxRule({
        ...data,
        supplierName: selectedSupplierName,
        customerName: selectedCustomerName,
      } as TaxRuleList)
    }
  }

  const defaultValues: Partial<TaxRuleFormInput> = {
    ruleType: "",
    taxTemplateId: 0,
    customerId: "",
    customerName: "",
    supplierId: 0,
    supplierName: "",
    productId: 0,
    productName: "",
    taxCategoryId: 0,
    taxCategoryName: "",
    companyId: 0,
    validFrom: "",
    validTo: "",
  }

  return (
    <Box>
      <Form<TaxRuleFormInput>
        validationSchema={taxRuleFormSchema}
        onSubmit={onSubmit}
        className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11"
        useFormProps={{
          defaultValues: taxRuleById || defaultValues,
          mode: "onChange",
          values: taxRuleById,
        }}>
        {({ control, register, setValue, formState: { errors } }) => {
          return (
            <>
              <FormGroupContainer>
                <FormGroup title={t("form-new-tax-rules")}>
                  <Controller
                    name="ruleType"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label={t("form-tax-rule-type")}
                        labelClassName="text-title"
                        options={taxRuleTypeOptions}
                        value={
                          value && taxRuleTypeOptions
                            ? taxRuleTypeOptions.find(
                                (option: any) => option.value === value
                              )
                            : null
                        }
                        onChange={(option: any) => {
                          onChange(option?.value)
                          setSelectedTaxRuleType(
                            option?.label.toLowerCase() || ""
                          )
                        }}
                        menuPortalTarget={document.body}
                        isDisabled={isFieldDisabled}
                        isRequired
                        placeholder={ t("form-select") }
                        error={
                          errors.ruleType?.message &&
                          t(errors.ruleType.message)
                        }
                      />
                    )}
                  />
                  <Controller
                    name="taxTemplateId"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label={t("form-tax-template")}
                        labelClassName="text-title"
                        options={taxTemplateOptions}
                        value={
                          value && taxTemplateOptions
                            ? taxTemplateOptions.find(
                                (option: any) => option.value === value
                              )
                            : null
                        }
                        onChange={(option: any) => {
                          if (option?.value) {
                            onChange(option.value)
                            const selectedAccount = taxTemplateList?.data?.find(
                              (acc: any) => acc.id === option.value
                            )
                            if (selectedAccount) {
                              setValue?.("taxCategoryId", selectedAccount.taxCategoryId || "")
                              setValue?.("companyId", selectedAccount.companyId || "")
                            }
                          }
                        }}
                        menuPortalTarget={document.body}
                        isLoading={isTaxTemplateLoading}
                        isDisabled={isTaxTemplateLoading || isFieldDisabled}
                        isRequired
                        placeholder={
                          isTaxTemplateLoading
                            ? t("form-loading")
                            : t("form-select")
                        }
                        error={
                          errors.taxTemplateId?.message &&
                          t(errors.taxTemplateId.message)
                        }
                      />
                    )}
                  />
                </FormGroup>
                <FormGroup
                  title={t("form-details")}
                  className="pt-7 @2xl:pt-9 @3xl:pt-11">
                  {selectedTaxRuleType === "purchase" ? (
                    <Controller
                      name="supplierId"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Select
                          label={t("form-supplier")}
                          labelClassName="text-title"
                          options={supplierOptions}
                          value={
                            value && supplierOptions
                              ? supplierOptions.find(
                                  (option: any) => option.value === value
                                )
                              : null
                          }
                          onChange={(option: any) => {
                            onChange(option?.value)
                            setSelectedSupplierName(option?.label)
                          }}
                          menuPortalTarget={document.body}
                          isLoading={isSupplierLoading}
                          isDisabled={isSupplierLoading || isFieldDisabled}
                          placeholder={
                            isSupplierLoading
                              ? t("form-loading")
                              : t("form-select")
                          }
                          error={
                            errors.supplierId?.message &&
                            t(errors.supplierId.message)
                          }
                        />
                      )}
                    />
                  ) : (
                    <Controller
                      name="customerId"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Select
                          label={t("form-customer")}
                          labelClassName="text-title"
                          options={customerOptions}
                          value={
                            value && customerOptions
                              ? customerOptions.find(
                                  (option: any) => option.value === value
                                )
                              : null
                          }
                          onChange={(option: any) => {
                            onChange(option?.value)
                            setSelectedCustomerName(option?.label)
                          }}
                          menuPortalTarget={document.body}
                          isLoading={isCustomerLoading}
                          isDisabled={isCustomerLoading || isFieldDisabled}
                          placeholder={
                            isCustomerLoading
                              ? t("form-loading")
                              : t("form-select")
                          }
                          error={
                            errors.customerId?.message &&
                            t(errors.customerId.message)
                          }
                        />
                      )}
                    />
                  )}
                  <Controller
                    name="productId"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label={t("form-product")}
                        labelClassName="text-title"
                        options={productOptions}
                        value={
                          value && productOptions
                            ? productOptions.find(
                                (option: any) => option.value === value
                              )
                            : null
                        }
                        onChange={(option: any) => onChange(option?.value)}
                        menuPortalTarget={document.body}
                        isLoading={isProductLoading}
                        isDisabled={isProductLoading || isFieldDisabled}
                        placeholder={
                          isProductLoading
                            ? t("form-loading")
                            : t("form-select")
                        }
                        error={
                          errors.productId?.message &&
                          t(errors.productId.message)
                        }
                      />
                    )}
                  />
                  <Controller
                    name="taxCategoryId"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label={t("form-tax-category")}
                        labelClassName="text-title"
                        options={taxCategoryOptions}
                        value={
                          value && taxCategoryOptions
                            ? taxCategoryOptions.find(
                                (option: any) => option.value === value
                              )
                            : null
                        }
                        onChange={(option: any) => onChange(option?.value)}
                        menuPortalTarget={document.body}
                        isLoading={isTaxCategoryLoading}
                        isDisabled={isTaxCategoryLoading || isFieldDisabled}
                        isRequired
                        placeholder={
                          isTaxCategoryLoading
                            ? t("form-loading")
                            : t("form-select")
                        }
                        error={
                          errors.taxCategoryId?.message &&
                          t(errors.taxCategoryId.message)
                        }
                      />
                    )}
                  />
                  <Controller
                    name="companyId"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label={t("form-company")}
                        labelClassName="text-title"
                        options={companyOptions}
                        value={
                          value && companyOptions
                            ? companyOptions.find(
                                (option: any) => option.value === value
                              )
                            : null
                        }
                        onChange={(option: any) => onChange(option?.value)}
                        menuPortalTarget={document.body}
                        isLoading={isCompanyLoading}
                        isDisabled={isCompanyLoading || isFieldDisabled}
                        isRequired
                        placeholder={
                          isCompanyLoading
                            ? t("form-loading")
                            : t("form-select")
                        }
                        error={
                          errors.companyId?.message &&
                          t(errors.companyId.message)
                        }
                      />
                    )}
                  />
                </FormGroup>
                <FormGroup
                  title={t("form-validity")}
                  className="pt-7 @2xl:pt-9 @3xl:pt-11">
                  <Controller
                    name="validFrom"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <div className="relative">
                        <label
                          htmlFor="validFrom"
                          className="mb-2 block text-sm font-medium text-title">
                          {t("form-valid-from")}
                        </label>
                        <DatePicker
                          id="validFrom"
                          value={value ? new Date(value) : null}
                          onChange={(date: any) =>
                            onChange(date ? date.toISOString() : "")
                          }
                          popperPlacement="bottom-end"
                          placeholderText={t("form-select-valid-from")}
                          className="w-full"
                          disabled={isFieldDisabled}
                          isRequired
                          error={
                            errors.validFrom?.message &&
                            t(errors.validFrom.message)
                          }
                        />
                      </div>
                    )}
                  />
                  <Controller
                    name="validTo"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <div className="relative">
                        <label
                          htmlFor="validTo"
                          className="mb-2 block text-sm font-medium text-title">
                          {t("form-valid-to")}
                        </label>
                        <DatePicker
                          id="validTo"
                          value={value ? new Date(value) : null}
                          onChange={(date: any) =>
                            onChange(date ? date.toISOString() : "")
                          }
                          popperPlacement="bottom-end"
                          placeholderText={t("form-select-valid-to")}
                          className="w-full"
                          disabled={isFieldDisabled}
                          isRequired
                          error={
                            errors.validTo?.message &&
                            t(errors.validTo.message)
                          }
                        />
                      </div>
                    )}
                  />
                </FormGroup>
              </FormGroupContainer>

              {mode !== "view" && (
                <FormFooter
                  isLoading={isCreateTaxRuleLoading || isUpdateTaxRuleLoading}
                  altBtnText={t("form-back")}
                  submitBtnText={
                    id ? t("form-update-tax-rule") : t("form-create-tax-rule")
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
