'use client'

import { useEffect, useMemo, useState } from 'react'
import Image, { type ImageProps } from 'next/image'


type CuteImageProps = ImageProps & {
  wrapperClassName?: string
  imageClassName?: string
}

function getSourceKey(src: ImageProps['src']) {
  if (typeof src === 'string') return src
  return 'src' in src ? src.src : ''
}

export default function CuteImage({
  wrapperClassName = '',
  imageClassName = '',
  className = '',
  src,
  alt,
  fill,
  loading = 'eager',
  onLoad,
  onError,
  ...props
}: CuteImageProps) {
  const [loaded, setLoaded] = useState(false)

  const sourceKey = useMemo(() => getSourceKey(src), [src])

  useEffect(() => {
    setLoaded(false)
  }, [sourceKey])

  return (
    <div className={`relative ${wrapperClassName}`}>
      {!loaded && (
        <div className="xp-image-loading-overlay absolute inset-0 z-10 flex items-center justify-center bg-cream/70 backdrop-blur-[1px]">
          <div className="xp-image-loading-box flex flex-col items-center gap-2 rounded-full border border-honey/40 bg-cream/90 px-4 py-2 shadow-sm">
            <div className="cute-loader-paws flex items-end gap-1" aria-hidden="true">
              <span className="cute-loader-dot h-2.5 w-2.5 rounded-full bg-blush-dark" />
              <span className="cute-loader-dot h-3.5 w-3.5 rounded-full bg-honey" />
              <span className="cute-loader-dot h-2.5 w-2.5 rounded-full bg-mint-dark" />
            </div>

          </div>
        </div>
      )}

      <Image
        src={src}
        alt={alt}
        fill={fill}
        loading={loading}
        className={`${className} ${imageClassName}`}
        onLoad={(event) => {
          setLoaded(true)
          onLoad?.(event)
        }}
        onError={(event) => {
          setLoaded(true)
          onError?.(event)
        }}
        {...props}
      />
    </div>
  )
}


