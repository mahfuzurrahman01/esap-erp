"use client"

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui'
import { routes } from '@/config/routes'
import Link from 'next/link'
import CheckIcon from '@/components/icons/check'

export default function PaymentSuccess({ id }: { id: number }) {
  const t = useTranslations('common')

  return (
    <div className="flex min-h-[40vh] w-full flex-col items-center justify-center rounded-xl bg-background p-6 text-center shadow-sm">
      <div className="mb-4 rounded-full bg-primary/10 p-3">
        <CheckIcon className="h-12 w-12 text-primary" />
      </div>
      <h1 className="mb-2 text-2xl font-bold text-gray-900">
        {t('text-payment-successful')}
      </h1>
      <p className="mb-6 text-base text-gray-500">
        {t('text-payment-id')}: #{id}
      </p>
      <div className="flex gap-4">
        <Link href={routes.fms.viewPayment(id)}>
          <Button variant="outline">{t('text-view-payment-details')}</Button>
        </Link>
        <Link href={routes.fms.payments}>
          <Button>{t('text-back-to-payments')}</Button>
        </Link>
      </div>
    </div>
  )
}
