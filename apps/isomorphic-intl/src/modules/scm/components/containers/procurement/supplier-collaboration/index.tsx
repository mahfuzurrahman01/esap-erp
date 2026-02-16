"use client";

import React from "react";
import { useSupplierCollaborationList } from "@/modules/scm/hooks";



import MessageDetails from "./message-details";
import MessageList from "./message-list";
import SideMenuList from "./side-menu";
import { useQueryParams } from "@/hooks/use-query-params";
import { SupplierCollaborationQueryOptions } from "@/modules/scm/types/procurement/supplier/supplier-collaboration-types";





export default function SupplierCollaboration() {
  const { params, updateParams } = useQueryParams<SupplierCollaborationQueryOptions>({
    params: [
      {
        key: "search",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "pageIndex",
        defaultValue: 1,
        parse: (value) => Number(value) || 1,
      },
      {
        key: "pageSize",
        defaultValue: 10,
        parse: (value) => Number(value) || 10,
      },
    ],
  })

  const { data: supplierCollaboration, isLoading } =
    useSupplierCollaborationList({
      search: params.search,
      pageIndex: params.pageIndex,
      pageSize: params.pageSize,
    })



  return (
    <div className="card-shadow !dark:bg-paper border-none !bg-gray-200 p-3 @container dark:!bg-gray-800">
      <div className="grid-cols-12 items-start @4xl:grid @4xl:grid-cols-12 @4xl:gap-3 @[1550px]:grid-cols-12">
        <SideMenuList
          className="col-span-3 rounded-xl border-none p-4 @xs:col-span-12 @4xl:col-span-2 @[1550px]:col-span-2"
          data={supplierCollaboration ?? []}
        />
        <MessageList
          className="col-span-3 rounded-xl border-none bg-paper p-4 @xs:col-span-12 @4xl:col-span-3 @[1550px]:col-span-3 dark:bg-gray-900"
          data={supplierCollaboration ?? []}
          params={params}
          updateParams={updateParams}
          isLoading={isLoading}
        />

        <MessageDetails className="col-span-6 rounded-xl border-none bg-paper @xs:col-span-12 @4xl:col-span-7 @[1550px]:col-span-7 dark:bg-gray-900" />
      </div>
    </div>
  )
}