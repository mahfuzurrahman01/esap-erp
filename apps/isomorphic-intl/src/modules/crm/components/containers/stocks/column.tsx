"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { useMemo } from "react"

import AvatarCard from "@core/ui/avatar-card"
import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import EyeIcon from "@/components/icons/eye"
import PencilIcon from "@/components/icons/pencil"
import { routes } from "@/config/routes"
import { useProductById } from "@/modules/crm/hooks/use-product"
import { ProductView } from "@/modules/crm/types/product"
import { StockList } from "@/modules/crm/types/stock"

import AssignedToCell from "../user/assigned-to-cell"
import UserByEmail from "../user/user-by-email"

const ProductDrawerView = dynamic(
  () => import("@/components/base/notifications/drawer-view"),
  {
    ssr: false,
  }
)

const StockFormDrawerView = dynamic(() => import("./stock-form-drawer-view"), {
  ssr: false,
})

const columnHelper = createColumnHelper<StockList>()

const ProductCell = ({ productId }: { productId?: string }) => {
  const tableT = useTranslations("table")
  const { data, isLoading: isUserLoading } = useProductById(productId) as {
    data: { data: ProductView } | undefined
    isLoading: boolean
  }
  return isUserLoading ? (
    <Text className="font-medium text-gray-900 dark:text-gray-0">
      {tableT("table-text-loading")}
    </Text>
  ) : (
    <AvatarCard
      src={data?.data?.productPicturePath as string}
      name={data?.data?.name || ""}
    />
  )
}

export const useColumn = () => {
  const tableT = useTranslations("table")
  const { openDrawer } = useDrawer()

  const columns = useMemo(() => {
    const item = tableT("table-text-item")
    const warehouse = tableT("table-text-warehouse")
    const quantity = tableT("table-text-quantity")
    const createdBy = tableT("table-text-created-by")
    const id = tableT("table-text-id")

    return [
      columnHelper.accessor("id", {
        id: "id",
        size: 60,
        header: ({ table }) => (
          <span className="inline-block">
            <div className="flex items-center gap-12">
              <Checkbox
                aria-label="Select all rows"
                checked={table.getIsAllPageRowsSelected()}
                onChange={() => table.toggleAllPageRowsSelected()}
                inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500/20"
                iconClassName="w-[18px] h-[18px]"
              />
              <Text className="font-medium text-gray-900 dark:text-gray-0">
                {id}
              </Text>
            </div>
          </span>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-12">
            <Checkbox
              aria-label="Select row"
              checked={row.getIsSelected()}
              onChange={() => row.toggleSelected()}
              inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500/20"
              iconClassName="w-[18px] h-[18px]"
            />
            <Text
              className="cursor-pointer font-medium text-gray-900 dark:text-gray-0"
              onClick={() => {
                openDrawer({
                  view: (
                    <StockFormDrawerView id={row.original.id} view={true} />
                  ),
                  placement: "right",
                  containerClassName: "max-w-[26.25rem] dropdown-gr",
                })
              }}>
              {row.original.shortOrder}
            </Text>
          </div>
        ),
      }),
      columnHelper.accessor("productName", {
        id: "productName",
        size: 300,
        header: item,
        cell: ({ row }) => {
          return (
            <span
              className="cursor-pointer"
              onClick={() =>
                openDrawer({
                  view: <ProductDrawerView id={row.original.productId} />,
                  placement: "right",
                  containerClassName: "lg:min-w-[26.25rem] dropdown-gr",
                })
              }>
              <ProductCell productId={row.original.productId} />
            </span>
          )
        },
        enableSorting: false,
      }),
      columnHelper.accessor("warehouseId", {
        id: "warehouseId",
        size: 240,
        header: warehouse,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.warehouseId}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("stockQuantity", {
        id: "stockQuantity",
        size: 150,
        header: quantity,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.stockQuantity}
          </Text>
        ),
      }),
      columnHelper.accessor("createdBy", {
        id: "createdBy",
        size: 150,
        header: createdBy,
        cell: ({ row }) => {
          if (row.original.createdBy && row.original.createdBy.includes("@")) {
            return <UserByEmail email={row.original.createdBy} />
          } else {
            return (
              <Link href={routes.crm.viewProfile(row.original.createdBy ?? "")}>
                <AssignedToCell assignedTo={row.original.createdBy} />
              </Link>
            )
          }
        },
      }),
      columnHelper.accessor("action", {
        id: "actions",
        size: 160,
        header: "",
        enablePinning: true,
        enableSorting: false,
        cell: ({
          row,
          table: {
            options: { meta },
          },
        }) => (
          <>
            <div className="flex items-center justify-end gap-3 pe-3">
              <Tooltip
                size="sm"
                content={tableT("table-text-edit-stock")}
                placement="top"
                className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
                arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
                color="invert">
                <ActionIcon
                  as="button"
                  size="sm"
                  variant="outline"
                  rounded="lg"
                  className="h-6 w-7 border-gray-500/20"
                  onClick={() => {
                    openDrawer({
                      view: <StockFormDrawerView id={row.original.id} />,
                      placement: "right",
                      containerClassName: "max-w-[26.25rem] dropdown-gr",
                    })
                  }}>
                  <PencilIcon className="h-4 w-4" />
                </ActionIcon>
              </Tooltip>
              <Tooltip
                size="sm"
                content={tableT("table-text-view-stock")}
                placement="top"
                className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
                arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
                color="invert">
                <ActionIcon
                  as="button"
                  size="sm"
                  variant="outline"
                  rounded="lg"
                  className="h-6 w-7 border-gray-500/20"
                  onClick={() => {
                    openDrawer({
                      view: (
                        <StockFormDrawerView id={row.original.id} view={true} />
                      ),
                      placement: "right",
                      containerClassName: "max-w-[26.25rem] dropdown-gr",
                    })
                  }}>
                  <EyeIcon className="h-4 w-4" />
                </ActionIcon>
              </Tooltip>
              <DeletePopover
                title="table-text-delete-stock"
                description={tableT("table-text-delete-confirm-stock")}
                onDelete={() =>
                  meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                }
              />
            </div>
          </>
        ),
      }),
    ]
  }, [tableT])

  return columns
}
