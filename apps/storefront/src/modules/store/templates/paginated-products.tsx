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

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
  optionValueIds,
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  countryCode: string
  optionValueIds?: OptionValueIds
}) {
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

  return (
    <>
      <div className="mb-5 flex items-center justify-between border-b border-black/10 pb-5">
        <p className="text-sm text-black/60">
          نمایش {firstProduct} تا {lastProduct} از {count} محصول
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
        <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[20px] border border-black/10 px-6 text-center">
          <span className="text-5xl" aria-hidden="true">
            🔍
          </span>

          <h2 className="mt-5 text-xl font-bold text-black">محصولی پیدا نشد</h2>

          <p className="mt-2 max-w-md text-sm leading-7 text-black/60">
            فیلترهای انتخاب‌شده را تغییر دهید یا همه فیلترها را پاک کنید.
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
