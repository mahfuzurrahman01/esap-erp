import { ApprovalIcon } from "@/components/icons/crm/appproval"
import { DuoIconsBox } from "@/components/icons/crm/box"
import { CampaignIcon } from "@/components/icons/crm/campaign"
import { CommunicationIcon } from "@/components/icons/crm/communication"
import { CRMIcon } from "@/components/icons/crm/crm"
import { DuoIconsDashboard } from "@/components/icons/crm/dashboard"
import { MessageIcon } from "@/components/icons/crm/message"
import { NotificationIcon } from "@/components/icons/crm/notification"
import { PipelineIcon } from "@/components/icons/crm/pipeline"
import { ReportIcon } from "@/components/icons/crm/report"
import { SalesIcon } from "@/components/icons/crm/sales"
import { SettingIcon } from "@/components/icons/crm/setting"
import { SupportIcon } from "@/components/icons/crm/support"
import { TaskIcon } from "@/components/icons/crm/task"
import { routes } from "@/config/routes"

import { MenuItemsType } from "../beryllium-fixed-menu-items"
import { FolderIcon } from "@/components/icons/crm/folder-icon"
import { ADMIN_MENU_ROLES, CRM_MENU_ROLES } from "./user-roles"

export const crmMenuItems: MenuItemsType = {
  id: "3",
  name: "sidebar-menu-crm",
  title: "sidebar-menu-crms",
  icon: CRMIcon,
  menuItems: [
    {
      name: "sidebar-menu-dashboard",
      href: routes.crm.dashboard,
      icon: DuoIconsDashboard,
      role: [...CRM_MENU_ROLES, ...ADMIN_MENU_ROLES],
    },
    {
      name: "sidebar-menu-analytics",
      description: '"Effortless Assistance at your Fingertips!"',
      icon: ReportIcon,
      role: [...ADMIN_MENU_ROLES],
      subMenuItems: [
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
      description: '"Effortless Assistance at your Fingertips!"',
      icon: ApprovalIcon,
      role: [...ADMIN_MENU_ROLES],
      href: routes.crm.approvals,
    },
    {
      name: "sidebar-menu-items",
      description: '"Effortless Assistance at your Fingertips!"',
      icon: DuoIconsBox,
      role: [...CRM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      subMenuItems: [
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
      icon: CampaignIcon,
      role: [...CRM_MENU_ROLES, ...ADMIN_MENU_ROLES],
    },
    {
      name: "sidebar-menu-pipeline",
      description: '"Effortless Assistance at your Fingertips!"',
      icon: PipelineIcon,
      role: [...CRM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      subMenuItems: [
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
      description: '"Effortless Assistance at your Fingertips!"',
      icon: SalesIcon,
      role: [...CRM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      subMenuItems: [
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
      description: '"Effortless Assistance at your Fingertips!"',
      icon: CommunicationIcon,
      role: [...CRM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      subMenuItems: [
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
      description: '"Effortless Assistance at your Fingertips!"',
      icon: SupportIcon,
      role: [...CRM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      subMenuItems: [
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
      description: '"Effortless Assistance at your Fingertips!"',
      icon: TaskIcon,
      role: [...CRM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      subMenuItems: [
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
      description: '"Effortless Assistance at your Fingertips!"',
      icon: ReportIcon,
      role: [...ADMIN_MENU_ROLES],
      subMenuItems: [
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
      description: '"Effortless Assistance at your Fingertips!"',
      icon: SettingIcon,
      role: [...ADMIN_MENU_ROLES],
      subMenuItems: [
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
      description: '"Effortless Assistance at your Fingertips!"',
      icon: NotificationIcon,
      role: [...CRM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      href: routes.crm.notifications,
    },
    {
      name: "sidebar-menu-messages",
      description: '"Effortless Assistance at your Fingertips!"',
      icon: MessageIcon,
      role: [...CRM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      href: routes.crm.messages,
    },
  ],
}
