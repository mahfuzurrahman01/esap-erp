import { atom } from "jotai"
import dayjs from "dayjs"

export type MaintenanceRepetitionConfig = {
  id: number
  type: string
  calculateNextDate: (currentDate?: Date | null) => Date
}

const repetitionConfigs: MaintenanceRepetitionConfig[] = [
  {
    id: 1,
    type: "Daily",
    calculateNextDate: (currentDate = null) => {
      const baseDate = currentDate ? dayjs(currentDate) : dayjs()
      return baseDate.add(1, "day").toDate()
    },
  },
  {
    id: 2,
    type: "Weekly",
    calculateNextDate: (currentDate = null) => {
      const baseDate = currentDate ? dayjs(currentDate) : dayjs()
      return baseDate.add(1, "week").toDate()
    },
  },
  {
    id: 3,
    type: "Monthly",
    calculateNextDate: (currentDate = null) => {
      const baseDate = currentDate ? dayjs(currentDate) : dayjs()
      return baseDate.add(1, "month").toDate()
    },
  },
  {
    id: 4,
    type: "Yearly",
    calculateNextDate: (currentDate = null) => {
      const baseDate = currentDate ? dayjs(currentDate) : dayjs()
      return baseDate.add(1, "year").toDate()
    },
  },
]

export const maintenanceRepetitionAtom = atom<MaintenanceRepetitionConfig[]>(repetitionConfigs) 