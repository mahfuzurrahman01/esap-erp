import SalesIcon from "@core/components/icons/sales"
import { ApprovalIcon } from "@/components/icons/crm/appproval"
import { DuoIconsBox } from "@/components/icons/crm/box"
import { CampaignIcon } from "@/components/icons/crm/campaign"
import { MessageIcon } from "@/components/icons/crm/message"
import { NotificationIcon } from "@/components/icons/crm/notification"
import { PipelineIcon } from "@/components/icons/crm/pipeline"
import { ReportIcon } from "@/components/icons/crm/report"
import { SettingIcon } from "@/components/icons/crm/setting"
import { SupportIcon } from "@/components/icons/crm/support"
import { TaskIcon } from "@/components/icons/crm/task"
import DashboardIcon from "@/components/icons/dashboard"
import { routes } from "@/config/routes"
import { CommunicationIcon } from "@/components/icons/crm/communication"
import { ADMIN_MENU_ROLES, CRM_MENU_ROLES } from "../fixed-menu-items/user-roles"

export const crmMenuItems = [
  // label start
  {
    name: "sidebar-menu-crm",
  },
  // label end
  {
    name: "sidebar-menu-dashboard",
    href: routes.crm.dashboard,
    icon: <DashboardIcon className="h-6 w-6" />,
    role: [...CRM_MENU_ROLES, ...ADMIN_MENU_ROLES],
  },
  {
    name: "sidebar-menu-analytics",
    href: "#",
    icon: <ReportIcon className="h-6 w-6" />,
    role: [...ADMIN_MENU_ROLES],
    dropdownItems: [
      {
        name: "sidebar-menu-overview",
        href: routes.crm.organization,
        role: [...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-analytics",
        href: routes.crm.leadAnalytics,
        role: [...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-insights",
        href: routes.crm.insights,
        role: [...ADMIN_MENU_ROLES],
      },
    ],
  },
  {
    name: "sidebar-menu-approvals",
    icon: <ApprovalIcon className="h-6 w-6" />,
    role: [...ADMIN_MENU_ROLES],
    href: routes.crm.approvals,
  },
  {
    name: "sidebar-menu-items",
    href: "#",
    icon: <DuoIconsBox className="h-6 w-6" />,
    dropdownItems: [
      {
        name: "sidebar-menu-item-list",
        href: routes.crm.items,
      },
      {
        name: "sidebar-menu-categories",
        href: routes.crm.categories,
      },
      {
        name: "sidebar-menu-attributes",
        href: routes.crm.attributes,
      },
      {
        name: "sidebar-menu-stocks",
        href: routes.crm.stocks,
      },
    ],
  },
  {
    name: "sidebar-menu-campaign",
    href: routes.crm.campaigns,
    icon: <CampaignIcon className="h-6 w-6" />,
    role: [...CRM_MENU_ROLES, ...ADMIN_MENU_ROLES],
  },
  {
    name: "sidebar-menu-pipeline",
    href: "#",
    icon: <PipelineIcon className="h-6 w-6" />,
    role: [...CRM_MENU_ROLES, ...ADMIN_MENU_ROLES],
    dropdownItems: [
      {
        name: "sidebar-menu-leads",
        href: routes.crm.leads,
      },
      {
        name: "sidebar-menu-opportunity",
        href: routes.crm.opportunities,
      },
    ],
  },
  {
    name: "sidebar-menu-sales",
    href: "#",
    icon: <SalesIcon className="h-6 w-6" />,
    role: [...CRM_MENU_ROLES, ...ADMIN_MENU_ROLES],
    dropdownItems: [
      {
        name: "sidebar-menu-quotation",
        href: routes.crm.quotation,
      },
      {
        name: "sidebar-menu-orders",
        href: routes.crm.salesOrders,
      },
      {
        name: "sidebar-menu-invoice",
        href: routes.crm.salesInvoice,
      },
      {
        name: "sidebar-menu-expense-bill",
        href: routes.crm.bills,
      },
      {
        name: "sidebar-menu-customers",
        href: routes.crm.customers,
      },
      {
        name: "sidebar-menu-target-goals",
        href: routes.crm.targets,
      },
    ],
  },
  {
    name: "sidebar-menu-communication",
    href: "#",
    icon: <CommunicationIcon className="h-6 w-6" />,
    role: [...CRM_MENU_ROLES, ...ADMIN_MENU_ROLES],
    dropdownItems: [
      {
        name: "sidebar-menu-meetings",
        href: routes.crm.meetings,
      },
      {
        name: "sidebar-menu-event-calendar",
        href: routes.crm.eventCalendar,
      },
      {
        name: "sidebar-menu-contact-history",
        href: routes.crm.contacts,
      },
    ],
  },
  {
    name: "sidebar-menu-supports",
    href: "#",
    icon: <SupportIcon className="h-6 w-6" />,
    role: [...CRM_MENU_ROLES, ...ADMIN_MENU_ROLES],
    dropdownItems: [
      {
        name: "sidebar-menu-tickets",
        href: routes.crm.tickets,
      },
      {
        name: "sidebar-menu-slas",
        href: routes.crm.slas,
      },
    ],
  },
  {
    name: "sidebar-menu-tasks",
    href: "#",
    icon: <TaskIcon className="h-6 w-6" />,
    role: [...CRM_MENU_ROLES, ...ADMIN_MENU_ROLES],
    dropdownItems: [
      {
        name: "sidebar-menu-tasks",
        href: routes.crm.tasks,
      },
      {
        name: "sidebar-menu-reminders",
        href: routes.crm.reminders,
      },
    ],
  },
  {
    name: "sidebar-menu-reports",
    href: "#",
    icon: <ReportIcon className="h-6 w-6" />,
    role: [...ADMIN_MENU_ROLES],
    dropdownItems: [
      {
        name: "sidebar-menu-sales",
        href: routes.crm.salesReport,
        role: [...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-leads-by-company",
        href: routes.crm.leadsByCompany,
        role: [...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-leads-by-status",
        href: routes.crm.leadsByStatus,
        role: [...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-campaigns",
        href: routes.crm.campaignsReport,
        role: [...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-opportunity",
        href: routes.crm.opportunityReport,
        role: [...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-supports",
        href: routes.crm.ticketsReport,
        role: [...ADMIN_MENU_ROLES],
      },
    ],
  },
  {
    name: "sidebar-menu-settings",
    href: "#",
    icon: <SettingIcon className="h-6 w-6" />,
    role: [...ADMIN_MENU_ROLES],
    dropdownItems: [
      {
        name: "sidebar-menu-general-setting",
        href: routes.crm.settings,
        role: [...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-email-setting",
        href: routes.crm.emailSettings,
        role: [...ADMIN_MENU_ROLES],
      },
    ],
  },
  {
    name: "sidebar-menu-notifications",
    icon: <NotificationIcon className="h-6 w-6" />,
    role: [...CRM_MENU_ROLES, ...ADMIN_MENU_ROLES],
    href: routes.crm.notifications,
  },
  {
    name: "sidebar-menu-messages",
    description: '"Effortless Assistance at your Fingertips!"',
    icon: <MessageIcon className="h-6 w-6" />,
    role: [...CRM_MENU_ROLES, ...ADMIN_MENU_ROLES],
    href: routes.crm.messages,
  },
]
