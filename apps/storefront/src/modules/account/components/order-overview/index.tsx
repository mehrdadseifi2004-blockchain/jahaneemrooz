"use client"

import { Button } from "@modules/common/components/ui"

import OrderCard from "../order-card"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

const OrderOverview = ({ orders }: { orders: HttpTypes.StoreOrder[] }) => {
  if (orders?.length) {
    return (
      <div className="flex w-full flex-col gap-y-5">
        {orders.map((o) => (
          <div key={o.id} className="pb-1">
            <OrderCard order={o} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      className="flex min-h-[320px] w-full flex-col items-center justify-center gap-y-4 rounded-[24px] border border-[var(--theme-border)] bg-[var(--theme-surface)] px-6 text-center"
      data-testid="no-orders-container"
    >
      <h2 className="text-2xl font-black text-[var(--theme-text)]">
        Nothing to see here
      </h2>
      <p className="max-w-lg text-sm leading-7 text-[var(--theme-text-muted)]">
        You don&apos;t have any orders yet, let us change that {":)"}
      </p>
      <div className="mt-4">
        <LocalizedClientLink href="/" passHref>
          <Button data-testid="continue-shopping-button">
            Continue shopping
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default OrderOverview
