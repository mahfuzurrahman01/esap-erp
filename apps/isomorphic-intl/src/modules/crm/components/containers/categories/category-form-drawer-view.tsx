import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Input, Select } from "@/components/ui"
import SkeletonLoader from "@/components/base/skeleton-loader"
import {
  useCategoryById,
  useCategoryList,
  useCreateCategory,
  useUpdateCategory,
} from "@/modules/crm/hooks/use-category"
import { Category, CategoryEditFormTypes } from "@/modules/crm/types/category"
import { categoryFormSchema } from "@/modules/crm/validators/category-schema"

import CategoryDetailsView from "./details"

export default function CategoryFormDrawerView({
  id,
  view = false,
}: {
  id?: string
  view?: boolean
}) {
  const { closeDrawer } = useDrawer()
  const t = useTranslations("form")
  const { data: outputData, isLoading } = useCategoryById(id) as {
    data: { data: Category } | undefined
    isLoading: boolean
  }
  const dataById = outputData?.data
  const { data: output }: any = useCategoryList()
  const categories = output?.data || []
  const formattedCategories = categories?.map((cat: any) => ({
    value: cat.id,
    label: cat.name || "",
  }))

  const createCategory = useCreateCategory()
  const updateCategory = useUpdateCategory()
  const mutationFn = id ? updateCategory : createCategory

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const onSubmit: SubmitHandler<CategoryEditFormTypes> = async (data: any) => {
    await mutationFn.mutateAsync(id ? { data, id } : data, {
      onSuccess: () => {
        handleCloseDrawer()
      },
    })
  }

  const defaultValues: CategoryEditFormTypes = {
    id: "",
    name: dataById?.name || "",
    parentCategoryId: dataById?.parentCategoryId || undefined,
    status: dataById?.status || "Active",
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
      <CategoryDetailsView dataById={dataById} onClose={handleCloseDrawer} />
    )
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={id ? t("form-edit-category") : t("form-add-new-category")}
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<CategoryEditFormTypes>
        onSubmit={onSubmit}
        validationSchema={categoryFormSchema}
        useFormProps={{ defaultValues, mode: "onChange", values: dataById }}
        className="flex grow flex-col">
        {({ register, control, formState: { errors } }) => {
          console.log("Form Errors:", errors)
          return (
            <>
              <SimpleBar className="h-full grow">
                <div className="flex flex-col gap-4 px-8 py-6">
                  <Input
                    type="text"
                    label={t("form-category-name")}
                    placeholder={t("form-enter-category-name")}
                    autoComplete="off"
                    className="lg:col-start-2"
                    isRequired
                    {...register("name", { required: true })}
                    error={errors.name?.message && t("form-category-is-required")}
                  />

                  <Controller
                    name="parentCategoryId"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        label={t("form-parent-category")}
                        isSearchable={true}
                        options={formattedCategories}
                        onChange={(selectedOption: any) =>
                          onChange(selectedOption?.value)
                        }
                        value={
                          formattedCategories?.find(
                            (option: any) => option.value === value
                          ) || null
                        }
                      />
                    )}
                  />

                  <Controller
                    name="status"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        className="lg:col-start-2"
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
