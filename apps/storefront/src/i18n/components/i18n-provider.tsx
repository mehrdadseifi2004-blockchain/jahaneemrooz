"use client"

import { createContext, ReactNode, useContext } from "react"

import { AppLocale, localeConfig, TextDirection } from "@i18n/config"
import { Dictionary } from "@i18n/get-dictionary"

type I18nContextValue = {
  locale: AppLocale
  direction: TextDirection
  dictionary: Dictionary
}

const I18nContext = createContext<I18nContextValue | null>(null)

type I18nProviderProps = {
  locale: AppLocale
  dictionary: Dictionary
  children: ReactNode
}

export function I18nProvider({
  locale,
  dictionary,
  children,
}: I18nProviderProps) {
  return (
    <I18nContext.Provider
      value={{
        locale,
        direction: localeConfig[locale].direction,
        dictionary,
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)

  if (!context) {
    throw new Error("useI18n must be used inside I18nProvider")
  }

  return context
}
