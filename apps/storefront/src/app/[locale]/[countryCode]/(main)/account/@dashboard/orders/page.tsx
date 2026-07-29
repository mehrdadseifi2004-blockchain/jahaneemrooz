import { Metadata } from "next"
import { notFound } from "next/navigation"

import { AppLocale, isAppLocale } from "@i18n/config"
import { getDictionary } from "@i18n/get-dictionary"
import { listOrders } from "@lib/data/orders"
import TransferRequestForm from "@modules/account/components/transfer-request-form"
import OrderOverview from "@modules/account/components/order-overview"
import Divider from "@modules/common/components/divider"

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
    title: dictionary.accountPages.metadata.orders.title,
    description: dictionary.accountPages.metadata.orders.description,
  }
}

export default async function Orders({ params }: Props) {
  const { locale } = await params

  if (!isAppLocale(locale)) {
    notFound()
  }

  const [orders, dictionary] = await Promise.all([
    listOrders(),
    getDictionary(locale as AppLocale),
  ])

  if (!orders) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="orders-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">
          {dictionary.accountPages.orders.title}
        </h1>

        <p className="text-base-regular">
          {dictionary.accountPages.orders.description}
        </p>
      </div>

      <div>
        <OrderOverview orders={orders} />

        <Divider className="mb-8 mt-8" />

        <TransferRequestForm />
      </div>
    </div>
  )
}
