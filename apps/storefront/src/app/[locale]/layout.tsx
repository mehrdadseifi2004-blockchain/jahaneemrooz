import { getBaseURL } from "@lib/util/env"
import { I18nProvider } from "@i18n/components/i18n-provider"
import {
  AppLocale,
  isAppLocale,
  localeConfig,
  supportedLocales,
} from "@i18n/config"
import { getDictionary } from "@i18n/get-dictionary"
import { ThemeProvider } from "@modules/theme/components/theme-provider"
import { Metadata } from "next"
import localFont from "next/font/local"
import { notFound } from "next/navigation"
import Script from "next/script"

import "styles/globals.css"

const persianFont = localFont({
  src: [
    {
      path: "../fonts/yekan-bakh-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/b-yekan-regular.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/xm-yekan-bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  preload: true,
  fallback: ["Tahoma", "Arial", "sans-serif"],
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "JAHAN.EMROOZ",
    template: "%s | JAHAN.EMROOZ",
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/assets/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/assets/favicon-16x16.png",
        type: "image/png",
        sizes: "16x16",
      },
    ],
    apple: [
      {
        url: "/assets/apple-touch-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },
  manifest: "/assets/site.webmanifest",
}

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({
    locale,
  }))
}

const themeScript = `
(() => {
  try {
    const storedTheme = localStorage.getItem("jahan-emrooz-theme");

    const systemTheme =
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

    const theme =
      storedTheme === "light" || storedTheme === "dark"
        ? storedTheme
        : systemTheme;

    const root = document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
  } catch {
    const theme =
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

    const root = document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
  }
})();
`

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

  const bodyFontClassName = locale === "fa" ? persianFont.className : undefined

  return (
    <html
      lang={config.languageTag}
      dir={config.direction}
      data-locale={locale}
      data-theme="dark"
      className="dark"
      suppressHydrationWarning
    >
      <body className={bodyFontClassName}>
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />

        <ThemeProvider>
          <I18nProvider locale={locale} dictionary={dictionary}>
            <main className="relative">{children}</main>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
