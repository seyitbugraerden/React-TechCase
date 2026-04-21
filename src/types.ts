export type AppRoute =
  | { kind: 'list' }
  | { kind: 'detail'; manufacturerId: string }

export type GalleryItem = {
  title: string
  caption: string
  imageUrl: string
}

export type Manufacturer = {
  id: string
  name: string
  city: string
  category: string
  minimumOrder: number
  leadTimeDays: number
  score: number
  monthlyCapacity: number
  logoText: string
  description: string
  certifications: string[]
  offerings: string[]
  coverStyle: string
  gallery: GalleryItem[]
}

export type RequestFormValues = {
  productName: string
  category: string
  quantity: string
  deadline: string
  description: string
}

export type RequestFormErrors = Partial<Record<keyof RequestFormValues, string>>

export type ManufacturerRequestPayload = {
  manufacturerId: string
  productName: string
  category: string
  quantity: number
  deadline: string
  description: string
}
