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
import { useCreatePaymentTerms } from "@/modules/scm/hooks/procurement/supplier/use-payment-terms"
import {
  PaymentTermsSchemaInput,
  paymentTermsSchema,
} from "@/modules/scm/validators/procurement/payment-terms.schema"

export default function PaymentTermsForm() {
  const { closeModal } = useModal()

  const {
    mutateAsync: createPaymentTerms,
    isPending: isCreatePaymentTermsLoading,
  } = useCreatePaymentTerms()

  const onSubmit: SubmitHandler<PaymentTermsSchemaInput> = async (data) => {
    try {
      await createPaymentTerms({
        ...data,
        status: true,
      })
      closeModal()
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred while creating the payment terms."
      )
    }
  }
  const t = useTranslations("form")

  return (
    <Form<PaymentTermsSchemaInput>
      onSubmit={onSubmit}
      validationSchema={paymentTermsSchema}
      className="flex flex-grow flex-col gap-6 rounded-lg p-6 @container dark:bg-gray-800">
      {({ register, formState: { errors } }) => {
        return (
          <>
            <div className="flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                {t("form-create-payment-terms")}
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <Input
                labelClassName="bg-paper"
                label={t("form-payment-terms-name")}
                {...register("name")}
                error={
                  errors.name?.message ? t(errors.name?.message) : ""
                }
              />
              <Input
                labelClassName="bg-paper"
                label={t("form-payment-terms-description")}
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
              <Button type="submit" isLoading={isCreatePaymentTermsLoading}>
                {t("form-create")}
              </Button>
            </div>
          </>
        )
      }}
    </Form>
  )
}
