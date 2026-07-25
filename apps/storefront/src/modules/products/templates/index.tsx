import React, { Suspense } from "react"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductTabs from "@modules/products/components/product-tabs"
// import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
// import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"

import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product?.id) {
    return notFound()
  }

  return (
    <main className="min-h-screen bg-slate-50" dir="rtl">
      <div
        className="content-container py-8 small:py-12"
        data-testid="product-container"
      >
        <div className="grid items-start gap-8 large:grid-cols-[minmax(0,1fr)_420px]">
          {/* Product gallery */}
          <section className="min-w-0">
            <ImageGallery images={images} />
          </section>

          {/* Product information and purchase box */}
          <aside className="flex min-w-0 flex-col gap-6 large:sticky large:top-28">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm small:p-8">
              <ProductInfo product={product} />

              <div className="mt-7 border-t border-slate-100 pt-6">
                <Suspense
                  fallback={
                    <ProductActions
                      disabled
                      product={product}
                      region={region}
                    />
                  }
                >
                  <ProductActionsWrapper
                    id={product.id}
                    region={region}
                  />
                </Suspense>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <ProductTabs product={product} />
            </div>
          </aside>
        </div>
      </div>

      {/* <section
        className="border-t border-slate-200 bg-white py-16 small:py-24"
        data-testid="related-products-container"
      >
        <div className="content-container">
          <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts
              product={product}
              countryCode={countryCode}
            />
          </Suspense>
        </div>
      </section> */}
    </main>
  )
}

export default ProductTemplate