import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
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

  const isDigital =
    product.categories?.some((category) =>
      ["gift-cards", "accounts-subscriptions", "software"].includes(
        category.handle || ""
      )
    ) ?? false

  const categoryName = product.categories?.[0]?.name

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group block h-full"
    >
      <article
        data-testid="product-wrapper"
        className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
      >
        <div className="relative overflow-hidden bg-slate-50">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
          />

          <div className="absolute right-4 top-4 z-10 flex flex-col items-end gap-2">
            <span
              className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur ${
                isDigital
                  ? "bg-violet-600/90 text-white"
                  : "bg-white/90 text-slate-700"
              }`}
            >
              {isDigital ? "محصول دیجیتال" : "کالای فیزیکی"}
            </span>

            {categoryName && (
              <span className="inline-flex rounded-full bg-slate-950/70 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">
                {categoryName}
              </span>
            )}
          </div>

          <div className="absolute inset-x-4 bottom-4 translate-y-20 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex h-11 items-center justify-center rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white shadow-lg">
              مشاهده جزئیات محصول
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex-1">
            <h3
              className="line-clamp-2 text-base font-bold leading-7 text-slate-900 transition group-hover:text-blue-600"
              data-testid="product-title"
            >
              {product.title}
            </h3>

            {product.subtitle && (
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                {product.subtitle}
              </p>
            )}
          </div>

          <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-4">
            <div>
              <p className="mb-1 text-xs text-slate-400">
                قیمت
              </p>

              {cheapestPrice ? (
                <PreviewPrice price={cheapestPrice} />
              ) : (
                <span className="text-sm font-semibold text-slate-500">
                  تماس بگیرید
                </span>
              )}
            </div>

            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg text-slate-700 transition duration-300 group-hover:bg-blue-600 group-hover:text-white">
              ←
            </span>
          </div>
        </div>
      </article>
    </LocalizedClientLink>
  )
}