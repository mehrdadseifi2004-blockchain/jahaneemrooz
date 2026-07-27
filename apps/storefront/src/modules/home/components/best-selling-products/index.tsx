import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function BestSellingProducts({
  region,
}: {
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      limit: 4,
      offset: 4,
      order: "-created_at",
      fields: "*variants.calculated_price,*categories",
    },
  })

  if (!products?.length) {
    return null
  }

  return (
    <section className="bg-white pb-[50px] small:pb-20">
      <div className="content-container">
        <div className="mb-[50px] h-px bg-black/10 small:mb-16" />

        <div className="text-center">
          <h2 className="mb-8 text-[32px] font-black leading-tight tracking-[-0.03em] text-black small:mb-14 small:text-5xl">
            محصولات پرفروش
          </h2>

          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 text-right small:gap-x-5 medium:grid-cols-4">
            {products.map((product) => (
              <li key={product.id} className="min-w-0">
                <ProductPreview product={product} region={region} isFeatured />
              </li>
            ))}
          </ul>

          <div className="mt-9 flex justify-center">
            <LocalizedClientLink
              href="/store"
              className="inline-flex h-[52px] w-full items-center justify-center rounded-full border border-black/10 px-12 text-sm font-medium text-black transition hover:bg-black hover:text-white small:w-[218px] small:text-base"
            >
              مشاهده همه
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </section>
  )
}
