import { z } from "zod"

import { messages } from "@/config/messages"

export const CreateSupplierSchema = z.object({
  firstName: z.string().min(1, { message: messages.firstName }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, messages.lastName),
  companyName: z.string().min(1, messages.companyName),
  companyWebsite: z.string().optional(),
  companyAddress: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  contactNumber: z.string().min(1, messages.contactNumber),
  contactEmail: z
    .string()
    .email(messages.contactEmail)
    .min(1, messages.contactEmail),
  supplierCategoryId: z.number().min(1, messages.supplierCategoryId),
  countryId: z.number().min(1, messages.countryId),
  countryName: z.string().optional(),
  avatarFile: z.any().optional(),
  SupplierLegalInformation: z.object({
    businessLicenseNumber: z
      .string()
      .min(1, messages.businessLicenseNumberIsRequired),
    taxIdentificationNumber: z.string().optional(),
    ksaTaxClassification: z.string().optional(),
    vatRegistrationNumber: z.string().optional(),
    zakatCertificateFile: z.any().optional(),
    complianceCertificationFile: z.any().optional(),
    insuranceCertificateFile: z.any().optional(),
    antiCorruptionCompliance: z.boolean().optional(),
    ethicalSourcingAgreement: z.boolean().optional(),
    supplierCodeOfConductAgreement: z.boolean().optional(),
    legalRepresentativeDetails: z.string().optional(),
    commercialRegistration: z.string().optional(),
    dunsNumber: z.string().optional(),
  }),
  SupplierBankAccountDetail: z.object({
    bankName: z.string().min(1, messages.bankName),
    branchName: z.string().min(1, messages.branchName),
    accountHolderName: z.string().min(1, messages.accountHolderName),
    accountNumber: z.string().min(1, messages.accountNumber),
    address: z.string().optional(),
    routingNumber: z.string().min(1, messages.routingNumberIsRequired),
    accountVerificationFile: z.any().optional(),
    paymentTermsId: z.number().optional(),
    countryId: z.number().min(1, messages.countryId),
    countryName: z.string().optional(),
    currencyId: z.number().min(1, messages.currencyId),
    currencyName: z.string().optional(),
  }),
})

export type CreateSupplierInputSchemaInput = z.infer<
  typeof CreateSupplierSchema
>

export const UpdateSupplierSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
  companyName: z.string().optional(),
  companyWebsite: z.string().optional(),
  companyAddress: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  contactNumber: z.string().optional(),
  contactEmail: z.string().email(messages.contactEmail).optional(),
  avatarFile: z.any().optional(),
  supplierCategoryId: z.number().optional(),
  countryId: z.number().optional(),
  countryName: z.string().optional(),
  updateSupplierLegalInformationDto: z.object({
    businessLicenseNumber: z.string().optional(),
    taxIdentificationNumber: z.string().optional(),
    ksaTaxClassification: z.string().optional(),
    vatRegistrationNumber: z.string().optional(),
    zakatCertificateFile: z.any().optional(),
    complianceCertificationFile: z.any().optional(),
    insuranceCertificateFile: z.any().optional(),
    antiCorruptionCompliance: z.boolean().optional(),
    ethicalSourcingAgreement: z.boolean().optional(),
    supplierCodeOfConductAgreement: z.boolean().optional(),
    legalRepresentativeDetails: z.string().optional(),
    commercialRegistration: z.string().optional(),
    dunsNumber: z.string().optional(),
  }),
  updateSupplierBankAccountDetailDto: z.object({
    bankName: z.string().optional(),
    branchName: z.string().optional(),
    accountHolderName: z.string().optional(),
    accountNumber: z.string().optional(),
    address: z.string().optional(),
    routingNumber: z.string().optional(),
    accountVerificationFile: z.any().optional(),
    paymentTermsId: z.number().optional(),
    countryId: z.number().optional(),
    countryName: z.string().optional(),
    currencyId: z.number().optional(),
    currencyName: z.string().optional(),
  }),
})

export type UpdateSupplierInputSchemaInput = z.infer<
  typeof UpdateSupplierSchema
>
