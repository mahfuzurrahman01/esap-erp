"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Form } from "@core/ui/form";
import { useTranslations } from "next-intl";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { PiPlusBold } from "react-icons/pi";
import { Text } from "rizzui";

import FormFooter from "@/components/base/form-footer";
import FormGroup from "@/components/base/form-group";
import FormGroupContainer from "@/components/base/form-group-container";
import { Badge, Button } from "@/components/ui";
import { Input, Select } from "@/components/ui";
import Box from "@/components/ui/box";
import TableGrid from "@/components/ui/table-grid";
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook";
import {
  useCreateJournalEntryTemplate,
  useJournalEntryTemplateById,
  useUpdateJournalEntryTemplate,
} from "@/modules/fms/hooks/use-journal-entry-template";
import {
  JournalTemplate,
  JournalTemplateDetail,
  JournalTemplateView,
} from "@/modules/fms/types";
import {
  JournalTemplateFormInput,
  journalTemplateFormSchema,
} from "@/modules/fms/validators/journal-entry-schema";

import TemplateTable from "./table/template-table";

// Define a type for the chart of account details used in the form
interface ChartOfAccountDetail {
  id?: number;
  chartOfAccountId: number;
}

export default function CreateEditForm({
  id,
  mode,
}: {
  id?: number;
  mode?: "create" | "edit" | "view";
}) {
  const t = useTranslations("form");
  const router = useRouter();
  const { coa, company, journalEntryType } = useSharedDataHooks([
    "coa",
    "company",
    "journalEntryType",
  ]);
  const { coaOptions } = coa;
  const { companyOptions, isCompanyLoading } = company;
  const { journalEntryTypeOptions, isJournalEntryTypeLoading } =
    journalEntryType;
  const { data: template, isLoading: isTemplateLoading } =
    useJournalEntryTemplateById(id!);

  const { mutate: createTemplate, isPending: isCreateLoading } =
    useCreateJournalEntryTemplate();
  const { mutate: updateTemplate, isPending: isUpdateLoading } =
    useUpdateJournalEntryTemplate();

  const isLoading = isCreateLoading || isUpdateLoading || isTemplateLoading;

  const [details, setDetails] = useState<ChartOfAccountDetail[]>([]);

  useEffect(() => {
    if (mode === "edit" && template) {
      if (template.accounts && template.accounts.length > 0) {
        // If we have accounts data, use it to populate details
        const newDetails = template.accounts.map((account) => ({
          id: account.id,
          chartOfAccountId: account.chartOfAccountId
        }));
        setDetails(newDetails);
      } else if (template.chartOfAccountIds) {
        // Fallback to chartOfAccountIds if accounts data is not available
        const newDetails = template.chartOfAccountIds.map((id) => ({
          chartOfAccountId: id
        }));
        setDetails(newDetails);
      }
    } else if (mode === "create") {
      setDetails([{ chartOfAccountId: 0 }]);
    }
  }, [mode, template]);

  const templateDetailsColumns = [
    {
      id: "id",
      header: "No.",
      accessorKey: "id",
      width: "50px",
      cell: (props: any) => <span>{props.row.index + 1}</span>,
    },
    {
      id: "chartOfAccountId",
      header: "Chart of Account",
      accessorKey: "chartOfAccountId",
      width: "300px",
      cell: (props: any) => (
        <Select
          labelClassName="text-title"
          options={coaOptions}
          value={
            props.row.original.chartOfAccountId && coaOptions
              ? coaOptions.find(
                (option: any) =>
                  option.value === props.row.original.chartOfAccountId
              )
              : null
          }
          onChange={(option: any) => {
            props.table.options.meta?.updateData(
              props.row.index,
              "chartOfAccountId",
              option?.value
            );
          }}
          menuPortalTarget={document.body}
          isDisabled={isLoading}
        />
      ),
    },
    {
      id: "actions",
      header: "",
      accessorKey: "actions",
      width: "80px",
      cell: (props: any) => (
        <Badge
          variant="flat"
          color="danger"
          rounded="lg"
          className="cursor-pointer"
          onClick={() => props.onDelete?.()}
        >
          Delete
        </Badge>
      ),
    },
  ];

  const defaultValues: JournalTemplate = useMemo(
    () => ({
      journalTemplateTitle: "",
      companyId: 0,
      journalTypeId: 0,
      chartOfAccountIds: [],
    }),
    []
  );

  const addNewRow = () => {
    const newDetails = [...details, { chartOfAccountId: 0 }];
    setDetails(newDetails);
  };

  const handleRowChange = (index: number, field: string, value: any) => {
    const newDetails = [...details];
    newDetails[index] = {
      ...newDetails[index],
      [field]: value,
    };
    setDetails(newDetails);
  };

  const handleRowDelete = (index: number) => {
    const newDetails = [...details];
    newDetails.splice(index, 1);
    setDetails(newDetails);
  };

  const onSubmit: SubmitHandler<JournalTemplateFormInput> = (data) => {
    const validDetails = details.filter(
      (detail) => detail.chartOfAccountId !== 0
    );

    const chartOfAccountIds = validDetails.map(
      (detail) => detail.chartOfAccountId
    );

    // If no valid chart of accounts, don't submit
    if (chartOfAccountIds.length === 0) {
      return;
    }

    const templateData = {
      journalTemplateTitle: data.journalTemplateTitle,
      companyId: data.companyId,
      journalTypeId: data.journalTypeId,
      chartOfAccountIds,
    };

    if (mode === "edit" && id) {
      updateTemplate({
        id,
        ...templateData,
      });
    } else {
      createTemplate(templateData);
    }
  };

  // Disable form fields in view mode
  const isViewMode = mode === "view";
  const isDisabled = isLoading || isViewMode;

  return (
    <Box>
      <Form<JournalTemplateFormInput>
        validationSchema={journalTemplateFormSchema}
        onSubmit={onSubmit}
        className="flex grow flex-col justify-between pt-7 @container"
        useFormProps={{
          defaultValues: defaultValues,
          mode: "onChange",
          values: template as JournalTemplate,
        }}
      >
        {({ register, control, formState: { errors }, setValue }) => {
          useEffect(() => {
            const validChartOfAccountIds = details
              .filter((detail) => detail.chartOfAccountId !== 0)
              .map((detail) => detail.chartOfAccountId);

            setValue("chartOfAccountIds", validChartOfAccountIds);
          }, [details, setValue]);

          return (
            <>
              <FormGroupContainer>
                <FormGroup title={t("form-information")}>
                  {/* Hidden field for chartOfAccountIds */}
                  <Controller
                    name="chartOfAccountIds"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="hidden"
                        {...field}
                        value={JSON.stringify(field.value || [])}
                      />
                    )}
                  />
                  <Input
                    {...register("journalTemplateTitle")}
                    label={t("form-template-title")}
                    placeholder={t("form-enter-template-title")}
                    error={
                      errors.journalTemplateTitle?.message &&
                      t(errors.journalTemplateTitle.message)
                    }
                    disabled={isDisabled}
                    required
                  />
                  <Controller
                    name="companyId"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label={t("form-company-name")}
                        labelClassName="text-title"
                        options={companyOptions}
                        value={
                          value && companyOptions
                            ? companyOptions.find(
                              (option: any) => option.value === value
                            )
                            : null
                        }
                        onChange={(option: any) => onChange(option?.value)}
                        isLoading={isCompanyLoading}
                        isDisabled={isLoading || isViewMode || isDisabled}
                        placeholder={
                          isLoading ? t("form-loading") : t("form-select")
                        }
                        error={
                          errors.companyId?.message &&
                          t(errors.companyId.message)
                        }
                      />
                    )}
                  />
                  <Controller
                    name="journalTypeId"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label={t("form-journal-entry-type-id")}
                        labelClassName="text-title"
                        options={journalEntryTypeOptions}
                        value={
                          value && journalEntryTypeOptions
                            ? journalEntryTypeOptions.find(
                              (option: any) => option.value === value
                            )
                            : null
                        }
                        onChange={(option: any) => onChange(option?.value)}
                        isLoading={isJournalEntryTypeLoading}
                        isDisabled={isLoading || isViewMode || isDisabled}
                        placeholder={
                          isLoading ? t("form-loading") : t("form-select")
                        }
                        error={
                          errors.journalTypeId?.message &&
                          t(errors.journalTypeId.message)
                        }
                      />
                    )}
                  />
                  {/* <Checkbox
                    {...register("isMultiCurrency")}
                    label="Multi Currency"
                  /> */}
                </FormGroup>

                <FormGroup
                  title=""
                  className="pt-7 @2xl:pt-10 @3xl:pt-11"
                  childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12"
                >
                  <div className="space-y-4">
                    <div className="mt-5">
                      <Text className="mb-2 font-medium text-title">
                        {t("form-chart-of-accounts")}
                        <span className="text-red-500">*</span>
                      </Text>
                      {errors.chartOfAccountIds?.message && (
                        <Text className="mb-2 text-sm text-red-500">
                          {t(errors.chartOfAccountIds.message)}
                        </Text>
                      )}
                    </div>
                    {isViewMode ? (
                      <TemplateTable
                        tableData={
                          template?.accounts?.map((account) => ({
                            id: account.id,
                            journalTemplateTitle: template.journalTemplateTitle,
                            companyId: template.companyId,
                            journalTypeId: template.journalTypeId,
                            chartOfAccountIds: template.chartOfAccountIds || [],
                            accounts: [{
                              id: account.id,
                              chartOfAccountId: account.chartOfAccountId,
                              chartOfAccount: account.chartOfAccount,
                              journalTemplateId: template.id?.toString() || "",
                            }],
                          })) ?? []
                        }
                        isLoading={isLoading}
                      />
                    ) : (
                      <>
                        <TableGrid
                          key={`details-${details.length}-${template?.id}`}
                          columns={templateDetailsColumns}
                          data={details}
                          gridTemplateColumns="50px minmax(300px, 1fr) 80px"
                          variant="modern"
                          meta={{
                            updateData: handleRowChange,
                          }}
                          onRowDelete={
                            !isViewMode ? handleRowDelete : undefined
                          }
                          className="rounded-lg border"
                        />
                        {!isViewMode && (
                          <Button
                            variant="outline"
                            onClick={addNewRow}
                            disabled={isDisabled}
                            className="mt-4"
                          >
                            <PiPlusBold className="me-2 h-4 w-4" />
                            {t("form-add-account")}
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </FormGroup>
              </FormGroupContainer>

              {!isViewMode && (
                <FormFooter
                  isLoading={isLoading}
                  altBtnText={t("form-back")}
                  handleAltBtn={() => {
                    router.back();
                  }}
                  submitBtnText={
                    id
                      ? t("form-update-journal-template")
                      : t("form-create-journal-template")
                  }
                  className="border-gray-500/20"
                />
              )}
            </>
          );
        }}
      </Form>
    </Box>
  );
}
