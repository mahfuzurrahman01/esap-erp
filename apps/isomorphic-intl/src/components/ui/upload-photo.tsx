"use client"

import Image from "next/image"
import { useCallback, useMemo, useState } from "react"

import { useTranslations } from "next-intl"
import { PiSpinner } from "react-icons/pi"

import { CameraIcon } from "@/components/icons"
import { cn } from "@/utils/cn"

interface UploadPhotoProps {
  onChange?: (file: File | null) => void
  value?: File | string | null
  className?: string
  defaultValue?: string
}

const UploadPhoto = ({
  onChange,
  value,
  className,
  defaultValue,
}: UploadPhotoProps) => {
  const t = useTranslations("form")
  const [loading, setLoading] = useState(false)

  const loader = useMemo(
    () => (
      <div className="absolute inset-0">
        <PiSpinner className="h-full w-full animate-spin" />
      </div>
    ),
    []
  )

  const imagePlaceholder = useCallback(
    (placeholderText: string) => (
      <div className="flex flex-col items-center gap-1">
        <CameraIcon className="text-gray-500 dark:text-gray-600" />
        <span className="font-bold text-inherit">{t(placeholderText)}</span>
      </div>
    ),
    [t]
  )

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && onChange) {
      onChange(file)
    }
  }

  const getImageSrc = () => {
    if (!value) return null
    if (value instanceof File) return URL.createObjectURL(value)
    return value // string URL
  }

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center gap-3 @xl:flex-row @xl:gap-5",
        className
      )}>
      <label className="group relative cursor-pointer rounded-full border border-dashed border-gray-500/20 p-2">
        <input
          type="file"
          accept="image/jpeg, image/jpg, image/png, image/bmp"
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          onChange={handleImageChange}
          disabled={loading}
        />
        <div className="flex h-[8rem] w-[8rem] items-center justify-center overflow-hidden rounded-full bg-gray-500/10">
          {loading && loader}
          {!loading && value && (
            <>
              <Image
                src={getImageSrc() || ""}
                alt="Profile"
                className="h-full w-full object-cover"
                height={128}
                width={128}
              />
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/70 opacity-0 transition-opacity group-hover:opacity-100">
                {imagePlaceholder("form-change-photo")}
              </div>
            </>
          )}
          {!loading && !value && defaultValue && defaultValue !== "" && (
            <>
              <Image
                src={defaultValue}
                alt="Profile"
                className="h-full w-full object-cover"
                height={128}
                width={128}
              />
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/70 opacity-0 transition-opacity group-hover:opacity-100">
                {t("form-change-photo")}
              </div>
            </>
          )}
          {!loading &&
            !value &&
            (!defaultValue || defaultValue === "") &&
            imagePlaceholder("form-upload-photo")}
        </div>
      </label>
      <span className="text-center text-sm @3xl:text-left">
        {t("form-allowed-jpeg-jpg-png-gif")} <br /> {t("form-max-size-of-5-mb")}
      </span>
    </div>
  )
}

export default UploadPhoto
