"use client"

import React from "react"

import ExportButton from "@/components/ui/export-button"

const headers = [
  "SL",
  "Sales Year",
  "Sales Month Name",
  "Number of Sales",
  "Volume",
  "Sale Value",
].join(", ")

const transformData = (data: any) =>
  data.map((item: any) => ({
    sl: item.sl,
    salesYear: item.salesYear,
    salesMonthName: item.salesMonthName,
    numberOfSales: item.numberOfSales,
    volume: item.volume,
    saleValue: item.saleValue || "",
  }))

export default function ExportSales({ data }: { data: any }) {
  //console.log('data', data)
  return (
    <ExportButton
      data={transformData(data)}
      fileName="sales-data"
      header={headers}
    />
  )
}
