"use client"

import React from "react"
import ExportButton from "@/components/ui/export-button"
import dayjs from "dayjs"

const headers = [
  "Message",
  "Operation Name",
  "IP Address",
  "Time"
].join(", ")

const transformData = (data: any) =>
  data.map((item: any) => ({
    message: item.message || "N/A",
    actionName: item.actionName,
    ipAddress: item.ipAddress || "N/A",
    time: item.timestamp && dayjs(item.timestamp).format("DD/MM/YYYY hh:mm a"),
  }))

export default function ExportLogsReport({ data }: { data: any }) {
  const logsData = data || []
  return (
    <ExportButton
      data={transformData(logsData)}
      fileName="Logs-data"
      header={headers}
    />
  )
}