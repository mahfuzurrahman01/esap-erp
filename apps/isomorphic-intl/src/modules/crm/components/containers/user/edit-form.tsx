"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"
import { Password } from "rizzui"

import FormFooter from "@/components/base/form-footer"
import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Checkbox, Input, Select } from "@/components/ui"
import Box from "@/components/ui/box"
import UploadZone from "@/components/ui/crm/upload-zone"
import UploadPhoto from "@/components/ui/upload-photo"
import { userTypeOption } from "@/data/crm/campaign"
import { initiaUserData } from "@/data/crm/users"
import { useCurrentUser } from "@/hooks/auth/use-auth"
import { useSelectOptions } from "@/hooks/use-select-options"
import { useRoleList } from "@/modules/crm/hooks/use-roles"
import {
  useCreateUser,
  useEnable2Fa,
  useUpdateUser,
  useUserById,
  useVerify2Fa,
} from "@/hooks/auth/use-user"
import { RoleList } from "@/modules/crm/types/role"
import {
  UserCreateFormTypes,
  userCreateFormSchema,
} from "@/modules/crm/validators/user-schema"
import { useCountryList } from "@/modules/fms/hooks/use-country"
import { CountryList } from "@/modules/fms/types/country"

export default function UserEditForm({
  id,
  mode,
}: {
  id?: string
  mode: "edit" | "create"
}) {
  const t = useTranslations("form")
  const { data: userData }: any = useUserById(id!)
  const router = useRouter()
  const { data: roles, isLoading: isRoleLoading } = useRoleList({ pageSize: 100 })
  const { data: countries, isLoading: isCountryLoading } = useCountryList({ pageSize: 100 })
  const [file, setFile] = useState<File | string>("")

  const countryOptions = useSelectOptions<CountryList>(
    countries?.data,
    "countryName"
  )

  const { mutateAsync: createUser, isPending: isCreating } = useCreateUser()
  const { mutateAsync: updateUser, isPending: isUpdating } = useUpdateUser()

  const roleOptions = useSelectOptions<RoleList>(roles?.data, "roleName")

  const [qrCode, setQrCode] = useState<string | null>(null)
  const [otp, setOtp] = useState<string | null>(null)
  const { mutate: varify2Fa } = useVerify2Fa()
  const enable2FaMutation = useEnable2Fa()
  const { user } = useCurrentUser()
  const avatarUrl =
    userData?.data?.profilePicturePath &&
      userData?.data?.profilePicturePath.startsWith("http")
      ? userData?.data?.profilePicturePath
      : ""

  const enableTwoFactorAuth = async (email: string) => {
    const response: any = await enable2FaMutation.mutateAsync({ email })
    const qrImageUrl = URL.createObjectURL(response)
    setQrCode(qrImageUrl)
  }

  const verifyTwoFactorAuth = async (email: string, otp: string) => {
    varify2Fa({ email, otp })
    setQrCode(null)
  }

  useEffect(() => {
    if (
      userData?.data?.applicationUser?.email &&
      otp?.length === 6 &&
      /^[0-9]{6}$/.test(otp)
    ) {
      verifyTwoFactorAuth(userData?.data?.applicationUser?.email, otp)
    }
  }, [otp, userData?.data?.applicationUser?.email])

  useEffect(() => {
    if (userData?.data?.coverPhotoPath) {
      setFile(userData?.data.coverPhotoPath)
    }
  }, [userData?.data])

  const handleFormSubmit: SubmitHandler<UserCreateFormTypes> = async (
    formData
  ) => {
    const newFormData = {
      ...formData,
      Email: formData.email,
      Password: formData.password,
      Country: Number(formData.country),
      File: formData.file,
      CoverPhoto: file,
      TwoFactorEnabled: formData.applicationUser.twoFactorEnabled,
    }

    if (id) {
      await updateUser({
        id,
        data: newFormData,
      })
    } else {
      await createUser(newFormData)
    }
  }

  const formattedData = userData?.data
    ? {
      ...userData?.data,
      email: userData?.data?.applicationUser?.email || "a@b.com",
      password: "",
      country: Number(userData.data.country),
    }
    : initiaUserData

  return (
    <Box className="md:mt-0">
      <Form<UserCreateFormTypes>
        onSubmit={handleFormSubmit}
        validationSchema={userCreateFormSchema}
        className="flex grow flex-col justify-between @container"
        useFormProps={{
          mode: "onChange",
          defaultValues: formattedData,
          values: formattedData as unknown as UserCreateFormTypes,
        }}>
        {({
          register,
          control,
          formState: { errors },
        }) => {
          // console.log("errors", errors)
          return (
            <>
              <FormGroupContainer>
                <FormGroup
                  title={t("form-information")}
                  className="grid-cols-12 pt-7 @2xl:pt-10 @3xl:pt-11">
                  <Controller
                    name="file"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <UploadPhoto
                        onChange={(file) => onChange(file)}
                        value={value}
                        defaultValue={avatarUrl}
                      />
                    )}
                  />
                  <div></div>

                  <Input
                    {...register("firstName")}
                    label={t("form-first-name")}
                    isRequired
                    placeholder={t("form-enter-first-name")}
                    error={
                      errors.firstName?.message &&
                      t("form-first-name-is-required")
                    }
                  />

                  <Input
                    {...register("lastName")}
                    label={t("form-last-name")}
                    placeholder={t("form-enter-last-name")}
                  />

                  <Input
                    type="email"
                    label={t("form-email")}
                    isRequired
                    autoComplete="off"
                    autoSave="off"
                    placeholder={t("form-enter-email")}
                    {...register("email")}
                    error={
                      errors.email?.message &&
                      t("form-email-is-required")
                    }
                  />

                  {mode === "create" && (
                    <Password
                      label={
                        <>
                          {t("form-password")}{" "}
                          <span className="text-orange-500">*</span>
                        </>
                      }
                      inputClassName="border-body/20 hover:border-title focus:border-2 focus:border-title ring-0 text-title"
                      placeholder={t("form-enter-password")}
                      autoComplete="off"
                      {...register("password")}
                      error={errors.password?.message}
                    />
                  )}

                  <Input
                    type="number"
                    label={t("form-mobile-no")}
                    isRequired
                    placeholder={t("form-enter-mobile-no")}
                    {...register("phoneNumber")}
                    error={
                      errors.phoneNumber?.message &&
                      t("form-mobile-no-is-required")
                    }
                  />

                  <Input
                    type="text"
                    label={t("form-address")}
                    placeholder={t("form-enter-address")}
                    {...register("address")}
                    error={
                      errors.address?.message &&
                      t("form-address-is-required")
                    }
                  />

                  <Controller
                    name="country"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label={t("form-country")}
                        isRequired
                        labelClassName="text-title"
                        options={countryOptions}
                        value={
                          countryOptions.find(
                            (option) => option.value === Number(value)
                          ) || null
                        }
                        onChange={(option: any) =>
                          onChange(Number(option?.value))
                        }
                        isLoading={isCountryLoading}
                        isDisabled={isCountryLoading}
                        placeholder={
                          isCountryLoading
                            ? t("form-loading")
                            : t("form-select-country")
                        }
                        menuPlacement="auto"
                        menuPortalTarget={document.body}
                        error={
                          errors.country?.message &&
                          t("form-country-is-required")
                        }
                      />
                    )}
                  />

                  <Controller
                    name="roleIds"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label={t("form-roles")}
                        isRequired
                        labelClassName="text-title"
                        isMulti
                        options={roleOptions}
                        value={
                          Array.isArray(value)
                            ? roleOptions.filter((option) =>
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
                        isLoading={isRoleLoading}
                        isDisabled={isRoleLoading}
                        placeholder={
                          isRoleLoading ? t("form-loading") : t("form-select")
                        }
                        error={
                          errors.roleIds?.message &&
                          t("form-role-is-required")
                        }
                      />
                    )}
                  />

                  {/* <Controller
                    name="type"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        label={t("form-type")}
                        options={userTypeOption}
                        onChange={(userTypeOption: any) =>
                          onChange(userTypeOption?.value)
                        }
                        value={
                          userTypeOption.find(
                            (option: any) => option.value === value
                          ) || null
                        }
                      />
                    )}
                  /> */}

                  {user?.id == id && (
                    <Controller
                      name="isNotify"
                      control={control}
                      defaultValue={userData?.isNotify || false}
                      render={({ field: { value, onChange } }) => (
                        <Checkbox
                          label={t("form-enable-notification")}
                          checked={value}
                          onChange={(e: any) => onChange(e)}
                        />
                      )}
                    />
                  )}

                  <div>
                    {user?.id == id && (
                      <Controller
                        name="applicationUser.twoFactorEnabled"
                        control={control}
                        defaultValue={
                          userData?.data?.applicationUser?.twoFactorEnabled || false
                        }
                        render={({ field: { value, onChange } }) => (
                          <Checkbox
                            label={t("form-twoFactorEnabled")}
                            checked={value}
                            onChange={(e: any) => {
                              onChange(e)
                              if (e.target.checked) {
                                enableTwoFactorAuth(
                                  userData?.data?.applicationUser?.email
                                )
                              } else {
                                setQrCode(null)
                              }
                            }}
                          />
                        )}
                      />
                    )}
                    {/* QR Code for 2FA */}
                    {qrCode && (
                      <div className="mt-4">
                        <Image
                          src={qrCode}
                          alt="QR Code for 2FA"
                          width={200}
                          height={200}
                        />
                      </div>
                    )}
                  </div>

                  {/* OTP Input Field */}
                  {qrCode && (
                    <Input
                      {...register("otp")}
                      label={t("form-google-authenticator-otp")}
                      placeholder={t("form-enter-otp")}
                      onChange={(e) => setOtp(e.target.value)}
                      error={errors.otp?.message}
                    />
                  )}

                  <Controller
                    name="coverPhoto"
                    control={control}
                    render={() => (
                      <div className="grid gap-5 @3xl:grid-cols-1 lg:col-span-2">
                        <label
                          htmlFor="coverPhoto"
                          className="text-sm font-medium dark:text-white transition-colors duration-200 text-title">
                          {t("form-cover-photo")}
                        </label>
                        <UploadZone
                          multiple={false}
                          btnLabel="upload"
                          className="col-span-full w-full @2xl:p-0"
                          file={file}
                          setFile={setFile}
                        />
                      </div>
                    )}
                  />
                </FormGroup>
              </FormGroupContainer>
              <FormFooter
                isLoading={isCreating || isUpdating}
                altBtnText={t("form-cancel")}
                handleAltBtn={() => {
                  router.back()
                }}
                altBtnColor="danger"
                submitBtnText={
                  id ? t("form-update-user") : t("form-create-user")
                }
                className="border-gray-500/20 dark:bg-paper"
              />
            </>
          )
        }}
      </Form>
    </Box>
  )
}
