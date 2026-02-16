"use client"

import React from "react"
import ExportButton from "@/components/ui/export-button"

const headers = [
  "Number of Tasks",
  "Number of Tickets",
  "Quarter",
  "Month",
  "Year",
].join(", ")

const transformData = (data: any) =>
  data.map((item: any) => ({
    numberOfTask: item.numberOfTask,
    numberOfTicket: item.numberOfTicket,
    quarter: item.quarter,
    month: item.month,
    year: item.year,
  }))

export default function ExportTicketsReport({ data }: { data: any }) {
  const ticketsData = data || []
  return (
    <ExportButton
      data={transformData(ticketsData)}
      fileName="tickets-data"
      header={headers}
    />
  )
}