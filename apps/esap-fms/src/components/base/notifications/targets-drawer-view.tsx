import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"
import SimpleBar from "simplebar-react"

import { DatePicker } from "@/components/base/date-picker"
import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Input, Select } from "@/components/ui"
import { quarterOptions, targetOptions } from "@/data/crm/target"
import SkeletonLoader from "@/components/base/skeleton-loader"
import {
  useTargetById,
  useCreateTarget,
  useUpdateTarget,
} from "@/modules/crm/hooks/use-target"
import { Target } from "@/modules/crm/types/target"
import { TargetEditFormTypes } from "@/modules/crm/types/target"
import { targetFormSchema } from "@/modules/crm/validators/target-schema"

import TargetDetailsView from "./targets-details"

export default function TargetDrawerView({
  id,
  view = false,
}: {
  id?: string
  view?: boolean
}) {
  const { closeDrawer } = useDrawer()
  const t = useTranslations("crm")

  const { data: dataById, isLoading } = useTargetById(id) as {
    data: Target | undefined
    isLoading: boolean
  }

  const createTarget = useCreateTarget()
  const updateTarget = useUpdateTarget()
  const mutationFn = id ? updateTarget : createTarget

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const onSubmit: SubmitHandler<TargetEditFormTypes> = async (data: any) => {
    const payload = id ? { id, data } : data
    await mutationFn.mutateAsync(payload, {
      onSuccess: () => {
        handleCloseDrawer()
      },
    })
  }

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-3xl p-4">
        <SkeletonLoader />
      </div>
    )
  }

  if (view) {
    return <TargetDetailsView dataById={dataById} onClose={handleCloseDrawer} />
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={id ? t("form-edit-target") : t("form-add-new-target")}
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<TargetEditFormTypes>
        onSubmit={onSubmit}
        validationSchema={targetFormSchema}
        useFormProps={{
          mode: "onChange",
          values: dataById,
        }}
        className="flex grow flex-col">
        {({ register, control, formState: { errors } }) => {
          return (
            <>
              <SimpleBar className="h-full grow">
                <div className="flex flex-col gap-4 px-8 py-6">
                  <Input
                    type="text"
                    label={t("text-title")}
                    placeholder="Enter Title"
                    className="lg:col-start-2"
                    {...register("title", { required: true })}
                    error={
                      errors?.title?.message
                        ? String(errors.title.message)
                        : undefined
                    }
                  />

                  <Controller
                    name="type"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        isSearchable={true}
                        label={t("form-target-type")}
                        placeholder={t("form-select")}
                        options={targetOptions}
                        onChange={(selectedOption: any) =>
                          onChange(selectedOption?.value)
                        }
                        value={
                          targetOptions?.find(
                            (option: any) => option.value === value
                          ) || null
                        }
                        error={errors?.type?.message}
                      />
                    )}
                  />

                  <Input
                    type="number"
                    label={t("form-target-value")}
                    isRequired
                    placeholder={t("form-target-value")}
                    className="lg:col-start-2"
                    {...register("targetValue", {
                      required: true,
                      valueAsNumber: true,
                    })}
                    error={
                      errors.targetValue?.message &&
                      t("form-target-value-is-required")
                    }
                  />

                  <Controller
                    name="quarter"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        isSearchable={true}
                        label={t("form-quarter")}
                        options={quarterOptions}
                        onChange={(selectedOption: any) =>
                          onChange(selectedOption?.value)
                        }
                        value={
                          quarterOptions.find(
                            (option: any) => option.value === value
                          ) || null
                        }
                        error={errors?.quarter?.message}
                      />
                    )}
                  />

                  <Controller
                    name="month"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <div className="relative lg:col-start-2">
                        <label
                          htmlFor="month"
                          className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
                          {t("form-month")}
                        </label>
                        <DatePicker
                          id="month"
                          value={value ? new Date(value) : null}
                          onChange={(date: any) =>
                            onChange(date ? date.toISOString() : "")
                          }
                          placeholderText={t("form-select-month")}
                          autoComplete="off"
                          dateFormat="yyyy-MM"
                          showMonthYearPicker
                          className="w-full"
                        />
                      </div>
                    )}
                  />

                  <Controller
                    name="status"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        isSearchable={true}
                        label={t("form-status")}
                        options={[
                          { label: "Active", value: "Active" },
                          { label: "Inactive", value: "Inactive" },
                        ]}
                        onChange={(selectedOption: any) =>
                          onChange(selectedOption?.value)
                        }
                        value={
                          [
                            { label: "Active", value: "Active" },
                            { label: "Inactive", value: "Inactive" },
                          ].find((option: any) => option.value === value) ||
                          null
                        }
                        error={errors?.status?.message}
                      />
                    )}
                  />
                </div>
              </SimpleBar>
              <DrawerFormActions
                handleCloseDrawer={handleCloseDrawer}
                isLoading={mutationFn.isPending}
                isEditForm={!!id}
              />
            </>
          )
        }}
      </Form>
    </div>
  )
}
