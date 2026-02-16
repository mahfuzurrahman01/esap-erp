"use client"

import { useTranslations } from "next-intl"
import {
  FormState,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form"

import { Input } from "@/components/ui"
import { useGlobalStoreState } from "@/modules/scm/store/global-store-state"
import { Product } from "@/modules/scm/validators/inventory/product.schema"

interface ProductPriceFormProps {
  formMethods: {
    register: UseFormRegister<any>
    formState: FormState<Product>
    setValue: UseFormSetValue<any>
    watch: UseFormWatch<any>
  }
  initialData?: any
  isEditForm?: boolean
}

export default function ProductPriceForm({
  formMethods,
}: ProductPriceFormProps) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = formMethods
  const { productTypeTemplate } = useGlobalStoreState()

  const t = useTranslations("form")

  const productType = watch("productType")
  const cost = watch("cost")
  const sellingPrice = watch("sellingPrice")

  return (
    <>
      <Input
        label={t("form-cost")}
        type={"number"}
        min={0}
        onKeyDown={(e) => {
          if (e.key === "-" || e.key === "e") {
            e.preventDefault()
          }
        }}
        {...register("cost", {
          valueAsNumber: true,
          min: 0,
          validate: (value) => {
            if (productType === "good-finished" && sellingPrice) {
              return (
                (value ?? 0) <= (sellingPrice ?? 0) ||
                "Cost must be less than or equal to selling price"
              )
            }
            return true
          },
        })}
        placeholder="0.00"
        error={errors.cost?.message ? t(errors.cost?.message) : ""}
        className="flex-grow"
        disabled={productTypeTemplate !== "good-finished"}
        onChange={(e) => {
          register("cost").onChange(e)
          if (productType === "good-finished" && cost && sellingPrice) {
            return cost <= sellingPrice
          }
        }}
      />
      <Input
        label={t("form-purchase-price")}
        type="number"
        min={0}
        onKeyDown={(e) => {
          if (e.key === "-" || e.key === "e") {
            e.preventDefault()
          }
        }}
        {...register("purchasePrice", { valueAsNumber: true, min: 0 })}
        error={
          errors.purchasePrice?.message ? t(errors.purchasePrice?.message) : ""
        }
        className="flex-grow"
        placeholder="0.00"
        disabled={productTypeTemplate === "good-finished"}
      />
      <Input
        label={t("form-selling-price")}
        type="number"
        min={0}
        onKeyDown={(e) => {
          if (e.key === "-" || e.key === "e") {
            e.preventDefault()
          }
        }}
        {...register("sellingPrice", {
          valueAsNumber: true,
          min: 0,
          validate: (value) => {
            if (productType === "good-finished" && cost) {
              return (
                (value ?? 0) >= (cost ?? 0) ||
                "Selling price must be greater than or equal to cost"
              )
            }
            if (productType === "service") {
              return (
                (value ?? 0) > (cost ?? 0) ||
                "Selling price is required for services"
              )
            }
            return true
          },
        })}
        error={
          errors.sellingPrice?.message ? t(errors.sellingPrice?.message) : ""
        }
        className="flex-grow"
        required={productType === "service"}
        placeholder="0.00"
      />
      <Input
        label={`${t("form-purchase-taxes")} %`}
        type="number"
        min={0}
        onKeyDown={(e) => {
          if (e.key === "-" || e.key === "e") {
            e.preventDefault()
          }
        }}
        {...register("purchaseTax", { valueAsNumber: true, min: 0 })}
        error={
          errors.purchaseTax?.message ? t(errors.purchaseTax?.message) : ""
        }
        className="flex-grow"
        placeholder="0.00"
        disabled={productTypeTemplate === "good-finished"}
      />
      <Input
        label={`${t("form-sale-taxes")} %`}
        type="number"
        min={0}
        onKeyDown={(e) => {
          if (e.key === "-" || e.key === "e") {
            e.preventDefault()
          }
        }}
        {...register("salesTax", { valueAsNumber: true, min: 0 })}
        error={
          errors.salesTax?.message
            ? t(
                `form-${errors.salesTax?.message.toLowerCase().replace(/\s+/g, "-")}`
              )
            : ""
        }
        className="flex-grow"
        placeholder="0.00"
      />
      <Input
        label={`${t("form-discount")} %`}
        type="number"
        min={0}
        onKeyDown={(e) => {
          if (e.key === "-" || e.key === "e") {
            e.preventDefault()
          }
        }}
        {...register("discount", { valueAsNumber: true, min: 0 })}
        error={errors.discount?.message ? t(errors.discount?.message) : ""}
        className="flex-grow"
        placeholder="0.00"
      />
    </>
  )
}
