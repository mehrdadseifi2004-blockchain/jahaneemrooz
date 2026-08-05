"use client"

import { useI18n } from "@i18n/components/i18n-provider"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  const { dictionary } = useI18n()
  const content = dictionary.cart.signInPrompt

  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-white/10 bg-[#111923] p-5 text-white small:flex-row small:items-center small:justify-between">
      <div>
        <h2 className="text-lg font-bold text-white">{content.title}</h2>

        <p className="mt-2 text-sm leading-7 text-slate-400">
          {content.description}
        </p>
      </div>

      <LocalizedClientLink
        href="/account"
        className="inline-flex h-11 shrink-0 items-center justify-center rounded-full border border-[#ff5a00]/40 bg-[#ff5a00]/10 px-6 text-sm font-bold text-[#ff7a1a] transition hover:bg-[#ff5a00] hover:text-white"
        data-testid="sign-in-button"
      >
        {content.submit}
      </LocalizedClientLink>
    </div>
  )
}

export default SignInPrompt
