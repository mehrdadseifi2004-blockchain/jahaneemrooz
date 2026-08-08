import { Dictionary } from "@i18n/get-dictionary"
import { listProductsWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { OptionValueIds } from "@lib/util/product-option-filters"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  order?: string
}

type PaginatedProductsProps = {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  countryCode: string
  optionValueIds?: OptionValueIds
  dictionary: Dictionary
}

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
  optionValueIds,
  dictionary,
}: PaginatedProductsProps) {
  const queryParams: PaginatedProductsParams = {
    limit: PRODUCT_LIMIT,
  }

  if (collectionId) {
    queryParams.collection_id = [collectionId]
  }

  if (categoryId) {
    queryParams.category_id = [categoryId]
  }

  if (productsIds) {
    queryParams.id = productsIds
  }

  if (sortBy === "created_at") {
    queryParams.order = "created_at"
  }

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const {
    response: { products, count },
  } = await listProductsWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
    optionValueIds,
  })

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)
  const firstProduct = count === 0 ? 0 : (page - 1) * PRODUCT_LIMIT + 1
  const lastProduct = Math.min(page * PRODUCT_LIMIT, count)

  const resultsSummary = dictionary.store.results.summary
    .replace("{first}", String(firstProduct))
    .replace("{last}", String(lastProduct))
    .replace("{count}", String(count))

  return (
    <>
      <div className="mb-5 flex items-center justify-between border-b border-[var(--theme-border)] pb-5">
        <p className="text-sm text-[var(--theme-text-muted)]">
          {resultsSummary}
        </p>
      </div>

      {products.length ? (
        <ul
          className="grid w-full grid-cols-2 gap-x-4 gap-y-8 small:gap-x-5 medium:grid-cols-2 large:grid-cols-3"
          data-testid="products-list"
        >
          {products.map((product) => (
            <li key={product.id} className="min-w-0">
              <ProductPreview product={product} region={region} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[24px] border border-[var(--theme-border)] bg-[var(--theme-surface)] px-6 text-center shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
          <span className="text-5xl" aria-hidden="true">
            🔍
          </span>

          <h2 className="mt-5 text-xl font-bold text-white">
            {dictionary.store.results.notFoundTitle}
          </h2>

          <p className="mt-2 max-w-md text-sm leading-7 text-[var(--theme-text-muted)]">
            {dictionary.store.results.notFoundDescription}
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
        />
      )}
    </>
  )
}
