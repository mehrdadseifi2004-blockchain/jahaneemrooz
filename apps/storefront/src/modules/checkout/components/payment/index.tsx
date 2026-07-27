"use client"

import { RadioGroup } from "@headlessui/react"
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
        err instanceof Error ? err.message : "راه‌اندازی روش پرداخت انجام نشد.",
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section dir="rtl">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span
              className={clx(
                "flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold",
                {
                  "bg-black text-white": isOpen,
                  "bg-emerald-50 text-emerald-600": !isOpen && paymentReady,
                  "bg-[#f0f0f0] text-black/35": !isOpen && !paymentReady,
                },
              )}
            >
              {!isOpen && paymentReady ? <CheckCircleSolid /> : "۳"}
            </span>

            <h2
              className={clx(
                "text-xl font-bold small:text-2xl",
                isOpen || paymentReady ? "text-black" : "text-black/40",
              )}
            >
              روش پرداخت
            </h2>
          </div>

          <p className="mr-12 mt-2 text-sm leading-7 text-black/50">
            شیوه پرداخت سفارش را انتخاب کنید.
          </p>
        </div>

        {!isOpen && paymentReady && (
          <button
            type="button"
            onClick={handleEdit}
            className="text-sm font-semibold text-black hover:text-black/70"
            data-testid="edit-payment-button"
          >
            تغییر روش پرداخت
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
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <p className="font-bold text-emerald-700">
                پرداخت با اعتبار گیفت کارت
              </p>
            </div>
          )}

          {!availablePaymentMethods?.length && !paidByGiftcard && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <p className="font-bold text-amber-700">
                روش پرداخت فعالی برای این منطقه تعریف نشده است.
              </p>

              <p className="mt-2 text-sm leading-6 text-amber-600">
                ابتدا باید یک Payment Provider در تنظیمات Medusa فعال شود.
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
            className="mt-7 flex h-12 w-full items-center justify-center rounded-full bg-black px-7 text-base font-bold text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:bg-black/20 small:w-auto"
            data-testid="submit-payment-button"
          >
            {isLoading
              ? "در حال ثبت..."
              : isStripeLike(selectedPaymentMethod) && !activeSession
                ? "ثبت اطلاعات کارت"
                : "ثبت روش پرداخت و مرور سفارش"}
          </button>
        </div>
      ) : (
        paymentReady &&
        (activeSession || paidByGiftcard) && (
          <div className="rounded-2xl border border-black/10 bg-[#f0f0f0] p-5">
            <p className="text-xs text-black/40">روش پرداخت انتخاب‌شده</p>

            <div className="mt-3 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black/70">
                {activeSession &&
                paymentInfoMap[activeSession.provider_id]?.icon ? (
                  paymentInfoMap[activeSession.provider_id].icon
                ) : (
                  <CreditCard />
                )}
              </span>

              <div>
                <p className="font-bold text-black">
                  {paidByGiftcard
                    ? "گیفت کارت"
                    : paymentInfoMap[activeSession?.provider_id || ""]?.title ||
                      activeSession?.provider_id ||
                      "درگاه پرداخت"}
                </p>

                <p className="mt-1 text-xs text-black/50">
                  {isStripeLike(selectedPaymentMethod) && cardBrand
                    ? cardBrand
                    : "جزئیات پرداخت در مرحله بعد تکمیل می‌شود."}
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
