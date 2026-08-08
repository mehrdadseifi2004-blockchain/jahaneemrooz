"use client"

import { Radio, RadioGroup } from "@headlessui/react"
import { useI18n } from "@i18n/components/i18n-provider"
import { setShippingMethod } from "@lib/data/cart"
import { calculatePriceForShippingOption } from "@lib/data/fulfillment"
import { convertToLocale } from "@lib/util/money"
import { CheckCircleSolid, Loader } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import ErrorMessage from "@modules/checkout/components/error-message"
import MedusaRadio from "@modules/common/components/radio"
import { clx } from "@modules/common/components/ui"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const PICKUP_OPTION_ON = "__PICKUP_ON"
const PICKUP_OPTION_OFF = "__PICKUP_OFF"

type ShippingProps = {
  cart: HttpTypes.StoreCart
  availableShippingMethods: HttpTypes.StoreCartShippingOption[] | null
}

type ShippingOptionWithLocation = HttpTypes.StoreCartShippingOption & {
  service_zone?: {
    fulfillment_set?: {
      type?: string
      location?: {
        address?: HttpTypes.StoreCartAddress
      }
    }
  }
}

function formatAddress(
  address: HttpTypes.StoreCartAddress | undefined,
  separator: string,
) {
  if (!address) {
    return ""
  }

  return [
    address.address_1,
    address.address_2,
    address.city,
    address.province,
    address.postal_code,
  ]
    .filter(Boolean)
    .join(separator)
}

