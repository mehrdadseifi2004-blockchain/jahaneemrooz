"use client"

import { useI18n } from "@i18n/components/i18n-provider"
import { isStripeLike, paymentInfoMap } from "@lib/constants"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type PaymentDetailsProps = {
  order: HttpTypes.StoreOrder
}

const PaymentDetails = ({ order }: PaymentDetailsProps) => {
  const { locale, dictionary } = useI18n()

  const payment = order.payment_collections?.[0]?.payments?.[0]

  if (!payment) {
    return (
      <div>
        <h2 className="text-xl font-bold text-[var(--theme-text)] small:text-2xl">
          {dictionary.order.payment.title}
        </h2>

        <div className="mt-6 rounded-[16px] border border-[var(--theme-border)] bg-[var(--theme-surface-muted)] p-5 text-sm text-[var(--theme-text-muted)]">
          {dictionary.order.payment.notAvailable}
        </div>
      </div>
    )
  }

  const paymentInfo = paymentInfoMap[payment.provider_id]
  const paymentDate = payment.created_at
    ? new Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : "en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(payment.created_at))
    : dictionary.order.payment.notProvided

  return (
    <div>
      <h2 className="text-xl font-bold text-[var(--theme-text)] small:text-2xl">
        {dictionary.order.payment.title}
      </h2>

      <div className="mt-6 grid gap-4 small:grid-cols-2">
        <div className="rounded-[16px] border border-[var(--theme-border)] bg-[var(--theme-surface-muted)] p-5">
          <p className="text-xs text-[var(--theme-text-subtle)]">
            {dictionary.order.payment.method}
          </p>

          <div className="mt-3 flex items-center gap-3">
            {paymentInfo?.icon && (
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#ff5a00]/25 bg-[#ff5a00]/10 text-[#ff7a1a]">
                {paymentInfo.icon}
              </span>
            )}

            <p
              className="font-bold text-[var(--theme-text)]"
              data-testid="payment-method"
            >
              {paymentInfo?.title ||
                payment.provider_id ||
                dictionary.order.payment.manual}
            </p>
          </div>
        </div>

        <div className="rounded-[16px] border border-[var(--theme-border)] bg-[var(--theme-surface-muted)] p-5">
          <p className="text-xs text-[var(--theme-text-subtle)]">
            {dictionary.order.payment.details}
          </p>

          <div
            className="mt-3 text-sm leading-7 text-[var(--theme-text-muted)]"
            data-testid="payment-amount"
          >
            {isStripeLike(payment.provider_id) && payment.data?.card_last4 ? (
              <p dir="ltr">**** **** **** {String(payment.data.card_last4)}</p>
            ) : (
              <>
                <p className="font-bold">
                  {convertToLocale({
                    amount: payment.amount,
                    currency_code: order.currency_code,
                  })}
                </p>

                <p className="text-xs text-[var(--theme-text-subtle)]">
                  {dictionary.order.payment.paidAt.replace(
                    "{date}",
                    paymentDate,
                  )}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentDetails
