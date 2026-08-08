import { notFound } from "next/navigation"
import Image from "next/image"

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
    <div className="relative flex min-h-screen w-full flex-col bg-[var(--theme-background)] text-[var(--theme-text)]">
      <header className="sticky top-0 z-50 border-b border-[var(--theme-border)] bg-[var(--theme-header)]/95 backdrop-blur">
        <nav className="content-container flex h-[76px] items-center justify-between gap-4 small:h-[88px]">
          <LocalizedClientLink
            href="/"
            aria-label="JAHAN.EMROOZ"
            data-testid="store-link"
            className="group flex shrink-0 items-center gap-2"
          >
            <Image
              src="/assets/logo-icon-transparent.png"
              alt=""
              width={56}
              height={56}
              priority
              className="h-10 w-10 shrink-0 object-contain transition duration-300 group-hover:scale-105 small:h-12 small:w-12"
            />

            <div className="flex min-w-0 flex-col leading-none">
              {requestedLocale === "fa" ? (
                <>
                  <span className="whitespace-nowrap text-[17px] font-bold tracking-tight">
                    <span className="text-[var(--theme-text)]">جهان </span>
                    <span className="text-[var(--theme-accent)]">امروز</span>
                  </span>

                  <span className="mt-1 whitespace-nowrap text-[8px] font-normal tracking-wide text-[var(--theme-text-subtle)]">
                    فناوری
                    <span className="mx-1 text-[var(--theme-accent)]">|</span>
                    زندگی
                    <span className="mx-1 text-[var(--theme-accent)]">|</span>
                    آینده
                  </span>
                </>
              ) : (
                <>
                  <span className="whitespace-nowrap text-[16px] font-black tracking-[-0.04em] text-[var(--theme-text)]">
                    JAHAN.
                    <span className="text-[var(--theme-accent)]">EMROOZ</span>
                  </span>

                  <span className="mt-1 whitespace-nowrap text-[7px] font-medium uppercase tracking-[0.14em] text-[var(--theme-text-subtle)]">
                    Technology
                    <span className="mx-1 text-[var(--theme-accent)]">|</span>
                    Life
                    <span className="mx-1 text-[var(--theme-accent)]">|</span>
                    Future
                  </span>
                </>
              )}
            </div>
          </LocalizedClientLink>

          <div className="hidden items-center gap-2 text-sm text-[var(--theme-text-muted)] medium:flex">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ff5a00]/30 bg-[#ff5a00]/10 text-[#ff7a1a]">
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
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface)] px-4 text-xs font-bold text-[var(--theme-text-muted)] transition hover:border-[#ff5a00]/50 hover:text-[#ff7a1a] small:px-6 small:text-sm"
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

      <footer className="border-t border-[var(--theme-border)] bg-[var(--theme-header)] py-6 transition-colors duration-300">
        <div className="content-container flex flex-col gap-3 text-sm text-[var(--theme-text-subtle)] small:flex-row small:items-center small:justify-between">
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
