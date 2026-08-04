"use client"

import { updateLocale } from "@lib/data/locale-actions"
import { AppLocale, localeConfig, supportedLocales } from "@i18n/config"
import { useI18n } from "@i18n/components/i18n-provider"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"

const AppLanguageSwitcher = () => {
  const { locale, dictionary } = useI18n()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)

  const switchLocale = (nextLocale: AppLocale) => {
    if (nextLocale === locale || isPending) {
      setIsOpen(false)
      return
    }

    const segments = pathname.split("/").filter(Boolean)

    if (segments.length === 0) {
      return
    }

    segments[0] = nextLocale

    const nextPathname = `/${segments.join("/")}`
    const queryString = searchParams.toString()
    const nextUrl = queryString
      ? `${nextPathname}?${queryString}`
      : nextPathname

    setIsOpen(false)

    startTransition(async () => {
      await updateLocale(localeConfig[nextLocale].medusaLocale)

      router.push(nextUrl)
      router.refresh()
    })
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        disabled={isPending}
        aria-label={dictionary.common.language}
        aria-expanded={isOpen}
        className="inline-flex h-10 min-w-14 items-center justify-center gap-1 rounded-full border border-white/15 bg-[#111923] px-3 text-xs font-semibold text-white transition hover:border-[#ff5a00]/60 hover:bg-[#ff5a00] disabled:cursor-wait disabled:opacity-50"
      >
        <span>{localeConfig[locale].shortLabel}</span>

        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close language menu"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />

          <div
            className="absolute end-0 top-[calc(100%+8px)] z-50 min-w-36 overflow-hidden rounded-2xl border border-white/10 bg-[#111923] p-1.5 text-start text-white shadow-2xl shadow-black/40"
            role="menu"
          >
            {supportedLocales.map((optionLocale) => {
              const option = localeConfig[optionLocale]
              const isActive = optionLocale === locale

              return (
                <button
                  key={optionLocale}
                  type="button"
                  role="menuitem"
                  onClick={() => switchLocale(optionLocale)}
                  className={`flex w-full items-center justify-between gap-4 rounded-xl px-3 py-2.5 text-sm transition ${
                    isActive
                      ? "bg-[#ff5a00] text-white"
                      : "text-slate-200 hover:bg-white/10 hover:text-[#ff7a1a]"
                  }`}
                >
                  <span>{option.label}</span>
                  <span className="text-xs opacity-60">
                    {option.shortLabel}
                  </span>
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

export default AppLanguageSwitcher
