import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

export default function ItemDoc() {
  const t = useTranslations("crm")
  const images = {
    item: "https://res.cloudinary.com/dip5wjafh/image/upload/v1739892149/CRM_DOC_4_wzucbp.jpg",
  };

  return (
    <>
        <h4 className="py-2">{t("text-item-stocks")}</h4>
        <Image
            src={images.item}
            alt="Registration Page"
            className="mt-3 rounded-lg shadow-md"
            width={1200}
            height={900}
            loading="lazy"
        />
    </>
  );
}