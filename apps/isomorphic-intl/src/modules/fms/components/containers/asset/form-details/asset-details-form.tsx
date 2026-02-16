"use client"

import { useEffect } from "react"

import { useTranslations } from "next-intl"
import {
  Control,
  Controller,
  FormState,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form"
import { Grid } from "rizzui"

import FormGroup from "@/components/base/form-group"
import { Checkbox, Input, Select } from "@/components/ui"
import { useSelectOptions } from "@/hooks/use-select-options"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import { AssetList } from "@/modules/fms/types"
import { AssetFormInput } from "@/modules/fms/validators/asset-schema"
import { useProductList } from "@/modules/scm/hooks"
import { Product } from "@/modules/scm/types/inventory/products/products-types"
import { useAtom } from "jotai"
import { isProductAvailableAtom } from "@/modules/fms/store/asset-store"
import { useCheckProductAsset } from "@/modules/fms/hooks/use-asset"

interface AssetDetailsFormProps {
  formMethods: {
    register: UseFormRegister<AssetFormInput>
    control: Control<AssetFormInput>
    formState: FormState<AssetFormInput>
    trigger: UseFormTrigger<AssetFormInput>
    watch: UseFormWatch<AssetFormInput>
    setValue: UseFormSetValue<AssetFormInput>
  }
  isFieldDisabled?: boolean
  assetById?: AssetList
  mode?: "create" | "edit" | "view"
}

interface AssetOwnerOptions {
  value: string
  label: string
}

export const assetOwnerOptions: AssetOwnerOptions[] = [
  { value: "Company", label: "Company" },
  { value: "Supplier", label: "Supplier" },
  { value: "Customer", label: "Customer" },
]

export default function AssetDetailsForm({
  formMethods,
  isFieldDisabled,
  assetById,
  mode = "create",
}: AssetDetailsFormProps) {
  const t = useTranslations("form")
  const [, setIsProductAvailable] = useAtom(isProductAvailableAtom)
  const { mutateAsync: checkProductAsset } = useCheckProductAsset()
  const {
    company,
    employee,
    department,
    assetLocation,
    assetCategory,
  } = useSharedDataHooks([
    "company",
    "employee",
    "department",
    "assetLocation",
    "assetCategory",
  ])

  const { companyOptions, companyList, isCompanyLoading } = company
  const { employeeOptions, employeeList, isEmployeeLoading } = employee
  const { departmentOptions, isDepartmentLoading } = department
  const { assetLocationOptions, isAssetLocationLoading } = assetLocation
  const { assetCategoryOptions, isAssetCategoryLoading } = assetCategory

  const { data: productList, isLoading: isProductLoading } = useProductList({
    isFixedAsset: "true",
  })

  const productOptions = useSelectOptions<Product>(
    productList?.data,
    "productCode"
  )

  const {
    register,
    control,
    formState: { errors },
    trigger,
    watch,
    setValue,
  } = formMethods

  const isExistingAsset = watch("isExistingAsset")
  const isCompositeAsset = watch("isCompositeAsset")

  // Set initial value of isProductAvailable based on mode and assetById
  useEffect(() => {
    if (mode === "edit" && assetById) {
      setIsProductAvailable(true)
    }
  }, [mode, assetById, setIsProductAvailable])

  const handleExistingAssetChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.checked) {
      setValue("isCompositeAsset", false)
    }
    trigger(["purchaseDate"])
  }

  const handleCompositeAssetChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.checked) {
      setValue("isExistingAsset", false)
    }
    trigger(["purchaseDate"])
  }

  const handleProductChange = async (option: any, onChange: (value: any) => void) => {
    onChange(option?.value)
    if (option?.value) {
      const selectedProduct = productList?.data?.find(
        (product: any) => product.id === option.value
      )
      if (selectedProduct) {
        setValue("assetName", selectedProduct.productName || "")
        setValue("assetCategoryId", selectedProduct.assetCategoryId || 0)
        setValue("companyId", selectedProduct.companyId || 0)

        // Only check product availability for new assets
        if (mode === "create") {
          const isAvailable = await checkProductAsset(option.value)
          setIsProductAvailable(isAvailable)
        } else {
          setIsProductAvailable(true)
        }
      }
    } else {
      setIsProductAvailable(true)
    }
  }

  return (
    <>
      <FormGroup title={t("form-details")}>
        <Controller
          name="productId"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-product-name")}
              labelClassName="text-title"
              options={productOptions}
              value={
                productOptions.find((option: any) => option.value === value) ||
                0
              }
              onChange={(option: any) => handleProductChange(option, onChange)}
              isLoading={isProductLoading}
              isDisabled={mode !== "create" && true || isProductLoading}
              isRequired
              placeholder={
                isProductLoading
                  ? "Loading products..."
                  : t("form-select-product")
              }
              error={errors.productId?.message && t(errors.productId.message)}
            />
          )}
        />
        <Input
          {...register("assetName")}
          label={t("form-asset-name")}
          placeholder={t("form-enter-asset-name")}
          isRequired
          error={errors.assetName?.message && t(errors.assetName.message)}
          disabled={mode !== "create" && true}
        />
        <Controller
          name="companyId"
          control={control}
          defaultValue={
            companyList?.data?.find((company: any) => company.isDefault)?.id ||
            0
          }
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-company-name")}
              labelClassName="text-title"
              isRequired
              menuPortalTarget={document.body}
              options={companyOptions}
              value={
                value && companyOptions
                  ? companyOptions.find((option: any) => option.value === value)
                  : companyOptions?.find(
                    (option: any) =>
                      option.value ===
                      companyList?.data?.find(
                        (company: any) => company.isDefault
                      )?.id
                  ) || null
              }
              onChange={(option: any) => onChange(option.value)}
              isLoading={isCompanyLoading}
              isDisabled={mode !== "create" && true}
              placeholder={
                isCompanyLoading
                  ? "Loading companies..."
                  : t("form-select-company")
              }
              error={errors.companyId?.message && t(errors.companyId.message)}
            />
          )}
        />
        <Controller
          name="assetCategoryId"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-asset-category")}
              labelClassName="text-title"
              options={assetCategoryOptions}
              value={
                assetCategoryOptions.find(
                  (option: any) => option.value === value
                ) || 0
              }
              isRequired
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isAssetCategoryLoading}
              isDisabled={isFieldDisabled || isAssetCategoryLoading}
              placeholder={
                isAssetCategoryLoading
                  ? "Loading asset categories..."
                  : t("form-select-asset-category")
              }
              error={
                errors.assetCategoryId?.message &&
                t(errors.assetCategoryId.message)
              }
            />
          )}
        />
        <Controller
          name="assetLocationId"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-asset-location")}
              labelClassName="text-title"
              options={assetLocationOptions}
              value={
                assetLocationOptions.find(
                  (option: any) => option.value === value
                ) || 0
              }
              isRequired
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isAssetLocationLoading}
              isDisabled={isFieldDisabled || isAssetLocationLoading}
              placeholder={
                isAssetLocationLoading
                  ? "Loading asset locations..."
                  : t("form-select-asset-location")
              }
              error={
                errors.assetLocationId?.message &&
                t(errors.assetLocationId.message)
              }
            />
          )}
        />
        <Controller
          name="assetOwnerName"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-asset-owner")}
              labelClassName="text-title"
              options={assetOwnerOptions}
              defaultValue={assetOwnerOptions[0]}
              value={
                assetOwnerOptions.find(
                  (option: any) => option.value === value
                ) || null
              }
              onChange={(option: any) => onChange(option?.value)}
              isDisabled={isFieldDisabled}
              placeholder={t("form-select-asset-owner")}
              error={
                errors.assetOwnerName?.message && t(errors.assetOwnerName.message)
              }
            />
          )}
        />
        <Controller
          name="maintainerId"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-maintainer")}
              labelClassName="text-title"
              options={employeeOptions}
              value={
                employeeOptions.find((option: any) => option.value === value) ||
                0
              }
              onChange={(option: any) => {
                onChange(option?.value)
                if (option?.value && employeeList?.data) {
                  const selectedEmployee = employeeList.data.find(
                    (emp: any) => emp.id === option.value
                  )
                  if (selectedEmployee?.department) {
                    setValue("departmentId", selectedEmployee.department.id)
                    setValue("departmentName", selectedEmployee.department.name)
                  }
                }
              }}
              isLoading={isEmployeeLoading}
              isDisabled={isFieldDisabled || isEmployeeLoading}
              placeholder={
                isEmployeeLoading
                  ? "Loading employees..."
                  : t("form-select-employee")
              }
              error={errors.maintainerId?.message && t(errors.maintainerId.message)}
            />
          )}
        />
        <Controller
          name="departmentId"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label={t("form-department")}
              labelClassName="text-title"
              placeholder={
                isDepartmentLoading
                  ? "Loading departments..."
                  : t("form-select-department")
              }
              options={departmentOptions}
              value={
                departmentOptions.find(
                  (option: any) => option.value === value
                ) || 0
              }
              onChange={(option: any) => onChange(option?.value)}
              isLoading={isDepartmentLoading}
              isDisabled={isFieldDisabled}
            />
          )}
        />
        <Grid columns="1">
          {!isCompositeAsset && (
            <Controller
              name="isExistingAsset"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Checkbox
                  label={t("form-is-existing-asset")}
                  checked={value || false}
                  onChange={(e: any) => {
                    onChange(e)
                    handleExistingAssetChange(e)
                  }}
                  disabled={mode !== "create" && true}
                />
              )}
            />
          )}

          {!isExistingAsset && (
            <Controller
              name="isCompositeAsset"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Checkbox
                  label={t("form-is-composite-asset")}
                  checked={value || false}
                  onChange={(e: any) => {
                    onChange(e)
                    handleCompositeAssetChange(e)
                  }}
                  disabled={mode !== "create" && true}
                />
              )}
            />
          )}
        </Grid>
      </FormGroup>
    </>
  )
}
