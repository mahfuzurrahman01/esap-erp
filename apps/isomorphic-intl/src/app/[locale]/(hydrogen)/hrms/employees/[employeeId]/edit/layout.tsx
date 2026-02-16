import PageHeader from "@/components/base/page-header"
import TabRouteNavigationInner from "@/components/container/tab-route-navigation-inner"
import { routes } from "@/config/routes"

type Props = {
  children: React.ReactNode
  params: Promise<{ employeeId: number }>
}

const pageHeader = {
  title: "text-edit-employee",
  breadcrumb: [
    {
      href: routes.hr.employees,
      name: "text-employees",
    },
    {
      name: "text-edit-employee",
    },
  ],
}

const EmployeeDetailsLayout = async (props: Props) => {
  const params = await props.params;

  const {
    children
  } = props;

  const { employeeId } = params
  const menuItems = [
    {
      label: "text-basic-information",
      value: routes.hr.editEmployee(employeeId),
    },
    {
      label: "text-resume",
      value: routes.hr.resume(employeeId),
    },
    {
      label: "text-work-information",
      value: routes.hr.workInformation(employeeId),
    },
    {
      label: "text-private-information",
      value: routes.hr.privateInformation(employeeId),
    },
    // {
    //   label: "text-hr-setting",
    //   value: routes.hr.hrSettings(employeeId),
    // },
    // {
    //   label: "text-documents",
    //   value: routes.hr.documents(employeeId),
    // },
  ]

  return (
    <div className="flex h-full flex-col">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <section className="card-shadow mt-4 flex grow flex-col rounded-2xl bg-gray-0 dark:bg-gray-800 md:mt-6">
        <TabRouteNavigationInner
          menuItems={menuItems}
          translationObjectName="hrms"
        />
        {children}
      </section>
    </div>
  )
}

export default EmployeeDetailsLayout
