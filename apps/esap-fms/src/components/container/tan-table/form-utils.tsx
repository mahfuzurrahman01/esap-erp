"use client"

import cn from "@core/utils/class-names"
import { Badge, Text, Title } from "rizzui"
import z from "zod"

// form zod validation schema
export const invoiceFormSchema = z.object({
  fromName: z.string().min(1, { message: "This field is required" }),
  fromAddress: z.string().min(1, { message: "This field is required" }),
  fromPhone: z.string().min(1, { message: "Invalid phone number" }).optional(),
  toName: z.string().min(1, { message: "This field is required" }),
  toAddress: z.string().min(1, { message: "This field is required" }),
  toPhone: z.string().min(1, { message: "Invalid phone number" }).optional(),
  invoiceNumber: z.string({
    required_error: "This field is required",
  }),
  createDate: z
    .date()
    .refine((value) => value !== null, "Please select a date"),
  dueDate: z.date().refine((value) => value !== null, "Please select a date"),
  status: z.string({
    required_error: "This field is required",
  }),
  shipping: z
    .number()
    .min(0, { message: "This field is required" })
    .or(z.string().min(1, { message: "This field is required" })),
  discount: z
    .number()
    .min(0, { message: "This field is required" })
    .or(z.string().min(1, { message: "This field is required" })),
  taxes: z
    .number()
    .min(0, { message: "This field is required" })
    .or(z.string().min(1, { message: "This field is required" })),
  items: z.array(
    z.object({
      item: z.string().min(1, { message: "This field is required" }).nonempty(),
      description: z
        .string()
        .min(1, { message: "This field is required" })
        .nonempty(),
      quantity: z.number().min(1, { message: "This field is required" }),
      price: z
        .number()
        .min(1, { message: "This field is required" })
        .or(z.string().min(1, { message: "This field is required" })),
    })
  ),
})

// generate form types from zod validation schema
export type InvoiceFormTypes = z.infer<typeof invoiceFormSchema>

// invoice status options
export const statusOptions = [
  {
    value: "Draft",
    label: "Draft",
  },
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "Overdue",
    label: "Overdue",
  },
  {
    value: "Completed",
    label: "Completed",
  },
]

export function renderOptionDisplayValue(value: string) {
  switch (value.toLowerCase()) {
    case "pending":
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-orange-dark">
            {value}
          </Text>
        </div>
      )
    case "paid":
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-green-dark">
            {value}
          </Text>
        </div>
      )
    case "overdue":
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-red-dark">
            {value}
          </Text>
        </div>
      )
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium capitalize text-gray-600">
            {value}
          </Text>
        </div>
      )
  }
}

// form block wrapper
export function FormBlockWrapper({
  title,
  description,
  children,
  className,
}: React.PropsWithChildren<{
  title: string
  description?: string
  className?: string
}>) {
  return (
    <section className={cn("@5xl:grid @5xl:grid-cols-6", className)}>
      <header className="col-span-2 mb-6 @5xl:mb-0">
        <Title as="h5" className="font-semibold">
          {title}
        </Title>
        {description ? (
          <Text className="mt-1 text-sm text-gray-500">{description}</Text>
        ) : null}
      </header>
      <div className="col-span-4 grid grid-cols-2 gap-3 @lg:gap-4 @2xl:gap-5">
        {children}
      </div>
    </section>
  )
}

// status buttons

export function StatusButton({
  title,
  size,
}: React.PropsWithChildren<{
  title: "pending" | "approved" | "rejected"
  size?: "sm" | "lg" | "md"
}>) {
  return (
    <Text
      className={`inline rounded-2xl border-2 text-sm ${title == "rejected" ? "border-red-400 bg-red-100 text-red-400" : title == "approved" ? "border-green-500 bg-green-100 text-green-400" : "border-orange-400 bg-orange-100 text-orange-400"} px-2 py-1 ${size == "lg" ? "text-lg" : size == "md" ? "text-md" : "text-sm"}`}>
      {title}
    </Text>
  )
}
