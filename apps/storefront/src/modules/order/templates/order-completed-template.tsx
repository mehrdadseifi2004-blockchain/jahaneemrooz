import { HttpTypes } from "@medusajs/types"
import { cookies as nextCookies } from "next/headers"

import { Dictionary } from "@i18n/get-dictionary"
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
  dictionary: Dictionary
}

export default async function OrderCompletedTemplate({
  order,
  dictionary,
}: OrderCompletedTemplateProps) {
  const cookies = await nextCookies()

  const isOnboarding = cookies.get("_medusa_onboarding")?.value === "true"

  return (
    <main className="min-h-screen bg-[#070b10] pb-20 text-white">
      <div className="content-container" data-testid="order-complete-container">
        <div className="border-t border-white/10 pt-8 small:pt-12">
          {isOnboarding && (
            <div className="mb-8">
              <OnboardingCta orderId={order.id} />
            </div>
          )}

          <section className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-4xl font-bold text-emerald-400 shadow-[0_0_55px_rgba(16,185,129,0.12)]">
              ✓
            </div>

            <h1 className="mt-6 text-[32px] font-black leading-tight tracking-[-0.03em] text-white small:text-[44px]">
              {dictionary.order.completed.title}
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-8 text-slate-400 small:text-base">
              {dictionary.order.completed.description}
            </p>
          </section>

          <section className="mx-auto mt-8 max-w-4xl rounded-[24px] border border-white/10 bg-[#111923] p-5 small:p-7">
            <OrderDetails order={order} />
          </section>

          <div className="mt-8 grid items-start gap-5 large:grid-cols-[minmax(0,1fr)_380px]">
            <section className="rounded-[24px] border border-white/10 bg-[#111923] p-5 small:p-7">
              <h2 className="mb-6 text-xl font-bold text-white small:text-2xl">
                {dictionary.order.completed.products}
              </h2>

              <Items order={order} />
            </section>

            <aside className="rounded-[24px] border border-white/10 bg-[#111923] p-5 small:p-6 large:sticky large:top-28">
              <OrderSummary order={order} />
            </aside>
          </div>

          <section className="mt-5 rounded-[24px] border border-white/10 bg-[#111923] p-5 small:p-7">
            <ShippingDetails order={order} />
          </section>

          <section className="mt-5 rounded-[24px] border border-white/10 bg-[#111923] p-5 small:p-7">
            <PaymentDetails order={order} />
          </section>

          <section className="mt-5">
            <Help />
          </section>

          <div className="mt-8 flex flex-col justify-center gap-3 small:flex-row">
            <LocalizedClientLink
              href="/store"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#ff5a00] px-8 text-sm font-bold text-white transition hover:bg-[#ff7a1a]"
            >
              {dictionary.order.completed.continueShopping}
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/account/orders"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-[#0c1219] px-8 text-sm font-bold text-slate-300 transition hover:border-[#ff5a00]/50 hover:text-[#ff7a1a]"
            >
              {dictionary.order.completed.myOrders}
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </main>
  )
}
