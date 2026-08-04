"use client"

import { HttpTypes } from "@medusajs/types"
import { useSearchParams } from "next/navigation"

import { useI18n } from "@i18n/components/i18n-provider"
import { clx } from "@modules/common/components/ui"

import PaymentButton from "../payment-button"

const Review = ({ cart }: { cart: HttpTypes.StoreCart }) => {
  const { locale, dictionary } = useI18n()

  const numberLocale = locale === "fa" ? "fa-IR" : "en-US"

  const searchParams = useSearchParams()
  const isOpen = searchParams.get("step") === "review"

  const paidByGiftcard = Boolean(
    (
      cart as unknown as {
        gift_cards?: unknown[]
      }
    ).gift_cards?.length && cart.total === 0,
  )

  const previousStepsCompleted =
    Boolean(cart.shipping_address) &&
    Boolean(cart.shipping_methods?.length) &&
    Boolean(cart.payment_collection || paidByGiftcard)

  return (
    <section>
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <span
            className={clx(
              "flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold",
              isOpen
                ? "bg-[#ff5a00] text-white"
                : "bg-[#0c1219] text-slate-600",
            )}
          >
            {(4).toLocaleString(numberLocale)}
          </span>

          <h2
            className={clx(
              "text-xl font-bold small:text-2xl",
              isOpen ? "text-white" : "text-slate-600",
            )}
          >
            {dictionary.checkout.review.title}
          </h2>
        </div>

        <p className="ms-12 mt-2 text-sm leading-7 text-slate-500">
          {dictionary.checkout.review.description}
        </p>
      </div>

      {isOpen && previousStepsCompleted && (
        <div>
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
            <p className="font-bold text-emerald-400">
              {dictionary.checkout.review.ready}
            </p>

            <p className="mt-2 text-sm leading-7 text-emerald-300/80">
              {dictionary.checkout.review.confirmation}
            </p>
          </div>

          <div className="mt-6">
            <PaymentButton cart={cart} data-testid="submit-order-button" />
          </div>
        </div>
      )}

      {isOpen && !previousStepsCompleted && (
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-5">
          <p className="font-bold text-amber-400">
            {dictionary.checkout.review.incomplete}
          </p>

          <p className="mt-2 text-sm text-amber-300/80">
            {dictionary.checkout.review.incompleteHelp}
          </p>
        </div>
      )}
    </section>
  )
}

export default Review
