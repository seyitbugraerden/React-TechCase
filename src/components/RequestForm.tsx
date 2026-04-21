import { useState } from 'react'
import { AlertCircle, CheckCircle2, LoaderCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { submitManufacturerRequest } from '@/mockApi'
import type {
  Manufacturer,
  RequestFormErrors,
  RequestFormValues,
} from '@/types'

type RequestFormProps = {
  manufacturer: Manufacturer
  onSuccess?: () => void
}

type SubmissionState = {
  error: string
  success: string
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('tr-TR').format(value)
}

function getInitialValues(manufacturer: Manufacturer): RequestFormValues {
  return {
    productName: '',
    category: manufacturer.offerings[0] ?? manufacturer.category,
    quantity: '',
    deadline: '',
    description: '',
  }
}

function getMinimumDeadline() {
  const date = new Date()
  date.setDate(date.getDate() + 7)
  return date.toISOString().split('T')[0]
}

function validateForm(
  manufacturer: Manufacturer,
  values: RequestFormValues,
): RequestFormErrors {
  const errors: RequestFormErrors = {}

  if (values.productName.trim().length < 2) {
    errors.productName = 'Ürün adı en az 2 karakter olmalı.'
  }

  if (!values.category) {
    errors.category = 'Kategori seçilmelidir.'
  }

  if (!values.quantity.trim()) {
    errors.quantity = 'Miktar zorunludur.'
  } else {
    const quantity = Number(values.quantity)

    if (!Number.isFinite(quantity) || quantity <= 0) {
      errors.quantity = 'Miktar pozitif bir sayı olmalı.'
    } else if (quantity < manufacturer.minimumOrder) {
      errors.quantity = `Minimum sipariş ${formatNumber(manufacturer.minimumOrder)} adet olmalı.`
    }
  }

  if (!values.deadline) {
    errors.deadline = 'Termin tarihi seçilmelidir.'
  } else if (values.deadline < getMinimumDeadline()) {
    errors.deadline = 'Termin tarihi bugünden en az 7 gün sonrasında olmalı.'
  }

  if (values.description.trim().length < 20) {
    errors.description = 'Açıklama en az 20 karakter olmalı.'
  }

  return errors
}

export function RequestForm({
  manufacturer,
  onSuccess,
}: RequestFormProps) {
  const [values, setValues] = useState<RequestFormValues>(() =>
    getInitialValues(manufacturer),
  )
  const [errors, setErrors] = useState<RequestFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    error: '',
    success: '',
  })

  function updateField<K extends keyof RequestFormValues>(
    key: K,
    value: RequestFormValues[K],
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [key]: value,
    }))

    setErrors((currentErrors) => ({
      ...currentErrors,
      [key]: undefined,
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validateForm(manufacturer, values)
    setErrors(nextErrors)
    setSubmissionState({ error: '', success: '' })

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setIsSubmitting(true)

    try {
      const result = await submitManufacturerRequest(
        {
          manufacturerId: manufacturer.id,
          productName: values.productName.trim(),
          category: values.category,
          quantity: Number(values.quantity),
          deadline: values.deadline,
          description: values.description.trim(),
        },
        manufacturer.monthlyCapacity,
      )

      setSubmissionState({
        error: '',
        success: `Talep iletildi. Referans kodu: ${result.referenceCode}`,
      })
      setValues(getInitialValues(manufacturer))
      setErrors({})
      onSuccess?.()
    } catch (error) {
      setSubmissionState({
        success: '',
        error:
          error instanceof Error
            ? error.message
            : 'Talep gönderilirken beklenmeyen bir hata oluştu.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formSection = (
    <form className='space-y-5' onSubmit={handleSubmit} noValidate>
      <div className='space-y-2'>
        <label htmlFor='productName' className='text-sm font-medium'>
          Ürün adı
        </label>
        <Input
          id='productName'
          value={values.productName}
          onChange={(event) => updateField('productName', event.target.value)}
          placeholder='Örnek: Oversize sweatshirt'
          aria-invalid={Boolean(errors.productName)}
          disabled={isSubmitting}
        />
        <p className='text-xs text-muted-foreground'>
          Satın alma ekibinin ürünü hızlı eşleştirebilmesi için açık bir ad
          girin.
        </p>
        {errors.productName ? (
          <p className='text-sm text-destructive'>{errors.productName}</p>
        ) : null}
      </div>

      <div className='space-y-2'>
        <label htmlFor='requestCategory' className='text-sm font-medium'>
          Kategori
        </label>
        <Select
          value={values.category}
          onValueChange={(value) => updateField('category', value)}
          disabled={isSubmitting}
        >
          <SelectTrigger
            id='requestCategory'
            className='w-full'
            aria-invalid={Boolean(errors.category)}
          >
            <SelectValue placeholder='Kategori seçin' />
          </SelectTrigger>
          <SelectContent>
            {manufacturer.offerings.map((offering) => (
              <SelectItem key={offering} value={offering}>
                {offering}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className='text-xs text-muted-foreground'>
          Seçenekler profil kartındaki ürün gruplarıyla aynı tutuldu.
        </p>
        {errors.category ? (
          <p className='text-sm text-destructive'>{errors.category}</p>
        ) : null}
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        <div className='space-y-2'>
          <label htmlFor='quantity' className='text-sm font-medium'>
            Miktar
          </label>
            <Input
              id='quantity'
              inputMode='numeric'
              value={values.quantity}
              onChange={(event) => updateField('quantity', event.target.value)}
              placeholder={`Minimum ${formatNumber(manufacturer.minimumOrder)} adet`}
              aria-invalid={Boolean(errors.quantity)}
              disabled={isSubmitting}
            />
            <p className='text-xs text-muted-foreground'>
              Minimum sipariş ve kapasite kontrolü gönderim sırasında da
              doğrulanır.
            </p>
          {errors.quantity ? (
            <p className='text-sm text-destructive'>{errors.quantity}</p>
          ) : null}
        </div>

        <div className='space-y-2'>
          <label htmlFor='deadline' className='text-sm font-medium'>
            Termin
          </label>
          <Input
            id='deadline'
            type='date'
            min={getMinimumDeadline()}
            value={values.deadline}
            onChange={(event) => updateField('deadline', event.target.value)}
            aria-invalid={Boolean(errors.deadline)}
            disabled={isSubmitting}
          />
          <p className='text-xs text-muted-foreground'>
            Tarih bugünden en az 7 gün sonrası için seçilebilir.
          </p>
          {errors.deadline ? (
            <p className='text-sm text-destructive'>{errors.deadline}</p>
          ) : null}
        </div>
      </div>

      <div className='space-y-2'>
        <label htmlFor='description' className='text-sm font-medium'>
          Açıklama
        </label>
        <Textarea
          id='description'
          value={values.description}
          onChange={(event) => updateField('description', event.target.value)}
          placeholder='Teknik beklenti, hedef teslim, kalite notları ve paketleme detaylarını kısaca yazın.'
          aria-invalid={Boolean(errors.description)}
          disabled={isSubmitting}
        />
        <p className='text-xs text-muted-foreground'>
          Teknik beklenti, kalite notu ve teslim senaryosunu kısaca belirtin.
        </p>
        {errors.description ? (
          <p className='text-sm text-destructive'>{errors.description}</p>
        ) : null}
      </div>

      {submissionState.success ? (
        <div className='flex gap-3 rounded-[24px] border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-700'>
          <CheckCircle2 className='mt-0.5 size-4 shrink-0' />
          <p>{submissionState.success}</p>
        </div>
      ) : null}

      {submissionState.error ? (
        <div className='flex gap-3 rounded-[24px] border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive'>
          <AlertCircle className='mt-0.5 size-4 shrink-0' />
          <p>{submissionState.error}</p>
        </div>
      ) : null}

      <Button type='submit' className='w-full' disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <LoaderCircle className='size-4 animate-spin' />
            Gönderiliyor...
          </>
        ) : (
          'Talebi ilet'
        )}
      </Button>
    </form>
  )

  return <div>{formSection}</div>
}
