import { Metadata } from "next"

import { getRegion } from "@lib/data/regions"
import Brands from "@modules/home/components/brands"
import CategoryGrid from "@modules/home/components/category-grid"
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
      <CategoryGrid />
      <LatestProducts region={region} />
    </>
  )
}
