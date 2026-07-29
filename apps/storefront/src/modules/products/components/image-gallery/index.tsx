"use client"

import { useI18n } from "@i18n/components/i18n-provider"

import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { useEffect, useState } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
  title?: string
}

const ImageGallery = ({ images, title }: ImageGalleryProps) => {
  const { dictionary } = useI18n()
  const gallery = dictionary.product.gallery
  const resolvedTitle = title || gallery.fallbackTitle
  const [selectedImageId, setSelectedImageId] = useState<string | undefined>(
    images?.[0]?.id,
  )

  useEffect(() => {
    setSelectedImageId(images?.[0]?.id)
  }, [images])

  if (!images?.length) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-[20px] bg-[#f0eeed] px-6 text-center text-sm text-black/40">
        {gallery.noImage}
      </div>
    )
  }

  const selectedImage =
    images.find((image) => image.id === selectedImageId) ?? images[0]

  return (
    <div className="flex flex-col-reverse gap-3.5 large:flex-row">
      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto pb-1 large:w-[152px] large:shrink-0 large:flex-col large:overflow-visible">
        {images.map((image, index) => {
          const isSelected = image.id === selectedImage.id

          return (
            <button
              key={image.id}
              type="button"
              onClick={() => setSelectedImageId(image.id)}
              aria-label={gallery.showImage.replace(
                "{number}",
                String(index + 1),
              )}
              className={`relative aspect-square w-[90px] shrink-0 overflow-hidden rounded-[13px] bg-[#f0eeed] transition large:w-full large:rounded-[20px] ${
                isSelected
                  ? "ring-2 ring-black"
                  : "ring-1 ring-transparent hover:ring-black/20"
              }`}
            >
              {image.url && (
                <Image
                  src={image.url}
                  alt={gallery.imageAlt
                    .replace("{title}", resolvedTitle)
                    .replace("{number}", String(index + 1))}
                  fill
                  sizes="152px"
                  className="object-contain p-2 transition-transform duration-500 hover:scale-110"
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Main image */}
      <div className="relative aspect-square min-w-0 flex-1 overflow-hidden rounded-[20px] bg-[#f0eeed]">
        {selectedImage.url && (
          <Image
            key={selectedImage.id}
            src={selectedImage.url}
            alt={gallery.imageAlt
              .replace("{title}", resolvedTitle)
              .replace("{number}", "1")}
            priority
            fill
            quality={90}
            sizes="(max-width: 1024px) 100vw, 600px"
            className="object-contain p-5 transition-transform duration-500 hover:scale-105 small:p-8"
          />
        )}
      </div>
    </div>
  )
}

export default ImageGallery
