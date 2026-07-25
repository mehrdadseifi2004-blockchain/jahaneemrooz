import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm small:p-7">
      <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-950">
            محصولات سبد خرید
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            تعداد یا محصولات موجود در سبد را مدیریت کنید.
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
          {items?.length.toLocaleString("fa-IR") || "۰"} محصول
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {items
          ? [...items]
              .sort((a, b) =>
                (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
              )
              .map((item) => (
                <Item
                  key={item.id}
                  item={item}
                  currencyCode={cart?.currency_code}
                />
              ))
          : repeat(3).map((i) => <SkeletonLineItem key={i} />)}
      </div>
    </div>
  )
}

export default ItemsTemplate