"use client"

import { useTranslations } from "next-intl"

import {
  EmployeeDetailsGroupContainer,
  EmployeeDetailsItemGroup,
} from "@/components/container/hrms/employee/employee-details-group"
import { PrivateInformation } from "@/types/hrms/employee/employee.types"
import { formatDate } from "@/utils/format-date"

type Props = {
  privateInformationData: PrivateInformation
}

const PrivateInformationDetails = ({ privateInformationData }: Props) => {
  const t = useTranslations("hrms")
  const tForm = useTranslations("form")

  const privateContactData = {
    [tForm("form-street")]: privateInformationData?.street,
    [tForm("form-state")]: privateInformationData?.state,
    [tForm("form-city")]: privateInformationData?.city,
    [tForm("form-zip")]: privateInformationData?.zip,
    [tForm("form-email")]: privateInformationData?.email,
    [tForm("form-phone")]: privateInformationData?.phone,
    [tForm("form-salary-account")]: privateInformationData?.bankAccountName,
  }

  const emergencyContactData = {
    [tForm("form-name")]: privateInformationData?.emergencyContactName,
    [tForm("form-emergency-contact-relation")]:
      privateInformationData?.emergencyContactRelation,
    [tForm("form-email")]: privateInformationData?.emergencyContactEmail,
    [tForm("form-phone")]: privateInformationData?.emergencyContactPhone,
  }

  const workPermitData = {
    [tForm("form-visa-no")]: privateInformationData?.visaNo,
    [tForm("form-visa-expire-date")]: privateInformationData?.visaExpireDate
      ? formatDate(privateInformationData.visaExpireDate)
      : "",
    [tForm("form-work-permit-no")]: privateInformationData?.workPermitNo,
    [tForm("form-work-permit-expire-date")]:
      privateInformationData?.workPermitExpireDate
        ? formatDate(privateInformationData?.workPermitExpireDate)
        : "",
  }

  const citizenshipData = {
    [tForm("form-nationality")]: privateInformationData?.nationality,
    [tForm("form-gender")]: privateInformationData?.gender,
    [tForm("form-nid-no")]: privateInformationData?.nidNo,
    [tForm("form-date-of-birth")]: privateInformationData?.dateOfBirth
      ? formatDate(privateInformationData?.dateOfBirth)
      : "",
    [tForm("form-ssn")]: privateInformationData?.ssn,
    [tForm("form-place-of-birth")]: privateInformationData?.placeOfBirth,
    [tForm("form-passport-no")]: privateInformationData?.passportNo,
  }

  return (
    <section id="privateInformation" className="scroll-mt-[150px]">
      <EmployeeDetailsGroupContainer title={t("text-private-information")}>
        <EmployeeDetailsItemGroup
          title={tForm("form-private-contact")}
          data={privateContactData}
        />
        <EmployeeDetailsItemGroup
          title={tForm("form-emergency-contact")}
          data={emergencyContactData}
        />
        <EmployeeDetailsItemGroup
          title={tForm("form-work-permit")}
          data={workPermitData}
        />
        <EmployeeDetailsItemGroup
          title={tForm("form-citizenship")}
          data={citizenshipData}
          containerClassName="border-none"
        />
      </EmployeeDetailsGroupContainer>
    </section>
  )
}

export default PrivateInformationDetails
