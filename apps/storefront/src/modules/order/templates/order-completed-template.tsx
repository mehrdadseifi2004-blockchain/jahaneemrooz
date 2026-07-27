import { cookies as nextCookies } from "next/headers"
import { HttpTypes } from "@medusajs/types"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OnboardingCta from "@modules/order/components/onboarding-cta"
import OrderDetails from "@modules/order/components/order-details"
import OrderSummary from "@modules/order/components/order-summary"
import PaymentDetails from "@modules/order/components/payment-details"
import ShippingDetails from "@modules/order/components/shipping-details"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
}

export default async function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  const cookies = await nextCookies()
  const isOnboarding = cookies.get("_medusa_onboarding")?.value === "true"

  return (
    <main className="min-h-screen bg-white pb-20" dir="rtl">
      <div className="content-container" data-testid="order-complete-container">
        <div className="border-t border-black/10 pt-8 small:pt-12">
          {isOnboarding && (
            <div className="mb-8">
              <OnboardingCta orderId={order.id} />
            </div>
          )}

          <section className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-4xl font-bold text-emerald-600">
              ✓
            </div>

            <h1 className="mt-6 text-[32px] font-black leading-tight tracking-[-0.03em] text-black small:text-[44px]">
              سفارش شما با موفقیت ثبت شد
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-8 text-black/60 small:text-base">
              از خرید شما متشکریم. سفارش ثبت شده و مراحل آماده‌سازی آن آغاز
              خواهد شد.
            </p>
          </section>

          <section className="mx-auto mt-8 max-w-4xl rounded-[20px] border border-black/10 p-5 small:p-7">
            <OrderDetails order={order} />
          </section>

          <div className="mt-8 grid items-start gap-5 large:grid-cols-[minmax(0,1fr)_380px]">
            <section className="rounded-[20px] border border-black/10 p-5 small:p-7">
              <h2 className="mb-6 text-xl font-bold text-black small:text-2xl">
                محصولات سفارش
              </h2>

              <Items order={order} />
            </section>

            <aside className="rounded-[20px] border border-black/10 p-5 small:p-6 large:sticky large:top-28">
              <OrderSummary order={order} />
            </aside>
          </div>

          <section className="mt-5 rounded-[20px] border border-black/10 p-5 small:p-7">
            <ShippingDetails order={order} />
          </section>

          <section className="mt-5 rounded-[20px] border border-black/10 p-5 small:p-7">
            <PaymentDetails order={order} />
          </section>

          <section className="mt-5">
            <Help />
          </section>

          <div className="mt-8 flex flex-col justify-center gap-3 small:flex-row">
            <LocalizedClientLink
              href="/store"
              className="inline-flex h-12 items-center justify-center rounded-full bg-black px-8 text-sm font-medium text-white transition hover:bg-black/80"
            >
              ادامه خرید
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/account/orders"
              className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 px-8 text-sm font-medium text-black transition hover:bg-black hover:text-white"
            >
              مشاهده سفارش‌های من
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </main>
  )
}
