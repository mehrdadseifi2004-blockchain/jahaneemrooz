import { Metadata } from "next"
import { notFound } from "next/navigation"
import { HttpTypes, StoreRegion } from "@medusajs/types"

import { AppLocale, isAppLocale } from "@i18n/config"
import { getDictionary } from "@i18n/get-dictionary"
import { getCategoryByHandle, listCategories } from "@lib/data/categories"
import { listRegions } from "@lib/data/regions"
import { parseOptionValueIds } from "@lib/util/product-option-filters"
import CategoryTemplate from "@modules/categories/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

type CategoryPageParams = {
  locale: string
  category: string[]
  countryCode: string
}

type CategorySearchParams = Record<string, string | string[] | undefined> & {
  sortBy?: SortOptions
  page?: string
  optionValueIds?: string | string[]
}

type Props = {
  params: Promise<CategoryPageParams>
  searchParams: Promise<CategorySearchParams>
}

export async function generateStaticParams() {
  const productCategories = await listCategories()

  if (!productCategories) {
    return []
  }

  const countryCodes = await listRegions().then(
    (regions: StoreRegion[]) =>
      regions
        ?.map((r) => r.countries?.map((c) => c.iso_2))
        .flat()
        .filter(Boolean) as string[],
  )

  const categoryHandles = productCategories.map(
    (category: HttpTypes.StoreProductCategory) => category.handle,
  )

  return countryCodes
    ?.map((countryCode) =>
      categoryHandles.map((handle) => ({
        countryCode,
        category: [handle],
      })),
    )
    .flat()
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params

  if (!isAppLocale(params.locale)) {
    return {}
  }

  try {
    const [productCategory, dictionary] = await Promise.all([
      getCategoryByHandle(params.category),
      getDictionary(params.locale as AppLocale),
    ])

    if (!productCategory) {
      notFound()
    }

    const title = `${productCategory.name} | ${dictionary.category.metadata.brand}`

    const description =
      productCategory.description ||
      dictionary.category.metadata.fallbackDescription.replace(
        "{name}",
        productCategory.name,
      )

    return {
      title,
      description,
    }
  } catch {
    notFound()
  }
}

export default async function CategoryPage(props: Props) {
  const searchParams = await props.searchParams
  const params = await props.params

  if (!isAppLocale(params.locale)) {
    notFound()
  }

  const { sortBy, page } = searchParams

  const optionValueIds = parseOptionValueIds(searchParams)

  const [productCategory, dictionary] = await Promise.all([
    getCategoryByHandle(params.category),
    getDictionary(params.locale as AppLocale),
  ])

  if (!productCategory) {
    notFound()
  }

  return (
    <CategoryTemplate
      category={productCategory}
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
      optionValueIds={optionValueIds}
      dictionary={dictionary}
    />
  )
}
