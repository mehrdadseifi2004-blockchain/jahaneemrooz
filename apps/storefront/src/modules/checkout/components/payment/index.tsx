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
                "flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-colors duration-300",
                {
                  "bg-[var(--theme-accent)] text-[var(--theme-text)]": isOpen,
                  "bg-emerald-500/15 text-emerald-500": !isOpen && paymentReady,
                  "bg-[var(--theme-surface-muted)] text-[var(--theme-text-subtle)]":
                    !isOpen && !paymentReady,
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
                "text-xl font-bold transition-colors duration-300 small:text-2xl",
                isOpen || paymentReady
                  ? "text-[var(--theme-text)]"
                  : "text-[var(--theme-text-subtle)]",
              )}
            >
              {dictionary.checkout.payment.title}
            </h2>
          </div>

          <p className="ms-12 mt-2 text-sm leading-7 text-[var(--theme-text-subtle)]">
            {dictionary.checkout.payment.description}
          </p>
        </div>

        {!isOpen && paymentReady && (
          <button
            type="button"
            onClick={handleEdit}
            className="text-sm font-semibold text-[#ff7a1a] transition hover:text-[#ff5a00]"
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
                      "overflow-hidden rounded-2xl border p-1 transition-colors duration-300",
                      selectedPaymentMethod === method.id
                        ? "border-[var(--theme-accent)] bg-[var(--theme-accent)]/5"
                        : "border-[var(--theme-border)] bg-[var(--theme-surface-muted)]",
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
              <p className="font-bold text-emerald-500">
                {dictionary.checkout.payment.giftCardPayment}
              </p>
            </div>
          )}

          {!availablePaymentMethods?.length && !paidByGiftcard && (
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-5">
              <p className="font-bold text-amber-500">
                {dictionary.checkout.payment.noMethod}
              </p>

              <p className="mt-2 text-sm leading-6 text-amber-600 dark:text-amber-300/80">
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
            className="mt-7 flex h-12 w-full items-center justify-center rounded-full border-0 bg-[var(--theme-accent)] px-7 text-base font-bold text-[var(--theme-text)] shadow-[0_12px_35px_rgba(255,90,0,0.2)] transition hover:bg-[var(--theme-accent-hover)] disabled:cursor-not-allowed disabled:bg-[var(--theme-accent)]/30 small:w-auto"
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
          <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-muted)] p-5 transition-colors duration-300">
            <p className="text-xs text-[var(--theme-text-subtle)]">
              {dictionary.checkout.payment.selected}
            </p>

            <div className="mt-3 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--theme-accent)]/25 bg-[var(--theme-accent)]/10 text-[var(--theme-accent-hover)]">
                {activeSession &&
                paymentInfoMap[activeSession.provider_id]?.icon ? (
                  paymentInfoMap[activeSession.provider_id].icon
                ) : (
                  <CreditCard />
                )}
              </span>

              <div>
                <p className="font-bold text-[var(--theme-text)]">
                  {paidByGiftcard
                    ? dictionary.checkout.payment.giftCard
                    : paymentInfoMap[activeSession?.provider_id || ""]?.title ||
                      activeSession?.provider_id ||
                      dictionary.checkout.payment.gateway}
                </p>

                <p className="mt-1 text-xs text-[var(--theme-text-subtle)]">
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
