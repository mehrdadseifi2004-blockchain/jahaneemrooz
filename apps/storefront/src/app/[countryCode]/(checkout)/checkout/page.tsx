import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "تکمیل خرید | جهان امروز",
  description: "ثبت اطلاعات، انتخاب روش ارسال و پرداخت سفارش",
}

export default async function Checkout() {
  const cart = await retrieveCart()

  if (!cart) {
    return notFound()
  }

  const customer = await retrieveCustomer()

  return (
    <main className="min-h-screen bg-white pb-20" dir="rtl">
      <div className="content-container">
        <div className="pt-5 small:pt-6">
          <nav
            aria-label="مسیر صفحه"
            className="mb-5 flex items-center gap-2 text-sm text-black/60"
          >
            <LocalizedClientLink
              href="/"
              className="transition hover:text-black"
            >
              خانه
            </LocalizedClientLink>

            <span aria-hidden="true">←</span>

            <LocalizedClientLink
              href="/cart"
              className="transition hover:text-black"
            >
              سبد خرید
            </LocalizedClientLink>

            <span aria-hidden="true">←</span>

            <span className="text-black">تکمیل سفارش</span>
          </nav>

          <div className="mb-7 small:mb-9">
            <h1 className="text-[32px] font-black leading-tight tracking-[-0.03em] text-black small:text-[40px]">
              تکمیل سفارش
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-black/60 small:text-base">
              اطلاعات دریافت سفارش، روش ارسال و شیوه پرداخت را تکمیل و سفارش خود
              را ثبت کنید.
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-5 large:grid-cols-[minmax(0,1fr)_minmax(360px,460px)]">
            <section className="min-w-0">
              <PaymentWrapper cart={cart}>
                <CheckoutForm cart={cart} customer={customer} />
              </PaymentWrapper>
            </section>

            <aside className="large:sticky large:top-[112px]">
              <CheckoutSummary cart={cart} />
            </aside>
          </div>
        </div>
      </div>
    </main>
  )
}
