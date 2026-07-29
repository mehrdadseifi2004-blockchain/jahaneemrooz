"use client"

import { useI18n } from "@i18n/components/i18n-provider"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Help = () => {
  const { dictionary } = useI18n()

  return (
    <div className="rounded-[20px] border border-black/10 p-5 small:p-6">
      <h2 className="text-lg font-bold text-black">
        {dictionary.order.help.title}
      </h2>

      <p className="mt-2 text-sm leading-7 text-black/60">
        {dictionary.order.help.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <LocalizedClientLink
          href="/contact"
          className="inline-flex h-11 items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white transition hover:bg-black/80"
        >
          {dictionary.order.help.contact}
        </LocalizedClientLink>

        <LocalizedClientLink
          href="/account/orders"
          className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 px-6 text-sm font-medium text-black transition hover:bg-black hover:text-white"
        >
          {dictionary.order.help.orders}
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default Help
