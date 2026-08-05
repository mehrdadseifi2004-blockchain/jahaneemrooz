import { Disclosure } from "@headlessui/react"
import { useI18n } from "@i18n/components/i18n-provider"
import { Badge, Button, clx } from "@modules/common/components/ui"
import { useEffect } from "react"

import useToggleState from "@lib/hooks/use-toggle-state"
import { useFormStatus } from "react-dom"

type AccountInfoProps = {
  label: string
  currentInfo: string | React.ReactNode
  isSuccess?: boolean
  isError?: boolean
  errorMessage?: string
  clearState: () => void
  children?: React.ReactNode
  "data-testid"?: string
}

const AccountInfo = ({
  label,
  currentInfo,
  isSuccess,
  isError,
  clearState,
  errorMessage,
  children,
  "data-testid": dataTestid,
}: AccountInfoProps) => {
  const { dictionary } = useI18n()
  const content = dictionary.account.info

  const { state, close, toggle } = useToggleState()

  const { pending } = useFormStatus()

  const handleToggle = () => {
    clearState()
    setTimeout(() => toggle(), 100)
  }

  useEffect(() => {
    if (isSuccess) {
      close()
    }
  }, [isSuccess, close])

  return (
    <div
      className="rounded-[20px] border border-white/10 bg-[#111923] p-5 text-sm shadow-[0_14px_40px_rgba(0,0,0,0.16)] small:p-6"
      data-testid={dataTestid}
    >
      <div className="flex items-start justify-between gap-5">
        <div className="flex min-w-0 flex-col gap-2">
          <span className="text-sm font-bold text-white">{label}</span>
          <div className="flex min-w-0 flex-1 basis-0 items-center gap-x-4 text-slate-400">
            {typeof currentInfo === "string" ? (
              <span
                className="break-words font-semibold text-slate-300"
                data-testid="current-info"
              >
                {currentInfo}
              </span>
            ) : (
              currentInfo
            )}
          </div>
        </div>
        <div>
          <Button
            variant="secondary"
            className="min-h-10 w-[100px] rounded-full border border-[#ff5a00]/40 bg-[#ff5a00]/10 py-1 font-bold text-[#ff7a1a] transition hover:bg-[#ff5a00] hover:text-white"
            onClick={handleToggle}
            type={state ? "reset" : "button"}
            data-testid="edit-button"
            data-active={state}
          >
            {state ? content.cancel : content.edit}
          </Button>
        </div>
      </div>

      {/* Success state */}
      <Disclosure>
        <Disclosure.Panel
          static
          className={clx(
            "transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden",
            {
              "max-h-[1000px] opacity-100": isSuccess,
              "max-h-0 opacity-0": !isSuccess,
            },
          )}
          data-testid="success-message"
        >
          <Badge
            className="my-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-emerald-400"
            color="green"
          >
            <span>{content.updated.replace("{label}", label)}</span>
          </Badge>
        </Disclosure.Panel>
      </Disclosure>

      {/* Error state  */}
      <Disclosure>
        <Disclosure.Panel
          static
          className={clx(
            "transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden",
            {
              "max-h-[1000px] opacity-100": isError,
              "max-h-0 opacity-0": !isError,
            },
          )}
          data-testid="error-message"
        >
          <Badge
            className="my-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-emerald-400"
            color="red"
          >
            <span>{errorMessage || content.defaultError}</span>
          </Badge>
        </Disclosure.Panel>
      </Disclosure>

      <Disclosure>
        <Disclosure.Panel
          static
          className={clx(
            "transition-[max-height,opacity] duration-300 ease-in-out overflow-visible",
            {
              "max-h-[1000px] opacity-100": state,
              "max-h-0 opacity-0": !state,
            },
          )}
        >
          <div className="mt-5 flex flex-col gap-y-3 border-t border-white/10 pt-5">
            <div>{children}</div>
            <div className="mt-3 flex items-center justify-end">
              <Button
                isLoading={pending}
                className="h-11 w-full rounded-full !border-0 !bg-[#ff5a00] font-bold !text-white hover:!bg-[#ff7a1a] small:max-w-[170px]"
                type="submit"
                data-testid="save-button"
              >
                {content.save}
              </Button>
            </div>
          </div>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  )
}

export default AccountInfo
