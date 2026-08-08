"use client"

import { useI18n } from "@i18n/components/i18n-provider"
import { HttpTypes } from "@medusajs/types"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import Thumbnail from "@modules/products/components/thumbnail"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
  currencyCode: string
}

const Item = ({ item, currencyCode }: ItemProps) => {
  const { locale, dictionary } = useI18n()

  const numberLocale = locale === "fa" ? "fa-IR" : "en-US"

  return (
    <article
      className="flex items-start gap-4 py-5 first:pt-0 last:pb-0"
      data-testid="product-row"
    >
      <div className="w-20 shrink-0 small:w-24">
        <Thumbnail
          thumbnail={item.thumbnail}
          size="square"
          className="rounded-[16px] border border-[var(--theme-border)] bg-white shadow-none"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3
          className="text-sm font-bold leading-6 text-[var(--theme-text)] small:text-base"
          data-testid="product-name"
        >
          {item.product_title}
        </h3>

        <div className="mt-1 text-xs text-[var(--theme-text-subtle)]">
          <LineItemOptions
            variant={item.variant}
            data-testid="product-variant"
          />
        </div>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-center gap-1 text-xs text-[var(--theme-text-subtle)]">
            <span data-testid="product-quantity">
              {item.quantity.toLocaleString(numberLocale)}
            </span>

            <span>{dictionary.order.item.quantityUnit} ×</span>

            <LineItemUnitPrice
              item={item}
              style="tight"
              currencyCode={currencyCode}
            />
          </div>

          <div className="font-bold text-[#ff5a00]">
            <LineItemPrice
              item={item}
              style="tight"
              currencyCode={currencyCode}
            />
          </div>
        </div>
      </div>
    </article>
  )
}

export default Item
