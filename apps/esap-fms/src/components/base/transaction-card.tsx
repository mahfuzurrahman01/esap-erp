"use client"

import { cn } from "@/utils/cn"

export type TransactionType = {
  title: string
  amount: string
  className?: string
  amountColor?: string
}

export type TransactionCardProps = {
  className?: string
  transaction: TransactionType
  amountClassName?: string
}

export default function TransactionCard({
  className,
  transaction,
  amountClassName,
}: TransactionCardProps) {
  const { title, amount, amountColor } = transaction
  return (
    <div
      className={cn(
        "w-full rounded-[16px] border border-gray-500/20 px-6 py-7 @container @2xl:py-9",
        className
      )}>
      <div className="flex items-center gap-3 @sm:gap-5">
        <div className="space-y-4">
          <p className="text-sm font-semibold text-title">{title}</p>
          <p
            className={cn(
              "font-barlow text-2xl font-bold text-title @sm:text-[32px]",
              amountClassName
            )}
            style={{ color: amountColor }}>
            {amount}
          </p>
        </div>
      </div>
    </div>
  )
}
