import { Metadata } from "next"
import { notFound } from "next/navigation"

import { AppLocale, isAppLocale } from "@i18n/config"
import { getDictionary } from "@i18n/get-dictionary"
import { retrieveCustomer } from "@lib/data/customer"
import { listOrders } from "@lib/data/orders"
import Overview from "@modules/account/components/overview"

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
    title: dictionary.accountPages.metadata.overview.title,
    description: dictionary.accountPages.metadata.overview.description,
  }
}

export default async function OverviewTemplate({ params }: Props) {
  const { locale } = await params

  if (!isAppLocale(locale)) {
    notFound()
  }

  const [customer, orders] = await Promise.all([
    retrieveCustomer().catch(() => null),
    listOrders().catch(() => null),
  ])

  if (!customer) {
    notFound()
  }

  return <Overview customer={customer} orders={orders || null} />
}
