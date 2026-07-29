import { Metadata } from "next"
import { notFound } from "next/navigation"

import { AppLocale, isAppLocale } from "@i18n/config"
import { getDictionary } from "@i18n/get-dictionary"
import LoginTemplate from "@modules/account/templates/login-template"

type Props = {
  params: Promise<{
    locale: string
    countryCode: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  if (!isAppLocale(locale)) {
    return {}
  }

  const dictionary = await getDictionary(locale as AppLocale)

  return {
    title: dictionary.accountPages.metadata.login.title,
    description: dictionary.accountPages.metadata.login.description,
  }
}

export default async function Login({ params }: Props) {
  const { locale } = await params

  if (!isAppLocale(locale)) {
    notFound()
  }

  return <LoginTemplate />
}
