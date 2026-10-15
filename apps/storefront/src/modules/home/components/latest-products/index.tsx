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
      limit: 100,
      order: "-created_at",
      fields: "*variants.calculated_price,*categories",
    },
  })

  const categoryHandles = ["joy-sticks", "keyboards", "mouses-(wire)"]

  const categoryProducts = categoryHandles
    .map((handle) =>
      products.find((product) =>
        product.categories?.some((category) => category.handle === handle)
      )
    )
    .filter(
      (product): product is HttpTypes.StoreProduct => Boolean(product)
    )

  const selectedIds = new Set(categoryProducts.map((product) => product.id))

  const additionalProducts = products.filter(
    (product) => !selectedIds.has(product.id)
  )

  const displayProducts = [...categoryProducts, ...additionalProducts]
    .slice(0, 4)
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )

  if (!displayProducts.length) {
    return null
  }

  return (
    <section className="border-t border-[var(--theme-border)] bg-[var(--theme-background)] py-[50px] transition-colors duration-300 small:py-[72px]">
      <div className="content-container text-center">
        <h2 className="mb-8 text-[32px] font-black leading-tight tracking-[-0.03em] text-[var(--theme-text)] small:mb-14 small:text-5xl">
          {dictionary.home.latestProducts.title}
        </h2>

        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 text-start small:gap-x-5 medium:grid-cols-4">
          {displayProducts.map((product) => (
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
