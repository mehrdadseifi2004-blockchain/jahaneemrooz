"use client"

import { useI18n } from "@i18n/components/i18n-provider"
import { getPercentageDiff } from "@lib/util/get-percentage-diff"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type LineItemPriceProps = {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
  style?: "default" | "tight"
  currencyCode: string
}

const LineItemPrice = ({
  item,
  style = "default",
  currencyCode,
}: LineItemPriceProps) => {
  const { dictionary } = useI18n()

  const originalPrice = item.original_total ?? 0
  const currentPrice = item.total ?? 0
  const hasReducedPrice = currentPrice < originalPrice

  return (
    <div className="flex flex-col items-end gap-1">
      {hasReducedPrice && (
        <div className="flex flex-wrap items-center justify-end gap-2">
          {style === "default" && (
            <span className="text-xs text-[var(--theme-text-subtle)]">
              {dictionary.cart.originalPrice}
            </span>
          )}

          <span
            className="text-xs text-[var(--theme-text-subtle)] line-through"
            data-testid="product-original-price"
          >
            {convertToLocale({
              amount: originalPrice,
              currency_code: currencyCode,
            })}
          </span>

          {style === "default" && (
            <span className="text-xs font-bold text-rose-400">
              -{getPercentageDiff(originalPrice, currentPrice)}%
            </span>
          )}
        </div>
      )}

      <span
        className="text-base font-black text-[#ff5a00]"
        data-testid="product-price"
      >
        {convertToLocale({
          amount: currentPrice,
          currency_code: currencyCode,
        })}
      </span>
    </div>
  )
}

export default LineItemPrice
