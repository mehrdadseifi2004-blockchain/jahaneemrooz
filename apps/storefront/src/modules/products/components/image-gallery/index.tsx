"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

import { useI18n } from "@i18n/components/i18n-provider"
import { HttpTypes } from "@medusajs/types"

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
      <div className="flex aspect-square w-full items-center justify-center rounded-[24px] border border-[var(--theme-border)] bg-[var(--theme-surface)] px-6 text-center text-sm text-[var(--theme-text-subtle)] transition-colors duration-300">
        {gallery.noImage}
      </div>
    )
  }

  const selectedImage =
    images.find((image) => image.id === selectedImageId) ?? images[0]

  return (
    <div className="flex flex-col-reverse gap-3.5 large:flex-row">
      <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden large:w-[152px] large:shrink-0 large:flex-col large:overflow-visible">
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
              className={`relative aspect-square w-[90px] shrink-0 overflow-hidden rounded-[13px] border bg-white transition duration-300 large:w-full large:rounded-[20px] ${
                isSelected
                  ? "border-[#ff5a00] ring-2 ring-[#ff5a00]/25"
                  : "border-[var(--theme-border)] hover:border-[#ff5a00]/50"
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

      <div className="relative aspect-square min-w-0 flex-1 overflow-hidden rounded-[28px] border border-[var(--theme-border)] bg-white shadow-[0_25px_70px_var(--theme-shadow)] transition-colors duration-300">
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
