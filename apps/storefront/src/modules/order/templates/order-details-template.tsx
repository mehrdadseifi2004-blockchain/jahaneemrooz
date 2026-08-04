"use client"

import { XMark } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OrderDetails from "@modules/order/components/order-details"
import OrderSummary from "@modules/order/components/order-summary"
import PaymentDetails from "@modules/order/components/payment-details"
import ShippingDetails from "@modules/order/components/shipping-details"
import React from "react"

type OrderDetailsTemplateProps = {
  order: HttpTypes.StoreOrder
}

const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({
  order,
}) => {
  return (
    <div className="flex flex-col justify-center gap-y-5 text-white">
      <div className="flex flex-col gap-4 rounded-[20px] border border-white/10 bg-[#111923] p-5 small:flex-row small:items-center small:justify-between">
        <h1 className="text-3xl font-black tracking-[-0.03em] text-white">
          Order details
        </h1>
        <LocalizedClientLink
          href="/account/orders"
          className="flex items-center gap-2 text-sm font-bold text-slate-400 transition hover:text-[#ff7a1a]"
          data-testid="back-to-overview-button"
        >
          <XMark /> Back to overview
        </LocalizedClientLink>
      </div>
      <div
        className="flex h-full w-full flex-col gap-5"
        data-testid="order-details-container"
      >
        <section className="rounded-[24px] border border-white/10 bg-[#111923] p-5 small:p-7">
          <OrderDetails order={order} showStatus />
        </section>
        <section className="rounded-[24px] border border-white/10 bg-[#111923] p-5 small:p-7">
          <Items order={order} />
        </section>
        <section className="rounded-[24px] border border-white/10 bg-[#111923] p-5 small:p-7">
          <ShippingDetails order={order} />
        </section>
        <section className="rounded-[24px] border border-white/10 bg-[#111923] p-5 small:p-7">
          <PaymentDetails order={order} />
        </section>
        <section className="rounded-[24px] border border-white/10 bg-[#111923] p-5 small:p-7">
          <OrderSummary order={order} />
        </section>
        <Help />
      </div>
    </div>
  )
}

export default OrderDetailsTemplate
