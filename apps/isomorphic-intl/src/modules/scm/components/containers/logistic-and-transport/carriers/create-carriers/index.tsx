"use client"

import React from "react"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { SubmitHandler } from "react-hook-form"
import toast from "react-hot-toast"
import { PiXBold } from "react-icons/pi"
import { ActionIcon, Title } from "rizzui"

import { useModal } from "@/components/base/modal-views/use-modal"
import { Button, Input } from "@/components/ui"
import { useCreateCarrier } from "@/modules/scm/hooks/logistic-and-transport/carrier/use-carrier"
import {
  CarrierFormInput,
  CarrierSchema,
} from "@/modules/scm/validators/logistic-and-transport/carrier.schema"

export default function CarrierForm() {
  const { closeModal } = useModal()
  const {
    mutateAsync: createCarrier,
    isPending: isCreating,
    isSuccess,
  } = useCreateCarrier()

  const onSubmit: SubmitHandler<CarrierFormInput> = (data) => {
    try {
      createCarrier(data)

      if (isSuccess) {
        closeModal()
      }
    } catch (error: any) {
      toast.error(t("form-error-message"))
    }
  }
  const t = useTranslations("form")
  return (
    <Form<CarrierFormInput>
      onSubmit={onSubmit}
      validationSchema={CarrierSchema}
      className="flex flex-grow flex-col gap-6 rounded-lg p-6 @container dark:bg-gray-800">
      {({ register, formState: { errors } }) => {
        return (
          <>
            <div className="flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                {t("form-add-new-carrier")}
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <Input
                isRequired
                labelClassName="bg-paper"
                label={t("form-carrier-name")}
                {...register("carrierName")}
                error={
                  errors.carrierName?.message
                    ? t(errors.carrierName?.message)
                    : ""
                }
              />
              <Input
                isRequired
                labelClassName="bg-paper"
                label={t("form-carrier-address")}
                {...register("address")}
                error={
                  errors.address?.message
                    ? t(errors.address?.message)
                    : ""
                }
              />
              <Input
                isRequired
                labelClassName="bg-paper"
                label={t("form-carrier-phone")}
                {...register("phone")}
                error={
                  errors.phone?.message
                    ? t(errors.phone?.message)
                    : ""
                }
              />
              <Input
                isRequired
                labelClassName="bg-paper"
                label={t("form-carrier-email")}
                {...register("email")}
                error={
                  errors.email?.message
                    ? t(errors.email?.message)
                    : ""
                }
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
              <Button type="submit" isLoading={isCreating}>
                {t("form-create")}
              </Button>
            </div>
          </>
        )
      }}
    </Form>
  )
}
