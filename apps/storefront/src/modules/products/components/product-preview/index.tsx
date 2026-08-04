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
      className="group flex h-full min-w-0 flex-col items-start rounded-[24px] border border-white/10 bg-[#111923] p-3 shadow-[0_16px_45px_rgba(0,0,0,0.2)] transition duration-300 hover:-translate-y-1 hover:border-[#ff5a00]/60 hover:shadow-[0_22px_60px_rgba(255,90,0,0.12)] small:p-4"
      data-testid="product-wrapper"
    >
      <Thumbnail
        thumbnail={product.thumbnail}
        images={product.images}
        size="square"
        isFeatured={isFeatured}
        className="mb-3 w-full rounded-[18px] border border-white/5 bg-[#0c1219] p-0 shadow-none small:mb-4 small:rounded-[20px]"
      />

      <div className="flex w-full flex-1 flex-col px-1 pb-1">
        <h3
          className="line-clamp-2 min-h-11 w-full text-start text-sm font-bold leading-6 text-white transition group-hover:text-[#ff7a1a] small:min-h-14 small:text-base medium:text-lg"
          data-testid="product-title"
        >
          {product.title}
        </h3>

        <ProductRating>
          <div className="flex items-center gap-0.5 text-sm text-[#ffb020] small:text-lg">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>

            <span className="relative inline-block">
              <span className="text-white/10">★</span>

              <span className="absolute inset-0 w-1/2 overflow-hidden text-[#ffb020]">
                ★
              </span>
            </span>
          </div>

          <span className="text-xs text-slate-300 small:text-sm">
            4.5
            <span className="text-slate-500">/5</span>
          </span>
        </ProductRating>

        <div
          dir="auto"
          className="mt-auto flex min-h-10 w-full items-end pt-2 text-start"
        >
          {cheapestPrice ? (
            <PreviewPrice price={cheapestPrice} />
          ) : (
            <ProductContactPrice />
          )}
        </div>
      </div>
    </LocalizedClientLink>
  )
}
