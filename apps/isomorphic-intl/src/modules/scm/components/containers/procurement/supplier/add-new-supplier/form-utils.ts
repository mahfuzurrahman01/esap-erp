import {
  SupplierCreateInput,
  SupplierUpdateInput,
} from "@/modules/scm/types/procurement/supplier/supplier-types"

type OperationType = "create" | "update"

export function getDefaultSupplierInput(
  operation: OperationType
): SupplierCreateInput | SupplierUpdateInput {
  const baseInfo = {
    firstName: "",
    middleName: "",
    lastName: "",
    companyName: "",
    companyWebsite: "",
    companyAddress: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    contactNumber: "",
    contactEmail: "",
    supplierCategoryId: 0,
    countryId: 0,
    countryName: "",
    avatarFile: undefined,
  }

  const legalInformation = {
    businessLicenseNumber: "",
    taxIdentificationNumber: "",
    ksaTaxClassification: "",
    vatRegistrationNumber: "",
    zakatCertificateFile: undefined,
    complianceCertificationFile: undefined,
    insuranceCertificateFile: undefined,
    antiCorruptionCompliance: false,
    ethicalSourcingAgreement: false,
    supplierCodeOfConductAgreement: false,
    legalRepresentativeDetails: "",
    commercialRegistration: "",
    dunsNumber: "",
  }

  const bankAccountDetail = {
    bankName: "",
    branchName: "",
    accountHolderName: "",
    accountNumber: "",
    address: "",
    routingNumber: "",
    accountVerificationFile: undefined,
    paymentTermsId: 0,
    countryId: 0,
    countryName: "",
    currencyId: 0,
    currencyName: "",
  }

  if (operation === "create") {
    return {
      ...baseInfo,
      SupplierLegalInformation: legalInformation,
      SupplierBankAccountDetail: bankAccountDetail,
      avatarFile: "",
    }
  } else {
    // 'update'
    return {
      ...baseInfo,
      id: undefined, // Set to undefined to allow for optional specification
      SupplierLegalInformation: legalInformation, // Corrected property name
      SupplierBankAccountDetail: bankAccountDetail, // Corrected property name
      avatarFile: "",
    }
  }
}
