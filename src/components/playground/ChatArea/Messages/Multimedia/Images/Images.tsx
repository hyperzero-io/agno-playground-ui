import { memo } from 'react'

import { type ImageData } from '@/types/playground'
import { cn } from '@/lib/utils'

const Images = ({ images, thumbnail = false }: { images: ImageData[]; thumbnail?: boolean }) => (
  <div
    className={cn(
      thumbnail
        ? 'flex flex-row flex-wrap gap-2 max-w-xl'
        : 'grid max-w-xl gap-4',
      !thumbnail && images.length > 1 ? 'grid-cols-2' : !thumbnail ? 'grid-cols-1' : ''
    )}
  >
    {images.map((image) => (
      <div key={image.url} className={thumbnail ? 'relative' : 'group relative'}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.url}
          alt={image.revised_prompt || 'AI generated image'}
          className={thumbnail ? 'w-16 h-16 object-cover rounded-md cursor-pointer border border-muted' : 'w-full rounded-lg'}
          onError={(e) => {
            const parent = e.currentTarget.parentElement
            if (parent) {
              parent.innerHTML = `
                    <div class=\"flex h-40 flex-col items-center justify-center gap-2 rounded-md bg-secondary/50 text-muted\" >
                      <p class=\"text-primary\">Image unavailable</p>
                      <a href=\"${image.url}\" target=\"_blank\" class=\"max-w-md truncate underline text-primary text-xs w-full text-center p-2\">
                        ${image.url}
                      </a>
                    </div>
                  `
            }
          }}
        />
      </div>
    ))}
  </div>
)

export default memo(Images)

Images.displayName = 'Images'
