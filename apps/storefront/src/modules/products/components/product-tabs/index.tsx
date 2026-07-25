"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"
import { HttpTypes } from "@medusajs/types"

import Accordion from "./accordion"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "اطلاعات محصول",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "ارسال و بازگشت کالا",
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full text-right" dir="rtl">
      <Accordion type="multiple">
        {tabs.map((tab) => (
          <Accordion.Item
            key={tab.label}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="py-6 text-sm">
      <div className="grid grid-cols-1 gap-5 xsmall:grid-cols-2">
        <InfoItem
          label="جنس محصول"
          value={product.material || "ثبت نشده"}
        />

        <InfoItem
          label="کشور سازنده"
          value={product.origin_country || "ثبت نشده"}
        />

        <InfoItem
          label="نوع محصول"
          value={product.type?.value || "ثبت نشده"}
        />

        <InfoItem
          label="وزن"
          value={product.weight ? `${product.weight} گرم` : "ثبت نشده"}
        />

        <InfoItem
          label="ابعاد"
          value={
            product.length && product.width && product.height
              ? `${product.length} × ${product.width} × ${product.height}`
              : "ثبت نشده"
          }
        />
      </div>
    </div>
  )
}

const InfoItem = ({
  label,
  value,
}: {
  label: string
  value: string
}) => {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <span className="text-xs text-slate-400">
        {label}
      </span>

      <p className="mt-2 font-semibold text-slate-800">
        {value}
      </p>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="py-6 text-sm">
      <div className="grid grid-cols-1 gap-y-6">
        <div className="flex items-start gap-3">
          <FastDelivery />

          <div>
            <span className="font-bold text-slate-800">
              ارسال سریع
            </span>

            <p className="mt-2 max-w-sm leading-7 text-slate-500">
              سفارش کالاهای فیزیکی پس از ثبت و تأیید، برای ارسال آماده می‌شود.
              زمان دقیق تحویل بر اساس مقصد و روش ارسال مشخص خواهد شد.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Refresh />

          <div>
            <span className="font-bold text-slate-800">
              تعویض کالا
            </span>

            <p className="mt-2 max-w-sm leading-7 text-slate-500">
              در صورت وجود مشکل قابل‌تأیید یا مغایرت محصول، درخواست تعویض طبق
              شرایط فروشگاه بررسی می‌شود.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Back />

          <div>
            <span className="font-bold text-slate-800">
              بازگشت کالا
            </span>

            <p className="mt-2 max-w-sm leading-7 text-slate-500">
              درخواست بازگشت کالاهای فیزیکی مطابق قوانین فروشگاه و وضعیت
              محصول بررسی خواهد شد. محصولات دیجیتالِ تحویل‌شده معمولاً قابل
              بازگشت نیستند.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs