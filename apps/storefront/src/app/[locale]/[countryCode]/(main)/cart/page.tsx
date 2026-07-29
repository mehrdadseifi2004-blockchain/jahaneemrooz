import { Metadata } from "next"
import { notFound } from "next/navigation"

import { AppLocale, isAppLocale } from "@i18n/config"
import { getDictionary } from "@i18n/get-dictionary"
import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import CartTemplate from "@modules/cart/templates"

type CartPageParams = {
  locale: string
  countryCode: string
}

export async function generateMetadata({
  params,
}: {
  params: Promise<CartPageParams>
}): Promise<Metadata> {
  const { locale: requestedLocale } = await params

  if (!isAppLocale(requestedLocale)) {
    return {}
  }

  const dictionary = await getDictionary(requestedLocale as AppLocale)

  return {
    title: dictionary.cart.metadata.title,
    description: dictionary.cart.metadata.description,
  }
}

export default async function Cart({
  params,
}: {
  params: Promise<CartPageParams>
}) {
  const { locale: requestedLocale } = await params

  if (!isAppLocale(requestedLocale)) {
    notFound()
  }

  const locale = requestedLocale as AppLocale

  const [cart, customer, dictionary] = await Promise.all([
    retrieveCart().catch((error) => {
      console.error(error)
      return null
    }),
    retrieveCustomer(),
    getDictionary(locale),
  ])

  return (
    <CartTemplate
      cart={cart}
      customer={customer}
      dictionary={dictionary}
      locale={locale}
    />
  )
}
