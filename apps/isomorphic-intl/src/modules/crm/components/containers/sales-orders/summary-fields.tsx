import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import FormGroup from "@/components/base/form-group"
import { Input } from "@/components/ui"

export function SummaryInformation({ register, summary }: any) {
  const t = useTranslations("form")

  return (
    <FormGroup title={t("form-total")} className="pt-7">
      <div></div>
      <div className="flex items-center justify-between">
        <Text className="text-md font-medium text-gray-700 dark:text-gray-100">
          {t("form-subtotal")}
        </Text>
        <Input
          type="number"
          {...register("subtotal", {
            valueAsNumber: true,
          })}
          value={summary?.subtotal}
          disabled
          placeholder={t("form-subtotal")}
          inputClassName="border-gray-500/20 ring-0 w-40 text-right"
        />
      </div>
      {/* <div></div> */}
      {/* <div className="flex items-center justify-between">
        <Text className="text-md font-medium text-gray-700 dark:text-gray-100">
          {t("form-discount")}
        </Text>
        <Input
          type="number"
          {...register("discount", {
            valueAsNumber: true,
          })}
          value={summary?.discountAmount}
          disabled
          placeholder={t("form-discount")}
          inputClassName="border-gray-500/20 ring-0 w-40 text-right"
        />
      </div> */}
      <div></div>
      <div className="flex items-center justify-between">
        <Text className="text-md font-medium text-gray-700 dark:text-gray-100">
          {t("form-tax")}
        </Text>
        <Input
          type="number"
          {...register("tax", {
            valueAsNumber: true,
          })}
          value={summary?.taxes}
          disabled
          placeholder={t("form-tax")}
          inputClassName="border-gray-500/20 ring-0 w-40 text-right"
        />
      </div>
      <div></div>
      <div className="flex items-center justify-between">
        <Text className="text-md font-medium text-gray-700 dark:text-gray-100">
          {t("form-total")}
        </Text>
        <Input
          type="number"
          {...register("total", {
            valueAsNumber: true,
          })}
          value={summary?.total}
          disabled
          placeholder={t("form-total")}
          inputClassName="border-gray-500/20 ring-0 w-40 text-right"
        />
      </div>
    </FormGroup>
  )
}
