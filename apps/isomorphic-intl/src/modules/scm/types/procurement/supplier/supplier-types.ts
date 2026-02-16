import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

import { Invoice } from "../invoice/invoice-types"
import { Contract } from "./contract-types"

interface SupplierBankAccountDetail {
  id?: number
  bankName?: string
  branchName?: string
  accountHolderName?: string
  accountNumber?: string
  address?: string
  routingNumber?: string
  accountVerificationFile?: string
  paymentTermsId?: number
  countryId?: number
  countryName?: string
  currencyId?: number
  currencyName?: string
}

interface SupplierLegalInformation {
  id?: number
  businessLicenseNumber?: string
  taxIdentificationNumber?: string
  ksaTaxClassification?: string
  vatRegistrationNumber?: string
  zakatCertificateFile?: string
  complianceCertificationFile?: string
  insuranceCertificateFile?: string
  antiCorruptionCompliance?: boolean
  ethicalSourcingAgreement?: boolean
  supplierCodeOfConductAgreement?: boolean
  legalRepresentativeDetails?: string
  commercialRegistration?: string
  dunsNumber?: string
}

export interface SupplierInput {
  firstName?: string
  middleName?: string
  lastName?: string
  companyName?: string
  companyWebsite?: string
  companyAddress?: string
  street?: string
  city?: string
  state?: string
  zipCode?: string
  contactNumber?: string
  contactEmail?: string
  supplierCategoryId?: number
  countryId?: number
  countryName?: string
}

export interface SupplierCreateInput extends SupplierInput {
  SupplierLegalInformation: SupplierLegalInformation
  SupplierBankAccountDetail: SupplierBankAccountDetail
  avatarFile?: string
}

export interface SupplierUpdateInput {
  id?: number
  firstName?: string
  middleName?: string
  lastName?: string
  companyName?: string
  companyWebsite?: string
  companyAddress?: string
  street?: string
  city?: string
  state?: string
  zipCode?: string
  contactNumber?: string
  contactEmail?: string
  supplierCategoryId?: number
  countryId?: number
  countryName?: string
  avatarFile?: string
  updateSupplierLegalInformationDto: SupplierLegalInformation
  updateSupplierBankAccountDetailDto: SupplierBankAccountDetail
}

export interface Supplier {
  id: number
  name?: string
  firstName: string
  middleName?: string
  lastName: string
  supplierName?: string
  categoryName?: string
  supplierCategoryName?: string
  companyName: string
  companyWebsite?: string
  companyAddress: string
  street: string
  city: string
  state: string
  zipCode: string
  contactNumber: string
  imageUrl?: string
  contactEmail: string
  supplierCategoryId: number
  countryId: number
  countryName?: string
  supplierLegalInformationDto: {
    id?: number
    businessLicenseNumber?: string
    taxIdentificationNumber?: string
    ksaTaxClassification?: string
    vatRegistrationNumber?: string
    zakatCertificateUrl?: string
    complianceCertificationUrl?: string
    insuranceCertificateUrl?: string
    antiCorruptionCompliance?: boolean
    ethicalSourcingAgreement?: boolean
    supplierCodeOfConductAgreement?: boolean
    legalRepresentativeDetails?: string
    commercialRegistration?: string
    dunsNumber?: string
  }
  supplierBankAccountDetailDto: {
    id?: number
    bankName?: string
    branchName?: string
    accountHolderName?: string
    accountNumber?: string
    address?: string
    routingNumber?: string
    accountVerificationDocument?: string
    paymentTermsId?: number
    countryName?: string
    currencyName?: string
    countryId?: number
    currencyId?: number
  }
  supplierContracts: Contract[]
  supplierInvoices: Invoice[]
}

export interface SupplierQueryOptions extends QueryOptions {
  supplierName?: string
  countryName?: string
  supplierType?: string
  contactNumber?: string
}

export type SupplierPaginator = PaginatedResponse<Supplier>
