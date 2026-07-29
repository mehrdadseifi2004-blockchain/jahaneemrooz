import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"

import { AppLocale, isAppLocale } from "@i18n/config"
import { getDictionary } from "@i18n/get-dictionary"
import VerifyAccount from "@modules/account/components/verify-account"

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
    title: dictionary.accountPages.metadata.verifyAccount.title,
    description: dictionary.accountPages.metadata.verifyAccount.description,
  }
}

export default async function VerifyAccountPage({ params }: Props) {
  const { locale } = await params

  if (!isAppLocale(locale)) {
    notFound()
  }

  const dictionary = await getDictionary(locale as AppLocale)

  return (
    <div className="flex w-full justify-center px-8 py-12">
      <Suspense
        fallback={
          <p className="text-base-regular text-ui-fg-base">
            {dictionary.accountPages.verifyAccount.loading}
          </p>
        }
      >
        <VerifyAccount />
      </Suspense>
    </div>
  )
}
