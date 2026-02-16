"use client"

import { useState } from "react"

import WidgetCard from "@core/components/cards/widget-card"
import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"
import { Text } from "rizzui"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Button, Select } from "@/components/ui"
import { DEFAULT_PAGE_SIZE_200 } from "@/config/constants"
import { useParticipantById } from "@/hooks/hrms/training/participants/use-participants"
import { useProgramList } from "@/hooks/hrms/training/program/use-program"
import { useSelectOptions } from "@/hooks/use-select-options"
import SkeletonLoader from "@/components/base/skeleton-loader"
import { TrainingProgram } from "@/types/hrms/training/training-program-type"

import EmployeeCard from "../../employee/all-employees/employee-card"
import ParticipantFormDrawerView from "./participant-form-drawer"

export default function ParticipantsTable() {
  const t = useTranslations("form")
  const { openDrawer } = useDrawer()
  const [selectedProgramId, setSelectedProgramId] = useState<number | null>(
    null
  )

  const { data: programs, isLoading: isProgramLoading } = useProgramList({
    pageSize: DEFAULT_PAGE_SIZE_200,
  })

  const { data: participants, isLoading: isParticipantsLoading } =
    useParticipantById(selectedProgramId || 0)

  const programOptions = useSelectOptions<TrainingProgram>(
    programs?.data,
    "trainingProgramName"
  )

  const selectedProgram = programs?.data?.find(
    (program) => program.id === selectedProgramId
  )

  return (
    <div className="flex flex-col gap-0">
      <WidgetCard className="border-none bg-gray-0 p-5 dark:bg-gray-800">
        <div className="flex items-center justify-between gap-5">
          <Select
            label={t("form-program")}
            placeholder={t("form-select-program")}
            options={programOptions}
            onChange={(selectedOption: any) => {
              setSelectedProgramId(selectedOption?.value || null)
            }}
            value={programOptions.find(
              (option) => option.value === selectedProgramId
            )}
            isLoading={isProgramLoading}
            className="w-1/3"
          />
          {selectedProgram && (
            <Button
              type="button"
              color="black"
              onClick={() =>
                openDrawer({
                  view: (
                    <ParticipantFormDrawerView
                      initialData={{
                        id: selectedProgram.id,
                        trainingProgramId: selectedProgram.id,
                        participants: participants?.map((p) => p.employee?.id),
                      }}
                      isEditForm
                    />
                  ),
                  placement: "right",
                  containerClassName: "max-w-[26.25rem] mr-5",
                })
              }>
              <PiPlusBold className="me-1.5 h-4 w-4" />
              {t("form-edit-participants")}
            </Button>
          )}
        </div>
      </WidgetCard>

      {selectedProgram && (
        <WidgetCard className="border-none bg-gray-0 p-6 dark:bg-gray-800">
          {selectedProgram && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {participants?.map(
                (participant) =>
                  participant.employee && (
                    <EmployeeCard
                      key={participant.id}
                      data={participant.employee}
                      showAction={false}
                    />
                  )
              )}
              {!isParticipantsLoading && (
                <div
                  onClick={() => {
                    openDrawer({
                      view: (
                        <ParticipantFormDrawerView
                          initialData={{
                            trainingProgramId: selectedProgram.id,
                            participants: [],
                          }}
                        />
                      ),
                      placement: "right",
                    })
                  }}
                  className="flex h-[320px] cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-200 hover:border-gray-300">
                  <Button variant="text">
                    <PiPlusBold className="h-6 w-6" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {isParticipantsLoading && (
            <div className="grid grid-cols-8 gap-4">
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
            </div>
          )}
        </WidgetCard>
      )}
    </div>
  )
}
