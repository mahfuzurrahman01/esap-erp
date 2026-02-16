import * as z from "zod"

import { messages } from "@/config/messages"

export const workAddressFormSchema = z.object({
  id: z.number().optional(),
  workingAddressName: z.string().min(1, { message: messages.nameIsRequired }),
  addressLine: z.string().min(1, { message: messages.addressLineIsRequired }),
  city: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  taxID: z.number().optional(),
  companyName: z.string().min(1, { message: messages.companyIsRequired }),
  industry: z.string().optional(),
  phone: z.string().optional(),
  email: z
    .union([
      z.string().email({ message: messages.invalidEmail }),
      z.string().max(0),
    ])
    .optional(),
  website: z.string().optional(),
  internalNotes: z.string().optional(),
  createdDate: z.string().nullable().optional(),
  updatedDate: z.string().nullable().optional(),
  companyId: z.number().optional(),
})

export type WorkAddressFormInputType = z.infer<typeof workAddressFormSchema>
export type WorkAddressPutDataType = Partial<WorkAddressFormInputType> & {
  id: number
}
