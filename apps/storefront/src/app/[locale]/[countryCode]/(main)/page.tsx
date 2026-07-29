import { Metadata } from "next"
import { notFound } from "next/navigation"

import { AppLocale, isAppLocale } from "@i18n/config"
import { getDictionary } from "@i18n/get-dictionary"
import { getRegion } from "@lib/data/regions"
import BestSellingProducts from "@modules/home/components/best-selling-products"
import Brands from "@modules/home/components/brands"
import CategoryGrid from "@modules/home/components/category-grid"
import CustomerReviews from "@modules/home/components/customer-reviews"
import Hero from "@modules/home/components/hero"
import LatestProducts from "@modules/home/components/latest-products"

type HomePageParams = {
  locale: string
  countryCode: string
}

export async function generateMetadata({
  params,
}: {
  params: Promise<HomePageParams>
}): Promise<Metadata> {
  const { locale: requestedLocale } = await params

  if (!isAppLocale(requestedLocale)) {
    return {}
  }

  const dictionary = await getDictionary(requestedLocale as AppLocale)

  return {
    title: dictionary.home.metadata.title,
    description: dictionary.home.metadata.description,
  }
}

export default async function Home({
  params,
}: {
  params: Promise<HomePageParams>
}) {
  const { locale: requestedLocale, countryCode } = await params

  if (!isAppLocale(requestedLocale)) {
    notFound()
  }

  const locale = requestedLocale as AppLocale

  const [region, dictionary] = await Promise.all([
    getRegion(countryCode),
    getDictionary(locale),
  ])

  if (!region) {
    notFound()
  }

  return (
    <>
      <Hero dictionary={dictionary} />

      <Brands dictionary={dictionary} />

      <LatestProducts region={region} dictionary={dictionary} />

      <BestSellingProducts region={region} dictionary={dictionary} />

      <CategoryGrid dictionary={dictionary} />

      <CustomerReviews dictionary={dictionary} />
    </>
  )
}
