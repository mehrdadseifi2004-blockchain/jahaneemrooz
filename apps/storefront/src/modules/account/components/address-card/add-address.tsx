"use client"

import { useI18n } from "@i18n/components/i18n-provider"
import { Plus } from "@medusajs/icons"
import { Button, Heading } from "@modules/common/components/ui"
import { useActionState, useEffect, useState } from "react"

import { addCustomerAddress } from "@lib/data/customer"
import useToggleState from "@lib/hooks/use-toggle-state"
import { HttpTypes } from "@medusajs/types"
import CountrySelect from "@modules/checkout/components/country-select"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"

const AddAddress = ({
  region,
}: {
  region: HttpTypes.StoreRegion
  addresses: HttpTypes.StoreCustomerAddress[]
}) => {
  const { dictionary } = useI18n()
  const [successState, setSuccessState] = useState(false)
  const { state, open, close: closeModal } = useToggleState(false)

  const [formState, formAction] = useActionState(addCustomerAddress, {
    success: false,
    error: null,
  } as { success: boolean; error: string | null })

  const close = () => {
    setSuccessState(false)
    closeModal()
  }

  useEffect(() => {
    if (successState) {
      close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successState])

  useEffect(() => {
    if (formState.success) {
      setSuccessState(true)
    }
  }, [formState])

  return (
    <>
      <button
        className="flex min-h-[220px] h-full w-full flex-col justify-between rounded-[20px] border border-dashed border-[#ff5a00]/40 bg-[#ff5a00]/5 p-5 text-[#ff7a1a] transition hover:border-[#ff5a00] hover:bg-[#ff5a00]/10"
        onClick={open}
        data-testid="add-address-button"
      >
        <span className="text-base font-bold">
          {dictionary.addressForm.newAddress}
        </span>
        <Plus />
      </button>

      <Modal isOpen={state} close={close} data-testid="add-address-modal">
        <Modal.Title>
          <Heading className="mb-2">
            {dictionary.addressForm.addAddress}
          </Heading>
        </Modal.Title>
        <form action={formAction}>
          <Modal.Body>
            <div className="flex flex-col gap-y-2">
              <div className="grid grid-cols-2 gap-x-2">
                <Input
                  label={dictionary.addressForm.firstName}
                  name="first_name"
                  required
                  autoComplete="given-name"
                  data-testid="first-name-input"
                />
                <Input
                  label={dictionary.addressForm.lastName}
                  name="last_name"
                  required
                  autoComplete="family-name"
                  data-testid="last-name-input"
                />
              </div>
              <Input
                label={dictionary.addressForm.company}
                name="company"
                autoComplete="organization"
                data-testid="company-input"
              />
              <Input
                label={dictionary.addressForm.address}
                name="address_1"
                required
                autoComplete="address-line1"
                data-testid="address-1-input"
              />
              <Input
                label={dictionary.addressForm.addressExtra}
                name="address_2"
                autoComplete="address-line2"
                data-testid="address-2-input"
              />
              <div className="grid grid-cols-[144px_1fr] gap-x-2">
                <Input
                  label={dictionary.addressForm.postalCode}
                  name="postal_code"
                  required
                  autoComplete="postal-code"
                  data-testid="postal-code-input"
                />
                <Input
                  label={dictionary.addressForm.city}
                  name="city"
                  required
                  autoComplete="locality"
                  data-testid="city-input"
                />
              </div>
              <Input
                label={dictionary.addressForm.province}
                name="province"
                autoComplete="address-level1"
                data-testid="state-input"
              />
              <CountrySelect
                region={region}
                name="country_code"
                required
                autoComplete="country"
                data-testid="country-select"
              />
              <Input
                label={dictionary.addressForm.phone}
                name="phone"
                autoComplete="phone"
                data-testid="phone-input"
              />
            </div>
            {formState.error && (
              <div
                className="my-3 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-400"
                data-testid="address-error"
              >
                {formState.error}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <div className="mt-6 flex w-full gap-3">
              <Button
                type="reset"
                variant="secondary"
                onClick={close}
                className="h-11 rounded-full border border-white/10 bg-[#0c1219] px-6 text-slate-300 hover:border-[#ff5a00]/40 hover:text-[#ff7a1a]"
                data-testid="cancel-button"
              >
                {dictionary.addressForm.cancel}
              </Button>
              <SubmitButton data-testid="save-button">
                {dictionary.addressForm.save}
              </SubmitButton>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default AddAddress
