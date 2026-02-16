"use client"

import { useParams } from "next/navigation"

import { Loader } from "rizzui/loader"

import PageHeader from "@/components/base/page-header"
import WorkAddressFormView from "@/components/container/hrms/employee-setting-items/work-address/work-address-form-view"
import { routes } from "@/config/routes"
import { useWorkAddressById } from "@/hooks/hrms/employee/use-work-address"
import { WorkAddress } from "@/types/hrms/employee/work-address.types"

const pageHeader = {
  title: "text-edit-work-address",
  breadcrumb: [
    {
      href: routes.hr.dashboard,

      name: "text-dashboard",
    },
    {
      href: routes.hr.workingAddress,
      name: "text-work-addresses",
    },

    {
      name: "text-edit-work-address",
    },
  ],
}
const WorkAddressEditPage = () => {
  const { workAddressId } = useParams()
  const { data: workAddress, isLoading: isWorkAddressLoading } =
    useWorkAddressById(Number(workAddressId))
  return (
    <div className="flex min-h-full flex-col">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      {isWorkAddressLoading ? (
        <div className="flex h-1/2 items-center justify-center">
          <Loader />
        </div>
      ) : (
        <WorkAddressFormView
          mode="edit"
          initialData={workAddress as WorkAddress}
        />
      )}
    </div>
  )
}

export default WorkAddressEditPage
