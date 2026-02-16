import { useTranslations } from "next-intl";
import { Badge, Text } from "rizzui";

import { Input, Select } from "@/components/ui";
import { useCustomerList } from "@/modules/crm/hooks/use-customers";
import { useCompanyById } from "@/modules/fms/hooks/use-company";

export const useCustomersColumns = () => {
  const t = useTranslations("form");
  const tableT = useTranslations("table");
  const sl = tableT("table-text-sl");
  const fullName = tableT("table-text-full-name");

  const { data: outputData, isLoading }: any = useCustomerList();
  const formattedCustomers = outputData?.data;
  const CustomerOptions = formattedCustomers?.map(
    (customer: any) => ({
      value: customer.id,
      label: `${customer?.firstName} ${customer?.lastName}` || "",
      email: customer?.email || "",
      phone: customer?.phone || "",
      company: customer?.company || ""
    })
  );

  const CompanyCell = ({ companyId }: any) => {
    const tableT = useTranslations("table")
    const { data: companyData, isLoading }: any = useCompanyById(companyId)
    if (isLoading)
      return (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {tableT("table-text-loading")}
        </Text>
      )
    const companyName = companyData?.companyName || ""
    return (
      <Input
          type="text"
          autoComplete="off"
          value={companyName || ""} 
          disabled
        />
    )
  }

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
      id: "customerId",
      header: fullName,
      accessorKey: "customerId",
      width: "550px",
      cell: (props: any) => (
        <Select
          options={CustomerOptions}
          value={CustomerOptions?.find((o: any) => o.value === props.value) || null}
          isLoading={isLoading}
          isDisabled={isLoading}
          onChange={async (option: any) => {
            const selectedCustomer = CustomerOptions?.find((p: any) => p.value == option?.value);
            if (selectedCustomer) {
              props.row.original.customerId = option?.value;
              props.row.original.company = selectedCustomer.company || ""
              props.row.original.email = selectedCustomer.email || ""
              await props.table.options.meta?.updateData(props.row.index, "phone", selectedCustomer.phone);
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