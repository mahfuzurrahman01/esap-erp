"use client"

import React from "react"

import PageHeader, { PageHeaderTypes } from "@/components/base/page-header"
import DocumentataionContainer from "../../containers/documentation"
export default function DocumentationListTemplate({
  pageHeader,
}: {
  pageHeader: PageHeaderTypes
}) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <div className="@container">
        <DocumentataionContainer />
      </div>
    </>
  )
}
