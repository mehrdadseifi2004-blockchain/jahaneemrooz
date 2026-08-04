"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useMemo } from "react"

import { useI18n } from "@i18n/components/i18n-provider"
import {
  OPTION_VALUE_QUERY_KEY,
  parseOptionValueIds,
} from "@lib/util/product-option-filters"

import OptionsPicker from "./options-picker"
import SortProducts, { SortOptions } from "./sort-products"

type RefinementListProps = {
  sortBy: SortOptions
  search?: boolean
  hideOptionsPicker?: boolean
  "data-testid"?: string
}

const RefinementList = ({
  sortBy,
  hideOptionsPicker = false,
  "data-testid": dataTestId,
}: RefinementListProps) => {
  const { dictionary } = useI18n()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateQueryParams = useCallback(
    (updater: (params: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString())

      updater(params)
      params.delete("page")

      const queryString = params.toString()
      const currentQuery = searchParams.toString()
      const nextPath = queryString ? `${pathname}?${queryString}` : pathname
      const currentPath = currentQuery
        ? `${pathname}?${currentQuery}`
        : pathname

      if (nextPath !== currentPath) {
        router.push(nextPath)
      }
    },
    [pathname, router, searchParams],
  )

  const setQueryParams = (name: string, value: string) =>
    updateQueryParams((params) => params.set(name, value))

  const selectedOptionValueIds = useMemo(
    () => parseOptionValueIds(searchParams),
    [searchParams],
  )

  const setOptionValueIds = (valueIds: string[]) =>
    updateQueryParams((params) => {
      params.delete(OPTION_VALUE_QUERY_KEY)

      valueIds.forEach((valueId) =>
        params.append(OPTION_VALUE_QUERY_KEY, valueId),
      )
    })

  const clearFilters = () => {
    updateQueryParams((params) => {
      params.delete("sortBy")
      params.delete(OPTION_VALUE_QUERY_KEY)
    })
  }

  return (
    <div className="flex flex-col">
      <SortProducts
        sortBy={sortBy}
        setQueryParams={setQueryParams}
        data-testid={dataTestId}
      />

      {!hideOptionsPicker && (
        <>
          <div className="my-5 h-px bg-white/10" />

          <OptionsPicker
            selectedValueIds={selectedOptionValueIds}
            setOptionValueIds={setOptionValueIds}
          />
        </>
      )}

      <button
        type="button"
        onClick={clearFilters}
        className="mt-6 h-12 w-full rounded-full border border-[#ff5a00]/50 bg-[#ff5a00]/10 px-5 text-sm font-bold text-[#ff7a1a] transition hover:bg-[#ff5a00] hover:text-white"
      >
        {dictionary.store.filters.clear}
      </button>
    </div>
  )
}

export default RefinementList
