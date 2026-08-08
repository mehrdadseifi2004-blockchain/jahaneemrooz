import { Dictionary } from "@i18n/get-dictionary"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { HttpTypes } from "@medusajs/types"

import ProductPreview from "../product-preview"

type RelatedProductsProps = {
  product: HttpTypes.StoreProduct
  countryCode: string
  dictionary: Dictionary
}

export default async function RelatedProducts({
  product,
  countryCode,
  dictionary,
}: RelatedProductsProps) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const queryParams: HttpTypes.StoreProductListParams = {
    limit: 4,
    is_giftcard: false,
    fields: "*variants.calculated_price,*categories",
  }

  if (region.id) {
    queryParams.region_id = region.id
  }

  if (product.collection_id) {
    queryParams.collection_id = [product.collection_id]
  }

  if (product.tags?.length) {
    queryParams.tag_id = product.tags
      .map((tag) => tag.id)
      .filter(Boolean) as string[]
  }

  const products = await listProducts({
    queryParams,
    countryCode,
  }).then(({ response }) =>
    response.products
      .filter((relatedProduct) => relatedProduct.id !== product.id)
      .slice(0, 4),
  )

  if (!products.length) {
    return null
  }

  return (
    <div>
      <h2 className="mb-8 text-center text-[32px] font-black leading-tight tracking-[-0.03em] text-[var(--theme-text)] small:mb-14 small:text-5xl">
        {dictionary.product.related.title}
      </h2>

      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 small:gap-x-5 medium:grid-cols-4">
        {products.map((relatedProduct) => (
          <li key={relatedProduct.id} className="min-w-0">
            <ProductPreview region={region} product={relatedProduct} />
          </li>
        ))}
      </ul>
    </div>
  )
}
