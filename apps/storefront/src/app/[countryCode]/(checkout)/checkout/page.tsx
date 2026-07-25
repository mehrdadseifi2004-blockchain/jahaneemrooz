import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
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
    <main className="min-h-screen bg-slate-50 py-10 small:py-14" dir="rtl">
      <div className="content-container">
        <div className="mb-8">
          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-600">
            تکمیل سفارش
          </span>

          <h1 className="mt-4 text-3xl font-bold text-slate-950 small:text-4xl">
            ادامه فرایند خرید
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
            اطلاعات دریافت سفارش، روش ارسال و شیوه پرداخت را تکمیل کنید.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 large:grid-cols-[minmax(0,1fr)_390px]">
          <section className="min-w-0">
            <PaymentWrapper cart={cart}>
              <CheckoutForm cart={cart} customer={customer} />
            </PaymentWrapper>
          </section>

          <aside className="large:sticky large:top-28">
            <CheckoutSummary cart={cart} />
          </aside>
        </div>
      </div>
    </main>
  )
}