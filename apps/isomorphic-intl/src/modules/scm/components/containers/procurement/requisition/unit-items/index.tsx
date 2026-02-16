"use client"

import React, { useState } from "react"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { SubmitHandler } from "react-hook-form"
import toast from "react-hot-toast"
import { PiXBold } from "react-icons/pi"
import { ActionIcon, Title } from "rizzui"

import { useModal } from "@/components/base/modal-views/use-modal"
import { Button, Input } from "@/components/ui"
import { useCreateUnit } from "@/modules/scm/hooks/procurement/requisition/use-unit"
import { ItemUnit } from "@/modules/scm/types/procurement/requisition/item-unit-types"

export default function UnitItemForm() {
  const { closeModal } = useModal()
  const [isLoading, setLoading] = useState(false)

  const { mutate, isError } = useCreateUnit()

  const onSubmit: SubmitHandler<ItemUnit> = (data) => {
    setLoading(true)
    setTimeout(() => {
      mutate({
        name: data.name,
        description: data.description,
        remarks: data.remarks,
      })
      setLoading(false)
      isError && toast.error(t("form-error"))
      toast.success(t("form-added-successfully"))
      closeModal()
    }, 600)
  }
  const t = useTranslations("form")

  return (
    <Form<ItemUnit>
      onSubmit={onSubmit}
      className="flex flex-grow flex-col gap-6 rounded-lg p-6 @container dark:bg-gray-800">
      {({ register, formState: { errors } }) => {
        return (
          <>
            <div className="flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Add a new Unit
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Input
                labelClassName="bg-paper"
                label={t("form-unit-name")}
                {...register("name")}
                error={
                  errors.name?.message
                    ? t(errors.name?.message)
                    : ""
                }
              />
              <Input
                labelClassName="bg-paper"
                label={t("form-unit-remarks")}
                {...register("remarks")}
                error={
                  errors.remarks?.message
                    ? t(errors.remarks?.message)
                    : ""
                }
              />
              <Input
                labelClassName="bg-paper"
                label={t("form-unit-description")}
                {...register("description")}
                error={
                  errors.description?.message
                    ? t(errors.description?.message)
                    : ""
                }
                className="col-span-2"
              />
            </div>
            <div className="flex items-center justify-end gap-4">
              <Button
                onClick={closeModal}
                variant="outline"
                color="danger"
                className="cursor-pointer"
                as="span">
                {t("form-cancel")}
              </Button>
              <Button type="submit" isLoading={isLoading}>
                {t("form-create")}
              </Button>
            </div>
          </>
        )
      }}
    </Form>
  )
}
