"use client"

import { RadioGroup } from "@headlessui/react"
import { useI18n } from "@i18n/components/i18n-provider"
import { isStripeLike, paymentInfoMap } from "@lib/constants"
import { initiatePaymentSession } from "@lib/data/cart"
import { CheckCircleSolid, CreditCard } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import ErrorMessage from "@modules/checkout/components/error-message"
import PaymentContainer, {
  StripeCardContainer,
} from "@modules/checkout/components/payment-container"
import { clx } from "@modules/common/components/ui"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

const Payment = ({
  cart,
  availablePaymentMethods,
}: {
  cart: HttpTypes.StoreCart
  availablePaymentMethods: { id: string }[]
}) => {
  const { locale, dictionary } = useI18n()
  const numberLocale = locale === "fa" ? "fa-IR" : "en-US"

  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (session) => session.status === "pending",
  )

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cardBrand, setCardBrand] = useState<string | null>(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    activeSession?.provider_id || "",
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "payment"

  const paidByGiftcard = Boolean(
    (cart as unknown as { gift_cards?: unknown[] }).gift_cards?.length &&
    cart.total === 0,
  )

  const paymentReady =
    Boolean(activeSession && cart.shipping_methods?.length) || paidByGiftcard

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams],
  )

  useEffect(() => {
    setError(null)
  }, [isOpen])

  const setPaymentMethod = async (method: string) => {
    setError(null)
    setSelectedPaymentMethod(method)

    if (isStripeLike(method)) {
      await initiatePaymentSession(cart, {
        provider_id: method,
      })
    }
  }

  const handleEdit = () => {
    router.push(`${pathname}?${createQueryString("step", "payment")}`, {
      scroll: false,
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      const shouldInputCard =
        isStripeLike(selectedPaymentMethod) && !activeSession

      const isCurrentSession =
        activeSession?.provider_id === selectedPaymentMethod

      if (!isCurrentSession) {
        await initiatePaymentSession(cart, {
          provider_id: selectedPaymentMethod,
        })
      }

      if (!shouldInputCard) {
        router.push(`${pathname}?${createQueryString("step", "review")}`, {
          scroll: false,
        })
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : dictionary.checkout.payment.initError,
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span
              className={clx(
                "flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold",
                {
                  "bg-black text-white": isOpen,
                  "bg-emerald-50 text-emerald-600": !isOpen && paymentReady,
                  "bg-[#0c1219] text-slate-600": !isOpen && !paymentReady,
                },
              )}
            >
              {!isOpen && paymentReady ? (
                <CheckCircleSolid />
              ) : (
                (3).toLocaleString(numberLocale)
              )}
            </span>

            <h2
              className={clx(
                "text-xl font-bold small:text-2xl",
                isOpen || paymentReady ? "text-black" : "text-black/40",
              )}
            >
              {dictionary.checkout.payment.title}
            </h2>
          </div>

          <p className="ms-12 mt-2 text-sm leading-7 text-slate-500">
            {dictionary.checkout.payment.description}
          </p>
        </div>

        {!isOpen && paymentReady && (
          <button
            type="button"
            onClick={handleEdit}
            className="text-sm font-semibold text-black hover:text-black/70"
            data-testid="edit-payment-button"
          >
            {dictionary.checkout.payment.edit}
          </button>
        )}
      </div>

      {isOpen ? (
        <div>
          {!paidByGiftcard && availablePaymentMethods?.length > 0 && (
            <RadioGroup
              value={selectedPaymentMethod}
              onChange={setPaymentMethod}
            >
              <div className="space-y-3">
                {availablePaymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={clx(
                      "overflow-hidden rounded-2xl border p-1 transition",
                      selectedPaymentMethod === method.id
                        ? "border-black bg-[#f0f0f0]"
                        : "border-black/10",
                    )}
                  >
                    {isStripeLike(method.id) ? (
                      <StripeCardContainer
                        paymentProviderId={method.id}
                        selectedPaymentOptionId={selectedPaymentMethod}
                        paymentInfoMap={paymentInfoMap}
                        setCardBrand={setCardBrand}
                        setError={setError}
                        setCardComplete={setCardComplete}
                      />
                    ) : (
                      <PaymentContainer
                        paymentInfoMap={paymentInfoMap}
                        paymentProviderId={method.id}
                        selectedPaymentOptionId={selectedPaymentMethod}
                      />
                    )}
                  </div>
                ))}
              </div>
            </RadioGroup>
          )}

          {paidByGiftcard && (
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
              <p className="font-bold text-emerald-400">
                {dictionary.checkout.payment.giftCardPayment}
              </p>
            </div>
          )}

          {!availablePaymentMethods?.length && !paidByGiftcard && (
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-5">
              <p className="font-bold text-amber-400">
                {dictionary.checkout.payment.noMethod}
              </p>

              <p className="mt-2 text-sm leading-6 text-amber-300/80">
                {dictionary.checkout.payment.noMethodHelp}
              </p>
            </div>
          )}

          <ErrorMessage
            error={error}
            data-testid="payment-method-error-message"
          />

          <button
            type="button"
            onClick={handleSubmit}
            disabled={
              (isStripeLike(selectedPaymentMethod) && !cardComplete) ||
              (!selectedPaymentMethod && !paidByGiftcard) ||
              isLoading
            }
            className="mt-7 flex h-12 w-full items-center justify-center rounded-full border-0 bg-[#ff5a00] px-7 text-base font-bold text-white shadow-[0_12px_35px_rgba(255,90,0,0.2)] transition hover:bg-[#ff7a1a] disabled:cursor-not-allowed disabled:bg-[#ff5a00]/30 small:w-auto"
            data-testid="submit-payment-button"
          >
            {isLoading
              ? dictionary.checkout.payment.submitting
              : isStripeLike(selectedPaymentMethod) && !activeSession
                ? dictionary.checkout.payment.saveCard
                : dictionary.checkout.payment.saveAndReview}
          </button>
        </div>
      ) : (
        paymentReady &&
        (activeSession || paidByGiftcard) && (
          <div className="rounded-2xl border border-white/10 bg-[#0c1219] p-5">
            <p className="text-xs text-slate-500">
              {dictionary.checkout.payment.selected}
            </p>

            <div className="mt-3 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#ff5a00]/25 bg-[#ff5a00]/10 text-[#ff7a1a]">
                {activeSession &&
                paymentInfoMap[activeSession.provider_id]?.icon ? (
                  paymentInfoMap[activeSession.provider_id].icon
                ) : (
                  <CreditCard />
                )}
              </span>

              <div>
                <p className="font-bold text-white">
                  {paidByGiftcard
                    ? dictionary.checkout.payment.giftCard
                    : paymentInfoMap[activeSession?.provider_id || ""]?.title ||
                      activeSession?.provider_id ||
                      dictionary.checkout.payment.gateway}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {isStripeLike(selectedPaymentMethod) && cardBrand
                    ? cardBrand
                    : dictionary.checkout.payment.detailsLater}
                </p>
              </div>
            </div>
          </div>
        )
      )}
    </section>
  )
}

export default Payment
