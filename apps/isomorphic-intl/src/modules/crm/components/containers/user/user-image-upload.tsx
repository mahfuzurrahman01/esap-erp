"use client"

import Image from "next/image"
import { useState } from "react"

import { BxsCameraPlus } from "@/components/icons/crm/camera"
import { cn } from "@/utils/cn"

import FileInput from "../form/file-input"

interface UserImageUploadProps {
  avatarInputRef: any
  initialImage: string
  className?: string
}

export default function UserImageUpload({
  avatarInputRef,
  initialImage,
  className,
}: UserImageUploadProps) {
  const [previewImage, setImagePreview] = useState<string | null>(initialImage)

  const handleFileChange = () => {
    if (avatarInputRef.current?.files) {
      const file = avatarInputRef.current.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreview(reader.result as string)
        }
        reader.readAsDataURL(file)
      }
    }
  }

  return (
    <div className={cn("flex items-center", className)}>
      <div
        className={cn(
          "relative grid h-40 w-40 place-content-center rounded-full border-[1.8px] bg-gray-200"
        )}
        onClick={() => avatarInputRef.current?.click()}
        style={{ width: "7.8rem", height: "7.8rem" }}>
        <figure
          className="absolute inset-0 rounded-full"
          style={{
            top: "-11px",
            height: "144px",
            width: "144px",
            border: "1px dashed #919EAB33",
            left: "-11px",
          }}>
          <figure className="absolute inset-0 rounded-full">
            {previewImage && (
              <Image
                fill
                alt="user avatar"
                src={previewImage}
                className="rounded-full"
                style={{ objectFit: "cover" }}
              />
            )}
          </figure>
        </figure>

        <div
          className={cn(
            "absolute inset-0 z-10 grid cursor-pointer place-content-center"
          )}>
          <FileInput
            ref={avatarInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <BxsCameraPlus className="mx-auto h-6 w-6" />
          <span className="mt-1 text-center text-xs text-gray-400">
            Upload photo
          </span>
        </div>
      </div>

      <div className="ml-4">
        <p className="font-medium text-gray-400">
          Allowed *.jpeg, *.jpg, *.png, *.gif
          <br />
          Max size of 3.1 MB
        </p>
      </div>
    </div>
  )
}
