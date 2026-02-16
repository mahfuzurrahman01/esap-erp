"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useMemo } from "react"

import cn from "@core/utils/class-names"
import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import Spinner from "@/components/base/spinner"
import TabsNavigation from "@/components/base/tabs-navigation"
import EmployeeBasicInformation from "@/components/container/hrms/employee/basic-information/employee-basic-information"
import PrivateInformationDetails from "@/components/container/hrms/employee/private-information/private-information-details"
import ResumeDetails from "@/components/container/hrms/employee/resume/resume-details"
import WorkInformationDetails from "@/components/container/hrms/employee/work-information/work-information-details"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import { useEmployeeById } from "@/hooks/hrms/employee/use-employee"

const pageHeader = {
  title: "text-employee-details",
  breadcrumb: [
    {
      href: routes.hr.employees,
      name: "text-employees",
    },
    {
      name: "text-employee-details",
    },
  ],
}

const EmployeeDetails = () => {
  const { employeeId } = useParams()
  const t = useTranslations("common")

  const tForm = useTranslations("form")
  const { data, isLoading, isSuccess } = useEmployeeById(Number(employeeId))
  const loader = useMemo(
    () => (
      <div className="flex justify-center">
        <Spinner />
      </div>
    ),
    []
  )

  const tabs = [
    {
      label: tForm("form-resume"),
      content:
        data?.resumes && data?.resumes?.length > 0 ? (
          <ResumeDetails resumes={data?.resumes || []} />
        ) : (
          <Link
            href={routes.hr.resume(`${employeeId}`)}
            className="ml-6 mt-2 flex justify-start">
            <Button
              type="button"
              color="primary"
              variant="outline"
              size="sm"
              className={cn("gap-2 font-bold")}>
              <PiPlusBold /> {t("text-add-resume-information")}
            </Button>
          </Link>
        ),
    },
    {
      label: tForm("form-work-information"),
      content: data?.workInformation ? (
        <WorkInformationDetails workInformation={data?.workInformation || {}} />
      ) : (
        <Link
          href={routes.hr.workInformation(`${employeeId}`)}
          className="ml-6 mt-2 flex justify-start">
          <Button
            type="button"
            color="primary"
            variant="outline"
            size="sm"
            className={cn("gap-2 font-bold")}>
            <PiPlusBold /> {t("text-add-work-information")}
          </Button>
        </Link>
      ),
    },
    {
      label: tForm("form-private-information"),
      content: data?.privateInformation ? (
        <PrivateInformationDetails
          privateInformationData={data?.privateInformation || {}}
        />
      ) : (
        <Link
          href={routes.hr.privateInformation(`${employeeId}`)}
          className="ml-6 mt-2 flex justify-start">
          <Button
            type="button"
            color="primary"
            variant="outline"
            size="sm"
            className={cn("gap-2 font-bold")}>
            <PiPlusBold /> {t("text-add-private-information")}
          </Button>
        </Link>
      ),
    },
  ]

  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.hr.editEmployee(`${employeeId}`)}
          className="mt-6 flex justify-end md:mt-0">
          <Button type="button" color="primary">
            {t("text-edit-profile")}
          </Button>
        </Link>
      </PageHeader>
      {isLoading && loader}

      {isSuccess && data && (
        <>
          <EmployeeBasicInformation employeeData={data} />
          <section className="card-shadow mt-4 flex grow flex-col rounded-2xl bg-gray-0 p-2 @container dark:bg-gray-800 md:mt-6">
            <TabsNavigation tabs={tabs} className="flex-grow" />
            {/* {data?.resumes?.length > 0 ? (
              <ResumeDetails resumes={data.resumes} />
            ) : (
              <EmployeeDetailsGroupContainer title={thrm("text-resume")}>
                <Link
                  href={routes.hr.resume(`${employeeId}`)}
                  className="ml-6 mt-2 flex justify-start">
                  <Button
                    type="button"
                    color="primary"
                    variant="outline"
                    size="sm"
                    className={cn("gap-2 font-bold")}>
                    <PiPlusBold /> {t("text-add-resume-information")}
                  </Button>
                </Link>
              </EmployeeDetailsGroupContainer>
            )}
            {data?.workInformation ? (
              <WorkInformationDetails workInformation={data.workInformation} />
            ) : (
              <EmployeeDetailsGroupContainer
                title={thrm("text-work-information")}>
                <Link
                  href={routes.hr.workInformation(`${employeeId}`)}
                  className="ml-6 mt-2 flex justify-start">
                  <Button
                    type="button"
                    color="primary"
                    variant="outline"
                    size="sm"
                    className={cn("gap-2 font-bold")}>
                    <PiPlusBold /> {t("text-add-work-information")}
                  </Button>
                </Link>
              </EmployeeDetailsGroupContainer>
            )}
            {data?.privateInformation ? (
              <PrivateInformationDetails
                privateInformationData={data.privateInformation}
              />
            ) : (
              <EmployeeDetailsGroupContainer
                title={thrm("text-private-information")}>
                <Link
                  href={routes.hr.privateInformation(`${employeeId}`)}
                  className="ml-6 mt-2 flex justify-start">
                  <Button
                    type="button"
                    color="primary"
                    variant="outline"
                    size="sm"
                    className={cn("gap-2 font-bold")}>
                    <PiPlusBold /> {t("text-add-private-information")}
                  </Button>
                </Link>
              </EmployeeDetailsGroupContainer>
            )} */}
            {/* <EmployeeDocumentsDetails documents={dummyDocuments} /> */}
          </section>
        </>
      )}
    </div>
  )
}

export default EmployeeDetails
