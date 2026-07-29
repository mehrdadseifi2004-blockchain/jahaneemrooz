"use client"

import { useI18n } from "@i18n/components/i18n-provider"
import FilterRadioGroup from "@modules/common/components/filter-radio-group"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: string) => void
  "data-testid"?: string
}

const SortProducts = ({
  "data-testid": dataTestId,
  sortBy,
  setQueryParams,
}: SortProductsProps) => {
  const { dictionary } = useI18n()

  const sortOptions = [
    {
      value: "created_at",
      label: dictionary.store.filters.newest,
    },
    {
      value: "price_asc",
      label: dictionary.store.filters.priceLowToHigh,
    },
    {
      value: "price_desc",
      label: dictionary.store.filters.priceHighToLow,
    },
  ]

  const handleChange = (value: string) => {
    setQueryParams("sortBy", value as SortOptions)
  }

  return (
    <div className="text-start">
      <FilterRadioGroup
        title={dictionary.store.filters.sortTitle}
        items={sortOptions}
        value={sortBy}
        handleChange={handleChange}
        data-testid={dataTestId}
      />
    </div>
  )
}

export default SortProducts
