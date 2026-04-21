import { useState } from 'react'
import {
  ArrowLeft,
  BadgeCheck,
  Clock3,
  Factory,
  MapPin,
  PackageOpen,
  Plus,
  ShieldCheck,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import type { Manufacturer } from '@/types'
import { ManufacturerGallery } from './ManufacturerGallery'
import { RequestForm } from './RequestForm'

type ManufacturerDetailProps = {
  manufacturer: Manufacturer
  onBack: () => void
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('tr-TR').format(value)
}

function getCertificateImage(certificate: string) {
  const palette = [
    ['#1f2937', '#c9a227', '#fffdf5', '#f8edd0'],
    ['#0f172a', '#b8891f', '#fffef8', '#f3e7c1'],
    ['#3f3f46', '#a16207', '#fffdf7', '#f6e8bf'],
    ['#312e81', '#b08d57', '#fffef9', '#efe3c0'],
  ]

  const seed = certificate
    .split('')
    .reduce((total, character) => total + character.charCodeAt(0), 0)

  const [ink, accent, paper, panel] = palette[seed % palette.length]
  const initials = certificate
    .split(/[\s-]+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="720" height="480" viewBox="0 0 720 480">
      <defs>
        <linearGradient id="paperGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${paper}" />
          <stop offset="100%" stop-color="#ffffff" />
        </linearGradient>
        <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${accent}" />
          <stop offset="100%" stop-color="${accent}" stop-opacity="0.72" />
        </linearGradient>
      </defs>
      <rect width="720" height="480" rx="36" fill="#ece7db" />
      <rect x="22" y="22" width="676" height="436" rx="30" fill="url(#paperGlow)" stroke="url(#edge)" stroke-width="5" />
      <rect x="38" y="38" width="644" height="404" rx="24" fill="none" stroke="${accent}" stroke-opacity="0.45" stroke-width="1.5" />
      <rect x="58" y="58" width="604" height="364" rx="18" fill="none" stroke="${accent}" stroke-opacity="0.2" stroke-width="1.5" />
      <text x="360" y="102" text-anchor="middle" font-family="Georgia, serif" font-size="17" letter-spacing="5" fill="${accent}">CERTIFICATE</text>
      <text x="360" y="148" text-anchor="middle" font-family="Georgia, serif" font-size="17" letter-spacing="6" fill="${ink}" fill-opacity="0.78">OF ACHIEVEMENT</text>
      <line x1="210" y1="118" x2="286" y2="118" stroke="${accent}" stroke-width="1.5" stroke-opacity="0.55" />
      <line x1="434" y1="118" x2="510" y2="118" stroke="${accent}" stroke-width="1.5" stroke-opacity="0.55" />
      <text x="360" y="198" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" fill="${ink}" fill-opacity="0.55">THIS DOCUMENT CERTIFIES THAT</text>
      <text x="360" y="252" text-anchor="middle" font-family="Georgia, serif" font-size="34" font-weight="700" fill="${ink}">${certificate}</text>
      <text x="360" y="288" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" fill="${ink}" fill-opacity="0.62">has been reviewed against approved sourcing and production standards</text>
      <rect x="102" y="320" width="250" height="52" rx="12" fill="${panel}" fill-opacity="0.65" stroke="${accent}" stroke-opacity="0.25" />
      <text x="126" y="342" font-family="Arial, sans-serif" font-size="11" letter-spacing="2" fill="${ink}" fill-opacity="0.48">CERTIFICATE ID</text>
      <text x="126" y="362" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="${ink}">${initials}-${seed}</text>
      <circle cx="562" cy="304" r="54" fill="none" stroke="${accent}" stroke-width="4" />
      <circle cx="562" cy="304" r="40" fill="${panel}" stroke="${accent}" stroke-opacity="0.45" stroke-width="1.5" />
      <text x="562" y="294" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="${ink}">VERIFIED</text>
      <text x="562" y="314" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" letter-spacing="2" fill="${ink}" fill-opacity="0.65">QUALITY SEAL</text>
      <line x1="116" y1="392" x2="252" y2="392" stroke="${ink}" stroke-opacity="0.42" stroke-width="1.5" />
      <line x1="316" y1="392" x2="452" y2="392" stroke="${ink}" stroke-opacity="0.42" stroke-width="1.5" />
      <text x="116" y="412" font-family="Arial, sans-serif" font-size="12" fill="${ink}" fill-opacity="0.55">Authorized signature</text>
      <text x="316" y="412" font-family="Arial, sans-serif" font-size="12" fill="${ink}" fill-opacity="0.55">Inspection authority</text>
      <text x="360" y="438" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" letter-spacing="1.6" fill="${ink}" fill-opacity="0.38">Issued for supplier presentation purposes</text>
    </svg>
  `.trim()

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

export function ManufacturerDetail({
  manufacturer,
  onBack,
}: ManufacturerDetailProps) {
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false)

  return (
    <div className='space-y-6'>
      <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
        <Card className='overflow-hidden border-border/70 pt-0 shadow-sm'>
          <div
            className='relative min-h-72 border-b border-border/70 p-6'
            style={{ background: manufacturer.coverStyle }}
          >
            <div className='absolute inset-0 bg-[linear-gradient(135deg,rgba(28,25,23,0.2),rgba(255,255,255,0.02),rgba(217,119,6,0.16))]' />
            <div className='relative z-10 flex min-h-60 flex-col justify-between gap-10'>
              <div className='flex items-start justify-between gap-4'>
                <Button variant='secondary' onClick={onBack}>
                  <ArrowLeft className='size-4' />
                  Listeye dön
                </Button>
              </div>

              <div className='grid gap-6'>
                <div className='flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between'>
                  <div className='flex items-start gap-4'>
                    <div className='flex size-20 shrink-0 items-center justify-center rounded-[28px] border border-white/15 bg-white/12 text-xl font-semibold text-white shadow-sm backdrop-blur'>
                      {manufacturer.logoText}
                    </div>
                    <div className='space-y-3 text-white'>
                      <div className='space-y-2'>
                        <h2 className='text-3xl font-semibold tracking-tight md:text-4xl'>
                          {manufacturer.name}
                        </h2>
                        <p className='max-w-3xl text-sm leading-6 text-white/80'>
                          {manufacturer.description}
                        </p>
                      </div>
                      <div className='flex flex-wrap gap-2'>
                        <Badge className='bg-white/12 text-white' variant='secondary'>
                          {manufacturer.category}
                        </Badge>
                        <Badge className='border-white/15 bg-black/10 text-white' variant='outline'>
                          <MapPin className='size-3' />
                          {manufacturer.city}
                        </Badge>
                        <Badge className='border-white/15 bg-black/10 text-white' variant='outline'>
                          <BadgeCheck className='size-3' />
                          Skor {manufacturer.score.toFixed(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <DialogTrigger asChild>
                    <Button className='lg:self-start'>
                      <Plus className='size-4' />
                      Talep Oluştur
                    </Button>
                  </DialogTrigger>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <DialogContent className='max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>{manufacturer.name} için talep oluştur</DialogTitle>
            <DialogDescription>
              Ürün, kategori, miktar, termin ve açıklama bilgilerini doldurun.
            </DialogDescription>
          </DialogHeader>
          <RequestForm
            manufacturer={manufacturer}
            onSuccess={() => setIsRequestDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <div className='space-y-6'>
          <Card className='border-border/70 shadow-sm'>
            <CardHeader>
              <CardTitle>Operasyon özeti</CardTitle>
            </CardHeader>
            <CardContent className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5'>
              <div className='rounded-[24px] border border-border/70 bg-muted/25 p-4'>
                <p className='mb-2 flex items-center gap-2 text-xs text-muted-foreground'>
                  <MapPin className='size-3.5' />
                  Şehir
                </p>
                <p className='font-medium'>{manufacturer.city}</p>
              </div>
              <div className='rounded-[24px] border border-border/70 bg-muted/25 p-4'>
                <p className='mb-2 text-xs text-muted-foreground'>Kategori</p>
                <p className='font-medium'>{manufacturer.category}</p>
              </div>
              <div className='rounded-[24px] border border-border/70 bg-muted/25 p-4'>
                <p className='mb-2 flex items-center gap-2 text-xs text-muted-foreground'>
                  <PackageOpen className='size-3.5' />
                  Minimum sipariş
                </p>
                <p className='font-medium'>
                  {formatNumber(manufacturer.minimumOrder)} adet
                </p>
              </div>
              <div className='rounded-[24px] border border-border/70 bg-muted/25 p-4'>
                <p className='mb-2 flex items-center gap-2 text-xs text-muted-foreground'>
                  <Clock3 className='size-3.5' />
                  Termin
                </p>
                <p className='font-medium'>{manufacturer.leadTimeDays} gün</p>
              </div>
              <div className='rounded-[24px] border border-border/70 bg-muted/25 p-4'>
                <p className='mb-2 flex items-center gap-2 text-xs text-muted-foreground'>
                  <Factory className='size-3.5' />
                  Aylık kapasite
                </p>
                <p className='font-medium'>
                  {formatNumber(manufacturer.monthlyCapacity)} adet
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className='border-border/70 shadow-sm'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <ShieldCheck className='size-4' />
                Sertifikalar
              </CardTitle>
              <CardDescription>
                Tedarik kararı için gerekli güven sinyalleri.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0 2xl:grid-cols-6'>
                {manufacturer.certifications.map((certificate) => (
                  <div
                    key={certificate}
                    className='min-w-[240px] snap-start overflow-hidden rounded-[24px] border border-border/70 bg-card shadow-sm lg:min-w-0'
                  >
                    <div className='border-b border-border/70 bg-muted/20 p-3'>
                      <img
                        src={getCertificateImage(certificate)}
                        alt={certificate}
                        className='h-40 w-full rounded-[18px] object-cover sm:h-44 lg:h-36'
                      />
                    </div>
                    <div className='px-4 py-4'>
                      <p className='text-sm font-medium text-foreground'>
                        {certificate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <ManufacturerGallery
            manufacturerName={manufacturer.name}
            items={manufacturer.gallery}
          />
      </div>
    </div>
  )
}
