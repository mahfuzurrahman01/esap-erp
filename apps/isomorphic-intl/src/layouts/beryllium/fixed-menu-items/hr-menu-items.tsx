import AppraisalIcon from "@/components/icons/hrms/appraisal-icon"
import EmployeeRecruitmentIcon from "@/components/icons/hrms/employee-recruitmment"
import EmployeeUserIcon from "@/components/icons/hrms/employee-user"
import { FolderIcon } from "@/components/icons/hrms/folder-icon"
import HRCalenderIcon from "@/components/icons/hrms/hrms-calander"
import HRDashboardIcon from "@/components/icons/hrms/hrms-dashboard"
import { HRuserIcon } from "@/components/icons/hrms/hrms-user"
import PayrollConfigurationIcon from "@/components/icons/hrms/payroll-configuration"
import { ProgramIcon } from "@/components/icons/hrms/program-icon"
import SaudizationIcon from "@/components/icons/hrms/saudization"
import ProductionControlIcon from "@/components/icons/scm/production-control"
import { routes } from "@/config/routes"

import { MenuItemsType } from "../beryllium-fixed-menu-items"
import { ADMIN_MENU_ROLES, HR_MENU_ROLES } from "./user-roles"

export const hrMenuItems: MenuItemsType = {
  id: "hr_menu",
  name: "sidebar-menu-hr",
  title: "sidebar-menu-hrms",
  icon: HRuserIcon,
  menuItems: [
    {
      name: "sidebar-menu-dashboard",
      href: routes.hr.dashboard,
      icon: HRDashboardIcon,
    },
    {
      name: "sidebar-menu-employees",
      icon: EmployeeUserIcon,
      subMenuItems: [
        {
          name: "sidebar-menu-employee-list",
          href: routes.hr.employees,
          role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-departments",
          href: routes.hr.departments,
          role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-job-positions",
          href: routes.hr.jobPositions,
          role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
      ],
    },
    {
      name: "sidebar-menu-setting-items",
      icon: EmployeeUserIcon,
      subMenuItems: [
        {
          name: "sidebar-menu-employee-type",
          href: routes.hr.employeeSettingItems,
          role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-employment-type",
          href: routes.hr.employmentSettingItems,
          role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-resume-type",
          href: routes.hr.resumeTypeSettings,
          role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-work-address",
          href: routes.hr.workingAddress,
          role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-work-schedule",
          href: routes.hr.workingSchedule,
          role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
      ],
    },
    {
      name: "sidebar-menu-attendance-and-leave",
      icon: HRCalenderIcon,
      subMenuItems: [
        {
          name: "sidebar-menu-attendances",
          href: routes.hr.attendances,
          role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-reconciliation-requests",
          href: routes.hr.reconciliationRequests,
          role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },

        {
          name: "sidebar-menu-leave-allocations",
          href: routes.hr.leaveAllocations,
          role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-leave-request",
          href: routes.hr.leaveRequest,
          role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-offdays",
          href: routes.hr.offDays,
          role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },

        {
          name: "sidebar-menu-leave-type",
          href: routes.hr.leaveType,
          role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-leave-calendar",
          href: routes.hr.leaveCalendar,
          role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
      ],
    },
    {
      name: "sidebar-menu-saudization",
      icon: SaudizationIcon,
      subMenuItems: [
        {
          name: "sidebar-menu-dashboard",
          href: routes.hr.saudization,
          role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-configuration",
          href: routes.hr.saudizationSettings,
          role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        // {
        //   name: "sidebar-menu-reports",
        //   href: routes.hr.saudizationReports,
        //   badge: "Upcoming",
        // },
      ],
    },
    {
      name: "sidebar-menu-recruitment-and-onboarding",
      icon: EmployeeRecruitmentIcon,
      subMenuItems: [
        {
          name: "sidebar-menu-recruitment-dashboard",
          href: routes.hr.recruitment,
          role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-applications",
          href: routes.hr.applications,
          role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
      ],
    },
    {
      name: "sidebar-menu-payroll",
      icon: PayrollConfigurationIcon,
      subMenuItems: [
        {
          name: "sidebar-menu-contracts",
          href: routes.hr.employeeContracts,
          role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-payslip",
          href: routes.hr.payslip,
          role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
      ],
    },
    {
      name: "sidebar-menu-payroll-configuration",
      icon: PayrollConfigurationIcon,
      subMenuItems: [
        {
          name: "sidebar-menu-salary-category",
          href: routes.hr.salaryCategory,
          role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-salary-rules",
          href: routes.hr.salaryRules,
          role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-salary-structure-type",
          href: routes.hr.salaryStructureType,
          role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-salary-structures",
          href: routes.hr.salaryStructures,
          role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
      ],
    },
    {
      name: "sidebar-menu-appraisals",
      icon: AppraisalIcon,
      subMenuItems: [
        {
          name: "sidebar-menu-appraisals",
          href: routes.hr.appraisals,
          role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-appraisal-template",
          href: routes.hr.appraisalTemplate,
          role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-appraisal-feedback",
          href: routes.hr.appraisalFeedback,
          role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-goals",
          href: routes.hr.goals,
          role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
      ],
    },
    {
      name: "sidebar-menu-file-management",
      icon: FolderIcon,
      href: routes.hr.folders,
      role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
    },
    {
      name: "sidebar-menu-training-program",
      icon: ProgramIcon,
      subMenuItems: [
        {
          name: "sidebar-menu-training-program",
          href: routes.hr.trainingProgram,
          role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-training-session",
          href: routes.hr.trainingSession,
          role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-participants",
          href: routes.hr.participants,
          role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-training-attendance",
          href: routes.hr.attendance,
          role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-training-feedbacks",
          href: routes.hr.trainingFeedbacks,
          role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
      ],
    },
    {
      name: "sidebar-menu-hrms-reports",
      icon: FolderIcon,
      // href: routes.hr.reports,
      subMenuItems: [
        {
          name: "sidebar-menu-employee-monthly-report",
          href: routes.hr.employeeMonthlyReport,
          role: [...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-daily-attendance-report",
          href: routes.hr.employeeAttendanceReport,
          role: [...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-leave-request-report",
          href: routes.hr.employeeLeaveRequestReport,
          role: [...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-yearly-off-days-report",
          href: routes.hr.yearlyOffDaysReport,
          role: [...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-saudi-employee-report",
          href: routes.hr.saudiEmployeeMonthlyReport,
          role: [...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-expatriate-employee-report",
          href: routes.hr.expatriatesMonthlyReport,
          role: [...ADMIN_MENU_ROLES],
        },
      ],
    },
    {
      name: "sidebar-menu-hrms-documentation",
      icon: ProductionControlIcon,
      href: routes.hr.documentation,
      role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
    },
  ],
}
