"use client"

import { useI18n } from "@i18n/components/i18n-provider"
import { isManual, isStripeLike } from "@lib/constants"
import { placeOrder } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@modules/common/components/ui"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import { useState } from "react"

import ErrorMessage from "../error-message"

type PaymentButtonProps = {
  cart: HttpTypes.StoreCart
  "data-testid": string
}

const PaymentButton = ({
  cart,
  "data-testid": dataTestId,
}: PaymentButtonProps) => {
  const { dictionary } = useI18n()

  const notReady =
    !cart ||
    !cart.shipping_address ||
    !cart.billing_address ||
    !cart.email ||
    (cart.shipping_methods?.length || 0) < 1

  const paymentSession = cart.payment_collection?.payment_sessions?.[0]

  if (isStripeLike(paymentSession?.provider_id)) {
    return (
      <StripePaymentButton
        notReady={notReady}
        cart={cart}
        data-testid={dataTestId}
      />
    )
  }

  if (isManual(paymentSession?.provider_id)) {
    return <ManualPaymentButton notReady={notReady} data-testid={dataTestId} />
  }

  return (
    <Button
      disabled
      className="h-14 w-full rounded-full !border-0 !bg-[var(--theme-accent)]/30 !text-[var(--theme-text)] transition"
    >
      {dictionary.checkout.paymentButton.selectMethod}
    </Button>
  )
}

const StripePaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
  "data-testid"?: string
}) => {
  const { dictionary } = useI18n()

  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const stripe = useStripe()
  const elements = useElements()
  const card = elements?.getElement("card")

  const session = cart.payment_collection?.payment_sessions?.find(
    (paymentSession) => paymentSession.status === "pending",
  )

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => {
        setErrorMessage(
          err instanceof Error
            ? err.message
            : dictionary.checkout.paymentButton.orderError,
        )
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const handlePayment = async () => {
    setSubmitting(true)
    setErrorMessage(null)

    if (!stripe || !elements || !card || !cart) {
      setSubmitting(false)
      return
    }

    await stripe
      .confirmCardPayment(session?.data.client_secret as string, {
        payment_method: {
          card,
          billing_details: {
            name: `${cart.billing_address?.first_name || ""} ${
              cart.billing_address?.last_name || ""
            }`.trim(),
            address: {
              city: cart.billing_address?.city || undefined,
              country: cart.billing_address?.country_code || undefined,
              line1: cart.billing_address?.address_1 || undefined,
              line2: cart.billing_address?.address_2 || undefined,
              postal_code: cart.billing_address?.postal_code || undefined,
              state: cart.billing_address?.province || undefined,
            },
            email: cart.email,
            phone: cart.billing_address?.phone || undefined,
          },
        },
      })
      .then(({ error, paymentIntent }) => {
        if (error) {
          const intent = error.payment_intent

          if (
            intent?.status === "requires_capture" ||
            intent?.status === "succeeded"
          ) {
            return onPaymentCompleted()
          }

          setErrorMessage(
            error.message || dictionary.checkout.paymentButton.paymentError,
          )
          setSubmitting(false)
          return
        }

        if (
          paymentIntent?.status === "requires_capture" ||
          paymentIntent?.status === "succeeded"
        ) {
          return onPaymentCompleted()
        }

        setSubmitting(false)
      })
  }

  return (
    <>
      <Button
        disabled={!stripe || !elements || notReady}
        onClick={handlePayment}
        size="large"
        isLoading={submitting}
        className="h-14 w-full rounded-full !border-0 !bg-[var(--theme-accent)] text-base font-bold !text-[var(--theme-text)] shadow-[0_14px_40px_rgba(255,90,0,0.22)] transition hover:!bg-[var(--theme-accent-hover)] disabled:!bg-[var(--theme-accent)]/30 disabled:opacity-60"
        data-testid={dataTestId}
      >
        {dictionary.checkout.paymentButton.payAndPlace}
      </Button>

      <ErrorMessage
        error={errorMessage}
        data-testid="stripe-payment-error-message"
      />
    </>
  )
}

const ManualPaymentButton = ({
  notReady,
  "data-testid": dataTestId,
}: {
  notReady: boolean
  "data-testid"?: string
}) => {
  const { dictionary } = useI18n()

  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handlePayment = async () => {
    setSubmitting(true)
    setErrorMessage(null)

    await placeOrder()
      .catch((err) => {
        setErrorMessage(
          err instanceof Error
            ? err.message
            : dictionary.checkout.paymentButton.orderError,
        )
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <>
      <Button
        disabled={notReady}
        isLoading={submitting}
        onClick={handlePayment}
        size="large"
        className="h-14 w-full rounded-full !border-0 !bg-[var(--theme-accent)] text-base font-bold !text-[var(--theme-text)] shadow-[0_14px_40px_rgba(255,90,0,0.22)] transition hover:!bg-[var(--theme-accent-hover)] disabled:!bg-[var(--theme-accent)]/30 disabled:opacity-60"
        data-testid={dataTestId}
      >
        {dictionary.checkout.paymentButton.placeOrder}
      </Button>

      <ErrorMessage
        error={errorMessage}
        data-testid="manual-payment-error-message"
      />
    </>
  )
}

export default PaymentButton
