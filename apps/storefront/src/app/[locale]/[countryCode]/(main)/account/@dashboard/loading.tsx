import Spinner from "@modules/common/icons/spinner"

export default function Loading() {
  return (
    <div className="flex min-h-[420px] h-full w-full items-center justify-center text-[#ff5a00]">
      <Spinner size={36} />
    </div>
  )
}
