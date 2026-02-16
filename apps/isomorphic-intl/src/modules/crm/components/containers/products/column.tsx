import dynamic from "next/dynamic"
import Link from "next/link"
import { useMemo } from "react"

import demoAvatar from "@public/auth/avatar.webp"
import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { HiPauseCircle } from "react-icons/hi2"
import { Checkbox, Text } from "rizzui"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import ListPopover from "@/components/base/list-popover"
import { ApproveIcon } from "@/components/icons/crm/appprove"
import { RejectIcon } from "@/components/icons/crm/reject"
import EyeIcon from "@/components/icons/eye"
import PencilIcon from "@/components/icons/pencil"
import SendIcon from "@/components/icons/send-icon"
import TrashIcon from "@/components/icons/trash"
import { Button } from "@/components/ui"
import Avatar from "@/components/ui/avatar"
import { routes } from "@/config/routes"
import {
  useCreateApproval,
  useUpdateApproval,
} from "@/modules/crm/hooks/use-approval"
import { useCreateNotification } from "@/modules/crm/hooks/use-notification"
import { ProductList } from "@/modules/crm/types/product"

import {
  responseForApproval,
  sendForApproval,
} from "@/components/base/notifications/approval-utils"
import { getApprovalStatusBadge } from "../approvals/status-badge"

const ProductDrawerView = dynamic(() => import("@/components/base/notifications/drawer-view"), {
  ssr: false,
})

const columnHelper = createColumnHelper<ProductList>()

