"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@modules/common/components/ui"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<
    ReturnType<typeof setTimeout> | undefined
  >(undefined)
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((total, item) => total + item.quantity, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef(totalItems)

  const timedOpen = () => {
    open()

    const timer = setTimeout(close, 5000)

    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }

    open()
  }

  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }

    itemRef.current = totalItems

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, pathname])

  return (
    <div
      className="relative z-50 h-full"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
      dir="rtl"
    >
      <Popover className="relative h-full">
        <PopoverButton className="h-full">
          <LocalizedClientLink
            className="transition hover:text-black/60"
            href="/cart"
            data-testid="nav-cart-link"
          >
            سبد خرید ({totalItems.toLocaleString("fa-IR")})
          </LocalizedClientLink>
        </PopoverButton>

        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel
            static
            className="absolute left-0 top-[calc(100%+1px)] hidden w-[min(420px,calc(100vw-2rem))] overflow-hidden rounded-b-[20px] border border-black/10 bg-white text-black shadow-xl small:block"
            data-testid="nav-cart-dropdown"
          >
            <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
              <h3 className="text-lg font-bold">سبد خرید</h3>

              <span className="text-sm text-black/50">
                {totalItems.toLocaleString("fa-IR")} کالا
              </span>
            </div>

            {cartState?.items?.length ? (
              <>
                <div className="grid max-h-[402px] grid-cols-1 divide-y divide-black/10 overflow-y-auto px-5 no-scrollbar">
                  {[...cartState.items]
                    .sort((a, b) =>
                      (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1,
                    )
                    .map((item) => (
                      <article
                        className="grid grid-cols-[84px_minmax(0,1fr)] gap-4 py-5"
                        key={item.id}
                        data-testid="cart-item"
                      >
                        <LocalizedClientLink
                          href={`/products/${item.product_handle}`}
                          className="w-[84px]"
                        >
                          <Thumbnail
                            thumbnail={item.thumbnail}
                            images={item.variant?.product?.images}
                            size="square"
                            className="rounded-[13px] border-0 bg-[#f0eeed] shadow-none"
                          />
                        </LocalizedClientLink>

                        <div className="flex min-w-0 flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <h3 className="line-clamp-2 text-sm font-bold leading-6 text-black">
                                <LocalizedClientLink
                                  href={`/products/${item.product_handle}`}
                                  data-testid="product-link"
                                >
                                  {item.product_title || item.title}
                                </LocalizedClientLink>
                              </h3>

                              <div className="mt-1 text-xs leading-5 text-black/50">
                                <LineItemOptions
                                  variant={item.variant}
                                  data-testid="cart-item-variant"
                                  data-value={item.variant}
                                />
                              </div>
                            </div>

                            <div className="shrink-0 text-sm font-bold text-black">
                              <LineItemPrice
                                item={item}
                                style="tight"
                                currencyCode={cartState.currency_code}
                              />
                            </div>
                          </div>

                          <div className="mt-4 flex items-center justify-between gap-4">
                            <span
                              className="text-xs text-black/50"
                              data-testid="cart-item-quantity"
                              data-value={item.quantity}
                            >
                              تعداد: {item.quantity.toLocaleString("fa-IR")}
                            </span>

                            <DeleteButton
                              id={item.id}
                              className="text-xs text-[#ff3333] transition hover:text-[#cc0000]"
                              data-testid="cart-item-remove-button"
                            >
                              حذف
                            </DeleteButton>
                          </div>
                        </div>
                      </article>
                    ))}
                </div>

                <div className="flex flex-col gap-4 border-t border-black/10 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-black">
                      جمع محصولات
                    </span>

                    <span
                      className="text-lg font-bold text-black"
                      data-testid="cart-subtotal"
                      data-value={subtotal}
                    >
                      {convertToLocale({
                        amount: subtotal,
                        currency_code: cartState.currency_code,
                      })}
                    </span>
                  </div>

                  <LocalizedClientLink href="/cart" passHref>
                    <Button
                      className="h-12 w-full rounded-full bg-black text-sm font-medium text-white transition hover:bg-black/80"
                      size="large"
                      data-testid="go-to-cart-button"
                    >
                      مشاهده سبد خرید
                    </Button>
                  </LocalizedClientLink>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center gap-5 px-6 py-14 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f0f0f0] text-lg font-bold text-black/50">
                  ۰
                </div>

                <div>
                  <p className="font-bold text-black">سبد خرید شما خالی است</p>

                  <p className="mt-2 text-sm leading-6 text-black/50">
                    هنوز محصولی به سبد خرید اضافه نکرده‌اید.
                  </p>
                </div>

                <LocalizedClientLink href="/store">
                  <Button
                    onClick={close}
                    className="h-11 rounded-full bg-black px-7 text-sm font-medium text-white transition hover:bg-black/80"
                  >
                    مشاهده محصولات
                  </Button>
                </LocalizedClientLink>
              </div>
            )}
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown
