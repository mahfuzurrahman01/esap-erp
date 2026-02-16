"use client"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { SubmitHandler } from "react-hook-form"
import { Loader, Password } from "rizzui"

import Box from "@/components/ui/box"
import FormGroup from "@/modules/crm/components/base/form-group"
import { useProfileResetPassword } from "@/modules/crm/hooks/use-password-reset"
import { PasswordResetTypes } from "@/modules/crm/types/permission"

export default function ResetPasswordForm() {
  const t = useTranslations("form")
  const mutation = useProfileResetPassword()
  const onSubmit: SubmitHandler<PasswordResetTypes> = async (data) => {
    await mutation.mutateAsync(data)
  }
  const initialValues: PasswordResetTypes = {
    previousPassword: "",
    newPassword: "",
    confirmPassword: "",
  }

  return (
    <Box>
      <Form<PasswordResetTypes>
        onSubmit={onSubmit}
        useFormProps={{
          mode: "onChange",
          defaultValues: initialValues,
        }}>
        {({ register, formState: { errors } }) => (
          <>
            <div className="h-[62vh] rounded-lg p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <FormGroup title={t("form-information")}></FormGroup>
                <div className="lg:col-start-2">
                  <label
                    htmlFor="previousPassword"
                    className="block text-sm font-medium text-gray-700">
                    Previous Password <span className="text-red-600">*</span>
                  </label>
                  <Password
                    placeholder="Previous Password"
                    autoComplete="off"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                    inputClassName="border-gray-500/20 ring-0"
                    {...register("previousPassword", {
                      required: "This field is required",
                      minLength: {
                        value: 6,
                        message: "Must be at least 6 characters long",
                      },
                    })}
                  />
                  {errors.previousPassword && (
                    <span className="text-red-600">
                      {errors.previousPassword.message}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700">
                    New Password <span className="text-red-600">*</span>
                  </label>
                  <Password
                    placeholder="New Password"
                    autoComplete="off"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                    inputClassName="border-gray-500/20 ring-0"
                    {...register("newPassword", {
                      required: "This field is required",
                      minLength: {
                        value: 6,
                        message: "Must be at least 6 characters long",
                      },
                    })}
                  />
                  {errors.newPassword && (
                    <span className="text-red-600">
                      {errors.newPassword.message}
                    </span>
                  )}
                </div>

                <div className="lg:col-start-2">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700">
                    Confirm Password <span className="text-red-600">*</span>
                  </label>
                  <Password
                    placeholder="Confirm Password"
                    autoComplete="off"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                    inputClassName="border-gray-500/20 ring-0"
                    {...register("confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <span className="text-red-600">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-6 border-t border-gray-200 p-4">
              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className={`rounded-md bg-[#00A76F] px-4 py-2 text-white transition-colors ${
                    mutation.isPending ? "opacity-50" : ""
                  }`}>
                  {mutation.isPending ? (
                    <>
                      <Loader variant="spinner" className="mr-2" />
                    </>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </Form>
    </Box>
  )
}
