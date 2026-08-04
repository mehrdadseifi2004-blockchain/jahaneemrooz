import { clx } from "@modules/common/components/ui"
import { VariantPrice } from "types/global"

export default async function PreviewPrice({ price }: { price: VariantPrice }) {
  if (!price) {
    return null
  }

  return (
    <div className="flex flex-col gap-1">
      {price.price_type === "sale" && (
        <span
          className="text-xs text-slate-500 line-through"
          data-testid="original-price"
        >
          {price.original_price}
        </span>
      )}

      <span
        className={clx("text-base font-black text-[#ff5a00] small:text-xl", {
          "text-[#ff7a1a]": price.price_type === "sale",
        })}
        data-testid="price"
      >
        {price.calculated_price}
      </span>
    </div>
  )
}
