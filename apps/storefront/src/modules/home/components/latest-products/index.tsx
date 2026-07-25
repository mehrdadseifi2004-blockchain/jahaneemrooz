import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function LatestProducts({
  region,
}: {
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      limit: 8,
      order: "-created_at",
      fields: "*variants.calculated_price,*categories",
    },
  })

  if (!products?.length) {
    return null
  }

  return (
    <section className="bg-white py-16 small:py-24">
      <div className="content-container">
        <div className="mb-10 flex flex-col gap-5 small:flex-row small:items-end small:justify-between">
          <div>
            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600">
              جدیدترین محصولات
            </span>

            <h2 className="mt-4 text-3xl font-bold text-slate-950 small:text-4xl">
              تازه به جهان امروز اضافه شده
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 small:text-base">
              جدیدترین محصولات فیزیکی و دیجیتال فروشگاه را ببین و از میان
              تجهیزات، لوازم جانبی، گیمینگ و سرویس‌های دیجیتال انتخاب کن.
            </p>
          </div>

          <LocalizedClientLink
            href="/store"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <span>مشاهده همه محصولات</span>
            <span>←</span>
          </LocalizedClientLink>
        </div>

        <ul className="grid grid-cols-1 gap-6 xsmall:grid-cols-2 medium:grid-cols-4">
          {products.map((product) => (
            <li key={product.id} className="h-full">
              <ProductPreview
                product={product}
                region={region}
                isFeatured
              />
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center small:hidden">
          <LocalizedClientLink
            href="/store"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-blue-600"
          >
            مشاهده همه محصولات
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}