"use client"

import React from "react"

import { useTranslations } from "next-intl"

import PageHeader, { PageHeaderTypes } from "@/components/base/page-header"
import UserEditForm from "@/components/container/user/edit-form"

export default function UserCreateComponent({
  pageHeader,
}: {
  pageHeader: PageHeaderTypes
}) {
  const t = useTranslations("form")

  return (
    <div className="container mx-auto p-6">
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <div className="card-shadow flex flex-col gap-4 rounded-lg border border-none border-muted bg-gray-0 dark:bg-gray-800">
        <div className="flex items-center justify-between p-4">
          <h2
            className="text-xl font-semibold"
            style={{ marginBottom: "-48px" }}>
            {t("form-information")}
          </h2>
        </div>
        <UserEditForm mode="create" />
      </div>
    </div>
  )
}
