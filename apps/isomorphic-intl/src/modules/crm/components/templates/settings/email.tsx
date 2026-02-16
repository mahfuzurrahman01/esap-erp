"use client"

import { useSettingById } from "@/modules/crm/hooks/use-email-setting"
import { SettingData } from "@/modules/crm/types/setting"
import SkeletonLoader from "@/components/base/skeleton-loader"
import EmailSettingForm from "@/modules/crm/components/containers/settings/email"

export default function EmailSettingCreateTemplate() {
  const id = "1b716376-adf0-4321-b055-091a49b505d8"
  const { data: settingData, isLoading } = useSettingById(id) as {
    data: SettingData | undefined
    isLoading: boolean
  }
  return isLoading ? (
    <SkeletonLoader />
  ) : (
    <EmailSettingForm id={id} settingData={settingData} />
  )
}