const Shipping = ({ cart, availableShippingMethods }: ShippingProps) => {
  const { locale, dictionary } = useI18n()
  const numberLocale = locale === "fa" ? "fa-IR" : "en-US"
  const addressSeparator = locale === "fa" ? "، " : ", "

  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingPrices, setIsLoadingPrices] = useState(true)
  const [showPickupOptions, setShowPickupOptions] = useState(PICKUP_OPTION_OFF)
  const [calculatedPricesMap, setCalculatedPricesMap] = useState<
    Record<string, number>
  >({})
  const [error, setError] = useState<string | null>(null)
  const [shippingMethodId, setShippingMethodId] = useState<string | null>(
    cart.shipping_methods?.at(-1)?.shipping_option_id || null,
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "delivery"

  const shippingMethods = availableShippingMethods?.filter(
    (method) =>
      (method as ShippingOptionWithLocation).service_zone?.fulfillment_set
        ?.type !== "pickup",
  )

  const pickupMethods = availableShippingMethods?.filter(
    (method) =>
      (method as ShippingOptionWithLocation).service_zone?.fulfillment_set
        ?.type === "pickup",
  )

  const hasPickupOptions = Boolean(pickupMethods?.length)

  useEffect(() => {
    setIsLoadingPrices(true)

    const calculatedMethods =
      shippingMethods?.filter((method) => method.price_type === "calculated") ||
      []

    if (!calculatedMethods.length) {
      setIsLoadingPrices(false)
      return
    }

    Promise.allSettled(
      calculatedMethods.map((method) =>
        calculatePriceForShippingOption(method.id, cart.id),
      ),
    ).then((results) => {
      const pricesMap: Record<string, number> = {}

      results.forEach((result) => {
        if (result.status !== "fulfilled") {
          return
        }

        const shippingOption = result.value

        if (shippingOption?.id) {
          pricesMap[shippingOption.id] = shippingOption.amount ?? 0
        }
      })

      setCalculatedPricesMap(pricesMap)
      setIsLoadingPrices(false)
    })

    if (pickupMethods?.some((method) => method.id === shippingMethodId)) {
      setShowPickupOptions(PICKUP_OPTION_ON)
    }
  }, [availableShippingMethods])

  useEffect(() => {
    setError(null)
  }, [isOpen])

  const handleEdit = () => {
    router.push(`${pathname}?step=delivery`, { scroll: false })
  }

  const handleSubmit = () => {
    router.push(`${pathname}?step=payment`, { scroll: false })
  }

  const handleSetShippingMethod = async (
    id: string,
    variant: "shipping" | "pickup",
  ) => {
    setError(null)
    setShowPickupOptions(
      variant === "pickup" ? PICKUP_OPTION_ON : PICKUP_OPTION_OFF,
    )

    const previousId = shippingMethodId

    setIsLoading(true)
    setShippingMethodId(id)

    await setShippingMethod({
      cartId: cart.id,
      shippingMethodId: id,
    })
      .catch((err) => {
        setShippingMethodId(previousId)
        setError(
          err instanceof Error
            ? err.message
            : dictionary.checkout.shipping.error,
        )
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const selectedMethod = cart.shipping_methods?.at(-1)

  return (
    <section>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span
              className={clx(
                "flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold",
                {
                  "bg-[var(--theme-accent)] text-[var(--theme-text)]": isOpen,
                  "bg-emerald-500/15 text-emerald-500":
                    !isOpen && Boolean(selectedMethod),
                  "bg-[var(--theme-surface-muted)] text-[var(--theme-text-subtle)]":
                    !isOpen && !selectedMethod,
                },
              )}
            >
              {!isOpen && selectedMethod ? (
                <CheckCircleSolid />
              ) : (
                (2).toLocaleString(numberLocale)
              )}
            </span>

            <h2
              className={clx(
                "text-xl font-bold small:text-2xl",
                selectedMethod || isOpen
                  ? "text-[var(--theme-text)]"
                  : "text-[var(--theme-text-subtle)]",
              )}
            >
              {dictionary.checkout.shipping.title}
            </h2>
          </div>

          <p className="ms-12 mt-2 text-sm leading-7 text-[var(--theme-text-muted)]">
            {dictionary.checkout.shipping.description}
          </p>
        </div>

        {!isOpen && selectedMethod && (
          <button
            type="button"
            onClick={handleEdit}
            className="shrink-0 text-sm font-semibold text-[var(--theme-accent)] hover:text-[var(--theme-accent-hover)]"
            data-testid="edit-delivery-button"
          >
            {dictionary.checkout.shipping.edit}
          </button>
        )}
      </div>

      {isOpen ? (
        <>
          <div className="space-y-3" data-testid="delivery-options-container">
            {hasPickupOptions && (
              <RadioGroup
                value={showPickupOptions}
                onChange={() => {
                  const method = pickupMethods?.find(
                    (option) => !option.insufficient_inventory,
                  )

                  if (method) {
                    handleSetShippingMethod(method.id, "pickup")
                  }
                }}
              >
                <Radio
                  value={PICKUP_OPTION_ON}
                  className={clx(
                    "flex cursor-pointer items-center justify-between rounded-2xl border p-5 transition",
                    showPickupOptions === PICKUP_OPTION_ON
                      ? "border-[var(--theme-accent)] bg-[color:rgba(255,90,0,0.1)] shadow-[0_10px_30px_rgba(255,90,0,0.08)]"
                      : "border-[var(--theme-border)] hover:border-[#ff5a00]/40",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <MedusaRadio
                      checked={showPickupOptions === PICKUP_OPTION_ON}
                    />

                    <div>
                      <p className="font-bold text-[var(--theme-text)]">
                        {dictionary.checkout.shipping.pickup}
                      </p>
                      <p className="mt-1 text-xs text-[var(--theme-text-muted)]">
                        {dictionary.checkout.shipping.pickupDescription}
                      </p>
                    </div>
                  </div>

                  <span className="text-sm font-semibold text-emerald-600">
                    {dictionary.checkout.shipping.free}
                  </span>
                </Radio>
              </RadioGroup>
            )}

            <RadioGroup
              value={shippingMethodId}
              onChange={(value) => {
                if (value) {
                  handleSetShippingMethod(value, "shipping")
                }
              }}
            >
              <div className="space-y-3">
                {shippingMethods?.map((option) => {
                  const calculatedPrice = calculatedPricesMap[option.id]

                  const isDisabled =
                    option.price_type === "calculated" &&
                    !isLoadingPrices &&
                    typeof calculatedPrice !== "number"

                  return (
                    <Radio
                      key={option.id}
                      value={option.id}
                      disabled={isDisabled}
                      data-testid="delivery-option-radio"
                      className={clx(
                        "flex items-center justify-between rounded-2xl border p-5 transition",
                        isDisabled
                          ? "cursor-not-allowed border-[var(--theme-border)] bg-[var(--theme-surface-muted)] opacity-40"
                          : "cursor-pointer hover:border-[#ff5a00]/50",
                        option.id === shippingMethodId
                          ? "border-[var(--theme-accent)] bg-[color:rgba(255,90,0,0.1)] shadow-[0_10px_30px_rgba(255,90,0,0.08)]"
                          : "border-[var(--theme-border)] bg-[var(--theme-surface-muted)]",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <MedusaRadio checked={option.id === shippingMethodId} />

                        <div>
                          <p className="font-bold text-[var(--theme-text)]">
                            {option.name}
                          </p>
                          <p className="mt-1 text-xs text-[var(--theme-text-muted)]">
                            {dictionary.checkout.shipping.deliveryDescription}
                          </p>
                        </div>
                      </div>

                      <span className="text-sm font-bold text-[#ff7a1a]">
                        {option.price_type === "flat" ? (
                          convertToLocale({
                            amount: option.amount || 0,
                            currency_code: cart.currency_code,
                          })
                        ) : typeof calculatedPrice === "number" ? (
                          convertToLocale({
                            amount: calculatedPrice,
                            currency_code: cart.currency_code,
                          })
                        ) : isLoadingPrices ? (
                          <Loader />
                        ) : (
                          dictionary.checkout.shipping.unknown
                        )}
                      </span>
                    </Radio>
                  )
                })}
              </div>
            </RadioGroup>
          </div>

          {showPickupOptions === PICKUP_OPTION_ON && (
            <div className="mt-6">
              <h3 className="mb-3 font-bold text-[var(--theme-text)]">
                {dictionary.checkout.shipping.selectLocation}
              </h3>

              <RadioGroup
                value={shippingMethodId}
                onChange={(value) => {
                  if (value) {
                    handleSetShippingMethod(value, "pickup")
                  }
                }}
              >
                <div className="space-y-3">
                  {pickupMethods?.map((option) => {
                    const address = (option as ShippingOptionWithLocation)
                      .service_zone?.fulfillment_set?.location?.address

                    return (
                      <Radio
                        key={option.id}
                        value={option.id}
                        disabled={option.insufficient_inventory}
                        className={clx(
                          "flex items-center justify-between rounded-2xl border p-5 transition",
                          option.insufficient_inventory
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer hover:border-[#ff5a00]/50",
                          option.id === shippingMethodId
                            ? "border-[var(--theme-accent)] bg-[color:rgba(255,90,0,0.1)] shadow-[0_10px_30px_rgba(255,90,0,0.08)]"
                            : "border-[var(--theme-border)] bg-[var(--theme-surface-muted)]",
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <MedusaRadio
                            checked={option.id === shippingMethodId}
                          />

                          <div>
                            <p className="font-bold text-[var(--theme-text)]">
                              {option.name}
                            </p>

                            <p className="mt-1 text-xs leading-6 text-[var(--theme-text-muted)]">
                              {formatAddress(address, addressSeparator)}
                            </p>
                          </div>
                        </div>

                        <span className="text-sm font-semibold text-[#ff7a1a]">
                          {convertToLocale({
                            amount: option.amount || 0,
                            currency_code: cart.currency_code,
                          })}
                        </span>
                      </Radio>
                    )
                  })}
                </div>
              </RadioGroup>
            </div>
          )}

          <ErrorMessage
            error={error}
            data-testid="delivery-option-error-message"
          />

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!cart.shipping_methods?.[0] || isLoading}
            className="mt-7 flex h-12 w-full items-center justify-center rounded-full border-0 bg-[var(--theme-accent)] px-7 text-base font-bold text-[var(--theme-text)] shadow-[0_12px_35px_rgba(255,90,0,0.2)] transition hover:bg-[var(--theme-accent-hover)] disabled:cursor-not-allowed disabled:bg-[var(--theme-accent)]/30 small:w-auto"
            data-testid="submit-delivery-option-button"
          >
            {isLoading
              ? dictionary.checkout.shipping.submitting
              : dictionary.checkout.shipping.submit}
          </button>
        </>
      ) : (
        selectedMethod && (
          <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-muted)] p-5">
            <p className="text-xs text-[var(--theme-text-muted)]">
              {dictionary.checkout.shipping.selected}
            </p>

            <div className="mt-2 flex items-center justify-between gap-4">
              <p className="font-bold text-[var(--theme-text)]">
                {selectedMethod.name}
              </p>

              <p className="text-sm font-semibold text-[#ff7a1a]">
                {convertToLocale({
                  amount: selectedMethod.amount || 0,
                  currency_code: cart.currency_code,
                })}
              </p>
            </div>
          </div>
        )
      )}
    </section>
  )
}

export default Shipping
