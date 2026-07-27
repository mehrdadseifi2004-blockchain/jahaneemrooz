import { Metadata } from "next"

import { getRegion } from "@lib/data/regions"
import BestSellingProducts from "@modules/home/components/best-selling-products"
import Brands from "@modules/home/components/brands"
import CategoryGrid from "@modules/home/components/category-grid"
import CustomerReviews from "@modules/home/components/customer-reviews"
import Hero from "@modules/home/components/hero"
import LatestProducts from "@modules/home/components/latest-products"

export const metadata: Metadata = {
  title: "جهان امروز | فروشگاه آنلاین محصولات دیجیتال",
  description:
    "فروش آنلاین محصولات دیجیتال، تجهیزات گیمینگ، لوازم جانبی، گیفت کارت، اکانت و نرم‌افزار",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await props.params

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  return (
    <>
      <Hero />

      <Brands />

      <LatestProducts region={region} />

      <BestSellingProducts region={region} />

      <CategoryGrid />

      <CustomerReviews />
    </>
  )
}
