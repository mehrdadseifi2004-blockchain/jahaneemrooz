import { HttpTypes } from "@medusajs/types"
import Input from "@modules/common/components/input"
import React, { useState } from "react"

import CountrySelect from "../country-select"

const BillingAddress = ({
  cart,
}: {
  cart: HttpTypes.StoreCart | null
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({
    "billing_address.first_name":
      cart?.billing_address?.first_name || "",
    "billing_address.last_name":
      cart?.billing_address?.last_name || "",
    "billing_address.address_1":
      cart?.billing_address?.address_1 || "",
    "billing_address.company":
      cart?.billing_address?.company || "",
    "billing_address.postal_code":
      cart?.billing_address?.postal_code || "",
    "billing_address.city":
      cart?.billing_address?.city || "",
    "billing_address.country_code":
      cart?.billing_address?.country_code || "ir",
    "billing_address.province":
      cart?.billing_address?.province || "",
    "billing_address.phone":
      cart?.billing_address?.phone || "",
  })

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }))
  }

  return (
    <div
      className="grid grid-cols-1 gap-4 small:grid-cols-2"
      dir="rtl"
    >
      <Input
        label="نام"
        name="billing_address.first_name"
        autoComplete="given-name"
        value={formData["billing_address.first_name"]}
        onChange={handleChange}
        required
        data-testid="billing-first-name-input"
      />

      <Input
        label="نام خانوادگی"
        name="billing_address.last_name"
        autoComplete="family-name"
        value={formData["billing_address.last_name"]}
        onChange={handleChange}
        required
        data-testid="billing-last-name-input"
      />

      <div className="small:col-span-2">
        <Input
          label="نشانی کامل"
          name="billing_address.address_1"
          autoComplete="address-line1"
          value={formData["billing_address.address_1"]}
          onChange={handleChange}
          required
          data-testid="billing-address-input"
        />
      </div>

      <Input
        label="استان"
        name="billing_address.province"
        autoComplete="address-level1"
        value={formData["billing_address.province"]}
        onChange={handleChange}
        required
        data-testid="billing-province-input"
      />

      <Input
        label="شهر"
        name="billing_address.city"
        autoComplete="address-level2"
        value={formData["billing_address.city"]}
        onChange={handleChange}
        required
      />

      <Input
        label="کد پستی"
        name="billing_address.postal_code"
        autoComplete="postal-code"
        inputMode="numeric"
        value={formData["billing_address.postal_code"]}
        onChange={handleChange}
        required
        data-testid="billing-postal-input"
      />

      <CountrySelect
        name="billing_address.country_code"
        autoComplete="country"
        region={cart?.region}
        value={formData["billing_address.country_code"]}
        onChange={handleChange}
        required
        data-testid="billing-country-select"
      />

      <Input
        label="شماره تماس"
        name="billing_address.phone"
        autoComplete="tel"
        inputMode="tel"
        value={formData["billing_address.phone"]}
        onChange={handleChange}
        data-testid="billing-phone-input"
      />

      <Input
        label="شرکت یا سازمان (اختیاری)"
        name="billing_address.company"
        value={formData["billing_address.company"]}
        onChange={handleChange}
        autoComplete="organization"
        data-testid="billing-company-input"
      />
    </div>
  )
}

export default BillingAddress