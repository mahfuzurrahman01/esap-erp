import { useTranslations } from "next-intl";
import { Badge, Text } from "rizzui";

import { Input, Select } from "@/components/ui";
import { useOpportunityList } from "@/modules/crm/hooks/use-opportunities";
import { formatDate } from "@/utils/format-date";

export const useOpportinitiesColumns = () => {
  const t = useTranslations("form");
  const tableT = useTranslations("table");
  const sl = tableT("table-text-sl");
  const title = tableT("table-text-title");

  const { data: outputData, isLoading }: any = useOpportunityList({pageSize:100});
  const opportunities = outputData?.data;
  const opprotunityOptions = opportunities?.map(
    (lead: any) => ({
      value: lead.id,
      label: lead?.name,
      closingDate: lead?.closingDate,
      amount: lead?.amount,
      probability: lead?.probability
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
      id: "opportunityId",
      header: title,
      accessorKey: "opportunityId",
      width: "550px",
      cell: (props: any) => (
        <Select
          options={opprotunityOptions}
          value={opprotunityOptions?.find((o: any) => o.value === props.value) || null}
          isLoading={isLoading}
          isDisabled={isLoading}
          onChange={async (option: any) => {
            const selectedLead = opprotunityOptions?.find((p: any) => p.value == option?.value);
            if (selectedLead) {
              props.row.original.opportunityId = option?.value;
              props.row.original.closingDate = selectedLead.closingDate || ""
              props.row.original.amount = selectedLead.amount || ""
              await props.table.options.meta?.updateData(props.row.index, "probability", selectedLead.probability);
            }
          }}
          
          placeholder={t("form-select")}
          menuPortalTarget={document.body}
        />
      ),
    },
    {
      id: "closingDate",
      header: "closingDate",
      accessorKey: "closingDate",
      width: "220px",
      cell: (props: any) => (
        <Input
          type="text"
          autoComplete="off"
          value={props.row.original.closingDate ? formatDate(props.row.original.closingDate, "DD/MM/YYYY") : ""}
          disabled
        />
      ),
    },
    {
      id: "amount",
      header: "amount",
      accessorKey: "amount",
      width: "220px",
      cell: (props: any) => (
        <Input
          type="text"
          autoComplete="off"
          value={props.row.original.amount || ""}
          disabled
        />
      ),
    },
    {
      id: "probability",
      header: "probability",
      accessorKey: "probability",
      width: "220px",
      cell: (props: any) => (
        <Input
          type="text"
          autoComplete="off"
          value={props.row.original.probability || ""} 
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