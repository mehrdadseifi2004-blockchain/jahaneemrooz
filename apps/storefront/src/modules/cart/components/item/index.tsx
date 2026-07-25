"use client"

import { updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import CartItemSelect from "@modules/cart/components/cart-item-select"
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
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  const maxQuantity = item.variant?.manage_inventory
    ? Math.min(item.variant.inventory_quantity || 10, 10)
    : 10

  if (type === "preview") {
    return (
      <div className="flex items-center gap-3">
        <LocalizedClientLink
          href={`/products/${item.product_handle}`}
          className="w-16 shrink-0"
        >
          <Thumbnail
            thumbnail={item.thumbnail}
            images={item.variant?.product?.images}
            size="square"
          />
        </LocalizedClientLink>

        <div className="min-w-0 flex-1">
          <p className="line-clamp-1 text-sm font-semibold text-slate-900">
            {item.product_title}
          </p>

          <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
            <span>{item.quantity.toLocaleString("fa-IR")} عدد</span>
            <span>×</span>
            <LineItemUnitPrice
              item={item}
              style="tight"
              currencyCode={currencyCode}
            />
          </div>
        </div>

        <LineItemPrice
          item={item}
          style="tight"
          currencyCode={currencyCode}
        />
      </div>
    )
  }

  return (
    <article
      className="rounded-2xl border border-slate-200 p-4 transition hover:border-blue-200 hover:shadow-sm small:p-5"
      data-testid="product-row"
    >
      <div className="flex flex-col gap-5 xsmall:flex-row">
        <LocalizedClientLink
          href={`/products/${item.product_handle}`}
          className="w-full shrink-0 xsmall:w-32"
        >
          <Thumbnail
            thumbnail={item.thumbnail}
            images={item.variant?.product?.images}
            size="square"
          />
        </LocalizedClientLink>

        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div>
            <LocalizedClientLink
              href={`/products/${item.product_handle}`}
              className="text-base font-bold leading-7 text-slate-950 transition hover:text-blue-600"
              data-testid="product-title"
            >
              {item.product_title}
            </LocalizedClientLink>

            {item.variant_title &&
              !item.variant_title.toLowerCase().includes("default") && (
                <p className="mt-2 text-sm text-slate-500">
                  گزینه انتخاب‌شده: {item.variant_title}
                </p>
              )}

            <div className="mt-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              <span className="text-xs font-medium text-emerald-700">
                موجود و آماده سفارش
              </span>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-4 border-t border-slate-100 pt-4 small:flex-row small:items-end small:justify-between">
            <div>
              <p className="mb-1 text-xs text-slate-400">
                قیمت واحد
              </p>

              <div className="font-semibold text-slate-700">
                <LineItemUnitPrice
                  item={item}
                  style="tight"
                  currencyCode={currencyCode}
                />
              </div>
            </div>

            <div>
              <p className="mb-1 text-xs text-slate-400">
                قیمت نهایی
              </p>

              <div className="text-base font-bold text-slate-950">
                <LineItemPrice
                  item={item}
                  style="tight"
                  currencyCode={currencyCode}
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">
                  تعداد:
                </span>

                <CartItemSelect
                  value={item.quantity}
                  onChange={(event) =>
                    changeQuantity(parseInt(event.target.value))
                  }
                  className="h-10 w-16 rounded-xl border border-slate-200 bg-white px-2"
                  data-testid="product-select-button"
                >
                  {Array.from(
                    {
                      length: Math.max(maxQuantity, 1),
                    },
                    (_, index) => (
                      <option value={index + 1} key={index + 1}>
                        {(index + 1).toLocaleString("fa-IR")}
                      </option>
                    )
                  )}
                </CartItemSelect>

                {updating && <Spinner />}
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-rose-100 bg-rose-50 text-rose-600 transition hover:bg-rose-100">
                <DeleteButton
                  id={item.id}
                  data-testid="product-delete-button"
                />
              </div>
            </div>
          </div>

          <ErrorMessage
            error={error}
            data-testid="product-error-message"
          />
        </div>
      </div>
    </article>
  )
}

export default Item