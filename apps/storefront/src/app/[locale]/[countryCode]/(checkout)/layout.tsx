import { notFound } from "next/navigation"

import { AppLocale, isAppLocale } from "@i18n/config"
import { getDictionary } from "@i18n/get-dictionary"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function CheckoutLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{
    locale: string
    countryCode: string
  }>
}) {
  const { locale: requestedLocale } = await params

  if (!isAppLocale(requestedLocale)) {
    notFound()
  }

  const dictionary = await getDictionary(requestedLocale as AppLocale)

  const year = String(new Date().getFullYear())

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white">
      <header className="sticky top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur">
        <nav className="content-container flex h-[76px] items-center justify-between gap-4 small:h-[88px]">
          <LocalizedClientLink
            href="/"
            className="shrink-0 text-2xl font-black tracking-[-0.04em] text-black small:text-[32px]"
            data-testid="store-link"
          >
            JAHAN.EMROOZ
          </LocalizedClientLink>

          <div className="hidden items-center gap-2 text-sm text-black/60 medium:flex">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f0f0f0]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="5"
                  y="10"
                  width="14"
                  height="10"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />

                <path
                  d="M8 10V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V10"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </span>

            <span>{dictionary.checkout.layout.secureCheckout}</span>
          </div>

          <LocalizedClientLink
            href="/cart"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-4 text-xs font-medium text-black transition hover:bg-black hover:text-white small:px-6 small:text-sm"
            data-testid="back-to-cart-link"
          >
            <span>{dictionary.checkout.layout.backToCart}</span>

            <span aria-hidden="true">
              <span className="rtl:hidden">←</span>
              <span className="hidden rtl:inline">→</span>
            </span>
          </LocalizedClientLink>
        </nav>
      </header>

      <div className="relative flex-1" data-testid="checkout-container">
        {children}
      </div>

      <footer className="border-t border-black/10 bg-[#f0f0f0] py-6">
        <div className="content-container flex flex-col gap-3 text-sm text-black/50 small:flex-row small:items-center small:justify-between">
          <p>{dictionary.checkout.layout.copyright.replace("{year}", year)}</p>

          <div className="flex flex-wrap items-center gap-5">
            <span>{dictionary.checkout.layout.securePayment}</span>

            <span>{dictionary.checkout.layout.privacy}</span>

            <span>{dictionary.checkout.layout.support}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
