import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

export default function MeetingDoc() {
  const t = useTranslations("crm")
  const images = {
    meeting: "https://res.cloudinary.com/dip5wjafh/image/upload/v1739899990/CRM_DOC_7_zf8fiv.jpg",
    task: "https://res.cloudinary.com/dip5wjafh/image/upload/v1739901126/CRM_DOC_8_jhdeiy.jpg",
  };

  return (
    <>
        <h4 className="py-2">{t("text-meeting-to-events")}</h4>
        <Image
            src={images.meeting}
            alt="Registration Page"
            className="mt-3 rounded-lg shadow-md"
            width={1200}
            height={900}
            loading="lazy"
        />
        <h4 className="py-2 mt-4">{t("text-ticket-to-task")}</h4>
        <Image
            src={images.task}
            alt="Registration Page"
            className="mt-3 rounded-lg shadow-md"
            width={1200}
            height={900}
            loading="lazy"
        />
    </>
  );
}