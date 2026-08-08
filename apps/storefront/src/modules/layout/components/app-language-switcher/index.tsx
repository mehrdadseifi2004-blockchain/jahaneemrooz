"use client"

import { useState, useTransition } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { useI18n } from "@i18n/components/i18n-provider"
import { AppLocale, localeConfig, supportedLocales } from "@i18n/config"
import { updateLocale } from "@lib/data/locale-actions"

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
        className="inline-flex h-10 min-w-14 items-center justify-center gap-1 rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface)] px-3 text-xs font-semibold text-[var(--theme-text)] transition duration-300 hover:border-[#ff5a00]/60 hover:bg-[#ff5a00]/10 hover:text-[#ff5a00] disabled:cursor-wait disabled:opacity-50"
      >
        <span>{localeConfig[locale].shortLabel}</span>

        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
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
            className="absolute end-0 top-[calc(100%+8px)] z-50 min-w-36 overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-1.5 text-start text-[var(--theme-text)] shadow-[0_18px_55px_var(--theme-shadow)]"
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
                      : "text-[var(--theme-text-muted)] hover:bg-[#ff5a00]/10 hover:text-[#ff5a00]"
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
