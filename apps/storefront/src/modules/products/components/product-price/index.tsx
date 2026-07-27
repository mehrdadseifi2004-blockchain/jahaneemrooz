import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="h-10 w-36 animate-pulse rounded bg-black/5" />
  }

  return (
    <div dir="rtl" className="flex flex-wrap items-center gap-3">
      <span
        className="text-2xl font-bold text-black small:text-[32px]"
        data-testid="product-price"
        data-value={selectedPrice.calculated_price_number}
      >
        {selectedPrice.calculated_price}
      </span>

      {selectedPrice.price_type === "sale" && (
        <>
          <span
            className="text-xl font-bold text-black/40 line-through small:text-2xl"
            data-testid="original-product-price"
            data-value={selectedPrice.original_price_number}
          >
            {selectedPrice.original_price}
          </span>

          <span className="rounded-full bg-[#ff3333]/10 px-3.5 py-1.5 text-xs font-medium text-[#ff3333]">
            %{selectedPrice.percentage_diff}-
          </span>
        </>
      )}
    </div>
  )
}
