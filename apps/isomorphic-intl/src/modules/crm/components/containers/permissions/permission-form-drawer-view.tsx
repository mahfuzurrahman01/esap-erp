import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Input, Select } from "@/components/ui"
import { moduleOptions } from "@/data/crm/permissions"
import SkeletonLoader from "@/components/base/skeleton-loader"
import {
  useCreatePermission,
  usePermissionById,
  useUpdatePermission,
} from "@/modules/crm/hooks/use-permissions"
import {
  Permission,
  PermissionEditFormTypes,
} from "@/modules/crm/types/permission"
import { permissionFormSchema } from "@/modules/crm/validators/permission-schema"

import PermissionDetailsView from "./details"

export default function PermissionFormDrawerView({
  id,
  view = false,
}: {
  id?: string
  view?: boolean
}) {
  const { closeDrawer } = useDrawer()
  const t = useTranslations("form")
  const { data: dataById, isLoading } = usePermissionById(id) as {
    data: Permission | undefined
    isLoading: boolean
  }
  const createMutation = useCreatePermission()
  const updateMutation = useUpdatePermission()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const onSubmit: SubmitHandler<PermissionEditFormTypes> = (data) => {
    const PermissionData = {
      id: id ? id : 0,
      name: data.name,
      group: data.group,
      module: data.module,
    }

    if (id) {
      updateMutation.mutate(
        { id, data: PermissionData },
        {
          onSuccess: () => {
            handleCloseDrawer()
          },
        }
      )
    } else {
      createMutation.mutate(PermissionData, {
        onSuccess: () => {
          handleCloseDrawer()
        },
      })
    }
  }

  const defaultValues: PermissionEditFormTypes = {
    id: "",
    name: dataById?.name || "",
    group: dataById?.group || "",
    module: dataById?.module || "",
    ...dataById,
  }

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-3xl p-4">
        <SkeletonLoader />
      </div>
    )
  }

  if (view) {
    return (
      <PermissionDetailsView dataById={dataById} onClose={handleCloseDrawer} />
    )
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={id ? t("form-edit-permission") : t("form-add-new-permission")}
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<PermissionEditFormTypes>
        onSubmit={onSubmit}
        validationSchema={permissionFormSchema}
        useFormProps={{ defaultValues, mode: "onChange", values: dataById }}
        className="flex grow flex-col">
        {({ register, control, formState: { errors } }) => (
          <>
            <SimpleBar className="h-full grow">
              <div className="flex flex-col gap-4 px-8 py-6">
                <Input
                  type="text"
                  isRequired
                  label={t("form-permission-name")}
                  placeholder={t("form-permission-name")}
                  autoComplete="off"
                  className="lg:col-start-2"
                  {...register("name", { required: true })}
                  error={errors.name?.message && t("form-permission-name-is-required")}
                />
                <Input
                  type="text"
                  isRequired
                  label={t("form-group")}
                  placeholder={t("form-group")}
                  autoComplete="off"
                  inputClassName="border-gray-500/20 ring-0"
                  {...register("group", { required: true })}
                  error={errors.group?.message && t("form-group-is-required")}
                />

                <Controller
                  name="module"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      isSearchable={true}
                      label={t("form-module")}
                      isRequired
                      options={moduleOptions}
                      onChange={(selectedOption: any) =>
                        onChange(selectedOption?.value)
                      }
                      value={
                        moduleOptions.find(
                          (option: any) => option.value === value
                        ) || null
                      }
                      error={errors.module?.message && t("form-module-is-required")}
                    />
                  )}
                />
              </div>
            </SimpleBar>
            <DrawerFormActions
              handleCloseDrawer={handleCloseDrawer}
              isLoading={createMutation.isPending || updateMutation.isPending}
              isEditForm={!!id}
            />
          </>
        )}
      </Form>
    </div>
  )
}
