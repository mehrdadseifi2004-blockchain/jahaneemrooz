import { Label, RadioGroup, Text, clx } from "@modules/common/components/ui"

type FilterRadioGroupProps = {
  title: string
  items: {
    value: string
    label: string
  }[]
  value: string
  handleChange: (value: string) => void
  "data-testid"?: string
}

const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
  "data-testid": dataTestId,
}: FilterRadioGroupProps) => {
  return (
    <div className="flex flex-col gap-y-3">
      <Text className="!text-sm !font-bold !text-white">{title}</Text>

      <RadioGroup className="flex flex-col gap-2" data-testid={dataTestId}>
        {items.map((item) => {
          const isSelected = item.value === value

          return (
            <div key={item.value} className="flex items-center">
              <RadioGroup.Item
                checked={isSelected}
                onChange={() => handleChange(item.value)}
                className="peer sr-only"
                id={item.value}
                value={item.value}
              />

              <Label
                htmlFor={item.value}
                className={clx(
                  "flex w-full cursor-pointer items-center gap-3 rounded-xl border px-3 py-3 !text-sm transition",
                  {
                    "border-[#ff5a00]/60 bg-[#ff5a00]/10 !text-[#ff7a1a]":
                      isSelected,
                    "border-white/5 bg-white/[0.025] !text-slate-400 hover:border-white/15 hover:!text-white":
                      !isSelected,
                  },
                )}
                data-testid="radio-label"
                data-active={isSelected}
              >
                <span
                  className={clx(
                    "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition",
                    {
                      "border-[#ff5a00]": isSelected,
                      "border-slate-600": !isSelected,
                    },
                  )}
                >
                  {isSelected && (
                    <span className="h-2 w-2 rounded-full bg-[#ff5a00]" />
                  )}
                </span>

                {item.label}
              </Label>
            </div>
          )
        })}
      </RadioGroup>
    </div>
  )
}

export default FilterRadioGroup
