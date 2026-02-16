import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Input, Select } from "@/components/ui"
import { useSelectOptions } from "@/hooks/use-select-options"
import SkeletonLoader from "@/components/base/skeleton-loader"
import { usePermissionList } from "@/modules/crm/hooks/use-permissions"
import {
  useCreateRole,
  useRoleById,
  useUpdateRole,
} from "@/modules/crm/hooks/use-roles"
import { PermissionList } from "@/modules/crm/types/permission"
import { Role, RoleEditFormTypes } from "@/modules/crm/types/role"
import { roleFormSchema } from "@/modules/crm/validators/permission-schema"

import RoleDetailsView from "./details"

export default function RoleFormDrawerView({
  id,
  view = false,
}: {
  id?: string
  view?: boolean
}) {
  const { closeDrawer } = useDrawer()
  const t = useTranslations("form")

  const { data: outputData, isLoading } = useRoleById(id) as {
    data: { data: Role } | undefined
    isLoading: boolean
  }
  const dataById = outputData?.data

  const createMutation = useCreateRole()
  const updateMutation = useUpdateRole()

  const { data: permissions, isLoading: isPermissionLoading } =
    usePermissionList()
  const permissionOptions = useSelectOptions<PermissionList>(
    permissions?.data,
    "name"
  )

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const onSubmit: SubmitHandler<any> = (data) => {
    const dataById = {
      id: id ? id : 0,
      roleName: data.roleName,
      permissionIds: data.permissionIds,
    }

    if (id) {
      updateMutation.mutate(
        { id, data: dataById },
        {
          onSuccess: () => {
            handleCloseDrawer()
          },
        }
      )
    } else {
      createMutation.mutate(dataById, {
        onSuccess: () => {
          handleCloseDrawer()
        },
      })
    }
  }

  const defaultValues: RoleEditFormTypes = {
    id: "",
    roleName: dataById?.roleName || "",
    permissions: dataById?.permissionIds,
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
    return <RoleDetailsView dataById={dataById} onClose={handleCloseDrawer} />
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={id ? t("form-edit-role") : t("form-add-new-role")}
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<RoleEditFormTypes>
        onSubmit={onSubmit}
        validationSchema={roleFormSchema}
        useFormProps={{ defaultValues, mode: "onChange", values: dataById }}
        className="flex grow flex-col">
        {({ register, control, formState: { errors } }) => (
          <>
            <SimpleBar className="h-full grow">
              <div className="flex flex-col gap-4 px-8 py-6">
                <Input
                  type="text"
                  label={t("form-name")}
                  isRequired
                  placeholder={t("form-name")}
                  autoComplete="off"
                  {...register("roleName", { required: true })}
                  error={
                    errors.roleName?.message &&
                    t("form-role-is-required")
                  }
                />

                <Controller
                  name="permissionIds"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      label={t("form-permissions")}
                      isRequired
                      labelClassName="text-title"
                      isMulti
                      options={permissionOptions}
                      value={
                        Array.isArray(value)
                          ? permissionOptions.filter((option) =>
                              value.includes(option.value.toString())
                            )
                          : []
                      }
                      onChange={(options: any) => {
                        const values = options
                          ? options.map((option: any) => option.value)
                          : []
                        onChange(values)
                      }}
                      isLoading={isPermissionLoading}
                      isDisabled={isPermissionLoading}
                      placeholder={
                        isPermissionLoading
                          ? t("form-loading")
                          : t("form-select")
                      }
                      error={
                        errors.permissionIds?.message &&
                        t("form-permission-is-required")
                      }
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
