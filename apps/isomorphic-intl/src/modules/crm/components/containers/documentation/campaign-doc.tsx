import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

export default function CampaignDoc() {
  const t = useTranslations("crm")
  const images = {
    campaign: "https://res.cloudinary.com/dip5wjafh/image/upload/v1740211725/CRM_DOC_14_m2p3np.jpg",
    targets: "https://res.cloudinary.com/dip5wjafh/image/upload/v1739901504/CRM_DOC_9_uszeix.jpg",
  };

  return (
    <>
        <h4 className="py-2"></h4>
        <h4 className="py-2">{t("text-campaign-to-sale")}</h4>
        <Image
            src={images.campaign}
            alt="Campaign"
            className="mt-3 rounded-lg shadow-md"
            width={1200}
            height={900}
            loading="lazy"
        />
        <h4 className="py-2 mt-4">{t("text-targets")}</h4>
        <Image
            src={images.targets}
            alt="Targets"
            className="mt-3 rounded-lg shadow-md"
            width={1200}
            height={900}
            loading="lazy"
        />
    </>
  );
}