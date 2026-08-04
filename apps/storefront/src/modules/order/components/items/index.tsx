import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import Item from "@modules/order/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsProps = {
  order: HttpTypes.StoreOrder
}

const Items = ({ order }: ItemsProps) => {
  const sortedItems = order.items
    ? [...order.items].sort((a, b) =>
        (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1,
      )
    : null

  return (
    <div className="divide-y divide-white/10" data-testid="products-table">
      {sortedItems?.length
        ? sortedItems.map((item) => (
            <Item
              key={item.id}
              item={item}
              currencyCode={order.currency_code}
            />
          ))
        : repeat(3).map((index) => <SkeletonLineItem key={index} />)}
    </div>
  )
}

export default Items
