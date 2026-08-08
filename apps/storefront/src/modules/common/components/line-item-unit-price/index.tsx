"use client"

import { useI18n } from "@i18n/components/i18n-provider"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type LineItemUnitPriceProps = {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
  style?: "default" | "tight"
  currencyCode: string
}

const LineItemUnitPrice = ({
  item,
  style = "default",
  currencyCode,
}: LineItemUnitPriceProps) => {
  const { dictionary } = useI18n()

  const total = item.total ?? 0
  const originalTotal = item.original_total ?? 0
  const quantity = Math.max(item.quantity, 1)
  const hasReducedPrice = total < originalTotal

  const percentageDiff =
    originalTotal > 0
      ? Math.round(((originalTotal - total) / originalTotal) * 100)
      : 0

  return (
    <div className="flex h-full flex-col justify-center">
      {hasReducedPrice && (
        <div className="flex flex-wrap items-center gap-2">
          {style === "default" && (
            <span className="text-xs text-[var(--theme-text-subtle)]">
              {dictionary.cart.originalPrice}
            </span>
          )}

          <span
            className="text-xs text-[var(--theme-text-subtle)] line-through"
            data-testid="product-unit-original-price"
          >
            {convertToLocale({
              amount: originalTotal / quantity,
              currency_code: currencyCode,
            })}
          </span>

          {style === "default" && (
            <span className="text-xs font-bold text-rose-400">
              -{percentageDiff}%
            </span>
          )}
        </div>
      )}

      <span
        className="text-sm font-semibold text-[var(--theme-text-muted)]"
        data-testid="product-unit-price"
      >
        {convertToLocale({
          amount: total / quantity,
          currency_code: currencyCode,
        })}
      </span>
    </div>
  )
}

export default LineItemUnitPrice
