import { useI18n } from "@i18n/components/i18n-provider"
import { HttpTypes } from "@medusajs/types"
import { clx } from "@modules/common/components/ui"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const { dictionary } = useI18n()
  const filteredOptions = (option.values ?? []).map((value) => value.value)

  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-sm font-bold text-white">
        {dictionary.product.actions.selectLabel.replace("{title}", title)}
      </span>

      <div className="flex flex-wrap gap-2" data-testid={dataTestId}>
        {filteredOptions.map((value) => {
          const isSelected = value === current

          return (
            <button
              type="button"
              onClick={() => updateOption(option.id, value)}
              key={value}
              className={clx(
                "min-w-[90px] flex-1 rounded-xl border px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40",
                {
                  "border-[#ff5a00] bg-[#ff5a00]/15 text-[#ff7a1a] shadow-[0_8px_25px_rgba(255,90,0,0.12)]":
                    isSelected,
                  "border-white/10 bg-[#111923] text-slate-300 hover:border-[#ff5a00]/50 hover:text-white":
                    !isSelected,
                },
              )}
              disabled={disabled}
              data-testid="option-button"
              aria-pressed={isSelected}
            >
              {value}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
