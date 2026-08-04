import repeat from "@lib/util/repeat"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"

const SkeletonRelatedProducts = () => {
  return (
    <div className="product-page-constraint">
      <div className="mb-14 flex flex-col items-center gap-4 text-center">
        <div className="h-10 w-64 animate-pulse rounded-full bg-white/[0.06]" />
      </div>

      <ul className="grid flex-1 grid-cols-2 gap-x-4 gap-y-8 small:gap-x-5 medium:grid-cols-4">
        {repeat(4).map((index) => (
          <li key={index}>
            <SkeletonProductPreview />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SkeletonRelatedProducts
