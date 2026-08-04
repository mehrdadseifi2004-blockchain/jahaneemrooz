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
    return (
      <div className="h-10 w-36 animate-pulse rounded-full bg-white/[0.06]" />
    )
  }

  return (
    <div dir="auto" className="flex flex-wrap items-center gap-3">
      <span
        className="text-2xl font-black text-[#ff5a00] small:text-[32px]"
        data-testid="product-price"
        data-value={selectedPrice.calculated_price_number}
      >
        {selectedPrice.calculated_price}
      </span>

      {selectedPrice.price_type === "sale" && (
        <>
          <span
            className="text-xl font-bold text-slate-500 line-through small:text-2xl"
            data-testid="original-product-price"
            data-value={selectedPrice.original_price_number}
          >
            {selectedPrice.original_price}
          </span>

          <span className="rounded-full border border-rose-500/25 bg-rose-500/10 px-3.5 py-1.5 text-xs font-bold text-rose-400">
            %{selectedPrice.percentage_diff}-
          </span>
        </>
      )}
    </div>
  )
}
