import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Input } from "@/components/ui"
import {
  useAssetLocationById,
  useCreateAssetLocation,
  useUpdateAssetLocation,
} from "@/modules/fms/hooks/use-asset-location"
import {
  AssetLocationFormInput,
  assetLocationFormSchema,
} from "@/modules/fms/validators/asset-location-schema"

interface Props {
  id?: number
  record?: AssetLocationFormInput
}

export default function AssetLocationFormDrawerView({ id, record }: Props) {
  const { closeDrawer } = useDrawer()
  const t = useTranslations("form")
  const { data: assetLocationById, isLoading: isLoadingById } =
    useAssetLocationById(id!)

  const { mutateAsync: createMutation, isPending: isCreating } =
    useCreateAssetLocation()
  const { mutateAsync: updateMutation, isPending: isUpdating } =
    useUpdateAssetLocation()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const isEditMode = !!id

  const onSubmit = async (data: AssetLocationFormInput) => {
    if (isEditMode && id) {
      await updateMutation({ ...data, id: Number(id) })
      closeDrawer()
    } else {
      await createMutation(data)
      closeDrawer()
    }
  }

  const defaultValues: AssetLocationFormInput = {
    assetLocationName: record?.assetLocationName || "",
  }

  const formValues = isEditMode && assetLocationById
    ? { ...defaultValues, ...assetLocationById }
    : defaultValues

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditMode
            ? t("form-update-asset-location")
            : t("form-new-asset-location")
        }
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<AssetLocationFormInput>
        validationSchema={assetLocationFormSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: formValues,
          mode: "onChange",
          values: isEditMode ? formValues : undefined,
        }}
        className="flex grow flex-col">
        {({ register, formState: { errors } }) => (
          <>
            <SimpleBar className="h-0 grow">
              <div className="flex min-h-[768px] flex-col gap-4 px-5 py-6">
                <Input
                  label={t("form-asset-location-name")}
                  placeholder={t("form-enter-asset-location-name")}
                  labelClassName="text-sm font-medium text-gray-900"
                  {...register("assetLocationName")}
                  error={
                    errors?.assetLocationName?.message
                      ? t(errors?.assetLocationName?.message)
                      : ""
                  }
                />
              </div>
            </SimpleBar>
            <DrawerFormActions
              handleCloseDrawer={handleCloseDrawer}
              isLoading={isCreating || isUpdating || isLoadingById}
              isEditForm={isEditMode}
            />
          </>
        )}
      </Form>
    </div>
  )
}
