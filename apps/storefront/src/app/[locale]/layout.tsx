import { getBaseURL } from "@lib/util/env"
import { I18nProvider } from "@i18n/components/i18n-provider"
import {
  AppLocale,
  isAppLocale,
  localeConfig,
  supportedLocales,
} from "@i18n/config"
import { getDictionary } from "@i18n/get-dictionary"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({
    locale,
  }))
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: requestedLocale } = await params

  if (!isAppLocale(requestedLocale)) {
    notFound()
  }

  const locale = requestedLocale as AppLocale
  const config = localeConfig[locale]
  const dictionary = await getDictionary(locale)

  return (
    <html
      lang={config.languageTag}
      dir={config.direction}
      data-locale={locale}
      data-mode="light"
    >
      <body>
        <I18nProvider locale={locale} dictionary={dictionary}>
          <main className="relative">{children}</main>
        </I18nProvider>
      </body>
    </html>
  )
}
