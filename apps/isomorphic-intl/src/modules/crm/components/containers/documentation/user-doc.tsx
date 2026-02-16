import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function UserDoc() {
  const t = useTranslations("crm")
  const images = {
    permission: "https://res.cloudinary.com/dip5wjafh/image/upload/v1739892528/CRM_DOC_6_wvi4fj.jpg",
  };

  return (
    <>
        <h4 className="py-2">{t("text-assign-permission")}</h4>
        <Image
            src={images.permission}
            alt="Registration Page"
            className="mt-3 rounded-lg shadow-md"
            width={1200}
            height={900}
            loading="lazy"
        />
    </>
  );
}