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
            className="text-sm text-[var(--theme-text-muted)] transition hover:text-[#ff7a1a]"
          >
            {category.name}
          </LocalizedClientLink>
        )}

        {category && <span className="text-[var(--theme-text-subtle)]">/</span>}

        <span className="rounded-full border border-[#ff5a00]/25 bg-[#ff5a00]/10 px-3 py-1 text-sm text-[#ff7a1a]">
          {isDigital
            ? dictionary.product.info.digital
            : dictionary.product.info.physical}
        </span>
      </div>

      <h1
        className="text-3xl font-black leading-[1.2] tracking-[-0.03em] text-[var(--theme-text)] small:text-[40px] small:leading-[1.15]"
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
            <span className="text-[color:var(--theme-border)]">★</span>

            <span className="absolute inset-0 w-1/2 overflow-hidden text-[#ffc633]">
              ★
            </span>
          </span>
        </div>

        <span className="text-sm text-[var(--theme-text)]">
          4.5
          <span className="text-[var(--theme-text-subtle)]">/5</span>
        </span>
      </div>

      {(product.description || product.subtitle) && (
        <p
          className="mt-5 whitespace-pre-line text-sm leading-8 text-[var(--theme-text-muted)] small:text-base"
          data-testid="product-description"
        >
          {product.description || product.subtitle}
        </p>
      )}
    </div>
  )
}

export default ProductInfo
