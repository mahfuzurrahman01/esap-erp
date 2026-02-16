"use client"

import React from "react"

import ExportButton from "@/components/ui/export-button"

const headers = [
  "ID",
  "First Name",
  "Last Name",
  "Email",
  "Company",
  "Phone",
  "Address",
  "Description",
  "Lead Source",
  "Industry",
  "Feedback",
  "Assigned To",
  "Region",
  "Status",
  "Owner",
  "Title",
  "Short Order",
  "Created At",
  "Created By",
].join(", ")

const transformData = (data: any) =>
  data.map((item: any) => ({
    id: item.id,
    firstName: item.firstName,
    lastName: item.lastName,
    email: item.email,
    company: item.company,
    phone: item.phone,
    address: item.address,
    description: item.description,
    leadSource: item.leadSource,
    industry: item.industry,
    feedback: item.feedback,
    assignedTo: item.assignedTo,
    region: item.region,
    status: item.status,
    owner: item.owner,
    title: item.title,
    shortOrder: item.shortOrder,
    createdAt: item.createdAt,
    createdBy: item.createdBy,
  }))

export default function ExportLeads({ data }: { data: any }) {
  return (
    <ExportButton
      data={transformData(data)}
      fileName="leads-data"
      header={headers}
    />
  )
}
