import { Listbox, Transition } from "@headlessui/react"
import { ChevronUpDown } from "@medusajs/icons"
import { clx } from "@modules/common/components/ui"
import { Fragment, useMemo } from "react"

import compareAddresses from "@lib/util/compare-addresses"
import { HttpTypes } from "@medusajs/types"
import Radio from "@modules/common/components/radio"

type AddressSelectProps = {
  addresses: HttpTypes.StoreCustomerAddress[]
  addressInput: HttpTypes.StoreCartAddress | null
  onSelect: (
    address: HttpTypes.StoreCartAddress | undefined,
    email?: string,
  ) => void
}

const AddressSelect = ({
  addresses,
  addressInput,
  onSelect,
}: AddressSelectProps) => {
  const handleSelect = (id: string) => {
    const savedAddress = addresses.find((a) => a.id === id)
    if (savedAddress) {
      onSelect(savedAddress as HttpTypes.StoreCartAddress)
    }
  }

  const selectedAddress = useMemo(() => {
    return addresses.find(
      (a) => addressInput && compareAddresses(a, addressInput),
    )
  }, [addresses, addressInput])

  return (
    <Listbox onChange={handleSelect} value={selectedAddress?.id}>
      <div className="relative">
        <Listbox.Button
          className="relative flex h-12 w-full cursor-default items-center justify-between rounded-xl border border-white/10 bg-[#0c1219] px-4 text-start text-sm text-white outline-none transition focus:border-[#ff5a00]/60 focus:ring-4 focus:ring-[#ff5a00]/10"
          data-testid="shipping-address-select"
        >
          {({ open }) => (
            <>
              <span className="block truncate">
                {selectedAddress
                  ? selectedAddress.address_1
                  : "Choose an address"}
              </span>
              <ChevronUpDown
                className={clx("transition-rotate duration-200", {
                  "transform rotate-180": open,
                })}
              />
            </>
          )}
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-white/10 bg-[#0c1219] py-2 text-sm text-white shadow-[0_20px_60px_rgba(0,0,0,0.5)] outline-none"
            data-testid="shipping-address-options"
          >
            {addresses.map((address) => {
              return (
                <Listbox.Option
                  key={address.id}
                  value={address.id}
                  className="relative cursor-pointer select-none px-4 py-4 transition hover:bg-[#ff5a00]/10"
                  data-testid="shipping-address-option"
                >
                  <div className="flex gap-x-4 items-start">
                    <Radio
                      checked={selectedAddress?.id === address.id}
                      data-testid="shipping-address-radio"
                    />
                    <div className="flex flex-col">
                      <span className="text-left text-base-semi">
                        {address.first_name} {address.last_name}
                      </span>
                      {address.company && (
                        <span className="text-xs text-slate-400">
                          {address.company}
                        </span>
                      )}
                      <div className="mt-2 flex flex-col text-start text-sm text-slate-400">
                        <span>
                          {address.address_1}
                          {address.address_2 && (
                            <span>, {address.address_2}</span>
                          )}
                        </span>
                        <span>
                          {address.postal_code}, {address.city}
                        </span>
                        <span>
                          {address.province && `${address.province}, `}
                          {address.country_code?.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Listbox.Option>
              )
            })}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

export default AddressSelect
