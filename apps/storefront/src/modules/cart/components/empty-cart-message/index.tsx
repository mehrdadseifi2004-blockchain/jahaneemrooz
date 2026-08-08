"use client"

import { useI18n } from "@i18n/components/i18n-provider"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const EmptyCartMessage = () => {
  const { dictionary } = useI18n()

  return (
    <section
      className="flex min-h-[520px] flex-col items-center justify-center px-4 text-center"
      data-testid="empty-cart-message"
    >
      <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#ff5a00]/30 bg-[#ff5a00]/10 shadow-[0_0_55px_rgba(255,90,0,0.12)]">
        <svg
          width="46"
          height="46"
          viewBox="0 0 24 24"
          fill="none"
          className="text-[#ff7a1a]"
          aria-hidden="true"
        >
          <path
            d="M3 3H5L7.4 14.2C7.6 15.2 8.5 16 9.6 16H17.5C18.5 16 19.4 15.3 19.7 14.3L21 8H6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <circle cx="10" cy="20" r="1" fill="currentColor" />

          <circle cx="18" cy="20" r="1" fill="currentColor" />
        </svg>
      </div>

      <h1 className="mt-6 text-3xl font-black text-[var(--theme-text)] small:text-4xl">
        {dictionary.cart.empty.title}
      </h1>

      <p className="mt-4 max-w-lg text-sm leading-7 text-[var(--theme-text-muted)] small:text-base">
        {dictionary.cart.empty.description}
      </p>

      <LocalizedClientLink
        href="/store"
        className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-[#ff5a00] px-8 text-sm font-bold text-white transition hover:bg-[#ff7a1a]"
      >
        {dictionary.cart.empty.cta}
      </LocalizedClientLink>
    </section>
  )
}

export default EmptyCartMessage
