import { Suspense } from "react"

import { OptionValueIds } from "@lib/util/product-option-filters"
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
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <main className="bg-slate-50 min-h-screen">

      {/* Store Hero */}
      <section className="bg-slate-950 text-white py-16">
        <div className="content-container">

          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-slate-300">
            فروشگاه آنلاین محصولات دیجیتال
          </span>

          <h1 className="mt-5 text-4xl font-bold small:text-5xl">
            دنیای دیجیتال جهان امروز
          </h1>

          <p className="mt-4 max-w-2xl text-slate-300 leading-8">
            خرید انواع فلش، هدفون، تجهیزات گیمینگ،
            گیفت کارت، اکانت‌های دیجیتال و نرم افزار
            با تجربه‌ای سریع و مطمئن.
          </p>

        </div>
      </section>


      {/* Products */}
      <section className="py-10">

        <div
          className="content-container flex flex-col gap-8 small:flex-row small:items-start"
        >

          {/* Filters */}
          <aside className="small:w-[260px]">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h2 className="mb-5 text-lg font-bold text-slate-900">
                مرتب سازی و فیلتر
              </h2>

              <RefinementList
                sortBy={sort}
                hideOptionsPicker
              />

            </div>
          </aside>


          {/* Products */}
          <div className="flex-1">

            <div className="mb-8 flex items-center justify-between">

              <div>
                <p className="text-sm text-blue-600 font-semibold">
                  محصولات فروشگاه
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-950">
                  همه محصولات
                </h2>
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


          </div>

        </div>

      </section>

    </main>
  )
}

export default StoreTemplate