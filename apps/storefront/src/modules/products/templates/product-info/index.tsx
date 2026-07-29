"use client"

import { useI18n } from "@i18n/components/i18n-provider"
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
  const { dictionary } = useI18n()

  const isDigital =
    product.categories?.some((category) =>
      digitalCategoryHandles.includes(category.handle || ""),
    ) ?? false

  const category = product.categories?.[0]

  return (
    <div id="product-info">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {category && (
          <LocalizedClientLink
            href={`/categories/${category.handle}`}
            className="text-sm text-black/60 transition hover:text-black"
          >
            {category.name}
          </LocalizedClientLink>
        )}

        {category && <span className="text-black/30">/</span>}

        <span className="text-sm text-black/60">
          {isDigital
            ? dictionary.product.info.digital
            : dictionary.product.info.physical}
        </span>
      </div>

      <h1
        className="text-3xl font-black leading-[1.2] tracking-[-0.03em] text-black small:text-[40px] small:leading-[1.15]"
        data-testid="product-title"
      >
        {product.title}
      </h1>

      <div
        dir="ltr"
        className="mt-4 flex items-center justify-start gap-3 rtl:justify-end"
        aria-label={dictionary.product.info.ratingLabel}
      >
        <div className="flex gap-0.5 text-xl text-[#ffc633]">
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>

          <span className="relative inline-block">
            <span className="text-black/10">★</span>
            <span className="absolute inset-0 w-1/2 overflow-hidden text-[#ffc633]">
              ★
            </span>
          </span>
        </div>

        <span className="text-sm text-black">
          4.5<span className="text-black/60">/5</span>
        </span>
      </div>

      {(product.description || product.subtitle) && (
        <p
          className="mt-5 whitespace-pre-line text-sm leading-8 text-black/60 small:text-base"
          data-testid="product-description"
        >
          {product.description || product.subtitle}
        </p>
      )}
    </div>
  )
}

export default ProductInfo
