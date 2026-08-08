import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items

  const sortedItems = items
    ? [...items].sort((a, b) =>
        (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1,
      )
    : null

  return (
    <div className="rounded-[24px] border border-[var(--theme-border)] bg-[var(--theme-surface)] px-4 py-3 shadow-[0_18px_55px_var(--theme-shadow)] transition-colors duration-300 small:px-6 small:py-5">
      <div className="divide-y divide-[var(--theme-border)]">
        {sortedItems
          ? sortedItems.map((item) => (
              <Item
                key={item.id}
                item={item}
                currencyCode={cart?.currency_code ?? ""}
              />
            ))
          : repeat(3).map((index) => (
              <div key={index} className="py-5">
                <SkeletonLineItem />
              </div>
            ))}
      </div>
    </div>
  )
}

export default ItemsTemplate
