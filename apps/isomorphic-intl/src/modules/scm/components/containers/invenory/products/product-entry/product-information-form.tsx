"use client"

import { useTranslations } from "next-intl"
import {
  Control,
  Controller,
  FormState,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form"

import { Input, Select, Textarea, Checkbox } from "@/components/ui"
import { useSCMSharedDataHook } from "@/modules/scm/constants/shared-data-hooks"
import { productTypes } from "@/modules/scm/constants/shared-status-field-option"
import { useGlobalStoreState } from "@/modules/scm/store/global-store-state"
import { Product } from "@/modules/scm/types/inventory/products/products-types"
import { WithAddNewOption } from "@/modules/scm/utils/select-options"

import { generateCode } from "./form-utils"

interface ProductInformationFormProps {
  formMethods: {
    control: Control<any>
    register: UseFormRegister<any>
    formState: FormState<Product>
    setValue: UseFormSetValue<any>
    watch: UseFormWatch<any>
  }
  initialData?: any
  isEditForm?: boolean
}

export default function ProductInformationForm({
  formMethods,
  initialData,
  isEditForm,
}: ProductInformationFormProps) {
  const t = useTranslations("form")
  const {
    control,
    register,
    formState: { errors },
    setValue,
    watch,
  } = formMethods
  const {
    productTypeTemplate,
    setProductTypeTemplate,
    setCompanyIdTemplate,
    setCompanyNameTemplate,
    setAssetCategoryIdTemplate,
    setAssetCategoryNameTemplate,
    isFixedAssetTemplate,
    setIsFixedAssetTemplate,
  } = useGlobalStoreState()
  const { productCategory, assetCategory, company, unit } =
    useSCMSharedDataHook([
      "productCategory",
      "assetCategory",
      "company",
      "unit",
    ])

  const { productCategoryOptions, isProductCategoryLoading } = productCategory
  const { assetCategoryOptions, isAssetCategoryLoading } = assetCategory
  const { companyOptions, isCompanyLoading } = company
  const { unitOptions, isUnitLoading } = unit

  const productType = watch("productType")
  const productName = watch("productName")
  const selectedCategoryId = watch("productCategoryId")

  return (
    <>
      <Controller
        control={control}
        name="productType"
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-product-type")}
            isRequired
            labelClassName="text-title"
            showAddNewOption={true}
            options={productTypes}
            value={
              productTypes.find((option) => option.value === value) || null
            }
            onChange={(selectedValue: any) => {
              onChange(selectedValue?.value)
              // Generate code when type changes and other required fields are present
              const selectedCategory = productCategoryOptions.find(
                (option: any) => option.value === selectedCategoryId
              )
              if (selectedCategory && selectedValue?.value && productName) {
                // setProductTypeTemplate(selectedValue.value)
                const newCode = generateCode(
                  selectedValue.value,
                  selectedCategory.label,
                  productName
                )
                setValue("productCode", newCode)
              }
              setProductTypeTemplate(selectedValue.value)
              // Set purchase price to 0 if product type is not raw-materials
              if (selectedValue.value !== "raw-materials") {
                setValue("purchasePrice", 0)
                setValue("purchaseTax", 0)
              }
              if (selectedValue.value !== "good-finished") {
                setValue("cost", 0)
              }
              if (selectedValue.value !== "service") {
                setValue("sellingPrice", 0)
                setValue("salesTax", 0)
              }
            }}
            isLoading={isProductCategoryLoading}
            isDisabled={isProductCategoryLoading}
            placeholder={t("form-product-category")}
            error={
              errors.productType?.message ? t(errors.productType?.message) : ""
            }
          />
        )}
      />
      <Controller
        control={control}
        name="productCategoryId"
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-product-category")}
            labelClassName="text-title"
            isRequired
            options={productCategoryOptions}
            value={
              productCategoryOptions.find(
                (option: any) => option.value === value
              ) || null
            }
            onChange={(selectedValue: any) => {
              onChange(selectedValue?.value)
              // Generate and set code when category is selected
              const selectedCategory = productCategoryOptions.find(
                (option: any) => option.value === selectedValue.value
              )
              if (selectedCategory && productType && productName) {
                const newCode = generateCode(
                  productType,
                  selectedCategory.label,
                  productName
                )
                setValue("productCode", newCode)
              }
            }}
            isLoading={isProductCategoryLoading}
            isDisabled={isProductCategoryLoading}
            placeholder={t("form-product-category")}
            error={
              errors.productCategoryId?.message
                ? t(errors.productCategoryId?.message)
                : ""
            }
          />
        )}
      />
      <Input
        isRequired
        label={t("form-product-name")}
        type="text"
        {...register("productName")}
        error={
          errors.productName?.message ? t(errors.productName?.message) : ""
        }
        className="flex-grow"
        onChange={(e) => {
          register("productName").onChange(e)
          // Generate code when name changes and other required fields are present
          if (productType && selectedCategoryId && e.target.value) {
            const selectedCategory = productCategoryOptions.find(
              (option: any) => option.value === selectedCategoryId
            )
            if (selectedCategory) {
              const newCode = generateCode(
                productType,
                selectedCategory.label,
                e.target.value
              )
              setValue("productCode", newCode)
            }
          }
        }}
      />
      <Input
        label={t("form-product-code")}
        isRequired
        type="text"
        {...register("productCode")}
        error={
          errors.productCode?.message ? t(errors.productCode?.message) : ""
        }
        className="flex-grow"
      />
      <Controller
        control={control}
        name="companyId"
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-company")}
            labelClassName="text-title"
            options={companyOptions}
            value={
              companyOptions.find((option: any) => option.value === value) ||
              null
            }
            onChange={(selectedValue: any) => {
              onChange(selectedValue?.value)
              setCompanyIdTemplate(selectedValue?.value)
              setCompanyNameTemplate(selectedValue?.label)
            }}
            isLoading={isCompanyLoading}
            isDisabled={isCompanyLoading}
            placeholder={t("form-company")}
            error={
              errors.companyId?.message ? t(errors.companyId?.message) : ""
            }
            isRequired
          />
        )}
      />
      <Checkbox
        label={t("form-is-fixed-asset")}
        {...register("isFixedAsset")}
        onChange={(e: any) => {
          setIsFixedAssetTemplate(e.target.checked)
        }}
      />
      {errors.isFixedAsset && (
        <p className="text-sm text-red-500">
          {errors.isFixedAsset.message ? t(errors.isFixedAsset.message) : ""}
        </p>
      )}
      {isFixedAssetTemplate && (
        <Controller
          control={control}
          name="assetCategoryId"
          render={({ field: { onChange, value } }) => (
            <Select
              label={t("form-asset-category")}
              labelClassName="text-title"
              options={assetCategoryOptions}
              value={
                assetCategoryOptions.find(
                  (option: any) => option.value === value
                ) || null
              }
              onChange={(selectedValue: any) => {
                onChange(selectedValue?.value)
                setAssetCategoryIdTemplate(selectedValue?.value)
                setAssetCategoryNameTemplate(selectedValue?.label)
              }}
              isLoading={isAssetCategoryLoading}
              isDisabled={isAssetCategoryLoading}
              placeholder={t("form-asset-category")}
            />
          )}
        />
      )}
      <Controller
        control={control}
        name="itemUnitId"
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-unit")}
            isRequired
            labelClassName="text-title"
            options={unitOptions}
            value={
              unitOptions.find((option: any) => option.value === value) || null
            }
            onChange={(selectedValue: any) => {
              onChange(selectedValue?.value)
            }}
            isLoading={isUnitLoading}
            isDisabled={isUnitLoading}
            placeholder={t("form-unit")}
            error={
              errors.itemUnitId?.message ? t(errors.itemUnitId?.message) : ""
            }
          />
        )}
      />
      <Textarea
        labelClassName="bg-paper"
        label={t("form-description")}
        {...register("description")}
        error={
          errors.description?.message
            ? t(
                `form-${errors.description?.message.toLowerCase().replace(/\s+/g, "-")}`
              )
            : ""
        }
        className="col-span-2 w-full flex-grow text-title"
      />
    </>
  )
}
