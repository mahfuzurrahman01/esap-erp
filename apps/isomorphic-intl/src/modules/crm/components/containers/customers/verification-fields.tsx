import { useTranslations } from "next-intl"

import FormGroup from "@/components/base/form-group"
import { Input } from "@/components/ui"
import { Controller } from "react-hook-form"
import UploadZone from "@/components/ui/crm/upload-zone"

export function VerificationFields({ register, control, file, setFile }: any) {
  const t = useTranslations("form")
  return (
    <>
      <FormGroup
        title={t("form-verification")}
        className="pt-7 @2xl:pt-9 @3xl:pt-11">
         {/* <Input
            type="number"
            label={t("form-national-id")}
            placeholder={t("form-enter-national-id")}
            autoComplete="off"
            labelClassName="text-sm font-medium text-gray-900"
            {...register("nid")}
          />
          <Input
            type="number"
            label={t("form-passport")}
            placeholder={t("form-enter-passport-no")}
            labelClassName="text-sm font-medium text-gray-900"
            {...register("passport")}
          /> */}
          <Input
            type="number"
            label={t("form-residence-permit-no")}
            autoComplete="off"
            placeholder={t("form-enter-residence-permit-no")}
            labelClassName="text-sm font-medium text-gray-900"
            {...register("residencePermitNo")}
          />
          {/* <Input
            type="number"
            label={t("form-driving-license")}
            placeholder={t("form-driving-license-no")}
            labelClassName="text-sm font-medium text-gray-900"
            {...register("drivingLicense")}
          /> */}
          <Controller
            name="coverPhoto"
            control={control}
            render={({ field: { onChange } }) => (
              <div className="grid gap-5 @3xl:grid-cols-1 lg:col-span-2">
                <label
                  htmlFor="coverPhoto"
                  className="block text-sm font-medium text-gray-700 dark:text-white">
                  {t("form-cover-photo")}
                </label>
                <UploadZone
                  multiple={false}
                  btnLabel="upload"
                  className="col-span-full w-full @2xl:p-0"
                  file={file}
                  setFile={(newFile: File | string) => {
                    setFile(newFile)
                    onChange(newFile)
                  }}
                />
              </div>
            )}
          />
      </FormGroup>
    </>
  )
}
