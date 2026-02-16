import { useTranslations } from "next-intl";
import { Badge, Text } from "rizzui";

import { Input, Select } from "@/components/ui";
import { useCampaignList } from "@/modules/crm/hooks/use-campaign";
import { formatDate } from "@/utils/format-date";

export const useCampaignsColumns = () => {
  const t = useTranslations("form");
  const tableT = useTranslations("table");
  const sl = tableT("table-text-sl");
  const subject = tableT("table-text-subject");

  const { data: outputData, isLoading }: any = useCampaignList({pageSize:100});
  const formattedCampaigns = outputData?.data;
  const campaignOptions = formattedCampaigns?.map(
    (campaign: any) => ({
      value: campaign.id,
      label: campaign?.subject,
      deadline: campaign?.deadline || "",
      service: campaign?.service || "",
      source: campaign?.source || "",
    })
  );

  return [
    {
      id: "sn",
      header: sl,
      accessorKey: "sn",
      width: "50px",
      cell: ({ row }: { row: any }) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {row.index + 1}
        </Text>
      ),
    },
    {
      id: "campaignId",
      header: subject,
      accessorKey: "campaignId",
      width: "550px",
      cell: (props: any) => (
        <Select
          options={campaignOptions}
          value={campaignOptions?.find((o: any) => o.value === props.value) || null}
          isLoading={isLoading}
          isDisabled={isLoading}
          onChange={async (option: any) => {
            const selectedCampaign = campaignOptions?.find((p: any) => p.value == option?.value);
            if (selectedCampaign) {
              props.row.original.campaignId = option?.value;
              props.row.original.deadline = selectedCampaign.deadline || ""
              props.row.original.service = selectedCampaign.service || ""
              await props.table.options.meta?.updateData(props.row.index, "source", selectedCampaign.source);
            }
          }}
          placeholder={t("form-select")}
          menuPortalTarget={document.body}
        />
      ),
    },
    {
      id: "deadline",
      header: "Deadline",
      accessorKey: "deadline",
      width: "220px",
      cell: (props: any) => {
        const formattedDate = props.row.original.deadline
          ? formatDate(props.row.original.deadline, "DD/MM/YYYY")
          : "-";
        return (
          <Input
            type="text"
            autoComplete="off"
            value={formattedDate}
            disabled
          />
        );
      },
    },    
    {
      id: "service",
      header: "service",
      accessorKey: "service",
      width: "220px",
      cell: (props: any) => (
        <Input
          type="text"
          autoComplete="off"
          value={props.row.original.service || ""}
          disabled
        />
      ),
    },
    {
      id: "source",
      header: "source",
      accessorKey: "source",
      width: "220px",
      cell: (props: any) => (
        <Input
          type="text"
          autoComplete="off"
          value={props.row.original.source || ""} 
          disabled
        />
      ),
    },
    {
      id: "actions",
      header: "",
      accessorKey: "actions",
      width: "90px",
      cell: (props: any) => (
        <center>
          <Badge
            variant="flat"
            color="danger"
            rounded="lg"
            className="cursor-pointer"
            onClick={() => props.onDelete()}
          >
            {t("form-delete")}
          </Badge>
        </center>
      ),
    },
  ];
};