"use client"

import { HttpTypes } from "@medusajs/types"

import { useI18n } from "@i18n/components/i18n-provider"

type ShippingDetailsProps = {
  order: HttpTypes.StoreOrder
}

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
  const { locale, dictionary } = useI18n()

  const address = order.shipping_address
  const shippingMethod = order.shipping_methods?.[0]

  const separator = locale === "fa" ? "، " : ", "

  const formatAmount = (amount?: number | null) =>
    new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US", {
      style: "currency",
      currency: order.currency_code.toUpperCase(),
      maximumFractionDigits: 0,
    }).format(amount ?? 0)

  const notProvided = dictionary.order.shipping.notProvided

  return (
    <div>
      <h2 className="text-xl font-bold text-black small:text-2xl">
        {dictionary.order.shipping.title}
      </h2>

      <div className="mt-6 grid gap-4 medium:grid-cols-3">
        <div
          className="rounded-[16px] bg-[#f0f0f0] p-5"
          data-testid="shipping-address-summary"
        >
          <p className="text-sm font-bold text-black">
            {dictionary.order.shipping.address}
          </p>

          <div className="mt-3 text-sm leading-7 text-black/60">
            <p>
              {address?.first_name} {address?.last_name}
            </p>

            <p>
              {address?.address_1}
              {address?.address_2 ? `${separator}${address.address_2}` : ""}
            </p>

            <p>
              {address?.province ? `${address.province}${separator}` : ""}
              {address?.city}
            </p>

            <p>
              {dictionary.order.shipping.postalCode}{" "}
              {address?.postal_code || notProvided}
            </p>

            <p>
              {dictionary.order.shipping.country}{" "}
              {address?.country_code?.toUpperCase() || notProvided}
            </p>
          </div>
        </div>

        <div
          className="rounded-[16px] bg-[#f0f0f0] p-5"
          data-testid="shipping-contact-summary"
        >
          <p className="text-sm font-bold text-black">
            {dictionary.order.shipping.contact}
          </p>

          <div className="mt-3 text-sm leading-7 text-black/60">
            <p>
              {dictionary.order.shipping.phone} {address?.phone || notProvided}
            </p>

            <p className="break-all">
              {dictionary.order.shipping.email} {order.email}
            </p>
          </div>
        </div>

        <div
          className="rounded-[16px] bg-[#f0f0f0] p-5"
          data-testid="shipping-method-summary"
        >
          <p className="text-sm font-bold text-black">
            {dictionary.order.shipping.method}
          </p>

          <div className="mt-3 text-sm leading-7 text-black/60">
            <p>{shippingMethod?.name || notProvided}</p>

            <p>
              {dictionary.order.shipping.cost}{" "}
              {formatAmount(shippingMethod?.total ?? 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShippingDetails
