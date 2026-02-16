"use client"

import { useSettingById } from "@/modules/crm/hooks/use-setting"
import { SettingData } from "@/modules/crm/types/setting"
import SkeletonLoader from "@/components/base/skeleton-loader"
import SettingForm from "@/modules/crm/components/containers/settings/form"

export default function SettingCreateTemplate() {
  const id = "47759136-7c7d-41e1-a150-3bae1575dbf1"
  const { data: settingData, isLoading } = useSettingById(id) as {
    data: SettingData | undefined
    isLoading: boolean
  }
  return isLoading ? (
    <SkeletonLoader />
  ) : (
    <SettingForm id={id} settingData={settingData} />
  )
}
