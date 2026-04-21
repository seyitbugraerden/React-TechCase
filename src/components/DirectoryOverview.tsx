import { MapPin, Search, SlidersHorizontal, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Manufacturer } from '@/types'

type DirectoryOverviewProps = {
  manufacturers: Manufacturer[]
  cities: string[]
  categories: string[]
  searchTerm: string
  cityFilter: string
  categoryFilter: string
  onSearchTermChange: (value: string) => void
  onCityFilterChange: (value: string) => void
  onCategoryFilterChange: (value: string) => void
  onClearFilters: () => void
  onOpenManufacturer: (manufacturerId: string) => void
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('tr-TR').format(value)
}

export function DirectoryOverview({
  manufacturers,
  cities,
  categories,
  searchTerm,
  cityFilter,
  categoryFilter,
  onSearchTermChange,
  onCityFilterChange,
  onCategoryFilterChange,
  onClearFilters,
  onOpenManufacturer,
}: DirectoryOverviewProps) {
  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        <h2 className='text-2xl font-semibold tracking-tight md:text-3xl'>
          Üretici liste ekranı
        </h2>
        <p className='text-sm text-muted-foreground'>
          Üreticileri filtreleyin ve profili görüntüleyin.
        </p>
      </div>

      {manufacturers.length ? (
        <Card className='border-border/70 shadow-sm'>
          <CardHeader className='gap-4'>
            <div className='space-y-1'>
              <CardTitle className='text-base'>Üretici listesi</CardTitle>
              <CardDescription>
                Şirketler alt alta listelenir ve temel bilgiler tek satır akışta
                sunulur.
              </CardDescription>
            </div>
            <div className='grid gap-3 lg:grid-cols-[minmax(0,1.3fr)_220px_220px_auto]'>
              <div className='relative'>
                <Search className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground' />
                <Input
                  value={searchTerm}
                  onChange={(event) => onSearchTermChange(event.target.value)}
                  placeholder='Üretici, şehir veya kategori ara'
                  className='pl-9'
                />
              </div>

              <Select value={cityFilter} onValueChange={onCityFilterChange}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Şehir seç' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>Tüm şehirler</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={onCategoryFilterChange}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Kategori seç' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>Tüm kategoriler</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant='outline' onClick={onClearFilters}>
                <SlidersHorizontal className='size-4' />
                Temizle
              </Button>
            </div>
          </CardHeader>
          <CardContent className='pt-0'>
            <div className='overflow-hidden rounded-xl border border-border/70'>
              <div className='hidden grid-cols-[minmax(0,2fr)_1fr_1fr_1fr_0.8fr_auto] gap-4 border-b border-border/70 bg-muted/30 px-5 py-3 text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase lg:grid'>
                <span>Üretici</span>
                <span>Kategori</span>
                <span>Minimum sipariş</span>
                <span>Termin süresi</span>
                <span>Puan / skor</span>
                <span className='text-right'>Aksiyon</span>
              </div>

              <div className='divide-y divide-border/70'>
                {manufacturers.map((manufacturer) => (
                  <div
                    key={manufacturer.id}
                    className='grid gap-4 px-4 py-5 transition-colors hover:bg-muted/20 lg:grid-cols-[minmax(0,2fr)_1fr_1fr_1fr_0.8fr_auto] lg:items-center lg:px-5'
                  >
                    <div className='min-w-0'>
                      <div className='flex items-start gap-3'>
                        <div
                          className='flex size-11 shrink-0 items-center justify-center rounded-xl text-sm font-semibold text-white shadow-sm'
                          style={{ background: manufacturer.coverStyle }}
                        >
                          {manufacturer.logoText}
                        </div>
                        <div className='min-w-0'>
                          <p className='truncate text-base font-semibold text-foreground'>
                            {manufacturer.name}
                          </p>
                          <div className='mt-1 flex items-center gap-2 text-sm text-muted-foreground'>
                            <MapPin className='size-4' />
                            {manufacturer.city}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='flex items-center justify-between gap-3 rounded-lg border border-border/70 px-4 py-3 lg:block lg:rounded-none lg:border-0 lg:px-0 lg:py-0'>
                      <span className='text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase lg:hidden'>
                        Kategori
                      </span>
                      <p className='text-sm font-medium text-foreground'>
                        {manufacturer.category}
                      </p>
                    </div>

                    <div className='flex items-center justify-between gap-3 rounded-lg border border-border/70 px-4 py-3 lg:block lg:rounded-none lg:border-0 lg:px-0 lg:py-0'>
                      <span className='text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase lg:hidden'>
                        Minimum sipariş
                      </span>
                      <p className='text-sm font-medium text-foreground'>
                        {formatNumber(manufacturer.minimumOrder)} adet
                      </p>
                    </div>

                    <div className='flex items-center justify-between gap-3 rounded-lg border border-border/70 px-4 py-3 lg:block lg:rounded-none lg:border-0 lg:px-0 lg:py-0'>
                      <span className='text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase lg:hidden'>
                        Termin süresi
                      </span>
                      <p className='text-sm font-medium text-foreground'>
                        {manufacturer.leadTimeDays} gün
                      </p>
                    </div>

                    <div className='flex items-center justify-between gap-3 rounded-lg border border-border/70 px-4 py-3 lg:block lg:rounded-none lg:border-0 lg:px-0 lg:py-0'>
                      <span className='text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase lg:hidden'>
                        Puan / skor
                      </span>
                      <div className='flex items-center gap-2 text-sm font-medium text-foreground'>
                        <Star className='size-4 fill-current text-amber-500' />
                        {manufacturer.score.toFixed(1)}
                      </div>
                    </div>

                    <div className='flex items-center justify-end'>
                      <Button
                        className='w-full lg:w-auto'
                        onClick={() => onOpenManufacturer(manufacturer.id)}
                      >
                        Profili görüntüle
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className='border-border/70 shadow-sm'>
          <CardContent className='flex flex-col items-center justify-center gap-3 py-16 text-center'>
            <div className='rounded-full border border-dashed p-3 text-muted-foreground'>
              <Search className='size-5' />
            </div>
            <div className='space-y-1'>
              <p className='font-medium'>Eşleşen üretici bulunamadı</p>
              <p className='text-sm text-muted-foreground'>
                Filtreleri sıfırlayıp daha geniş bir arama deneyin.
              </p>
            </div>
            <Button variant='outline' onClick={onClearFilters}>
              Filtreleri sıfırla
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
