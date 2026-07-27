import { HttpTypes } from "@medusajs/types"

import EmptyCartMessage from "@modules/cart/components/empty-cart-message"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import ItemsTemplate from "./items"
import Summary from "./summary"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const itemCount =
    cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0

  return (
    <main className="min-h-screen bg-white pb-20" dir="rtl">
      <div className="content-container" data-testid="cart-container">
        <div className="border-t border-black/10 pt-5 small:pt-6">
          <nav
            aria-label="مسیر صفحه"
            className="mb-5 flex items-center gap-2 text-sm text-black/60 small:mb-6"
          >
            <LocalizedClientLink
              href="/"
              className="transition hover:text-black"
            >
              خانه
            </LocalizedClientLink>

            <span aria-hidden="true">←</span>

            <span className="text-black">سبد خرید</span>
          </nav>

          {cart?.items?.length ? (
            <>
              <h1 className="mb-5 text-[32px] font-black leading-tight tracking-[-0.03em] text-black small:mb-6 small:text-[40px]">
                سبد خرید شما
              </h1>

              {!customer && (
                <div className="mb-5 flex flex-col gap-4 rounded-[20px] bg-[#f0f0f0] p-5 small:flex-row small:items-center small:justify-between">
                  <div>
                    <p className="font-bold text-black">
                      قبلاً حساب کاربری ساخته‌اید؟
                    </p>

                    <p className="mt-1 text-sm leading-6 text-black/60">
                      برای مشاهده سفارش‌های قبلی و تکمیل سریع‌تر خرید وارد شوید.
                    </p>
                  </div>

                  <LocalizedClientLink
                    href="/account"
                    className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white transition hover:bg-black/80"
                  >
                    ورود به حساب
                  </LocalizedClientLink>
                </div>
              )}

              <div className="grid items-start gap-5 large:grid-cols-[minmax(0,1fr)_minmax(360px,505px)]">
                <section className="min-w-0">
                  <ItemsTemplate cart={cart} />
                </section>

                <aside className="large:sticky large:top-28">
                  {cart.region && <Summary cart={cart} />}
                </aside>
              </div>

              <p className="mt-5 text-sm text-black/50">
                مجموعاً {itemCount.toLocaleString("fa-IR")} کالا در سبد خرید شما
                قرار دارد.
              </p>
            </>
          ) : (
            <EmptyCartMessage />
          )}
        </div>
      </div>
    </main>
  )
}

export default CartTemplate
