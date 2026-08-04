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
      <div className="mb-8 flex flex-col gap-y-3 rounded-[20px] border border-white/10 bg-[#111923] p-5 small:p-6">
        <h1 className="text-3xl font-black tracking-[-0.03em] text-white">
          {dictionary.accountPages.addresses.title}
        </h1>

        <p className="text-sm leading-7 text-slate-400">
          {dictionary.accountPages.addresses.description}
        </p>
      </div>

      <AddressBook customer={customer} region={region} />
    </div>
  )
}
