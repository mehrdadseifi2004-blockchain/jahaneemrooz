"use client"

import { HttpTypes } from "@medusajs/types"
import { useState } from "react"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

type TabId = "details" | "reviews" | "faq"

const ProductTabs = ({ product }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState<TabId>("details")

  const tabs: Array<{ id: TabId; label: string }> = [
    {
      id: "details",
      label: "جزئیات محصول",
    },
    {
      id: "reviews",
      label: "امتیاز و نظرات",
    },
    {
      id: "faq",
      label: "سؤالات متداول",
    },
  ]

  return (
    <div className="w-full text-right" dir="rtl">
      <div
        role="tablist"
        aria-label="اطلاعات محصول"
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
  const specifications = [
    {
      label: "جنس محصول",
      value: product.material || "ثبت نشده",
    },
    {
      label: "کشور سازنده",
      value: product.origin_country || "ثبت نشده",
    },
    {
      label: "نوع محصول",
      value: product.type?.value || "ثبت نشده",
    },
    {
      label: "وزن",
      value: product.weight ? `${product.weight} گرم` : "ثبت نشده",
    },
    {
      label: "ابعاد",
      value:
        product.length && product.width && product.height
          ? `${product.length} × ${product.width} × ${product.height}`
          : "ثبت نشده",
    },
    {
      label: "کد محصول",
      value: product.handle || "ثبت نشده",
    },
  ]

  return (
    <div className="grid gap-8 large:grid-cols-[minmax(0,1fr)_380px]">
      <div>
        <h2 className="text-2xl font-bold text-black">درباره این محصول</h2>

        <p className="mt-4 whitespace-pre-line text-sm leading-8 text-black/60 small:text-base">
          {product.description ||
            product.subtitle ||
            "توضیحات تکمیلی برای این محصول ثبت نشده است."}
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

            <span className="text-left font-medium text-black">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

const reviews = [
  {
    id: 1,
    name: "علی رضایی",
    content:
      "کیفیت محصول بسیار خوب بود و دقیقاً مطابق توضیحات صفحه محصول به دستم رسید.",
  },
  {
    id: 2,
    name: "امیرحسین محمدی",
    content:
      "ارسال سریع انجام شد و بسته‌بندی مناسبی داشت. از خرید خودم راضی هستم.",
  },
]

const ProductReviews = () => {
  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 small:flex-row small:items-center small:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-black">نظرات مشتریان</h2>

          <p className="mt-2 text-sm text-black/60">
            نظرات نمایش‌داده‌شده فعلاً نمونه هستند.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white transition hover:bg-black/80"
        >
          ثبت نظر
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
              aria-label="امتیاز ۵ از ۵"
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
                aria-label="خریدار تأییدشده"
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

const faqItems = [
  {
    question: "زمان آماده‌سازی سفارش چقدر است؟",
    answer:
      "زمان آماده‌سازی به نوع محصول بستگی دارد. محصولات دیجیتال معمولاً سریع‌تر تحویل می‌شوند و کالاهای فیزیکی پس از تأیید سفارش برای ارسال آماده خواهند شد.",
  },
  {
    question: "آیا امکان بازگشت محصول وجود دارد؟",
    answer:
      "برای کالاهای فیزیکی، درخواست بازگشت مطابق شرایط فروشگاه بررسی می‌شود. محصولات دیجیتال تحویل‌شده معمولاً امکان بازگشت ندارند.",
  },
  {
    question: "چگونه از وضعیت سفارش مطلع شوم؟",
    answer:
      "پس از ثبت سفارش می‌توانید وضعیت آن را از بخش سفارش‌های حساب کاربری خود مشاهده کنید.",
  },
]

const ProductFaq = () => {
  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="mb-6 text-2xl font-bold text-black">سؤالات متداول</h2>

      <div className="divide-y divide-black/10 rounded-[20px] border border-black/10 px-5 small:px-8">
        {faqItems.map((item, index) => (
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
