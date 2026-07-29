import { Metadata } from "next"
import { notFound } from "next/navigation"

import { AppLocale, isAppLocale } from "@i18n/config"
import { getDictionary } from "@i18n/get-dictionary"
import { retrieveCustomer } from "@lib/data/customer"
import { getRegion } from "@lib/data/regions"
import AddressBook from "@modules/account/components/address-book"

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
    title: dictionary.accountPages.metadata.addresses.title,
    description: dictionary.accountPages.metadata.addresses.description,
  }
}

export default async function Addresses({ params }: Props) {
  const { locale, countryCode } = await params

  if (!isAppLocale(locale)) {
    notFound()
  }

  const [customer, region, dictionary] = await Promise.all([
    retrieveCustomer(),
    getRegion(countryCode),
    getDictionary(locale as AppLocale),
  ])

  if (!customer || !region) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="addresses-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">
          {dictionary.accountPages.addresses.title}
        </h1>

        <p className="text-base-regular">
          {dictionary.accountPages.addresses.description}
        </p>
      </div>

      <AddressBook customer={customer} region={region} />
    </div>
  )
}
