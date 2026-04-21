import { useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  GalleryHorizontal,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import type { GalleryItem } from '@/types'

type ManufacturerGalleryProps = {
  manufacturerName: string
  items: GalleryItem[]
}

function getGalleryImageStyle(item: GalleryItem) {
  return {
    backgroundImage: `url("${item.imageUrl}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#111827',
  } as const
}

export function ManufacturerGallery({
  manufacturerName,
  items,
}: ManufacturerGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const activeItem = items[activeIndex]

  function openLightbox(index: number) {
    setActiveIndex(index)
    setIsOpen(true)
  }

  function showPrevious() {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? items.length - 1 : currentIndex - 1,
    )
  }

  function showNext() {
    setActiveIndex((currentIndex) =>
      currentIndex === items.length - 1 ? 0 : currentIndex + 1,
    )
  }

  if (!activeItem) {
    return null
  }

  return (
    <>
      <Card className='border-border/70 shadow-sm'>
        <CardHeader className='flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between'>
          <div className='space-y-1'>
            <CardTitle className='flex items-center gap-2'>
              <GalleryHorizontal className='size-4' />
              Galeri
            </CardTitle>
            <CardDescription>
              Üretim alanı, proses adımları ve sevkiyat hazırlığı tek galeride
              sunulur.
            </CardDescription>
          </div>
          <Badge variant='outline'>{items.length} görsel</Badge>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_320px]'>
            <button
              type='button'
              className='group relative aspect-video overflow-hidden rounded-[24px] border border-border/70 text-left shadow-sm xl:min-h-[420px] xl:aspect-auto xl:rounded-[28px]'
              onClick={() => openLightbox(activeIndex)}
            >
              <div
                className='absolute inset-0'
                style={getGalleryImageStyle(activeItem)}
              />
              <div className='absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent' />
              <div className='absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.12),rgba(255,255,255,0.02),rgba(15,23,42,0.18))]' />
              <div className='relative flex h-full flex-col justify-between p-6 text-white'>
                <div className='flex items-start justify-between gap-4'>
                  <Badge className='bg-white/12 text-white' variant='secondary'>
                    Kapak görünümü
                  </Badge>
                  <div className='rounded-full border border-white/15 bg-black/20 p-2 backdrop-blur'>
                    <Expand className='size-4' />
                  </div>
                </div>
                <div className='space-y-3'>
                  <div>
                    <p className='text-xs font-medium tracking-[0.18em] text-white/70 uppercase'>
                      {manufacturerName}
                    </p>
                    <h3 className='mt-2 text-2xl font-semibold tracking-tight'>
                      {activeItem.title}
                    </h3>
                  </div>
                  <p className='max-w-2xl text-sm leading-6 text-white/82'>
                    {activeItem.caption}
                  </p>
                </div>
              </div>
            </button>

            <div className='flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 sm:gap-4 xl:grid xl:overflow-visible xl:pb-0'>
              {items.map((item, index) => {
                const isActive = index === activeIndex

                return (
                  <button
                    key={item.title}
                    type='button'
                    className={`relative aspect-video min-w-[220px] snap-start overflow-hidden rounded-[20px] border p-4 text-left transition-all sm:min-w-[260px] xl:min-h-32 xl:min-w-0 xl:aspect-auto xl:rounded-[22px] ${
                      isActive
                        ? 'border-foreground/20 shadow-sm ring-1 ring-foreground/10'
                        : 'border-border/70 hover:border-foreground/15'
                    }`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <div
                      className='absolute inset-0'
                      style={getGalleryImageStyle(item)}
                    />
                    <div className='absolute inset-0 bg-linear-to-t from-black/70 via-black/15 to-transparent' />
                    <div className='relative flex h-full flex-col justify-end text-white'>
                      <p className='text-sm font-semibold'>{item.title}</p>
                      <p className='mt-2 text-xs leading-5 text-white/80'>
                        {item.caption}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className='h-[calc(100vh-2rem)] max-w-[calc(100vw-2rem)] overflow-hidden border-0 bg-transparent p-0 text-white shadow-none xl:border-white/10 xl:bg-black/95'>
          <div className='grid h-full gap-0 xl:grid-cols-[minmax(0,1fr)_360px]'>
            <div className='relative flex h-full flex-col items-center justify-center gap-4 overflow-hidden p-4 sm:min-h-[60vh] sm:gap-0 sm:p-6'>
              <div className='absolute inset-x-0 top-0 z-10 hidden items-center justify-between px-4 py-4 sm:flex sm:px-6'>
                <div>
                  <p className='text-xs font-medium tracking-[0.18em] text-white/65 uppercase'>
                    {manufacturerName}
                  </p>
                  <p className='mt-2 text-lg font-semibold'>{activeItem.title}</p>
                </div>
                <Badge className='border-white/12 bg-white/10 text-white' variant='outline'>
                  {activeIndex + 1} / {items.length}
                </Badge>
              </div>

              <div className='relative z-10 flex aspect-video w-full max-w-5xl items-end overflow-hidden rounded-[24px] border border-white/0 shadow-none sm:h-full sm:max-h-full sm:aspect-auto sm:rounded-[28px] xl:border-white/10 xl:shadow-2xl'>
                <div
                  className='absolute inset-0'
                  style={getGalleryImageStyle(activeItem)}
                />
                <div className='absolute inset-0 hidden bg-linear-to-t from-black/70 via-black/15 to-transparent sm:block' />
                <div className='absolute inset-0 hidden bg-[linear-gradient(135deg,rgba(15,23,42,0.12),rgba(255,255,255,0.02),rgba(15,23,42,0.18))] sm:block' />
                <div className='relative hidden h-full w-full items-end p-5 sm:flex sm:p-6'>
                  <div className='max-w-3xl space-y-3'>
                    <p className='text-3xl font-semibold tracking-tight sm:text-4xl'>
                      {activeItem.title}
                    </p>
                    <p className='text-sm leading-7 text-white/82 sm:text-base'>
                      {activeItem.caption}
                    </p>
                  </div>
                </div>
              </div>

              <div className='relative z-10 flex w-full items-center justify-between sm:hidden'>
                <Button
                  type='button'
                  variant='secondary'
                  className='min-w-11'
                  onClick={showPrevious}
                >
                  <ChevronLeft className='size-4' />
                </Button>
                <span className='text-sm font-medium text-white/80'>
                  {activeIndex + 1} / {items.length}
                </span>
                <Button
                  type='button'
                  variant='secondary'
                  className='min-w-11'
                  onClick={showNext}
                >
                  <ChevronRight className='size-4' />
                </Button>
              </div>

              <Button
                type='button'
                variant='secondary'
                className='absolute left-4 z-20 hidden sm:inline-flex sm:left-6'
                onClick={showPrevious}
              >
                <ChevronLeft className='size-4' />
              </Button>
              <Button
                type='button'
                variant='secondary'
                className='absolute right-4 z-20 hidden sm:inline-flex sm:right-6'
                onClick={showNext}
              >
                <ChevronRight className='size-4' />
              </Button>
            </div>

            <div className='hidden h-full flex-col border-t border-white/10 bg-black/95 xl:flex xl:border-t-0 xl:border-l'>
              <div className='border-b border-white/10 px-5 py-5'>
                <p className='text-sm font-medium'>Galeri akışı</p>
                <p className='mt-1 text-sm leading-6 text-white/65'>
                  Müşteriye sunulacak görsel akışını bu alandan sırasıyla
                  gezebilirsiniz.
                </p>
              </div>
              <div className='grid gap-3 overflow-y-auto p-4'>
                {items.map((item, index) => {
                  const isActive = index === activeIndex

                  return (
                    <button
                      key={item.title}
                      type='button'
                      className={`relative min-h-28 overflow-hidden rounded-[20px] border p-4 text-left transition-all ${
                        isActive
                          ? 'border-white/30 ring-1 ring-white/20'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                      onClick={() => setActiveIndex(index)}
                    >
                      <div
                        className='absolute inset-0'
                        style={getGalleryImageStyle(item)}
                      />
                      <div className='absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent' />
                      <div className='relative flex h-full flex-col justify-end'>
                        <p className='text-sm font-semibold'>{item.title}</p>
                        <p className='mt-2 text-xs leading-5 text-white/78'>
                          {item.caption}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
