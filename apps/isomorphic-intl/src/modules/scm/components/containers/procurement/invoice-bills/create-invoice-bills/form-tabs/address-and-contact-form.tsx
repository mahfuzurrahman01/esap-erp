"use client"

import { useTranslations } from "next-intl"
import {
  Control,
  FormState,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form"

import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Input } from "@/components/ui"
import {
  Invoice,
  InvoiceInput,
  InvoiceUpdate,
} from "@/modules/scm/types/procurement/invoice/invoice-types"

interface AddressAndContactFormProps {
  formMethods: {
    register: UseFormRegister<InvoiceInput | InvoiceUpdate>
    control: Control<InvoiceInput | InvoiceUpdate>
    formState: FormState<InvoiceInput | InvoiceUpdate>
    setValue: UseFormSetValue<InvoiceInput | InvoiceUpdate>
  }
  isFieldDisabled?: boolean
  initialData?: Invoice
  isEditForm?: boolean
}

export default function AddressAndContactForm({
  formMethods,
  isFieldDisabled,
}: AddressAndContactFormProps) {
  const t = useTranslations("form")

  const {
    register,
    formState: { errors },
  } = formMethods

  return (
    <>
      <FormGroupContainer>
        <FormGroup
          title={t("form-supplier-address")}
          className="pt-7 @2xl:pt-10 @3xl:pt-11">
          <Input
            placeholder={t("form-supplier-contact-name")}
            label={t("form-supplier-contact-name")}
            labelClassName="text-title"
            {...register("supplierContactName")}
            error={
              errors.supplierContactName?.message
                ? t(errors.supplierContactName?.message)
                : ""
            }
            disabled={isFieldDisabled}
          />
          <Input
            placeholder={t("form-contact-phone")}
            label={t("form-contact-phone")}
            labelClassName="text-title"
            {...register("supplierContactPhone")}
            error={
              errors.supplierContactPhone?.message
                ? t(errors.supplierContactPhone?.message)
                : ""
            }
            disabled={isFieldDisabled}
          />
          <Input
            placeholder={t("form-contact-email")}
            label={t("form-contact-email")}
            labelClassName="text-title"
            {...register("supplierContactEmail")}
            error={
              errors.supplierContactEmail?.message
                ? t(errors.supplierContactEmail?.message)
                : ""
            }
            disabled={isFieldDisabled}
          />
          <Input
            placeholder={t("form-supplier-address")}
            label={t("form-supplier-address")}
            labelClassName="text-title"
            {...register("supplierAddress")}
            error={
              errors.supplierAddress?.message
                ? t(errors.supplierAddress?.message)
                : ""
            }
            disabled={isFieldDisabled}
          />
          <Input
            placeholder={t("form-supplier-street")}
            label={t("form-supplier-street")}
            labelClassName="text-title"
            {...register("supplierStreet")}
            error={
              errors.supplierStreet?.message
                ? t(errors.supplierStreet?.message)
                : ""
            }
            disabled={isFieldDisabled}
          />
          <Input
            placeholder={t("form-supplier-city")}
            label={t("form-supplier-city")}
            labelClassName="text-title"
            {...register("supplierCity")}
            error={
              errors.supplierCity?.message
                ? t(errors.supplierCity?.message)
                : ""
            }
            disabled={isFieldDisabled}
          />
          <Input
            placeholder={t("form-supplier-state")}
            label={t("form-supplier-state")}
            labelClassName="text-title"
            {...register("supplierState")}
            error={
              errors.supplierState?.message
                ? t(errors.supplierState?.message)
                : ""
            }
            disabled={isFieldDisabled}
          />
          <Input
            placeholder={t("form-supplier-zip-code")}
            label={t("form-supplier-zip-code")}
            labelClassName="text-title"
            {...register("supplierZipCode")}
            error={
              errors.supplierZipCode?.message
                ? t(errors.supplierZipCode?.message)
                : ""
            }
            disabled={isFieldDisabled}
          />
        </FormGroup>
        <FormGroup
          title={t("form-company-shipping-address")}
          className="pt-7 @2xl:pt-10 @3xl:pt-11">
          <Input
            placeholder={t("form-shipping-contact-person")}
            label={t("form-shipping-contact-person")}
            labelClassName="text-title"
            {...register("shippingContactPerson")}
            error={
              errors.shippingContactPerson?.message
                ? t(errors.shippingContactPerson?.message)
                : ""
            }
            disabled={isFieldDisabled}
          />
          <Input
            placeholder={t("form-shipping-contact-phone")}
            label={t("form-shipping-contact-phone")}
            labelClassName="text-title"
            {...register("shippingContactPhone")}
            error={
              errors.shippingContactPhone?.message
                ? t(errors.shippingContactPhone?.message)
                : ""
            }
            disabled={isFieldDisabled}
          />
          <Input
            placeholder={t("form-shipping-contact-email")}
            label={t("form-shipping-contact-email")}
            labelClassName="text-title"
            {...register("shippingContactEmail")}
            error={
              errors.shippingContactEmail?.message
                ? t(errors.shippingContactEmail?.message)
                : ""
            }
            disabled={isFieldDisabled}
          />
          <Input
            placeholder={t("form-shipping-address")}
            label={t("form-shipping-address")}
            labelClassName="text-title"
            {...register("shippingAddress")}
            error={
              errors.shippingAddress?.message
                ? t(errors.shippingAddress?.message)
                : ""
            }
            disabled={isFieldDisabled}
          />
          <Input
            placeholder={t("form-shipping-street")}
            label={t("form-shipping-street")}
            labelClassName="text-title"
            {...register("shippingStreet")}
            error={
              errors.shippingStreet?.message
                ? t(errors.shippingStreet?.message)
                : ""
            }
            disabled={isFieldDisabled}
          />
          <Input
            placeholder={t("form-shipping-city")}
            label={t("form-shipping-city")}
            labelClassName="text-title"
            {...register("shippingCity")}
            error={
              errors.shippingCity?.message
                ? t(errors.shippingCity?.message)
                : ""
            }
            disabled={isFieldDisabled}
          />
          <Input
            placeholder={t("form-shipping-state")}
            label={t("form-shipping-state")}
            labelClassName="text-title"
            {...register("shippingState")}
            error={
              errors.shippingState?.message
                ? t(errors.shippingState?.message)
                : ""
            }
            disabled={isFieldDisabled}
          />
          <Input
            placeholder={t("form-shipping-zip-code")}
            label={t("form-shipping-zip-code")}
            labelClassName="text-title"
            {...register("shippingZipCode")}
            error={
              errors.shippingZipCode?.message
                ? t(errors.shippingZipCode?.message)
                : ""
            }
            disabled={isFieldDisabled}
          />
        </FormGroup>
        <FormGroup
          title={t("form-company-billing-address")}
          className="pt-7 @2xl:pt-10 @3xl:pt-11">
          <Input
            placeholder={t("form-company-contact-person")}
            label={t("form-company-contact-person")}
            labelClassName="text-title"
            {...register("companyContactPerson")}
            error={
              errors.companyContactPerson?.message
                ? t(errors.companyContactPerson?.message)
                : ""
            }
            disabled={isFieldDisabled}
          />
          <Input
            placeholder={t("form-company-contact-phone")}
            label={t("form-company-contact-phone")}
            labelClassName="text-title"
            {...register("companyContactPhone")}
            error={
              errors.companyContactPhone?.message
                ? t(errors.companyContactPhone?.message)
                : ""
            }
            disabled={isFieldDisabled}
          />
          <Input
            placeholder={t("form-company-contact-email")}
            label={t("form-company-contact-email")}
            labelClassName="text-title"
            {...register("companyContactEmail")}
            error={
              errors.companyContactEmail?.message
                ? t(errors.companyContactEmail?.message)
                : ""
            }
            disabled={isFieldDisabled}
          />
          <Input
            placeholder={t("form-company-trn")}
            label={t("form-company-trn")}
            labelClassName="text-title"
            {...register("companyTrn")}
            error={
              errors.companyTrn?.message ? t(errors.companyTrn?.message) : ""
            }
            disabled={isFieldDisabled}
          />
          <Input
            placeholder={t("form-company-address")}
            label={t("form-company-address")}
            labelClassName="text-title"
            {...register("companyAddress")}
            error={
              errors.companyAddress?.message
                ? t(errors.companyAddress?.message)
                : ""
            }
            disabled={isFieldDisabled}
          />
          <Input
            placeholder={t("form-company-street")}
            label={t("form-company-street")}
            labelClassName="text-title"
            {...register("companyStreet")}
            error={
              errors.companyStreet?.message
                ? t(errors.companyStreet?.message)
                : ""
            }
            disabled={isFieldDisabled}
          />
          <Input
            placeholder={t("form-company-city")}
            label={t("form-company-city")}
            labelClassName="text-title"
            {...register("companyCity")}
            error={
              errors.companyCity?.message ? t(errors.companyCity?.message) : ""
            }
            disabled={isFieldDisabled}
          />
          <Input
            placeholder={t("form-company-state")}
            label={t("form-company-state")}
            labelClassName="text-title"
            {...register("companyState")}
            error={
              errors.companyState?.message
                ? t(errors.companyState?.message)
                : ""
            }
            disabled={isFieldDisabled}
          />
          <Input
            placeholder={t("form-company-zip-code")}
            label={t("form-company-zip-code")}
            labelClassName="text-title"
            {...register("companyZipCode")}
            error={
              errors.companyZipCode?.message
                ? t(errors.companyZipCode?.message)
                : ""
            }
            disabled={isFieldDisabled}
          />
        </FormGroup>
      </FormGroupContainer>
    </>
  )
}
