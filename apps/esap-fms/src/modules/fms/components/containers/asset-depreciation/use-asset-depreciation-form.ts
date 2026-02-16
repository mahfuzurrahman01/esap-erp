import { useEffect, useState } from "react"

import { useAssetDepreciationById } from "@/modules/fms/hooks/use-asset-depreciation-schedule"
import {
  AssetDepreciationList,
  DepreciationSchedule,
} from "@/modules/fms/types/asset-depreciation-schedule"

import { AssetDepreciationFormProps } from "./types"

export function useAssetDepreciationForm({ id }: AssetDepreciationFormProps) {
  const isFieldDisabled = true
  const [assetDepreciationDetails, setAssetDepreciationDetails] = useState<
    DepreciationSchedule[]
  >([])

  const { data: assetDepreciationById } = useAssetDepreciationById(Number(id))

  useEffect(() => {
    if (assetDepreciationById?.assetDepreciationSchedules?.length) {
      setAssetDepreciationDetails(
        assetDepreciationById.assetDepreciationSchedules.map((schedule) => ({
          ...schedule,
          scheduleDate: schedule.scheduleDate || "",
          depreciationAmount: schedule.depreciationAmount || 0,
          accumulatedDepreciationAmount:
            schedule.accumulatedDepreciationAmount || 0,
          journalId: schedule.journalId || 0,
          isJournalCreated: schedule.isJournalCreated || false,
        }))
      )
    }
  }, [assetDepreciationById])

  const defaultValues: Partial<AssetDepreciationList> = {
    assetId: 0,
    companyId: 0,
    assetDepreciationSchedules: [],
  }

  return {
    defaultValues,
    assetDepreciationById,
    isFieldDisabled,
    assetDepreciationDetails,
  }
}
