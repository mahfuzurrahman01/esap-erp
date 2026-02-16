"use client"

import Image from "next/image"
import React from "react"

import cn from "@core/utils/class-names"
import banner from "@public/auth/banner.gif"
import logo from "@public/auth/logo.png"
import { useTranslations } from "next-intl"
import { PiGear } from "react-icons/pi"
import { Title } from "rizzui"

import Logo from "@/components/icons/logo"
import { Link } from "@/i18n/routing"

export default function AuthWrapperFive({
  children,
  title,
  formClassName = "",
}: {
  children: React.ReactNode
  title: React.ReactNode
  formClassName?: string
}) {
  const t = useTranslations("auth")

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <div className="grid h-full min-h-screen grid-cols-1 gap-4 lg:grid-cols-4">
          {/* Left Side Banner - Hidden on mobile */}
          <div className="col-span-1 hidden items-center justify-center bg-gray-200 dark:bg-gray-800 lg:flex">
            <div className="text-center">
              <div className="lg:absolute lg:left-0 lg:top-0 py-6 px-12">
                <Logo className="h-[75px] w-[200px] px-2 dark:text-title" />
              </div>
              <h2 className="text-xl text-left px-10">{t("auth-welcome-text")}</h2>
              <p className="mb-10 text-sm capitalize px-10 pb-6 pt-2 text-left">
                {t("auth-description")}
              </p>
              <div className="flex justify-center w-full">
                <Image
                  src={banner}
                  alt="Sign Up Thumbnail"
                  priority
                  width={300}
                  height={300}
                  className="mt-10 object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="col-span-1 flex items-center justify-center lg:col-span-3">
            <div className="w-full max-w-lg p-4">
              <Link
                href={"/"}
                className="absolute right-0 top-0 flex items-center space-x-2 border-gray-300 p-4 text-sm font-medium lg:bg-transparent text-title">
                <PiGear />
                <span>{t("auth-need-help")}</span>
              </Link>
              <Image
                src={logo}
                alt="Logo"
                width={60}
                height={50}
                priority
                className="absolute left-0 top-0 block object-none px-2 lg:hidden"
              />
              <div
                className={cn(
                  "w-full max-w-sm md:max-w-md lg:w-2/3 xl:w-2/3 xl:max-w-lg xl:shrink-0 2xl:w-full 2xl:max-w-none",
                  formClassName
                )}>
                <div className="mb-8 lg:px-0 lg:text-start">
                  <Title
                    as="h2"
                    className="mt-10 text-[26px] leading-normal md:text-3xl md:!leading-normal lg:mb-7 lg:pe-8 lg:text-3xl xl:pe-16 xl:text-[32px] 2xl:pe-0 2xl:text-4xl">
                    {title}
                  </Title>
                </div>

                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
