"use client"

import { Form } from "@core/ui/form"

import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import Box from "@/components/ui/box"
import TableGrid from "@/components/ui/table-grid"
import { BankClearanceFormInput } from "@/modules/fms/validators/bank-clearance-schema"
import { bankClearanceFormSchema } from "@/modules/fms/validators/bank-clearance-schema"

import { useBankAccountSummaryList } from "@/modules/fms/hooks/use-bank-account-summary"
import { useSummaryDetailsColumns } from "./summary-details-columns"

export default function BankAccountSummaryForm() {
  const { data: summaryData }:any = useBankAccountSummaryList()

  const columns = useSummaryDetailsColumns()
  return (
    <Box>
      <Form<BankClearanceFormInput>
        validationSchema={bankClearanceFormSchema}
        onSubmit={() => { }}
        className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11">
        {() => (
          <>
            <FormGroupContainer>
              <FormGroup
                title=""
                className="pt-0"
                childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12">
                <div className="space-y-4">
                  <TableGrid
                    data={summaryData || []}
                    columns={columns}
                    gridTemplateColumns="50px 0.5fr 0.5fr 0.5fr 0.5fr 0.5fr 0.5fr 0.5fr"
                    variant="modern"
                  />
                </div>
              </FormGroup>
            </FormGroupContainer>
          </>
        )}
      </Form>
    </Box>
  )
}
