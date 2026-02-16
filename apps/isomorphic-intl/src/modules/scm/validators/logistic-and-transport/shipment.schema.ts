import { messages } from "@/config/messages"
import { z } from "zod"

export const ShipmentSchema = z.object({
  stockTransferId: z.number().min(1, messages.stockTransferIdIsRequired),
  carrierId: z.number().min(1, messages.carrierIdIsRequired),
  shipmentDate: z.string().min(1, messages.shipmentDateIsRequired),
})

export const ShipmentReceivedSchema = z.object({
  receivedStatus: z.string().min(1, messages.isReceivedStatusRequired),
  receivedNote: z.string().min(1, messages.approvedNotesIsRequired),
})

export type ShipmentFormInput = z.infer<typeof ShipmentSchema>

export type ShipmentReceivedFormInput = z.infer<typeof ShipmentReceivedSchema>
