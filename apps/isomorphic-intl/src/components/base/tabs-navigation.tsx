import { ReactNode, cloneElement } from "react"

import StatusBadge from "@core/components/get-status-badge"
import { Control, FormState, UseFormRegister } from "react-hook-form"
import { Tab } from "rizzui"

type FormMethods = {
  register: UseFormRegister<any>
  control: Control<any>
  formState: FormState<any>
}

interface TabItem {
  label: string | ReactNode
  badge?: string
  content: React.ReactElement
}

interface TabsNavigationProps {
  tabs: TabItem[]
  className?: string
  tabListClassName?: string
  tabListButtonClassName?: string
  tabPanelClassName?: string
  formMethods?: FormMethods
}

export default function TabsNavigation({
  tabs,
  className,
  tabListClassName = "",
  tabListButtonClassName = "",
  tabPanelClassName = "",
  formMethods,
}: TabsNavigationProps) {
  return (
    <div className={className}>
      <Tab>
        <Tab.List className={`gap-0 border-gray-500/20 ${tabListClassName}`}>
          {tabs.map((tab, index) => (
            <Tab.ListItem
              key={index}
              className={`px-4 py-3 font-semibold ${tabListButtonClassName}`}>
              {tab.label}
              {tab.badge && <StatusBadge status={tab.badge} />}
            </Tab.ListItem>
          ))}
        </Tab.List>
        <Tab.Panels className={tabPanelClassName}>
          {tabs.map((tab, index) => (
            <Tab.Panel key={index}>
              {formMethods
                ? cloneElement(tab.content, {
                    formMethods,
                  } as { formMethods: FormMethods })
                : tab.content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab>
    </div>
  )
}
