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
import { useCreatePaymentMethod } from "@/modules/scm/hooks/procurement/supplier/use-payment-method"
import { PaymentMethod } from "@/modules/scm/types/procurement/supplier/payment-method-types"

export default function PaymentMethodForm({
  refetch,
}: {
  refetch: () => void
}) {
  const { closeModal } = useModal()
  const [isLoading, setLoading] = useState(false)

  const { mutate, isError } = useCreatePaymentMethod()

  const onSubmit: SubmitHandler<PaymentMethod> = (data) => {
    setLoading(true)
    setTimeout(() => {
      mutate({
        name: data.name,
        description: data.description,
        status: true,
      })
      setLoading(false)
      isError && toast.error(t("form-payment-method-error"))
      toast.success(t("form-payment-method-added-successfully"))
      closeModal()
      refetch()
    }, 600)
  }
  const t = useTranslations("form")

  return (
    <Form<PaymentMethod>
      onSubmit={onSubmit}
      className="flex flex-grow flex-col gap-6 rounded-lg p-6 @container dark:bg-gray-800">
      {({ register, formState: { errors } }) => {
        return (
          <>
            <div className="flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Add a new Payment Method
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Input
                labelClassName="bg-paper"
                label={t("form-payment-method-name")}
                {...register("name")}
                error={
                  errors.name?.message ? t(errors.name?.message) : ""
                }
              />
              <Input
                labelClassName="bg-paper"
                label={t("form-payment-method-description")}
                {...register("description")}
                error={
                  errors.description?.message
                    ? t(errors.description?.message)
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
