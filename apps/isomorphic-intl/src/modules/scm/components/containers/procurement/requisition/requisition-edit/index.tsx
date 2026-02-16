"use client"

import React from "react"

import CreateEditRequisition from "../create-requisition"

export default function EditRequisition({ params }: any) {
  const { id } = params

  return (
    <CreateEditRequisition
      id={Number(id)}
      mode="edit"
      requestFor="requisition"
    />
  )
}
