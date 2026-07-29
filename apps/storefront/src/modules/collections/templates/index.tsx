import { Suspense } from "react"
import { HttpTypes } from "@medusajs/types"

import { Dictionary } from "@i18n/get-dictionary"
import { OptionValueIds } from "@lib/util/product-option-filters"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"

type CollectionTemplateProps = {
  sortBy?: SortOptions
  collection: HttpTypes.StoreCollection
  page?: string
  countryCode: string
  optionValueIds?: OptionValueIds
  dictionary: Dictionary
}

export default function CollectionTemplate({
  sortBy,
  collection,
  page,
  countryCode,
  optionValueIds,
  dictionary,
}: CollectionTemplateProps) {
  const parsedPage = page ? Number.parseInt(page, 10) : 1

  const pageNumber =
    Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1

  const sort = sortBy || "created_at"

  return (
    <main className="min-h-screen bg-white pb-20">
      <div className="content-container">
        <div className="flex flex-col gap-8 border-t border-black/10 py-6 medium:flex-row medium:items-start">
          <aside className="w-full shrink-0 medium:w-[295px]">
            <div className="rounded-[20px] border border-black/10 bg-white px-6 py-5">
              <RefinementList sortBy={sort} hideOptionsPicker />
            </div>
          </aside>

          <section className="min-w-0 w-full flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-black leading-tight text-black small:text-4xl">
                {collection.title}
              </h1>
            </div>

            <Suspense
              fallback={
                <SkeletonProductGrid
                  numberOfProducts={collection.products?.length}
                />
              }
            >
              <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
                collectionId={collection.id}
                countryCode={countryCode}
                optionValueIds={optionValueIds}
                dictionary={dictionary}
              />
            </Suspense>
          </section>
        </div>
      </div>
    </main>
  )
}
