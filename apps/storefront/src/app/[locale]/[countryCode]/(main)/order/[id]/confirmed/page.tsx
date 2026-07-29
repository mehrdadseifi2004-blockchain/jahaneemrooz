import { Metadata } from "next"
import { notFound } from "next/navigation"

import { AppLocale, isAppLocale } from "@i18n/config"
import { getDictionary } from "@i18n/get-dictionary"
import { retrieveOrder } from "@lib/data/orders"
import OrderCompletedTemplate from "@modules/order/templates/order-completed-template"

type Props = {
  params: Promise<{
    locale: string
    countryCode: string
    id: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: requestedLocale } = await params

  if (!isAppLocale(requestedLocale)) {
    return {}
  }

  const dictionary = await getDictionary(requestedLocale as AppLocale)

  return {
    title: dictionary.order.metadata.title,
    description: dictionary.order.metadata.description,
  }
}

export default async function OrderConfirmedPage({ params }: Props) {
  const { id, locale: requestedLocale } = await params

  if (!isAppLocale(requestedLocale)) {
    notFound()
  }

  const [order, dictionary] = await Promise.all([
    retrieveOrder(id).catch(() => null),
    getDictionary(requestedLocale as AppLocale),
  ])

  if (!order) {
    return notFound()
  }

  return <OrderCompletedTemplate order={order} dictionary={dictionary} />
}
