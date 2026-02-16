"use client";

import { Tab } from "rizzui";
import { useMedia } from "react-use";
import cn from "@core/utils/class-names";
import { useTranslations } from "next-intl";
import AuthenticationDoc from "./authentication-doc";
import UserDoc from "./user-doc";
import ItemDoc from "./item-doc";
import CampaignDoc from "./campaign-doc";
import MeetingDoc from "./meeting-doc";

const DOCUMENT_COMPONENTS = [
  AuthenticationDoc,
  UserDoc,
  ItemDoc,
  CampaignDoc,
  MeetingDoc,
];

export default function DocumentationContainer() {
  const t = useTranslations("crm");
  const isMobile = useMedia("(max-width: 480px)", false);

  const steps = [
    t("text-authentication"),
    t("text-permissions"),
    t("text-items"),
    t("text-campaign-to-sale"),
    t("text-communication"),
  ];

  return (
    <Tab
      highlightClassName="rounded-lg duration-200 bg-primary/[8%] font-semibold"
      className="pb-6 crm-doc-tab"
      vertical
    >
      <Tab.List className={cn(isMobile ? "w-1/4" : "", "gap-0")}>
        {steps.map((title, index) => (
          <Tab.ListItem key={index} className="px-4 py-4 gap-0 m-0">
            {isMobile && title.length > 6 ? `${title.substring(0, 6)}...` : title}
          </Tab.ListItem>
        ))}
      </Tab.List>
      <Tab.Panels className="w-4/5 px-4 py-0">
        {steps.map((title, index) => {
          const Component = DOCUMENT_COMPONENTS[index] || (() => (
            <div>
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p className="py-2">index - {index}</p>
            </div>
          ));
          return (
            <Tab.Panel key={index}>
              <Component />
            </Tab.Panel>
          );
        })}
      </Tab.Panels>
    </Tab>
  );
}