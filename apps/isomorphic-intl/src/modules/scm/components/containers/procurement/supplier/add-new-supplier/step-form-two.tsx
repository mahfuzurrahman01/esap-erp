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
import { SupplierCreateInput } from "@/modules/scm/types/procurement/supplier/supplier-types"

interface CompanyDetailsFormProps {
  isFieldDisabled?: boolean
  formMethods: {
    register: UseFormRegister<SupplierCreateInput>
    control: Control<SupplierCreateInput>
    formState: FormState<SupplierCreateInput>
    setValue: any
  }
}

export default function ComplianceLegalInfoForm({
  isFieldDisabled,
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
            {...register("SupplierLegalInformation.businessLicenseNumber", {
              required: true,
            })}
            error={
              errors.SupplierLegalInformation?.businessLicenseNumber?.message
                ? t(
                    errors.SupplierLegalInformation?.businessLicenseNumber
                      ?.message
                  )
                : ""
            }
            labelClassName="bg-paper"
            isRequired
            label={t("form-business-license-number")}
            disabled={isFieldDisabled}
          />
          <Input
            {...register("SupplierLegalInformation.taxIdentificationNumber", {
              required: true,
            })}
            error={
              errors.SupplierLegalInformation?.taxIdentificationNumber?.message
                ? t(
                    errors.SupplierLegalInformation?.taxIdentificationNumber
                      ?.message
                  )
                : ""
            }
            labelClassName="bg-paper"
            label={t("form-tax-identification-number")}
            disabled={isFieldDisabled}
          />
          <Input
            {...register("SupplierLegalInformation.ksaTaxClassification", {
              required: true,
            })}
            error={
              errors.SupplierLegalInformation?.ksaTaxClassification?.message
                ? t(
                    errors.SupplierLegalInformation?.ksaTaxClassification
                      ?.message
                  )
                : ""
            }
            labelClassName="bg-paper"
            label={t("form-ksa-tax-classification")}
            disabled={isFieldDisabled}
          />
          <Input
            {...register("SupplierLegalInformation.vatRegistrationNumber", {
              required: true,
            })}
            error={
              errors.SupplierLegalInformation?.vatRegistrationNumber?.message
                ? t(
                    errors.SupplierLegalInformation?.vatRegistrationNumber
                      ?.message
                  )
                : ""
            }
            labelClassName="bg-paper"
            label={t("form-vat-registration-number")}
            disabled={isFieldDisabled}
          />
        </FormGroup>

        {/* Zakat Certificate Upload */}
        <SectionGroup title={t("form-zakat-certificate")}>
          {/* <Controller
            name="SupplierLegalInformation.zakatCertificateFile"
            control={control}
            render={({ field: { onChange, value } }) => (
              <UploadZone
                className="col-span-full"
                onChange={(file) => onChange(file)}
                value={value}
              />
            )}
          /> */}
          <Controller
            name="SupplierLegalInformation.zakatCertificateFile"
            control={control}
            render={({ field: { onChange, value } }) => (
              <UploadZone
                name="zakatCertificateFile" // Unique name for this field
                className="col-span-full"
                onChange={(file) => onChange(file)} // Updates only this field
                value={value}
              />
            )}
          />
        </SectionGroup>

        {/* Compliance Certifications Upload */}
        <SectionGroup title={t("form-compliance-certifications")}>
          <Controller
            name="SupplierLegalInformation.complianceCertificationFile"
            control={control}
            render={({ field: { onChange, value } }) => (
              <UploadZone
                className="col-span-full"
                onChange={(file) => onChange(file)}
                value={value}
                name="complianceCertificationFile"
              />
            )}
          />
        </SectionGroup>

        {/* Insurance Certificates Upload */}
        <SectionGroup title={t("form-insurance-certificates")}>
          <Controller
            name="SupplierLegalInformation.insuranceCertificateFile"
            control={control}
            render={({ field: { onChange, value } }) => (
              <UploadZone
                className="col-span-full"
                onChange={(file) => onChange(file)}
                value={value}
                name="insuranceCertificateFile"
              />
            )}
          />
        </SectionGroup>

        {/* Legal Representative Details */}
        <SectionGroup>
          <Input
            {...register(
              "SupplierLegalInformation.legalRepresentativeDetails",
              { required: true }
            )}
            error={
              errors.SupplierLegalInformation?.legalRepresentativeDetails
                ?.message
                ? t(
                    errors.SupplierLegalInformation?.legalRepresentativeDetails
                      ?.message
                  )
                : ""
            }
            labelClassName="bg-paper"
            label={t("form-legal-representative-name")}
            disabled={isFieldDisabled}
          />
          <Input
            {...register("SupplierLegalInformation.commercialRegistration", {
              required: true,
            })}
            error={
              errors.SupplierLegalInformation?.commercialRegistration?.message
                ? t(
                    errors.SupplierLegalInformation?.commercialRegistration
                      ?.message
                  )
                : ""
            }
            labelClassName="bg-paper"
            label={t("form-commercial-registration")}
            disabled={isFieldDisabled}
          />
          <Input
            {...register("SupplierLegalInformation.dunsNumber", {
              required: true,
            })}
            error={
              errors.SupplierLegalInformation?.dunsNumber?.message
                ? t(errors.SupplierLegalInformation?.dunsNumber?.message)
                : ""
            }
            labelClassName="bg-paper"
            label={t("form-duns-number")}
            disabled={isFieldDisabled}
          />
        </SectionGroup>

        {/* Anti-Corruption Compliance, Ethical Sourcing Agreement, and Supplier Code of Conduct Agreement */}
        <SectionGroup>
          <Controller
            name="SupplierLegalInformation.antiCorruptionCompliance"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                label={t("form-anti-corruption-compliance")}
                checked={value}
                onChange={onChange}
              />
            )}
          />
          {errors.SupplierLegalInformation?.antiCorruptionCompliance && (
            <p className="text-sm text-red-500">
              {errors.SupplierLegalInformation?.antiCorruptionCompliance.message
                ? t(
                  errors.SupplierLegalInformation?.antiCorruptionCompliance
                    .message
                )
                : ""}
            </p>
          )}
          <Controller
            name="SupplierLegalInformation.ethicalSourcingAgreement"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                label={t("form-ethical-sourcing-agreement")}
                checked={value}
                onChange={onChange}
              />
            )}
          />
          {errors.SupplierLegalInformation?.ethicalSourcingAgreement && (
            <p className="text-sm text-red-500">
              {errors.SupplierLegalInformation?.ethicalSourcingAgreement.message
                ? t(
                  errors.SupplierLegalInformation?.ethicalSourcingAgreement
                    .message
                )
                : ""}
            </p>
          )}
          <Controller
            name="SupplierLegalInformation.supplierCodeOfConductAgreement"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                label={t("form-supplier-code-of-conduct-agreement")}
                checked={value}
                onChange={onChange}
              />
            )}
          />
          {errors.SupplierLegalInformation?.supplierCodeOfConductAgreement && (
            <p className="text-sm text-red-500">
              {errors.SupplierLegalInformation?.supplierCodeOfConductAgreement
                .message
                ? t(
                  errors.SupplierLegalInformation
                    ?.supplierCodeOfConductAgreement.message
                )
                : ""}
            </p>
          )}
        </SectionGroup>
      </FormGroupContainer>
    </>
  )
}
