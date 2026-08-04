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
    <main className="min-h-screen bg-[#070b10] pb-20 text-white">
      <div className="content-container">
        <div className="border-t border-white/10 pt-5 small:pt-6">
          <nav
            aria-label={dictionary.store.breadcrumb.ariaLabel}
            className="mb-6 flex items-center gap-2 text-sm text-slate-500"
          >
            <LocalizedClientLink
              href="/"
              className="transition hover:text-[#ff7a1a]"
            >
              {dictionary.store.breadcrumb.home}
            </LocalizedClientLink>

            <span aria-hidden="true">
              <span className="rtl:hidden">→</span>
              <span className="hidden rtl:inline">←</span>
            </span>

            <span className="text-white">
              {dictionary.store.breadcrumb.store}
            </span>
          </nav>

          <div className="flex items-start gap-5">
            <aside className="hidden w-[295px] shrink-0 medium:block">
              <div className="rounded-[24px] border border-white/10 bg-[#111923] px-6 py-5 shadow-[0_18px_50px_rgba(0,0,0,0.25)]">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">
                    {dictionary.store.filters.title}
                  </h2>

                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-[#ff5a00]"
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

                <div className="my-5 h-px bg-white/10" />

                <RefinementList
                  sortBy={sort}
                  data-testid="store-refinement-list"
                />
              </div>
            </aside>

            <section className="min-w-0 flex-1">
              <div className="mb-6 flex flex-col gap-4 small:flex-row small:items-end small:justify-between">
                <div>
                  <h1 className="text-2xl font-black text-white small:text-[32px]">
                    {dictionary.store.title}
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {dictionary.store.description}
                  </p>
                </div>

                <div className="rounded-full border border-[#ff5a00]/25 bg-[#ff5a00]/10 px-4 py-2 text-sm text-[#ff7a1a] medium:hidden">
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
