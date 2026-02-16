"use client"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { SubmitHandler } from "react-hook-form"
import { PiXBold } from "react-icons/pi"
import { ActionIcon, Title } from "rizzui"

import { useModal } from "@/components/base/modal-views/use-modal"
import { Button, Input } from "@/components/ui"
import { useCreateWarehouseManager } from "@/modules/scm/hooks/inventory/warehouse/use-warehouse-manager"
import { WarehouseManagerInput } from "@/modules/scm/types/inventory/warehouse/warehouse-manager-types"

export default function WarehouseManagerForm() {
  const { closeModal } = useModal()

  const {
    mutateAsync: createWarehouseManager,
    isPending: isCreateWarehouseManagerPending,
  } = useCreateWarehouseManager()

  const onSubmit: SubmitHandler<WarehouseManagerInput> = async (data) => {
    await createWarehouseManager(data)
  }
  const t = useTranslations("form")

  return (
    <Form<WarehouseManagerInput>
      onSubmit={onSubmit}
      className="flex flex-grow flex-col gap-6 rounded-lg p-6 @container dark:bg-gray-800">
      {({ register, formState: { errors } }) => {
        return (
          <>
            <div className="flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Add a new Warehouse Manager
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <Input
                labelClassName="bg-paper"
                label={t("form-warehouse-manager-name")}
                {...register("name")}
                error={
                  errors.name?.message
                    ? t(errors.name?.message)
                    : ""
                }
              />
              <Input
                labelClassName="bg-paper"
                label={t("form-warehouse-manager-contact")}
                type="number"
                {...register("contact")}
                error={
                  errors.contact?.message
                    ? t(errors.contact?.message)
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
              <Button type="submit" isLoading={isCreateWarehouseManagerPending}>
                {t("form-create")}
              </Button>
            </div>
          </>
        )
      }}
    </Form>
  )
}
