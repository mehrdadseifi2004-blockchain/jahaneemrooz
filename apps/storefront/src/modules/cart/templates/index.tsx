import { HttpTypes } from "@medusajs/types"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import EmptyCartMessage from "../components/empty-cart-message"
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
    <main className="min-h-screen bg-slate-50 py-10 small:py-14" dir="rtl">
      <div className="content-container" data-testid="cart-container">
        {cart?.items?.length ? (
          <>
            <div className="mb-8">
              <span className="inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-600">
                سبد خرید
              </span>

              <h1 className="mt-4 text-3xl font-bold text-slate-950 small:text-4xl">
                سبد خرید شما
              </h1>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                {itemCount.toLocaleString("fa-IR")} کالا در سبد خرید شما قرار
                دارد.
              </p>
            </div>

            {!customer && (
              <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-blue-100 bg-blue-50 p-5 small:flex-row small:items-center small:justify-between">
                <div>
                  <p className="font-bold text-slate-900">
                    قبلاً حساب کاربری ساخته‌اید؟
                  </p>

                  <p className="mt-1 text-sm text-slate-600">
                    برای دسترسی به اطلاعات و سفارش‌های قبلی وارد حساب خود شوید.
                  </p>
                </div>

                <LocalizedClientLink
                  href="/account"
                  className="inline-flex h-10 shrink-0 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-blue-600 shadow-sm transition hover:bg-blue-600 hover:text-white"
                >
                  ورود به حساب کاربری
                </LocalizedClientLink>
              </div>
            )}

            <div className="grid grid-cols-1 items-start gap-8 large:grid-cols-[minmax(0,1fr)_380px]">
              <section className="min-w-0">
                <ItemsTemplate cart={cart} />
              </section>

              <aside className="large:sticky large:top-28">
                {cart.region && <Summary cart={cart} />}
              </aside>
            </div>
          </>
        ) : (
          <EmptyCartMessage />
        )}
      </div>
    </main>
  )
}

export default CartTemplate