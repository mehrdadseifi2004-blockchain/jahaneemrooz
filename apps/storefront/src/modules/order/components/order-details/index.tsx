"use client"

import { HttpTypes } from "@medusajs/types"

import { useI18n } from "@i18n/components/i18n-provider"

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder
  showStatus?: boolean
}

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const { locale, dictionary } = useI18n()

  const dateLocale = locale === "fa" ? "fa-IR" : "en-US"

  const getStatusLabel = (status?: string) => {
    if (!status) {
      return dictionary.order.details.unknown
    }

    const statuses = dictionary.order.statuses as Record<string, string>

    return statuses[status] || status.split("_").join(" ")
  }

  const orderDate = new Intl.DateTimeFormat(dateLocale, {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(order.created_at))

  return (
    <div>
      <p className="text-sm leading-7 text-black/60 small:text-base">
        {dictionary.order.details.emailNotice}
      </p>

      <p
        className="mt-1 break-all font-semibold text-black"
        data-testid="order-email"
      >
        {order.email}
      </p>

      <div className="mt-6 grid gap-3 small:grid-cols-2">
        <div className="rounded-[16px] bg-[#f0f0f0] p-4">
          <p className="text-xs text-black/50">
            {dictionary.order.details.orderNumber}
          </p>

          <p className="mt-2 font-bold text-black" data-testid="order-id">
            #{order.display_id}
          </p>
        </div>

        <div className="rounded-[16px] bg-[#f0f0f0] p-4">
          <p className="text-xs text-black/50">
            {dictionary.order.details.orderDate}
          </p>

          <p className="mt-2 font-bold text-black" data-testid="order-date">
            {orderDate}
          </p>
        </div>
      </div>

      {showStatus && (
        <div className="mt-3 grid gap-3 small:grid-cols-2">
          <div className="rounded-[16px] border border-black/10 p-4">
            <p className="text-xs text-black/50">
              {dictionary.order.details.orderStatus}
            </p>

            <p
              className="mt-2 font-semibold text-black"
              data-testid="order-status"
            >
              {getStatusLabel(order.fulfillment_status)}
            </p>
          </div>

          <div className="rounded-[16px] border border-black/10 p-4">
            <p className="text-xs text-black/50">
              {dictionary.order.details.paymentStatus}
            </p>

            <p
              className="mt-2 font-semibold text-black"
              data-testid="order-payment-status"
            >
              {getStatusLabel(order.payment_status)}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderDetails
