"use client"

import { useI18n } from "@i18n/components/i18n-provider"
import { updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import ErrorMessage from "@modules/checkout/components/error-message"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Thumbnail from "@modules/products/components/thumbnail"
import { useState } from "react"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
  currencyCode: string
}

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
  const { locale, dictionary } = useI18n()
  const numberLocale = locale === "fa" ? "fa-IR" : "en-US"

  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const maxQuantity = item.variant?.manage_inventory
    ? Math.max(
        1,
        Math.min(item.variant.inventory_quantity || item.quantity, 10),
      )
    : 10

  const changeQuantity = async (quantity: number) => {
    if (
      quantity < 1 ||
      quantity > maxQuantity ||
      quantity === item.quantity ||
      updating
    ) {
      return
    }

    setError(null)
    setUpdating(true)

    await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((error) => {
        setError(
          error instanceof Error
            ? error.message
            : dictionary.cart.item.updateError,
        )
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  if (type === "preview") {
    return (
      <div className="flex items-center gap-3 py-3">
        <LocalizedClientLink
          href={`/products/${item.product_handle}`}
          className="w-16 shrink-0"
        >
          <Thumbnail
            thumbnail={item.thumbnail}
            images={item.variant?.product?.images}
            size="square"
            className="rounded-xl border border-[var(--theme-border)] bg-white"
          />
        </LocalizedClientLink>

        <div className="min-w-0 flex-1">
          <p className="line-clamp-1 text-sm font-semibold text-[var(--theme-text)]">
            {item.product_title}
          </p>

          <div className="mt-1 flex items-center gap-1 text-xs text-[var(--theme-text-subtle)]">
            <span>
              {item.quantity.toLocaleString(numberLocale)}{" "}
              {dictionary.cart.item.quantityUnit}
            </span>
            <span>×</span>

            <LineItemUnitPrice
              item={item}
              style="tight"
              currencyCode={currencyCode}
            />
          </div>
        </div>

        <div className="font-bold text-[#ff5a00]">
          <LineItemPrice
            item={item}
            style="tight"
            currencyCode={currencyCode}
          />
        </div>
      </div>
    )
  }

  return (
    <article
      className="py-5 first:pt-0 last:pb-0 small:py-6"
      data-testid="product-row"
    >
      <div className="flex items-start gap-4">
        <LocalizedClientLink
          href={`/products/${item.product_handle}`}
          className="w-[100px] shrink-0 small:w-[124px]"
        >
          <Thumbnail
            thumbnail={item.thumbnail}
            images={item.variant?.product?.images}
            size="square"
            className="rounded-[13px] border border-[var(--theme-border)] bg-white shadow-none small:rounded-[20px]"
          />
        </LocalizedClientLink>

        <div className="flex min-w-0 flex-1 self-stretch flex-col">
          <div className="flex items-start justify-between gap-3">
            <LocalizedClientLink
              href={`/products/${item.product_handle}`}
              className="line-clamp-2 text-base font-bold leading-6 text-[var(--theme-text)] transition hover:text-[#ff7a1a] small:text-xl"
              data-testid="product-title"
            >
              {item.product_title}
            </LocalizedClientLink>

            <div data-testid="product-delete-button">
              <DeleteButton
                id={item.id}
                className="shrink-0 text-rose-400 transition hover:text-rose-300"
              />
            </div>
          </div>

          {item.variant_title &&
            !item.variant_title.toLowerCase().includes("default") && (
              <p className="mt-1 text-xs leading-6 text-[var(--theme-text-muted)] small:text-sm">
                {dictionary.cart.item.selectedOption}{" "}
                <span className="font-semibold text-[var(--theme-text)]">
                  {item.variant_title}
                </span>
              </p>
            )}

          <div className="mt-auto flex flex-col gap-4 pt-4 xsmall:flex-row xsmall:items-end xsmall:justify-between">
            <div>
              <div className="text-xl font-bold text-[#ff5a00] small:text-2xl">
                <LineItemPrice
                  item={item}
                  style="tight"
                  currencyCode={currencyCode}
                />
              </div>

              {item.quantity > 1 && (
                <div className="mt-1 flex items-center gap-1 text-xs text-[var(--theme-text-subtle)]">
                  <span>{dictionary.cart.item.unitPrice}</span>

                  <LineItemUnitPrice
                    item={item}
                    style="tight"
                    currencyCode={currencyCode}
                  />
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {updating && <Spinner />}

              <div className="flex h-10 items-center rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface-muted)] px-2 small:h-11">
                <button
                  type="button"
                  onClick={() => changeQuantity(item.quantity - 1)}
                  disabled={item.quantity <= 1 || updating}
                  aria-label={dictionary.cart.item.decreaseQuantity}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-xl text-[var(--theme-text)] transition hover:bg-[#ff5a00]/10 hover:text-[#ff7a1a] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  −
                </button>

                <span
                  className="min-w-8 text-center text-sm font-bold text-[var(--theme-text)]"
                  data-testid="product-quantity"
                  aria-live="polite"
                >
                  {item.quantity.toLocaleString(numberLocale)}
                </span>

                <button
                  type="button"
                  onClick={() => changeQuantity(item.quantity + 1)}
                  disabled={item.quantity >= maxQuantity || updating}
                  aria-label={dictionary.cart.item.increaseQuantity}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-xl text-[var(--theme-text)] transition hover:bg-[#ff5a00]/10 hover:text-[#ff7a1a] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <ErrorMessage error={error} data-testid="product-error-message" />
        </div>
      </div>
    </article>
  )
}

export default Item
