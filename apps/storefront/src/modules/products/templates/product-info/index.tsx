import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const digitalCategoryHandles = [
  "gift-cards",
  "accounts-subscriptions",
  "software",
]

const ProductInfo = ({ product }: ProductInfoProps) => {
  const isDigital =
    product.categories?.some((category) =>
      digitalCategoryHandles.includes(category.handle || "")
    ) ?? false

  const category = product.categories?.[0]

  return (
    <div id="product-info">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${
            isDigital
              ? "bg-violet-100 text-violet-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {isDigital ? "محصول دیجیتال" : "کالای فیزیکی"}
        </span>

        {category && (
          <LocalizedClientLink
            href={`/categories/${category.handle}`}
            className="inline-flex rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-200 hover:text-slate-900"
          >
            {category.name}
          </LocalizedClientLink>
        )}
      </div>

      {product.collection && (
        <LocalizedClientLink
          href={`/collections/${product.collection.handle}`}
          className="mt-5 inline-block text-sm font-medium text-blue-600 transition hover:text-blue-700"
        >
          {product.collection.title}
        </LocalizedClientLink>
      )}

      <h1
        className="mt-4 text-2xl font-bold leading-10 text-slate-950 small:text-3xl"
        data-testid="product-title"
      >
        {product.title}
      </h1>

      {product.subtitle && (
        <p className="mt-3 text-sm leading-7 text-slate-500 small:text-base">
          {product.subtitle}
        </p>
      )}

      {product.description && (
        <p
          className="mt-5 whitespace-pre-line text-sm leading-8 text-slate-600"
          data-testid="product-description"
        >
          {product.description}
        </p>
      )}

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs text-slate-400">
            نحوه تحویل
          </p>
          <p className="mt-2 text-sm font-bold text-slate-800">
            {isDigital ? "تحویل دیجیتال سریع" : "ارسال کالای فیزیکی"}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs text-slate-400">
            پشتیبانی
          </p>
          <p className="mt-2 text-sm font-bold text-slate-800">
            قبل و بعد از خرید
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo