"use client"

import { HttpTypes } from "@medusajs/types"

import { useI18n } from "@i18n/components/i18n-provider"
import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const CheckoutSummary = ({ cart }: { cart: HttpTypes.StoreCart }) => {
  const { locale, dictionary } = useI18n()

  const currencyCode = cart.currency_code || "IRR"

  const itemCount =
    cart.items?.reduce((total, item) => total + item.quantity, 0) || 0

  const numberLocale = locale === "fa" ? "fa-IR" : "en-US"

  const formatPrice = (amount: number | null | undefined) =>
    new Intl.NumberFormat(numberLocale, {
      style: "currency",
      currency: currencyCode.toUpperCase(),
      maximumFractionDigits: 0,
    }).format(amount || 0)

  const itemCountText = dictionary.checkout.summary.itemCount.replace(
    "{count}",
    itemCount.toLocaleString(numberLocale),
  )

  return (
    <div className="rounded-[24px] border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 shadow-[0_22px_70px_var(--theme-shadow)] transition-colors duration-300 small:p-6">
      <div className="flex items-start justify-between gap-4 border-b border-[var(--theme-border)] pb-5">
        <div>
          <h2 className="text-xl font-bold text-[var(--theme-text)] small:text-2xl">
            {dictionary.checkout.summary.title}
          </h2>

          <p className="mt-2 text-sm text-[var(--theme-text-subtle)]">
            {itemCountText}
          </p>
        </div>

        <LocalizedClientLink
          href="/cart"
          className="text-sm font-bold text-[var(--theme-text-muted)] underline underline-offset-4 transition hover:text-[#ff7a1a]"
        >
          {dictionary.checkout.summary.edit}
        </LocalizedClientLink>
      </div>

      <div className="max-h-[330px] overflow-y-auto border-b border-[var(--theme-border)] py-3">
        <ItemsPreviewTemplate cart={cart} />
      </div>

      <div className="space-y-5 py-6">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[var(--theme-text-muted)]">
            {dictionary.checkout.summary.subtotal}
          </span>

          <span className="font-bold text-[var(--theme-text)]">
            {formatPrice(cart.subtotal)}
          </span>
        </div>

        {(cart.discount_total || 0) > 0 && (
          <div className="flex items-center justify-between gap-4">
            <span className="text-[var(--theme-text-muted)]">
              {dictionary.checkout.summary.discount}
            </span>

            <span className="font-bold text-[#ff3333]">
              -{formatPrice(cart.discount_total)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between gap-4">
          <span className="text-[var(--theme-text-muted)]">
            {dictionary.checkout.summary.shipping}
          </span>

          <span className="text-end font-bold text-[var(--theme-text)]">
            {cart.shipping_total
              ? formatPrice(cart.shipping_total)
              : dictionary.checkout.summary.shippingNotSelected}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-[var(--theme-text-muted)]">
            {dictionary.checkout.summary.tax}
          </span>

          <span className="font-bold text-[var(--theme-text)]">
            {formatPrice(cart.tax_total)}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-[var(--theme-border)] pt-6">
        <span className="text-lg font-bold text-[var(--theme-text)]">
          {dictionary.checkout.summary.total}
        </span>

        <span
          className="text-xl font-bold text-[var(--theme-text)] small:text-2xl"
          data-testid="checkout-summary-total"
        >
          {formatPrice(cart.total)}
        </span>
      </div>

      <div className="mt-6 rounded-[16px] border border-emerald-500/20 bg-emerald-500/10 p-4">
        <div className="flex items-start gap-3">
          <span aria-hidden="true">🔒</span>

          <p className="text-xs leading-6 text-emerald-700 dark:text-emerald-300/80">
            {dictionary.checkout.summary.secureNotice}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
