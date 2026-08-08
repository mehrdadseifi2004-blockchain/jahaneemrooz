import { notFound } from "next/navigation"
import { Suspense } from "react"
import { HttpTypes } from "@medusajs/types"

import { Dictionary } from "@i18n/get-dictionary"
import { OptionValueIds } from "@lib/util/product-option-filters"
import InteractiveLink from "@modules/common/components/interactive-link"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"

type CategoryTemplateProps = {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
  optionValueIds?: OptionValueIds
  dictionary: Dictionary
}

export default function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
  optionValueIds,
  dictionary,
}: CategoryTemplateProps) {
  const parsedPage = page ? Number.parseInt(page, 10) : 1

  const pageNumber =
    Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1

  const sort = sortBy || "created_at"

  if (!category || !countryCode) {
    notFound()
  }

  const parents: HttpTypes.StoreProductCategory[] = []

  const getParents = (currentCategory: HttpTypes.StoreProductCategory) => {
    if (currentCategory.parent_category) {
      parents.push(currentCategory.parent_category)
      getParents(currentCategory.parent_category)
    }
  }

  getParents(category)

  const orderedParents = [...parents].reverse()

  return (
    <main className="min-h-screen bg-white pb-20">
      <div className="content-container">
        <div
          className="flex flex-col gap-8 border-t border-black/10 py-6 medium:flex-row medium:items-start"
          data-testid="category-container"
        >
          <aside className="w-full shrink-0 medium:w-[295px]">
            <div className="rounded-[20px] border border-black/10 bg-white px-6 py-5">
              <RefinementList
                sortBy={sort}
                data-testid="sort-by-container"
                hideOptionsPicker
              />
            </div>
          </aside>

          <section className="min-w-0 w-full flex-1">
            <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[var(--theme-text-muted)]">
              {orderedParents.map((parent) => (
                <span key={parent.id} className="contents">
                  <LocalizedClientLink
                    className="transition hover:text-[var(--theme-text)]"
                    href={`/categories/${parent.handle}`}
                    data-testid="sort-by-link"
                  >
                    {parent.name}
                  </LocalizedClientLink>

                  <span aria-hidden="true">
                    <span className="rtl:hidden">→</span>

                    <span className="hidden rtl:inline">←</span>
                  </span>
                </span>
              ))}

              <span className="font-medium text-[var(--theme-text)]">
                {category.name}
              </span>
            </nav>

            <div className="mb-8">
              <h1
                className="text-3xl font-black leading-tight text-[var(--theme-text)] small:text-4xl"
                data-testid="category-page-title"
              >
                {category.name}
              </h1>

              {category.description && (
                <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--theme-text-muted)] small:text-base">
                  {category.description}
                </p>
              )}
            </div>

            {!!category.category_children?.length && (
              <div className="mb-8">
                <ul className="flex flex-wrap gap-3">
                  {category.category_children.map((child) => (
                    <li key={child.id}>
                      <InteractiveLink href={`/categories/${child.handle}`}>
                        {child.name}
                      </InteractiveLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Suspense
              fallback={
                <SkeletonProductGrid
                  numberOfProducts={category.products?.length ?? 8}
                />
              }
            >
              <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
                categoryId={category.id}
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
