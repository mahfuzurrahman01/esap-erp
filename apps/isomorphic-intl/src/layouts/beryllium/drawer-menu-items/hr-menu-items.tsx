import {
  PiAddressBook,
  PiAlignBottomDuotone,
  PiCalendar,
  PiCurrencyCircleDollar,
  PiFolder,
  PiSquaresFour,
  PiUserCirclePlusDuotone,
  PiUserGear,
  PiUsers,
  PiUsersFourLight,
} from "react-icons/pi"

import { routes } from "@/config/routes"

import { ADMIN_MENU_ROLES, HR_MENU_ROLES } from "../fixed-menu-items/user-roles"

export const hrMenuItems = [
  // label start
  {
    name: "sidebar-menu-human-resource",
  },
  // label end

  {
    name: "sidebar-menu-dashboard",
    href: "/hrms",
    icon: <PiSquaresFour />,
    role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
  },
  {
    name: "sidebar-menu-employees",
    href: "#",
    icon: <PiUsers />,
    dropdownItems: [
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
    href: "#",
    icon: <PiUserGear />,
    dropdownItems: [
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
    icon: <PiCalendar />,
    href: "#",
    dropdownItems: [
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
      // {
      //   name: "sidebar-menu-leave-allocation-type",
      //   href: routes.hr.leaveAllocationType,
      // },
    ],
  },
  {
    name: "sidebar-menu-saudization",
    icon: <PiAddressBook />,
    href: "#",
    dropdownItems: [
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
      {
        name: "sidebar-menu-reports",
        href: routes.hr.saudizationReports,
        role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
    ],
  },
  {
    name: "sidebar-menu-recruitment-and-onboarding",
    icon: <PiUserCirclePlusDuotone />,
    href: "#",
    dropdownItems: [
      {
        name: "sidebar-menu-dashboard",
        href: routes.hr.recruitment,
      },
      {
        name: "sidebar-menu-applications",
        href: routes.hr.applications,
      },
    ],
  },
  {
    name: "sidebar-menu-payroll",
    icon: <PiUserCirclePlusDuotone />,
    href: "#",
    dropdownItems: [
      {
        name: "sidebar-menu-employee-contracts",
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
    icon: <PiCurrencyCircleDollar />,
    href: "#",
    dropdownItems: [
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
    icon: <PiAlignBottomDuotone />,
    href: "#",
    dropdownItems: [
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
    icon: <PiFolder />,
    href: routes.hr.folders,
    role: [...HR_MENU_ROLES, ...ADMIN_MENU_ROLES],
  },
  {
    name: "sidebar-menu-training-program",
    icon: <PiUsersFourLight />,
    href: "#",
    dropdownItems: [
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
]
