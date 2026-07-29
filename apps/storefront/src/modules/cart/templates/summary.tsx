"use client"

import { FormEvent, useState } from "react"
import { HttpTypes } from "@medusajs/types"

import { useI18n } from "@i18n/components/i18n-provider"
import { applyPromotions } from "@lib/data/cart"
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

const Summary = ({ cart }: SummaryProps) => {
  const { locale, dictionary } = useI18n()

  const step = getCheckoutStep(cart)
  const currencyCode = cart.currency_code || "IRR"

  const formatPrice = (amount: number | null | undefined) =>
    new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US", {
      style: "currency",
      currency: currencyCode.toUpperCase(),
      maximumFractionDigits: 0,
    }).format(amount || 0)

  const [promotionCode, setPromotionCode] = useState("")
  const [isApplying, setIsApplying] = useState(false)

  const [promotionMessage, setPromotionMessage] = useState<string | null>(null)

  const [promotionError, setPromotionError] = useState<string | null>(null)

  const handlePromotionSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const normalizedCode = promotionCode.trim()

    if (!normalizedCode || isApplying) {
      return
    }

    setIsApplying(true)
    setPromotionMessage(null)
    setPromotionError(null)

    await applyPromotions([normalizedCode])
      .then(() => {
        setPromotionMessage(dictionary.cart.summary.promotionSuccess)
        setPromotionCode("")
      })
      .catch((error) => {
        setPromotionError(
          error instanceof Error
            ? error.message
            : dictionary.cart.summary.promotionError,
        )
      })
      .finally(() => {
        setIsApplying(false)
      })
  }

  return (
    <div className="rounded-[20px] border border-black/10 bg-white p-5 small:px-6 small:py-6">
      <h2 className="text-xl font-bold text-black small:text-2xl">
        {dictionary.cart.summary.title}
      </h2>

      <div className="mt-6 space-y-5">
        <div className="flex items-center justify-between gap-4">
          <span className="text-black/60 small:text-xl">
            {dictionary.cart.summary.subtotal}
          </span>

          <span className="font-bold text-black small:text-xl">
            {formatPrice(cart.subtotal)}
          </span>
        </div>

        {(cart.discount_total || 0) > 0 && (
          <div className="flex items-center justify-between gap-4">
            <span className="text-black/60 small:text-xl">
              {dictionary.cart.summary.discount}
            </span>

            <span className="font-bold text-[#ff3333] small:text-xl">
              -{formatPrice(cart.discount_total)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between gap-4">
          <span className="text-black/60 small:text-xl">
            {dictionary.cart.summary.shipping}
          </span>

          <span className="text-end font-bold text-black small:text-xl">
            {cart.shipping_total
              ? formatPrice(cart.shipping_total)
              : dictionary.cart.summary.shippingLater}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-black/60 small:text-xl">
            {dictionary.cart.summary.tax}
          </span>

          <span className="font-bold text-black small:text-xl">
            {formatPrice(cart.tax_total)}
          </span>
        </div>

        <div className="h-px bg-black/10" />

        <div className="flex items-center justify-between gap-4">
          <span className="text-black small:text-xl">
            {dictionary.cart.summary.total}
          </span>

          <span
            className="text-xl font-bold text-black small:text-2xl"
            data-testid="cart-total"
          >
            {formatPrice(cart.total)}
          </span>
        </div>
      </div>

      <form onSubmit={handlePromotionSubmit} className="mt-6">
        <div className="flex gap-3">
          <label htmlFor="promotion-code" className="sr-only">
            {dictionary.cart.summary.promotionLabel}
          </label>

          <div className="relative min-w-0 flex-1">
            <span
              aria-hidden="true"
              className="absolute start-4 top-1/2 -translate-y-1/2 text-xl text-black/40"
            >
              %
            </span>

            <input
              id="promotion-code"
              name="promotionCode"
              type="text"
              value={promotionCode}
              onChange={(event) => setPromotionCode(event.target.value)}
              placeholder={dictionary.cart.summary.promotionPlaceholder}
              className="h-12 w-full rounded-full border-0 bg-[#f0f0f0] px-11 text-sm text-black outline-none placeholder:text-black/40 focus:ring-2 focus:ring-black/10"
            />
          </div>

          <button
            type="submit"
            disabled={!promotionCode.trim() || isApplying}
            className="h-12 shrink-0 rounded-full bg-black px-6 text-sm font-medium text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isApplying
              ? dictionary.cart.summary.promotionApplying
              : dictionary.cart.summary.promotionApply}
          </button>
        </div>

        {promotionMessage && (
          <p role="status" className="mt-3 text-sm text-emerald-600">
            {promotionMessage}
          </p>
        )}

        {promotionError && (
          <p role="alert" className="mt-3 text-sm leading-6 text-[#ff3333]">
            {promotionError}
          </p>
        )}
      </form>

      <LocalizedClientLink
        href={`/checkout?step=${step}`}
        data-testid="checkout-button"
        className="group mt-6 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-black px-5 text-sm font-medium text-white transition hover:bg-black/80 small:h-[60px] small:text-base"
      >
        <span>{dictionary.cart.summary.checkout}</span>

        <span
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
        >
          <span className="rtl:hidden">→</span>
          <span className="hidden rtl:inline">←</span>
        </span>
      </LocalizedClientLink>

      <LocalizedClientLink
        href="/store"
        className="mt-3 flex h-12 w-full items-center justify-center rounded-full border border-black/10 text-sm font-medium text-black transition hover:bg-black hover:text-white"
      >
        {dictionary.cart.summary.continueShopping}
      </LocalizedClientLink>

      <div className="mt-5 flex items-center justify-center gap-2 text-center text-xs leading-6 text-black/40">
        <span aria-hidden="true">🔒</span>

        <span>{dictionary.cart.summary.secureNotice}</span>
      </div>
    </div>
  )
}

export default Summary
