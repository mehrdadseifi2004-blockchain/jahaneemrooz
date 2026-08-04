"use client"

import { useI18n } from "@i18n/components/i18n-provider"
import {
  deleteCustomerAddress,
  updateCustomerAddress,
} from "@lib/data/customer"
import useToggleState from "@lib/hooks/use-toggle-state"
import { PencilSquare as Edit, Trash } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import CountrySelect from "@modules/checkout/components/country-select"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"
import { Button, Heading, Text, clx } from "@modules/common/components/ui"
import Spinner from "@modules/common/icons/spinner"
import React, { useActionState, useEffect, useState } from "react"

type EditAddressProps = {
  region: HttpTypes.StoreRegion
  address: HttpTypes.StoreCustomerAddress
  isActive?: boolean
}

const EditAddress: React.FC<EditAddressProps> = ({
  region,
  address,
  isActive = false,
}) => {
  const { locale, dictionary } = useI18n()
  const [removing, setRemoving] = useState(false)
  const [successState, setSuccessState] = useState(false)
  const { state, open, close: closeModal } = useToggleState(false)

  const [formState, formAction] = useActionState(updateCustomerAddress, {
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

  const removeAddress = async () => {
    setRemoving(true)
    await deleteCustomerAddress(address.id)
    setRemoving(false)
  }

  const separator = locale === "fa" ? "، " : ", "

  return (
    <>
      <div
        className={clx(
          "flex min-h-[220px] h-full w-full flex-col justify-between rounded-[20px] border border-white/10 bg-[#111923] p-5 text-slate-300 transition hover:border-[#ff5a00]/40",
          {
            "border-[#ff5a00] shadow-[0_0_0_1px_rgba(255,90,0,0.25)]": isActive,
          },
        )}
        data-testid="address-container"
      >
        <div className="flex flex-col">
          <Heading
            className="text-start text-base font-bold text-white"
            data-testid="address-name"
          >
            {address.first_name} {address.last_name}
          </Heading>
          {address.company && (
            <Text
              className="text-sm text-slate-400"
              data-testid="address-company"
            >
              {address.company}
            </Text>
          )}
          <Text className="mt-3 flex flex-col text-start text-sm leading-7 text-slate-400">
            <span data-testid="address-address">
              {address.address_1}
              {address.address_2 && (
                <span>
                  {separator}
                  {address.address_2}
                </span>
              )}
            </span>
            <span data-testid="address-postal-city">
              {address.postal_code}
              {separator}
              {address.city}
            </span>
            <span data-testid="address-province-country">
              {address.province && `${address.province}${separator}`}
              {address.country_code?.toUpperCase()}
            </span>
          </Text>
        </div>
        <div className="flex items-center gap-x-4">
          <button
            className="flex items-center gap-x-2 text-sm font-bold text-[#ff7a1a] transition hover:text-[#ff5a00]"
            onClick={open}
            data-testid="address-edit-button"
          >
            <Edit />
            {dictionary.addressForm.edit}
          </button>
          <button
            className="flex items-center gap-x-2 text-sm font-bold text-[#ff7a1a] transition hover:text-[#ff5a00]"
            onClick={removeAddress}
            data-testid="address-delete-button"
          >
            {removing ? <Spinner /> : <Trash />}
            {dictionary.addressForm.remove}
          </button>
        </div>
      </div>

      <Modal isOpen={state} close={close} data-testid="edit-address-modal">
        <Modal.Title>
          <Heading className="mb-2">
            {dictionary.addressForm.editAddress}
          </Heading>
        </Modal.Title>
        <form action={formAction}>
          <input type="hidden" name="addressId" value={address.id} />
          <Modal.Body>
            <div className="grid grid-cols-1 gap-y-2">
              <div className="grid grid-cols-2 gap-x-2">
                <Input
                  label={dictionary.addressForm.firstName}
                  name="first_name"
                  required
                  autoComplete="given-name"
                  defaultValue={address.first_name || undefined}
                  data-testid="first-name-input"
                />
                <Input
                  label={dictionary.addressForm.lastName}
                  name="last_name"
                  required
                  autoComplete="family-name"
                  defaultValue={address.last_name || undefined}
                  data-testid="last-name-input"
                />
              </div>
              <Input
                label={dictionary.addressForm.company}
                name="company"
                autoComplete="organization"
                defaultValue={address.company || undefined}
                data-testid="company-input"
              />
              <Input
                label={dictionary.addressForm.address}
                name="address_1"
                required
                autoComplete="address-line1"
                defaultValue={address.address_1 || undefined}
                data-testid="address-1-input"
              />
              <Input
                label={dictionary.addressForm.addressExtra}
                name="address_2"
                autoComplete="address-line2"
                defaultValue={address.address_2 || undefined}
                data-testid="address-2-input"
              />
              <div className="grid grid-cols-[144px_1fr] gap-x-2">
                <Input
                  label={dictionary.addressForm.postalCode}
                  name="postal_code"
                  required
                  autoComplete="postal-code"
                  defaultValue={address.postal_code || undefined}
                  data-testid="postal-code-input"
                />
                <Input
                  label={dictionary.addressForm.city}
                  name="city"
                  required
                  autoComplete="locality"
                  defaultValue={address.city || undefined}
                  data-testid="city-input"
                />
              </div>
              <Input
                label={dictionary.addressForm.province}
                name="province"
                autoComplete="address-level1"
                defaultValue={address.province || undefined}
                data-testid="state-input"
              />
              <CountrySelect
                name="country_code"
                region={region}
                required
                autoComplete="country"
                defaultValue={address.country_code || undefined}
                data-testid="country-select"
              />
              <Input
                label={dictionary.addressForm.phone}
                name="phone"
                autoComplete="phone"
                defaultValue={address.phone || undefined}
                data-testid="phone-input"
              />
            </div>
            {formState.error && (
              <div className="my-3 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-400">
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

export default EditAddress
