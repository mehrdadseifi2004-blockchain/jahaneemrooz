import { ChevronUpDown } from "@medusajs/icons"
import { clx } from "@modules/common/components/ui"
import {
  SelectHTMLAttributes,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"

export type NativeSelectProps = {
  placeholder?: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
} & SelectHTMLAttributes<HTMLSelectElement>

const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  (
    { placeholder = "Select...", defaultValue, className, children, ...props },
    ref,
  ) => {
    const innerRef = useRef<HTMLSelectElement>(null)
    const [isPlaceholder, setIsPlaceholder] = useState(false)

    useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
      ref,
      () => innerRef.current,
    )

    useEffect(() => {
      if (innerRef.current && innerRef.current.value === "") {
        setIsPlaceholder(true)
      } else {
        setIsPlaceholder(false)
      }
    }, [innerRef.current?.value])

    return (
      <div>
        <div
          onFocus={() => innerRef.current?.focus()}
          onBlur={() => innerRef.current?.blur()}
          className={clx(
            "relative flex h-12 items-center rounded-xl border border-white/10 bg-[#0c1219] text-sm text-white transition hover:border-white/20 focus-within:border-[#ff5a00]/60 focus-within:ring-4 focus-within:ring-[#ff5a00]/10",
            className,
            {
              "text-slate-500": isPlaceholder,
            },
          )}
        >
          <select
            ref={innerRef}
            defaultValue={defaultValue}
            {...props}
            className="h-full flex-1 appearance-none border-none bg-transparent px-4 py-2.5 text-white outline-none [&>option]:bg-[#0c1219] [&>option]:text-white"
          >
            <option disabled value="">
              {placeholder}
            </option>
            {children}
          </select>
          <span className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-slate-500">
            <ChevronUpDown />
          </span>
        </div>
      </div>
    )
  },
)

NativeSelect.displayName = "NativeSelect"

export default NativeSelect
