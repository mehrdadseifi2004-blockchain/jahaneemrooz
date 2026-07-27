import { Suspense } from "react"

import { OptionValueIds } from "@lib/util/product-option-filters"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
  optionValueIds,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  optionValueIds?: OptionValueIds
}) => {
  const pageNumber = page ? Number.parseInt(page, 10) : 1
  const sort = sortBy || "created_at"

  return (
    <main className="min-h-screen bg-white pb-20">
      <div className="content-container">
        <div className="border-t border-black/10 pt-5 small:pt-6">
          {/* Breadcrumb */}
          <nav
            aria-label="مسیر صفحه"
            className="mb-6 flex items-center gap-2 text-sm text-black/60"
          >
            <LocalizedClientLink
              href="/"
              className="transition hover:text-black"
            >
              خانه
            </LocalizedClientLink>

            <span aria-hidden="true">←</span>

            <span className="text-black">فروشگاه</span>
          </nav>

          <div className="flex items-start gap-5">
            {/* Desktop filters */}
            <aside className="hidden w-[295px] shrink-0 medium:block">
              <div className="rounded-[20px] border border-black/10 bg-white px-6 py-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-black">فیلترها</h2>

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

            {/* Products */}
            <section className="min-w-0 flex-1">
              <div className="mb-6 flex flex-col gap-4 small:flex-row small:items-end small:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-black small:text-[32px]">
                    همه محصولات
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-black/60">
                    محصولات دیجیتال، تجهیزات گیمینگ و لوازم جانبی جهان امروز
                  </p>
                </div>

                {/* Mobile filter summary */}
                <div className="rounded-full bg-[#f0f0f0] px-4 py-2 text-sm text-black/60 medium:hidden">
                  مرتب‌سازی و فیلترها در نسخه دسکتاپ
                </div>
              </div>

              <Suspense fallback={<SkeletonProductGrid />}>
                <PaginatedProducts
                  sortBy={sort}
                  page={pageNumber}
                  countryCode={countryCode}
                  optionValueIds={optionValueIds}
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
