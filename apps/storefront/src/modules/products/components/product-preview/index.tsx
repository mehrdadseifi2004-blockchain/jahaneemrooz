import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import Thumbnail from "../thumbnail"
import { ProductContactPrice, ProductRating } from "./localized-content"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region: _region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group flex min-w-0 flex-col items-start"
      data-testid="product-wrapper"
    >
      <Thumbnail
        thumbnail={product.thumbnail}
        images={product.images}
        size="square"
        isFeatured={isFeatured}
        className="mb-2.5 w-full rounded-[13px] border-0 bg-[#f0eeed] p-0 shadow-none small:mb-4 small:rounded-[20px]"
      />

      <h3
        className="line-clamp-2 min-h-11 w-full text-start text-sm font-bold leading-6 text-black small:min-h-14 small:text-base medium:text-xl"
        data-testid="product-title"
      >
        {product.title}
      </h3>

      <ProductRating>
        <div className="flex items-center gap-0.5 text-sm text-[#ffc633] small:text-lg">
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>

          <span className="relative inline-block">
            <span className="text-black/10">★</span>

            <span className="absolute inset-0 w-1/2 overflow-hidden text-[#ffc633]">
              ★
            </span>
          </span>
        </div>

        <span className="text-xs text-black small:text-sm">
          4.5
          <span className="text-black/60">/5</span>
        </span>
      </ProductRating>

      <div
        dir="auto"
        className="mt-1 flex min-h-8 w-full items-center text-start"
      >
        {cheapestPrice ? (
          <PreviewPrice price={cheapestPrice} />
        ) : (
          <ProductContactPrice />
        )}
      </div>
    </LocalizedClientLink>
  )
}
