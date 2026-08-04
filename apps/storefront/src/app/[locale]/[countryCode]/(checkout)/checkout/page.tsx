import { Metadata } from "next"
import { notFound } from "next/navigation"

import { AppLocale, isAppLocale } from "@i18n/config"
import { getDictionary } from "@i18n/get-dictionary"
import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type CheckoutPageParams = {
  locale: string
  countryCode: string
}

export async function generateMetadata({
  params,
}: {
  params: Promise<CheckoutPageParams>
}): Promise<Metadata> {
  const { locale: requestedLocale } = await params

  if (!isAppLocale(requestedLocale)) {
    return {}
  }

  const dictionary = await getDictionary(requestedLocale as AppLocale)

  return {
    title: dictionary.checkout.metadata.title,
    description: dictionary.checkout.metadata.description,
  }
}

export default async function Checkout({
  params,
}: {
  params: Promise<CheckoutPageParams>
}) {
  const { locale: requestedLocale } = await params

  if (!isAppLocale(requestedLocale)) {
    notFound()
  }

  const [cart, customer, dictionary] = await Promise.all([
    retrieveCart(),
    retrieveCustomer(),
    getDictionary(requestedLocale as AppLocale),
  ])

  if (!cart) {
    return notFound()
  }

  return (
    <main className="min-h-screen bg-[#070b10] pb-20 text-white">
      <div className="content-container">
        <div className="pt-5 small:pt-6">
          <nav
            aria-label={dictionary.checkout.page.breadcrumbLabel}
            className="mb-5 flex items-center gap-2 text-sm text-slate-500"
          >
            <LocalizedClientLink
              href="/"
              className="transition hover:text-[#ff7a1a]"
            >
              {dictionary.checkout.page.home}
            </LocalizedClientLink>

            <span aria-hidden="true">
              <span className="rtl:hidden">→</span>
              <span className="hidden rtl:inline">←</span>
            </span>

            <LocalizedClientLink
              href="/cart"
              className="transition hover:text-[#ff7a1a]"
            >
              {dictionary.checkout.page.cart}
            </LocalizedClientLink>

            <span aria-hidden="true">
              <span className="rtl:hidden">→</span>
              <span className="hidden rtl:inline">←</span>
            </span>

            <span className="text-white">
              {dictionary.checkout.page.checkout}
            </span>
          </nav>

          <div className="mb-7 small:mb-9">
            <h1 className="text-[32px] font-black leading-tight tracking-[-0.03em] text-white small:text-[40px]">
              {dictionary.checkout.page.title}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 small:text-base">
              {dictionary.checkout.page.description}
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
