import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Input } from "@/components/ui"
import {
  useCountryById,
  useCreateCountry,
  useUpdateCountry,
} from "@/modules/fms/hooks/use-country"
import {
  CountryFormInput,
  countryFormSchema,
} from "@/modules/fms/validators/country-schema"

interface Props {
  id?: number
  record?: CountryFormInput
}

export default function CountryFormDrawerView({ id, record }: Props) {
  const { closeDrawer } = useDrawer()
  const t = useTranslations("form")
  const { data: dataById } = useCountryById(id || 0)

  const { mutateAsync: createMutation, isPending: isCreating } =
    useCreateCountry()
  const { mutateAsync: updateMutation, isPending: isUpdating } =
    useUpdateCountry()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const onSubmit = async (data: CountryFormInput) => {
    if (id) {
      await updateMutation({
        ...data,
        id,
      })
      closeDrawer()
    } else {
      await createMutation(data)
      closeDrawer()
    }
  }

  const defaultValues: CountryFormInput = {
    countryName: record?.countryName || "",
    countryCode: record?.countryCode || "",
    dateFormat: record?.dateFormat || "",
    timeFormat: record?.timeFormat || "",
    timeZone: record?.timeZone || "",
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={id ? t("form-edit-country") : t("form-add-new-country")}
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<CountryFormInput>
        validationSchema={countryFormSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: dataById || defaultValues,
          mode: "onChange",
          values: dataById as CountryFormInput,
        }}
        className="flex grow flex-col">
        {({ register, formState: { errors } }) => (
          <>
            <SimpleBar className="h-0 grow">
              <div className="flex flex-col gap-4 px-5 py-6">
                <Input
                  type="text"
                  label={t("form-country-name")}
                  placeholder={t("form-enter-country-name")}
                  labelClassName="text-sm font-medium text-gray-900"
                  {...register("countryName")}
                  error={
                    errors?.countryName?.message
                      ? t(errors?.countryName?.message)
                      : ""
                  }
                />
                <Input
                  type="text"
                  label={t("form-country-code")}
                  placeholder={t("form-enter-country-code")}
                  labelClassName="text-sm font-medium text-gray-900"
                  {...register("countryCode")}
                  error={
                    errors?.countryCode?.message
                      ? t(errors?.countryCode?.message)
                      : ""
                  }
                />
                <Input
                  type="text"
                  label={t("form-country-date-format")}
                  placeholder={t("form-enter-country-date-format")}
                  labelClassName="text-sm font-medium text-gray-900"
                  {...register("dateFormat")}
                  error={
                    errors?.dateFormat?.message
                      ? t(errors?.dateFormat?.message)
                      : ""
                  }
                />
                <Input
                  type="text"
                  label={t("form-country-time-format")}
                  placeholder={t("form-enter-country-time-format")}
                  labelClassName="text-sm font-medium text-gray-900"
                  {...register("timeFormat")}
                  error={
                    errors?.timeFormat?.message
                      ? t(errors?.timeFormat?.message)
                      : ""
                  }
                />
                <Input
                  type="text"
                  label={t("form-country-time-zones")}
                  placeholder={t("form-enter-country-time-zones")}
                  labelClassName="text-sm font-medium text-gray-900"
                  {...register("timeZone")}
                  error={
                    errors?.timeZone?.message
                      ? t(errors?.timeZone?.message)
                      : ""
                  }
                />
              </div>
            </SimpleBar>
            <DrawerFormActions
              handleCloseDrawer={handleCloseDrawer}
              isLoading={isCreating || isUpdating}
              isEditForm={!!id}
            />
          </>
        )}
      </Form>
    </div>
  )
}
