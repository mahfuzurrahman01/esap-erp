import { useMemo } from "react"

import { useTranslations } from "next-intl"

import SaudizationStatCard from "@/components/container/hrms/saudization/saudization-stat-card"
import { useSaudization } from "@/hooks/hrms/saudization/use-saudization"

import SaudizationZoneCard from "./saudization-zone-card"

const SaudizationStats = () => {
  const { data: saudizationData, isLoading } = useSaudization()

  const tCommon = useTranslations("common")

  const minimumPercentage = 17
  const saudiPercentage = saudizationData?.saudiPercentage ?? 0
  const expatPercentage = 100 - saudiPercentage

  const saudiFooterText = useMemo(() => {
    return (
      <>
        <p className="typography-primary text-sm font-bold">
          {saudiPercentage.toFixed(2)}%
        </p>
        <p className="typography-secondary text-sm font-bold">
          {tCommon("text-minimum")} {minimumPercentage}%
        </p>
      </>
    )
  }, [saudiPercentage, tCommon])

  const expatFooterText = useMemo(() => {
    return (
      <>
        <p className="typography-primary text-sm font-bold">
          {expatPercentage.toFixed(2)}%
        </p>
        <p className="typography-secondary text-sm font-bold">
          {tCommon("text-maximum")} {100 - minimumPercentage}%
        </p>
      </>
    )
  }, [expatPercentage, tCommon])

  if (isLoading) {
    return (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-4">
        <SaudizationStatCard
          title={tCommon("text-total-employees")}
          value={0}
        />
        <SaudizationStatCard title={tCommon("text-saudi-arabian")} value={0} />
        <SaudizationStatCard title={tCommon("text-expats")} value={0} />
        <SaudizationZoneCard
          title={tCommon("text-zone-status")}
          zone="-"
          saudiPercentage={0}
        />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-4">
      <SaudizationStatCard
        title={tCommon("text-total-employees")}
        value={saudizationData?.totalEmployees ?? 0}
        hideIcon={true}
      />
      <SaudizationStatCard
        title={tCommon("text-saudi-arabian")}
        value={saudizationData?.saudiEmployees ?? 0}
        footerText={saudiFooterText}
        isSaudiCard={true}
        percentage={saudiPercentage}
      />
      <SaudizationStatCard
        title={tCommon("text-expats")}
        value={saudizationData?.expatriateEmployees ?? 0}
        footerText={expatFooterText}
        percentage={expatPercentage}
      />
      <SaudizationZoneCard
        title={tCommon("text-zone-status")}
        zone={saudizationData?.zone ?? "-"}
        saudiPercentage={saudiPercentage}
      />
    </div>
  )
}

export default SaudizationStats
