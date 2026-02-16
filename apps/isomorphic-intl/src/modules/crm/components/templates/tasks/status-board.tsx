"use client"

import React from "react"

import PageHeader, { PageHeaderTypes } from "@/components/base/page-header"
import TasksCardView from "@/modules/crm/components/containers/tasks/kanban"

export default function StatusBoardTemplate({
  pageHeader,
}: {
  pageHeader: PageHeaderTypes
}) {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <TasksCardView />
    </>
  )
}
