"use client"
import { createTransferRequest } from "@lib/data/orders"
import { CheckCircleMiniSolid, XCircleSolid } from "@medusajs/icons"
import { Heading, IconButton, Input, Text } from "@modules/common/components/ui"
import { useActionState } from "react"
// TODO: Re-add Toaster component when needed
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { useEffect, useState } from "react"

export default function TransferRequestForm() {
  const [showSuccess, setShowSuccess] = useState(false)

  const [state, formAction] = useActionState(createTransferRequest, {
    success: false,
    error: null,
    order: null,
  })

  useEffect(() => {
    if (state.success && state.order) {
      setShowSuccess(true)
    }
  }, [state.success, state.order])

  return (
    <div className="flex w-full flex-col gap-y-4 rounded-[24px] border border-white/10 bg-[#111923] p-5 small:p-6">
      <div className="grid w-full items-center gap-x-8 gap-y-5 small:grid-cols-2">
        <div className="flex flex-col gap-y-1">
          <Heading level="h3" className="!text-base !font-bold !text-white">
            Order transfers
          </Heading>
          <p className="text-sm leading-7 text-slate-400">
            Can&apos;t find the order you are looking for?
            <br /> Connect an order to your account.
          </p>
        </div>
        <form
          action={formAction}
          className="flex flex-col gap-y-2 small:items-end"
        >
          <div className="flex w-full flex-col gap-y-3">
            <Input
              className="h-12 w-full rounded-xl border border-white/10 bg-[#0c1219] px-4 text-white outline-none placeholder:text-slate-600 focus:border-[#ff5a00]/60 focus:ring-4 focus:ring-[#ff5a00]/10"
              name="order_id"
              placeholder="Order ID"
            />
            <SubmitButton
              variant="secondary"
              size="small"
              className="h-11 w-fit self-end whitespace-nowrap rounded-full border border-[#ff5a00]/40 bg-[#ff5a00]/10 px-6 font-bold text-[#ff7a1a] hover:bg-[#ff5a00] hover:text-white"
            >
              Request transfer
            </SubmitButton>
          </div>
        </form>
      </div>
      {!state.success && state.error && (
        <Text className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-end text-sm text-rose-400">
          {state.error}
        </Text>
      )}
      {showSuccess && (
        <div className="flex w-full items-center justify-between rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
          <div className="flex gap-x-2 items-center">
            <CheckCircleMiniSolid className="w-4 h-4 text-emerald-500" />
            <div className="flex flex-col gap-y-1">
              <Text className="text-sm font-bold text-emerald-400">
                Transfer for order {state.order?.id} requested
              </Text>
              <Text className="text-sm text-emerald-300/80">
                Transfer request email sent to {state.order?.email}
              </Text>
            </div>
          </div>
          <IconButton className="h-fit" onClick={() => setShowSuccess(false)}>
            <XCircleSolid className="w-4 h-4 text-neutral-500" />
          </IconButton>
        </div>
      )}
    </div>
  )
}
