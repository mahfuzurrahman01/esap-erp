import { useTranslations } from "next-intl";
import { Badge, Text } from "rizzui";

import { Input, Select } from "@/components/ui";
import { useLeadList } from "@/modules/crm/hooks/use-leads";

export const useLeadsColumns = () => {
  const t = useTranslations("form");
  const tableT = useTranslations("table");
  const sl = tableT("table-text-sl");
  const fullName = tableT("table-text-full-name");

  const { data: outputData, isLoading }: any = useLeadList({pageSize:100});
  const formattedLeads = outputData?.data;
  const leadOptions = formattedLeads?.map(
    (lead: any) => ({
      value: lead.id,
      label: `${lead?.firstName} ${lead?.lastName}` || "",
      email: lead?.email || "",
      phone: lead?.phone || "",
      company: lead?.company || ""
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
      id: "leadId",
      header: fullName,
      accessorKey: "leadId",
      width: "550px",
      cell: (props: any) => (
        <Select
          options={leadOptions}
          value={leadOptions?.find((o: any) => o.value === props.value) || null}
          isLoading={isLoading}
          isDisabled={isLoading}
          onChange={async (option: any) => {
            const selectedLead = leadOptions?.find((p: any) => p.value == option?.value);
            if (selectedLead) {
              props.row.original.leadId = option?.value;
              props.row.original.company = selectedLead.company || ""
              props.row.original.email = selectedLead.email || ""
              await props.table.options.meta?.updateData(props.row.index, "phone", selectedLead.phone);
            }
          }}
          placeholder={t("form-select")}
          menuPortalTarget={document.body}
        />
      ),
    },
    {
      id: "email",
      header: "Email",
      accessorKey: "email",
      width: "220px",
      cell: (props: any) => (
        <Input
          type="text"
          autoComplete="off"
          value={props.row.original.email || ""}
          disabled
        />
      ),
    },
    {
      id: "phone",
      header: "Phone",
      accessorKey: "phone",
      width: "220px",
      cell: (props: any) => (
        <Input
          type="text"
          autoComplete="off"
          value={props.row.original.phone || ""}
          disabled
        />
      ),
    },
    {
      id: "company",
      header: "Company",
      accessorKey: "company",
      width: "220px",
      cell: (props: any) => (
        <Input
          type="text"
          autoComplete="off"
          value={props.row.original.company || ""} 
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