import { Checkbox, Label } from "@modules/common/components/ui"
import React from "react"

type CheckboxProps = {
  checked?: boolean
  onChange?: () => void
  label: string
  name?: string
  "data-testid"?: string
}

const CheckboxWithLabel: React.FC<CheckboxProps> = ({
  checked = true,
  onChange,
  label,
  name,
  "data-testid": dataTestId,
}) => {
  return (
    <div className="flex items-center space-x-2 ">
      <Checkbox
        className="flex items-center gap-x-2 !border-[var(--theme-border)] !bg-[var(--theme-surface-muted)] data-[state=checked]:!border-[#ff5a00] data-[state=checked]:!bg-[#ff5a00]"
        id="checkbox"
        role="checkbox"
        checked={checked}
        readOnly
        aria-checked={checked}
        onClick={onChange}
        name={name}
        data-testid={dataTestId}
      />
      <Label
        htmlFor="checkbox"
        className="!transform-none !text-sm !font-medium !text-[var(--theme-text-muted)]"
      >
        {label}
      </Label>
    </div>
  )
}

export default CheckboxWithLabel
