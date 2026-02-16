"use client"

import { useTranslations } from "next-intl"
import {
  Control,
  Controller,
  FormState,
  UseFormRegister,
} from "react-hook-form"

import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import SectionGroup from "@/components/base/section-group"
import { Checkbox, Input } from "@/components/ui"
import UploadZone from "@/components/ui/upload-zone"
import {
  Supplier,
  SupplierUpdateInput,
} from "@/modules/scm/types/procurement/supplier/supplier-types"

interface CompanyDetailsFormProps {
  supplier: Supplier
  isFieldDisabled?: boolean
  formMethods: {
    register: UseFormRegister<SupplierUpdateInput>
    control: Control<SupplierUpdateInput>
    formState: FormState<SupplierUpdateInput>
    setValue: any
    watch: any
  }
}

export default function ComplianceLegalInfoForm({
  supplier,
  formMethods,
}: CompanyDetailsFormProps) {
  const {
    register,
    control,
    formState: { errors },
  } = formMethods
  const t = useTranslations("form")

  return (
    <>
      <FormGroupContainer>
        <FormGroup
          title={t("form-compliance-legal-information")}
          className="pt-7 @2xl:pt-10 @3xl:pt-11">
          <Input
            {...register(
              "updateSupplierLegalInformationDto.businessLicenseNumber",
              {
                required: true,
              }
            )}
            error={
              errors.updateSupplierLegalInformationDto?.businessLicenseNumber
                ?.message
                ? t(
                    errors.updateSupplierLegalInformationDto?.businessLicenseNumber
                      .message
                  )
                : ""
            }
            labelClassName="bg-paper"
            label={t("form-business-license-number")}
          />
          <Input
            {...register(
              "updateSupplierLegalInformationDto.taxIdentificationNumber",
            )}
            error={
              errors.updateSupplierLegalInformationDto?.taxIdentificationNumber
                ?.message
                ? t(
                    errors.updateSupplierLegalInformationDto
                      ?.taxIdentificationNumber.message
                  )
                : ""
            }
            labelClassName="bg-paper"
            label={t("form-tax-identification-number")}
          />
          <Input
            {...register(
              "updateSupplierLegalInformationDto.ksaTaxClassification"
            )}
            error={
              errors.updateSupplierLegalInformationDto?.ksaTaxClassification
                ?.message
                ? t(
                    errors.updateSupplierLegalInformationDto
                      ?.ksaTaxClassification.message
                  )
                : ""
            }
            labelClassName="bg-paper"
            label={t("form-ksa-tax-classification")}
          />
          <Input
            {...register(
              "updateSupplierLegalInformationDto.vatRegistrationNumber"
            )}
            error={
              errors.updateSupplierLegalInformationDto?.vatRegistrationNumber
                ?.message
                ? t(
                    errors.updateSupplierLegalInformationDto
                      ?.vatRegistrationNumber.message
                  )
                : ""
            }
            labelClassName="bg-paper"
            label={t("form-vat-registration-number")}
          />
        </FormGroup>

        {/* Zakat Certificate Upload */}
        <SectionGroup title={t("form-zakat-certificate")}>
          <Controller
            name="updateSupplierLegalInformationDto.zakatCertificateFile"
            control={control}
            render={({ field: { onChange, value } }) => (
              <UploadZone
                className="col-span-full"
                onChange={(file) => onChange(file)}
                value={value}
              />
            )}
          />
        </SectionGroup>

        {/* Compliance Certifications Upload */}
        <SectionGroup title={t("form-compliance-certifications")}>
          <Controller
            name="updateSupplierLegalInformationDto.complianceCertificationFile"
            control={control}
            render={({ field: { onChange, value } }) => (
              <UploadZone
                className="col-span-full"
                onChange={(file) => onChange(file)}
                value={value}
              />
            )}
          />
        </SectionGroup>

        {/* Insurance Certificates Upload */}
        <SectionGroup title={t("form-insurance-certificates")}>
          <Controller
            name="updateSupplierLegalInformationDto.insuranceCertificateFile"
            control={control}
            render={({ field: { onChange, value } }) => (
              <UploadZone
                className="col-span-full"
                onChange={(file) => onChange(file)}
                value={value}
              />
            )}
          />
        </SectionGroup>

        {/* Legal Representative Details */}
        <SectionGroup>
          <Input
            {...register(
              "updateSupplierLegalInformationDto.legalRepresentativeDetails"
            )}
            error={
              errors.updateSupplierLegalInformationDto?.legalRepresentativeDetails
                ?.message
                ? t(
                    errors.updateSupplierLegalInformationDto
                      ?.legalRepresentativeDetails.message
                  )
                : ""
            }
            labelClassName="bg-paper"
            label={t("form-legal-representative-name")}
          />
          <Input
            {...register(
              "updateSupplierLegalInformationDto.commercialRegistration"
            )}
            error={
              errors.updateSupplierLegalInformationDto?.commercialRegistration
                ?.message
                ? t(
                    errors.updateSupplierLegalInformationDto
                      ?.commercialRegistration.message
                  )
                : ""
            }
            labelClassName="bg-paper"
            label={t("form-commercial-registration")}
          />
          <Input
            {...register("updateSupplierLegalInformationDto.dunsNumber")}
            error={
              errors.updateSupplierLegalInformationDto?.dunsNumber?.message
                ? t(
                    errors.updateSupplierLegalInformationDto?.dunsNumber?.message
                  )
                : ""
            }
            labelClassName="bg-paper"
            label={t("form-duns-number")}
          />
        </SectionGroup>

        {/* Anti-Corruption Compliance, Ethical Sourcing Agreement, and Supplier Code of Conduct Agreement */}
        <SectionGroup>
          <Controller
            name="updateSupplierLegalInformationDto.antiCorruptionCompliance"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                label={t("form-anti-corruption-compliance")}
                checked={value}
                onChange={onChange}
              />
            )}
          />
          <Controller
            name="updateSupplierLegalInformationDto.ethicalSourcingAgreement"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                label={t("form-ethical-sourcing-agreement")}
                checked={value}
                onChange={onChange}
              />
            )}
          />
          <Controller
            name="updateSupplierLegalInformationDto.supplierCodeOfConductAgreement"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                label={t("form-supplier-code-of-conduct-agreement")}
                checked={value}
                onChange={onChange}
              />
            )}
          />
        </SectionGroup>
      </FormGroupContainer>
    </>
  )
}
