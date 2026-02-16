"use client"

import { useState } from "react"

import { DatePicker } from "@core/ui/datepicker"
import { useTranslations } from "next-intl"
import { Title } from "rizzui"

import ModalBody from "@/components/base/modal-views/modal-body"
import ModalFooter from "@/components/base/modal-views/modal-footer"
import ModalHeader from "@/components/base/modal-views/modal-header"
import { useModal } from "@/components/base/modal-views/use-modal"
import { Button } from "@/components/ui"
import { messages } from "@/config/messages"

type Props = {
  employeeId: number
}

const AttendanceReportDownloadModal = ({ employeeId }: Props) => {
  const t = useTranslations("form")
  const { closeModal } = useModal()

  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleDownloadReport = () => {
    if (!employeeId) return

    if (!startDate || !endDate) {
      setError(messages.pleaseSelectDateRange)
      return
    }

    // check additional check if the date range is valid, like start date is less than end date
    if (startDate && endDate && startDate > endDate) {
      setError(messages.startDateCannotBeGreaterThanEndDate)
      return
    }

    //console.log("Downloading report")
  }

  return (
    <div className="m-auto">
      <ModalHeader>
        <Title as="h3" className="text-lg">
          {t("form-download-report")}
        </Title>
      </ModalHeader>

      <ModalBody>
        <div className="flex flex-col gap-4">
          <DatePicker
            placeholderText={t("form-select-date-from")}
            title={t("form-select-date-from")}
            selected={startDate}
            onChange={(date) => {
              setStartDate(date)
              setError(null)
            }}
          />
          <DatePicker
            placeholderText={t("form-select-date-to")}
            title={t("form-select-date-to")}
            selected={endDate}
            onChange={(date) => {
              setEndDate(date)
              setError(null)
            }}
          />
          {error && <p className="text-red-500">{t(error)}</p>}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          type="button"
          className="w-auto"
          variant="outline"
          onClick={() => closeModal()}>
          {t("form-cancel")}
        </Button>
        <Button
          onClick={handleDownloadReport}
          type="button"
          color="secondary"
          className="w-auto">
          {t("form-download-pdf")}
        </Button>
        <Button
          onClick={handleDownloadReport}
          type="button"
          color="primary"
          className="w-auto">
          {t("form-download-csv")}
        </Button>
      </ModalFooter>
    </div>
  )
}

export default AttendanceReportDownloadModal
