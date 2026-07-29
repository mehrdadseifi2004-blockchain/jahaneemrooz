"use client"

import { useState } from "react"
import { HttpTypes } from "@medusajs/types"

import { useI18n } from "@i18n/components/i18n-provider"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

type TabId = "details" | "reviews" | "faq"

const ProductTabs = ({ product }: ProductTabsProps) => {
  const { dictionary } = useI18n()
  const [activeTab, setActiveTab] = useState<TabId>("details")

  const tabs: Array<{ id: TabId; label: string }> = [
    {
      id: "details",
      label: dictionary.product.tabs.details,
    },
    {
      id: "reviews",
      label: dictionary.product.tabs.reviews,
    },
    {
      id: "faq",
      label: dictionary.product.tabs.faq,
    },
  ]

  return (
    <div className="w-full text-start">
      <div
        role="tablist"
        aria-label={dictionary.product.tabs.ariaLabel}
        className="flex items-center overflow-x-auto"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`product-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`min-w-[150px] flex-1 whitespace-nowrap border-b px-5 py-5 text-sm transition small:px-6 small:py-6 small:text-base ${
                isActive
                  ? "border-b-2 border-black font-semibold text-black"
                  : "border-black/10 font-normal text-black/60 hover:text-black"
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div className="py-8 small:py-10">
        {activeTab === "details" && (
          <div id="product-tab-details" role="tabpanel">
            <ProductDetails product={product} />
          </div>
        )}

        {activeTab === "reviews" && (
          <div id="product-tab-reviews" role="tabpanel">
            <ProductReviews />
          </div>
        )}

        {activeTab === "faq" && (
          <div id="product-tab-faq" role="tabpanel">
            <ProductFaq />
          </div>
        )}
      </div>
    </div>
  )
}

const ProductDetails = ({ product }: ProductTabsProps) => {
  const { dictionary } = useI18n()
  const t = dictionary.product.tabs

  const specifications = [
    {
      label: t.material,
      value: product.material || t.notAvailable,
    },
    {
      label: t.originCountry,
      value: product.origin_country || t.notAvailable,
    },
    {
      label: t.productType,
      value: product.type?.value || t.notAvailable,
    },
    {
      label: t.weight,
      value: product.weight
        ? `${product.weight} ${t.weightUnit}`
        : t.notAvailable,
    },
    {
      label: t.dimensions,
      value:
        product.length && product.width && product.height
          ? `${product.length} × ${product.width} × ${product.height}`
          : t.notAvailable,
    },
    {
      label: t.productCode,
      value: product.handle || t.notAvailable,
    },
  ]

  return (
    <div className="grid gap-8 large:grid-cols-[minmax(0,1fr)_380px]">
      <div>
        <h2 className="text-2xl font-bold text-black">{t.about}</h2>

        <p className="mt-4 whitespace-pre-line text-sm leading-8 text-black/60 small:text-base">
          {product.description || product.subtitle || t.noDescription}
        </p>
      </div>

      <div className="overflow-hidden rounded-[20px] border border-black/10">
        {specifications.map((item, index) => (
          <div
            key={item.label}
            className={`flex items-center justify-between gap-6 px-5 py-4 text-sm ${
              index !== specifications.length - 1
                ? "border-b border-black/10"
                : ""
            }`}
          >
            <span className="text-black/50">{item.label}</span>

            <span className="text-end font-medium text-black">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

const ProductReviews = () => {
  const { dictionary } = useI18n()
  const t = dictionary.product.tabs
  const reviews = t.reviewItems

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 small:flex-row small:items-center small:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-black">{t.customerReviews}</h2>

          <p className="mt-2 text-sm text-black/60">{t.sampleReviewsNotice}</p>
        </div>

        <button
          type="button"
          className="inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white transition hover:bg-black/80"
        >
          {t.writeReview}
        </button>
      </div>

      <div className="grid gap-4 medium:grid-cols-2">
        {reviews.map((review) => (
          <article
            key={review.id}
            className="rounded-[20px] border border-black/10 p-6 small:p-8"
          >
            <div
              dir="ltr"
              className="flex gap-1 text-xl text-[#ffc633]"
              aria-label={t.ratingFive}
            >
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <strong className="text-lg text-black">{review.name}</strong>

              <span
                aria-label={t.verifiedBuyer}
                title={t.verifiedBuyer}
                className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#01ab31] text-xs font-bold text-white"
              >
                ✓
              </span>
            </div>

            <p className="mt-3 text-sm leading-7 text-black/60 small:text-base">
              {review.content}
            </p>
          </article>
        ))}
      </div>
    </div>
  )
}

const ProductFaq = () => {
  const { dictionary } = useI18n()
  const t = dictionary.product.tabs

  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="mb-6 text-2xl font-bold text-black">{t.faq}</h2>

      <div className="divide-y divide-black/10 rounded-[20px] border border-black/10 px-5 small:px-8">
        {t.faqItems.map((item, index) => (
          <details key={item.question} className="group" open={index === 0}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold text-black">
              <span>{item.question}</span>

              <span className="text-xl transition group-open:rotate-45">+</span>
            </summary>

            <p className="pb-5 text-sm leading-7 text-black/60 small:text-base">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  )
}

export default ProductTabs
