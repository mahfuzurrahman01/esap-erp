import { useTranslations } from "next-intl"
import { Badge, Text } from "rizzui"

import { Input, Select } from "@/components/ui"
import { useOpportunityList } from "@/modules/crm/hooks/use-opportunities"
import { useProductList } from "@/modules/scm/hooks/inventory/product/use-product"

export const useQuotationEntryColumns = (quotationType: string) => {
  const t = useTranslations("form")
  const tableT = useTranslations("table")
  const { data: output, isLoading } = useProductList({pageSize:100})
  const sl = tableT("table-text-sl")
  const item = tableT("table-text-item")
  const quantity = tableT("table-text-quantity")
  const total = tableT("table-text-total")
  const unitPrice = tableT("table-text-unit-price")
  const productOptions = output?.data
  ?.filter((product: any) => product?.sellingPrice > 0)
  .map((product: any) => ({
    value: product.id,
    label: product?.productName,
    unitPrice: product?.sellingPrice,
  }))

  // console.log("productOptions",productOptions)

  const { data: outputData }: any = useOpportunityList({pageSize:100})
  const opportunityOptions = outputData?.data
  const formattedOpportunities = opportunityOptions?.map(
    (opportunity: any) => ({
      value: opportunity.id,
      label: opportunity?.dealName || "",
    })
  )

  return [
    {
      id: "sn",
      header: sl,
      accessorKey: "sn",
      width: "50px",
      cell: ({ row }: { row: any }) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {row.index + 1}
        </Text>
      ),
    },
    {
      id: "productId",
      header: item,
      accessorKey: "productId",
      width: "550px",
      cell: (props: any) => {
        if (quotationType === "Product") {
          return (
            <Select
              options={productOptions}
              value={productOptions?.find(
                (option: any) => option.value == props.row.original.productId
              )}
              isLoading={isLoading}
              isDisabled={isLoading}
              onChange={(option: any) => {
                const selectedProduct = productOptions?.find(
                  (p: any) => p.value == option?.value
                )
                props.row.original.productId = option?.value
                props.table.options.meta?.updateData(
                  props.row.index,
                  "unitPrice",
                  selectedProduct?.unitPrice
                )
              }}
              placeholder={isLoading ? t("form-loading") : t("form-select")}
              menuPortalTarget={document.body}
            />
          )
        } else if (quotationType == "Opportunity") {
          return (
            <Select
              options={formattedOpportunities}
              value={
                formattedOpportunities?.find(
                  (o: any) => o.value === props.value
                ) || null
              }
              onChange={(item: any) => props.onChange(item?.value)}
              placeholder={t("form-select")}
              menuPortalTarget={document.body}
            />
          )
        } else {
          return (
            <Input
              value={props.value || ""}
              onChange={(e: any) => props.onChange(e.target.value)}
              placeholder={t("form-enter")}
            />
          )
        }
      },
    },
    {
      id: "quantity",
      header: quantity,
      accessorKey: "quantity",
      width: "220px",
      cell: (props: any) => (
        <Input
          type="number"
          autoComplete="off"
          value={props.value}
          onChange={async (e: any) => {
            const newValue = parseFloat(e.target.value) || 0
            props.row.original.quantity = newValue
            const total = newValue * (props.row.original.unitPrice || 0)
            await props.table.options.meta?.updateData(
              props.row.index,
              "totalPrice",
              total
            )
          }}
          placeholder="0.00"
        />
      ),
    },

    {
      id: "unitPrice",
      header: unitPrice,
      accessorKey: "unitPrice",
      width: "220px",
      cell: (props: any) => (
        <Input
          type="number"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          placeholder="0.00"
        />
      ),
    },
    {
      id: "totalPrice",
      header: total,
      accessorKey: "totalPrice",
      width: "220px",
      cell: (props: any) => (
        <Input
          type="number"
          autoComplete="off"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          disabled
          placeholder="0.00"
        />
      ),
    },
    {
      id: "actions",
      header: "",
      accessorKey: "actions",
      width: "90px",
      cell: (props: any) => (
        <center>
          <Badge
            variant="flat"
            color="danger"
            rounded="lg"
            className="cursor-pointer"
            onClick={() => props.onDelete()}>
            {t("form-delete")}
          </Badge>
        </center>
      ),
    },
  ]
}
