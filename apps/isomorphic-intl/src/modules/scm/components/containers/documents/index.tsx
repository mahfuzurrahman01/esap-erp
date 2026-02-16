"use client"

import cn from "@core/utils/class-names"
import { useTranslations } from "next-intl"
import { useMedia } from "react-use"
import { Tab } from "rizzui"

import ComplianceRiskIcon from "@/components/icons/scm/compliance-risk"
import DemandForecastIcon from "@/components/icons/scm/demand-forecast"
import InventoryIcon from "@/components/icons/scm/inventory"
import LogisticTransportIcon from "@/components/icons/scm/logistic-transport"
import ProcurementIcon from "@/components/icons/scm/procurement"
import ProductionControlIcon from "@/components/icons/scm/production-control"
import SupplierRelationshipIcon from "@/components/icons/scm/supplier-relationship"

import ComplianceAndRiskDoc from "./compliance-and-risk-doc"
import DemandForecastingDoc from "./demand-forecasting-doc"
import InventoryDoc from "./inventory-doc"
import LogisticAndTransportDoc from "./logistic-and-transport-doc"
import ProcurementDoc from "./procurement-doc"
import ProductionControlDoc from "./production-control-doc"
import SupplierRelationshipDoc from "./supplier-relationship-doc"

const DOCUMENT_COMPONENTS: any[] = [
  ProcurementDoc,
  InventoryDoc,
  DemandForecastingDoc,
  SupplierRelationshipDoc,
  LogisticAndTransportDoc,
  ProductionControlDoc,
  ComplianceAndRiskDoc,
]

export default function DocumentationContainer() {
  const t = useTranslations("common")
  const isMobile = useMedia("(max-width: 480px)", false)

  const steps = [
    {
      title: t("text-procurement"),
      icon: <ProcurementIcon className="h-6 w-6" />,
    },
    { title: t("text-inventory"), icon: <InventoryIcon className="h-6 w-6" /> },
    {
      title: t("text-demand-forecasting"),
      icon: <DemandForecastIcon className="h-6 w-6" />,
    },
    {
      title: t("text-supplier-relationship"),
      icon: <SupplierRelationshipIcon className="h-6 w-6" />,
    },
    {
      title: t("text-logistic-transportation"),
      icon: <LogisticTransportIcon className="h-6 w-6" />,
    },
    {
      title: t("text-production-control"),
      icon: <ProductionControlIcon className="h-6 w-6" />,
    },
    {
      title: t("text-compliance-risk"),
      icon: <ComplianceRiskIcon className="h-6 w-6" />,
    },
  ]

  return (
    <Tab
      highlightClassName="rounded-lg duration-200 bg-primary/[8%] font-semibold"
      className="crm-doc-tab pb-6"
      vertical>
      <Tab.List className={cn(isMobile ? "w-1/4" : "", "gap-0")}>
        {steps.map(({ title, icon }, index) => (
          <Tab.ListItem
            key={index}
            className="flex items-center gap-2 px-4 py-4">
            {icon}
            {isMobile && title.length > 6
              ? `${title.substring(0, 6)}...`
              : title}
          </Tab.ListItem>
        ))}
      </Tab.List>
      <Tab.Panels className="w-4/5 px-4 py-0">
        {steps.map(({ title }, index) => {
          const Component =
            DOCUMENT_COMPONENTS[index] ||
            (() => (
              <div>
                <h2 className="text-2xl font-semibold">{title}</h2>
                <p className="py-2">index - {index}</p>
              </div>
            ))
          return (
            <Tab.Panel key={index}>
              <Component />
            </Tab.Panel>
          )
        })}
      </Tab.Panels>
    </Tab>
  )
}
