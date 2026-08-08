const Radio = ({
  checked,
  "data-testid": dataTestId,
}: {
  checked: boolean
  "data-testid"?: string
}) => {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      data-state={checked ? "checked" : "unchecked"}
      className="group relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full outline-none"
      data-testid={dataTestId || "radio-button"}
    >
      <span
        className={`flex h-[18px] w-[18px] items-center justify-center rounded-full border transition ${
          checked
            ? "border-[#ff5a00] bg-[#ff5a00]/15"
            : "border-[var(--theme-border)] bg-[var(--theme-surface-muted)] group-hover:border-[#ff5a00]/60"
        }`}
      >
        {checked && <span className="h-2 w-2 rounded-full bg-[#ff5a00]" />}
      </span>
    </button>
  )
}

export default Radio
