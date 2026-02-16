"use client"

import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler, UseFormSetValue } from "react-hook-form"
import toast from "react-hot-toast"
import { PiPlusBold } from "react-icons/pi"
import { Text } from "rizzui"

import { DatePicker } from "@/components/base/date-picker"
import FormFooter from "@/components/base/form-footer"
import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Input, Badge, Button, Select } from "@/components/ui"
import Box from "@/components/ui/box"
import TableGrid from "@/components/ui/table-grid"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import {
  useCreateJournalEntry,
  useJournalEntryById,
  useUpdateJournalEntry,
} from "@/modules/fms/hooks/use-journal-entry"
import {
  useJournalEntryTemplateById,
  useJournalEntryTemplateList,
} from "@/modules/fms/hooks/use-journal-entry-template"
import { JournalDetail, JournalEntryList } from "@/modules/fms/types"
import {
  JournalEntryFormInput,
  journalEntryFormSchema,
} from "@/modules/fms/validators/journal-entry-schema"

import EntryTable from "./table/entry-table"

export default function CreateEditForm({
  id,
  mode = "create",
}: {
  id?: number
  mode?: "create" | "edit" | "view"
  record?: JournalEntryFormInput
}) {
  const t = useTranslations("form")
  const router = useRouter()
  const { coa, company, journalEntryType } = useSharedDataHooks([
    "coa",
    "company",
    "journalEntryType",
  ])

  const { coaOptions, isCOALoading, searchCOA, coaList } = coa
  const { companyOptions, companyList, isCompanyLoading } = company
  const { journalEntryTypeOptions, isJournalEntryTypeLoading } =
    journalEntryType

  const { data: journalEntry } = useJournalEntryById(id!)
  const { data: templateList, isLoading: isTemplateLoading } =
    useJournalEntryTemplateList()

  const { mutate: createJournalEntry, isPending: isCreateLoading } =
    useCreateJournalEntry()
  const { mutate: updateJournalEntry, isPending: isUpdateLoading } =
    useUpdateJournalEntry()

  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(
    null
  )
  const { data: selectedTemplate, isLoading: isSelectedTemplateLoading } = useJournalEntryTemplateById(
    selectedTemplateId!
  )

  const isLoading = isCreateLoading || isUpdateLoading || isTemplateLoading || isSelectedTemplateLoading

  const templateListOptions = useMemo(() => {
    return (
      templateList?.data?.map((template) => ({
        value: template.id,
        label: template.journalTemplateTitle,
      })) ?? []
    )
  }, [templateList?.data])

  const [totalDebit, setTotalDebit] = useState(0)
  const [totalCredit, setTotalCredit] = useState(0)
  const [balanceError, setBalanceError] = useState("")

  const calculateAndValidateTotals = (updatedEntries: JournalDetail[]) => {
    const newTotalDebit = updatedEntries.reduce(
      (sum, entry) => sum + (Number(entry.debit) || 0),
      0
    )
    const newTotalCredit = updatedEntries.reduce(
      (sum, entry) => sum + (Number(entry.credit) || 0),
      0
    )

    setTotalDebit(newTotalDebit)
    setTotalCredit(newTotalCredit)

    if (
      newTotalDebit > 0 &&
      newTotalCredit > 0 &&
      newTotalDebit !== newTotalCredit
    ) {
      setBalanceError(t("form-total-debit-must-equal-total-credit"))
      return false
    }

    setBalanceError("")
    return true
  }

  const validateChartOfAccount = (entries: JournalDetail[]) => {
    const invalidEntries = entries.filter((entry) => !entry.chartOfAccountId)
    if (invalidEntries.length > 0) {
      toast.error(<Text as="b">Please select an account for all entries</Text>)
      return false
    }
    return true
  }

  const journalEntryColumns = [
    {
      id: "id",
      header: "ID",
      accessorKey: "id",
      width: "50px",
      cell: ({ row }: { row: any }) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {row.index + 1}
        </Text>
      ),
    },
    {
      id: "chartOfAccountId",
      header: "Accounts Head",
      accessorKey: "chartOfAccountId",
      width: "300px",
      cell: (props: any) => (
        <div className="flex flex-col gap-1">
          <Select
            options={coaOptions}
            value={
              props.row.original.chartOfAccountId && coaOptions
                ? coaOptions.find(
                  (option: any) =>
                    option.value === props.row.original.chartOfAccountId
                ) || {
                  value: props.row.original.chartOfAccountId,
                  label: props.row.original.chartOfAccount?.accountNameWithAbbr || props.row.original.chartOfAccount?.accountName
                }
                : null
            }
            onChange={(option: any) => {
              props.table.options.meta?.updateData(
                props.row.index,
                "chartOfAccountId",
                option?.value
              );

              // Update chartOfAccount in the entries state to persist label data
              const newEntries = [...entries];
              const entry = { ...newEntries[props.row.index] };

              entry.chartOfAccountId = option?.value;

              // Store the full option with label for display purposes
              if (option) {
                // Find the matching COA from the original data if available
                const selectedCOA = coaOptions.find((coa: any) => coa.value === option.value);

                if (selectedCOA) {
                  // Create a minimal valid COA object with required fields
                  entry.chartOfAccount = {
                    id: option.value,
                    accountName: option.label,
                    accountNameWithAbbr: option.label,
                    companyId: companyList?.data?.[0]?.id || 0,
                    currencyId: 0
                  };
                } else {
                  // Create a minimal valid COA object with required fields
                  entry.chartOfAccount = {
                    id: option.value,
                    accountName: option.label,
                    accountNameWithAbbr: option.label,
                    companyId: companyList?.data?.[0]?.id || 0,
                    currencyId: 0
                  };
                }
              } else {
                entry.chartOfAccount = null;
              }

              newEntries[props.row.index] = entry;
              setEntries(newEntries);
            }}
            onSearch={searchCOA}
            isLoading={isCOALoading}
            placeholder="Select account"
            menuPortalTarget={document.body}
            isDisabled={isFieldDisabled}
            className={
              !props.row.original.chartOfAccountId ? "border-red-500" : ""
            }
          />
          {/* {!props.row.original.chartOfAccountId && (
            <Text className="text-xs text-red-500">Account is required</Text>
          )} */}
        </div>
      ),
    },
    {
      id: "debit",
      header: "Debit",
      accessorKey: "debit",
      width: "150px",
      cell: (props: any) => (
        <Input
          type="number"
          value={props.value || ""}
          onChange={(e) => {
            const value = e.target.value
            const numValue = Math.max(0, Number(value))

            if (!isNaN(numValue)) {
              props.table.options.meta?.updateData(
                props.row.index,
                "debit",
                numValue
              )
            }
          }}
          placeholder="0.00"
          disabled={props.row.original.credit > 0}
          className={props.row.original.credit > 0 ? "opacity-50" : ""}
          min="0"
        />
      ),
    },
    {
      id: "credit",
      header: "Credit",
      accessorKey: "credit",
      width: "150px",
      cell: (props: any) => {
        const rowIndex = props.row.index
        const totalDebit = entries.reduce(
          (sum, e) => sum + (Number(e.debit) || 0),
          0
        )
        const existingCredit = entries.reduce(
          (sum, e, i) => (i !== rowIndex ? sum + (Number(e.credit) || 0) : sum),
          0
        )

        const suggestedCredit = Math.max(0, totalDebit - existingCredit)

        return (
          <div className="relative">
            <Input
              type="number"
              value={props.value || ""}
              onChange={(e) => {
                const value = e.target.value
                const numValue = Math.max(0, Number(value))

                if (!isNaN(numValue)) {
                  props.table.options.meta?.updateData(
                    props.row.index,
                    "credit",
                    numValue
                  )
                }
              }}
              placeholder={suggestedCredit > 0 ? `${suggestedCredit}` : "0.00"}
              disabled={props.row.original.debit > 0}
              className={` ${props.row.original.debit > 0 ? "opacity-50" : ""} ${suggestedCredit > 0 ? "border-blue-500" : ""} `}
            />
            {/* {suggestedCredit > 0 && !props.value && (
              <Text className="mt-1 text-xs text-blue-500">
                Remaining: {suggestedCredit}
              </Text>
            )} */}
          </div>
        )
      },
    },
    {
      id: "actions",
      header: "",
      accessorKey: "actions",
      width: "80px",
      cell: (props: any) =>
        mode !== "view" ? (
          <Badge
            variant="flat"
            color="danger"
            rounded="lg"
            className="cursor-pointer"
            onClick={() => props.onDelete()}>
            Delete
          </Badge>
        ) : null,
    },
  ]

  const [entries, setEntries] = useState<JournalDetail[]>([
    {
      id: 0,
      chartOfAccountId: 0,
      debit: 0,
      credit: 0,
    },
  ])

  const addNewRow = () => {
    const currentTotalDebit = entries.reduce(
      (sum, entry) => sum + (Number(entry.debit) || 0),
      0
    )
    const currentTotalCredit = entries.reduce(
      (sum, entry) => sum + (Number(entry.credit) || 0),
      0
    )

    const remainingToBalance = currentTotalDebit - currentTotalCredit

    const newEntry: JournalDetail = {
      id: 0,
      chartOfAccountId: 0,
      debit: 0,
      credit: remainingToBalance > 0 ? remainingToBalance : 0,
    }

    const updatedEntries = [...entries, newEntry]
    setEntries(updatedEntries)

    // Update totals
    const newTotalDebit = updatedEntries.reduce(
      (sum, e) => sum + (Number(e.debit) || 0),
      0
    )
    const newTotalCredit = updatedEntries.reduce(
      (sum, e) => sum + (Number(e.credit) || 0),
      0
    )

    setTotalDebit(newTotalDebit)
    setTotalCredit(newTotalCredit)
  }

  const onSubmit: SubmitHandler<JournalEntryList> = (formData) => {
    if (!calculateAndValidateTotals(entries)) {
      toast.error(<Text as="b">Debit and Credit must be equal</Text>)
      return
    }

    // Add chart of account validation
    if (!validateChartOfAccount(entries)) {
      return
    }

    // Filter out any entries with invalid chart of account IDs
    const validEntries = entries.filter(entry => entry.chartOfAccountId !== 0);

    // Transform data to match JournalEntryList type
    const journalEntryData: JournalEntryList = {
      ...formData, // Include all form values
      id: id ? id : 0,
      journalDetails: validEntries,
      totalDebit: totalDebit,
      totalCredit: totalCredit,
      journalTemplateId: selectedTemplateId,
    }

    if (id) {
      updateJournalEntry({ ...journalEntryData, id })
    } else {
      createJournalEntry(journalEntryData)
    }
  }

  const handleRowChange = (index: number, field: string, value: any) => {
    const newEntries = [...entries];
    const entry = { ...newEntries[index] };
    const numValue = Math.max(0, Number(value));

    if (field === "debit") {
      if (numValue > 0) {
        entry.debit = numValue;
        entry.credit = 0; // Clear credit when debit is entered

        // If this is the last row, add a new row with the credit value
        if (entries.length === index + 1) {
          const newEntry: JournalDetail = {
            id: 0,
            chartOfAccountId: 0,
            debit: 0,
            credit: numValue, // Set credit in new row equal to debit
          };

          newEntries[index] = entry; // Update current row
          newEntries.push(newEntry); // Add new row
        }
      }
      entry.debit = numValue;
    } else if (field === "credit") {
      // Calculate total debit and existing credit
      const totalDebit = entries.reduce(
        (sum, e) => sum + (Number(e.debit) || 0),
        0
      );
      const existingCredit = entries.reduce(
        (sum, e, i) => (i !== index ? sum + (Number(e.credit) || 0) : sum),
        0
      );

      // Calculate maximum allowed credit for this row
      const maxAllowedCredit = totalDebit - existingCredit;

      if (numValue > 0) {
        entry.credit = Math.min(numValue, maxAllowedCredit); // Limit credit to remaining balance
        entry.debit = 0; // Clear debit when credit is entered
      } else {
        entry.credit = numValue;
      }
    } else if (field === "chartOfAccountId") {
      entry.chartOfAccountId = value;

      // Find the matching option to get the label
      const selectedOption = coaOptions.find((option: any) => option.value === value);
      if (selectedOption) {
        // Create a minimal valid COA object with required fields
        entry.chartOfAccount = {
          id: value,
          accountName: selectedOption.label,
          accountNameWithAbbr: selectedOption.label,
          companyId: companyList?.data?.[0]?.id || 0,
          currencyId: 0
        };
      }
    }

    newEntries[index] = entry;
    setEntries(newEntries);

    // Calculate new totals
    const newTotalDebit = newEntries.reduce(
      (sum, e) => sum + (Number(e.debit) || 0),
      0
    );
    const newTotalCredit = newEntries.reduce(
      (sum, e) => sum + (Number(e.credit) || 0),
      0
    );

    setTotalDebit(newTotalDebit);
    setTotalCredit(newTotalCredit);

    // Validate balance
    if (newTotalDebit !== newTotalCredit) {
      setBalanceError(
        `${t("form-debit-and-credit-must-be-equal")} ${Math.abs(newTotalDebit - newTotalCredit)}`
      );
    } else {
      setBalanceError("");
    }
  };

  const handleRowDelete = (index: number) => {
    const newEntries = entries.filter((_, i) => i !== index)
    // Update serial numbers
    const updatedEntries = newEntries.map((entry, i) => ({
      ...entry,
      sn: i + 1,
    }))
    setEntries(updatedEntries)
  }

  const defaultValues: JournalEntryFormInput = useMemo(
    () => ({
      id: journalEntry?.id || 0,
      journalNo: journalEntry?.journalNo || "",
      journalTypeId: journalEntry?.journalTypeId || 0,
      journalTemplateId: journalEntry?.journalTemplateId || 0,
      postingDate: journalEntry?.postingDate || new Date().toISOString(),
      companyId: journalEntry?.companyId || 0,
      journalDetails: journalEntry?.journalDetails?.map(detail => ({
        id: detail.id || 0,
        chartOfAccountId: detail.chartOfAccountId,
        debit: detail.debit || 0,
        credit: detail.credit || 0
      })) || [],
      referenceNo: journalEntry?.referenceNo || "",
      referenceDate: journalEntry?.referenceDate || "",
      totalDebit: journalEntry?.totalDebit !== undefined && journalEntry?.totalDebit !== null
        ? Number(journalEntry.totalDebit)
        : 0,
      totalCredit: journalEntry?.totalCredit !== undefined && journalEntry?.totalCredit !== null
        ? Number(journalEntry.totalCredit)
        : 0,
    }),
    [journalEntry]
  )

  const isFieldDisabled = mode === "view"

  const handleTemplateChange = (
    option: any,
    onChange: (value: any) => void,
    setValue: UseFormSetValue<JournalEntryFormInput>
  ) => {
    if (option) {
      const templateId = option.value;
      setSelectedTemplateId(templateId);
      onChange(templateId);
    }
  };

  return (
    <Box>
      <Form<JournalEntryFormInput>
        validationSchema={journalEntryFormSchema}
        onSubmit={onSubmit}
        className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11"
        useFormProps={{
          defaultValues: defaultValues,
          mode: "onChange",
          values: journalEntry ? {
            ...journalEntry,
            journalTemplateId: selectedTemplateId || 0,
            totalDebit: journalEntry.totalDebit !== undefined && journalEntry.totalDebit !== null
              ? Number(journalEntry.totalDebit)
              : totalDebit,
            totalCredit: journalEntry.totalCredit !== undefined && journalEntry.totalCredit !== null
              ? Number(journalEntry.totalCredit)
              : totalCredit,
          } as JournalEntryFormInput : undefined,
        }}>
        {({ register, control, setValue, formState: { errors } }) => {
          useEffect(() => {
            if (companyList?.data && !id) {
              const defaultCompany = companyList.data.find(
                (company: any) => company.isDefault
              )
              if (defaultCompany) {
                setValue?.("companyId", defaultCompany.id)
              }
            }
          }, [companyList?.data, id, setValue])

          useEffect(() => {
            if (selectedTemplate) {
              // Update form with template data
              if (selectedTemplate.journalTypeId) {
                setValue("journalTypeId", selectedTemplate.journalTypeId);
              }
              if (selectedTemplate.companyId) {
                setValue("companyId", selectedTemplate.companyId);
              }

              // Update entries based on template accounts
              if (selectedTemplate.accounts && selectedTemplate.accounts.length > 0) {
                const templateEntries = selectedTemplate.accounts.map(account => ({
                  id: account.id,
                  chartOfAccountId: account.chartOfAccountId,
                  chartOfAccount: {
                    value: account.chartOfAccountId,
                    label: account.chartOfAccount?.accountNameWithAbbr || account.chartOfAccount?.accountName,
                    ...account.chartOfAccount
                  },
                  debit: 0,
                  credit: 0,
                }));
                setEntries(templateEntries);
              }
            }
          }, [selectedTemplate, setValue]);

          return (
            <>
              <FormGroupContainer>
                <FormGroup title={t("form-information")}>
                  <Controller
                    name="journalTypeId"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label={t("form-journal-entry-type")}
                        labelClassName="text-title"
                        isRequired
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
                        isDisabled={
                          isFieldDisabled || isJournalEntryTypeLoading
                        }
                        placeholder={
                          isJournalEntryTypeLoading
                            ? "Loading journal entry types..."
                            : "Select a journal entry type"
                        }
                        error={
                          errors.journalTypeId?.message &&
                          t(errors.journalTypeId.message)
                        }
                      />
                    )}
                  />
                  <Controller
                    name="companyId"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label={t("form-company-name")}
                        labelClassName="text-title"
                        defaultValue={companyOptions[0]?.value}
                        options={companyOptions}
                        value={
                          value && companyOptions
                            ? companyOptions.find(
                              (option: any) => option.value === value
                            )
                            : companyOptions?.find(
                              (option: any) =>
                                option.value ===
                                companyList?.data?.find(
                                  (company: any) => company.isDefault
                                )?.id
                            ) || null
                        }
                        onChange={(option: any) => onChange(option?.value)}
                        isRequired
                        isLoading={isCompanyLoading}
                        isDisabled={isFieldDisabled || isCompanyLoading}
                        placeholder={
                          isCompanyLoading
                            ? "Loading companies..."
                            : "Select a company"
                        }
                        error={
                          errors.companyId?.message &&
                          t(errors.companyId.message)
                        }
                      />
                    )}
                  />
                  <Controller
                    name="journalTemplateId"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label={t("form-journal-template")}
                        labelClassName="text-title"
                        options={templateListOptions}
                        value={
                          value && templateListOptions
                            ? templateListOptions.find(
                              (option: any) => option.value === value
                            )
                            : null
                        }
                        onChange={(option: any) => handleTemplateChange(option, onChange, setValue)}
                        isLoading={isTemplateLoading}
                        isDisabled={isFieldDisabled || isTemplateLoading}
                        placeholder={
                          isTemplateLoading
                            ? "Loading templates..."
                            : "Select a template"
                        }
                        error={
                          errors.journalTemplateId?.message &&
                          t(errors.journalTemplateId.message)
                        }
                      />
                    )}
                  />
                  <Controller
                    name="postingDate"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <div className="relative">
                        <label
                          htmlFor="postingDate"
                          className="mb-2 block text-sm font-medium text-title">
                          {t("form-posting-date")}
                        </label>
                        <DatePicker
                          id="postingDate"
                          value={value ? new Date(value) : null}
                          onChange={(date: any) =>
                            onChange(date ? date.toISOString() : "")
                          }
                          placeholderText={t("form-select-date")}
                          maxDate={new Date()}
                          className="w-full"
                          disabled={isFieldDisabled}
                        />
                      </div>
                    )}
                  />
                </FormGroup>

                <FormGroup
                  title={t("form-journal-entry-details")}
                  className="pt-7 @2xl:pt-10 @3xl:pt-11"
                  childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12">
                  <div className="space-y-4">
                    {mode === "view" ? (
                      <EntryTable
                        tableData={journalEntry?.journalDetails.map(detail => ({
                          id: detail.id || 0,
                          chartOfAccountId: detail.chartOfAccountId,
                          chartOfAccount: detail.chartOfAccount,
                          debit: detail.debit || 0,
                          credit: detail.credit || 0
                        })) || []}
                        isLoading={isLoading}
                      />
                    ) : (
                      <>
                        {isSelectedTemplateLoading ? (
                          <div className="flex items-center justify-center py-8">
                            <Text className="text-lg font-medium">Loading template data...</Text>
                          </div>
                        ) : (
                          <TableGrid
                            key={`entries-${entries.length}-${journalEntry?.id}-${selectedTemplateId}`}
                            columns={journalEntryColumns}
                            data={entries}
                            gridTemplateColumns="50px 1fr 150px 150px 100px"
                            variant="modern"
                            meta={{
                              updateData: handleRowChange,
                            }}
                            onRowDelete={handleRowDelete}
                          />
                        )}
                        <Button
                          variant="outline"
                          onClick={addNewRow}
                          className="mt-4">
                          <PiPlusBold className="me-2 h-4 w-4" />
                          {t("form-add-row")}
                        </Button>
                      </>
                    )}
                  </div>
                </FormGroup>

                <FormGroup
                  title="Reference Information"
                  className="pt-7 @2xl:pt-10 @3xl:pt-11">
                  <Input
                    {...register("referenceNo")}
                    type="text"
                    label={t("form-reference-no")}
                    placeholder={t("form-enter-reference-no")}
                    error={errors.referenceNo?.message}
                    disabled={isFieldDisabled}
                    isRequired
                  />
                  <Controller
                    name="referenceDate"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <div className="relative">
                        <DatePicker
                          inputProps={{
                            label: t("form-reference-date"),
                          }}
                          isRequired
                          value={value ? new Date(value) : ""}
                          onChange={(date: any) =>
                            onChange(date ? date.toISOString() : "")
                          }
                          popperPlacement="bottom-end"
                          placeholderText={t("form-select-reference-date")}
                          className="w-full"
                          disabled={isFieldDisabled}
                        />
                      </div>
                    )}
                  />
                  <div className="flex flex-col gap-4">
                    <Input
                      {...register("totalDebit")}
                      type="number"
                      label={t("form-total-debit")}
                      value={journalEntry?.totalDebit !== undefined && journalEntry?.totalDebit !== null
                        ? Number(journalEntry.totalDebit)
                        : totalDebit}
                      disabled
                    />
                    <Input
                      {...register("totalCredit")}
                      type="number"
                      label={t("form-total-credit")}
                      value={journalEntry?.totalCredit !== undefined && journalEntry?.totalCredit !== null
                        ? Number(journalEntry.totalCredit)
                        : totalCredit}
                      disabled
                    />
                    {balanceError && (
                      <Text className="mt-2 text-sm text-red-500">
                        {balanceError}
                      </Text>
                    )}
                  </div>
                </FormGroup>
              </FormGroupContainer>

              {mode !== "view" && (
                <FormFooter
                  isLoading={isLoading}
                  altBtnText={t("form-cancel")}
                  submitBtnText={
                    mode === "edit"
                      ? t("form-update-journal-entry")
                      : t("form-create-journal-entry")
                  }
                  className="border-gray-500/20 dark:bg-paper"
                  handleAltBtn={() => router.back()}
                />
              )}
            </>
          )
        }}
      </Form>
    </Box>
  )
}
