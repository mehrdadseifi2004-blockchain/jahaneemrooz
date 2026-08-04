import React, { Suspense } from "react"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import { Dictionary } from "@i18n/get-dictionary"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import ProductInfo from "@modules/products/templates/product-info"

import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
  dictionary: Dictionary
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
  dictionary,
}) => {
  if (!product?.id) {
    return notFound()
  }

  return (
    <main className="min-h-screen bg-[#070b10] pb-20 text-white">
      <div className="content-container" data-testid="product-container">
        <div className="border-t border-white/10 pt-5 small:pt-6">
          <nav
            aria-label={dictionary.product.breadcrumb.ariaLabel}
            className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500"
          >
            <LocalizedClientLink
              href="/"
              className="transition hover:text-[#ff7a1a]"
            >
              {dictionary.product.breadcrumb.home}
            </LocalizedClientLink>

            <span aria-hidden="true">
              <span className="rtl:hidden">→</span>
              <span className="hidden rtl:inline">←</span>
            </span>

            <LocalizedClientLink
              href="/store"
              className="transition hover:text-[#ff7a1a]"
            >
              {dictionary.product.breadcrumb.store}
            </LocalizedClientLink>

            <span aria-hidden="true">
              <span className="rtl:hidden">→</span>
              <span className="hidden rtl:inline">←</span>
            </span>

            <span className="line-clamp-1 text-white">{product.title}</span>
          </nav>

          <section className="grid items-start gap-8 medium:grid-cols-2 medium:gap-10">
            <div className="min-w-0">
              <ImageGallery images={images} title={product.title} />
            </div>

            <div className="min-w-0">
              <ProductInfo product={product} />

              <div className="mt-5 border-t border-white/10 pt-5">
                <Suspense
                  fallback={
                    <ProductActions
                      disabled
                      product={product}
                      region={region}
                    />
                  }
                >
                  <ProductActionsWrapper id={product.id} region={region} />
                </Suspense>
              </div>
            </div>
          </section>

          <section className="mt-12 small:mt-16">
            <ProductTabs product={product} />
          </section>
        </div>
      </div>

      <section
        className="mt-4 border-t border-white/10 bg-[#070b10] pt-[50px] small:mt-8 small:pt-20"
        data-testid="related-products-container"
      >
        <div className="content-container">
          <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts
              product={product}
              countryCode={countryCode}
              dictionary={dictionary}
            />
          </Suspense>
        </div>
      </section>
    </main>
  )
}

export default ProductTemplate
