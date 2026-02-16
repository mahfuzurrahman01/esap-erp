"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"

import FormFooter from "@/components/base/form-footer"
import FormGroupContainer from "@/components/base/form-group-container"
import { Input, Select } from "@/components/ui"
import Box from "@/components/ui/box"
import UploadZone from "@/components/ui/crm/upload-zone"
import { initialValue } from "@/data/crm/products"
import { useSelectOptions } from "@/hooks/use-select-options"
import FormGroup from "@/modules/crm/components/base/form-group"
import { useAttributeList } from "@/modules/crm/hooks/use-attribute"
import {
  useCreateProduct,
  useUpdateProduct,
} from "@/modules/crm/hooks/use-product"
import { AttributeList } from "@/modules/crm/types/attribute"
import { ProductCreationFormTypes } from "@/modules/crm/types/product"
import { productFormSchema } from "@/modules/crm/validators/product-schema"

export default function ProductEditForm({
  id,
  productData,
  categoryOptions,
}: any) {
  const t = useTranslations("form")
  const router = useRouter()
  const [file, setFile] = useState<File | string>("")
  const { data: attributes, isLoading } = useAttributeList()

  const attributeOptions = useSelectOptions<AttributeList>(
    attributes?.data,
    "name"
  )

  const { mutateAsync: createProduct, isPending: isCreating } =
    useCreateProduct()
  const { mutateAsync: updateProduct, isPending: isUpdating } =
    useUpdateProduct()

  useEffect(() => {
    if (productData?.productPicturePath) {
      setFile(productData?.productPicturePath)
    }
  }, [productData?.productPicturePath])

  const handleFormSubmit: SubmitHandler<ProductCreationFormTypes> = async (
    formData
  ) => {
    const newFormData = {
      Name: formData.name,
      Code: formData.code,
      ActualPrice: formData.actualPrice,
      UnitCost: formData.unitCost,
      SalePrice: formData.salePrice,
      CategoryId: formData.categoryId,
      Tax: formData.vat,
      Discount: formData.discount,
      AttributeIds: formData.attributeIds,
      ProductPicture: file,
    }

    if (id) {
      await updateProduct({
        id,
        data: newFormData,
      })
    } else {
      await createProduct(newFormData)
    }
  }

  return (
    <Box className="md:mt-0">
      <Form<ProductCreationFormTypes>
        onSubmit={handleFormSubmit}
        validationSchema={productFormSchema}
        className="flex grow flex-col justify-between @container"
        useFormProps={{
          mode: "onChange",
          defaultValues: productData || initialValue,
          values: productData as unknown as ProductCreationFormTypes,
        }}>
        {({
          register,
          control,
          formState: { errors },
        }) => {
          return (
            <>
              <FormGroupContainer>
                <FormGroup
                  title={t("form-information")}
                  className="grid-cols-12 pt-7 @2xl:pt-10 @3xl:pt-11">
                  <Input
                    type="text"
                    label={t("form-product-name")}
                    isRequired
                    placeholder={t("form-product-name")}
                    {...register("name", { required: true })}
                    error={
                      errors.name?.message && t("form-product-name-is-required")
                    }
                  />

                  <Input
                    type="text"
                    autoComplete="off"
                    label={t("form-product-code")}
                    isRequired
                    placeholder={t("form-product-code")}
                    {...register("code", { required: true })}
                    error={
                      errors.code?.message && t("form-product-code-is-required")
                    }
                  />

                  <Input
                    type="number"
                    label={t("form-actual-price")}
                    isRequired
                    placeholder={t("form-actual-price")}
                    {...register("actualPrice", {
                      required: true,
                      setValueAs: (value) => Number(value),
                    })}
                    error={
                      errors.actualPrice?.message &&
                      t("form-actual-price-is-required")
                    }
                  />

                  <Input
                    type="number"
                    label={t("form-sell-price")}
                    placeholder={t("form-sell-price")}
                    {...register("salePrice", {
                      required: true,
                      setValueAs: (value) => Number(value),
                    })}
                    error={errors?.salePrice?.message}
                  />

                  <Input
                    type="number"
                    label={t("form-unit-cost")}
                    isRequired
                    placeholder={t("form-unit-cost")}
                    {...register("unitCost", {
                      required: true,
                      setValueAs: (value) => Number(value),
                    })}
                    error={
                      errors.unitCost?.message &&
                      t("form-unit-cost-is-required")
                    }
                  />

                  <Controller
                    name="categoryId"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        isSearchable={true}
                        label={t("form-category")}
                        isRequired
                        options={categoryOptions}
                        onChange={(selectedOption: any) =>
                          onChange(selectedOption?.value)
                        }
                        value={
                          categoryOptions?.find(
                            (option: any) => option.value === value
                          ) || null
                        }
                        error={
                          errors.categoryId?.message &&
                          t("form-category-is-required")
                        }
                      />
                    )}
                  />

                  {attributeOptions && attributeOptions.length > 0 && (
                    <Controller
                      name="attributeIds"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Select
                          label={t("form-attributes")}
                          isRequired
                          labelClassName="text-title"
                          isMulti
                          options={attributeOptions}
                          value={
                            Array.isArray(value)
                              ? attributeOptions.filter((option) =>
                                  value.includes(option.value.toString())
                                )
                              : []
                          }
                          onChange={(options: any) => {
                            const values = options
                              ? options.map((option: any) => option.value)
                              : []
                            onChange(values)
                          }}
                          isLoading={isLoading}
                          isDisabled={isLoading}
                          placeholder={
                            isLoading ? t("form-loading") : t("form-select")
                          }
                          error={
                            errors.attributeIds?.message &&
                            t("form-attribute-is-required")
                          }
                        />
                      )}
                    />
                  )}

                  <Input
                    type="number"
                    label={t("form-vat")}
                    placeholder={t("form-vat")}
                    {...register("vat", {
                      required: true,
                      setValueAs: (value) => Number(value),
                    })}
                    error={errors?.vat?.message}
                  />

                  <Input
                    type="number"
                    label={t("form-discount")}
                    placeholder={t("form-discount")}
                    {...register("discount", {
                      required: true,
                      setValueAs: (value) => Number(value),
                    })}
                    error={errors?.discount?.message}
                  />

                  <Controller
                    name="productPicture"
                    control={control}
                    render={() => (
                      <div className="grid gap-5 @3xl:grid-cols-1 lg:col-span-2">
                        <label
                          htmlFor="file"
                          className="block text-sm font-medium text-gray-700 dark:text-white">
                          {t("form-attachment")}
                        </label>
                        <UploadZone
                          multiple={false}
                          btnLabel="upload"
                          className="col-span-full w-full @2xl:p-0"
                          file={file}
                          setFile={setFile}
                        />
                      </div>
                    )}
                  />
                </FormGroup>
              </FormGroupContainer>
              <FormFooter
                isLoading={isCreating || isUpdating}
                altBtnText={t("form-back")}
                handleAltBtn={() => {
                  router.back()
                }}
              />
            </>
          )
        }}
      </Form>
    </Box>
  )
}
