"use client"

import React from "react"

import PageHeader, { PageHeaderTypes } from "@/components/base/page-header"

import ReminderTable from "@/modules/crm/components/containers/reminder/table"

export default function ReminderListTemplate({
  pageHeader,
}: {
  pageHeader: PageHeaderTypes
}) {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <ReminderTable />
    </>
  )
}
