import { z } from "zod"

import { messages } from "@/config/messages"

const privateInformationSchema = z.object({
  id: z.number().optional(),
  employeeId: z.number().optional(),
  street: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  zip: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().min(1, { message: messages.phoneNumberIsRequired }),
  language: z.string().optional(),
  emergencyContactName: z.string().min(1, {
    message: messages.emergencyContactNameIsRequired,
  }),
  emergencyContactRelation: z.string().min(1, {
    message: messages.emergencyContactRelationIsRequired,
  }),
  emergencyContactEmail: z.string().optional(),
  emergencyContactPhone: z.string().min(1, {
    message: messages.emergencyContactPhoneIsRequired,
  }),
  visaNo: z.string().optional(),
  visaExpireDate: z.union([z.string(), z.null()]).optional(),
  workPermitNo: z.string().optional(),
  workPermitExpireDate: z.union([z.string(), z.null()]).optional(),
  documentPath: z.string().optional(),
  nationality: z.string().optional(),
  gender: z.string().optional(),
  nidNo: z.string().optional(),
  ssn: z.string().optional(),
  passportNo: z.string().optional(),
  dateOfBirth: z.union([z.string(), z.null()]).optional(),
  placeOfBirth: z.string().optional(),
  countryOfBirth: z.string().optional(),
  createdDate: z.string().nullable().optional(),
  updatedDate: z.string().nullable().optional(),
  bankAccountId: z.number().min(1, { message: messages.bankAccountIsRequired }),
  bankAccountName: z.string().optional(),
  bankAccountNumber: z.string().optional(),
  currencyId: z.number().min(1, { message: messages.currencyIsRequired }),
  currencyName: z.string().optional(),
})

type PrivateInformationFormInputType = z.infer<typeof privateInformationSchema>

export { privateInformationSchema, type PrivateInformationFormInputType }