export const useColumn = (refetch: () => void) => {
  const tableT = useTranslations("table")
  const { openDrawer } = useDrawer()
  const createNotification = useCreateNotification()
  const createApproval = useCreateApproval()
  const updateApproval = useUpdateApproval()

  const columns = useMemo(() => {
    const image = tableT("table-text-image")
    const productName = tableT("table-text-name")
    const actualPrice = tableT("table-text-actual-price")
    const salePrice = tableT("table-text-sale-price")
    const category = tableT("table-text-category")
    const attributes = tableT("table-text-attributes")
    const status = tableT("table-text-status")
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
              <Text className="font-medium text-gray-600 dark:text-gray-500">
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
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {row.original.shortOrder}
            </Text>
          </div>
        ),
      }),
      columnHelper.accessor("productName", {
        id: "productName",
        size: 180,
        header: productName,
        cell: ({ row }) => (
          <span
            className="block max-w-[100px] cursor-pointer truncate font-medium text-gray-900 dark:text-gray-0"
            title={row.original.productName}
            onClick={() =>
              openDrawer({
                view: <ProductDrawerView id={row.original.id} />,
                placement: "right",
                containerClassName: "lg:min-w-[26.25rem] dropdown-gr",
              })
            }>
            {row.original.productName}
          </span>
        ),
      }),
      columnHelper.accessor("actualPrice", {
        id: "actualPrice",
        size: 120,
        header: actualPrice,
        cell: ({ row }) => (
          <span
            className="block max-w-[100px] truncate font-medium text-gray-900 dark:text-gray-0"
            title={row.original.actualPrice}>
            {row.original.actualPrice}
          </span>
        ),
      }),
      columnHelper.accessor("salePrice", {
        id: "salePrice",
        size: 100,
        header: salePrice,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.salePrice}
          </Text>
        ),
      }),
      columnHelper.accessor("categoryName", {
        id: "category",
        size: 100,
        header: category,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.categoryName}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("attributeNames", {
        id: "attributeNames",
        size: 100,
        header: attributes,
        cell: ({ row }) => (
          <span className="block max-w-[100px] truncate font-medium text-gray-900 dark:text-gray-0">
            {row.original.attributeNames}
          </span>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("approvalStatus", {
        id: "approvalStatus",
        size: 100,
        header: status,
        cell: (row) =>
          row.renderValue() && getApprovalStatusBadge(row.renderValue()),
        enableSorting: false,
      }),
      columnHelper.accessor("productPicturePath", {
        id: "productPicturePath",
        size: 70,
        header: image,
        cell: ({ row }) => {
          const avatarUrl =
            row?.original?.productPicturePath &&
            row?.original?.productPicturePath.startsWith("http")
              ? row?.original?.productPicturePath
              : demoAvatar.src
          return (
            <Avatar
              src={avatarUrl}
              name={`${row.original.productName}`}
              className="!h-12 w-12 rounded-none"
            />
          )
        },
        enableSorting: false,
      }),

      columnHelper.accessor("action", {
        id: "actions",
        size: 20,
        header: "",
        enablePinning: true,
        enableSorting: false,
        cell: ({
          row,
          table: {
            options: { meta },
          },
        }) => {
          const { id, approvalStatus } = row.original
          return (
            <div className="flex items-center justify-end gap-3 pe-3">
              <ListPopover>
                <Link
                  href={routes.crm.editProduct(id ?? "")}
                  aria-label="Edit Product"
                  className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                  <PencilIcon className="h-4 w-4" />
                  {tableT("table-text-edit")}
                </Link>
                <Button
                  size="sm"
                  variant="text"
                  color="primary"
                  className="h-7 w-full justify-start gap-2 font-semibold text-black transition-colors hover:bg-gray-500/10 hover:text-black dark:text-white"
                  onClick={() =>
                    openDrawer({
                      view: <ProductDrawerView id={id} />,
                      placement: "right",
                      containerClassName: "lg:min-w-[26.25rem] dropdown-gr",
                    })
                  }>
                  <EyeIcon className="h-4 w-4" />
                  {tableT("table-text-view")}
                </Button>
                {approvalStatus && approvalStatus == "Draft" && (
                  <Button
                    size="sm"
                    variant="text"
                    className="h-7 w-full justify-start gap-2 font-semibold text-title transition-colors hover:bg-gray-500/10"
                    onClick={async function () {
                      await sendForApproval(
                        createApproval,
                        createNotification,
                        id,
                        productName,
                        1 // approvalType 1 for product
                      )
                      refetch()
                    }}>
                    <SendIcon className="h-4 w-4" />
                    {tableT("table-text-send-for-approval")}
                  </Button>
                )}
                {approvalStatus && approvalStatus?.toLowerCase() != "draft" && (
                  <>
                    {approvalStatus !== "Approved" && (
                      <Button
                        size="sm"
                        variant="text"
                        className="h-7 w-full justify-start gap-2 font-semibold text-title transition-colors hover:bg-gray-500/10"
                        onClick={async function () {
                          await responseForApproval(
                            updateApproval,
                            id,
                            "Approved",
                            1 // approvalType 1 for product
                          )
                          refetch()
                        }}>
                        <ApproveIcon className="h-4 w-4" />
                        {tableT("table-text-approve")}
                      </Button>
                    )}
                    {approvalStatus !== "Hold" && (
                      <Button
                        size="sm"
                        variant="text"
                        className="h-7 w-full justify-start gap-2 font-semibold text-title transition-colors hover:bg-gray-500/10"
                        onClick={async function () {
                          await responseForApproval(
                            updateApproval,
                            id,
                            "Hold",
                            1 // approvalType 1 for product
                          )
                          refetch()
                        }}>
                        <HiPauseCircle className="h-4 w-4" />
                        {tableT("table-text-hold")}
                      </Button>
                    )}
                    {approvalStatus !== "Declined" && (
                      <Button
                        size="sm"
                        variant="text"
                        className="h-7 w-full justify-start gap-2 font-semibold text-title transition-colors hover:bg-gray-500/10"
                        onClick={async function () {
                          await responseForApproval(
                            updateApproval,
                            id,
                            "Declined",
                            1 // approvalType 1 for product
                          )
                          refetch()
                        }}>
                        <RejectIcon className="h-4 w-4" />
                        {tableT("table-text-decline")}
                      </Button>
                    )}
                  </>
                )}
                {approvalStatus && approvalStatus == "Draft" && (
                  <Button
                    size="sm"
                    variant="text"
                    color="danger"
                    className="h-7 w-full justify-start gap-2 font-semibold text-title hover:bg-red/20 hover:text-red"
                    onClick={() => {
                      meta?.handleDeleteRow &&
                        meta?.handleDeleteRow(row.original)
                    }}>
                    <TrashIcon className="h-4 w-4" />
                    {tableT("table-text-delete")}
                  </Button>
                )}
              </ListPopover>
            </div>
          )
        },
      }),
    ]
  }, [tableT, openDrawer])

  return columns
}
