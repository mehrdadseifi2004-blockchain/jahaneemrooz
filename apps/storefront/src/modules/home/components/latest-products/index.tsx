import { Dictionary } from "@i18n/get-dictionary"
import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"

type LatestProductsProps = {
  region: HttpTypes.StoreRegion
  dictionary: Dictionary
}

export default async function LatestProducts({
  region,
  dictionary,
}: LatestProductsProps) {
  const {
    response: { products },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      limit: 4,
      order: "-created_at",
      fields: "*variants.calculated_price,*categories",
    },
  })

  if (!products?.length) {
    return null
  }

  return (
    <section className="border-t border-white/5 bg-[#070b10] py-[50px] small:py-[72px]">
      <div className="content-container text-center">
        <h2 className="mb-8 text-[32px] font-black leading-tight tracking-[-0.03em] text-white small:mb-14 small:text-5xl">
          {dictionary.home.latestProducts.title}
        </h2>

        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 text-start small:gap-x-5 medium:grid-cols-4">
          {products.map((product) => (
            <li key={product.id} className="min-w-0">
              <ProductPreview product={product} region={region} isFeatured />
            </li>
          ))}
        </ul>

        <div className="mt-9 flex justify-center">
          <LocalizedClientLink
            href="/store"
            className="inline-flex h-[52px] w-full items-center justify-center rounded-full border border-[#ff5a00]/50 bg-[#ff5a00]/10 px-12 text-sm font-bold text-[#ff7a1a] transition hover:-translate-y-0.5 hover:bg-[#ff5a00] hover:text-white small:w-[218px] small:text-base"
          >
            {dictionary.home.latestProducts.viewAll}
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}
