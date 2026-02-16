import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

export default function AuthenticationDoc() {
  const t = useTranslations("crm")
  const images = {
    access: "https://res.cloudinary.com/dip5wjafh/image/upload/v1740210893/CRM_DOC_13_adwi53.jpg",
    recover: "https://res.cloudinary.com/dip5wjafh/image/upload/v1740210512/CRM_DOC_12_xcmvr5.jpg",
  };

  return (
    <>
        <h4 className="py-2">{t("text-access-the-system")}</h4>
        <Image
            src={images.access}
            alt="Registration Page"
            className="mt-3 rounded-lg shadow-md"
            width={1200}
            height={900}
            loading="lazy"
        />
        <h4 className="py-2 mt-4">{t("text-password-recovery")}</h4>
        <Image
            src={images.recover}
            alt="Registration Page"
            className="mt-3 rounded-lg shadow-md"
            width={1200}
            height={900}
            loading="lazy"
        />
    </>
  );
}