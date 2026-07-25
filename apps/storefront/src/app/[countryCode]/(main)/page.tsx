import { Metadata } from "next"

import Hero from "@modules/home/components/hero"
import LatestProducts from "@modules/home/components/latest-products"
import { getRegion } from "@lib/data/regions"
import CategoryGrid from "@modules/home/components/category-grid"

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
      <CategoryGrid />
      <LatestProducts region={region} />
    </>
  )
}