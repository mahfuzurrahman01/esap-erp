"use client"

import React from "react"

import ExportButton from "@/components/ui/export-button"
import { leadStatusOptions } from "@/data/crm/leads"

const headers = [
  "SL",
  "Company",
  "First Name",
  "lead Name",
  "Status",
  "Status Count",
].join(", ")

const getStatusLabel = (statusValue:any) => {
  const status = leadStatusOptions.find((option) => option.value === String(statusValue))
  return status ? status.label : "Unknown"
}

const transformData = (data: any) =>
  data.map((item: any, index:number) => ({
    sl: index + 1,
    clientCompany: item.company,
    firstName: item.firstName,
    leadName: item.leadName,
    leadStatus: getStatusLabel(item.leadStatus),
    leadStatusCount: item.leadStatusCount,
  }))

export default function ExportLeadsReport(data: any) {
  const leadsData = data.data || []
  console.log('leadsData',leadsData)
  return (
    <ExportButton
      data={transformData(leadsData)}
      fileName="leads-data"
      header={headers}
    />
  )
}
