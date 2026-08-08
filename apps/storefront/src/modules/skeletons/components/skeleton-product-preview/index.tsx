const SkeletonProductPreview = () => {
  return (
    <div className="animate-pulse rounded-[24px] border border-[var(--theme-border)] bg-[var(--theme-surface)] p-3 small:p-4">
      <div className="aspect-square w-full rounded-[18px] bg-white/[0.06]" />

      <div className="mt-4 h-5 w-4/5 rounded-full bg-white/[0.06]" />
      <div className="mt-2 h-5 w-3/5 rounded-full bg-white/[0.04]" />

      <div className="mt-5 h-4 w-2/5 rounded-full bg-[#ff5a00]/10" />
      <div className="mt-4 h-6 w-1/3 rounded-full bg-[#ff5a00]/15" />
    </div>
  )
}

export default SkeletonProductPreview
