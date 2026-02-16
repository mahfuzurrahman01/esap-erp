"use client"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"

import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import FormStickyActions from "@/components/base/form-sticky-actions"
import Box from "@/components/ui/box"
import UploadPhoto from "@/components/ui/upload-photo"
import { routes } from "@/config/routes"
import { Product } from "@/modules/scm/types/inventory/products/products-types"
import { productSchema } from "@/modules/scm/validators/inventory/product.schema"
import ProductInformationForm from "./product-information-form"
import ProductPriceForm from "./product-price-form"
import { useProductForm } from "./use-product-form"

type IndexProps =
  | {
      initialData?: Product
      isEditForm?: true
    }
  | {
      initialData?: undefined
      isEditForm?: false
    }

export default function ProductEntry({ initialData, isEditForm }: IndexProps) {
  const t = useTranslations("form")

  const { onSubmit, isLoading, getFormValues } = useProductForm({
    id: initialData?.id || 0,
    initialData: initialData,
    mode: isEditForm ? "edit" : "create",
  })

  return (
    <Box>
      <Form<Product>
        onSubmit={onSubmit}
        validationSchema={productSchema}
        className="flex grow flex-col justify-between pt-5 @container @2xl:pt-7 @3xl:pt-9"
        useFormProps={{
          mode: "onChange",
          reValidateMode: "onChange",
          defaultValues: getFormValues(),
          values: getFormValues(),
        }}>
        {({ register, setValue, control, watch, formState }) => {
          return (
            <>
              <FormGroupContainer>
                <FormGroup
                  title={t("form-upload-product-image")}
                  className="pt-7 @2xl:pt-10 @3xl:pt-11">
                  <Controller
                    control={control}
                    name="avatarFile"
                    render={({ field: { onChange, value } }) => (
                      <UploadPhoto
                        onChange={(file) => onChange(file)}
                        value={value}
                        // defaultValue={initialData?.imageUrl}
                      />
                    )}
                  />
                </FormGroup>
                <FormGroup
                  title={t("form-product-entry-information")}
                  className="pt-7 @2xl:pt-10 @3xl:pt-11">
                  <ProductInformationForm
                    formMethods={{
                      control,
                      register,
                      formState,
                      setValue,
                      watch,
                    }}
                    initialData={initialData}
                    isEditForm={isEditForm}
                  />
                </FormGroup>
                <FormGroup
                  title={t("form-product-price")}
                  className="pt-7 @2xl:pt-10 @3xl:pt-11">
                  <ProductPriceForm
                    formMethods={{
                      register,
                      formState,
                      setValue,
                      watch,
                    }}
                    initialData={initialData}
                    isEditForm={isEditForm}
                  />
                </FormGroup>
              </FormGroupContainer>
              <FormStickyActions
                isEditForm={isEditForm}
                isLoading={isLoading}
                className="mt-7"
                backToListPath={routes.scm.inventory.products.products}
              />
            </>
          )
        }}
      </Form>
    </Box>
  )
}
