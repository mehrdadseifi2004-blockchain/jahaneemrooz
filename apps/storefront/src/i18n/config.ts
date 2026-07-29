export const supportedLocales = ["fa", "en"] as const

export type AppLocale = (typeof supportedLocales)[number]

export const defaultLocale: AppLocale = "fa"

export type TextDirection = "rtl" | "ltr"

export const localeConfig: Record<
  AppLocale,
  {
    languageTag: string
    medusaLocale: string
    direction: TextDirection
    label: string
    shortLabel: string
  }
> = {
  fa: {
    languageTag: "fa-IR",
    medusaLocale: "fa-IR",
    direction: "rtl",
    label: "فارسی",
    shortLabel: "FA",
  },
  en: {
    languageTag: "en-US",
    medusaLocale: "en-US",
    direction: "ltr",
    label: "English",
    shortLabel: "EN",
  },
}

export function isAppLocale(value: string): value is AppLocale {
  return supportedLocales.includes(value as AppLocale)
}

export function getLocaleFromMedusaCookie(
  value?: string | null,
): AppLocale | null {
  if (!value) {
    return null
  }

  const normalized = value.toLowerCase()

  if (normalized === "fa" || normalized.startsWith("fa-")) {
    return "fa"
  }

  if (normalized === "en" || normalized.startsWith("en-")) {
    return "en"
  }

  return null
}
