import { Metadata } from "next"
import { notFound } from "next/navigation"
import { StoreCollection, StoreRegion } from "@medusajs/types"

import { AppLocale, isAppLocale } from "@i18n/config"
import { getDictionary } from "@i18n/get-dictionary"
import { getCollectionByHandle, listCollections } from "@lib/data/collections"
import { listRegions } from "@lib/data/regions"
import { parseOptionValueIds } from "@lib/util/product-option-filters"
import CollectionTemplate from "@modules/collections/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

type CollectionPageParams = {
  locale: string
  handle: string
  countryCode: string
}

type CollectionSearchParams = Record<string, string | string[] | undefined> & {
  page?: string
  sortBy?: SortOptions
  optionValueIds?: string | string[]
}

type Props = {
  params: Promise<CollectionPageParams>
  searchParams: Promise<CollectionSearchParams>
}

export const PRODUCT_LIMIT = 12

export async function generateStaticParams() {
  const { collections } = await listCollections({
    fields: "*products",
  })

  if (!collections) {
    return []
  }

  const countryCodes = await listRegions().then(
    (regions: StoreRegion[]) =>
      regions
        ?.map((r) => r.countries?.map((c) => c.iso_2))
        .flat()
        .filter(Boolean) as string[],
  )

  const collectionHandles = collections
    .map((collection: StoreCollection) => collection.handle)
    .filter(Boolean) as string[]

  return countryCodes
    ?.map((countryCode) =>
      collectionHandles.map((handle) => ({
        countryCode,
        handle,
      })),
    )
    .flat()
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params

  if (!isAppLocale(params.locale)) {
    return {}
  }

  const [collection, dictionary] = await Promise.all([
    getCollectionByHandle(params.handle),
    getDictionary(params.locale as AppLocale),
  ])

  if (!collection) {
    notFound()
  }

  return {
    title: `${collection.title} | ${dictionary.collection.metadata.brand}`,
    description: dictionary.collection.metadata.description.replace(
      "{name}",
      collection.title,
    ),
  }
}

export default async function CollectionPage(props: Props) {
  const searchParams = await props.searchParams
  const params = await props.params

  if (!isAppLocale(params.locale)) {
    notFound()
  }

  const { sortBy, page } = searchParams

  const optionValueIds = parseOptionValueIds(searchParams)

  const [collection, dictionary] = await Promise.all([
    getCollectionByHandle(params.handle),
    getDictionary(params.locale as AppLocale),
  ])

  if (!collection) {
    notFound()
  }

  return (
    <CollectionTemplate
      collection={collection}
      page={page}
      sortBy={sortBy}
      countryCode={params.countryCode}
      optionValueIds={optionValueIds}
      dictionary={dictionary}
    />
  )
}
