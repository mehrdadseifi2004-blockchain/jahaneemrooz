"use client"

import { useI18n } from "@i18n/components/i18n-provider"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Help = () => {
  const { dictionary } = useI18n()

  return (
    <div className="rounded-[24px] border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 small:p-6">
      <h2 className="text-lg font-bold text-[var(--theme-text)]">
        {dictionary.order.help.title}
      </h2>

      <p className="mt-2 text-sm leading-7 text-[var(--theme-text-muted)]">
        {dictionary.order.help.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <LocalizedClientLink
          href="/contact"
          className="inline-flex h-11 items-center justify-center rounded-full bg-[#ff5a00] px-6 text-sm font-bold text-[var(--theme-text)] transition hover:bg-[#ff7a1a]"
        >
          {dictionary.order.help.contact}
        </LocalizedClientLink>

        <LocalizedClientLink
          href="/account/orders"
          className="inline-flex h-11 items-center justify-center rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface-muted)] px-6 text-sm font-bold text-[var(--theme-text-muted)] transition hover:border-[#ff5a00]/50 hover:text-[#ff7a1a]"
        >
          {dictionary.order.help.orders}
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default Help
