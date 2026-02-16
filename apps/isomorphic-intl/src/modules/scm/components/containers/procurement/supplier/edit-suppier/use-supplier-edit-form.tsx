"use client";

import { useEffect } from "react";



import { useAtom } from "jotai";
import { SubmitHandler } from "react-hook-form";



import { useSupplierById, useUpdateSupplier } from "@/modules/scm/hooks";
import { supplierEditFormAtom } from "@/modules/scm/store/global-store-state";
import { Supplier, SupplierUpdateInput } from "@/modules/scm/types/procurement/supplier/supplier-types";



import { selectedCountryIdAtom, selectedCountryNameAtom } from "./step-form-one";
import { selectedBankCountryIdAtom, selectedBankCountryNameAtom, selectedBankCurrencyIdAtom, selectedBankCurrencyNameAtom } from "./step-form-three";





interface UseSupplierEditFormProps {
  id: number
  initialData?: Supplier
  mode?: "create" | "edit" | "view"
}

export const useSupplierEditForm = ({ id, mode }: UseSupplierEditFormProps) => {
  const isFieldDisabled = mode === "view"

  const [formValues, setFormValues] = useAtom(supplierEditFormAtom)

  const [selectedCountryName] = useAtom(selectedCountryNameAtom)
  // const [selectedCountryId] = useAtom(selectedCountryIdAtom)
  const [selectedBankCountryName] = useAtom(selectedBankCountryNameAtom)
  // const [selectedBankCountryId] = useAtom(selectedBankCountryIdAtom)
  const [selectedBankCurrencyName] = useAtom(selectedBankCurrencyNameAtom)
  // const [selectedBankCurrencyId] = useAtom(selectedBankCurrencyIdAtom)

  const { data: supplierDetails, isLoading: isSupplierDetailsLoading } =
    useSupplierById(id) as {
      data: Supplier | undefined
      isLoading: boolean
    }

  useEffect(() => {
    if (supplierDetails) {
      setFormValues({
        ...supplierDetails,
        id: supplierDetails.id, // Ensure ID is included
        firstName: supplierDetails.firstName || "",
        middleName: supplierDetails.middleName || "",
        lastName: supplierDetails.lastName || "",
        companyName: supplierDetails.companyName || "",
        companyWebsite: supplierDetails.companyWebsite || "",
        companyAddress: supplierDetails.companyAddress || "",
        city: supplierDetails.city || "",
        state: supplierDetails.state || "",
        zipCode: supplierDetails.zipCode || "",
        street: supplierDetails.street || "",
        countryName: selectedCountryName || supplierDetails.countryName || "",
        countryId: supplierDetails.countryId || 0,
        supplierCategoryId: supplierDetails.supplierCategoryId || 0,
        avatarFile: supplierDetails.imageUrl || undefined,
        updateSupplierLegalInformationDto: {
          ...supplierDetails.supplierLegalInformationDto,
          id: supplierDetails.supplierLegalInformationDto.id,
          businessLicenseNumber:
            supplierDetails.supplierLegalInformationDto.businessLicenseNumber ||
            "",
          vatRegistrationNumber:
            supplierDetails.supplierLegalInformationDto.vatRegistrationNumber ||
            "",
          zakatCertificateFile:
            supplierDetails.supplierLegalInformationDto.zakatCertificateUrl ||
            undefined,
          complianceCertificationFile:
            supplierDetails.supplierLegalInformationDto
              .complianceCertificationUrl || "",
          insuranceCertificateFile:
            supplierDetails.supplierLegalInformationDto
              .insuranceCertificateUrl || "",
          legalRepresentativeDetails:
            supplierDetails.supplierLegalInformationDto
              .legalRepresentativeDetails || "",
          commercialRegistration:
            supplierDetails.supplierLegalInformationDto
              .commercialRegistration || "",
          dunsNumber:
            supplierDetails.supplierLegalInformationDto.dunsNumber || "",
          taxIdentificationNumber:
            supplierDetails.supplierLegalInformationDto
              .taxIdentificationNumber || "",
          ksaTaxClassification:
            supplierDetails.supplierLegalInformationDto.ksaTaxClassification ||
            "",
          antiCorruptionCompliance:
            supplierDetails.supplierLegalInformationDto
              .antiCorruptionCompliance || false,
          ethicalSourcingAgreement:
            supplierDetails.supplierLegalInformationDto
              .ethicalSourcingAgreement || false,
          supplierCodeOfConductAgreement:
            supplierDetails.supplierLegalInformationDto
              .supplierCodeOfConductAgreement || false,
        },
        updateSupplierBankAccountDetailDto: {
          ...supplierDetails.supplierBankAccountDetailDto,
          id: supplierDetails.supplierBankAccountDetailDto.id,
          bankName: supplierDetails.supplierBankAccountDetailDto.bankName || "",
          branchName:
            supplierDetails.supplierBankAccountDetailDto.branchName || "",
          accountHolderName:
            supplierDetails.supplierBankAccountDetailDto.accountHolderName ||
            "",
          accountNumber:
            supplierDetails.supplierBankAccountDetailDto.accountNumber || "",
          address: supplierDetails.supplierBankAccountDetailDto.address || "",
          routingNumber:
            supplierDetails.supplierBankAccountDetailDto.routingNumber || "",
          accountVerificationFile:
            supplierDetails.supplierBankAccountDetailDto
              .accountVerificationDocument || "",
          paymentTermsId:
            supplierDetails.supplierBankAccountDetailDto.paymentTermsId ||
            undefined,
          countryName:
            selectedBankCountryName ||
            supplierDetails.supplierBankAccountDetailDto.countryName ||
            "",
          currencyName:
            selectedBankCurrencyName ||
            supplierDetails.supplierBankAccountDetailDto.currencyName ||
            "",
          countryId:
            supplierDetails.supplierBankAccountDetailDto.countryId || 0,
          currencyId:
            supplierDetails.supplierBankAccountDetailDto.currencyId || 0,
        },
      })
    }
  }, [supplierDetails])

  const { mutateAsync: updateSupplier, isPending: isUpdating } =
    useUpdateSupplier()

  const getFormValues = () => formValues

  const onSubmit: SubmitHandler<SupplierUpdateInput> = async (
    formData: SupplierUpdateInput
  ) => {
    if (mode === "edit" && supplierDetails) {
      try {
        const updateData = {
          ...formData,
          id,
          countryName: selectedCountryName || formData.countryName,
          updateSupplierBankAccountDetailDto: {
            ...formData.updateSupplierBankAccountDetailDto,
            id: supplierDetails.supplierBankAccountDetailDto.id,
            countryName:
              selectedBankCountryName ||
              formData.updateSupplierBankAccountDetailDto.countryName,
            currencyName:
              selectedBankCurrencyName ||
              formData.updateSupplierBankAccountDetailDto.currencyName,
          },
          updateSupplierLegalInformationDto: {
            ...formData.updateSupplierLegalInformationDto,
            id: supplierDetails.supplierLegalInformationDto.id,
          },
        }
        // const cleanedData = JSON.parse(JSON.stringify(updateData))

        await updateSupplier({
          data: updateData,
        })
      } catch (error) {
        console.error("Error updating supplier:", error)
        throw error
      }
    }
  }

  return {
    isFieldDisabled,
    onSubmit,
    getFormValues,
    formValues,
    isLoading: isSupplierDetailsLoading || isUpdating,
  }
}