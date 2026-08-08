import { useI18n } from "@i18n/components/i18n-provider"
import { HttpTypes } from "@medusajs/types"
import { Container } from "@modules/common/components/ui"
import Checkbox from "@modules/common/components/checkbox"
import Input from "@modules/common/components/input"
import { mapKeys } from "lodash"
import React, { useEffect, useMemo, useState } from "react"

import AddressSelect from "../address-select"
import CountrySelect from "../country-select"

const ShippingAddress = ({
  customer,
  cart,
  checked,
  onChange,
}: {
  customer: HttpTypes.StoreCustomer | null
  cart: HttpTypes.StoreCart | null
  checked: boolean
  onChange: () => void
}) => {
  const { dictionary } = useI18n()

  const [formData, setFormData] = useState<Record<string, string>>({
    "shipping_address.first_name": cart?.shipping_address?.first_name || "",
    "shipping_address.last_name": cart?.shipping_address?.last_name || "",
    "shipping_address.address_1": cart?.shipping_address?.address_1 || "",
    "shipping_address.company": cart?.shipping_address?.company || "",
    "shipping_address.postal_code": cart?.shipping_address?.postal_code || "",
    "shipping_address.city": cart?.shipping_address?.city || "",
    "shipping_address.country_code":
      cart?.shipping_address?.country_code || "ir",
    "shipping_address.province": cart?.shipping_address?.province || "",
    "shipping_address.phone": cart?.shipping_address?.phone || "",
    email: cart?.email || "",
  })

  const countriesInRegion = useMemo(
    () => cart?.region?.countries?.map((country) => country.iso_2),
    [cart?.region],
  )

  const addressesInRegion = useMemo(
    () =>
      customer?.addresses.filter(
        (address) =>
          address.country_code &&
          countriesInRegion?.includes(address.country_code),
      ),
    [customer?.addresses, countriesInRegion],
  )

  const setFormAddress = (
    address?: HttpTypes.StoreCartAddress,
    email?: string,
  ) => {
    if (address) {
      setFormData((previous) => ({
        ...previous,
        "shipping_address.first_name": address.first_name || "",
        "shipping_address.last_name": address.last_name || "",
        "shipping_address.address_1": address.address_1 || "",
        "shipping_address.company": address.company || "",
        "shipping_address.postal_code": address.postal_code || "",
        "shipping_address.city": address.city || "",
        "shipping_address.country_code": address.country_code || "ir",
        "shipping_address.province": address.province || "",
        "shipping_address.phone": address.phone || "",
      }))
    }

    if (email) {
      setFormData((previous) => ({
        ...previous,
        email,
      }))
    }
  }

  useEffect(() => {
    if (cart?.shipping_address) {
      setFormAddress(cart.shipping_address, cart.email)
    }

    if (cart && !cart.email && customer?.email) {
      setFormAddress(undefined, customer.email)
    }
  }, [cart, customer?.email])

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }))
  }

  return (
    <div>
      {customer && (addressesInRegion?.length || 0) > 0 && (
        <Container className="mb-7 flex flex-col gap-4 rounded-2xl border border-[var(--theme-accent)]/20 bg-[var(--theme-accent)]/10 p-5 shadow-none">
          <p className="text-sm font-semibold text-[#ff7a1a]">
            {customer.first_name
              ? dictionary.checkout.address.savedAddressGreeting.replace(
                  "{name}",
                  customer.first_name,
                )
              : dictionary.checkout.address.savedAddress}
          </p>

          <AddressSelect
            addresses={customer.addresses}
            addressInput={
              mapKeys(formData, (_, key) =>
                key.replace("shipping_address.", ""),
              ) as unknown as HttpTypes.StoreCartAddress
            }
            onSelect={setFormAddress}
          />
        </Container>
      )}

      <div className="grid grid-cols-1 gap-4 small:grid-cols-2">
        <Input
          label={dictionary.checkout.address.firstName}
          name="shipping_address.first_name"
          autoComplete="given-name"
          value={formData["shipping_address.first_name"]}
          onChange={handleChange}
          required
          data-testid="shipping-first-name-input"
        />

        <Input
          label={dictionary.checkout.address.lastName}
          name="shipping_address.last_name"
          autoComplete="family-name"
          value={formData["shipping_address.last_name"]}
          onChange={handleChange}
          required
          data-testid="shipping-last-name-input"
        />

        <div className="small:col-span-2">
          <Input
            label={dictionary.checkout.address.addressLine}
            name="shipping_address.address_1"
            autoComplete="address-line1"
            value={formData["shipping_address.address_1"]}
            onChange={handleChange}
            required
            data-testid="shipping-address-input"
          />
        </div>

        <Input
          label={dictionary.checkout.address.province}
          name="shipping_address.province"
          autoComplete="address-level1"
          value={formData["shipping_address.province"]}
          onChange={handleChange}
          required
          data-testid="shipping-province-input"
        />

        <Input
          label={dictionary.checkout.address.city}
          name="shipping_address.city"
          autoComplete="address-level2"
          value={formData["shipping_address.city"]}
          onChange={handleChange}
          required
          data-testid="shipping-city-input"
        />

        <Input
          label={dictionary.checkout.address.postal}
          name="shipping_address.postal_code"
          autoComplete="postal-code"
          inputMode="numeric"
          value={formData["shipping_address.postal_code"]}
          onChange={handleChange}
          required
          data-testid="shipping-postal-code-input"
        />

        <CountrySelect
          name="shipping_address.country_code"
          autoComplete="country"
          region={cart?.region}
          value={formData["shipping_address.country_code"]}
          onChange={handleChange}
          required
          data-testid="shipping-country-select"
        />

        <Input
          label={dictionary.checkout.address.phone}
          name="shipping_address.phone"
          autoComplete="tel"
          inputMode="tel"
          value={formData["shipping_address.phone"]}
          onChange={handleChange}
          required
          data-testid="shipping-phone-input"
        />

        <Input
          label={dictionary.checkout.address.emailLabel}
          name="email"
          type="email"
          title={dictionary.checkout.address.emailValidation}
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          required
          data-testid="shipping-email-input"
        />

        <div className="small:col-span-2">
          <Input
            label={dictionary.checkout.address.company}
            name="shipping_address.company"
            value={formData["shipping_address.company"]}
            onChange={handleChange}
            autoComplete="organization"
            data-testid="shipping-company-input"
          />
        </div>
      </div>

      <div className="mt-7 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-muted)] p-4 transition-colors duration-300">
        <Checkbox
          label={dictionary.checkout.address.sameBilling}
          name="same_as_billing"
          checked={checked}
          onChange={onChange}
          data-testid="billing-address-checkbox"
        />
      </div>
    </div>
  )
}

export default ShippingAddress
