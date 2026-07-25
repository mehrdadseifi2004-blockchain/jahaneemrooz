"use client"

import { HttpTypes } from "@medusajs/types"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

type SummaryProps = {
  cart: HttpTypes.StoreCart
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart.shipping_address?.address_1 || !cart.email) {
    return "address"
  }

  if (cart.shipping_methods?.length === 0) {
    return "delivery"
  }

  return "payment"
}

const formatPrice = (
  amount: number | null | undefined,
  currencyCode: string
) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode.toUpperCase(),
    maximumFractionDigits: 0,
  }).format(amount || 0)
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)
  const currencyCode = cart.currency_code || "IRR"

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="border-b border-slate-100 pb-5">
        <h2 className="text-xl font-bold text-slate-950">
          خلاصه سفارش
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          جزئیات مبلغ سفارش خود را بررسی کنید.
        </p>
      </div>

      <div className="space-y-4 py-6 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-slate-500">
            جمع قیمت کالاها
          </span>

          <span className="font-semibold text-slate-800">
            {formatPrice(cart.subtotal, currencyCode)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-500">
            هزینه ارسال
          </span>

          <span className="font-semibold text-slate-800">
            {cart.shipping_total
              ? formatPrice(cart.shipping_total, currencyCode)
              : "در مرحله بعد محاسبه می‌شود"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-500">
            مالیات
          </span>

          <span className="font-semibold text-slate-800">
            {formatPrice(cart.tax_total, currencyCode)}
          </span>
        </div>

        {(cart.discount_total || 0) > 0 && (
          <div className="flex items-center justify-between text-emerald-600">
            <span>
              تخفیف
            </span>

            <span className="font-semibold">
              -{formatPrice(cart.discount_total, currencyCode)}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-end justify-between border-t border-slate-100 py-6">
        <div>
          <p className="text-sm text-slate-500">
            مبلغ قابل پرداخت
          </p>

          <p className="mt-2 text-xs text-slate-400">
            شامل مالیات و هزینه‌های محاسبه‌شده
          </p>
        </div>

        <span className="text-xl font-bold text-slate-950">
          {formatPrice(cart.total, currencyCode)}
        </span>
      </div>

      <LocalizedClientLink
        href={`/checkout?step=${step}`}
        data-testid="checkout-button"
        className="flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-5 text-base font-bold text-white transition hover:bg-blue-500"
      >
        ادامه فرایند خرید
      </LocalizedClientLink>

      <LocalizedClientLink
        href="/store"
        className="mt-3 flex h-11 w-full items-center justify-center rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
      >
        ادامه خرید از فروشگاه
      </LocalizedClientLink>

      <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">
        <span>🔒</span>
        <span>پرداخت و اطلاعات شما با امنیت کامل پردازش می‌شود.</span>
      </div>
    </div>
  )
}

export default Summary