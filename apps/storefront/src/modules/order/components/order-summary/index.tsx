"use client"

import { HttpTypes } from "@medusajs/types"

import { useI18n } from "@i18n/components/i18n-provider"

type OrderSummaryProps = {
  order: HttpTypes.StoreOrder
}

const OrderSummary = ({ order }: OrderSummaryProps) => {
  const { locale, dictionary } = useI18n()

  const getAmount = (amount?: number | null) =>
    new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US", {
      style: "currency",
      currency: order.currency_code.toUpperCase(),
      maximumFractionDigits: 0,
    }).format(amount ?? 0)

  return (
    <div>
      <h2 className="text-xl font-bold text-white small:text-2xl">
        {dictionary.order.summary.title}
      </h2>

      <div className="mt-6 space-y-5">
        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-400">
            {dictionary.order.summary.subtotal}
          </span>

          <span className="font-bold text-white">
            {getAmount(order.subtotal)}
          </span>
        </div>

        {order.discount_total > 0 && (
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">
              {dictionary.order.summary.discount}
            </span>

            <span className="font-bold text-rose-400">
              -{getAmount(order.discount_total)}
            </span>
          </div>
        )}

        {order.gift_card_total > 0 && (
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">
              {dictionary.order.summary.giftCard}
            </span>

            <span className="font-bold text-rose-400">
              -{getAmount(order.gift_card_total)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-400">
            {dictionary.order.summary.shipping}
          </span>

          <span className="font-bold text-white">
            {getAmount(order.shipping_total)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-400">{dictionary.order.summary.tax}</span>

          <span className="font-bold text-white">
            {getAmount(order.tax_total)}
          </span>
        </div>

        <div className="h-px bg-white/10" />

        <div className="flex items-center justify-between gap-4">
          <span className="text-lg font-bold text-white">
            {dictionary.order.summary.total}
          </span>

          <span
            className="text-xl font-black text-[#ff5a00] small:text-2xl"
            data-testid="order-total"
          >
            {getAmount(order.total)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
