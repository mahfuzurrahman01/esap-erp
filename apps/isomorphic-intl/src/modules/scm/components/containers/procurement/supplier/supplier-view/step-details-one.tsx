"use client"

import Link from "next/link"
import React from "react"

import { useTranslations } from "next-intl"
import { Empty, Text } from "rizzui"

import FormGroup from "@/components/base/form-group"
import PdfIcon from "@/components/icons/pdf-icon"
import { Button, Checkbox, Input } from "@/components/ui"
import { Supplier } from "@/modules/scm/types/procurement/supplier/supplier-types"

type indexProps = {
  supplierData: Supplier
}

export default function ComplianceLegalInfo({ supplierData }: indexProps) {
  const t = useTranslations("common")
  return (
    <div className="p-6 @container">
      <FormGroup
        title={t("text-compliance-and-legal-information")}
        className="mb-6">
        <div>
          <Input
            label={t("text-business-license-number")}
            value={
              supplierData?.supplierLegalInformationDto?.businessLicenseNumber
            }
            readOnly
            disabled
          />
        </div>
        <div>
          <Input
            label={t("text-tax-identification-number")}
            value={
              supplierData?.supplierLegalInformationDto?.taxIdentificationNumber
            }
            readOnly
            disabled
          />
        </div>
        <div>
          <Input
            label={t("text-ksa-tax-classification")}
            value={
              supplierData?.supplierLegalInformationDto?.ksaTaxClassification
            }
            readOnly
            disabled
          />
        </div>
        <div>
          <Input
            label={t("text-vat-registration-number")}
            value={
              supplierData?.supplierLegalInformationDto?.vatRegistrationNumber
            }
            readOnly
            disabled
          />
        </div>
      </FormGroup>

      <FormGroup title={t("text-zakat-certificate")} className="mb-6">
        {supplierData?.supplierLegalInformationDto?.zakatCertificateUrl ===
        "" ? (
          <Empty text="No Data" textClassName="mt-2" />
        ) : (
          <div className="col-span-full flex items-center justify-between rounded-lg">
            <div className="flex items-center">
              <PdfIcon className="mr-2 h-8 w-8" />
              <Text className="font-base text-gray-900 dark:text-gray-0">
                {t("text-document")}
              </Text>
            </div>
            <Button variant="outline">
              <Link
                href={
                  supplierData?.supplierLegalInformationDto
                    ?.zakatCertificateUrl || ""
                }
                download>
                {t("text-download")}
              </Link>
            </Button>
          </div>
        )}
      </FormGroup>

      <FormGroup title={t("text-compliance-certifications")} className="mb-6">
        {supplierData?.supplierLegalInformationDto
          ?.complianceCertificationUrl === "" ? (
          <Empty text="No Data" textClassName="mt-2" />
        ) : (
          <div className="col-span-full flex items-center justify-between rounded-lg">
            <div className="flex items-center">
              <PdfIcon className="mr-2 h-8 w-8" />
              <Text className="font-base text-gray-900 dark:text-gray-0">
                {t("text-document")}
              </Text>
            </div>
            <Button variant="outline">
              <Link
                href={
                  supplierData?.supplierLegalInformationDto
                    ?.complianceCertificationUrl || ""
                }
                download>
                {t("text-download")}
              </Link>
            </Button>
          </div>
        )}
      </FormGroup>

      <FormGroup title={t("text-insurance-certificates")} className="mb-6">
        {supplierData?.supplierLegalInformationDto?.insuranceCertificateUrl ===
        "" ? (
          <Empty text="No Data" textClassName="mt-2" />
        ) : (
          <div className="col-span-full flex items-center justify-between rounded-lg">
            <div className="flex items-center">
              <PdfIcon className="mr-2 h-8 w-8" />
              <Text className="font-base text-gray-900 dark:text-gray-0">
                {t("text-document")}
              </Text>
            </div>
            <Button variant="outline">
              <Link
                href={
                  supplierData?.supplierLegalInformationDto
                    ?.insuranceCertificateUrl || ""
                }
                download>
                {t("text-download")}
              </Link>
            </Button>
          </div>
        )}
      </FormGroup>

      <FormGroup title={t("text-compliance-agreements")} className="mb-6">
        <Checkbox
          label={t("text-anti-corruption-compliance")}
          checked={
            supplierData?.supplierLegalInformationDto?.antiCorruptionCompliance
          }
          className="text-title"
          disabled
        />
        <Checkbox
          label={t("text-ethical-sourcing-agreement")}
          checked={
            supplierData?.supplierLegalInformationDto?.ethicalSourcingAgreement
          }
          className="text-title"
          disabled
        />
        <Checkbox
          label={t("text-supplier-code-of-conduct-agreement")}
          checked={
            supplierData?.supplierLegalInformationDto
              ?.supplierCodeOfConductAgreement
          }
          className="text-title"
          disabled
        />
      </FormGroup>

      <FormGroup title={t("text-representative-details")} className="mb-6">
        <div>
          <Input
            label={t("text-representative-name")}
            value={
              supplierData?.supplierLegalInformationDto
                ?.legalRepresentativeDetails
            }
            readOnly
            disabled
          />
        </div>
        <div>
          <Input
            label={t("text-duns-number")}
            value={supplierData?.supplierLegalInformationDto?.dunsNumber}
            readOnly
            disabled
          />
        </div>
        <div>
          <Input
            label={t("text-commercial-registration")}
            value={
              supplierData?.supplierLegalInformationDto?.commercialRegistration
            }
            readOnly
            disabled
          />
        </div>
      </FormGroup>
    </div>
  )
}
