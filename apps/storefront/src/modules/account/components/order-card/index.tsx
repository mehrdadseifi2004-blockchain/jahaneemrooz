import { useI18n } from "@i18n/components/i18n-provider"
import { Button } from "@modules/common/components/ui"
import { useMemo } from "react"

import Thumbnail from "@modules/products/components/thumbnail"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type OrderCardProps = {
  order: HttpTypes.StoreOrder
}

const OrderCard = ({ order }: OrderCardProps) => {
  const { locale, dictionary } = useI18n()
  const content = dictionary.account.orderCard
  const numberLocale = locale === "fa" ? "fa-IR" : "en-US"

  const numberOfLines = useMemo(() => {
    return (
      order.items?.reduce((acc, item) => {
        return acc + item.quantity
      }, 0) ?? 0
    )
  }, [order])

  const numberOfProducts = useMemo(() => {
    return order.items?.length ?? 0
  }, [order])

  return (
    <div
      className="flex flex-col rounded-[24px] border border-white/10 bg-[#111923] p-5 text-white shadow-[0_18px_55px_rgba(0,0,0,0.18)]"
      data-testid="order-card"
    >
      <div className="mb-2 text-xl font-black text-[#ff7a1a]">
        #<span data-testid="order-display-id">{order.display_id}</span>
      </div>
      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
        <span className="pr-2" data-testid="order-created-at">
          {new Date(order.created_at).toDateString()}
        </span>
        <span className="px-2" data-testid="order-amount">
          {convertToLocale({
            amount: order.total,
            currency_code: order.currency_code,
          })}
        </span>
        <span className="ps-2">
          {content.items.replace(
            "{count}",
            numberOfLines.toLocaleString(numberLocale),
          )}
        </span>
      </div>
      <div className="my-5 grid grid-cols-2 gap-4 small:grid-cols-4">
        {order.items?.slice(0, 3).map((i) => {
          return (
            <div
              key={i.id}
              className="flex flex-col gap-y-2"
              data-testid="order-item"
            >
              <Thumbnail thumbnail={i.thumbnail} images={[]} size="full" />
              <div className="flex items-center text-sm text-slate-400">
                <span
                  className="line-clamp-2 font-semibold text-white"
                  data-testid="item-title"
                >
                  {i.title}
                </span>
                <span className="ml-2">x</span>
                <span data-testid="item-quantity">{i.quantity}</span>
              </div>
            </div>
          )
        })}
        {numberOfProducts > 4 && (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <span className="text-sm text-slate-400">
              {content.more.replace(
                "{count}",
                Math.max(numberOfLines - 4, 0).toLocaleString(numberLocale),
              )}
            </span>
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <LocalizedClientLink href={`/account/orders/details/${order.id}`}>
          <Button data-testid="order-details-link" variant="secondary">
            {content.details}
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default OrderCard
