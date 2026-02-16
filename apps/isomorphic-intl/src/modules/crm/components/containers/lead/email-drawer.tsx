"use client";

import { Form } from "@core/ui/form";
import SimpleBar from "@core/ui/simplebar";
import { useTranslations } from "next-intl";
import { SubmitHandler } from "react-hook-form";

import DrawerFormActions from "@/components/base/drawer-form-actions";
import DrawerHeader from "@/components/base/drawer-header";
import { useDrawer } from "@/components/base/drawer-views/use-drawer";
import { Input, Textarea } from "@/components/ui";
import { useCreateEmail } from "@/modules/crm/hooks/use-email";
import { SendMailFormTypes } from "@/modules/crm/types/task";
import { sendEmailFormSchema } from "@/modules/crm/validators/email-schema";

export default function EmailDrawer({
  id,
  to,
  customerId,
  leadId,
  opportunityId,
  quotationId,
  salesOrdersId,
  invoiceId
}: {
  id?: string;
  to?: string;
  customerId?: string
  leadId?: string
  opportunityId?: string
  quotationId?: string
  salesOrdersId?: string
  invoiceId?: string
}) {
  const { closeDrawer } = useDrawer();
  const t = useTranslations("crm");
  const mutationFn = useCreateEmail()

  const handleCloseDrawer = () => {
    closeDrawer();
  };

  const onSubmit: SubmitHandler<SendMailFormTypes> = async (data) => {
    const bodydata = {
      ...data,
      to,
      leadId,
      customerId,
      opportunityId,
      salesOrdersId,
      invoiceId,
      quotationId,
    };
    const filteredBodydata = Object.fromEntries(
      Object.entries(bodydata).filter(([_, value]) => value !== undefined)
    );
  
    await mutationFn.mutateAsync(filteredBodydata, {
      onSuccess: () => {
        handleCloseDrawer()
      },
    })
  };  

  return (
    <div className="flex h-full flex-col">
      <Form<SendMailFormTypes>
        onSubmit={onSubmit}
        validationSchema={sendEmailFormSchema}
        className="flex grow flex-col justify-between"
        useFormProps={{
          mode: "onChange",
          defaultValues: {to}
        }}
      >
        {({
          register,
          formState: { errors },
        }) => {
          return (
            <>
              <DrawerHeader
                heading={t("text-new-message")}
                onClose={handleCloseDrawer}
                headerClassName="mb-0 px-6 pt-4 pb-2 border-b border-gray-300 dark:border-gray-700"
              />
              <SimpleBar className="h-full grow border-none">
                <div className="flex flex-col">
                  <Input
                    type="email"
                    className="mt-1"
                    readOnly
                    inputClassName="!border-none !hover:border-none !focus:border-none !active:border-none !ring-0 !outline-none rounded-lg font-medium text-sm px-6 pb-3"
                    placeholder={`${t("form-to")} *`}
                    {...register("to", { required: true })}
                  />
                  <p className="text-red-500 ml-6 mb-3">{errors.to?.message &&
                      t("form-email-to-is-required")
                    }</p>
                  <div className="border-t border-dashed border-gray-500/20"></div>
                  <Input
                    type="text"
                    className="mt-1"
                    inputClassName="!border-none !hover:border-none !focus:border-none !active:border-none !ring-0 !outline-none rounded-lg font-medium text-sm px-6 pb-3"
                    placeholder={`${t("form-subject")} *`}
                    {...register("subject", { required: true })}
                  />
                  {errors.subject?.message && <span className="px-6 text-xs text-rose-500 py-2">
                  {t("form-subject-is-required")}</span>}
                  <div className="border-t border-dashed border-gray-500/20"></div>
                  <div className="p-5">
                    <Textarea
                      placeholder={t("type-a-message")}
                      {...register("body")}
                      className="mt-2"
                      textareaClassName="!border-none !hover:border-none !focus:border-none !active:border-none !ring-0 !outline-none rounded-lg font-medium text-sm px-4 pb-3 py-4 bg-gray-200 dark:bg-gray-700 dark:text-gray-0"
                    />
                  </div>
                </div>
              </SimpleBar>

              <DrawerFormActions
                handleCloseDrawer={handleCloseDrawer}
                isLoading={false}
                isEditForm={!!id}
              />
            </>
          );
        }}
      </Form>
    </div>
  );
}