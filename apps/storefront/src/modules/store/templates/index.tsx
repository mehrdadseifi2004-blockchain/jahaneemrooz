import { Suspense } from "react"

import { Dictionary } from "@i18n/get-dictionary"
import { OptionValueIds } from "@lib/util/product-option-filters"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

type StoreTemplateProps = {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  optionValueIds?: OptionValueIds
  dictionary: Dictionary
}

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
  optionValueIds,
  dictionary,
}: StoreTemplateProps) => {
  const parsedPage = page ? Number.parseInt(page, 10) : 1
  const pageNumber =
    Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1

  const sort = sortBy || "created_at"

  return (
    <main className="min-h-screen bg-white pb-20">
      <div className="content-container">
        <div className="border-t border-black/10 pt-5 small:pt-6">
          <nav
            aria-label={dictionary.store.breadcrumb.ariaLabel}
            className="mb-6 flex items-center gap-2 text-sm text-black/60"
          >
            <LocalizedClientLink
              href="/"
              className="transition hover:text-black"
            >
              {dictionary.store.breadcrumb.home}
            </LocalizedClientLink>

            <span aria-hidden="true">
              <span className="rtl:hidden">→</span>
              <span className="hidden rtl:inline">←</span>
            </span>

            <span className="text-black">
              {dictionary.store.breadcrumb.store}
            </span>
          </nav>

          <div className="flex items-start gap-5">
            <aside className="hidden w-[295px] shrink-0 medium:block">
              <div className="rounded-[20px] border border-black/10 bg-white px-6 py-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-black">
                    {dictionary.store.filters.title}
                  </h2>

                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-black/40"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 7H14M18 7H20M4 17H10M14 17H20M14 4V10M10 14V20"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="my-5 h-px bg-black/10" />

                <RefinementList
                  sortBy={sort}
                  data-testid="store-refinement-list"
                />
              </div>
            </aside>

            <section className="min-w-0 flex-1">
              <div className="mb-6 flex flex-col gap-4 small:flex-row small:items-end small:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-black small:text-[32px]">
                    {dictionary.store.title}
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-black/60">
                    {dictionary.store.description}
                  </p>
                </div>

                <div className="rounded-full bg-[#f0f0f0] px-4 py-2 text-sm text-black/60 medium:hidden">
                  {dictionary.store.filters.mobileNotice}
                </div>
              </div>

              <Suspense fallback={<SkeletonProductGrid />}>
                <PaginatedProducts
                  sortBy={sort}
                  page={pageNumber}
                  countryCode={countryCode}
                  optionValueIds={optionValueIds}
                  dictionary={dictionary}
                />
              </Suspense>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}

export default StoreTemplate
