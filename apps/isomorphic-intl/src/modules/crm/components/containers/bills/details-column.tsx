import { useTranslations } from "next-intl"
import { Badge } from "rizzui"

import { Input, Select } from "@/components/ui"
import { unitOptions } from "@/data/crm/quotation"
import { useOpportunityList } from "@/modules/crm/hooks/use-opportunities"
import { useProductList } from "@/modules/crm/hooks/use-product"

export const useSalesorderEntryColumns = (salesorderType: string) => {
  const t = useTranslations("form")
  const { data: output } = useProductList({pageSize:100})
  const products = output?.data || []
  const formattedProducts = products?.map((prod: any) => ({
    value: prod.id,
    label: prod.productName || "",
  }))

  const { data: output1 }: any = useOpportunityList({pageSize:100})
  const opportunityOptions = output1?.data
  const formattedOpportunities = opportunityOptions?.map(
    (opportunity: any) => ({
      value: opportunity.id,
      label: opportunity?.name || "",
    })
  )

  return [
    {
      id: "sn",
      header: "SN",
      accessorKey: "sn",
      width: "70px",
    },
    {
      id: "product",
      header: "Item",
      accessorKey: salesorderType,
      width: "350px",
      cell: (props: any) => {
        if (salesorderType == "Product") {
          return (
            <Select
              options={formattedProducts}
              value={
                formattedProducts.find((p) => p.value === props.value) || null
              }
              onChange={(item: any) => props.onChange(item?.value)}
              placeholder={t("form-select")}
              menuPortalTarget={document.body}
            />
          )
        } else if (salesorderType == "Opportunity") {
          return (
            <Select
              options={formattedOpportunities}
              value={
                formattedOpportunities.find(
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
      header: "quantity",
      accessorKey: "quantity",
      width: "120px",
      cell: (props: any) => (
        <Input
          type="number"
          value={props.value}
          onChange={(e: any) => props.onChange(e.target.value)}
          placeholder="0.00"
        />
      ),
    },
    {
      id: "unit",
      header: "Unit",
      accessorKey: "unit",
      width: "120px",
      cell: (props: any) => (
        <Select
          options={unitOptions}
          value={unitOptions.find((p) => p.value === props.value) || null}
          onChange={(item: any) => props.onChange(item?.value)}
          placeholder={t("form-select")}
          menuPortalTarget={document.body}
        />
      ),
    },
    {
      id: "unit_price",
      header: "Unit Price",
      accessorKey: "unit_price",
      width: "120px",
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
      id: "vat",
      header: "VAT",
      accessorKey: "vat",
      width: "120px",
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
      id: "tax",
      header: "Tax",
      accessorKey: "tax",
      width: "120px",
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
      id: "discount",
      header: "Discount",
      accessorKey: "discount",
      width: "120px",
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
      id: "actions",
      header: "",
      accessorKey: "actions",
      width: "60px",
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
