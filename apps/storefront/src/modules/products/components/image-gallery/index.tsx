import { HttpTypes } from "@medusajs/types"
import Image from "next/image"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  if (!images?.length) {
    return (
      <div className="flex aspect-[3/2] w-full items-center justify-center rounded-3xl border border-slate-200 bg-white text-sm text-slate-400">
        تصویری برای این محصول ثبت نشده است
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {images.map((image, index) => (
        <div
          key={image.id}
          id={image.id}
          className="relative aspect-[3/2] w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
        >
          {image.url && (
            <Image
              src={image.url}
              priority={index === 0}
              alt={`تصویر ${index + 1} محصول`}
              className="object-contain object-center p-4 small:p-6"
              fill
              quality={85}
              sizes="(max-width: 768px) 100vw, 800px"
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default ImageGallery