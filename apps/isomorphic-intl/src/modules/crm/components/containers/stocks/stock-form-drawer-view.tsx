"use client"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Input, Select } from "@/components/ui"
import { useSelectOptions } from "@/hooks/use-select-options"
import SkeletonLoader from "@/components/base/skeleton-loader"
import { useProductList } from "@/modules/crm/hooks/use-product"
import {
  useCreateStock,
  useStockById,
  useUpdateStock,
} from "@/modules/crm/hooks/use-stock"
import { ProductList } from "@/modules/crm/types/product"
import { Stock, StockEditFormTypes } from "@/modules/crm/types/stock"
import { stockFormSchema } from "@/modules/crm/validators/stock-schema"

import StockDetailsView from "./details"
import { useWarehouseList } from "@/modules/scm/hooks"
import { Warehouse } from "@/modules/scm/types/inventory/warehouse/warehouse-types"

export default function StockFormDrawerView({
  id,
  view = false,
}: {
  id?: string
  view?: boolean
}) {
  const { closeDrawer } = useDrawer()
  const t = useTranslations("form")
  const { data: dataById, isLoading } = useStockById(id) as {
    data: Stock | undefined
    isLoading: boolean
  }

  const { data: products, isLoading: isProductLoading } = useProductList()
  const productsOptions = useSelectOptions<ProductList>(
    products?.data,
    "productName"
  )

  const { data: warehouseDataList, isLoading: isWarehousetLoading } =
    useWarehouseList()
  const warehouseOptions = useSelectOptions<Warehouse>(
    warehouseDataList?.data,
    "location"
  )

  const createStock = useCreateStock()
  const updateStock = useUpdateStock()

  const mutationFn = id ? updateStock : createStock

  const handleCloseDrawer = () => closeDrawer()

  const onSubmit: SubmitHandler<StockEditFormTypes> = async (data) => {
    const formattedData = {...data, warehouseId: String(data.warehouseId)}
    await mutationFn.mutateAsync(id ? { data:formattedData, id } : formattedData, {
      onSuccess: () => handleCloseDrawer(),
    })
  }

  const defaultValues: StockEditFormTypes = {
    id: "",
    productId: "",
    warehouseId: "",
    stockQuantity: 0,
    ...dataById,
  }

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-3xl p-4">
        <SkeletonLoader />
      </div>
    )
  }

  if (view) {
    return <StockDetailsView dataById={dataById} onClose={handleCloseDrawer} />
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={id ? t("form-edit-stock") : t("form-add-new-stock")}
        onClose={handleCloseDrawer}
        headerClassName="mb-0 px-8"
      />
      <Form<StockEditFormTypes>
        onSubmit={onSubmit}
        validationSchema={stockFormSchema}
        useFormProps={{ defaultValues, mode: "onChange", values: dataById }}
        className="flex grow flex-col">
        {({ register, control, formState: { errors } }) => (
          <>
            <SimpleBar className="h-full grow">
              <div className="flex flex-col gap-4 px-8 py-6">
                <Controller
                  name="productId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-product")}
                      isSearchable
                      isRequired
                      options={productsOptions}
                      isLoading={isProductLoading}
                      isDisabled={isProductLoading}
                      onChange={(selectedOption: any) =>
                        onChange(selectedOption?.value)
                      }
                      value={
                        productsOptions.find(
                          (option: any) => option.value === value
                        ) || null
                      }
                      error={
                        errors.productId?.message && t("form-product-is-required")
                      }
                    />
                  )}
                />
                <Controller
                  name="warehouseId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-warehouse")}
                      isSearchable
                      isRequired
                      options={warehouseOptions}
                      isLoading={isWarehousetLoading}
                      isDisabled={isWarehousetLoading}
                      onChange={(selectedOption: any) =>
                        onChange(selectedOption?.label)
                      }
                      value={
                        warehouseOptions.find(
                          (option: any) => option.label == value
                        ) || null
                      }
                      error={
                        errors.warehouseId?.message && t("form-warehouse-is-required")
                      }
                    />
                  )}
                />
                <Input
                  type="number"
                  label={t("form-quantity")}
                  placeholder={t("form-quantity")}
                  autoComplete="off"
                  isRequired
                  inputClassName="border-gray-500/20 ring-0"
                  {...register("stockQuantity", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  error={
                    errors.stockQuantity?.message && t("form-quantity-is-required")
                  }
                />
              </div>
            </SimpleBar>
            <DrawerFormActions
              handleCloseDrawer={handleCloseDrawer}
              isLoading={mutationFn.isPending}
              isEditForm={!!id}
            />
          </>
        )}
      </Form>
    </div>
  )
}
