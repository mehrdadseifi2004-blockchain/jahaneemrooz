import { Metadata } from "next"
import { notFound } from "next/navigation"

import { AppLocale, isAppLocale } from "@i18n/config"
import { getDictionary } from "@i18n/get-dictionary"
import { parseOptionValueIds } from "@lib/util/product-option-filters"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

type StorePageSearchParams = Record<string, string | string[] | undefined> & {
  sortBy?: SortOptions
  page?: string
  optionValueIds?: string | string[]
}

type StorePageParams = {
  locale: string
  countryCode: string
}

type Params = {
  searchParams: Promise<StorePageSearchParams>
  params: Promise<StorePageParams>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<StorePageParams>
}): Promise<Metadata> {
  const { locale: requestedLocale } = await params

  if (!isAppLocale(requestedLocale)) {
    return {}
  }

  const dictionary = await getDictionary(requestedLocale as AppLocale)

  return {
    title: dictionary.store.metadata.title,
    description: dictionary.store.metadata.description,
  }
}

export default async function StorePage(props: Params) {
  const params = await props.params
  const searchParams = await props.searchParams

  if (!isAppLocale(params.locale)) {
    notFound()
  }

  const dictionary = await getDictionary(params.locale as AppLocale)

  const { sortBy, page } = searchParams
  const optionValueIds = parseOptionValueIds(searchParams)

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
      optionValueIds={optionValueIds}
      dictionary={dictionary}
    />
  )
}
