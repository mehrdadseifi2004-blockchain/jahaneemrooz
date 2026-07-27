import { HttpTypes } from "@medusajs/types"
import Item from "@modules/cart/components/item"

type ItemsPreviewTemplateProps = {
  cart: HttpTypes.StoreCart
}

const ItemsPreviewTemplate = ({ cart }: ItemsPreviewTemplateProps) => {
  const sortedItems = cart.items
    ? [...cart.items].sort((a, b) =>
        (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1,
      )
    : []

  return (
    <div className="divide-y divide-black/10" data-testid="items-preview">
      {sortedItems.map((item) => (
        <Item
          key={item.id}
          item={item}
          type="preview"
          currencyCode={cart.currency_code}
        />
      ))}
    </div>
  )
}

export default ItemsPreviewTemplate
